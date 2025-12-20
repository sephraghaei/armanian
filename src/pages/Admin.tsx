import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2, ArrowRight, Users, BookOpen, Calendar, Phone, FileText, Eye, EyeOff, UploadCloud, Image as ImageIcon, Video, Wand2, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  category: string;
  tags: string[];
  published_at: string | null;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [departmentForm, setDepartmentForm] = useState({ name: '', description: '', icon: '', slug: '' });
  const [editingDepartment, setEditingDepartment] = useState<any | null>(null);
  const [mediaList, setMediaList] = useState<{ name: string; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [siteContent, setSiteContent] = useState<Record<string, string>>({});
  const [savingContent, setSavingContent] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'courses' | 'enrollments' | 'posts' | 'departments' | 'media' | 'content'>('courses');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
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
  const [postFormData, setPostFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    status: 'draft' as 'draft' | 'published',
    category: '',
    tags: '',
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
      fetchPosts();
      fetchDepartments();
      fetchMedia();
      fetchSiteContent();
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
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (enrollmentError) throw enrollmentError;

      const enrichedEnrollments = await Promise.all(
        (enrollmentData || []).map(async (enrollment) => {
          const [courseResult, userResult] = await Promise.all([
            supabase.from('courses').select('title').eq('id', enrollment.course_id).maybeSingle(),
            supabase.from('users_app').select('first_name, last_name, phone').eq('id', enrollment.user_id).maybeSingle()
          ]);

          return {
            ...enrollment,
            courses: courseResult.data || { title: 'نامشخص' },
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

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts((data || []) as Post[]);
    }
  };

  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching departments:', error);
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در بارگذاری دپارتمان‌ها',
      });
    } else {
      setDepartments(data || []);
    }
  };

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase.storage.from('media').list('', { limit: 100 });
      if (error) {
        console.error('Storage list error:', error);
        return;
      }
      const mapped = (data || []).map((item) => {
        const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(item.name);
        return { name: item.name, url: publicUrl.publicUrl };
      });
      setMediaList(mapped);
    } catch (err) {
      console.error('Error fetching media:', err);
    }
  };

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase.from('site_content').select('key, value');
      if (error) {
        console.error('Error fetching site content:', error);
        return;
      }
      const map: Record<string, string> = {};
      (data || []).forEach((row: any) => { map[row.key] = row.value; });
      setSiteContent(map);
    } catch (err) {
      console.error('Error fetching site content:', err);
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

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = postFormData.slug || postFormData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0600-\u06FF-]/g, '');
    
    const postData = {
      title: postFormData.title,
      slug,
      content: postFormData.content,
      excerpt: postFormData.excerpt,
      featured_image: postFormData.featured_image,
      status: postFormData.status,
      category: postFormData.category,
      tags: postFormData.tags.split(',').map(t => t.trim()).filter(Boolean),
      published_at: postFormData.status === 'published' ? new Date().toISOString() : null,
    };

    if (editingPost) {
      const { error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', editingPost.id);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'خطا',
          description: 'خطا در ویرایش مطلب',
        });
      } else {
        toast({ title: 'موفق', description: 'مطلب با موفقیت ویرایش شد' });
        resetPostForm();
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from('posts')
        .insert([postData]);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'خطا',
          description: error.message.includes('duplicate') ? 'این slug قبلاً استفاده شده است' : 'خطا در ایجاد مطلب',
        });
      } else {
        toast({ title: 'موفق', description: 'مطلب با موفقیت ایجاد شد' });
        resetPostForm();
        fetchPosts();
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

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setPostFormData({
      title: post.title,
      slug: post.slug,
      content: post.content || '',
      excerpt: post.excerpt || '',
      featured_image: post.featured_image || '',
      status: post.status,
      category: post.category || '',
      tags: (post.tags || []).join(', '),
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

  const handleDeletePost = async (id: string) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این مطلب را حذف کنید؟')) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در حذف مطلب',
      });
    } else {
      toast({ title: 'موفق', description: 'مطلب با موفقیت حذف شد' });
      fetchPosts();
    }
  };

  const handleDepartmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: departmentForm.name,
      description: departmentForm.description,
      icon: departmentForm.icon || null,
      slug: departmentForm.slug || departmentForm.name?.trim().toLowerCase().replace(/\s+/g, '-'),
    };

    const query = editingDepartment
      ? supabase.from('departments').update(payload).eq('id', editingDepartment.id)
      : supabase.from('departments').insert([payload]);

    const { error } = await query;
    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در ذخیره دپارتمان',
      });
    } else {
      toast({ title: 'موفق', description: 'دپارتمان با موفقیت ذخیره شد' });
      setDepartmentForm({ name: '', description: '', icon: '', slug: '' });
      setEditingDepartment(null);
      fetchDepartments();
    }
  };

  const handleDepartmentDelete = async (id: number) => {
    if (!confirm('دپارتمان حذف شود؟')) return;
    const { error } = await supabase.from('departments').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'خطا', description: 'حذف دپارتمان ناموفق بود' });
    } else {
      toast({ title: 'موفق', description: 'دپارتمان حذف شد' });
      fetchDepartments();
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('media').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        toast({ variant: 'destructive', title: 'خطا', description: 'آپلود فایل ناموفق بود' });
      } else {
        toast({ title: 'موفق', description: 'فایل با موفقیت آپلود شد' });
        fetchMedia();
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast({ variant: 'destructive', title: 'خطا', description: 'آپلود فایل ناموفق بود' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDeleteMedia = async (name: string) => {
    const { error } = await supabase.storage.from('media').remove([name]);
    if (error) {
      toast({ variant: 'destructive', title: 'خطا', description: 'حذف فایل ناموفق بود' });
    } else {
      toast({ title: 'موفق', description: 'فایل حذف شد' });
      fetchMedia();
    }
  };

  const handleContentChange = (key: string, value: string) => {
    setSiteContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingContent(true);
    try {
      const rows = Object.entries(siteContent).map(([key, value]) => ({ key, value }));
      const { error } = await supabase.from('site_content').upsert(rows);
      if (error) {
        toast({ variant: 'destructive', title: 'خطا', description: 'خطا در ذخیره محتوا' });
      } else {
        toast({ title: 'موفق', description: 'محتوا ذخیره شد' });
        fetchSiteContent();
      }
    } catch (err) {
      console.error('Content save error:', err);
    } finally {
      setSavingContent(false);
    }
  };

  const togglePostStatus = async (post: Post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('posts')
      .update({ 
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null
      })
      .eq('id', post.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در تغییر وضعیت',
      });
    } else {
      toast({ title: 'موفق', description: newStatus === 'published' ? 'مطلب منتشر شد' : 'مطلب به پیش‌نویس تبدیل شد' });
      fetchPosts();
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

  const resetPostForm = () => {
    setEditingPost(null);
    setPostFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featured_image: '',
      status: 'draft',
      category: '',
      tags: '',
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

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-6">
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              دوره‌ها
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2">
              <FileText className="h-4 w-4" />
              مطالب
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="gap-2">
              <Users className="h-4 w-4" />
              ثبت‌نام‌ها
            </TabsTrigger>
            <TabsTrigger value="departments" className="gap-2">
              <Building2 className="h-4 w-4" />
              دپارتمان‌ها
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              رسانه
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <Wand2 className="h-4 w-4" />
              متن‌ها
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
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

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingPost ? 'ویرایش مطلب' : 'ایجاد مطلب جدید'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">عنوان</label>
                      <Input
                        value={postFormData.title}
                        onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Slug (اختیاری - خودکار ساخته می‌شود)</label>
                      <Input
                        value={postFormData.slug}
                        onChange={(e) => setPostFormData({ ...postFormData, slug: e.target.value })}
                        placeholder="my-post-slug"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">خلاصه</label>
                      <Textarea
                        value={postFormData.excerpt}
                        onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                        rows={2}
                        placeholder="خلاصه‌ای کوتاه از مطلب..."
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">محتوا</label>
                      <Textarea
                        value={postFormData.content}
                        onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                        rows={8}
                        placeholder="متن کامل مطلب..."
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">تصویر شاخص (URL)</label>
                      <Input
                        value={postFormData.featured_image}
                        onChange={(e) => setPostFormData({ ...postFormData, featured_image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        dir="ltr"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">دسته‌بندی</label>
                        <Input
                          value={postFormData.category}
                          onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                          placeholder="اخبار"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">وضعیت</label>
                        <Select
                          value={postFormData.status}
                          onValueChange={(v) => setPostFormData({ ...postFormData, status: v as 'draft' | 'published' })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">پیش‌نویس</SelectItem>
                            <SelectItem value="published">منتشر شده</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">برچسب‌ها (با کاما جدا کنید)</label>
                      <Input
                        value={postFormData.tags}
                        onChange={(e) => setPostFormData({ ...postFormData, tags: e.target.value })}
                        placeholder="آموزش, برنامه‌نویسی, طراحی"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingPost ? <Edit className="ml-2 h-4 w-4" /> : <Plus className="ml-2 h-4 w-4" />}
                        {editingPost ? 'ویرایش' : 'ایجاد'}
                      </Button>
                      {editingPost && (
                        <Button type="button" variant="outline" onClick={resetPostForm}>
                          انصراف
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">مطالب ({posts.length})</h2>
                {posts.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      هنوز مطلبی ایجاد نشده است
                    </CardContent>
                  </Card>
                ) : (
                  posts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">/{post.slug}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => togglePostStatus(post)}
                              title={post.status === 'published' ? 'پیش‌نویس کردن' : 'انتشار'}
                            >
                              {post.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{post.excerpt}</p>
                        )}
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                          </span>
                          {post.category && (
                            <span className="bg-muted px-2 py-0.5 rounded-full">{post.category}</span>
                          )}
                          <span className="text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString('fa-IR')}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Enrollments Tab */}
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
                          <TableCell>
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

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingDepartment ? 'ویرایش دپارتمان' : 'افزودن دپارتمان'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDepartmentSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">نام دپارتمان</label>
                      <Input
                        value={departmentForm.name}
                        onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Slug</label>
                      <Input
                        value={departmentForm.slug}
                        onChange={(e) => setDepartmentForm({ ...departmentForm, slug: e.target.value })}
                        placeholder="english-slug"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">آیکن (اختیاری)</label>
                      <Input
                        value={departmentForm.icon}
                        onChange={(e) => setDepartmentForm({ ...departmentForm, icon: e.target.value })}
                        placeholder="نام آیکن یا آدرس"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">توضیحات</label>
                      <Textarea
                        value={departmentForm.description}
                        onChange={(e) => setDepartmentForm({ ...departmentForm, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="text-white" style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}>
                        {editingDepartment ? 'ذخیره تغییرات' : 'ایجاد دپارتمان'}
                      </Button>
                      {editingDepartment && (
                        <Button variant="outline" type="button" onClick={() => { setEditingDepartment(null); setDepartmentForm({ name: '', description: '', icon: '', slug: '' }); }}>
                          انصراف
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    دپارتمان‌ها ({departments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>نام</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>توضیحات</TableHead>
                        <TableHead className="text-left">عملیات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                            دپارتمانی ثبت نشده است
                          </TableCell>
                        </TableRow>
                      ) : (
                        departments.map((dept: any) => (
                          <TableRow key={dept.id}>
                            <TableCell className="font-semibold">{dept.name}</TableCell>
                            <TableCell>{dept.slug}</TableCell>
                            <TableCell className="max-w-sm truncate text-muted-foreground">{dept.description}</TableCell>
                            <TableCell className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => { setEditingDepartment(dept); setDepartmentForm({ name: dept.name || '', description: dept.description || '', icon: dept.icon || '', slug: dept.slug || '' }); }}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDepartmentDelete(dept.id)}>
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
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadCloud className="h-5 w-5" />
                  بارگذاری تصویر/ویدیو
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="file" accept="image/*,video/*" onChange={handleUpload} disabled={uploading} />
                {uploading && <p className="text-sm text-muted-foreground">در حال آپلود...</p>}
                <Separator />
                <div className="grid md:grid-cols-2 gap-4">
                  {mediaList.length === 0 && (
                    <p className="text-muted-foreground">فایلی بارگذاری نشده است</p>
                  )}
                  {mediaList.map((file) => (
                    <div key={file.name} className="border rounded-lg p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {file.name.match(/\.(mp4|mov|avi|mkv)$/i) ? <Video className="h-5 w-5 text-primary" /> : <ImageIcon className="h-5 w-5 text-primary" />}
                        <div className="truncate">
                          <p className="font-semibold truncate">{file.name}</p>
                          <a className="text-sm text-blue-600 truncate" href={file.url} target="_blank" rel="noreferrer">مشاهده</a>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteMedia(file.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  مدیریت متن‌های سایت
                </CardTitle>
                <CardDescription>متن‌های کلیدی صفحه اصلی (مثلاً هدر/هیرو)</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveContent} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">عنوان هدر</label>
                    <Input
                      value={siteContent.hero_title || ''}
                      onChange={(e) => handleContentChange('hero_title', e.target.value)}
                      placeholder="مثال: آرمانیان"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">زیرعنوان هدر</label>
                    <Textarea
                      value={siteContent.hero_subtitle || ''}
                      onChange={(e) => handleContentChange('hero_subtitle', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">متن CTA</label>
                    <Input
                      value={siteContent.hero_cta || ''}
                      onChange={(e) => handleContentChange('hero_cta', e.target.value)}
                      placeholder="همین امروز شروع کن"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">متن فوتر</label>
                    <Textarea
                      value={siteContent.footer_text || ''}
                      onChange={(e) => handleContentChange('footer_text', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <Button type="submit" disabled={savingContent} className="text-white" style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}>
                    {savingContent ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
