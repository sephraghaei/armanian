import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2, ArrowRight } from 'lucide-react';
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
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    features: '',
    learning_outcomes: '',
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchCourses();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseData = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      level: formData.level,
      features: formData.features.split('\n').filter(f => f.trim()),
      learning_outcomes: formData.learning_outcomes.split('\n').filter(l => l.trim()),
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
    });
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
    });
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

        <h1 className="text-3xl font-bold mb-8">پنل مدیریت دوره‌ها</h1>

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

                <div>
                  <label className="text-sm font-medium">مدت زمان</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="مثال: 12 هفته"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">سطح</label>
                  <Input
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="مثال: مقدماتی، متوسط، پیشرفته"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">ویژگی‌ها (هر خط یک مورد)</label>
                  <Textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">نتایج یادگیری (هر خط یک مورد)</label>
                  <Textarea
                    value={formData.learning_outcomes}
                    onChange={(e) => setFormData({ ...formData, learning_outcomes: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingCourse ? <Edit className="ml-2 h-4 w-4" /> : <Plus className="ml-2 h-4 w-4" />}
                    {editingCourse ? 'ویرایش دوره' : 'ایجاد دوره'}
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
            <h2 className="text-2xl font-bold">دوره‌های موجود</h2>
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                      <Edit className="h-4 w-4 ml-1" />
                      ویرایش
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="h-4 w-4 ml-1" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
