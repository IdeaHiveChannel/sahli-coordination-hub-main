import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShieldCheck } from 'lucide-react';
import { authService } from '@/lib/authService';

const Login = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { success, user } = await authService.login(email, password);
    
    setIsLoading(false);
    
    if (success && user) {
      toast.success('Logged in successfully');
      
      if (user.mustResetPassword) {
        toast.info('Please reset your password for security');
        navigate('/admin/password-reset', { state: { forced: true } });
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Layout hideFooter hideTrigger>
      <div className="container-sahli py-12 md:py-24 flex justify-center items-center min-h-[90vh] px-6" dir={dir}>
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Card className="border-none shadow-xl shadow-slate-200/60 rounded-[3rem] overflow-hidden bg-white relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
            
            <CardHeader className="space-y-6 text-center p-10 pb-6">
              <div className="mx-auto w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white mb-2 shadow-xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-display text-slate-900">Admin Portal</CardTitle>
                <CardDescription className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/60">
                  Secure Access • Coordination Hub
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-10 pt-4">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="admin@sahli.co" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-sm px-6 font-bold text-slate-900 placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between ml-1">
                      <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Password
                      </Label>
                      <a 
                        href="mailto:hello@sahliservice.com?subject=Admin%20Password%20Reset%20Request&body=Hello%2C%20I%20need%20to%20reset%20my%20admin%20password%20for%20the%20Sahli%20Coordination%20Hub."
                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot?
                      </a>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-sm px-6 font-bold text-slate-900"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.25em] text-[12px] rounded-[1.5rem] shadow-xl shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <p className="text-center mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            © 2026 Sahli Coordination Hub • Secure V2.4
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
