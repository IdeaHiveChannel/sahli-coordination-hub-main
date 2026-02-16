import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Phone, Info, ShieldCheck, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { storageService } from '@/lib/storageService';
import { useNavigate, useLocation } from 'react-router-dom';

const CommunicationHistory = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const logs = storageService.getMessageLogs();

  const filteredLogs = logs.filter(log => {
    const query = searchQuery.toLowerCase();
    return (
      log.phone.toLowerCase().includes(query) ||
      log.message.toLowerCase().includes(query) ||
      (log.linked_request_id && log.linked_request_id.toLowerCase().includes(query)) ||
      log.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-white/50 backdrop-blur-md p-6 sm:p-10 rounded-[2.5rem] border border-primary/10 shadow-sm">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px] px-3 py-1">AUDIT TRAIL</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] px-3 py-1 uppercase tracking-widest">{logs.length} Interactions</Badge>
            </div>
            <h1 className="text-display text-slate-900">Communication History</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium leading-relaxed max-w-xl">
              Centralized audit trail for all customer and provider coordination events.
            </p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" className="h-14 flex-1 sm:flex-none sm:px-8 gap-3 border-slate-200 font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-sm hover:bg-slate-50" onClick={() => window.location.reload()}>
              <Search size={18} />
              Refresh Logs
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-md border-blue-100 shadow-xl overflow-hidden rounded-[2.5rem] active:scale-[0.98] transition-all">
              <div className="h-2 bg-blue-500 w-full" />
              <CardContent className="pt-8 pb-10 px-8 flex items-start gap-5">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 shadow-inner border border-blue-100/50">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-subtitle text-slate-800">Intake & Delivery</h3>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mt-2 uppercase tracking-tight">WhatsApp is the exclusive transport for coordination data.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-emerald-100 shadow-xl overflow-hidden rounded-[2.5rem] active:scale-[0.98] transition-all">
              <div className="h-2 bg-emerald-500 w-full" />
              <CardContent className="pt-8 pb-10 px-8 flex items-start gap-5">
                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 shadow-inner border border-emerald-100/50">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-subtitle text-slate-800">System of Record</h3>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mt-2 uppercase tracking-tight">No decisions are binding until logged in this hub.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl overflow-hidden rounded-[2.5rem] sm:col-span-2 lg:col-span-1 active:scale-[0.98] transition-all">
              <div className="h-2 bg-slate-400 w-full" />
              <CardContent className="pt-8 pb-10 px-8 flex items-start gap-5">
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-600 shadow-inner border border-slate-100/50">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-subtitle text-slate-800">Fully Auditable</h3>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mt-2 uppercase tracking-tight">Timestamped and attributed interactions for accountability.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-100 shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
            <div className="h-2 bg-primary" />
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-8 sm:p-10 border-b border-slate-100/50">
              <div>
                <CardTitle className="flex items-center gap-4 text-subtitle text-slate-900">
                  <MessageSquare className="text-primary" size={28} />
                  Interaction Logs
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm font-bold text-slate-500 mt-2 leading-relaxed">
                  Consolidated view of all coordinated communication channels.
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Filter by phone, message..." 
                  className="pl-12 h-14 bg-slate-50 border-slate-100 text-[11px] font-black uppercase tracking-widest rounded-2xl focus:bg-white transition-all shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile View: Card List */}
              <div className="block sm:hidden p-6 space-y-6">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <div key={log.id} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white shadow-xl space-y-5 active:scale-[0.98] transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1.5">
                          <Button 
                            variant="link" 
                            className="p-0 h-auto font-black text-lg text-primary hover:text-primary/80 text-left justify-start tracking-tight"
                            onClick={() => {
                              const provider = storageService.getProviderByPhone(log.phone);
                              if (provider) {
                                navigate(`/admin/providers?search=${provider.id}`);
                              } else {
                                setSearchQuery(log.phone);
                              }
                            }}
                          >
                            {log.phone}
                          </Button>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{log.type}</span>
                        </div>
                        {log.status && (
                          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1.5 rounded-full">
                            {log.status}
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-slate-600 leading-relaxed font-bold italic border-l-4 border-primary/20 pl-5 py-3 bg-slate-50/50 rounded-r-2xl">
                        "{log.message}"
                      </div>

                      <div className="flex items-center justify-between py-4 border-y border-slate-50">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timestamp</span>
                          <span className="text-xs font-black text-slate-900 tracking-tight">
                            {new Date(log.timestamp).toLocaleDateString()} • {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {log.linked_request_id && (
                          <div className="flex flex-col text-right gap-1.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Request</span>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-black text-primary text-xs tracking-tight"
                              onClick={() => navigate(`/admin/requests?search=${log.linked_request_id}`)}
                            >
                              #{log.linked_request_id}
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {log.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border-none px-3 py-1.5 rounded-lg">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center text-slate-400 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="text-lg font-black uppercase tracking-tight text-slate-300">No logs found</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">Try adjusting your filters or check back later.</p>
                  </div>
                )}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden sm:block p-8">
                <div className="rounded-[2.5rem] border border-slate-100 overflow-hidden bg-white shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b border-slate-100 bg-slate-50/50">
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6 px-8">Phone / Party</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6">Linked Request</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6 max-w-[400px]">Message Content</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6">Timestamp</TableHead>
                        <TableHead className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6">Classification</TableHead>
                        <TableHead className="text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 py-6 px-8">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                          <TableRow key={log.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                            <TableCell className="py-6 px-8">
                              <div className="flex flex-col gap-1.5">
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto font-black text-sm text-primary hover:text-primary/80 text-left justify-start tracking-tight"
                                  onClick={() => {
                                    const provider = storageService.getProviderByPhone(log.phone);
                                    if (provider) {
                                      navigate(`/admin/providers?search=${provider.id}`);
                                    } else {
                                      setSearchQuery(log.phone);
                                    }
                                  }}
                                >
                                  {log.phone}
                                </Button>
                                {log.type && (
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.type}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="py-6">
                              {log.linked_request_id ? (
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto"
                                  onClick={() => navigate(`/admin/requests?search=${log.linked_request_id}`)}
                                >
                                  <Badge variant="outline" className="text-[10px] font-black bg-white border-slate-200 text-slate-600 hover:border-primary/30 transition-colors px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    #{log.linked_request_id}
                                  </Badge>
                                </Button>
                              ) : (
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">General</span>
                              )}
                            </TableCell>
                            <TableCell className="py-6 text-sm text-slate-600 max-w-[400px] leading-relaxed font-bold italic">
                              "{log.message}"
                            </TableCell>
                            <TableCell className="py-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-black text-slate-900 tracking-tight">{new Date(log.timestamp).toLocaleDateString()}</span>
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-6">
                              <div className="flex flex-wrap gap-2">
                                {log.tags.map((tag, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border-none px-3 py-1.5 rounded-lg">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="py-6 px-8 text-right">
                              {log.status && (
                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border-emerald-100 px-3 py-1.5 rounded-full inline-flex">
                                  {log.status}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-400">
                              <MessageSquare size={56} className="mb-4 opacity-10" />
                              <p className="text-lg font-black uppercase tracking-tight text-slate-300">No logs found</p>
                              <p className="text-xs font-medium text-slate-400 mt-1">Adjust your filters to see more results.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CommunicationHistory;
