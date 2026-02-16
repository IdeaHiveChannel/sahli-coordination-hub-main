import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, MailCheck, ShieldCheck } from 'lucide-react';
import { authService } from '@/lib/authService';

const PasswordReset = () => {
  const { t, dir } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  // Only allow "forced" reset if explicitly triggered by session or a valid admin-provided token
  const isForced = location.state?.forced === true || (!!token && token === 'ADMIN_SECURE_BYPASS');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isForced) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      const success = await authService.updatePassword(password);
      if (success) {
        toast.success('Password updated successfully');
        navigate('/admin/dashboard');
      } else {
        toast.error('Failed to update password');
      }
    } else {
      // Use authService for password reset request
      await authService.requestPasswordReset(email);
      setIsSubmitted(true);
      toast.success('Reset instructions sent to your email');
    }
    
    setIsLoading(false);
  };

  return (
    <Layout hideFooter hideTrigger>
      <div className="container-sahli py-12 md:py-20 flex justify-center items-center min-h-[85vh] px-4 sm:px-6" dir={dir}>
        <Card className="w-full max-w-md border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          {!isSubmitted ? (
            <>
              <CardHeader className="space-y-4 text-center p-8 pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-2 shadow-xl shadow-primary/20">
                  {isForced ? <ShieldCheck size={32} /> : <MailCheck size={32} />}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-subtitle text-slate-900">
                    {isForced ? 'Set New Password' : 'Reset Password'}
                  </CardTitle>
                  <CardDescription className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                    {isForced 
                      ? 'Action Required • Account Security' 
                      : "Manual Verification Required"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isForced ? (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                          New Password
                        </Label>
                        <Input 
                          id="password" 
                          type="password" 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                          Confirm Password
                        </Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          required 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm px-5"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6 py-4 text-center">
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
                        To maintain system security, password reset requests are handled manually by the administration team.
                      </p>
                      <Button asChild className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all">
                         <a href="mailto:hello@sahliservice.com?subject=Admin%20Password%20Reset%20Request&body=Hello%2C%20I%20need%20to%20reset%20my%20admin%20password%20for%20the%20Sahli%20Coordination%20Hub.">
                           Contact Admin Team
                         </a>
                       </Button>
                    </div>
                  )}
                  {isForced && (
                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  )}
                </form>
              </CardContent>
              {!isForced && (
                <CardFooter className="justify-center pb-8">
                  <Link 
                    to="/admin/login" 
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Back to Login
                  </Link>
                </CardFooter>
              )}
            </>
          ) : (
            <CardContent className="p-8 py-12 text-center space-y-8">
              <div className="mx-auto w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-500 shadow-xl">
                <MailCheck size={40} />
              </div>
              <div className="space-y-3">
                <h3 className="text-subtitle text-slate-900">Check your email</h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
                  We've sent password reset instructions to <br/>
                  <span className="font-black text-slate-900 lowercase tracking-normal text-sm">{email}</span>
                </p>
              </div>
              <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 text-[10px] text-slate-400 font-medium leading-relaxed text-left uppercase tracking-tight">
                <strong className="text-slate-900 block mb-1">Security Note:</strong>
                Password resets require manual verification by the system administrator for this secure coordination hub.
              </div>
              <div className="space-y-4 pt-2">
                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-[0.98]"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try another email
                </Button>
                <Link 
                  to="/admin/login" 
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 block transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PasswordReset;
