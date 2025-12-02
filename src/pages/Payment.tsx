import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, CheckCircle, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EnrollmentData {
  id: string;
  course_id: string;
  status: string;
  amount_due: string;
  courses: {
    title: string;
    description: string;
    duration: string;
  };
}

const Payment = () => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    if (user && enrollmentId) {
      fetchEnrollment();
    }
  }, [user, authLoading, enrollmentId]);

  const fetchEnrollment = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          course_id,
          status,
          amount_due,
          courses (
            title,
            description,
            duration
          )
        `)
        .eq('id', enrollmentId)
        .eq('user_id', user?.id)
        .single();

      if (error || !data) {
        toast({
          title: 'خطا',
          description: 'ثبت‌نام یافت نشد',
          variant: 'destructive',
        });
        navigate('/courses');
        return;
      }

      setEnrollment(data as unknown as EnrollmentData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount?: string | null) => {
    if (!amount || amount === '0') return 'رایگان';
    const numeric = Number(amount);
    if (Number.isNaN(numeric)) return amount;
    return numeric.toLocaleString('fa-IR') + ' تومان';
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Update enrollment status to paid (simulated)
      const { error } = await supabase
        .from('enrollments')
        .update({
          payment_status: 'paid',
          paid_at: new Date().toISOString(),
          amount_paid: enrollment?.amount_due || '0',
          payment_notes: 'پرداخت آزمایشی موفق'
        } as any)
        .eq('id', enrollmentId);

      if (error) {
        toast({
          title: 'خطا در پرداخت',
          description: 'لطفاً دوباره تلاش کنید',
          variant: 'destructive',
        });
        setProcessing(false);
        return;
      }

      toast({
        title: 'پرداخت موفق!',
        description: 'دوره با موفقیت فعال شد. می‌توانید شروع به یادگیری کنید.',
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      setProcessing(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-24 px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-24 px-4 text-center">
          <p>ثبت‌نام یافت نشد</p>
          <Button onClick={() => navigate('/courses')} className="mt-4">
            بازگشت به دوره‌ها
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-page-in">
      <Header />
      
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            برگشت
          </Button>

          <Card className="border-primary/20">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">پرداخت و تکمیل ثبت‌نام</CardTitle>
              <CardDescription>
                لطفاً اطلاعات زیر را بررسی و پرداخت را تکمیل کنید
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Course Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{enrollment.courses.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{enrollment.courses.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{enrollment.courses.duration}</span>
                  </div>
                  <Badge variant="secondary">
                    {enrollment.status === 'active' ? 'فعال' : 'در انتظار پرداخت'}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Price Summary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">هزینه دوره</span>
                  <span className="font-medium">{formatPrice(enrollment.amount_due)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">تخفیف</span>
                  <span className="font-medium text-green-600">۰ تومان</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">مبلغ قابل پرداخت</span>
                  <span className="font-bold text-primary">{formatPrice(enrollment.amount_due)}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  <strong>توجه:</strong> این یک صفحه پرداخت آزمایشی است. با کلیک روی دکمه پرداخت، دوره به صورت خودکار فعال می‌شود.
                </p>
              </div>

              {/* Payment Features */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>دسترسی مادام‌العمر</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>پشتیبانی ۲۴/۷</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>گواهی تکمیل</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>به‌روزرسانی رایگان</span>
                </div>
              </div>

              {/* Pay Button */}
              <Button 
                onClick={handlePayment}
                disabled={processing}
                className="w-full text-white py-6 text-lg"
                style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    پرداخت و فعال‌سازی دوره
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
