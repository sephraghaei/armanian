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
  const { signUp, signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
        ? await signUp(formattedPhone, password, firstName, lastName)
        : await signIn(formattedPhone, password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "خطا در احراز هویت",
          description: error.message,
        });
      } else {
        toast({
          title: isSignUpMode ? "ثبت نام موفق" : "ورود موفق",
          description: isSignUpMode ? "حساب شما با موفقیت ایجاد شد" : "خوش آمدید",
        });
        navigate('/');
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
    setOtp('');
    setIsLoading(false);
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    ورود
                  </Button>
                  <div className="text-center text-sm">
                    <Link to="/reset-password" className="text-primary hover:underline">
                      فراموشی رمز عبور
                    </Link>
                  </div>
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
      </div>
    </div>
  );
};

export default Auth;
