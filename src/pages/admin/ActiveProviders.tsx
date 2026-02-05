import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCheck, Star, ShieldCheck, Pause, Play, Trash2, Flag, Edit, RefreshCw, Search, MessageSquare, Info } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { Provider, ProviderStatus } from '@/lib/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { rateupService } from '@/lib/rateupService';
import { GOVERNANCE_THRESHOLDS } from '@/lib/governanceConstants';
import { storageService } from '@/lib/storageService';

const ActiveProviders = () => {
  const { dir } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const filterParam = queryParams.get('filter');
  const searchParam = queryParams.get('search');

  const [activeTab, setActiveTab] = useState<ProviderStatus | 'All'>((filterParam as any) || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [providers, setProviders] = useState<Provider[]>(storageService.getProviders());
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

  useEffect(() => {
    setProviders(storageService.getProviders());
  }, []);

  const filteredProviders = providers.filter(p => {
    const matchesTab = activeTab === 'All' || p.status === activeTab;
    const matchesSearch = searchQuery === '' || 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.whatsapp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSyncToRateUp = async (provider: Provider) => {
     setIsSyncing(provider.id);
    try {
      const orgId = import.meta.env.VITE_RATEUP_ORG_ID;
      
      if (!orgId) {
        throw new Error('VITE_RATEUP_ORG_ID is missing in environment variables.');
      }

      // 1. Upsert contact in RateUp to ensure it exists and is up to date
      await rateupService.upsertContact({
        orgId,
        phoneNumber: provider.whatsapp,
        name: provider.company_name,
        email: provider.email,
        customFields: {
          provider_id: provider.id,
          status: provider.status,
          services: provider.services.join(', '),
          areas: provider.areas.join(', '),
          entity_type: provider.entity_type,
          compliance_score: provider.compliance_score,
          last_sync: new Date().toISOString()
        }
      });
      
      toast.success(`Synced ${provider.company_name} data to RateUp`);
    } catch (error: any) {
      console.error('Sync error:', error);
      toast.error(`Sync failed: ${error.message}`);
    } finally {
      setIsSyncing(null);
    }
  };

  const handleTabChange = (tab: ProviderStatus | 'All') => {
    setActiveTab(tab);
    if (tab === 'All') {
      navigate('/admin/providers');
    } else {
      navigate(`/admin/providers?filter=${tab}`);
    }
  };



  const handleToggleStatus = (id: string) => {
    const provider = providers.find(p => p.id === id);
    if (!provider) return;
    
    const newStatus = provider.status === 'Active' ? 'Paused' : 'Active';
    storageService.updateProvider(id, { status: newStatus as ProviderStatus });
    setProviders(storageService.getProviders());
    toast.success(`Provider ${newStatus === 'Active' ? 'activated' : 'paused'}`);
  };

  const handleDelete = (id: string) => {
    const provider = providers.find(p => p.id === id);
    if (!provider) return;

    if (window.confirm(`Are you sure you want to remove ${provider.company_name}? This action cannot be undone.`)) {
      storageService.deleteProvider(id);
      setProviders(storageService.getProviders());
      toast.success(`${provider.company_name} has been removed.`);
    }
  };

  const handleAddFlag = (id: string) => {
    const provider = providers.find(p => p.id === id);
    if (!provider) return;

    const newFlags = (provider.flags || 0) + 1;
    let newStatus = provider.status;

    if (newFlags >= GOVERNANCE_THRESHOLDS.MAX_CONDUCT_FLAGS_FOR_OBSERVED) {
      newStatus = 'Observed';
      toast.warning(`${provider.company_name} moved to Observed status due to conduct flags.`);
    }

    storageService.updateProvider(id, { flags: newFlags, status: newStatus as ProviderStatus });
    setProviders(storageService.getProviders());
    toast.info(`Flag added to ${provider.company_name}`);
  };

  const getStatusColor = (status: ProviderStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Observed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Paused': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Removed': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">GOVERNANCE</Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 font-bold text-[10px]">{providers.length} ACTIVE PARTNERS</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Provider Governance</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage independent service partners and monitor performance metrics.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-[10px] h-9 px-6 shadow-sm">
              Add New Provider
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search by ID, company, or contact..." 
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['Active', 'Observed', 'Paused', 'Removed', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as any)}
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

        <Card className="border-slate-200 overflow-hidden shadow-sm bg-white/50 backdrop-blur-sm">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-transparent border-b border-slate-200">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-4">Company Info</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Services</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Performance Metrics</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Status</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest py-4 px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => {
                const history = storageService.getResponsesByProvider(provider.company_name);
                
                return (
                  <React.Fragment key={provider.id}>
                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-4">
                        <div className="font-bold text-sm flex items-center gap-2">
                          {provider.company_name}
                          {provider.limited_participation && (
                            <Badge variant="outline" className="h-4 px-1.5 text-[8px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border-blue-100">
                              Limited
                            </Badge>
                          )}
                          {provider.flags !== undefined && provider.flags >= GOVERNANCE_THRESHOLDS.MAX_CONDUCT_FLAGS_FOR_OBSERVED && (
                            <Badge variant="destructive" className="h-4 px-1.5 text-[8px] font-black uppercase tracking-widest bg-red-600 border-none animate-pulse">
                              <Flag size={8} className="mr-1 fill-white" />
                              Threshold Met
                            </Badge>
                          )}
                          {provider.compliance_score !== undefined && provider.compliance_score < 0.6 && (
                            <Badge variant="outline" className="h-4 px-1.5 text-[8px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border-amber-100">
                              Pause Rec
                            </Badge>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                          {provider.id}
                          {provider.entity_type && (
                            <span className="text-primary font-bold uppercase tracking-tighter opacity-70">[{provider.entity_type}]</span>
                          )}
                        </div>
                        {history.length > 0 && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-[10px] font-bold text-primary flex items-center gap-1 mt-1"
                            onClick={() => navigate(`/admin/responses?search=${provider.company_name}`)}
                          >
                            <MessageSquare size={10} />
                            View {history.length} {history.length === 1 ? 'Response' : 'Responses'}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {provider.services.map(service => (
                            <Badge key={service} variant="secondary" className="text-[9px] font-bold uppercase tracking-tighter">{service}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {provider.areas.map(area => (
                            <span key={area} className="text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{area}</span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-[8px] font-black uppercase tracking-widest text-slate-400">Response</div>
                            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${provider.response_rate > 0.8 ? 'bg-emerald-500' : provider.response_rate > 0.6 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${provider.response_rate * 100}%` }} />
                            </div>
                            <span className="font-bold text-[10px]">{(provider.response_rate * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-[8px] font-black uppercase tracking-widest text-slate-400">Conduct</div>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={8} className={s <= (provider.conduct_score || 0) ? 'fill-amber-500' : 'text-slate-200'} />
                              ))}
                            </div>
                            <span className="font-bold text-[10px] ml-1">{provider.conduct_score?.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-[8px] font-black uppercase tracking-widest text-slate-400">Compliance</div>
                            <Badge variant="outline" className={`h-4 px-1.5 text-[8px] font-black uppercase tracking-widest border-none ${
                              (provider.compliance_score || 0) >= 0.8 ? 'bg-emerald-500/10 text-emerald-600' : 
                              (provider.compliance_score || 0) >= 0.6 ? 'bg-blue-500/10 text-blue-600' : 
                              'bg-red-500/10 text-red-600'
                            }`}>
                              {(provider.compliance_score || 0) >= 0.8 ? 'High' : (provider.compliance_score || 0) >= 0.6 ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-[8px] font-black uppercase tracking-widest text-slate-400">Disputes</div>
                            <span className={`text-[10px] font-bold ${provider.flags && provider.flags >= GOVERNANCE_THRESHOLDS.MAX_PRICING_DISPUTES_FOR_PAUSE_RECOMMENDATION ? 'text-red-600' : 'text-slate-600'}`}>
                              {provider.flags || 0} / {GOVERNANCE_THRESHOLDS.MAX_PRICING_DISPUTES_FOR_PAUSE_RECOMMENDATION}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`h-5 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(provider.status)}`}>
                          {provider.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-primary" 
                            onClick={() => setExpandedProvider(expandedProvider === provider.id ? null : provider.id)}
                            title="View Details"
                          >
                            <Info size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 text-slate-400 hover:text-blue-500 ${isSyncing === provider.id ? 'animate-spin' : ''}`}
                            onClick={() => handleSyncToRateUp(provider)}
                            disabled={isSyncing !== null}
                            title="Sync to RateUp"
                          >
                            <RefreshCw size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-500" onClick={() => handleToggleStatus(provider.id)}>
                            {provider.status === 'Active' ? <Pause size={14} /> : <Play size="14" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => handleAddFlag(provider.id)}>
                            <Flag size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => handleDelete(provider.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedProvider === provider.id && (
                      <TableRow className="bg-slate-50/30">
                        <TableCell colSpan={5} className="p-4">
                          <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <h5 className="text-[9px] font-black uppercase tracking-widest text-primary">Contact Info</h5>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] space-y-1.5">
                                <div className="flex justify-between"><span className="text-slate-400">CR Number:</span> <span className="font-bold">{provider.crNumber || 'N/A'}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Email:</span> <span className="font-bold">{provider.email}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">WhatsApp:</span> <span className="font-bold">{provider.whatsapp}</span></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-[9px] font-black uppercase tracking-widest text-primary">Governance</h5>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] space-y-1.5">
                                <div className="flex justify-between"><span className="text-slate-400">Entity Type:</span> <span className="font-bold">{provider.entity_type || 'Company'}</span></div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Responsibility:</span> 
                                  <Badge variant="outline" className={`h-4 text-[8px] ${provider.responsibility_confirmed ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                    {provider.responsibility_confirmed ? 'Confirmed' : 'Not Confirmed'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-[9px] font-black uppercase tracking-widest text-primary">Quick Links</h5>
                              <div className="flex flex-col gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 text-[9px] font-bold uppercase tracking-wider justify-start gap-2"
                                  onClick={() => navigate(`/admin/responses?search=${provider.company_name}`)}
                                >
                                  <MessageSquare size={12} /> Interaction History
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ActiveProviders;
