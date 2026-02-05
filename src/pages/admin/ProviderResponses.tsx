import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Clock, MessageSquare, Plus, Phone, AlertTriangle, Info, Trophy, UserCheck, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { rateupService } from '@/lib/rateupService';
import { storageService, Response } from '@/lib/storageService';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProviderResponses = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';

  const [isLogging, setIsLogging] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [manualResponse, setManualResponse] = useState({
    requestId: '',
    providerName: '',
    message: ''
  });
  
  const [responses, setResponses] = useState<Response[]>(storageService.getResponses());

  const filteredResponses = responses.filter(res => {
    const query = searchQuery.toLowerCase();
    return (
      res.requestId.toLowerCase().includes(query) ||
      res.provider.toLowerCase().includes(query) ||
      res.message.toLowerCase().includes(query)
    );
  });

  // Derived state for locked requests based on real data
  const lockedRequests = responses.reduce((acc, r) => {
    if (r.status === 'Confirmed') {
      acc[r.requestId] = { status: 'IN_PROGRESS', winnerId: r.id };
    } else if (r.isFirst && r.status === 'Eligible' && !acc[r.requestId]) {
      acc[r.requestId] = { status: 'LOCKED_PENDING_CONFIRMATION', winnerId: r.id };
    }
    return acc;
  }, {} as Record<string, { status: string, winnerId?: number }>);

  const handleConfirmAssignment = (id: number) => {
    const responseToConfirm = responses.find(r => r.id === id);
    if (!responseToConfirm) return;

    // Update real storage
    storageService.updateResponse(id, { status: 'Confirmed' });
    
    // Update others for same request to Waitlisted if they were Eligible
    responses.forEach(r => {
      if (r.requestId === responseToConfirm.requestId && r.id !== id && r.status === 'Eligible') {
        storageService.updateResponse(r.id, { status: 'Waitlisted' });
      }
    });

    // Update the request status to "In Progress"
    storageService.updateRequestStatus(responseToConfirm.requestId, 'In Progress');

    setResponses(storageService.getResponses());
    
    storageService.logActivity({
      title: 'Assignment Confirmed',
      desc: `${responseToConfirm.provider} confirmed for ${responseToConfirm.requestId}.`,
      type: 'accept'
    });

    toast.success(`Assignment confirmed for ${responseToConfirm.requestId}. Status changed to IN PROGRESS.`);
  };

  const handleLogManualResponse = () => {
    if (!manualResponse.requestId || !manualResponse.providerName || !manualResponse.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    const provider = storageService.getProviders().find(p => p.company_name === manualResponse.providerName);
    const request = storageService.getRequests().find(r => r.id === manualResponse.requestId);

    storageService.saveResponse({
      requestId: manualResponse.requestId,
      provider: manualResponse.providerName,
      providerId: provider?.id || 'MANUAL',
      providerPhone: provider?.whatsapp || 'Unknown',
      customerPhone: request?.customer_id || 'Unknown',
      message: manualResponse.message,
      status: 'Eligible',
      isFirst: false,
      channel: 'Manual Log',
      assignmentMethod: 'manual',
      isLocked: false
    });

    setResponses(storageService.getResponses());
    setIsLogging(false);
    setManualResponse({ requestId: '', providerName: '', message: '' });
    toast.success('Manual response logged.');
  };

  // Missing #4: Manual Override State
  const [isOverriding, setIsOverriding] = useState(false);
  const [overrideData, setOverrideData] = useState({
    requestId: '',
    providerName: '',
    reason: ''
  });

  const handleManualOverride = () => {
    if (!overrideData.requestId || !overrideData.providerName || !overrideData.reason) {
      toast.error('Please provide request ID, provider name, and reason for override.');
      return;
    }

    const provider = storageService.getProviders().find(p => p.company_name === overrideData.providerName);
    const request = storageService.getRequests().find(r => r.id === overrideData.requestId);

    storageService.saveResponse({
      requestId: overrideData.requestId,
      provider: overrideData.providerName,
      providerId: provider?.id || 'OVERRIDE',
      providerPhone: provider?.whatsapp || '+974 0000 0000',
      customerPhone: request?.customer_id || 'N/A',
      message: 'MANUAL ASSIGNMENT',
      status: 'Confirmed',
      isFirst: true,
      channel: 'Admin Override',
      assignmentMethod: 'manual',
      isLocked: true,
      overrideReason: overrideData.reason
    });

    // Update the request status to "In Progress"
    storageService.updateRequestStatus(overrideData.requestId, 'In Progress');

    setResponses(storageService.getResponses());
    setIsOverriding(false);
    setOverrideData({ requestId: '', providerName: '', reason: '' });
    toast.success(`Manual override successful for ${overrideData.requestId}. Provider ${overrideData.providerName} assigned.`);
  };

  const getStatusBadge = (response: Response) => {
    const lock = lockedRequests[response.requestId];
    const isLocked = lock && (lock.status === 'LOCKED_CONFIRMED' || lock.status === 'IN_PROGRESS');
    const isInProgress = lock && lock.status === 'IN_PROGRESS';
    const isPendingLock = lock && lock.status === 'LOCKED_PENDING_CONFIRMATION';
    
    switch (response.status) {
      case 'Eligible': 
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 flex items-center gap-1 w-fit">
              <Trophy size={12} />
              First YES (Winner)
            </Badge>
            {isLocked && <Badge variant="outline" className="text-[8px] uppercase border-blue-200 text-blue-500">Locked by other</Badge>}
          </div>
        );
      case 'Waitlisted': 
        return (
          <div className="flex flex-col gap-1">
            <Badge variant="outline" className="text-slate-400 border-slate-200">Waitlisted</Badge>
            {isLocked && <Badge variant="outline" className="text-[8px] uppercase border-blue-200 text-blue-500">Request Locked</Badge>}
          </div>
        );
      case 'Confirmed': 
        return (
          <div className="flex flex-col gap-1">
            <Badge className={isInProgress ? "bg-emerald-600 text-white border-none" : "bg-blue-600 text-white border-none"}>
              {response.assignmentMethod === 'manual' ? 'Manual Assignment' : 'Confirmed Assignment'}
            </Badge>
            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 flex items-center gap-1 w-fit text-[9px] font-black uppercase tracking-widest">
              <CheckCircle2 size={10} />
              {isInProgress ? 'In Progress' : 'Request Locked'}
            </Badge>
            {response.overrideReason && (
              <span className="text-[8px] text-slate-500 italic max-w-[120px] truncate">
                Reason: {response.overrideReason}
              </span>
            )}
          </div>
        );
      case 'Invalid Response': 
        return (
          <Badge variant="destructive" className="bg-red-50 text-red-500 border-red-100 flex items-center gap-1 w-fit">
            <AlertTriangle size={12} />
            Invalid Format
          </Badge>
        );
      default: return <Badge variant="outline">{response.status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex items-center justify-between mb-6 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">OPERATIONS</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold text-[10px]">{responses.length} TOTAL REPLIES</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Interaction History</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Monitor provider replies and confirm assignments for active coordination requests.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={isOverriding} onOpenChange={setIsOverriding}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2 border-slate-200 font-bold text-[10px] uppercase tracking-widest">
                  <AlertTriangle size={14} className="text-amber-500" /> Manual Override
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="text-amber-500" size={20} />
                    Admin Manual Override
                  </DialogTitle>
                  <DialogDescription>
                    Force assign a provider regardless of the "First YES" logic.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="overrideRequestId">Request Reference</Label>
                    <Input 
                      id="overrideRequestId" 
                      placeholder="e.g. SR-4092" 
                      value={overrideData.requestId}
                      onChange={(e) => setOverrideData({...overrideData, requestId: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="overrideProvider">Provider Name</Label>
                    <Input 
                      id="overrideProvider" 
                      placeholder="e.g. Premium Services Ltd" 
                      value={overrideData.providerName}
                      onChange={(e) => setOverrideData({...overrideData, providerName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Reason for Override</Label>
                    <Select onValueChange={(val) => setOverrideData({...overrideData, reason: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIP Customer Request">VIP Customer Request</SelectItem>
                        <SelectItem value="Emergency / Immediate Need">Emergency / Immediate Need</SelectItem>
                        <SelectItem value="Repeat Provider Preference">Repeat Provider Preference</SelectItem>
                        <SelectItem value="Technical Failure in Auto-Flow">Technical Failure in Auto-Flow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOverriding(false)}>Cancel</Button>
                  <Button onClick={handleManualOverride} className="bg-amber-600 hover:bg-amber-700 text-white">Confirm Override</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isLogging} onOpenChange={setIsLogging}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9 gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] px-4">
                  <Plus size={14} /> Log Response
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Log External Response</DialogTitle>
                  <DialogDescription>
                    Manually record a provider's response if received outside the automated flow.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="requestId">Request Reference</Label>
                    <Input 
                      id="requestId" 
                      placeholder="e.g. SR-4092" 
                      value={manualResponse.requestId}
                      onChange={(e) => setManualResponse({...manualResponse, requestId: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="provider">Provider Name</Label>
                    <Input 
                      id="provider" 
                      placeholder="Company Name" 
                      value={manualResponse.providerName}
                      onChange={(e) => setManualResponse({...manualResponse, providerName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message Content</Label>
                    <Select onValueChange={(val) => setManualResponse({...manualResponse, message: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select response type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">YES (Standard Acceptance)</SelectItem>
                        <SelectItem value="Busy">Busy / Unavailable</SelectItem>
                        <SelectItem value="Other">Other / Query</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsLogging(false)}>Cancel</Button>
                  <Button onClick={handleLogManualResponse} className="bg-primary">Save Response</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <Input 
              placeholder="Search by ID, provider, or message..." 
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 h-10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent border-b border-slate-200">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-4">Ref</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Provider</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Message</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Channel</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Status / Classification</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Contact Exchange</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-widest py-4 px-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {filteredResponses.map((response) => (
                    <TableRow key={response.id} className={`${response.status === 'Confirmed' ? 'bg-blue-50/50' : ''} transition-colors`}>
                      <TableCell className="font-mono font-bold text-xs text-muted-foreground px-4">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto justify-start font-mono font-bold text-xs text-primary"
                          onClick={() => navigate(`/admin/requests?search=${response.requestId}`)}
                        >
                          {response.requestId}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <Button 
                            variant="link" 
                            className="p-0 h-auto justify-start font-bold text-sm text-slate-900"
                            onClick={() => {
                              const provider = storageService.getProviders().find(p => p.company_name === response.provider);
                              if (provider) {
                                navigate(`/admin/providers?search=${provider.id}`);
                              } else {
                                toast.error('Provider details not found');
                              }
                            }}
                          >
                            {response.provider}
                          </Button>
                          <span className="text-[10px] text-muted-foreground">{response.timestamp}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${response.message === 'YES' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'}`}>
                          "{response.message}"
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 uppercase">
                          {response.channel === 'WhatsApp' ? <Phone size={10} /> : <Plus size={10} />}
                          {response.channel}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(response)}</TableCell>
                      <TableCell>
                        {response.status === 'Confirmed' ? (
                          <div className="space-y-1 animate-in fade-in duration-500">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600">
                              <UserCheck size={10} className="text-primary" />
                              P: {response.providerPhone}
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600">
                              <Phone size={10} className="text-primary" />
                              C: {response.customerPhone}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[9px] text-slate-300 italic">Locked until confirm</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right px-6">
                        {response.status === 'Eligible' && !lockedRequests[response.requestId] && (
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90 text-[10px] h-8 uppercase font-black tracking-widest px-4"
                            onClick={() => handleConfirmAssignment(response.id)}
                          >
                            Confirm & Assign
                          </Button>
                        )}
                        {response.status === 'Confirmed' && (
                          <div className="flex items-center justify-end text-blue-600 gap-1 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={14} />
                            Assigned
                          </div>
                        )}
                        {response.status === 'Waitlisted' && (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Queue Position: #{response.id - 1}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredResponses.length > 0 && (
                    <TableRow className="bg-slate-50/30 hover:bg-slate-50/30">
                      <TableCell colSpan={7} className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Summary:</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-[10px] font-bold">
                            {filteredResponses.filter(r => r.status === 'Confirmed').length} Confirmed
                          </Badge>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">
                            {filteredResponses.filter(r => r.status === 'Eligible').length} Eligible
                          </Badge>
                          <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-[10px] font-bold">
                            {filteredResponses.filter(r => r.status === 'Waitlisted').length} Waitlisted
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredResponses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-slate-400 italic">
                        No responses found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black flex items-center gap-2 text-primary tracking-widest uppercase">
                  <Info size={16} />
                  First Valid YES Protocol
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The first provider to reply with an exact "YES" (case-insensitive) is automatically classified as <span className="text-white font-bold">Eligible</span>. All subsequent "YES" replies are waitlisted. This ensures fair opportunity while maintaining coordination speed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black flex items-center gap-2 text-amber-500 tracking-widest uppercase">
                  <AlertTriangle size={16} />
                  Non-Binding Channel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  WhatsApp is used solely for the <span className="text-white font-bold">delivery of intent</span>. No assignment is legally binding or system-finalized until an Admin clicks "Confirm & Assign" within this dashboard.
                </p>
              </CardContent>
            </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProviderResponses;
