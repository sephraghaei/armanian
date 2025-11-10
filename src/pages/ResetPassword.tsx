import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // فعلاً این قابلیت غیرفعال است
    toast({
      variant: 'destructive',
      title: 'خطا',
      description: 'این قابلیت فعلاً در دسترس نیست. لطفاً با پشتیبانی تماس بگیرید.',
    });
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>بازیابی رمز عبور</CardTitle>
          <CardDescription>
            شماره تلفن خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="شماره تلفن"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ارسال لینک بازیابی
            </Button>
            <div className="text-center">
              <Link to="/auth" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                <ArrowRight className="h-4 w-4" />
                بازگشت به صفحه ورود
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
