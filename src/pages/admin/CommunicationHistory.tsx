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
        <div className="flex items-center justify-between mb-6 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">AUDIT TRAIL</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold text-[10px]">{logs.length} INTERACTIONS</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Communication History</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Centralized audit trail for all customer and provider coordination events.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 border-primary/20 text-primary hover:bg-primary/5 font-bold" onClick={() => window.location.reload()}>
              <Search size={16} className="mr-2" />
              Refresh Logs
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-blue-500 w-full" />
              <CardContent className="pt-4 flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shadow-inner border border-blue-100/50">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Intake & Delivery</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">WhatsApp is the exclusive transport for coordination data.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-emerald-500 w-full" />
              <CardContent className="pt-4 flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shadow-inner border border-emerald-100/50">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">System of Record</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">No decisions are binding until logged in this hub.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm overflow-hidden">
              <div className="h-1 bg-slate-400 w-full" />
              <CardContent className="pt-4 flex items-start gap-4">
                <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600 shadow-inner border border-slate-100/50">
                  <Info size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Fully Auditable</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">Timestamped and attributed interactions for accountability.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/10 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-primary/80 to-primary" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100/50">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  <MessageSquare className="text-primary" size={20} />
                  Interaction Logs
                </CardTitle>
                <CardDescription className="text-xs">
                  Consolidated view of all coordinated communication channels.
                </CardDescription>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Filter by phone, message, or request ID..." 
                  className="pl-10 h-10 bg-white border-slate-200 text-sm font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Phone / Party</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Linked Request</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10 max-w-[400px]">Message Content</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Timestamp</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Classification</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                          <TableCell className="py-4">
                            <div className="flex flex-col">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto font-black text-sm text-primary hover:text-primary/80 text-left justify-start"
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
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{log.type}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {log.linked_request_id ? (
                              <Button 
                                variant="link" 
                                className="p-0 h-auto"
                                onClick={() => navigate(`/admin/requests?search=${log.linked_request_id}`)}
                              >
                                <Badge variant="outline" className="text-[10px] font-black bg-white border-slate-200 text-slate-600 hover:border-primary/30 transition-colors px-2 py-0.5">
                                  {log.linked_request_id}
                                </Badge>
                              </Button>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">General</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-slate-600 max-w-[400px] leading-relaxed">
                            <span className="opacity-60 italic mr-1">"</span>
                            {log.message}
                            <span className="opacity-60 italic ml-1">"</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700">{new Date(log.timestamp).toLocaleDateString()}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5">
                              {log.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border-none px-2 py-0.5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {log.status && (
                              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border-emerald-100 px-2 py-0.5">
                                {log.status}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <MessageSquare size={32} className="mb-2 opacity-20" />
                            <p className="text-sm font-medium">No interaction logs found.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CommunicationHistory;
