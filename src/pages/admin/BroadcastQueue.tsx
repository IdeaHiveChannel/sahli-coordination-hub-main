import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Send, Clock, Users, Megaphone, FileText, CheckCircle2, AlertCircle, Sparkles, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Provider, Request } from '@/lib/types';
import { rateupService } from '@/lib/rateupService';
import { storageService } from '@/lib/storageService';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const BroadcastQueue = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRateUp, setSelectedRateUp] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  
  // Use real data from storage
  const requests = storageService.getRequests();
  const allProviders = storageService.getProviders();
  const broadcasts = storageService.getBroadcasts();
  const templates = storageService.getTemplates();

  // Filter requests that are "New" or "Broadcasted" to show in queue
  const [queue, setQueue] = useState(() => {
    const broadcastedIds = broadcasts.map(b => b.request_id);
    return requests
      .filter(r => r.status === 'New' || r.status === 'Broadcasted')
      .map(r => ({
        id: `BQ-${r.id}`,
        requestId: r.id,
        service: r.sub_service,
        district: r.area,
        urgency: r.urgency,
        providersCount: allProviders.filter(p => 
          p.status === 'Active' && 
          p.services.includes(r.sub_service) && 
          p.areas.includes(r.area)
        ).length,
        status: broadcastedIds.includes(r.id) ? 'Sent' : 'Ready',
        scheduledFor: 'Immediate',
        message: broadcasts.find(b => b.request_id === r.id)?.message_text || '',
        version: 1,
        broadcastId: broadcasts.find(b => b.request_id === r.id)?.id || `BC-${r.id}-V1`,
        targetGroup: '',
        history: broadcasts
          .filter(b => b.request_id === r.id)
          .map(b => ({ version: 1, sentAt: b.generated_at, group: 'RateUp' }))
      }));
  });

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [matchingProviders, setMatchingProviders] = useState<Provider[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleGenerateMessage = () => {
    if (!selectedRateUp) {
      toast.error('Please select a RateUp group first.');
      return;
    }

    const currentVersion = selectedRequest.version || 1;
    let message = '';

    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        message = template.content
          .replace(/{sub_service}/g, selectedRequest.service)
          .replace(/{area}/g, selectedRequest.district)
          .replace(/{urgency}/g, selectedRequest.urgency || 'Normal')
          .replace(/{version}/g, currentVersion.toString());
      }
    } else {
      // Fallback to default format if no template selected
      message = `🚨 NEW SERVICE OPPORTUNITY (V${currentVersion})\n\n` +
        `Service: ${selectedRequest.service}\n` +
        `Location: ${selectedRequest.district}\n` +
        `Urgency: ${selectedRequest.urgency || 'Normal'}\n` +
        `Rate Group: ${selectedRateUp}\n\n` +
        `Reply "YES" to accept this request immediately.\n\n` +
        `— Sahli Coordination Hub`;
    }
    
    setGeneratedMessage(message);
    toast.success(`SAHLI generated message V${currentVersion} for RateUp group: ${selectedRateUp}`);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveBroadcast = async () => {
    setIsSaving(true);
    
    const version = selectedRequest.version || 1;
    // Align with official RateUp OpenAPI spec (api-1.json)
    const payload = {
      orgId: import.meta.env.VITE_RATEUP_ORG_ID || '00000000-0000-0000-0000-000000000000',
      templateId: import.meta.env.VITE_RATEUP_TEMPLATE_ID || '00000000-0000-0000-0000-000000000000',
      contactGroupIds: [selectedRateUp],
      body: {
        type: 'body' as const,
        parameters: [
          { type: 'text' as const, text: selectedRequest.service },
          { type: 'text' as const, text: selectedRequest.district },
          { type: 'text' as const, text: selectedRequest.urgency || 'Normal' },
          { type: 'text' as const, text: version.toString() }
        ]
      }
    };
    
    try {
      // Stage 6: Broadcast Generation & Dispatch via Service
      await rateupService.sendBroadcast(payload);

      // Save to real storage
      storageService.saveBroadcast({
        request_id: selectedRequest.requestId,
        message_text: generatedMessage,
        confirmed_provider_id: null
      });

      // Update request status to Broadcasted
      storageService.updateRequestStatus(selectedRequest.requestId, 'Broadcasted');

      setQueue(queue.map(item => 
        item.id === selectedRequest.id 
          ? { 
              ...item, 
              status: 'Sent', 
              message: generatedMessage, 
              scheduledFor: new Date().toLocaleString(),
              targetGroup: selectedRateUp,
              history: [...(item.history || []), { version, sentAt: new Date().toLocaleString(), group: selectedRateUp }]
            } 
          : item
      ));
      
      toast.success(`Broadcast V${version} dispatched successfully via RateUp API.`);
      setIsGenerating(false);
    } catch (error: any) {
      console.error('Broadcast Error:', error);
      toast.error(`Failed to send broadcast: ${error.message}`);
      
      // Fallback for development
      if (import.meta.env.DEV) {
        console.warn('Simulating success in DEV mode despite API error.');
        
        // Save to real storage even in fallback
        storageService.saveBroadcast({
          request_id: selectedRequest.requestId,
          message_text: generatedMessage,
          confirmed_provider_id: null
        });
        storageService.updateRequestStatus(selectedRequest.requestId, 'Broadcasted');

        setTimeout(() => {
          setQueue(queue.map(item => 
            item.id === selectedRequest.id 
              ? { 
                  ...item, 
                  status: 'Sent', 
                  message: generatedMessage, 
                  scheduledFor: new Date().toLocaleString(),
                  targetGroup: selectedRateUp,
                  history: [...(item.history || []), { version, sentAt: new Date().toLocaleString(), group: selectedRateUp }]
                } 
              : item
          ));
          setIsGenerating(false);
          toast.info('Simulated success (DEV mode fallback).');
        }, 1500);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetryBroadcast = (item: any) => {
    const nextVersion = (item.version || 1) + 1;
    setSelectedRequest({ ...item, version: nextVersion });
    setIsGenerating(true);
    setGeneratedMessage('');
    setSelectedRateUp('');
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex items-center justify-between mb-6 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">COORDINATION ENGINE</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold text-[10px]">{queue.length} REQUESTS</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Stage 6: Broadcast Queue</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Generate broadcasts and dispatch via RateUp to matched providers.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 border-primary/20 text-primary hover:bg-primary/5 font-bold" onClick={() => window.location.reload()}>
              <Clock size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="border-primary/10 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="h-1.5 bg-gradient-to-r from-primary/80 to-primary" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
                    <Megaphone className="text-primary" size={20} />
                    Broadcast Readiness
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Select a request to prepare and dispatch the broadcast message.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-primary/5 overflow-hidden bg-white shadow-inner">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-primary/10 bg-slate-50/50">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Queue ID</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Service / Request</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Target District</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Status</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queue.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <CheckCircle2 size={32} className="mb-2 opacity-20" />
                            <p className="text-sm font-medium">No requests waiting for broadcast</p>
                            <p className="text-xs opacity-60">All new requests have been processed.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      queue.map((item) => (
                        <TableRow key={item.id} className="group transition-colors hover:bg-primary/[0.03] border-b border-primary/5">
                          <TableCell className="font-mono font-bold text-xs text-muted-foreground">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-mono font-bold text-xs text-primary hover:no-underline"
                              onClick={() => navigate(`/admin/requests?search=${item.requestId}`)}
                            >
                              {item.id}
                            </Button>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-800">{item.service}</span>
                                <Badge variant="outline" className="text-[9px] h-4.5 bg-slate-50 font-bold border-slate-200">V{item.version}</Badge>
                              </div>
                              <span className="text-[10px] text-muted-foreground font-mono mt-0.5">{item.requestId}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-[10px] font-bold border-transparent">
                              {item.district}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <Badge 
                                variant={item.status === 'Sent' ? 'outline' : 'default'} 
                                className={item.status === 'Sent' 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-bold text-[10px]' 
                                  : 'bg-blue-600 hover:bg-blue-700 font-bold text-[10px]'}
                              >
                                {item.status === 'Sent' ? 'PREPARED' : 'READY'}
                              </Badge>
                              {item.history && item.history.length > 0 && (
                                <span className="text-[9px] text-muted-foreground italic font-medium">
                                  Last: {item.history[item.history.length - 1].group}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {item.status === 'Sent' && (
                                <Button 
                                  variant="outline"
                                  size="sm" 
                                  className="h-8 flex items-center gap-2 border-primary/20 hover:bg-primary/5 font-black uppercase text-[10px] tracking-widest px-4 transition-all"
                                  onClick={() => handleRetryBroadcast(item)}
                                >
                                  <Plus size={14} />
                                  New Version
                                </Button>
                              )}
                              
                              <Dialog open={isGenerating && selectedRequest?.id === item.id} onOpenChange={(open) => {
                                setIsGenerating(open);
                                if (open) setSelectedRequest(item);
                              }}>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    disabled={item.status === 'Sent' && !isGenerating}
                                    className={`h-8 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest px-4 transition-all ${
                                      item.status === 'Sent' 
                                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-transparent' 
                                      : 'bg-primary hover:bg-primary/90 shadow-sm'
                                    }`}
                                    onClick={() => setSelectedRequest(item)}
                                  >
                                    <Sparkles size={14} />
                                    {item.status === 'Sent' ? 'Sent' : (item.version > 1 ? `Send V${item.version}` : 'Generate')}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] bg-white border-primary/20 shadow-2xl p-0 overflow-hidden">
                                  <div className="h-1.5 bg-primary w-full" />
                                  <div className="p-6">
                                    <DialogHeader className="mb-6">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                          <Sparkles className="text-primary" size={20} />
                                        </div>
                                        <div>
                                          <DialogTitle className="text-xl font-bold text-slate-900">
                                            SAHLI Broadcast Engine
                                          </DialogTitle>
                                          <DialogDescription className="text-slate-500 text-xs">
                                            Preparation for {item.service} in {item.district} (V{item.version}).
                                          </DialogDescription>
                                        </div>
                                      </div>
                                    </DialogHeader>
                                    
                                    <div className="space-y-5">
                                      <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                          <Users size={12} className="text-primary" />
                                          1. Target Audience
                                        </label>
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5">
                                          <span className="text-sm font-bold text-slate-800">Pre-defined RateUp Lists</span>
                                          <p className="text-[10px] text-slate-500 leading-relaxed">Broadcast will be sent to the selected pricing group configured in RateUp.</p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">2. Message Template</label>
                                          <Select onValueChange={setSelectedTemplate}>
                                            <SelectTrigger className="bg-white border-slate-200 h-10 text-xs font-medium">
                                              <SelectValue placeholder="Choose template..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-slate-200 shadow-xl">
                                              <SelectItem value="none" className="text-xs">No Template (Default)</SelectItem>
                                              {templates.filter(t => t.category === 'Broadcast').map(template => (
                                                <SelectItem key={template.id} value={template.id} className="text-xs">
                                                  {template.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">3. Pricing Tier</label>
                                          <Select onValueChange={setSelectedRateUp}>
                                            <SelectTrigger className="bg-white border-slate-200 h-10 text-xs font-medium">
                                              <SelectValue placeholder="Choose group..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-slate-200 shadow-xl">
                                              <SelectItem value="RateUp A (Premium)" className="text-xs">RateUp A (Premium)</SelectItem>
                                              <SelectItem value="RateUp B (Standard)" className="text-xs">RateUp B (Standard)</SelectItem>
                                              <SelectItem value="RateUp C (Economy)" className="text-xs">RateUp C (Economy)</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>

                                      {generatedMessage ? (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                              <CheckCircle2 size={12} />
                                              4. Generated Message
                                            </label>
                                            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[8px] font-black">READY TO SEND</Badge>
                                          </div>
                                          <div className="relative">
                                            <Textarea 
                                              readOnly 
                                              value={generatedMessage} 
                                              className="h-32 bg-slate-50 border-emerald-200 text-slate-700 font-mono text-[11px] leading-relaxed resize-none shadow-inner"
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <Button 
                                          onClick={handleGenerateMessage}
                                          className="w-full bg-primary hover:bg-primary/90 font-black uppercase tracking-widest text-[11px] h-10 shadow-sm"
                                          disabled={!selectedRateUp}
                                        >
                                          Generate Message Text
                                        </Button>
                                      )}
                                    </div>

                                    <div className="mt-8 flex gap-3">
                                      <Button 
                                        variant="outline" 
                                        onClick={() => {
                                          setIsGenerating(false);
                                          setGeneratedMessage('');
                                          setSelectedRateUp('');
                                        }}
                                        className="flex-1 border-slate-200 text-slate-500 font-bold h-10 text-xs"
                                      >
                                        Cancel
                                      </Button>
                                      <Button 
                                        onClick={handleSaveBroadcast}
                                        disabled={!generatedMessage || isSaving}
                                        className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[11px] h-10 shadow-md shadow-emerald-100"
                                      >
                                        {isSaving ? (
                                          <div className="flex items-center gap-2">
                                            <Clock className="animate-spin" size={14} />
                                            Dispatching...
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-2">
                                            <Send size={14} />
                                            Send via RateUp
                                          </div>
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2">
                <AlertCircle className="text-primary/10" size={40} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black flex items-center gap-2 text-primary tracking-widest uppercase">
                  <FileText size={14} />
                  Locked Message Rule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  SAHLI generates the message text based on the request details and selected RateUp group. This text is <span className="text-primary font-bold">locked</span> to ensure network consistency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2">
                <Users className="text-emerald-500/10" size={40} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black flex items-center gap-2 text-emerald-600 tracking-widest uppercase">
                  <Sparkles size={14} />
                  Internal Filtering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  SAHLI automatically identifies providers who match the service category and target district with no governance flags.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2">
                <Send className="text-blue-500/10" size={40} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black flex items-center gap-2 text-blue-600 tracking-widest uppercase">
                  <Clock size={14} />
                  Preparation vs Sending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Generating a broadcast prepares the record in memory for final approval and dispatch via the WhatsApp API.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BroadcastQueue;

