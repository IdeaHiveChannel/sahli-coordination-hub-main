import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Settings2, 
  Users, 
  Zap, 
  Clock, 
  CheckCircle2,
  Lock,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { GOVERNANCE_THRESHOLDS } from '@/lib/governanceConstants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const Settings = () => {
  const { t, dir } = useLanguage();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('System settings updated successfully.');
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="py-2 md:py-6" dir={dir}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 bg-white shadow-xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary text-white border-none font-black tracking-widest text-[9px] px-3 py-1 rounded-full uppercase">SYSTEM CORE</Badge>
              <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-black text-[9px] px-3 py-1 rounded-full uppercase">V1.0.5</Badge>
            </div>
            <h1 className="text-display text-slate-900">Control Center</h1>
            <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed max-w-md">
              Manage admin roles, coordination protocols, and system-wide security rules.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] h-14 px-8 rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Settings2 size={18} className="mr-2" />
              {isSaving ? 'Saving Changes...' : 'Save Settings'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Coordination Protocols */}
            <Card className="border-primary/10 shadow-xl overflow-hidden rounded-[2.5rem] bg-white">
              <div className="h-2 bg-gradient-to-r from-primary/80 to-primary w-full" />
              <CardHeader className="pb-4">
                <CardTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Zap size={20} className="text-primary" />
                  </div>
                  Coordination Protocols
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500">Define how SAHLI handles provider responses and assignments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="flex items-center justify-between p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100">
                  <div className="space-y-1">
                    <Label className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                      First Valid YES Wins
                      <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 text-[8px] h-4 font-black px-2 rounded-full">ACTIVE</Badge>
                    </Label>
                    <p className="text-xs text-slate-500 font-medium">Automatically award eligibility to the first provider who replies "YES".</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Follow-up Delay (Hours)</Label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input type="number" defaultValue={24} className="h-12 pl-12 rounded-xl bg-white border-slate-200 focus:ring-primary/20" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium ml-1">Wait time before triggering post-service WhatsApp follow-up.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Broadcast Expiry (Minutes)</Label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input type="number" defaultValue={60} className="h-12 pl-12 rounded-xl bg-white border-slate-200 focus:ring-primary/20" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium ml-1">Time before a broadcast is marked as 'No Response'.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t border-slate-100 p-6">
                <Button 
                  className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-xl shadow-primary/10 active:scale-95 transition-all"
                  onClick={handleSave} 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Update Protocols'}
                </Button>
              </CardFooter>
            </Card>

            {/* Admin Credentials & Security */}
            <Card className="border-primary/10 shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Lock size={20} className="text-primary" />
                  </div>
                  Admin Security
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500">Manage your access credentials and password reset protocols.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="p-6 rounded-[1.5rem] bg-amber-50/50 border border-amber-100 space-y-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <AlertTriangle size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Security Notice</span>
                  </div>
                  <p className="text-sm text-amber-700/80 font-medium leading-relaxed">
                    To permanently change your admin password, you must update the <strong className="font-black">VITE_ADMIN_PASSWORD</strong> secret in your GitHub Repository settings. 
                  </p>
                  <Button 
                    variant="outline" 
                    className="h-12 bg-white border-amber-200 text-amber-700 hover:bg-amber-100 font-black text-[10px] uppercase tracking-widest px-6 rounded-xl active:scale-95 transition-all"
                    asChild
                  >
                    <a href="mailto:hello@sahliservice.com?subject=Admin Password Change Request&body=Hello, I would like to request a permanent password change for the Sahli Admin Portal.">
                      Request Support Reset
                    </a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Admin Email</Label>
                      <Input value="admin@sahli.co" readOnly className="h-12 bg-slate-50 font-mono text-xs border-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Admin Password</Label>
                      <div className="relative">
                        <Input type="password" value="********" readOnly className="h-12 bg-slate-50 font-mono text-xs border-slate-100 rounded-xl" />
                        <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-200 text-slate-600 hover:bg-slate-200 text-[8px] font-black px-2 rounded-full">PROTECTED</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Roles & Access */}
            <Card className="border-primary/10 shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Users size={20} className="text-primary" />
                  </div>
                  Admin Roles & Access
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500">Manage team permissions and audit access.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="space-y-3">
                  {[
                    { name: 'Nasser Al-Khelaifi', role: 'Super Admin', email: 'nasser@sahli.co' },
                    { name: 'Khalid Jassim', role: 'Coordinator', email: 'khalid@sahli.co' }
                  ].map((admin, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-[1.25rem] border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{admin.name}</p>
                          <p className="text-[10px] font-medium text-slate-500">{admin.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-black uppercase px-3 py-1 rounded-full border-slate-200 bg-white text-slate-600">{admin.role}</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full h-12 text-[10px] font-black uppercase tracking-widest border-dashed border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-[0.99]">
                  Add New Team Member
                </Button>
              </CardContent>
            </Card>

            {/* Governance & Security Policies (Read-only for V1) */}
            <Card className="border-slate-100 shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-subtitle text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    <ShieldCheck size={20} className="text-emerald-600" />
                  </div>
                  Governance & Security Policies
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500">System-wide safety thresholds and security locks (V1 Core).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Security: OTP Lock</Label>
                      <Lock size={14} className="text-slate-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.OTP_LOCK_DURATION_HOURS}h</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Account lock duration after multiple failed OTP attempts.</p>
                  </div>

                  <div className="p-6 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Governance: Auto-Observe</Label>
                      <AlertTriangle size={14} className="text-amber-500" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.MAX_CONDUCT_FLAGS_FOR_OBSERVED}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Flags</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Threshold for automatically moving a provider to "Observed" status.</p>
                  </div>

                  <div className="p-6 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Governance: Pause Rec.</Label>
                      <Shield size={14} className="text-red-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.MAX_PRICING_DISPUTES_FOR_PAUSE_RECOMMENDATION}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disputes</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Threshold for triggering an administrative "Pause" recommendation.</p>
                  </div>

                  <div className="p-6 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Performance: Health</Label>
                      <Zap size={14} className="text-primary" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.MIN_RESPONSE_RATE_HEALTHY * 100}%</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Minimum response rate required for "Healthy" partner status.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-slate-100 text-slate-900 rounded-[2.5rem] shadow-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  <Shield size={16} />
                  Governance Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 space-y-3">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">LAST SYSTEM CHANGE</p>
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-tight text-slate-900">Protocol Updated</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Feb 04, 2026 • Nasser A.</p>
                </div>
                <Button variant="ghost" className="w-full h-12 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  View Full Audit Trail
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-100 hover:bg-slate-50 transition-all">
                  <Globe size={16} className="text-slate-400" /> System Defaults
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-12 text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-100 hover:bg-slate-50 transition-all">
                  <Bell size={16} className="text-slate-400" /> Notification Setup
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start gap-3 h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-red-50 text-red-600 border-none hover:bg-red-100 transition-all mt-4" 
                  onClick={() => {
                    localStorage.removeItem('admin_session');
                    window.location.href = '/admin/login';
                  }}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
