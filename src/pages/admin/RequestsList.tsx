import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Clock, 
  ChevronRight,
  Plus,
  ArrowRight,
  Eye,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Flag,
  UserCheck,
  Star
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { Request, RequestStatus } from '@/lib/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { storageService } from '@/lib/storageService';
import { rateupService } from '@/lib/rateupService';
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

const OPERATIONAL_VIEWS = ['New', 'In Progress', 'Completed', 'All', 'Broadcasted', 'Provider Confirmed', 'Dropped'] as const;
type OperationalView = typeof OPERATIONAL_VIEWS[number];

const RequestsList = () => {
  const { dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterParam = queryParams.get('filter');
  const searchParam = queryParams.get('search');

  const [activeTab, setActiveTab] = useState<OperationalView>(() => {
    if (filterParam && (OPERATIONAL_VIEWS as readonly string[]).includes(filterParam)) {
      return filterParam as OperationalView;
    }
    return 'New';
  });
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [requests, setRequests] = useState<Request[]>(storageService.getRequests());
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [manualRequest, setManualRequest] = useState({
    customerPhone: '',
    service: '',
    area: '',
    urgency: 'Normal' as 'High' | 'Normal' | 'Flexible',
    description: ''
  });

  useEffect(() => {
    setRequests(storageService.getRequests());
  }, []);

  const handleManualEntry = () => {
    if (!manualRequest.customerPhone || !manualRequest.service || !manualRequest.area) {
      toast.error('Please fill in required fields (Phone, Service, Area).');
      return;
    }

    const newRequest = storageService.saveRequest({
      customer_id: `C-${Math.floor(Math.random() * 1000)}`,
      customer_phone: manualRequest.customerPhone,
      service_category: 'General',
      sub_service: manualRequest.service,
      area: manualRequest.area,
      urgency: manualRequest.urgency,
      description: manualRequest.description,
      intake_source: 'Manual WhatsApp',
      phone_verified: true,
      verification_method: 'WhatsApp OTP',
      verified_at: new Date().toISOString(),
      session_id: `manual_${Date.now()}`,
      terms_version_id: 'v1.0'
    });

    // Sync to RateUp
    const orgId = import.meta.env.VITE_RATEUP_ORG_ID;
    if (orgId) {
      rateupService.upsertContact({
        orgId,
        phoneNumber: manualRequest.customerPhone,
        name: `Customer ${manualRequest.customerPhone}`,
        customFields: {
          last_service: manualRequest.service,
          last_area: manualRequest.area,
          last_request_id: newRequest.id,
          source: 'manual_entry',
          last_status: 'New' as RequestStatus
        }
      }).catch(err => console.warn('RateUp Sync Error (Manual):', err));
    }

    setRequests(storageService.getRequests());
    setIsManualEntryOpen(false);
    setManualRequest({
      customerPhone: '',
      service: '',
      area: '',
      urgency: 'Normal',
      description: ''
    });
    toast.success('Manual request created successfully.');
  };

  useEffect(() => {
    if (filterParam && (OPERATIONAL_VIEWS as readonly string[]).includes(filterParam)) {
      setActiveTab(filterParam as OperationalView);
    }
  }, [filterParam]);

  const handleTabChange = (tab: OperationalView) => {
    setActiveTab(tab);
    if (tab === 'All') {
      navigate('/admin/requests');
    } else {
      const filterValue = tab.replace(/\s/g, '+');
      navigate(`/admin/requests?filter=${filterValue}`);
    }
  };

  const handleClarify = (request: Request) => {
    toast.info(`Opening WhatsApp to clarify details for ${request.id}`);
  };

  const handleRecordFeedback = (request: Request) => {
    toast.success(`Opening feedback form for completed request ${request.id}`);
  };

  const handleFlagIssue = (request: Request) => {
    toast.error(`Raising intervention flag for ${request.id}`);
  };

  const handleReview = (request: Request) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'All' || req.status === activeTab;
    const matchesSearch = searchQuery === '' || 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.sub_service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.customer_phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleStatusUpdate = (id: string, newStatus: RequestStatus, updates: Partial<Request> = {}) => {
    storageService.updateRequestStatus(id, newStatus, updates);
    const updatedRequest = storageService.getRequests().find(r => r.id === id);
    setRequests(storageService.getRequests());
    toast.success(`Request ${id} status updated to ${newStatus}`);
    
    // Sync status change to RateUp
    const orgId = import.meta.env.VITE_RATEUP_ORG_ID;
    if (orgId && updatedRequest) {
      rateupService.upsertContact({
        orgId,
        phoneNumber: updatedRequest.customer_phone,
        name: `Customer ${updatedRequest.customer_phone}`,
        customFields: {
          last_request_id: updatedRequest.id,
          last_status: newStatus as RequestStatus,
          last_updated: new Date().toISOString()
        }
      }).catch(err => console.warn('RateUp Status Sync Error:', err));
    }

    if (newStatus === 'Broadcasted') {
      toast.info('Request moved to Broadcast Queue for message generation.');
      setTimeout(() => navigate('/admin/broadcast-queue'), 1500);
    }
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Broadcasted': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Provider Confirmed': return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
      case 'In Progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Dropped': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getAgeInMinutes = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    return Math.floor(diff / 60000);
  };

  const renderAction = (request: Request) => {
    const actions = [];

    // Common actions
    actions.push(
      <Button 
        key="view"
        size="sm" 
        variant="outline" 
        className="h-8 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
        onClick={() => handleReview(request)}
      >
        <Eye size={12} />
        View
      </Button>
    );

    if (request.status === 'New') {
      actions.push(
        <Button 
          key="broadcast"
          size="sm" 
          className="h-8 text-[10px] font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-700 flex items-center gap-1" 
          onClick={() => handleStatusUpdate(request.id, 'Broadcasted')}
        >
          <Sparkles size={12} />
          Broadcast
        </Button>
      );
      actions.push(
        <Button 
          key="drop"
          size="sm" 
          variant="ghost"
          className="h-8 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600 hover:bg-red-50" 
          onClick={() => handleStatusUpdate(request.id, 'Dropped')}
        >
          Drop
        </Button>
      );
    } else if (request.status === 'Broadcasted') {
      actions.push(
        <Button 
          key="manual-confirm"
          size="sm" 
          className="h-8 text-[10px] font-bold uppercase tracking-wider" 
          onClick={() => handleStatusUpdate(request.id, 'Provider Confirmed')}
        >
          Log YES
        </Button>
      );
    } else if (request.status === 'Provider Confirmed') {
      actions.push(
        <Button 
          key="confirm"
          size="sm" 
          className="h-8 bg-blue-600 hover:bg-blue-700 text-[10px] font-bold uppercase tracking-wider" 
          onClick={() => handleStatusUpdate(request.id, 'In Progress')}
        >
          Confirm Assignment
        </Button>
      );
    } else if (request.status === 'In Progress') {
      actions.push(
        <Button 
          key="flag"
          size="sm" 
          variant="outline"
          className="h-8 text-[10px] font-bold uppercase tracking-wider text-red-500 border-red-200 hover:bg-red-50" 
          onClick={() => handleFlagIssue(request)}
        >
          <Flag size={12} />
          Flag
        </Button>
      );
      actions.push(
        <Button 
          key="complete"
          size="sm" 
          className="h-8 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold uppercase tracking-wider" 
          onClick={() => handleStatusUpdate(request.id, 'Completed')}
        >
          Complete
        </Button>
      );
    } else if (request.status === 'Completed') {
      actions.push(
        <Button 
          key="feedback"
          size="sm" 
          variant="outline"
          className="h-8 text-[10px] font-bold uppercase tracking-wider text-blue-600 border-blue-200 hover:bg-blue-50" 
          onClick={() => handleRecordFeedback(request)}
        >
          <Star size={12} />
          Feedback
        </Button>
      );
    }

    return <div className="flex gap-2 justify-end">{actions}</div>;
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        {/* Review Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="text-primary" size={20} />
                Review Request Details
              </DialogTitle>
              <DialogDescription>
                Detailed breakdown of {selectedRequest?.id} for coordination.
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Request ID</span>
                    <p className="text-sm font-bold">{selectedRequest.id}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>

                {/* Evidence Bundle Section */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      Operational Evidence Bundle
                    </h4>
                    <Badge className={selectedRequest.audit_bundle_complete ? "bg-emerald-500" : "bg-amber-500"}>
                      {selectedRequest.audit_bundle_complete ? "SECURE" : "INCOMPLETE"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Identity Proof</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium">
                        <UserCheck size={12} className="text-emerald-500" />
                        WhatsApp OTP Verified
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Verified At</span>
                      <div className="text-[11px] font-medium">{new Date(selectedRequest.verified_at).toLocaleString()}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Session ID</span>
                      <div className="text-[11px] font-mono bg-white px-1 border border-slate-200 rounded">{selectedRequest.session_id}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Terms Version</span>
                      <div className="text-[11px] font-medium">{selectedRequest.terms_version_id}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Lifecycle Timestamps</span>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">Created</span>
                        <span className="font-mono">{new Date(selectedRequest.created_at).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">Last Change</span>
                        <span className="font-mono">{new Date(selectedRequest.last_state_change_at).toLocaleTimeString()}</span>
                      </div>
                      {selectedRequest.broadcasted_at && (
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-500">Broadcasted</span>
                          <span className="font-mono">{new Date(selectedRequest.broadcasted_at).toLocaleTimeString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service Category</span>
                    <p className="text-sm font-bold">{selectedRequest.service_category}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sub-Service</span>
                    <p className="text-sm font-bold">{selectedRequest.sub_service}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Area</span>
                    <p className="text-sm font-bold">{selectedRequest.area}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urgency</span>
                    <p className="text-sm font-bold">{selectedRequest.urgency}</p>
                  </div>
                </div>
                
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coordination Notes</span>
                  <p className="text-sm bg-slate-50 p-3 rounded-md italic">
                    {selectedRequest.description || "No additional details provided."}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Intake Source</span>
                    <Badge variant="outline" className="ml-2 uppercase text-[9px]">{selectedRequest.intake_source}</Badge>
                  </div>
                  {selectedRequest.assigned_provider_id && (
                    <div className="space-y-1 text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Provider</span>
                      <p className="text-xs font-bold text-blue-600">{selectedRequest.assigned_provider_id}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="ghost" onClick={() => setIsPreviewOpen(false)} className="text-[10px] font-bold uppercase tracking-widest">Close</Button>
              <Button 
                variant="outline" 
                className="gap-2 text-[10px] font-bold uppercase tracking-widest" 
                onClick={() => {
                  setIsPreviewOpen(false);
                  if (selectedRequest) handleClarify(selectedRequest);
                }}
              >
                <MessageSquare size={14} />
                Edit Notes
              </Button>
              {selectedRequest?.status === 'New' && (
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 gap-2 text-[10px] font-bold uppercase tracking-widest"
                  onClick={() => {
                    setIsPreviewOpen(false);
                    handleStatusUpdate(selectedRequest?.id || '', 'Broadcasted');
                  }}
                >
                  <Sparkles size={14} />
                  Broadcast
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">INTAKE</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold text-[10px]">{requests.length} TOTAL REQUESTS</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Requests Module</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Monitor customer intake and manage manual/explicit status transitions.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] h-9 px-6 shadow-sm flex items-center gap-2">
                  <Sparkles size={14} /> Manual Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Manual Request</DialogTitle>
                  <DialogDescription>
                    Enter request details received via phone or offline channels.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customerPhone">Customer Phone</Label>
                    <Input 
                      id="customerPhone" 
                      placeholder="+974 0000 0000" 
                      value={manualRequest.customerPhone}
                      onChange={(e) => setManualRequest({...manualRequest, customerPhone: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="service">Service Required</Label>
                    <Input 
                      id="service" 
                      placeholder="e.g. AC Repair" 
                      value={manualRequest.service}
                      onChange={(e) => setManualRequest({...manualRequest, service: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="area">Area / Location</Label>
                    <Input 
                      id="area" 
                      placeholder="e.g. Al Waab" 
                      value={manualRequest.area}
                      onChange={(e) => setManualRequest({...manualRequest, area: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select 
                      value={manualRequest.urgency}
                      onValueChange={(val) => setManualRequest({...manualRequest, urgency: val as 'High' | 'Normal' | 'Flexible'})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Notes / Description</Label>
                    <Input 
                      id="description" 
                      placeholder="Additional details..." 
                      value={manualRequest.description}
                      onChange={(e) => setManualRequest({...manualRequest, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsManualEntryOpen(false)}>Cancel</Button>
                  <Button onClick={handleManualEntry} className="bg-primary">Create Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search by ID, service, or customer..." 
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {OPERATIONAL_VIEWS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full border ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-200' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent border-b border-slate-200">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-4">Request Ref</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Service Details</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Customer</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 text-center">Audit</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Status</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-widest py-4 px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  return (
                    <TableRow key={request.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-mono font-bold text-xs text-slate-500 px-4">
                        <div className="flex flex-col">
                          <span>{request.id}</span>
                          <span className="text-[9px] font-medium text-slate-400">
                            {getAgeInMinutes(request.created_at)}m ago
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-sm">{request.sub_service}</div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{request.area}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-xs">{request.customer_phone}</div>
                        <div className="text-[9px] text-slate-400 uppercase tracking-tighter">{request.intake_source}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {request.audit_bundle_complete ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[8px] font-black text-emerald-600 uppercase">Secure</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-0.5">
                            <ShieldAlert size={14} className="text-amber-500" />
                            <span className="text-[8px] font-black text-amber-600 uppercase">Audit Gap</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] font-black uppercase tracking-widest ${getStatusColor(request.status)}`}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {renderAction(request)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default RequestsList;
