import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, GraduationCap, ArrowLeft, Phone, Shield, User, Lock } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signUpWithPhone, signInWithPhone, verifyOtp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSendOtp = async (e: React.FormEvent, isSignUpMode: boolean) => {
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
      if (!password.trim() || password.length < 6) {
        toast({
          variant: "destructive",
          title: "رمز عبور نامعتبر",
          description: "رمز عبور باید حداقل 6 کاراکتر باشد",
        });
        setIsLoading(false);
        return;
      }
    }

    // Validate phone number format
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        variant: "destructive",
        title: "شماره نادرست",
        description: "لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)",
      });
      setIsLoading(false);
      return;
    }

    // Format phone number to international format
    let formattedPhone = phone;
    if (phone.startsWith('0')) {
      formattedPhone = '+98' + phone.substring(1);
    } else if (!phone.startsWith('+98')) {
      formattedPhone = '+98' + phone;
    }

    try {
      const { error } = isSignUpMode 
        ? await signUpWithPhone(formattedPhone, firstName, lastName, password)
        : await signInWithPhone(formattedPhone);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "خطا در ارسال کد",
          description: error.message,
        });
      } else {
        setShowOtpInput(true);
        toast({
          title: "کد تایید ارسال شد",
          description: "کد تایید به شماره موبایل شما ارسال شد.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ارسال کد رخ داده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Format phone number to international format
    let formattedPhone = phone;
    if (phone.startsWith('0')) {
      formattedPhone = '+98' + phone.substring(1);
    } else if (!phone.startsWith('+98')) {
      formattedPhone = '+98' + phone;
    }

    try {
      const { error } = await verifyOtp(formattedPhone, otp);
      
      if (error) {
        if (error.message.includes('Invalid token')) {
          toast({
            variant: "destructive",
            title: "کد نادرست",
            description: "کد تایید وارد شده نادرست است.",
          });
        } else if (error.message.includes('expired')) {
          toast({
            variant: "destructive",
            title: "کد منقضی شده",
            description: "کد تایید منقضی شده است. لطفاً دوباره تلاش کنید.",
          });
          setShowOtpInput(false);
        } else {
          toast({
            variant: "destructive",
            title: "خطا در تایید",
            description: error.message,
          });
        }
      } else {
        toast({
          title: isSignUp ? "ثبت نام موفقیت‌آمیز" : "ورود موفقیت‌آمیز",
          description: "به آرمانیان خوش آمدید!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در تایید کد رخ داده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setShowOtpInput(false);
    setOtp('');
    setIsLoading(false);
  };

  if (showOtpInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={resetForm}
            className="absolute -top-12 left-0 flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            بازگشت
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">تایید شماره</h1>
            </div>
            <p className="text-muted-foreground">کد تایید ارسال شده به {phone} را وارد کنید</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>کد تایید</CardTitle>
              <CardDescription>
                کد 6 رقمی ارسال شده را وارد کنید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">کد تایید</Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    disabled={isLoading}
                    className="text-center text-lg tracking-widest"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  تایید کد
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleSendOtp({ preventDefault: () => {} } as any, isSignUp)}
                  disabled={isLoading}
                >
                  ارسال مجدد کد
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                <form onSubmit={(e) => handleSendOtp(e, false)} className="space-y-4">
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
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    ارسال کد تایید
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
                <form onSubmit={(e) => handleSendOtp(e, true)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                        className="pr-10"
                      />
                    </div>
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
      </div>
    </div>
  );
};

export default Auth;
