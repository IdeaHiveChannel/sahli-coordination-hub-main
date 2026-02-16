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

  const isValidStatus = (status: string | null): status is ProviderStatus => {
    return status !== null && ['Active', 'Observed', 'Paused', 'Removed'].includes(status);
  };

  const initialTab = isValidStatus(filterParam) ? filterParam : 'All';
  const [activeTab, setActiveTab] = useState<ProviderStatus | 'All'>(initialTab);
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
      const contactResult = await rateupService.upsertContact({
        orgId,
        phoneNumber: provider.whatsapp,
        name: provider.company_name,
        email: provider.email,
        customFields: {
          provider_id: provider.id,
          status: provider.status,
          services: provider.services.join(', '),
          areas: provider.areas.join(', '),
          entity_type: provider.entity_type || '',
          compliance_score: String(provider.compliance_score || 0),
          last_sync: new Date().toISOString()
        }
      });
      
      // 2. Add to groups if any are specified
      if (contactResult && provider.groups && provider.groups.length > 0) {
        for (const groupId of provider.groups) {
          await rateupService.addContactsToGroup({
            orgId,
            contactGroupId: groupId,
            contactIds: [contactResult.id]
          }).catch(err => console.warn(`Failed to add to group ${groupId}:`, err));
        }
      }
      
      toast.success(`Synced ${provider.company_name} data and groups to RateUp`);
    } catch (error) {
      console.error('Sync error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Sync failed: ${message}`);
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

  const pendingAppsCount = storageService.getApplications().filter(a => a.status === 'Pending' || a.status === 'More Info Required').length;

  return (
    <AdminLayout>
      <div className="py-2 md:py-6" dir={dir}>
        {pendingAppsCount > 0 && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-3xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-100 rounded-2xl text-amber-600">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-amber-900">Pending Applications</h4>
                <p className="text-[10px] text-amber-700 font-bold">There are {pendingAppsCount} new provider applications awaiting review.</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/provider-applications')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-black uppercase tracking-widest h-9 px-6 rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95"
            >
              Review Now
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white shadow-xl p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-emerald-600 text-white font-black tracking-widest text-[9px] px-3 py-1 rounded-full uppercase">GOVERNANCE MODULE</Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[9px] px-3 py-1 rounded-full uppercase">{providers.length} PARTNERS</Badge>
            </div>
            <h1 className="text-display text-slate-900">Providers</h1>
            <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed max-w-md">
              Manage independent service partners, monitor compliance scores, and enforce governance thresholds.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="w-full md:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all">
              Add New Provider
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
              <Search className="text-slate-400" size={18} />
            </div>
            <input
              placeholder="Search by ID, Company, or Contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl border-none bg-white shadow-xl text-sm font-bold focus-visible:ring-4 focus-visible:ring-primary/5 focus:outline-none transition-all placeholder:text-slate-300"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-2 px-2 pb-2 md:pb-0">
            {(['Active', 'Observed', 'Paused', 'Removed', 'All'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`whitespace-nowrap h-12 px-6 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Providers List - Responsive Layout */}
        <div className="space-y-4 md:space-y-0">
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredProviders.map((provider) => {
              const history = storageService.getResponsesByProvider(provider.company_name);
              return (
                <div 
                  key={provider.id}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl space-y-5 active:scale-[0.99] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{provider.company_name}</h3>
                        {provider.limited_participation && (
                          <Badge variant="outline" className="text-[8px] font-black uppercase bg-blue-50 text-blue-600 border-none">LIMITED</Badge>
                        )}
                      </div>
                      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{provider.id}</p>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border-2 ${getStatusColor(provider.status)}`}>
                      {provider.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {provider.services.slice(0, 3).map(s => (
                      <Badge key={s} variant="secondary" className="bg-slate-50 text-slate-500 text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter border-none">{s}</Badge>
                    ))}
                    {provider.services.length > 3 && (
                      <Badge variant="secondary" className="bg-slate-50 text-slate-400 text-[8px] font-bold px-2 py-0.5 rounded-md uppercase border-none">+{provider.services.length - 3}</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Compliance</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              (provider.compliance_score || 0) > 0.8 ? 'bg-emerald-500' : 
                              (provider.compliance_score || 0) > 0.6 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(provider.compliance_score || 0) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-700">{Math.round((provider.compliance_score || 0) * 100)}%</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Flags</p>
                      <div className="flex items-center justify-end gap-1.5">
                        <Flag size={12} className={provider.flags ? "text-red-500 fill-red-500" : "text-slate-200"} />
                        <span className="text-xs font-black text-slate-700">{provider.flags || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                      onClick={() => navigate(`/admin/providers/${provider.id}`)}
                    >
                      Details
                    </Button>
                    <Button 
                      className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all ${
                        isSyncing === provider.id ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white shadow-lg shadow-primary/20'
                      }`}
                      onClick={() => handleSyncToRateUp(provider)}
                      disabled={isSyncing === provider.id}
                    >
                      {isSyncing === provider.id ? <RefreshCw className="animate-spin" size={14} /> : 'Sync'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 px-8 text-slate-500">Provider Info</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Service Coverage</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Governance</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-slate-500">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 px-8 text-right text-slate-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id} className="group hover:bg-slate-50/50 transition-colors border-slate-100">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                          <UserCheck className="text-slate-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{provider.company_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{provider.id}</span>
                            {provider.entity_type && <span className="text-[10px] font-black text-primary/60 uppercase">[{provider.entity_type}]</span>}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {provider.services.map(s => (
                          <Badge key={s} variant="secondary" className="bg-slate-50 text-slate-500 text-[8px] font-bold px-2 py-0.5 rounded-md uppercase border-none">{s}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="space-y-2 w-32">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter">
                          <span className="text-slate-400">Compliance</span>
                          <span className="text-slate-700">{Math.round((provider.compliance_score || 0) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              (provider.compliance_score || 0) > 0.8 ? 'bg-emerald-500' : 
                              (provider.compliance_score || 0) > 0.6 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(provider.compliance_score || 0) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <Badge variant="outline" className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border-2 ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-9 px-4 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all"
                          onClick={() => navigate(`/admin/providers/${provider.id}`)}
                        >
                          Details
                        </Button>
                        <Button 
                          size="sm" 
                          className={`h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all ${
                            isSyncing === provider.id ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white shadow-primary/20'
                          }`}
                          onClick={() => handleSyncToRateUp(provider)}
                          disabled={isSyncing === provider.id}
                        >
                          {isSyncing === provider.id ? <RefreshCw className="animate-spin" size={14} /> : 'Sync'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 mt-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No partners found</h3>
            <p className="text-slate-500 mt-2 text-sm font-medium">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ActiveProviders;
