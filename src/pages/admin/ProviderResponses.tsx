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
    
    switch (response.status) {
      case 'Eligible': 
        return (
          <div className="flex flex-col gap-1.5 items-end">
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 flex items-center gap-1.5 w-fit font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full">
              <Trophy size={12} />
              First YES (Winner)
            </Badge>
            {isLocked && <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-blue-200 text-blue-500 px-2 py-0.5 rounded-full bg-blue-50/30">Locked by other</Badge>}
          </div>
        );
      case 'Waitlisted': 
        return (
          <div className="flex flex-col gap-1.5 items-end">
            <Badge variant="outline" className="text-slate-400 border-slate-200 font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full bg-slate-50/50">Waitlisted</Badge>
            {isLocked && <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-blue-200 text-blue-500 px-2 py-0.5 rounded-full bg-blue-50/30">Request Locked</Badge>}
          </div>
        );
      case 'Confirmed': 
        return (
          <div className="flex flex-col gap-1.5 items-end">
            <Badge className={`font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full border-none shadow-sm ${isInProgress ? "bg-emerald-600 text-white shadow-emerald-100" : "bg-blue-600 text-white shadow-blue-100"}`}>
              {response.assignmentMethod === 'manual' ? 'Manual Assignment' : 'Confirmed Assignment'}
            </Badge>
            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 flex items-center gap-1.5 w-fit text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              <CheckCircle2 size={12} />
              {isInProgress ? 'In Progress' : 'Request Locked'}
            </Badge>
            {response.overrideReason && (
              <span className="text-[9px] font-bold text-slate-400 italic max-w-[150px] truncate bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                Reason: {response.overrideReason}
              </span>
            )}
          </div>
        );
      case 'Invalid Response': 
        return (
          <Badge variant="destructive" className="bg-red-50 text-red-500 border-red-100 flex items-center gap-1.5 w-fit font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full">
            <AlertTriangle size={12} />
            Invalid Format
          </Badge>
        );
      default: return <Badge variant="outline" className="font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full">{response.status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px] px-3 py-1">OPERATIONS</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] px-3 py-1 uppercase">{responses.length} TOTAL REPLIES</Badge>
            </div>
            <h1 className="text-display text-slate-900">Interaction History</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium leading-relaxed max-w-xl">
              Monitor provider replies and confirm assignments for active coordination requests. All interactions are logged with cryptographic verification.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Dialog open={isOverriding} onOpenChange={setIsOverriding}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-14 flex-1 sm:flex-none sm:px-8 gap-3 border-slate-200 font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-sm hover:bg-slate-50">
                  <AlertTriangle size={18} className="text-amber-500" /> 
                  Override
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                    <AlertTriangle className="text-amber-500" size={24} />
                    Manual Override
                  </DialogTitle>
                  <DialogDescription className="text-xs font-bold text-slate-500 leading-relaxed">
                    Force assign a provider regardless of the "First YES" logic. This action will be logged as a governance event.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid gap-3">
                    <Label htmlFor="overrideRequestId" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Request Reference</Label>
                    <Input 
                      id="overrideRequestId" 
                      placeholder="e.g. SR-4092" 
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5 font-bold"
                      value={overrideData.requestId}
                      onChange={(e) => setOverrideData({...overrideData, requestId: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="overrideProvider" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Provider Name</Label>
                    <Input 
                      id="overrideProvider" 
                      placeholder="e.g. Premium Services Ltd" 
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5 font-bold"
                      value={overrideData.providerName}
                      onChange={(e) => setOverrideData({...overrideData, providerName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="reason" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason for Override</Label>
                    <Select onValueChange={(val) => setOverrideData({...overrideData, reason: val})}>
                      <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5 font-bold">
                        <SelectValue placeholder="Select reason..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                        <SelectItem value="VIP Customer Request" className="py-3 font-bold text-sm">VIP Customer Request</SelectItem>
                        <SelectItem value="Emergency / Immediate Need" className="py-3 font-bold text-sm">Emergency / Immediate Need</SelectItem>
                        <SelectItem value="Repeat Provider Preference" className="py-3 font-bold text-sm">Repeat Provider Preference</SelectItem>
                        <SelectItem value="Technical Failure in Auto-Flow" className="py-3 font-bold text-sm">Technical Failure in Auto-Flow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="gap-3 sm:gap-2">
                  <Button variant="outline" className="h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] flex-1 active:scale-95 transition-all" onClick={() => setIsOverriding(false)}>Cancel</Button>
                  <Button onClick={handleManualOverride} className="h-14 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-widest text-[11px] flex-1 active:scale-95 transition-all shadow-lg">Confirm Override</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isLogging} onOpenChange={setIsLogging}>
              <DialogTrigger asChild>
                <Button className="h-14 flex-1 sm:flex-none sm:px-8 gap-3 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all active:scale-95 shadow-xl shadow-primary/20">
                  <Plus size={18} /> Log Response
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-subtitle text-slate-900">Log External Response</DialogTitle>
                  <DialogDescription className="text-xs font-bold text-slate-500 leading-relaxed">
                    Manually record a provider's response received outside the automated WhatsApp flow.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid gap-3">
                    <Label htmlFor="requestId" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Request Reference</Label>
                    <Input 
                      id="requestId" 
                      placeholder="e.g. SR-4092" 
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5 font-bold"
                      value={manualResponse.requestId}
                      onChange={(e) => setManualResponse({...manualResponse, requestId: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="provider" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Provider Name</Label>
                    <Input 
                      id="provider" 
                      placeholder="Company Name" 
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5 font-bold"
                      value={manualResponse.providerName}
                      onChange={(e) => setManualResponse({...manualResponse, providerName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message Content</Label>
                    <Select onValueChange={(val) => setManualResponse({...manualResponse, message: val})}>
                      <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5 font-bold">
                        <SelectValue placeholder="Select response type..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                        <SelectItem value="YES" className="py-3 font-bold text-sm">YES (Standard Acceptance)</SelectItem>
                        <SelectItem value="Busy" className="py-3 font-bold text-sm">Busy / Unavailable</SelectItem>
                        <SelectItem value="Other" className="py-3 font-bold text-sm">Other / Query</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="gap-3 sm:gap-2">
                  <Button variant="outline" className="h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] flex-1 active:scale-95 transition-all" onClick={() => setIsLogging(false)}>Cancel</Button>
                  <Button onClick={handleLogManualResponse} className="h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[11px] flex-1 active:scale-95 transition-all shadow-lg">Save Response</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 sm:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <Input 
              placeholder="Search by ID, provider, or message..." 
              className="w-full bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl py-2 pl-14 pr-6 h-14 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-primary/10 shadow-xl overflow-hidden bg-white/80 backdrop-blur-md rounded-[2.5rem]">
          <div className="h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
          <CardContent className="p-0">
            {/* Mobile View: Response Cards */}
            <div className="block sm:hidden p-4 sm:p-6 space-y-6 bg-slate-50/30">
              {filteredResponses.length > 0 ? (
                filteredResponses.map((response) => (
                  <div key={response.id} className={`p-6 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40 space-y-6 active:scale-[0.98] transition-all relative overflow-hidden ${response.status === 'Confirmed' ? 'ring-2 ring-emerald-500/30' : ''}`}>
                    {response.status === 'Confirmed' && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12" />
                    )}
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1 flex-1">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto justify-start font-mono font-black text-[10px] text-primary hover:no-underline tracking-tighter w-fit"
                          onClick={() => navigate(`/admin/requests?search=${response.requestId}`)}
                        >
                          {response.requestId}
                        </Button>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto justify-start font-black text-xl text-slate-900 mt-1 hover:no-underline tracking-tight text-left leading-tight"
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
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{response.timestamp}</span>
                      </div>
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        {getStatusBadge(response)}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                          {response.channel === 'WhatsApp' ? <Phone size={12} className="text-emerald-500" /> : <Plus size={12} />}
                          {response.channel}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50/80 p-5 rounded-[1.5rem] border border-slate-100 shadow-inner">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Message Content</span>
                      <p className="text-xs font-bold text-slate-700 leading-relaxed italic">"{response.message}"</p>
                    </div>

                    {response.status === 'Confirmed' && (
                      <div className="p-5 bg-primary/5 rounded-[1.5rem] border border-primary/10 space-y-4">
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest block">Contact Exchange Details</span>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary/5 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <UserCheck size={16} className="text-primary" />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</span>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{response.providerPhone}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary/5 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <Phone size={16} className="text-emerald-500" />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</span>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{response.customerPhone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" className="h-14 flex-1 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-primary hover:bg-primary/5 active:scale-95 transition-all border-slate-100 shadow-sm">
                        Full interaction log
                      </Button>
                      {response.status === 'Eligible' && !lockedRequests[response.requestId] && (
                        <Button 
                          className="h-14 flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] text-[11px] active:scale-95 transition-all shadow-lg shadow-emerald-100"
                          onClick={() => handleConfirmAssignment(response.id)}
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-slate-400 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-10" />
                  <p className="text-lg font-black tracking-tight text-slate-300 uppercase">No interactions found</p>
                  <p className="text-xs font-medium text-slate-400 mt-1">Adjust your search or wait for incoming pings.</p>
                </div>
              )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20 px-10">Request / Time</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Provider</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Response Detail</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Contact Details</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-20 px-10">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResponses.length > 0 ? (
                    filteredResponses.map((response) => (
                      <TableRow key={response.id} className={`border-slate-50 hover:bg-slate-50/30 transition-colors group ${response.status === 'Confirmed' ? 'bg-emerald-50/20' : ''}`}>
                        <TableCell className="px-10 py-6">
                          <div className="flex flex-col gap-1.5">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto justify-start font-mono font-black text-[10px] text-primary hover:no-underline tracking-tighter"
                              onClick={() => navigate(`/admin/requests?search=${response.requestId}`)}
                            >
                              {response.requestId}
                            </Button>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{response.timestamp}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1.5 py-4">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto justify-start font-black text-sm text-slate-900 hover:no-underline tracking-tight"
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
                            <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 w-fit">
                              {response.channel === 'WhatsApp' ? <Phone size={10} className="text-emerald-500" /> : <Plus size={10} />}
                              {response.channel}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="py-4 max-w-[200px]">
                            <p className="text-xs font-bold text-slate-600 leading-relaxed italic line-clamp-2 group-hover:line-clamp-none transition-all">
                              "{response.message}"
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="py-4">
                            {getStatusBadge(response)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {response.status === 'Confirmed' ? (
                            <div className="flex flex-col gap-1 py-4">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                <UserCheck size={12} className="text-primary" />
                                P: {response.providerPhone}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                <Phone size={12} className="text-emerald-500" />
                                C: {response.customerPhone}
                              </div>
                            </div>
                          ) : (
                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Locked</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right px-10">
                          <div className="flex justify-end gap-3">
                            {response.status === 'Eligible' && !lockedRequests[response.requestId] && (
                              <Button 
                                size="sm" 
                                className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[9px] rounded-xl active:scale-95 transition-all shadow-md shadow-emerald-100"
                                onClick={() => handleConfirmAssignment(response.id)}
                              >
                                Assign
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-10 px-6 text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20 rounded-xl transition-all active:scale-95 shadow-sm">
                              Detail
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <MessageSquare size={64} className="mb-6 opacity-10" />
                          <p className="text-xl font-black tracking-tight text-slate-300 uppercase">No interactions found</p>
                          <p className="text-sm font-medium text-slate-400 mt-2">Check incoming streams or broaden your search parameters.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-white border-slate-100 text-slate-900 rounded-[2.5rem] shadow-sm">
            <CardHeader className="pb-2 p-6 sm:p-8">
              <CardTitle className="text-xs font-black flex items-center gap-2 text-primary tracking-widest uppercase">
                <Info size={16} />
                First Valid YES Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-0 sm:pt-0">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The first provider to reply with an exact "YES" (case-insensitive) is automatically classified as <span className="text-slate-900 font-bold">Eligible</span>. All subsequent "YES" replies are waitlisted. This ensures fair opportunity while maintaining coordination speed.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-100 text-slate-900 rounded-[2.5rem] shadow-sm">
            <CardHeader className="pb-2 p-6 sm:p-8">
              <CardTitle className="text-xs font-black flex items-center gap-2 text-amber-500 tracking-widest uppercase">
                <AlertTriangle size={16} />
                Non-Binding Channel
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-0 sm:pt-0">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                WhatsApp is used solely for the <span className="text-slate-900 font-bold">delivery of intent</span>. No assignment is legally binding or system-finalized until an Admin clicks "Confirm & Assign" within this dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProviderResponses;
