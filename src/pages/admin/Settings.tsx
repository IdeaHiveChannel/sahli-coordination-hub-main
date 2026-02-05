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
      <div className="py-2" dir={dir}>
        <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">SYSTEM CORE</Badge>
              <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-bold text-[10px]">V1.0.4</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Control Center</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage admin roles, coordination protocols, and system-wide security rules.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-bold h-9 shadow-sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Settings2 size={16} className="mr-2" />
              {isSaving ? 'Saving Changes...' : 'Save Settings'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Coordination Protocols */}
            <Card className="border-primary/10 shadow-sm overflow-hidden">
              <div className="h-1 bg-primary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap size={20} className="text-primary" />
                  Coordination Protocols
                </CardTitle>
                <CardDescription>Define how SAHLI handles provider responses and assignments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      First Valid YES Wins
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[8px] h-4">ACTIVE</Badge>
                    </Label>
                    <p className="text-xs text-muted-foreground">Automatically award eligibility to the first provider who replies "YES".</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Follow-up Delay (Hours)</Label>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" />
                      <Input type="number" defaultValue={24} className="h-9" />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Wait time before triggering post-service WhatsApp follow-up.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Broadcast Expiry (Minutes)</Label>
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-slate-400" />
                      <Input type="number" defaultValue={60} className="h-9" />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Time before a broadcast is marked as 'No Response'.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t border-slate-100 py-3">
                <Button size="sm" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Update Protocols'}
                </Button>
              </CardFooter>
            </Card>

            {/* Admin Roles & Access */}
            <Card className="border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  Admin Roles & Access
                </CardTitle>
                <CardDescription>Manage team permissions and audit access.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { name: 'Nasser Al-Khelaifi', role: 'Super Admin', email: 'nasser@sahli.co' },
                    { name: 'Khalid Jassim', role: 'Coordinator', email: 'khalid@sahli.co' }
                  ].map((admin, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{admin.name}</p>
                          <p className="text-[10px] text-muted-foreground">{admin.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold">{admin.role}</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full h-9 text-[10px] font-black uppercase tracking-widest border-dashed">
                  Add New Team Member
                </Button>
              </CardContent>
            </Card>

            {/* Governance & Security Policies (Read-only for V1) */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-600" />
                  Governance & Security Policies
                </CardTitle>
                <CardDescription>System-wide safety thresholds and security locks (V1 Core).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Security: OTP Lock</Label>
                      <Lock size={12} className="text-slate-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.OTP_LOCK_DURATION_HOURS}h</span>
                      <span className="text-[10px] font-bold text-slate-400">Duration</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 italic">Account lock duration after multiple failed OTP attempts.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Governance: Auto-Observe</Label>
                      <AlertTriangle size={12} className="text-amber-500" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.MAX_CONDUCT_FLAGS_FOR_OBSERVED}</span>
                      <span className="text-[10px] font-bold text-slate-400">Flags</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 italic">Threshold for automatically moving a provider to "Observed" status.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Governance: Pause Recommendation</Label>
                      <Shield size={12} className="text-red-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.MAX_PRICING_DISPUTES_FOR_PAUSE_RECOMMENDATION}</span>
                      <span className="text-[10px] font-bold text-slate-400">Disputes</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 italic">Threshold for triggering an administrative "Pause" recommendation.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Performance: Response Health</Label>
                      <Zap size={12} className="text-primary" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{GOVERNANCE_THRESHOLDS.MIN_RESPONSE_RATE_HEALTHY * 100}%</span>
                      <span className="text-[10px] font-bold text-slate-400">Rate</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 italic">Minimum response rate required for "Healthy" partner status.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-950 border-primary/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                  <Shield size={16} />
                  Governance Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                  <p className="text-[10px] text-slate-400">LAST SYSTEM CHANGE</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-xs font-medium">Protocol Updated</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Feb 04, 2026 • Nasser A.</p>
                </div>
                <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">
                  View Full Audit Trail
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-600">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 h-10 text-xs">
                  <Globe size={14} /> System Defaults
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-10 text-xs">
                  <Bell size={14} /> Notification Setup
                </Button>
                <Button variant="destructive" className="w-full justify-start gap-2 h-10 text-xs" onClick={() => {
                  localStorage.removeItem('admin_session');
                  window.location.href = '/admin/login';
                }}>
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
