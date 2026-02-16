import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Info, FileText, HelpCircle, ShieldAlert } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { CONTACT_EMAIL } from '@/lib/constants';
import { EntityType } from '@/lib/types';
import { storageService, Application } from '@/lib/storageService';
import { rateupService } from '@/lib/rateupService';

const ReviewContent = ({ app, entityType, setEntityType, assignedGroups, setAssignedGroups, handleAction, isMobile = false }: any) => (
  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
    {/* Column 1: Company Profile & Info */}
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Company Profile</h4>
      <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm space-y-5">
        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">About Company</label>
          <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
            "{app.profile || 'No profile provided.'}"
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-50">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">CR Number</label>
            <span className="text-xs font-mono font-black text-slate-900">{app.crNumber}</span>
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contact Person</label>
            <span className="text-xs font-black text-slate-900">{app.contactPerson}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 pt-2">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">WhatsApp</label>
            <span className="text-xs font-black text-slate-900">{app.phone}</span>
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email</label>
            <span className="text-xs font-black text-slate-900 lowercase">{app.email}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Column 2: Governance & Documents */}
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Verification Documents</h4>
      <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Responsibility Declaration</span>
          {app.responsibility_confirmed ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[8px] font-black uppercase tracking-widest px-2 py-1">Confirmed</Badge>
          ) : (
            <Badge variant="destructive" className="text-[8px] font-black uppercase tracking-widest px-2 py-1">Missing</Badge>
          )}
        </div>
        
        <div className="space-y-3 pt-4 border-t border-slate-50">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Uploaded Files</label>
          <div className="space-y-2">
            {[
              { label: 'CR Document', file: app.documents?.cr },
              { label: 'QID Copy', file: app.documents?.id },
              { label: 'Trade License', file: app.documents?.license }
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-slate-200">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{doc.label}</span>
                {doc.file ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-emerald-600 font-black truncate max-w-[100px]">{doc.file}</span>
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-red-400 font-black uppercase tracking-tighter">Not Uploaded</span>
                    <XCircle size={12} className="text-red-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-50">
          <label className="text-[10px] font-black text-slate-900 uppercase tracking-tight block">Entity Type</label>
          <div className="flex flex-wrap gap-2">
            {['Company', 'Agency', 'Subcontracting Firm'].map((type) => (
              <button
                key={type}
                onClick={() => setEntityType(type as EntityType)}
                className={`px-4 h-11 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] transition-all border active:scale-95 ${
                  entityType === type 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-50">
          <label className="text-[10px] font-black text-slate-900 uppercase tracking-tight block">RateUp Group Assignment</label>
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Enter Group IDs..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-5 text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
              value={assignedGroups}
              onChange={(e) => setAssignedGroups(e.target.value)}
            />
            <p className="text-[9px] text-slate-400 font-medium italic px-1">
              Used for targeted coordination broadcasts via RateUp.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Column 3: Review Actions */}
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Review Actions</h4>
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="outline" 
          className="h-14 gap-3 text-[10px] font-black uppercase tracking-widest border-slate-200 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all" 
          onClick={() => handleAction(app.id, 'requested more info')}
        >
          <HelpCircle size={16} className="text-slate-400" /> Request More Info
        </Button>
        <Button 
          variant="outline" 
          className="h-14 gap-3 text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-2xl active:scale-95 transition-all"
          onClick={() => handleAction(app.id, 'conditionally approved', 'Conditionally Approved')}
        >
          <ShieldAlert size={16} /> Conditional Approval
        </Button>
        <Button 
          variant="outline" 
          className="h-14 gap-3 text-[10px] font-black uppercase tracking-widest text-red-600 border-red-100 bg-red-50/30 hover:bg-red-50 rounded-2xl active:scale-95 transition-all" 
          onClick={() => handleAction(app.id, 'rejected')}
        >
          <XCircle size={16} /> Reject Application
        </Button>
        <div className="pt-4">
          <Button 
            className="w-full h-16 gap-3 text-[11px] font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 rounded-[2rem] active:scale-95 transition-all" 
            onClick={() => handleAction(app.id, 'approved')}
          >
            <CheckCircle2 size={20} className="text-emerald-400" /> Approve & Activate
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const ProviderApplications = () => {
  const { dir } = useLanguage();
  
  const [applications, setApplications] = useState<Application[]>([]);

  const refreshApplications = React.useCallback(() => {
    setApplications(storageService.getApplications().filter(a => a.status === 'Pending' || a.status === 'More Info Required'));
  }, []);

  React.useEffect(() => {
    refreshApplications();
    
    // Listen for storage changes from other tabs
    window.addEventListener('storage', refreshApplications);
    
    // Refresh every 30 seconds as fallback
    const interval = setInterval(refreshApplications, 30000);
    
    return () => {
      window.removeEventListener('storage', refreshApplications);
      clearInterval(interval);
    };
  }, [refreshApplications]);

  const [reviewingApp, setReviewingApp] = useState<string | null>(null);
  const [entityType, setEntityType] = useState<EntityType>('Company');
  const [assignedGroups, setAssignedGroups] = useState<string>('');

  const handleAction = (id: string, action: string, statusOverride?: string) => {
    const app = applications.find(a => a.id === id);
    if (!app) return;

    let finalStatus: Application['status'];
    if (statusOverride) {
      finalStatus = statusOverride as Application['status'];
    } else if (action === 'approved') {
      finalStatus = 'Approved';
    } else if (action === 'rejected') {
      finalStatus = 'Rejected';
    } else if (action === 'requested more info') {
      finalStatus = 'More Info Required';
    } else {
      finalStatus = 'Pending';
    }
    
    // Update real storage
    const groupsArray = assignedGroups.split(',').map(g => g.trim()).filter(g => g !== '');
    storageService.updateApplicationStatus(id, finalStatus, entityType, groupsArray);
    
    // Sync to RateUp if approved
    if (finalStatus === 'Approved') {
      const orgId = import.meta.env.VITE_RATEUP_ORG_ID;
      if (orgId) {
        rateupService.upsertContact({
          orgId,
          phoneNumber: app.phone,
          name: app.name,
          email: app.email,
          customFields: {
            application_id: app.id,
            status: 'Approved',
            entity_type: entityType,
            services: app.services,
            areas: app.areas,
            groups: groupsArray.join(', '),
            onboarded_at: new Date().toISOString()
          }
        }).then(contactResult => {
          if (contactResult && groupsArray.length > 0) {
            groupsArray.forEach(groupId => {
              rateupService.addContactsToGroup({
                orgId,
                contactGroupId: groupId,
                contactIds: [contactResult.id]
              }).catch(err => console.warn(`RateUp Group Sync Error (${groupId}):`, err));
            });
          }
        }).catch(err => console.warn('RateUp Sync Error (Approval):', err));
      }
    }
    
    toast.success(`Application ${id} updated to ${finalStatus} successfully.`);
    
    // Refresh local state
    setApplications(storageService.getApplications().filter(a => a.status === 'Pending' || a.status === 'More Info Required'));
    setReviewingApp(null);
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">VERIFICATION</Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 font-bold text-[10px]">{applications.length} PENDING APPS</Badge>
            </div>
            <h1 className="text-display text-slate-900">Provider Intake</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Review and verify new service partner applications for the SAHLI network.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-12 px-6 gap-2 border-slate-200 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
              <HelpCircle size={14} /> Verification Guide
            </Button>
          </div>
        </div>

        <Card className="border-slate-100 shadow-xl overflow-hidden bg-white rounded-[2.5rem]">
          <CardContent className="p-0">
            {/* Desktop View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-b border-slate-100">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 px-8 text-slate-500">Company Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Services Offered</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Primary Area</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Date</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest py-6 px-8 text-slate-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <React.Fragment key={app.id}>
                      <TableRow className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="py-6 px-8">
                          <div className="font-black text-sm text-slate-900 uppercase tracking-tight">{app.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">{app.id}</div>
                        </TableCell>
                        <TableCell className="text-xs font-bold text-slate-600">{app.services}</TableCell>
                        <TableCell className="text-xs font-bold text-slate-600">{app.areas}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border-2 ${
                            app.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-bold text-slate-400 uppercase tracking-wider">{app.date}</TableCell>
                        <TableCell className="text-right px-8">
                          <div className="flex gap-2 justify-end">
                              <Button 
                                size="sm" 
                                variant={reviewingApp === app.id ? "default" : "outline"} 
                                className={`h-9 px-4 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 ${
                                  reviewingApp === app.id 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 border-none' 
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                                onClick={() => {
                                  if (reviewingApp === app.id) {
                                    setReviewingApp(null);
                                  } else {
                                    setReviewingApp(app.id);
                                    setEntityType(app.entity_type || 'Company');
                                    setAssignedGroups(app.groups?.join(', ') || '');
                                  }
                                }}
                              >
                                <FileText size={14} /> {reviewingApp === app.id ? 'Close' : 'Review'}
                              </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {reviewingApp === app.id && (
                        <TableRow className="bg-slate-50/30 border-slate-100">
                          <TableCell colSpan={6} className="p-10">
                            <ReviewContent 
                              app={app} 
                              entityType={entityType} 
                              setEntityType={setEntityType} 
                              assignedGroups={assignedGroups} 
                              setAssignedGroups={setAssignedGroups} 
                              handleAction={handleAction} 
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-slate-50">
              {applications.map((app) => (
                <div key={app.id} className="p-6 space-y-4 bg-white active:bg-slate-50 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-slate-900 uppercase tracking-tight">{app.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">{app.id}</div>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border-2 ${
                      app.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {app.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
                    <div>
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Services</span>
                      <span className="text-[10px] font-black text-slate-700 uppercase">{app.services}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Area</span>
                      <span className="text-[10px] font-black text-slate-700 uppercase">{app.areas}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{app.date}</span>
                    <Button 
                      size="sm" 
                      variant={reviewingApp === app.id ? "default" : "outline"} 
                      className={`h-11 px-6 gap-2 text-[10px] font-black uppercase tracking-widest rounded-2xl active:scale-95 transition-all ${
                        reviewingApp === app.id 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20 border-none' 
                          : 'border-slate-200 text-slate-600'
                      }`}
                      onClick={() => {
                        if (reviewingApp === app.id) {
                          setReviewingApp(null);
                        } else {
                          setReviewingApp(app.id);
                          setEntityType(app.entity_type || 'Company');
                          setAssignedGroups(app.groups?.join(', ') || '');
                        }
                      }}
                    >
                      <FileText size={16} /> {reviewingApp === app.id ? 'Close' : 'Review'}
                    </Button>
                  </div>

                  {reviewingApp === app.id && (
                    <div className="pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                      <ReviewContent 
                        app={app} 
                        entityType={entityType} 
                        setEntityType={setEntityType} 
                        assignedGroups={assignedGroups} 
                        setAssignedGroups={setAssignedGroups} 
                        handleAction={handleAction} 
                        isMobile={true}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {applications.length === 0 && (
              <div className="text-center py-12 text-slate-400 italic text-sm">No pending applications.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ProviderApplications;
