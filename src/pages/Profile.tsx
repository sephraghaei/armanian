import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Clock, Plus } from 'lucide-react';
import { Navigate } from 'react-router-dom';

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
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [displayName, setDisplayName] = useState('');
  const [profileLoading, setProfileLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchEnrollments();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || '');
      }
    } finally {
      setProfileLoading(false);
    }
  };

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

      fetchProfile();
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

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">پروفایل کاربری</h1>
            <p className="text-muted-foreground mt-2">مدیریت اطلاعات شخصی و دوره‌های خود</p>
          </div>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                اطلاعات شخصی
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
              <Button 
                onClick={updateProfile} 
                disabled={updating}
                className="w-full md:w-auto"
              >
                {updating ? 'در حال به‌روزرسانی...' : 'به‌روزرسانی پروفایل'}
              </Button>
            </CardContent>
          </Card>

          {/* Enrollments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                دوره‌های ثبت نام شده
              </CardTitle>
            </CardHeader>
            <CardContent>
              {enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">هنوز در هیچ دوره‌ای ثبت نام نکرده‌اید</p>
                  <Button onClick={() => window.location.href = '/courses'}>
                    <Plus className="w-4 h-4 mr-2" />
                    مشاهده دوره‌ها
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام دوره</TableHead>
                      <TableHead>تاریخ ثبت نام</TableHead>
                      <TableHead>مدت زمان باقی‌مانده</TableHead>
                      <TableHead>وضعیت</TableHead>
                      <TableHead>عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment) => {
                      const daysRemaining = getDaysRemaining(enrollment.expires_at);
                      return (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">
                            {enrollment.courses.title}
                          </TableCell>
                          <TableCell>
                            {new Date(enrollment.enrolled_at).toLocaleDateString('fa-IR')}
                          </TableCell>
                          <TableCell>
                            {daysRemaining > 0 ? `${daysRemaining} روز` : 'منقضی شده'}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(enrollment.status, daysRemaining)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
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
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;