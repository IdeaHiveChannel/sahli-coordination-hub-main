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
  Star,
  MapPin
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

    const formattedPhone = rateupService.formatPhoneNumber(manualRequest.customerPhone);

    const newRequest = storageService.saveRequest({
      customer_id: `C-${Math.floor(Math.random() * 1000)}`,
      customer_phone: formattedPhone,
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
        phoneNumber: formattedPhone,
        name: `Customer ${formattedPhone}`,
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

  const handleManualEntryOpen = () => {
    setIsManualEntryOpen(true);
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
        className="flex-1 md:flex-none h-11 md:h-8 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl md:rounded-lg border-slate-200 active:scale-[0.98] transition-all"
        onClick={() => handleReview(request)}
      >
        <Eye size={14} className="md:size-3" />
        View
      </Button>
    );

    if (request.status === 'New') {
      actions.push(
        <Button 
          key="broadcast"
          size="sm" 
          className="flex-1 md:flex-none h-11 md:h-8 text-[10px] font-black uppercase tracking-wider bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 rounded-xl md:rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" 
          onClick={() => handleStatusUpdate(request.id, 'Broadcasted')}
        >
          <Sparkles size={14} className="md:size-3" />
          Broadcast
        </Button>
      );
      actions.push(
        <Button 
          key="drop"
          size="sm" 
          variant="ghost"
          className="flex-1 md:flex-none h-11 md:h-8 text-[10px] font-black uppercase tracking-wider text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl md:rounded-lg active:scale-[0.98] transition-all" 
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
          className="flex-1 md:flex-none h-11 md:h-8 text-[10px] font-black uppercase tracking-wider rounded-xl md:rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" 
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
          className="flex-1 md:flex-none h-11 md:h-8 bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl md:rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" 
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
          className="flex-1 md:flex-none h-11 md:h-8 text-[10px] font-black uppercase tracking-wider text-red-500 border-red-200 hover:bg-red-50 rounded-xl md:rounded-lg active:scale-[0.98] transition-all" 
          onClick={() => handleFlagIssue(request)}
        >
          <Flag size={14} className="md:size-3" />
          Flag
        </Button>
      );
      actions.push(
        <Button 
          key="complete"
          size="sm" 
          className="flex-1 md:flex-none h-11 md:h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl md:rounded-lg shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all" 
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
          className="flex-1 md:flex-none h-11 md:h-8 text-[10px] font-black uppercase tracking-wider text-blue-600 border-blue-200 hover:bg-blue-50 rounded-xl md:rounded-lg active:scale-[0.98] transition-all" 
          onClick={() => handleRecordFeedback(request)}
        >
          <Star size={14} className="md:size-3" />
          Feedback
        </Button>
      );
    }

    return <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-2 justify-end w-full">{actions}</div>;
  };

  return (
    <AdminLayout>
      <div className="py-2 md:py-8 space-y-4 md:space-y-8" dir={dir}>
        {/* Header Section */}
        <div className="px-4 md:px-0">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-slate-100/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h1 className="text-display text-slate-900">
                    Requests Hub
                  </h1>
                </div>
                <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest ml-14 md:ml-16">
                  {filteredRequests.length} Active Coordination Tasks
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder="Search ID, Phone, Area..." 
                    className="h-14 pl-11 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all font-bold text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleManualEntryOpen}
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} strokeWidth={3} />
                  Manual Entry
                </Button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-8 -mx-2 px-2 scrollbar-hide">
              {OPERATIONAL_VIEWS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`whitespace-nowrap px-6 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Grid/Table Section */}
        <div className="px-4 md:px-0 pb-20">
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Search size={32} className="text-slate-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-subtitle text-slate-900">No requests found</h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Try adjusting your filters or search query</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('All');
                    navigate('/admin/requests');
                  }}
                  className="h-12 px-6 rounded-xl font-black uppercase tracking-widest border-slate-200 active:scale-95 transition-all"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="bg-white p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-2xl shadow-sm ${getStatusColor(request.status).split(' ')[0]}`}>
                          <MessageSquare className={getStatusColor(request.status).split(' ')[1]} size={24} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black uppercase tracking-tighter text-slate-900">{request.id}</span>
                            <Badge variant="outline" className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border-2 ${getStatusColor(request.status)}`}>
                              {request.status}
                            </Badge>
                            {request.urgency === 'High' && (
                              <Badge className="bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full animate-pulse">
                                URGENT
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-slate-400" />
                              {request.area}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Sparkles size={14} className="text-slate-400" />
                              {request.sub_service}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-slate-400" />
                              {getAgeInMinutes(request.created_at)}m ago
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-black text-slate-900 tracking-tight">{request.customer_phone}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{request.intake_source}</p>
                        </div>
                        <div className="w-full md:w-auto">
                          {renderAction(request)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="w-[95%] max-w-[500px] rounded-[2rem] md:rounded-3xl border-none shadow-xl">
            <DialogHeader className="text-left">
              <DialogTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Eye className="text-primary" size={20} />
                </div>
                Request Details
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-slate-500">
                Detailed breakdown of {selectedRequest?.id} for coordination.
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Request ID</span>
                    <p className="text-sm font-bold text-slate-900">{selectedRequest.id}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                    <div>
                      <Badge variant="outline" className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border-2 ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Evidence Bundle Section */}
                <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      Evidence Bundle
                    </h4>
                    <Badge className={`${selectedRequest.audit_bundle_complete ? "bg-emerald-500" : "bg-amber-500"} text-[8px] font-black px-2 py-0.5 rounded-full`}>
                      {selectedRequest.audit_bundle_complete ? "SECURE" : "INCOMPLETE"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Identity Proof</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                        <UserCheck size={12} className="text-emerald-500" />
                        WhatsApp Verified
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Verified At</span>
                      <div className="text-[11px] font-bold text-slate-700">{new Date(selectedRequest.verified_at).toLocaleDateString()}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Session ID</span>
                      <div className="text-[10px] font-mono bg-slate-50 px-2 py-0.5 border border-slate-200 rounded-lg text-slate-500 truncate">{selectedRequest.session_id}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Terms Version</span>
                      <div className="text-[11px] font-bold text-slate-700">{selectedRequest.terms_version_id}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Timeline</span>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-500">Created</span>
                        <span className="font-bold text-slate-700">{new Date(selectedRequest.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-500">Last Update</span>
                        <span className="font-bold text-slate-700">{new Date(selectedRequest.last_state_change_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service</span>
                    <p className="text-sm font-black text-slate-900">{selectedRequest.sub_service}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Area</span>
                    <p className="text-sm font-black text-slate-900">{selectedRequest.area}</p>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coordination Notes</span>
                  <div className="text-sm bg-slate-50 p-4 rounded-2xl italic text-slate-600 border border-slate-100 leading-relaxed">
                    {selectedRequest.description || "No additional details provided."}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Source</span>
                    <div>
                      <Badge variant="outline" className="uppercase text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 border-none">{selectedRequest.intake_source}</Badge>
                    </div>
                  </div>
                  {selectedRequest.assigned_provider_id && (
                    <div className="space-y-1 text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Provider</span>
                      <p className="text-xs font-black text-blue-600">{selectedRequest.assigned_provider_id}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsPreviewOpen(false)} className="w-full sm:w-auto h-12 text-[10px] font-black uppercase tracking-widest rounded-xl order-3 sm:order-1">Close</Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto h-12 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-200 active:scale-95 transition-all order-2" 
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
                  className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20 active:scale-95 transition-all order-1 sm:order-3"
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

        {/* Manual Entry Dialog */}
        <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
          <DialogContent className="w-[95%] max-w-[450px] rounded-[2.5rem] border-none shadow-xl p-0 overflow-hidden">
            <div className="p-8 space-y-6">
              <DialogHeader className="text-left">
                <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tight">
                  <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                    <Plus className="text-white" size={20} strokeWidth={3} />
                  </div>
                  Manual Request
                </DialogTitle>
                <DialogDescription className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                  Create a new coordination task manually
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Customer Phone</Label>
                  <Input 
                    id="customerPhone" 
                    placeholder="+974 0000 0000" 
                    value={manualRequest.customerPhone}
                    onChange={(e) => setManualRequest({...manualRequest, customerPhone: e.target.value})}
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all font-bold"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service</Label>
                    <Input 
                      id="service" 
                      placeholder="e.g. AC Repair" 
                      value={manualRequest.service}
                      onChange={(e) => setManualRequest({...manualRequest, service: e.target.value})}
                      className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Area</Label>
                    <Input 
                      id="area" 
                      placeholder="e.g. Al Waab" 
                      value={manualRequest.area}
                      onChange={(e) => setManualRequest({...manualRequest, area: e.target.value})}
                      className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Urgency Level</Label>
                  <Select 
                    value={manualRequest.urgency}
                    onValueChange={(val) => setManualRequest({...manualRequest, urgency: val as 'High' | 'Normal' | 'Flexible'})}
                  >
                    <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all font-bold">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-200">
                      <SelectItem value="Flexible" className="font-bold">Flexible</SelectItem>
                      <SelectItem value="Normal" className="font-bold">Normal</SelectItem>
                      <SelectItem value="High" className="font-bold text-primary">High Urgency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Internal Notes</Label>
                  <Input 
                    id="description" 
                    placeholder="Any specific customer requirements..." 
                    value={manualRequest.description}
                    onChange={(e) => setManualRequest({...manualRequest, description: e.target.value})}
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsManualEntryOpen(false)} 
                  className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleManualEntry} 
                  className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  Create Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation Tabs - Mobile Optimized */}
        <div className="mb-6 -mx-2 px-2 overflow-x-auto no-scrollbar flex items-center gap-2 pb-2">
          {OPERATIONAL_VIEWS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <Input
            placeholder="Search by ID, Service, Area or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 pr-6 rounded-2xl border-none bg-white shadow-xl shadow-slate-200/50 text-sm font-medium focus-visible:ring-primary/20"
          />
        </div>

        {/* Requests List - Responsive Layout */}
        <div className="space-y-4 md:space-y-0">
          {/* Mobile Card View (visible only on mobile) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredRequests.map((request) => (
              <div 
                key={request.id}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-4 active:scale-[0.99] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Clock size={16} className="text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{getAgeInMinutes(request.created_at)}m ago</span>
                  </div>
                  <Badge variant="outline" className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border-2 ${getStatusColor(request.status)}`}>
                    {request.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{request.sub_service}</h3>
                  <div className="flex items-center gap-2 mt-1 text-slate-500">
                    <MapPin size={12} />
                    <span className="text-xs font-bold uppercase tracking-wider">{request.area}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-slate-50">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</p>
                    <p className="text-xs font-bold text-slate-700">{request.customer_phone}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ID</p>
                    <p className="text-xs font-mono font-bold text-slate-700">{request.id}</p>
                  </div>
                </div>

                <div className="pt-2">
                  {renderAction(request)}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (visible only on desktop) */}
          <div className="hidden md:block bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 px-8 text-slate-500">Request Details</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Customer</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Age</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 px-8 text-right text-slate-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} className="group hover:bg-slate-50/50 transition-colors border-slate-100">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                          <Plus className="text-slate-400" size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{request.sub_service}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={12} className="text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{request.area}</span>
                            <span className="text-[10px] text-slate-300">\u2022</span>
                            <span className="text-[10px] font-mono font-bold text-slate-400">{request.id}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <Badge variant="outline" className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border-2 ${getStatusColor(request.status)}`}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6">
                      <p className="text-xs font-bold text-slate-700">{request.customer_phone}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{request.intake_source}</p>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span className="text-xs font-bold">{getAgeInMinutes(request.created_at)}m</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      {renderAction(request)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 mt-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No requests found</h3>
            <p className="text-slate-500 mt-2 text-sm font-medium">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RequestsList;
