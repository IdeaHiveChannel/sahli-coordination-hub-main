import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Trash2, Search } from 'lucide-react';
import { storageService } from '@/lib/storageService';
import { toast } from 'sonner';

const AreasManagement = () => {
  const { dir } = useLanguage();
  const [areas, setAreas] = useState<string[]>([]);
  const [newArea, setNewArea] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setAreas(storageService.getAreas());
  }, []);

  const handleAddArea = () => {
    if (!newArea.trim()) {
      toast.error('Area name cannot be empty');
      return;
    }
    if (areas.includes(newArea.trim())) {
      toast.error('Area already exists');
      return;
    }
    storageService.saveArea(newArea.trim());
    setAreas(storageService.getAreas());
    setNewArea('');
    toast.success(`Area "${newArea.trim()}" added successfully`);
  };

  const handleDeleteArea = (area: string) => {
    storageService.deleteArea(area);
    setAreas(storageService.getAreas());
    toast.info(`Area "${area}" removed`);
  };

  const filteredAreas = areas.filter(area => 
    area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">INFRASTRUCTURE</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] uppercase">{areas.length} ACTIVE ZONES</Badge>
            </div>
            <h1 className="text-display text-slate-900">Areas Management</h1>
            <p className="text-xs text-slate-500 font-medium mt-1 max-w-md">
              Configuring geographic service boundaries across the Qatar peninsula.
            </p>
          </div>
          <Button 
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest h-14 px-8 shadow-lg shadow-primary/20 active:scale-95 transition-all rounded-2xl relative z-10 text-[11px]"
            onClick={handleAddArea}
          >
            <Plus size={18} className="mr-2" strokeWidth={3} />
            Add New Area
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 border-slate-100 shadow-xl bg-white h-fit rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="flex items-center gap-2 text-subtitle text-slate-900">
                <Plus className="text-primary" size={16} />
                New Coverage Area
              </CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Define region parameters.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              <Input 
                placeholder="e.g. Al Khor, Mesaieed..." 
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddArea()}
                className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:bg-white focus:ring-primary/20 text-sm font-bold px-5 transition-all"
              />
              <Button onClick={handleAddArea} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all rounded-2xl shadow-lg shadow-primary/20">Register Area</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-slate-100 shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 border-b border-slate-50">
              <div>
                <CardTitle className="flex items-center gap-3 text-subtitle text-slate-900">
                  <MapPin className="text-primary" size={22} />
                  Active Service Zones
                </CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Geographic operational footprints.</CardDescription>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Filter areas..."
                  className="pl-12 bg-slate-50/50 border-slate-100 h-14 text-sm font-bold rounded-2xl focus:bg-white transition-all px-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredAreas.length > 0 ? (
                  filteredAreas.sort().map((area) => (
                    <div 
                      key={area} 
                      className="flex items-center justify-between p-5 rounded-[2rem] border border-slate-100 bg-white group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                          <MapPin size={18} className="text-slate-400 group-hover:text-primary" />
                        </div>
                        <span className="font-black text-[11px] text-slate-700 uppercase tracking-widest">{area}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 text-slate-400 hover:text-red-600 hover:bg-red-50 sm:opacity-0 group-hover:opacity-100 transition-all rounded-2xl active:scale-90"
                        onClick={() => handleDeleteArea(area)}
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
                        {searchQuery ? `No matches for "${searchQuery}"` : 'No zones defined'}
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

export default AreasManagement;
