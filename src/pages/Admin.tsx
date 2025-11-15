import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2, ArrowRight, Users, BookOpen, Calendar, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  features: string[];
  learning_outcomes: string[];
  department_id?: number;
  is_popular?: boolean;
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  expires_at: string;
  status: string;
  courses: {
    title: string;
  };
  users_app: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'courses' | 'enrollments'>('courses');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    features: '',
    learning_outcomes: '',
    department_id: '',
    is_popular: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [user, isAdmin]);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در بارگذاری دوره‌ها',
      });
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  const fetchEnrollments = async () => {
    try {
      // Fetch enrollments first
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (enrollmentError) throw enrollmentError;

      // Then fetch related data separately
      const enrichedEnrollments = await Promise.all(
        (enrollmentData || []).map(async (enrollment) => {
          const [courseResult, userResult] = await Promise.all([
            supabase.from('courses').select('title').eq('id', enrollment.course_id).single(),
            supabase.from('users_app').select('first_name, last_name, phone').eq('id', enrollment.user_id).single()
          ]);

          return {
            ...enrollment,
            courses: courseResult.data || { title: 'Unknown' },
            users_app: userResult.data || { first_name: '', last_name: '', phone: '' }
          };
        })
      );

      setEnrollments(enrichedEnrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در بارگذاری ثبت‌نام‌ها',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseData = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      level: formData.level,
      features: formData.features.split('\n').filter(f => f.trim()),
      learning_outcomes: formData.learning_outcomes.split('\n').filter(l => l.trim()),
      department_id: formData.department_id ? parseInt(formData.department_id) : null,
      is_popular: formData.is_popular,
    };

    if (editingCourse) {
      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', editingCourse.id);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'خطا',
          description: 'خطا در ویرایش دوره',
        });
      } else {
        toast({ title: 'موفق', description: 'دوره با موفقیت ویرایش شد' });
        resetForm();
        fetchCourses();
      }
    } else {
      const { error } = await supabase
        .from('courses')
        .insert([courseData]);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'خطا',
          description: 'خطا در ایجاد دوره',
        });
      } else {
        toast({ title: 'موفق', description: 'دوره با موفقیت ایجاد شد' });
        resetForm();
        fetchCourses();
      }
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description || '',
      duration: course.duration || '',
      level: course.level || '',
      features: (course.features || []).join('\n'),
      learning_outcomes: (course.learning_outcomes || []).join('\n'),
      department_id: course.department_id?.toString() || '',
      is_popular: course.is_popular || false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این دوره را حذف کنید؟')) return;

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در حذف دوره',
      });
    } else {
      toast({ title: 'موفق', description: 'دوره با موفقیت حذف شد' });
      fetchCourses();
    }
  };

  const resetForm = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      level: '',
      features: '',
      learning_outcomes: '',
      department_id: '',
      is_popular: false,
    });
  };

  const deleteEnrollment = async (enrollmentId: string) => {
    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('id', enrollmentId);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در حذف ثبت‌نام',
      });
    } else {
      toast({ title: 'موفق', description: 'ثبت‌نام با موفقیت حذف شد' });
      fetchEnrollments();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
            <ArrowRight className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8">پنل مدیریت</h1>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'courses' | 'enrollments')} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              مدیریت دوره‌ها
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="gap-2">
              <Users className="h-4 w-4" />
              ثبت‌نام‌ها
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingCourse ? 'ویرایش دوره' : 'ایجاد دوره جدید'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">عنوان دوره</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">توضیحات</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">مدت زمان</label>
                        <Input
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="12 هفته"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">سطح</label>
                        <Input
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                          placeholder="مقدماتی"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">ویژگی‌ها (هر خط یک مورد)</label>
                      <Textarea
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        rows={4}
                        placeholder="ویژگی اول&#10;ویژگی دوم"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">نتایج یادگیری (هر خط یک مورد)</label>
                      <Textarea
                        value={formData.learning_outcomes}
                        onChange={(e) => setFormData({ ...formData, learning_outcomes: e.target.value })}
                        rows={4}
                        placeholder="نتیجه اول&#10;نتیجه دوم"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="is_popular"
                        checked={formData.is_popular}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked as boolean })}
                      />
                      <label htmlFor="is_popular" className="text-sm font-medium cursor-pointer">
                        دوره محبوب
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingCourse ? <Edit className="ml-2 h-4 w-4" /> : <Plus className="ml-2 h-4 w-4" />}
                        {editingCourse ? 'ویرایش' : 'ایجاد'}
                      </Button>
                      {editingCourse && (
                        <Button type="button" variant="outline" onClick={resetForm}>
                          انصراف
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">دوره‌های موجود ({courses.length})</h2>
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span>⏱️ {course.duration}</span>
                        <span>📊 {course.level}</span>
                        {course.is_popular && <span>⭐ محبوب</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  ثبت‌نام‌های کاربران ({enrollments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام کاربر</TableHead>
                      <TableHead>شماره تماس</TableHead>
                      <TableHead>نام دوره</TableHead>
                      <TableHead>تاریخ ثبت‌نام</TableHead>
                      <TableHead>تاریخ انقضا</TableHead>
                      <TableHead>وضعیت</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          هنوز ثبت‌نامی وجود ندارد
                        </TableCell>
                      </TableRow>
                    ) : (
                      enrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">
                            {enrollment.users_app.first_name} {enrollment.users_app.last_name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {enrollment.users_app.phone}
                            </div>
                          </TableCell>
                          <TableCell>{enrollment.courses.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {new Date(enrollment.enrolled_at).toLocaleDateString('fa-IR')}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(enrollment.expires_at).toLocaleDateString('fa-IR')}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              enrollment.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}>
                              {enrollment.status === 'active' ? 'فعال' : 'غیرفعال'}
                            </span>
                          </TableCell>
                          <TableCell className="text-left">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteEnrollment(enrollment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
