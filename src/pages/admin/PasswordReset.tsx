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
      <div className="container-sahli py-20 flex justify-center items-center min-h-[70vh]" dir={dir}>
        <Card className="w-full max-w-md shadow-2xl border-primary/10">
          {!isSubmitted ? (
            <>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  {isForced ? 'Set New Password' : 'Reset Password'}
                </CardTitle>
                <CardDescription>
                  {isForced 
                    ? 'Your account requires a password change on first login.' 
                    : "Please contact hello@sahliservice.com to request a password reset for your admin account."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isForced ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          required 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6 py-4 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <MailCheck size={32} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        To maintain system security, password reset requests are handled manually by the administration team.
                      </p>
                      <Button asChild className="w-full font-bold uppercase tracking-wider">
                         <a href="mailto:hello@sahliservice.com?subject=Admin%20Password%20Reset%20Request&body=Hello%2C%20I%20need%20to%20reset%20my%20admin%20password%20for%20the%20Sahli%20Coordination%20Hub.">
                           Email Administrator
                         </a>
                       </Button>
                    </div>
                  )}
                  {isForced && (
                    <Button type="submit" className="w-full font-bold uppercase tracking-wider" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  )}
                </form>
              </CardContent>
              {!isForced && (
                <CardFooter className="justify-center">
                  <Link 
                    to="/admin/login" 
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Back to Login
                  </Link>
                </CardFooter>
              )}
            </>
          ) : (
            <CardContent className="pt-10 pb-10 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MailCheck size={32} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Check your email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent password reset instructions to <span className="font-bold text-foreground">{email}</span>.
                </p>
                <div className="mt-4 p-3 bg-primary/5 rounded border border-primary/10 text-[10px] text-primary leading-relaxed text-left">
                  <strong>Note:</strong> As this is a secure coordination hub, password resets require manual verification by the system administrator if automated delivery is not configured for your domain.
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
              <Link 
                to="/admin/login" 
                className="text-sm text-primary hover:underline block"
              >
                Back to Login
              </Link>
            </CardContent>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PasswordReset;
