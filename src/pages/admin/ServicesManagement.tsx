import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Trash2, Search, Settings2 } from 'lucide-react';
import { storageService } from '@/lib/storageService';
import { toast } from 'sonner';

const ServicesManagement = () => {
  const { dir } = useLanguage();
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setServices(storageService.getServices());
  }, []);

  const handleAddService = () => {
    if (!newService.trim()) {
      toast.error('Service name cannot be empty');
      return;
    }
    if (services.includes(newService.trim())) {
      toast.error('Service already exists');
      return;
    }
    storageService.saveService(newService.trim());
    setServices(storageService.getServices());
    setNewService('');
    toast.success(`Service "${newService.trim()}" added to catalog`);
  };

  const handleDeleteService = (service: string) => {
    storageService.deleteService(service);
    setServices(storageService.getServices());
    toast.info(`Service "${service}" removed from catalog`);
  };

  const filteredServices = services.filter(service => 
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="border-primary/20 text-primary font-black tracking-[0.2em] text-[9px] uppercase">Service Architecture</Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[9px] uppercase">{services.length} Active Services</Badge>
            </div>
            <h1 className="text-display text-slate-900">Services Management</h1>
            <p className="text-xs text-slate-500 font-medium italic mt-1 max-w-md">
              Managing the master catalog of service categories for the coordination hub.
            </p>
          </div>
          <Button 
            className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest h-14 px-8 shadow-lg shadow-primary/20 active:scale-95 transition-all rounded-2xl relative z-10 text-[11px]"
            onClick={handleAddService}
          >
            <Plus size={18} className="mr-2" />
            Add Service
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 border-slate-200 shadow-xl bg-white h-fit rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
                <Plus className="text-primary" size={16} />
                New Service Type
              </CardTitle>
              <CardDescription className="text-[10px] font-medium uppercase tracking-tight text-slate-400">Expand the service ecosystem.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              <Input 
                placeholder="e.g. Carpentry, Painting..." 
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
                className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-primary/20 text-sm font-medium px-5"
              />
              <Button onClick={handleAddService} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all rounded-2xl shadow-lg shadow-primary/20">Register Service</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-slate-200 shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 border-b border-slate-50">
              <div>
                <CardTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                  <Briefcase className="text-primary" size={22} />
                  Service Catalog
                </CardTitle>
                <CardDescription className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mt-1">Available categories for coordination.</CardDescription>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Filter catalog..."
                  className="pl-12 bg-slate-50 border-slate-100 h-14 text-sm font-medium rounded-2xl focus:bg-white transition-all px-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredServices.length > 0 ? (
                  filteredServices.sort().map((service) => (
                    <div 
                      key={service} 
                      className="flex items-center justify-between p-5 rounded-[2rem] border border-slate-100 bg-white group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                          <Settings2 size={18} className="text-slate-400 group-hover:text-primary" />
                        </div>
                        <span className="font-black text-[11px] text-slate-700 uppercase tracking-widest">{service}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 text-slate-200 hover:text-red-600 hover:bg-red-50 sm:opacity-0 group-hover:opacity-100 transition-all rounded-2xl active:scale-90"
                        onClick={() => handleDeleteService(service)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="p-6 bg-slate-50 rounded-full mb-6">
                        <Search size={48} className="opacity-10" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {searchQuery ? `No matches for "${searchQuery}"` : 'No services in catalog'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicesManagement;
