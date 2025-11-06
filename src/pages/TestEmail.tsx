import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function TestEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testPasswordReset = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('password-reset', {
        body: { email }
      });
      
      console.log('Password Reset Response:', { data, error });
      setResult({ data, error, success: !error });
    } catch (e: any) {
      console.error('Password Reset Error:', e);
      setResult({ error: e.message, success: false });
    }
    
    setLoading(false);
  };

  const testSendEmail = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: email,
          subject: 'Test Email',
          html: '<h1>این یک ایمیل تست است</h1>',
          type: 'welcome'
        }
      });
      
      console.log('Send Email Response:', { data, error });
      setResult({ data, error, success: !error });
    } catch (e: any) {
      console.error('Send Email Error:', e);
      setResult({ error: e.message, success: false });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>تست ارسال ایمیل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              ایمیل
            </label>
            <Input
              id="email"
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className="text-right"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={testPasswordReset} disabled={loading || !email}>
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              تست بازیابی رمز
            </Button>
            
            <Button onClick={testSendEmail} disabled={loading || !email} variant="secondary">
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              تست ارسال مستقیم
            </Button>
          </div>

          {result && (
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <h3 className="font-bold mb-2">نتیجه:</h3>
              <pre className="text-xs overflow-auto" dir="ltr">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>نکات مهم:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>مطمئن شوید RESEND_API_KEY در Supabase تنظیم شده</li>
              <li>دامنه ایمیل باید در Resend تایید شده باشد</li>
              <li>لاگ‌های edge function رو در کنسول مرورگر چک کنید</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
