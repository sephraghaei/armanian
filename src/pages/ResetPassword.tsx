import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { resetPassword, updatePassword } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await resetPassword(email);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: error.message || 'خطا در ارسال ایمیل',
      });
    } else {
      toast({
        title: 'موفق',
        description: 'لینک بازیابی به ایمیل شما ارسال شد',
      });
      setEmail('');
    }
    
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'رمز عبور و تکرار آن یکسان نیستند',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'رمز عبور باید حداقل ۸ کاراکتر باشد',
      });
      return;
    }

    setLoading(true);

    const { error } = await updatePassword(token!, newPassword);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: error.message || 'خطا در تغییر رمز عبور',
      });
    } else {
      toast({
        title: 'موفق',
        description: 'رمز عبور شما با موفقیت تغییر کرد',
      });
      setTimeout(() => navigate('/auth'), 1500);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowRight className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </Link>
          <CardTitle className="text-2xl">بازیابی رمز عبور</CardTitle>
          <CardDescription>
            {token ? 'رمز عبور جدید خود را وارد کنید' : 'ایمیل خود را وارد کنید'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!token ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  ایمیل
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  dir="ltr"
                  className="text-right"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                ارسال لینک بازیابی
              </Button>

              <div className="text-center text-sm">
                <Link to="/auth" className="text-primary hover:underline">
                  بازگشت به صفحه ورود
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">
                  رمز عبور جدید
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="حداقل ۸ کاراکتر"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  dir="ltr"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  تکرار رمز عبور
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="تکرار رمز عبور جدید"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  dir="ltr"
                  className="text-right"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                تغییر رمز عبور
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
