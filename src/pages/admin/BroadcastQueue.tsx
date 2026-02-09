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

interface BroadcastQueueItem {
  id: string;
  requestId: string;
  service: string;
  district: string;
  urgency: 'High' | 'Normal' | 'Flexible';
  providersCount: number;
  status: 'Sent' | 'Ready';
  scheduledFor: string;
  message: string;
  version: number;
  broadcastId: string;
  targetGroup: string;
  history: { version: number; sentAt: string; group: string }[];
}

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
  const [queue, setQueue] = useState<BroadcastQueueItem[]>(() => {
    const broadcastedIds = broadcasts.map(b => b.request_id);
    return requests
      .filter(r => r.status === 'New' || r.status === 'Broadcasted')
      .map(r => ({
        id: `BQ-${r.id}`,
        requestId: r.id,
        service: r.sub_service,
        district: r.area,
        urgency: r.urgency as 'High' | 'Normal' | 'Flexible',
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

  const [selectedRequest, setSelectedRequest] = useState<BroadcastQueueItem | null>(null);
  const [matchingProviders, setMatchingProviders] = useState<Provider[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleGenerateMessage = () => {
    if (!selectedRateUp) {
      toast.error('Please select a RateUp group first.');
      return;
    }

    if (!selectedRequest) return;

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
    if (!selectedRequest) return;
    
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
    } catch (error) {
      console.error('Broadcast Error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to send broadcast: ${message}`);
      
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

  const handleRetryBroadcast = (item: BroadcastQueueItem) => {
    const nextVersion = (item.version || 1) + 1;
    setSelectedRequest({ ...item, version: nextVersion });
    setIsGenerating(true);
    setGeneratedMessage('');
    setSelectedRateUp('');
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-white/50 backdrop-blur-md p-6 sm:p-10 rounded-[2.5rem] border border-primary/10 shadow-sm">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px] px-3 py-1">COORDINATION ENGINE</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] px-3 py-1 uppercase">{queue.length} Requests</Badge>
            </div>
            <h1 className="text-display text-slate-900">Broadcast Queue</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium leading-relaxed max-w-xl">
              Generate broadcasts and dispatch via RateUp to matched providers.
            </p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" className="h-14 flex-1 sm:flex-none sm:px-8 gap-3 border-slate-200 font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-sm hover:bg-slate-50" onClick={() => window.location.reload()}>
              <Clock size={18} />
              Refresh Data
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          <Card className="border-primary/10 shadow-xl overflow-hidden bg-white/80 backdrop-blur-md rounded-[2.5rem]">
            <div className="h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
            <CardHeader className="border-b border-slate-100/50 pb-8 pt-10 px-6 sm:px-10">
              <div>
                <CardTitle className="flex items-center gap-4 text-subtitle text-slate-900">
                  <Megaphone className="text-primary" size={28} />
                  Broadcast Readiness
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm font-bold text-slate-500 mt-2 leading-relaxed">
                  Select a request to prepare and dispatch the broadcast message via RateUp.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile View: Card List */}
              <div className="block sm:hidden p-6 space-y-6">
                {queue.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                    <CheckCircle2 size={48} className="mb-4 opacity-10" />
                    <p className="text-lg font-black tracking-tight text-slate-300 uppercase">No requests waiting</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">Check back later for new coordination tasks.</p>
                  </div>
                ) : (
                  queue.map((item) => (
                    <div key={item.id} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white shadow-lg space-y-6 active:scale-[0.98] transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="link" 
                            className="p-0 h-auto font-mono font-black text-[10px] text-primary hover:no-underline tracking-tighter justify-start uppercase"
                            onClick={() => navigate(`/admin/requests?search=${item.requestId}`)}
                          >
                            {item.id}
                          </Button>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="font-black text-xl text-slate-900 tracking-tight">{item.service}</span>
                            <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-slate-50 font-black border-slate-200 uppercase tracking-widest rounded-lg">V{item.version}</Badge>
                          </div>
                        </div>
                        <Badge 
                          variant={item.status === 'Sent' ? 'outline' : 'default'} 
                          className={item.status === 'Sent' 
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-black text-[10px] px-3 py-1.5 uppercase tracking-widest rounded-full' 
                            : 'bg-blue-600 text-white font-black text-[10px] px-3 py-1.5 shadow-md border-none uppercase tracking-widest rounded-full'}
                        >
                          {item.status === 'Sent' ? 'PREPARED' : 'READY'}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between py-5 border-y border-slate-50">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">District</span>
                          <span className="text-base font-black text-slate-900 tracking-tight">{item.district}</span>
                        </div>
                        {item.history && item.history.length > 0 && (
                          <div className="flex flex-col gap-1.5 text-right">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Group</span>
                            <span className="text-sm font-black text-slate-600 italic tracking-tight">{item.history[item.history.length - 1].group}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {item.status === 'Sent' && (
                          <Button 
                            variant="outline"
                            className="h-14 flex items-center justify-center gap-2 border-slate-200 hover:bg-primary/5 font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl active:scale-95 transition-all shadow-sm"
                            onClick={() => handleRetryBroadcast(item)}
                          >
                            <Plus size={16} />
                            Retry
                          </Button>
                        )}
                        
                        <Dialog open={isGenerating && selectedRequest?.id === item.id} onOpenChange={(open) => {
                          setIsGenerating(open);
                          if (open) setSelectedRequest(item);
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              disabled={item.status === 'Sent' && !isGenerating}
                              className={`h-14 ${item.status === 'Sent' ? 'col-span-1' : 'col-span-2'} flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-xl ${
                                item.status === 'Sent' 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' 
                                : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                              }`}
                              onClick={() => setSelectedRequest(item)}
                            >
                              <Sparkles size={16} className={item.status !== 'Sent' ? "text-primary" : ""} />
                              {item.status === 'Sent' ? 'Sent' : (item.version > 1 ? `Send V${item.version}` : 'Generate')}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-[500px] bg-white border-primary/20 shadow-xl p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="h-2 bg-primary w-full" />
                            <div className="p-8">
                              <DialogHeader className="mb-8">
                                <div className="flex items-center gap-4 mb-3">
                                  <div className="p-4 bg-primary/10 rounded-[1.5rem] shadow-inner">
                                    <Sparkles className="text-primary" size={28} />
                                  </div>
                                  <div>
                                    <DialogTitle className="text-subtitle text-slate-900">
                                      SAHLI Broadcast
                                    </DialogTitle>
                                    <DialogDescription className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                                      {item.service} • {item.district} (V{item.version})
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>
                              
                              <div className="space-y-8">
                                <div className="space-y-4">
                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <Users size={14} className="text-primary" />
                                    1. Target Audience
                                  </label>
                                  <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex flex-col gap-2">
                                    <span className="text-sm font-black text-slate-900 uppercase tracking-tight">RateUp Dynamic Lists</span>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">Broadcast will be sent to the specific pricing tier group.</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">2. Message Template</label>
                                    <Select onValueChange={setSelectedTemplate}>
                                      <SelectTrigger className="bg-slate-50 border-slate-100 h-14 text-[11px] font-black uppercase tracking-widest rounded-2xl focus:ring-primary/20 focus:bg-white transition-all shadow-inner">
                                        <SelectValue placeholder="Choose template..." />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white border-slate-200 shadow-xl rounded-2xl p-2">
                                        <SelectItem value="none" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">No Template (Default)</SelectItem>
                                        {templates.filter(t => t.category === 'Broadcast').map(template => (
                                          <SelectItem key={template.id} value={template.id} className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">3. RateUp Group</label>
                                    <Select onValueChange={setSelectedRateUp}>
                                      <SelectTrigger className="bg-slate-50 border-slate-100 h-14 text-[11px] font-black uppercase tracking-widest rounded-2xl focus:ring-primary/20 focus:bg-white transition-all shadow-inner">
                                        <SelectValue placeholder="Select group..." />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white border-slate-200 shadow-xl rounded-2xl p-2">
                                        <SelectItem value="Standard" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">Standard Partners</SelectItem>
                                        <SelectItem value="Premium" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">Premium Fleet</SelectItem>
                                        <SelectItem value="Urgent" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">Rapid Response Team</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                  <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">4. Final Broadcast Payload</label>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-10 px-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl active:scale-95 transition-all"
                                      onClick={handleGenerateMessage}
                                    >
                                      Re-generate
                                    </Button>
                                  </div>
                                  <div className="relative">
                                    <Textarea 
                                      className="min-h-[160px] text-xs font-mono font-bold bg-slate-50 border-slate-200 rounded-2xl resize-none p-5 leading-relaxed focus:ring-primary/20 shadow-inner"
                                      placeholder="Message will appear here after selecting a group..."
                                      value={generatedMessage}
                                      readOnly
                                    />
                                    {!generatedMessage && (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-[1px] rounded-2xl border border-dashed border-slate-200">
                                        <FileText size={32} className="text-slate-300 mb-2 opacity-50" />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Generation</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <DialogFooter className="mt-8 flex flex-row gap-3">
                                <Button 
                                  variant="ghost" 
                                  className="flex-1 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-slate-600 rounded-2xl active:scale-95 transition-all"
                                  onClick={() => setIsGenerating(false)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-primary/20 rounded-2xl active:scale-95 transition-all"
                                  disabled={!generatedMessage || isSaving}
                                  onClick={handleSaveBroadcast}
                                >
                                  {isSaving ? (
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      Dispatching...
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <Send size={14} />
                                      Commit
                                    </div>
                                  )}
                                </Button>
                              </DialogFooter>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden sm:block p-8">
                <div className="rounded-[2.5rem] border border-slate-100 overflow-hidden bg-white shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b border-slate-100 bg-slate-50/50">
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6 px-8">Queue ID</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6">Service / Request</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6">Target District</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6">Status</TableHead>
                        <TableHead className="text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6 px-8">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queue.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-64 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <CheckCircle2 size={48} className="mb-4 opacity-10" />
                              <p className="text-lg font-black uppercase tracking-tight text-slate-300">No requests waiting</p>
                              <p className="text-xs font-medium text-slate-400 mt-1">Check back later for new coordination tasks.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        queue.map((item) => (
                          <TableRow key={item.id} className="group transition-colors hover:bg-slate-50/50 border-b border-slate-50 last:border-0">
                            <TableCell className="font-mono font-black text-xs text-slate-400 px-8 py-6">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto font-mono font-black text-xs text-primary hover:no-underline tracking-tighter"
                                onClick={() => navigate(`/admin/requests?search=${item.requestId}`)}
                              >
                                {item.id}
                              </Button>
                            </TableCell>
                            <TableCell className="py-6">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-base text-slate-900 tracking-tight">{item.service}</span>
                                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-slate-50 font-black border-slate-200 uppercase tracking-widest rounded-lg">V{item.version}</Badge>
                                </div>
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.requestId}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-6">
                              <Badge variant="secondary" className="bg-slate-100 text-slate-900 font-black border-none uppercase tracking-widest px-4 py-1.5 rounded-full text-[10px]">
                                {item.district}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-6">
                              <div className="flex flex-col gap-2">
                                <Badge 
                                  variant={item.status === 'Sent' ? 'outline' : 'default'} 
                                  className={item.status === 'Sent' 
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full w-fit' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] px-3 py-1 shadow-md border-none uppercase tracking-widest rounded-full w-fit'}
                                >
                                  {item.status === 'Sent' ? 'PREPARED' : 'READY'}
                                </Badge>
                                {item.history && item.history.length > 0 && (
                                  <span className="text-[9px] text-slate-400 italic font-black uppercase tracking-widest ml-1">
                                    Last: {item.history[item.history.length - 1].group}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right px-8 py-6">
                              <div className="flex justify-end gap-3">
                                {item.status === 'Sent' && (
                                  <Button 
                                    variant="outline"
                                    className="h-12 flex items-center gap-2 border-slate-200 hover:bg-slate-50 font-black uppercase text-[10px] tracking-widest px-6 transition-all rounded-xl active:scale-95 shadow-sm"
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
                                      disabled={item.status === 'Sent' && !isGenerating}
                                      className={`h-12 flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] px-8 transition-all rounded-xl active:scale-95 shadow-lg ${
                                        item.status === 'Sent' 
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' 
                                        : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                                      }`}
                                      onClick={() => setSelectedRequest(item)}
                                    >
                                      <Sparkles size={14} className={item.status !== 'Sent' ? "text-primary" : ""} />
                                      {item.status === 'Sent' ? 'Sent' : (item.version > 1 ? `Send V${item.version}` : 'Generate')}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[500px] bg-white border-primary/20 shadow-xl p-0 overflow-hidden rounded-[2.5rem]">
                                    <div className="h-2 bg-primary w-full" />
                                    <div className="p-8 sm:p-10">
                                      <DialogHeader className="mb-10">
                                        <div className="flex items-center gap-5">
                                          <div className="p-4 bg-primary/10 rounded-[1.5rem] shadow-inner">
                                            <Sparkles className="text-primary" size={28} />
                                          </div>
                                          <div>
                                            <DialogTitle className="text-subtitle text-slate-900">
                                              SAHLI Engine
                                            </DialogTitle>
                                            <DialogDescription className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">
                                              {item.service} • {item.district} (V{item.version})
                                            </DialogDescription>
                                          </div>
                                        </div>
                                      </DialogHeader>
                                      
                                      <div className="space-y-8">
                                        <div className="space-y-4">
                                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <Users size={14} className="text-primary" />
                                            1. Target Audience
                                          </label>
                                          <div className="p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex flex-col gap-2 shadow-inner">
                                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">RateUp Dynamic Lists</span>
                                            <p className="text-[11px] text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">Broadcast will be sent to the specific pricing tier group.</p>
                                          </div>
                                        </div>
  
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                          <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">2. Template</label>
                                            <Select onValueChange={setSelectedTemplate}>
                                              <SelectTrigger className="bg-slate-50 border-slate-100 h-14 text-[11px] font-black uppercase tracking-widest rounded-2xl focus:ring-primary/20 focus:bg-white transition-all shadow-inner">
                                                <SelectValue placeholder="Choose..." />
                                              </SelectTrigger>
                                              <SelectContent className="bg-white border-slate-200 shadow-xl rounded-2xl p-2">
                                                <SelectItem value="none" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">No Template</SelectItem>
                                                {templates.filter(t => t.category === 'Broadcast').map(template => (
                                                  <SelectItem key={template.id} value={template.id} className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">
                                                    {template.name}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          </div>
  
                                          <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">3. RateUp Group</label>
                                            <Select onValueChange={setSelectedRateUp}>
                                              <SelectTrigger className="bg-slate-50 border-slate-100 h-14 text-[11px] font-black uppercase tracking-widest rounded-2xl focus:ring-primary/20 focus:bg-white transition-all shadow-inner">
                                                <SelectValue placeholder="Select..." />
                                              </SelectTrigger>
                                              <SelectContent className="bg-white border-slate-200 shadow-xl rounded-2xl p-2">
                                                <SelectItem value="Standard" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">Standard</SelectItem>
                                                <SelectItem value="Premium" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">Premium</SelectItem>
                                                <SelectItem value="Urgent" className="text-[11px] font-black uppercase tracking-widest rounded-xl py-3 px-4 focus:bg-primary/5">Urgent</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
  
                                        <div className="space-y-3 pt-2">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">4. Payload Preview</label>
                                            <Button 
                                              variant="ghost" 
                                              size="sm" 
                                              className="h-10 px-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl active:scale-95 transition-all"
                                              onClick={handleGenerateMessage}
                                            >
                                              Refresh
                                            </Button>
                                          </div>
                                          <div className="relative">
                                            <Textarea 
                                              className="min-h-[160px] text-xs font-mono font-bold bg-slate-50 border-slate-200 rounded-2xl resize-none p-6 leading-relaxed focus:ring-primary/20 shadow-inner"
                                              placeholder="Message preview..."
                                              value={generatedMessage}
                                              readOnly
                                            />
                                            {!generatedMessage && (
                                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-[1px] rounded-2xl border border-dashed border-slate-200">
                                                <FileText size={32} className="text-slate-300 mb-2 opacity-50" />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Generation</p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
  
                                      <DialogFooter className="mt-10 flex flex-row gap-4">
                                        <Button 
                                          variant="ghost" 
                                          className="flex-1 h-14 font-black uppercase text-[11px] tracking-widest text-slate-400 hover:text-slate-600 rounded-2xl active:scale-95 transition-all"
                                          onClick={() => setIsGenerating(false)}
                                        >
                                          Cancel
                                        </Button>
                                        <Button 
                                          className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-primary/20 rounded-2xl active:scale-95 transition-all"
                                          disabled={!generatedMessage || isSaving}
                                          onClick={handleSaveBroadcast}
                                        >
                                          {isSaving ? (
                                            <div className="flex items-center gap-3">
                                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                              Dispatching
                                            </div>
                                          ) : (
                                            <div className="flex items-center gap-3">
                                              <Send size={16} />
                                              Commit
                                            </div>
                                          )}
                                        </Button>
                                      </DialogFooter>
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

