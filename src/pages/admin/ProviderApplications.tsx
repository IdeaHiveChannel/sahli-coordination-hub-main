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

const ProviderApplications = () => {
  const { dir } = useLanguage();
  
  const [applications, setApplications] = useState<Application[]>(
    storageService.getApplications().filter(a => a.status === 'Pending' || a.status === 'More Info Required')
  );

  const [reviewingApp, setReviewingApp] = useState<string | null>(null);
  const [entityType, setEntityType] = useState<EntityType>('Company');

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
    storageService.updateApplicationStatus(id, finalStatus, entityType);
    
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
            onboarded_at: new Date().toISOString()
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
        <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">VERIFICATION</Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 font-bold text-[10px]">{applications.length} PENDING APPS</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Provider Intake</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Review and verify new service partner applications for the SAHLI network.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-2 border-slate-200 font-bold text-[10px] uppercase tracking-widest">
              <HelpCircle size={14} /> Verification Guide
            </Button>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
                  <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent border-b border-slate-200">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-4">Company Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Services Offered</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Primary Area</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Date</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-widest py-4 px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <React.Fragment key={app.id}>
                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-4 px-4">
                        <div className="font-bold text-sm text-slate-900">{app.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono font-medium">{app.id}</div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-slate-600">{app.services}</TableCell>
                      <TableCell className="text-xs font-medium text-slate-600">{app.areas}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[9px] font-black uppercase ${
                          app.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-slate-400">{app.date}</TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            variant={reviewingApp === app.id ? "default" : "outline"} 
                            className={`h-8 gap-1 text-[10px] font-bold uppercase tracking-wider ${reviewingApp === app.id ? 'bg-slate-900' : ''}`}
                            onClick={() => setReviewingApp(reviewingApp === app.id ? null : app.id)}
                          >
                            <FileText size={12} /> {reviewingApp === app.id ? 'Close Review' : 'Review Application'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {reviewingApp === app.id && (
                      <TableRow className="bg-slate-50/30">
                        <TableCell colSpan={5} className="p-8">
                          <div className="grid md:grid-cols-3 gap-8">
                            {/* Column 1: Company Profile & Info */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Company Profile</h4>
                              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                                <div>
                                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">About Company</label>
                                  <p className="text-xs text-slate-600 leading-relaxed italic">
                                    "{app.profile || 'No profile provided.'}"
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-400 uppercase block">CR Number</label>
                                    <span className="text-xs font-mono font-bold text-slate-700">{app.crNumber}</span>
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-400 uppercase block">Contact Person</label>
                                    <span className="text-xs font-bold text-slate-700">{app.contactPerson}</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-400 uppercase block">WhatsApp</label>
                                    <span className="text-xs font-bold text-slate-700">{app.phone}</span>
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-400 uppercase block">Email</label>
                                    <span className="text-xs font-bold text-slate-700">{app.email}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Column 2: Governance & Documents */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Verification Documents</h4>
                              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">Responsibility Declaration</span>
                                  {app.responsibility_confirmed ? (
                                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[8px] font-black uppercase">Confirmed</Badge>
                                  ) : (
                                    <Badge variant="destructive" className="text-[8px] font-black uppercase">Missing</Badge>
                                  )}
                                </div>
                                
                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-2">Uploaded Files</label>
                                  <div className="space-y-2">
                                    {[
                                      { label: 'CR Document', file: app.documents?.cr },
                                      { label: 'QID Copy', file: app.documents?.id },
                                      { label: 'Trade License', file: app.documents?.license }
                                    ].map((doc, i) => (
                                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-500">{doc.label}</span>
                                        {doc.file ? (
                                          <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-emerald-600 font-bold truncate max-w-[100px]">{doc.file}</span>
                                            <CheckCircle2 size={12} className="text-emerald-500" />
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-red-400 font-bold">Not Uploaded</span>
                                            <XCircle size={12} className="text-red-400" />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase">Entity Type (Internal Only)</label>
                                  <div className="flex gap-2">
                                    {['Company', 'Agency', 'Subcontracting Firm'].map((type) => (
                                      <button
                                        key={type}
                                        onClick={() => setEntityType(type as EntityType)}
                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                                          entityType === type 
                                            ? 'bg-primary text-white border-primary shadow-sm' 
                                            : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                                        }`}
                                      >
                                        {type}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Column 3: Review Actions */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Review Actions</h4>
                              <div className="grid grid-cols-1 gap-3">
                                <Button 
                                  variant="outline" 
                                  className="h-10 gap-2 text-[10px] font-bold uppercase tracking-wider" 
                                  onClick={() => handleAction(app.id, 'requested more info')}
                                >
                                  <HelpCircle size={14} /> Request More Info
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="h-10 gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 border-blue-100 hover:bg-blue-50"
                                  onClick={() => handleAction(app.id, 'conditionally approved', 'Conditionally Approved')}
                                >
                                  <ShieldAlert size={14} /> Conditional Approval
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="h-10 gap-2 text-[10px] font-bold uppercase tracking-wider text-red-600 border-red-100 hover:bg-red-50" 
                                  onClick={() => handleAction(app.id, 'rejected')}
                                >
                                  <XCircle size={14} /> Reject Application
                                </Button>
                                <div className="pt-2">
                                  <Button 
                                    className="w-full h-12 gap-2 text-[11px] font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 shadow-lg" 
                                    onClick={() => handleAction(app.id, 'approved')}
                                  >
                                    <CheckCircle2 size={16} /> Approve & Activate
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
                {applications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-slate-400 italic">No pending applications.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ProviderApplications;
