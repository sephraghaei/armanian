import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Clock, Plus, ArrowLeft, User, Phone, Calendar, BookOpen, Trophy, Settings, Edit, LogOut, Star } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface Enrollment {
  id: string;
  course_id: string;
  enrolled_at: string;
  expires_at: string;
  status: string;
  courses: {
    title: string;
    description: string;
    duration: string;
  };
}

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const { profile: userProfile, loading: profileLoading } = useUserProfile(user);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [displayName, setDisplayName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.display_name || '');
    }
  }, [userProfile]);

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            title,
            description,
            duration
          )
        `)
        .eq('user_id', user?.id)
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('Error fetching enrollments:', error);
        return;
      }

      setEnrollments(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateProfile = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('user_id', user?.id);

      if (error) {
        toast({
          title: 'خطا',
          description: 'خطا در به‌روزرسانی پروفایل',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'موفق',
        description: 'پروفایل با موفقیت به‌روزرسانی شد',
      });
    } finally {
      setUpdating(false);
    }
  };

  const removeEnrollment = async (enrollmentId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', enrollmentId);

      if (error) {
        toast({
          title: 'خطا',
          description: 'خطا در حذف دوره',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'موفق',
        description: 'دوره با موفقیت حذف شد',
      });

      fetchEnrollments();
    } catch (error) {
      console.error('Error removing enrollment:', error);
    }
  };

  const extendEnrollment = async (enrollmentId: string) => {
    try {
      const newExpiryDate = new Date();
      newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);

      const { error } = await supabase
        .from('enrollments')
        .update({ 
          expires_at: newExpiryDate.toISOString(),
          status: 'active'
        })
        .eq('id', enrollmentId);

      if (error) {
        toast({
          title: 'خطا',
          description: 'خطا در تمدید دوره',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'موفق',
        description: 'دوره با موفقیت تمدید شد',
      });

      fetchEnrollments();
    } catch (error) {
      console.error('Error extending enrollment:', error);
    }
  };

  const getDaysRemaining = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string, daysRemaining: number) => {
    if (status === 'cancelled') {
      return <Badge variant="secondary">لغو شده</Badge>;
    }
    if (daysRemaining < 0) {
      return <Badge variant="destructive">منقضی شده</Badge>;
    }
    if (daysRemaining <= 7) {
      return <Badge variant="secondary">در حال اتمام</Badge>;
    }
    return <Badge variant="default">فعال</Badge>;
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'کا';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background animate-page-in">
        <Header />
        <div className="container mx-auto py-24 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">در حال بارگذاری...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background animate-page-in">
      <Header />
      
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            برگشت
          </Button>

          {/* Profile Header */}
          <div className="bg-gradient-hero rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src={userProfile?.avatar_url || undefined} />
                <AvatarFallback className="text-2xl font-bold bg-white/10 text-white">
                  {getInitials(userProfile?.first_name, userProfile?.last_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-right flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {userProfile?.display_name || `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`}
                </h1>
                <p className="text-muted-foreground mb-4">
                  عضو آکادمی ارمانیان
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    عضو از مهر ۱۴۰۳
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {enrollments.length} دوره فعال
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/10 border-white/20 text-foreground hover:bg-white/20"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  ویرایش پروفایل
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  خروج از حساب
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Profile Stats */}
            <div className="space-y-6">
              {/* Profile Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    آمار شما
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm">دوره‌های فعال</span>
                    </div>
                    <Badge variant="default">{enrollments.filter(e => e.status === 'active').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">دوره‌های تکمیل شده</span>
                    </div>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">ساعت مطالعه</span>
                    </div>
                    <Badge variant="outline">۰ ساعت</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    عملیات سریع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/courses')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    ثبت نام در دوره جدید
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/departments')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    مشاهده تمام رشته‌ها
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Edit Profile Form */}
              {isEditing && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      ویرایش اطلاعات شخصی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">نام نمایشی</Label>
                        <Input
                          id="displayName"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="نام خود را وارد کنید"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">شماره تلفن</Label>
                        <Input
                          id="phone"
                          value={user?.phone || 'نامشخص'}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={updateProfile} 
                        disabled={updating}
                        className="text-white"
                        style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}
                      >
                        {updating ? 'در حال به‌روزرسانی...' : 'ذخیره تغییرات'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        لغو
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Enrollments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    دوره‌های ثبت نام شده
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {enrollments.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">هنوز دوره‌ای ندارید</h3>
                      <p className="text-muted-foreground mb-6">
                        با ثبت نام در دوره‌های آموزشی، مسیر یادگیری خود را شروع کنید
                      </p>
                      <Button 
                        onClick={() => navigate('/courses')}
                        className="text-white"
                        style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        مشاهده دوره‌ها
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enrollments.map((enrollment) => {
                        const daysRemaining = getDaysRemaining(enrollment.expires_at);
                        return (
                          <Card key={enrollment.id} className="border-orange-300/70">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-2">
                                    {enrollment.courses.title}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-3">
                                    {enrollment.courses.description}
                                  </p>
                                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      ثبت نام: {new Date(enrollment.enrolled_at).toLocaleDateString('fa-IR')}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      مدت: {enrollment.courses.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Trophy className="w-4 h-4" />
                                      {daysRemaining > 0 ? `${daysRemaining} روز باقی‌مانده` : 'منقضی شده'}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 md:items-end">
                                  {getStatusBadge(enrollment.status, daysRemaining)}
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => extendEnrollment(enrollment.id)}
                                    >
                                      تمدید
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>حذف دوره</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            آیا مطمئن هستید که می‌خواهید این دوره را حذف کنید؟ این عمل قابل بازگشت نیست.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>لغو</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => removeEnrollment(enrollment.id)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                          >
                                            حذف
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;