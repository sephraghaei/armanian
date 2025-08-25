import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, GraduationCap, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signUp, signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, displayName);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            variant: "destructive",
            title: "حساب کاربری موجود است",
            description: "این ایمیل قبلاً ثبت شده است. لطفاً وارد شوید.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "خطا در ثبت نام",
            description: error.message,
          });
        }
      } else {
        toast({
          title: "ثبت نام موفقیت‌آمیز",
          description: "حساب کاربری شما با موفقیت ایجاد شد.",
        });
        // Clear form
        setEmail('');
        setPassword('');
        setDisplayName('');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ثبت نام رخ داده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: "اطلاعات نادرست",
            description: "ایمیل یا رمز عبور اشتباه است.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "خطا در ورود",
            description: error.message,
          });
        }
      } else {
        toast({
          title: "ورود موفقیت‌آمیز",
          description: "به آرمانیان خوش آمدید!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ورود رخ داده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                  برای دسترسی به دوره‌ها و امکانات وارد شوید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">ایمیل</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">رمز عبور</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
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
                  برای شروع یادگیری حساب کاربری ایجاد کنید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">نام نمایشی</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">ایمیل</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">رمز عبور</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="حداقل 6 کاراکتر"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
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