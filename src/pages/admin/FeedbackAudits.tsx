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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px] px-3 py-1">GOVERNANCE & QUALITY</Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 font-black text-[10px] px-3 py-1 uppercase">{followUps.filter(f => f.status === 'Pending Response').length} PENDING FOLLOW-UPS</Badge>
            </div>
            <h1 className="text-display text-slate-900">Feedback & Audits</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium leading-relaxed max-w-xl">
              Monitor service quality, customer satisfaction, and provider accountability across the SAHLI network.
            </p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="h-14 flex-1 sm:flex-none sm:px-8 gap-3 border-slate-200 font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-sm hover:bg-slate-50" 
              onClick={() => window.location.reload()}
            >
              <History size={18} />
              Refresh Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="follow-ups" className="space-y-8" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <TabsList className="bg-white p-2 border border-slate-100 rounded-[2.5rem] shadow-xl inline-flex min-w-full sm:min-w-0">
              <TabsTrigger value="follow-ups" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 px-6 sm:px-10 rounded-[1.75rem] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all h-14 flex-1 sm:flex-none">
                <History size={16} className="mr-3 hidden sm:inline" />
                Follow-ups
              </TabsTrigger>
              <TabsTrigger value="flags" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 px-6 sm:px-10 rounded-[1.75rem] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all h-14 flex-1 sm:flex-none">
                <Flag size={16} className="mr-3 hidden sm:inline" />
                Provider Flags
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="follow-ups" className="animate-in fade-in slide-in-from-bottom-2 duration-300 m-0">
            <Card className="border-slate-100 shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
              <div className="h-2 bg-primary" />
              <CardHeader className="border-b border-slate-100/50 pb-8 pt-10 px-6 sm:px-10">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-4 font-black text-slate-900 uppercase tracking-tight">
                  <MessageSquare className="text-primary" size={28} />
                  Automated Follow-up Queue
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm font-bold text-slate-500 mt-2 leading-relaxed">
                  SAHLI triggers customer satisfaction checks 24 hours after service completion.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Mobile View: Card List */}
                <div className="block sm:hidden p-6 space-y-6">
                  {followUps.length > 0 ? (
                    followUps.map((fu) => (
                      <div key={fu.id} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white shadow-xl space-y-6 active:scale-[0.98] transition-all">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] font-black text-slate-400 tracking-tighter uppercase">{fu.id}</span>
                            <span className="font-black text-xl text-slate-900 tracking-tight">{fu.requestId}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{fu.provider}</span>
                          </div>
                          <Badge 
                            variant={fu.status === 'Completed' ? 'outline' : 'default'} 
                            className={fu.status === 'Completed' 
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-black text-[10px] px-3 py-1.5 uppercase tracking-widest rounded-full' 
                              : 'bg-amber-500 text-white font-black text-[10px] px-3 py-1.5 shadow-lg shadow-amber-100 border-none uppercase tracking-widest rounded-full'
                            }
                          >
                            {fu.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between py-5 border-y border-slate-50">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</span>
                            <span className="text-base font-black text-slate-900 tracking-tight">{fu.customer}</span>
                          </div>
                          {fu.isOverdue && fu.status !== 'Completed' && (
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 text-[10px] font-black uppercase px-3 py-1 rounded-full">Overdue</Badge>
                          )}
                        </div>

                        <div className="space-y-4">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Rating & Feedback</span>
                          {fu.status === 'Completed' ? (
                            <div className="flex flex-col gap-4">
                              {renderStars(fu.rating, fu.comment.startsWith('Manual Follow-up:'))}
                              <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 shadow-inner">
                                <p className="text-xs italic text-slate-700 font-bold leading-relaxed">
                                  "{fu.comment}"
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-5">
                              <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-200" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting WhatsApp reply...</span>
                              </div>
                              {fu.isOverdue && (
                                <div className="grid grid-cols-3 gap-3">
                                  <Button 
                                    className="h-14 text-[11px] font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-2xl active:scale-95 transition-all shadow-lg shadow-emerald-100"
                                    onClick={() => handleRecordFeedback(fu.id, 'OK')}
                                  >OK</Button>
                                  <Button 
                                    className="h-14 text-[11px] font-black uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl active:scale-95 transition-all shadow-lg shadow-red-100"
                                    onClick={() => handleRecordFeedback(fu.id, 'Issue')}
                                  >Issue</Button>
                                  <Button 
                                    className="h-14 text-[11px] font-black uppercase tracking-widest bg-slate-100 hover:bg-slate-200 text-slate-600 border-none rounded-2xl active:scale-95 transition-all shadow-sm"
                                    onClick={() => handleRecordFeedback(fu.id, 'No response')}
                                  >None</Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:text-primary hover:bg-primary/5 active:scale-95 transition-all border-slate-200 shadow-sm">
                          View Full Details
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="py-24 text-center text-slate-400 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                      <History size={48} className="mx-auto mb-4 opacity-10" />
                      <p className="text-lg font-black tracking-tight text-slate-300 uppercase">No follow-ups in queue</p>
                      <p className="text-xs font-medium text-slate-400 mt-1">Check back later for automated logs.</p>
                    </div>
                  )}
                </div>

                {/* Desktop View: Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20 px-10">FU-ID</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Request / Provider</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Customer</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Status</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Rating & Feedback</TableHead>
                        <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-20 px-10">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {followUps.length > 0 ? (
                        followUps.map((fu) => (
                          <TableRow key={fu.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors group">
                            <TableCell className="font-mono text-[10px] font-black text-slate-400 px-10">{fu.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col py-6">
                                <span className="font-black text-sm text-slate-900 tracking-tight">{fu.requestId}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{fu.provider}</span>
                                {fu.isOverdue && fu.status !== 'Completed' && (
                                  <Badge variant="outline" className="w-fit mt-2 bg-red-50 text-red-600 border-red-100 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg">3+ Days Overdue</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm font-black text-slate-700 tracking-tight">{fu.customer}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={fu.status === 'Completed' ? 'outline' : 'default'} 
                                className={fu.status === 'Completed' 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full' 
                                  : 'bg-amber-500 text-white hover:bg-amber-600 font-black text-[10px] px-3 py-1 shadow-md shadow-amber-200 border-none uppercase tracking-widest rounded-full'
                                }
                              >
                                {fu.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {fu.status === 'Completed' ? (
                                <div className="flex flex-col gap-2 py-6">
                                  {renderStars(fu.rating, fu.comment.startsWith('Manual Follow-up:'))}
                                  <span className="text-xs italic text-slate-500 font-bold leading-relaxed max-w-[250px] line-clamp-2 group-hover:line-clamp-none transition-all">
                                    <span className="opacity-40">"</span>{fu.comment}<span className="opacity-40">"</span>
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-4 py-6">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting reply...</span>
                                  </div>
                                  {fu.isOverdue && (
                                    <div className="flex gap-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-10 text-[9px] font-black uppercase tracking-widest px-4 bg-emerald-600 hover:bg-emerald-700 text-white border-none active:scale-95 transition-all shadow-sm rounded-xl"
                                        onClick={() => handleRecordFeedback(fu.id, 'OK')}
                                      >OK</Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-10 text-[9px] font-black uppercase tracking-widest px-4 bg-red-600 hover:bg-red-700 text-white border-none active:scale-95 transition-all shadow-sm rounded-xl"
                                        onClick={() => handleRecordFeedback(fu.id, 'Issue')}
                                      >Issue</Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-10 text-[9px] font-black uppercase tracking-widest px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 border-none active:scale-95 transition-all shadow-sm rounded-xl"
                                        onClick={() => handleRecordFeedback(fu.id, 'No response')}
                                      >None</Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right px-10">
                              <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-12 px-6 text-slate-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 rounded-2xl transition-all active:scale-95 shadow-sm border-slate-200">
                                View Detail
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="py-24 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-400">
                              <History size={48} className="mb-4 opacity-10" />
                              <p className="text-lg font-black tracking-tight text-slate-300 uppercase">No follow-ups in queue</p>
                              <p className="text-xs font-medium text-slate-400 mt-1">Check back later for automated feedback logs.</p>
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

          <TabsContent value="flags" className="animate-in fade-in slide-in-from-bottom-2 duration-300 m-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-red-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-[2.5rem]">
                  <div className="h-2 bg-red-600 w-full" />
                  <CardHeader className="border-b border-slate-100/50 pb-6 pt-8 px-6 sm:px-10">
                    <CardTitle className="text-xl flex items-center gap-3 font-black text-slate-900 uppercase tracking-tight">
                      <Flag className="text-red-600" size={24} />
                      Active Provider Flags
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm font-medium text-slate-500 mt-2">
                      Governance alerts based on verified service issues and behavior.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Mobile View: Flag Cards */}
                    <div className="block sm:hidden p-6 space-y-6">
                      {flags.length > 0 ? (
                        flags.map((flag) => (
                          <div key={flag.id} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white shadow-xl space-y-6 active:scale-[0.98] transition-all">
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col gap-1">
                                <span className="font-black text-xl text-slate-900 tracking-tight">{flag.provider}</span>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Flag ID: {flag.id}</span>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={flag.severity === 'High' 
                                    ? 'bg-red-50 text-red-600 border-red-200 font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full' 
                                    : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full'
                                  }
                                >
                                  {flag.severity}
                                </Badge>
                                <Badge 
                                  className={flag.status === 'Active' 
                                    ? 'bg-red-600 text-white font-black text-[10px] px-3 py-1 border-none shadow-lg shadow-red-200 uppercase tracking-widest rounded-full' 
                                    : 'bg-slate-100 text-slate-400 font-black text-[10px] px-3 py-1 border-none uppercase tracking-widest rounded-full'
                                  }
                                >
                                  {flag.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="bg-slate-50/80 p-5 rounded-[1.5rem] border border-slate-100 shadow-inner">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Reason for Flag</span>
                              <p className="text-xs font-bold text-slate-700 leading-relaxed italic">"{flag.reason}"</p>
                            </div>

                            {flag.status === 'Active' ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] bg-red-600 hover:bg-red-700 text-white border-none transition-all active:scale-95 rounded-2xl shadow-lg shadow-red-100" 
                                onClick={() => handleResolveFlag(flag.id)}
                              >
                                Resolve Flag
                              </Button>
                            ) : (
                              <div className="w-full h-14 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RESOLVED</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="py-24 text-center text-slate-400 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                          <ShieldAlert size={48} className="mx-auto mb-4 opacity-10" />
                          <p className="text-lg font-black tracking-tight text-slate-300 uppercase">No active provider flags</p>
                          <p className="text-xs font-medium text-slate-400 mt-1">Network quality standards are maintained.</p>
                        </div>
                      )}
                    </div>

                    {/* Desktop View: Table */}
                    <div className="hidden sm:block overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20 px-10">Provider</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Reason for Flag</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Severity</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-20">Status</TableHead>
                            <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-20 px-10">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {flags.length > 0 ? (
                            flags.map((flag) => (
                              <TableRow key={flag.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                                <TableCell className="font-black text-sm text-slate-900 px-10 tracking-tight py-8">{flag.provider}</TableCell>
                                <TableCell className="text-xs font-bold text-slate-600 leading-relaxed min-w-[250px] italic py-8">"{flag.reason}"</TableCell>
                                <TableCell className="py-8">
                                  <Badge 
                                    variant="outline" 
                                    className={flag.severity === 'High' 
                                      ? 'bg-red-50 text-red-600 border-red-200 font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full' 
                                      : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full'
                                    }
                                  >
                                    {flag.severity}
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-8">
                                  <Badge 
                                    className={flag.status === 'Active' 
                                      ? 'bg-red-600 text-white font-black text-[10px] px-3 py-1 border-none shadow-md shadow-red-200 uppercase tracking-widest rounded-full' 
                                      : 'bg-slate-100 text-slate-400 font-black text-[10px] px-3 py-1 border-none uppercase tracking-widest rounded-full'
                                    }
                                  >
                                    {flag.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right px-10 py-8">
                                  {flag.status === 'Active' ? (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-12 text-[10px] font-black uppercase tracking-widest px-6 bg-red-600 hover:bg-red-700 text-white border-none transition-all active:scale-95 shadow-sm rounded-2xl" 
                                      onClick={() => handleResolveFlag(flag.id)}
                                    >
                                      Resolve Flag
                                    </Button>
                                  ) : (
                                    <div className="flex items-center justify-end gap-2 text-slate-400">
                                      <CheckCircle2 size={16} className="text-emerald-500" />
                                      <span className="text-[10px] font-black uppercase tracking-widest">RESOLVED</span>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="py-24 text-center">
                                <div className="flex flex-col items-center justify-center text-slate-400">
                                  <ShieldAlert size={48} className="mb-4 opacity-10" />
                                  <p className="text-lg font-black tracking-tight text-slate-300 uppercase">No active provider flags</p>
                                  <p className="text-xs font-medium text-slate-400 mt-1">Network quality standards are currently maintained.</p>
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
                <Card className="bg-white border-slate-100 overflow-hidden relative shadow-xl rounded-[2.5rem]">
                  <div className="absolute -top-4 -right-4 p-8 opacity-10">
                    <ShieldAlert className="text-primary" size={100} />
                  </div>
                  <CardHeader className="pb-4 pt-10 px-8">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Governance Protocol</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 pb-10 px-8 relative z-10">
                    <div className="space-y-3 group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 group-hover:text-primary transition-colors">1. Flag Distinction</p>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed pl-5">Flags are operational markers for governance actions (pause/review), not immediate terminal bans.</p>
                    </div>
                    <div className="space-y-3 group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 group-hover:text-primary transition-colors">2. Automatic Threshold</p>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed pl-5">3+ negative reviews within 30 days triggers an automatic suspension pending administrative review.</p>
                    </div>
                    <div className="space-y-3 group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 group-hover:text-primary transition-colors">3. Resolution Audit</p>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed pl-5">Admins must record a detailed resolution summary before a flag can be cleared from a profile.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-100 bg-white shadow-xl rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="pb-6 pt-10 px-8">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                      <Filter size={18} className="text-primary" />
                      Quick Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-10 px-8">
                    <Button variant="outline" className="w-full justify-start text-[11px] font-black uppercase tracking-widest h-14 bg-white hover:bg-slate-50 border-slate-200 transition-all rounded-2xl group active:scale-95 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200 mr-4 group-hover:bg-primary transition-colors" />
                      All Providers
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[11px] font-black uppercase tracking-widest h-14 bg-white hover:bg-slate-50 border-slate-200 transition-all rounded-2xl group active:scale-95 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-4 shadow-lg shadow-red-200" />
                      Critical Flags Only
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[11px] font-black uppercase tracking-widest h-14 bg-white hover:bg-slate-50 border-slate-200 transition-all rounded-2xl group active:scale-95 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-4 shadow-lg shadow-amber-200" />
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

