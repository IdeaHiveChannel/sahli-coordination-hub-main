import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { Star, Flag, MessageSquare, AlertTriangle, CheckCircle2, ShieldAlert, History, Filter } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { storageService, Feedback, Flag as FlagType } from '@/lib/storageService';

const FeedbackAudits = () => {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState('follow-ups');
  const [followUps, setFollowUps] = useState<Feedback[]>([]);
  const [flags, setFlags] = useState<FlagType[]>([]);

  useEffect(() => {
    setFollowUps(storageService.getFeedback());
    setFlags(storageService.getFlags());
  }, []);

  const handleRecordFeedback = (id: string, result: 'OK' | 'Issue' | 'No response') => {
    const fu = followUps.find(f => f.id === id);
    if (!fu) return;

    storageService.updateFeedback(id, { 
      status: 'Completed', 
      comment: `Manual Follow-up: ${result}`, 
      rating: result === 'OK' ? 5 : 1 
    });

    if (result === 'Issue') {
      storageService.saveFlag({
        provider: fu.provider,
        reason: 'Service issue reported during manual follow-up',
        severity: 'Medium',
        date: new Date().toISOString().split('T')[0],
        status: 'Active'
      });
      toast.error(`Issue recorded. Provider ${fu.provider} has been flagged.`);
    } else {
      toast.success(`Feedback recorded: ${result}`);
    }

    setFollowUps(storageService.getFeedback());
    setFlags(storageService.getFlags());
  };

  const handleResolveFlag = (id: string) => {
    storageService.updateFlag(id, { status: 'Resolved' });
    setFlags(storageService.getFlags());
    toast.success('Flag marked as resolved.');
  };

  const renderStars = (rating: number, isManual: boolean) => {
    if (isManual && rating === 1) {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-100 text-[8px] h-4 uppercase font-black">
          Issue Reported
        </Badge>
      );
    }
    if (isManual && rating === 5) {
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[8px] h-4 uppercase font-black">
          OK (Manual)
        </Badge>
      );
    }
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            size={14} 
            className={s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"} 
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex items-center justify-between mb-6 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">GOVERNANCE & QUALITY</Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 font-bold text-[10px]">{followUps.filter(f => f.status === 'Pending Response').length} PENDING FOLLOW-UPS</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Feedback & Audits</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Monitor service quality, customer satisfaction, and provider accountability across the SAHLI network.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 border-primary/20 text-primary hover:bg-primary/5 font-bold" onClick={() => window.location.reload()}>
              <History size={16} className="mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="follow-ups" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-white/50 backdrop-blur-md p-1 border border-slate-200/60 rounded-xl shadow-sm">
            <TabsTrigger value="follow-ups" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md px-8 rounded-lg text-xs font-bold uppercase tracking-widest transition-all h-9">
              <History size={14} className="mr-2" />
              Post-Service Follow-ups
            </TabsTrigger>
            <TabsTrigger value="flags" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md px-8 rounded-lg text-xs font-bold uppercase tracking-widest transition-all h-9">
              <Flag size={14} className="mr-2" />
              Provider Flags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="follow-ups" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="border-primary/10 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary/80 to-primary" />
              <CardHeader className="border-b border-slate-100/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2 font-bold text-slate-800">
                  <MessageSquare className="text-primary" size={20} />
                  Automated Follow-up Queue
                </CardTitle>
                <CardDescription className="text-xs">
                  SAHLI triggers customer satisfaction checks 24 hours after service completion.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">FU-ID</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Request / Provider</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Customer</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Status</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Rating & Feedback</TableHead>
                        <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-10 px-6">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {followUps.length > 0 ? (
                        followUps.map((fu) => (
                          <TableRow key={fu.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                            <TableCell className="font-mono text-[10px] font-black text-slate-400">{fu.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-black text-sm text-slate-900">{fu.requestId}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{fu.provider}</span>
                                {fu.isOverdue && fu.status !== 'Completed' && (
                                  <Badge variant="outline" className="w-fit mt-1.5 bg-red-50 text-red-600 border-red-100 text-[8px] font-black uppercase px-1.5 py-0">3+ Days Overdue</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm font-bold text-slate-700">{fu.customer}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={fu.status === 'Completed' ? 'outline' : 'default'} 
                                className={fu.status === 'Completed' 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[9px] px-2 py-0.5' 
                                  : 'bg-amber-500 text-white hover:bg-amber-600 font-black text-[9px] px-2 py-0.5 shadow-sm shadow-amber-200 border-none'
                                }
                              >
                                {fu.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {fu.status === 'Completed' ? (
                                <div className="flex flex-col gap-1.5 py-2">
                                  {renderStars(fu.rating, fu.comment.startsWith('Manual Follow-up:'))}
                                  <span className="text-xs italic text-slate-500 font-medium leading-relaxed max-w-[200px] truncate group-hover:whitespace-normal">
                                    <span className="opacity-40">"</span>{fu.comment}<span className="opacity-40">"</span>
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-2 py-2">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Awaiting WhatsApp reply...</span>
                                  {fu.isOverdue && (
                                    <div className="flex gap-1">
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-7 text-[9px] font-black uppercase px-3 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 transition-all shadow-sm"
                                        onClick={() => handleRecordFeedback(fu.id, 'OK')}
                                      >OK</Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-7 text-[9px] font-black uppercase px-3 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 transition-all shadow-sm"
                                        onClick={() => handleRecordFeedback(fu.id, 'Issue')}
                                      >Issue</Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-7 text-[9px] font-black uppercase px-3 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                                        onClick={() => handleRecordFeedback(fu.id, 'No response')}
                                      >No Reply</Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right px-6">
                              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">View Detail</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-400">
                              <History size={32} className="mb-2 opacity-20" />
                              <p className="text-sm font-medium">No follow-ups in queue.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flags" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-red-100 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="h-1.5 bg-red-600 w-full" />
                  <CardHeader className="border-b border-slate-100/50 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2 font-bold text-slate-800">
                      <Flag className="text-red-600" size={20} />
                      Active Provider Flags
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Governance alerts based on verified service issues and behavior.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Provider</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Reason for Flag</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Severity</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-10">Status</TableHead>
                            <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-10 px-6">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {flags.length > 0 ? (
                            flags.map((flag) => (
                              <TableRow key={flag.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                                <TableCell className="font-black text-sm text-slate-900">{flag.provider}</TableCell>
                                <TableCell className="text-xs font-medium text-slate-600 leading-relaxed min-w-[200px]">{flag.reason}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={flag.severity === 'High' 
                                      ? 'bg-red-50 text-red-600 border-red-200 font-black text-[9px] px-2 py-0.5' 
                                      : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-2 py-0.5'
                                    }
                                  >
                                    {flag.severity.toUpperCase()}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    className={flag.status === 'Active' 
                                      ? 'bg-red-600 text-white font-black text-[9px] px-2 py-0.5 border-none shadow-sm shadow-red-200' 
                                      : 'bg-slate-100 text-slate-400 font-black text-[9px] px-2 py-0.5 border-none'
                                    }
                                  >
                                    {flag.status.toUpperCase()}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                  {flag.status === 'Active' ? (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8 text-[10px] font-black uppercase tracking-widest border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm" 
                                      onClick={() => handleResolveFlag(flag.id)}
                                    >
                                      Resolve Flag
                                    </Button>
                                  ) : (
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">RESOLVED</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="py-12 text-center">
                                <div className="flex flex-col items-center justify-center text-slate-400">
                                  <ShieldAlert size={32} className="mb-2 opacity-20" />
                                  <p className="text-sm font-medium">No active provider flags.</p>
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

              <div className="space-y-6">
                <Card className="bg-slate-900 border-slate-800 text-white overflow-hidden relative shadow-xl">
                  <div className="absolute -top-4 -right-4 p-8 opacity-10">
                    <ShieldAlert className="text-primary" size={100} />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary">Governance Protocol</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4 relative z-10">
                    <div className="space-y-1.5 group">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <p className="text-xs font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors">1. Flag Distinction</p>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed pl-3.5">Flags are operational markers for governance actions (pause/review), not immediate terminal bans.</p>
                    </div>
                    <div className="space-y-1.5 group">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <p className="text-xs font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors">2. Automatic Threshold</p>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed pl-3.5">3+ negative reviews within 30 days triggers an automatic suspension pending administrative review.</p>
                    </div>
                    <div className="space-y-1.5 group">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <p className="text-xs font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors">3. Resolution Audit</p>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed pl-3.5">Admins must record a detailed resolution summary before a flag can be cleared from a profile.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Filter size={14} className="text-primary" />
                      Quick Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-10 bg-white hover:bg-slate-50 border-slate-200 transition-all rounded-xl group">
                      <span className="w-2 h-2 rounded-full bg-slate-300 mr-3 group-hover:bg-primary transition-colors" />
                      All Providers
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-10 bg-white hover:bg-slate-50 border-slate-200 transition-all rounded-xl group">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-3" />
                      Critical Flags Only
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-10 bg-white hover:bg-slate-50 border-slate-200 transition-all rounded-xl group">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-3" />
                      Low Ratings Queue
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default FeedbackAudits;

