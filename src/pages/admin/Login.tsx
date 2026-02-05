import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
      <div className="container-sahli py-20 flex justify-center items-center min-h-[70vh]" dir={dir}>
        <Card className="w-full max-w-md shadow-2xl border-primary/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Admin Portal</CardTitle>
            <CardDescription>
              Enter your credentials to access the coordination hub
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@sahli.co" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="mailto:hello@sahliservice.com?subject=Admin Password Reset Request&body=Hello, I need to reset my admin password for the Sahli Coordination Hub."
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full font-bold uppercase tracking-wider"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            {import.meta.env.PROD && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">Login Help</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  If you haven't set your own secrets yet, use the default credentials below and change them in <strong>Settings</strong> after logging in.
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-muted-foreground">Email: <span className="text-foreground font-mono">admin@sahli.co</span></p>
                  <p className="text-xs text-muted-foreground">Password: <span className="text-foreground font-mono">SahliAdmin2026</span></p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
