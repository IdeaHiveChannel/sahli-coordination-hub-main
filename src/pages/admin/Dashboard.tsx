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

  const [metrics, setMetrics] = React.useState(storageService.getDashboardMetrics());
  const [activities, setActivities] = React.useState(storageService.getActivities());

  const refreshData = React.useCallback(() => {
    setMetrics(storageService.getDashboardMetrics());
    setActivities(storageService.getActivities());
  }, []);

  React.useEffect(() => {
    refreshData();
    window.addEventListener('storage', refreshData);
    const interval = setInterval(refreshData, 30000);
    return () => {
      window.removeEventListener('storage', refreshData);
      clearInterval(interval);
    };
  }, [refreshData]);

  return (
    <AdminLayout>
      <div className="py-2 space-y-6 md:space-y-10" dir={dir}>
        {/* Header - Control Center Style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white text-slate-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-all duration-1000 group-hover:bg-primary/20" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,1)]" />
              <Badge variant="outline" className="border-slate-200 text-slate-500 font-black tracking-[0.25em] text-[10px] uppercase py-1 px-4 rounded-full">Operational Control</Badge>
            </div>
            <h1 className="text-display text-slate-900 mb-4">Air Traffic Control</h1>
            <p className="text-xs md:text-base text-slate-500 font-bold italic max-w-md leading-relaxed opacity-80">
              Monitoring flow thresholds, risk signals, and audit integrity in real-time.
            </p>
          </div>
          
          <div className="mt-10 md:mt-0 flex flex-wrap items-center gap-6 md:gap-12 relative z-10 border-t border-slate-100 pt-8 md:pt-0 md:border-t-0">
            <div className="flex-1 md:flex-none md:text-right">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Audit Readiness</span>
              <div className="flex items-center gap-3 md:justify-end bg-slate-50 p-5 md:p-0 rounded-2xl border border-slate-100 md:border-0">
                <ShieldCheck size={24} className={metrics.audit.ready ? "text-emerald-500" : "text-amber-500"} />
                <span className={`text-lg font-black tracking-tight ${metrics.audit.ready ? "text-emerald-500" : "text-amber-500"}`}>
                  {metrics.audit.ready ? "SYSTEM READY" : "RECONCILIATION REQ"}
                </span>
              </div>
            </div>
            
            <div className="hidden md:block h-16 w-px bg-slate-200" />
            
            <div className="flex items-center justify-between w-full md:w-auto gap-8 md:gap-8 bg-slate-50 p-6 md:p-0 rounded-3xl border border-slate-100 md:border-0">
              <div className="flex flex-col items-center gap-3 group/icon cursor-help">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${metrics.health.database ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"}`} />
                <Database size={18} className="text-slate-400 group-hover/icon:text-slate-600 transition-colors" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/icon:text-slate-500">DB</span>
              </div>
              <div className="flex flex-col items-center gap-3 group/icon cursor-help">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${metrics.health.webhook ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"}`} />
                <Globe size={18} className="text-slate-400 group-hover/icon:text-slate-600 transition-colors" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/icon:text-slate-500">WEB</span>
              </div>
              <div className="flex flex-col items-center gap-3 group/icon cursor-help">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${metrics.health.messaging ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"}`} />
                <MessageSquare size={18} className="text-slate-400 group-hover/icon:text-slate-600 transition-colors" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/icon:text-slate-500">MSG</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Q1: ACTION REQUIRED PANEL (HIGH PRIORITY) */}
          <Card className="lg:col-span-8 border-red-500/20 bg-white shadow-xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden active:scale-[0.99] transition-all duration-500">
            <CardHeader className="bg-red-50/50 border-b border-red-100 py-6 px-8 md:px-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-2xl text-red-600 shadow-inner">
                    <AlertCircle size={24} />
                  </div>
                  <CardTitle className="text-subtitle text-slate-900">Action Required</CardTitle>
                </div>
                <Badge className="bg-red-600 text-white font-black px-4 py-1.5 rounded-full text-[10px] tracking-widest shadow-lg shadow-red-200">{metrics.attention.totalUrgent} URGENT</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              {metrics.attention.totalUrgent === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 italic">
                  <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <Zap size={40} className="opacity-20" />
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest text-slate-500">All high-intent flows clear</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col justify-center min-h-[160px]">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-4 flex items-center gap-2">
                        <Clock size={12} /> Stalled High-Intent
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{metrics.attention.stuckNewCount}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Stuck New {'>'} 15m</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                          <div>
                            <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-1">Oldest</span>
                            <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">{metrics.attention.oldestPendingMinutes}m</span>
                          </div>
                          {metrics.attention.overdueFollowUps > 0 && (
                            <div>
                              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-1">Gaps</span>
                              <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">{metrics.attention.overdueFollowUps}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col justify-between min-h-[160px]">
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-4 flex items-center gap-2">
                        <Users size={12} /> Provider Intake
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{metrics.attention.pendingApplicationsCount}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Pending Apps</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/admin/provider-applications')}
                      className="w-full mt-4 h-12 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                      Review
                    </button>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col justify-between min-h-[160px]">
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-4 flex items-center gap-2">
                        <Megaphone size={12} /> Provider Failure
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{metrics.attention.noResponseBroadcastsCount}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Zero Resp {'>'} 20m</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/admin/broadcast-queue')}
                    className="w-full mt-4 h-12 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                  >
                      Intervene
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Q2: FLOW BOTTLENECKS */}
          <Card className="lg:col-span-4 border-slate-200 bg-slate-50/50 shadow-lg rounded-[2.5rem] md:rounded-[3rem] overflow-hidden active:scale-[0.99] transition-all h-full">
            <CardHeader className="py-6 px-8 border-b border-slate-200 bg-white/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl text-slate-600 shadow-inner">
                  <Activity size={20} />
                </div>
                <CardTitle className="text-subtitle text-slate-900">Flow Bottlenecks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-5">
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(metrics.flow.byState).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm active:scale-95 transition-all">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest truncate mr-2">{status}</span>
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap ${count > 0 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                      {count} STALLED
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-slate-100/50 p-5 rounded-2xl border border-dashed border-slate-300 mt-2">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verified / Not BC</span>
                  <span className="text-sm font-black text-slate-700">{metrics.flow.verifiedNotBroadcasted}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center pt-2">
                Operational Stagnation Detected
              </p>
            </CardContent>
          </Card>

          {/* Q3: PROVIDER RISK & GOVERNANCE */}
          <Card className="lg:col-span-6 border-slate-200 shadow-lg rounded-[2.5rem] md:rounded-[3rem] overflow-hidden active:scale-[0.99] transition-all h-full">
            <CardHeader className="border-b border-slate-100 py-6 px-8 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-500 shadow-inner">
                  <AlertTriangle size={20} />
                </div>
                <CardTitle className="text-subtitle text-slate-900">Provider Risk Signals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3 flex flex-col justify-center">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Conduct Warning</span>
                  <div className="flex items-center gap-4">
                    <span className={`text-6xl font-black tracking-tighter leading-none ${metrics.risk.conductRiskCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                      {metrics.risk.conductRiskCount}
                    </span>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-tight">At 2/3 Flags</span>
                  </div>
                </div>
                <div className="space-y-3 flex flex-col justify-center">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Response Rate</span>
                  <div className="flex items-center gap-4">
                    <span className={`text-6xl font-black tracking-tighter leading-none ${metrics.risk.responseRiskCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                      {metrics.risk.responseRiskCount}
                    </span>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-tight">Under 90%</span>
                  </div>
                </div>
              </div>
              {metrics.risk.trendingDownward && (
                <div className="mt-10 p-5 bg-amber-50 border border-amber-100 rounded-[2rem] flex items-center gap-4 shadow-inner">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <AlertTriangle size={18} className="text-amber-600" />
                  </div>
                  <span className="text-[11px] font-black text-amber-700 uppercase tracking-widest leading-tight">Supply quality trending downward - Intervention suggested</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Q4 & Q5: LEAD INTEGRITY & AUDIT */}
          <Card className="lg:col-span-6 border-slate-200 shadow-lg rounded-[2.5rem] md:rounded-[3rem] overflow-hidden active:scale-[0.99] transition-all h-full">
            <CardHeader className="border-b border-slate-100 py-6 px-8 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 shadow-inner">
                  <ShieldCheck size={20} />
                </div>
                <CardTitle className="text-subtitle text-slate-900">Integrity & Audit Readiness</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-[2.5rem] border transition-all h-full flex flex-col justify-center ${metrics.integrity.hasCriticalFailure ? 'bg-red-50/50 border-red-100 shadow-xl shadow-red-100/10' : 'bg-emerald-50/50 border-emerald-100 shadow-xl shadow-emerald-100/10'}`}>
                  <span className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${metrics.integrity.hasCriticalFailure ? 'text-red-800' : 'text-emerald-800'}`}>
                    Lead Integrity Score
                  </span>
                  <span className={`text-6xl font-black tracking-tighter block mb-4 leading-none ${metrics.integrity.hasCriticalFailure ? 'text-red-600' : 'text-emerald-600'}`}>
                    {metrics.integrity.score}%
                  </span>
                  <div className="space-y-2">
                    <span className={`block text-[10px] font-black uppercase tracking-widest ${metrics.integrity.lacksEvidence > 0 ? 'text-red-600' : 'text-slate-500'}`}>
                      {metrics.integrity.verifiedLeads} Verified Leads
                    </span>
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {metrics.integrity.disputeCount} Disputes Logged
                    </span>
                  </div>
                </div>
                <div className={`p-8 rounded-[2.5rem] border transition-all h-full flex flex-col justify-center ${metrics.audit.ready ? 'bg-blue-50/50 border-blue-100 shadow-xl shadow-blue-100/10' : 'bg-amber-50/50 border-amber-100 shadow-xl shadow-amber-100/10'}`}>
                  <span className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${metrics.audit.ready ? 'text-blue-800' : 'text-amber-800'}`}>
                    Audit-Ready Flow
                  </span>
                  <span className={`text-6xl font-black tracking-tighter block mb-4 leading-none ${metrics.audit.ready ? 'text-primary' : 'text-amber-600'}`}>
                    {metrics.audit.ready ? '100%' : `${metrics.audit.completionRate}%`}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="bg-white/80 text-[9px] font-black uppercase tracking-tighter px-3 py-1 border border-slate-200 rounded-full">OTP</Badge>
                    <Badge variant="secondary" className="bg-white/80 text-[9px] font-black uppercase tracking-tighter px-3 py-1 border border-slate-200 rounded-full">SESS</Badge>
                    <Badge variant="secondary" className="bg-white/80 text-[9px] font-black uppercase tracking-tighter px-3 py-1 border border-slate-200 rounded-full">ACK</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Heartbeat & Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pt-4">
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 shadow-xl active:scale-[0.99] transition-all">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit shadow-inner text-primary flex-shrink-0">
                <Users size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Provider Pipeline</span>
                <p className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-tight truncate">
                  {storageService.getApplications().filter(a => a.status === 'Pending').length} Pending Applications
                </p>
              </div>
              <button 
                onClick={() => navigate('/admin/provider-applications')}
                className="mt-6 md:mt-0 px-10 h-16 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/90 active:scale-95 transition-all flex-shrink-0 shadow-lg shadow-primary/20"
              >
                Review Apps
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 active:scale-[0.99] transition-all">
              <div className="p-4 bg-slate-100 rounded-2xl w-fit shadow-inner text-slate-400 flex-shrink-0">
                <History size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Latest System Event</span>
                <p className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-tight truncate">
                  {activities[0]?.desc || 'Persistence layer initialized.'}
                </p>
              </div>
              <button 
                onClick={() => navigate('/admin/communication-history')}
                className="mt-6 md:mt-0 px-10 h-16 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-xl shadow-primary/20 flex-shrink-0"
              >
                View Logs
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
            {[
              { label: 'Requests', icon: <ClipboardList size={26} />, path: '/admin/requests' },
              { label: 'Broadcasts', icon: <Megaphone size={26} />, path: '/admin/broadcast-queue' },
              { label: 'Responses', icon: <MessageSquare size={26} />, path: '/admin/provider-responses' }
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)} 
                className="flex flex-row items-center justify-start p-6 md:p-8 bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] hover:bg-primary/5 hover:text-primary transition-all shadow-xl shadow-slate-200/50 active:scale-95 group w-full"
              >
                <div className="mr-6 text-slate-400 group-hover:text-primary transition-colors flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
