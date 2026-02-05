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
        <div className="flex items-center justify-between mb-6 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">CATALOG</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold text-[10px]">{services.length} ACTIVE SERVICES</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Services Management</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage the master catalog of service categories coordinated by SAHLI.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-bold h-9 shadow-sm"
              onClick={handleAddService}
            >
              <Plus size={16} className="mr-2" />
              Add Service
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 border-primary/10 shadow-md bg-white/80 backdrop-blur-sm h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Plus className="text-primary" size={18} />
                New Service Type
              </CardTitle>
              <CardDescription className="text-[10px]">Define a new service for provider matching.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="e.g. Carpentry, Painting..." 
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
                className="bg-white border-slate-200"
              />
              <Button onClick={handleAddService} className="w-full bg-slate-900 hover:bg-slate-800 font-bold">Register Service</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-primary/10 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-primary/80 to-primary" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100/50">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  <Briefcase className="text-primary" size={20} />
                  Service Catalog
                </CardTitle>
                <CardDescription className="text-xs">Categories available for customer coordination requests.</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Filter catalog..."
                  className="pl-9 bg-white border-slate-200 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredServices.length > 0 ? (
                  filteredServices.sort().map((service) => (
                    <div 
                      key={service} 
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white group hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                          <Settings2 size={14} className="text-slate-400 group-hover:text-primary" />
                        </div>
                        <span className="font-bold text-sm text-slate-700">{service}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-300 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteService(service)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Search size={32} className="mb-2 opacity-20" />
                      <p className="text-sm font-medium">
                        {searchQuery ? `No services matching "${searchQuery}"` : 'No services in catalog.'}
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
