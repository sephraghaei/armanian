import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, GraduationCap, ArrowLeft, Phone, Shield, User, Lock } from 'lucide-react';

const PHONE_REGEX = /^(\+98|0)?9\d{9}$/;

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotDialogOpen, setIsForgotDialogOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isResetSending, setIsResetSending] = useState(false);
  const { signUpWithCredentials, signInWithCredentials, requestPasswordReset, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string })?.from || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

  const formatPhoneNumber = (value: string) => {
    let formatted = value.trim().replace(/\s+/g, '');
    if (!formatted) return '';
    if (formatted.startsWith('+98')) {
      return formatted;
    }
    if (formatted.startsWith('0')) {
      return '+98' + formatted.substring(1);
    }
    if (formatted.startsWith('+')) {
      return formatted;
    }
    return '+98' + formatted;
  };

  const handleSubmit = async (e: React.FormEvent, isSignUpMode: boolean) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSignUp(isSignUpMode);

    // Validate required fields for signup
    if (isSignUpMode) {
      if (!firstName.trim()) {
        toast({
          variant: "destructive",
          title: "نام الزامی است",
          description: "لطفاً نام خود را وارد کنید",
        });
        setIsLoading(false);
        return;
      }
      if (!lastName.trim()) {
        toast({
          variant: "destructive",
          title: "نام خانوادگی الزامی است",
          description: "لطفاً نام خانوادگی خود را وارد کنید",
        });
        setIsLoading(false);
        return;
      }
      const strong = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!strong.test(password)) {
        toast({
          variant: "destructive",
          title: "رمز عبور ضعیف است",
          description: "حداقل ۸ کاراکتر، یک حرف بزرگ و یک عدد لازم است",
        });
        setIsLoading(false);
        return;
      }
    }

    // Validate phone number format
    if (!PHONE_REGEX.test(phone)) {
      toast({
        variant: "destructive",
        title: "شماره نادرست",
        description: "لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)",
      });
      setIsLoading(false);
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);

    try {
      const { error } = isSignUpMode 
        ? await signUpWithCredentials(formattedPhone, firstName, lastName, email.trim().toLowerCase(), password, redirectTo)
        : await signInWithCredentials(formattedPhone, password, redirectTo);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "خطا در احراز هویت",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی رخ داده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setShowOtpInput(false);
    setIsLoading(false);
  };

  const handleForgotPasswordClick = () => {
    setForgotEmail('');
    setIsForgotDialogOpen(true);
  };

  const handlePasswordReset = async () => {
    const emailRegex = /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(forgotEmail.trim().toLowerCase())) {
      toast({
        variant: 'destructive',
        title: 'ایمیل نادرست',
        description: 'لطفاً ایمیل معتبر وارد کنید',
      });
      return;
    }

    setIsResetSending(true);

    try {
      const { error, message } = await requestPasswordReset(forgotEmail.trim().toLowerCase());
      if (error) {
        toast({
          variant: 'destructive',
          title: 'خطا در ارسال لینک بازیابی',
          description: error.message,
        });
        return;
      }

      toast({
        variant: 'default',
        title: 'درخواست با موفقیت ثبت شد',
        description: message || 'اگر ایمیل در سیستم وجود داشته باشد، لینک بازیابی ارسال شد.',
      });
      setIsForgotDialogOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'مشکلی در ارتباط با سرور رخ داد.',
      });
    } finally {
      setIsResetSending(false);
    }
  };

  // OTP UI removed; directly render forms

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="absolute -top-12 left-0 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>بازگشت به خانه</span>
        </Link>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">آرمانیان</h1>
          </div>
          <p className="text-muted-foreground">به آکادمی آرمانیان خوش آمدید</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">ورود</TabsTrigger>
            <TabsTrigger value="signup">ثبت نام</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>ورود به حساب کاربری</CardTitle>
                <CardDescription>
                  شماره موبایل خود را وارد کنید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-phone">شماره موبایل</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-phone"
                        type="tel"
                        placeholder="09123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pr-10 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">رمز عبور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <div className="w-full text-right">
                    <button
                      type="button"
                      onClick={handleForgotPasswordClick}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </button>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    ورود
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>ایجاد حساب کاربری</CardTitle>
                <CardDescription>
                  اطلاعات زیر را برای ایجاد حساب کاربری وارد کنید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">نام</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="نام"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pr-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">نام خانوادگی</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="نام خانوادگی"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pr-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">شماره موبایل</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="09123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pr-10 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">ایمیل</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">رمز عبور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="حداقل ۸ کاراکتر، یک حرف بزرگ و یک عدد"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pr-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">رمز باید حداقل ۸ کاراکتر، شامل یک حرف بزرگ و یک عدد باشد.</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    ثبت نام
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Dialog
          open={isForgotDialogOpen}
          onOpenChange={(open) => {
            setIsForgotDialogOpen(open);
            if (!open) {
              setIsResetSending(false);
            }
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>بازیابی رمز عبور</DialogTitle>
              <DialogDescription>
                ایمیلی را که با آن ثبت‌نام کرده‌اید وارد کنید تا لینک بازیابی برای شما ارسال شود.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">ایمیل</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="example@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  disabled={isResetSending}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                اگر ایمیل شما در سیستم ثبت شده باشد، لینک بازیابی ظرف چند دقیقه ارسال خواهد شد.
              </p>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsForgotDialogOpen(false)}
                disabled={isResetSending}
              >
                انصراف
              </Button>
              <Button type="button" onClick={handlePasswordReset} disabled={isResetSending}>
                {isResetSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                ارسال کد بازیابی
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Auth;
