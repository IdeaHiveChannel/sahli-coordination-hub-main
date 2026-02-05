import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ClipboardList, 
  Clock, 
  AlertCircle,
  Megaphone,
  ShieldCheck,
  Zap,
  Activity,
  Search,
  History,
  AlertTriangle,
  Lock,
  Database,
  Globe,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { storageService } from '@/lib/storageService';
import { Request, Provider } from '@/lib/types';

const Dashboard = () => {
  const { dir } = useLanguage();
  const navigate = useNavigate();

  const metrics = storageService.getDashboardMetrics();
  const activities = storageService.getActivities();

  return (
    <AdminLayout>
      <div className="py-2 space-y-8" dir={dir}>
        {/* Header - Control Center Style */}
        <div className="flex items-center justify-between bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-2xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <Badge variant="outline" className="border-slate-700 text-slate-400 font-black tracking-widest text-[10px]">OPERATIONAL CONTROL</Badge>
            </div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Air Traffic Control</h1>
            <p className="text-sm text-slate-400 mt-1 font-medium italic">
              Monitoring flow thresholds, risk signals, and audit integrity.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Audit Readiness</span>
              <div className="flex items-center gap-2 justify-end">
                <ShieldCheck size={16} className={metrics.audit.ready ? "text-emerald-400" : "text-amber-400"} />
                <span className={`text-sm font-black ${metrics.audit.ready ? "text-emerald-400" : "text-amber-400"}`}>
                  {metrics.audit.ready ? "SYSTEM READY" : "RECONCILIATION REQ"}
                </span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <Database size={14} className={metrics.health.database ? "text-emerald-500" : "text-red-500"} />
                <span className="text-[8px] font-black text-slate-500">DB</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe size={14} className={metrics.health.webhook ? "text-emerald-500" : "text-red-500"} />
                <span className="text-[8px] font-black text-slate-500">WEB</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageSquare size={14} className={metrics.health.messaging ? "text-emerald-500" : "text-red-500"} />
                <span className="text-[8px] font-black text-slate-500">MSG</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Q1: ACTION REQUIRED PANEL (HIGH PRIORITY) */}
          <Card className="lg:col-span-8 border-red-500/20 bg-white shadow-xl">
            <CardHeader className="bg-red-50/50 border-b border-red-100 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-600" size="20" />
                  <CardTitle className="text-lg font-black uppercase tracking-tight text-slate-900">Action Required</CardTitle>
                </div>
                <Badge className="bg-red-600 text-white font-black">{metrics.attention.totalUrgent} URGENT</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {metrics.attention.totalUrgent === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400 italic">
                  <Zap size={32} className="mb-2 opacity-20" />
                  <p className="text-sm font-medium">All high-intent flows are moving within thresholds.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-3 flex items-center gap-2">
                      <Clock size={12} /> Stalled High-Intent
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-3xl font-black text-slate-900">{metrics.attention.stuckNewCount}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Requests stuck in "New" {'>'} 15m</span>
                      </div>
                      {metrics.attention.overdueFollowUps > 0 && (
                        <div className="pt-2 border-t border-slate-200">
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">Audit Gaps</span>
                          <span className="text-xl font-black text-slate-900">{metrics.attention.overdueFollowUps} Overdue Follow-ups</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">Oldest Age</span>
                        <span className="text-xl font-black text-slate-900">{metrics.attention.oldestPendingMinutes}m</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-2">
                      <Megaphone size={12} /> Provider Supply Failure
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-3xl font-black text-slate-900">{metrics.attention.noResponseBroadcastsCount}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Broadcasts with zero response {'>'} 20m</span>
                      </div>
                      <button 
                        onClick={() => navigate('/admin/broadcast-queue')}
                        className="w-full mt-2 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Intervene in Queue
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Q2: FLOW BOTTLENECKS */}
          <Card className="lg:col-span-4 border-slate-200 bg-slate-50 shadow-sm">
            <CardHeader className="py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Activity className="text-slate-600" size={18} />
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">Flow Bottlenecks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(metrics.flow.byState).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{status}</span>
                    <span className={`text-xs font-black ${count > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {count} STALLED
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-slate-100/50 p-3 rounded-xl border border-dashed border-slate-300">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Verified / Not Broadcasted</span>
                  <span className="text-xs font-black text-slate-700">{metrics.flow.verifiedNotBroadcasted}</span>
                </div>
                <div className="flex items-center justify-between bg-slate-100/50 p-3 rounded-xl border border-dashed border-slate-300">
                  <span className="text-[10px] font-black text-slate-500 uppercase">YES / Not Confirmed</span>
                  <span className="text-xs font-black text-slate-700">{metrics.flow.pendingConfirmation}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic text-center">
                State stagnation detected by operational thresholds.
              </p>
            </CardContent>
          </Card>

          {/* Q3: PROVIDER RISK & GOVERNANCE */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 py-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={18} />
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">Provider Risk Signals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Conduct Warning</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black ${metrics.risk.conductRiskCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                      {metrics.risk.conductRiskCount}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">At 2/3 Flags</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Warning</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black ${metrics.risk.responseRiskCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                      {metrics.risk.responseRiskCount}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">At 85-90% Rate</span>
                  </div>
                </div>
              </div>
              {metrics.risk.trendingDownward && (
                <div className="mt-4 p-2 bg-amber-50 border border-amber-100 rounded-lg flex items-center gap-2">
                  <AlertTriangle size={12} className="text-amber-600" />
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-tight">Supply quality trending downward</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Q4 & Q5: LEAD INTEGRITY & AUDIT */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" size={18} />
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">Integrity & Audit Readiness</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border text-center ${metrics.integrity.hasCriticalFailure ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                  <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${metrics.integrity.hasCriticalFailure ? 'text-red-800' : 'text-emerald-800'}`}>
                    Lead Integrity Score
                  </span>
                  <span className={`text-3xl font-black tracking-tighter ${metrics.integrity.hasCriticalFailure ? 'text-red-600' : 'text-emerald-600'}`}>
                    {metrics.integrity.score}%
                  </span>
                  <div className="mt-1 flex flex-col gap-0.5">
                    <span className={`text-[9px] font-bold uppercase ${metrics.integrity.lacksEvidence > 0 ? 'text-red-600' : 'text-slate-500'}`}>
                      {metrics.integrity.verifiedLeads} Verified Leads
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">
                      {metrics.integrity.disputeCount} Disputes Logged
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl border text-center ${metrics.audit.ready ? 'bg-blue-50 border-blue-100' : 'bg-amber-50 border-amber-100'}`}>
                  <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${metrics.audit.ready ? 'text-blue-800' : 'text-amber-800'}`}>
                    Audit-Ready Flow
                  </span>
                  <span className={`text-3xl font-black tracking-tighter ${metrics.audit.ready ? 'text-blue-600' : 'text-amber-600'}`}>
                    {metrics.audit.ready ? '100%' : `${metrics.audit.completionRate}%`}
                  </span>
                  <div className="mt-2 flex justify-center gap-1">
                    <Badge variant="secondary" className="bg-white/50 text-[8px] font-black uppercase">OTP</Badge>
                    <Badge variant="secondary" className="bg-white/50 text-[8px] font-black uppercase">SESS</Badge>
                    <Badge variant="secondary" className="bg-white/50 text-[8px] font-black uppercase">ACK</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Heartbeat & Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200">
            <History className="text-slate-400" size={20} />
            <div className="flex-1">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Latest System Event</span>
              <p className="text-xs font-bold text-slate-700">
                {activities[0]?.desc || 'Persistence layer initialized.'}
              </p>
            </div>
            <button 
              onClick={() => navigate('/admin/communication-history')}
              className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
            >
              View Logs
            </button>
          </div>
          <div className="flex items-center gap-6 justify-center md:justify-end">
            <button onClick={() => navigate('/admin/requests')} className="flex flex-col items-center group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                <ClipboardList size={18} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest mt-2 text-slate-500">Requests</span>
            </button>
            <button onClick={() => navigate('/admin/broadcast-queue')} className="flex flex-col items-center group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                <Megaphone size={18} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest mt-2 text-slate-500">Broadcasts</span>
            </button>
            <button onClick={() => navigate('/admin/provider-responses')} className="flex flex-col items-center group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                <MessageSquare size={18} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest mt-2 text-slate-500">Responses</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
