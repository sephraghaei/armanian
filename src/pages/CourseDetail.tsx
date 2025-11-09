import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, Trophy, Star, CheckCircle, ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  department_id: number;
  is_popular: boolean;
}

const CourseDetail = () => {
  const { courseId } = useParams(); // This is actually the course title
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    if (!courseId) return;

    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) {
        console.error('Error fetching course:', error);
        toast({
          title: "خطا",
          description: "خطا در بارگذاری اطلاعات دوره",
          variant: "destructive",
        });
      } else {
        setCourse(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setEnrolling(true);
    try {
      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', course.id) // Use course.id from the fetched course
        .single();

      if (existingEnrollment) {
        toast({
          title: "قبلاً ثبت نام شده",
          description: "شما قبلاً در این دوره ثبت نام کرده‌اید",
          variant: "destructive",
        });
        return;
      }

      // Create enrollment
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: course.id, // Use course.id from the fetched course
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        });

      if (error) {
        console.error('Enrollment error:', error);
        toast({
          title: "خطا",
          description: "خطا در ثبت نام. لطفاً دوباره تلاش کنید",
          variant: "destructive",
        });
      } else {
        toast({
          title: "ثبت نام موفق",
          description: "با موفقیت در دوره ثبت نام شدید",
        });
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطا",
        description: "خطای غیرمنتظره رخ داد",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-24 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">در حال بارگذاری...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-24 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">دوره پیدا نشد</h1>
            <Button onClick={() => navigate('/courses')}>
              بازگشت به لیست دوره‌ها
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-page-in">
      <Header />
      
      <div className="container mx-auto py-24 px-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          بازگشت به دوره‌ها
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-gradient-hero rounded-2xl p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{course.title}</h1>
                  {course.is_popular && (
                    <Badge variant="default" className="text-white" style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}>
                      <Star className="w-3 h-3 mr-1" />
                      محبوب‌ترین
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" style={{ color: 'hsl(28,92%,56%)' }} />
                  <div>
                    <p className="text-sm text-muted-foreground">مدت دوره</p>
                    <p className="font-semibold text-foreground">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" style={{ color: 'hsl(28,92%,56%)' }} />
                  <div>
                    <p className="text-sm text-muted-foreground">سطح</p>
                    <p className="font-semibold text-foreground">{course.level}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" style={{ color: 'hsl(28,92%,56%)' }} />
                  <div>
                    <p className="text-sm text-muted-foreground">دسترسی</p>
                    <p className="font-semibold text-foreground">مادام‌العمر</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" style={{ color: 'hsl(28,92%,56%)' }} />
                  <div>
                    <p className="text-sm text-muted-foreground">شروع</p>
                    <p className="font-semibold text-foreground">فوری</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Features */}
            {course.features && course.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">ویژگی‌های دوره</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Learning Outcomes */}
            {course.learning_outcomes && course.learning_outcomes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">چیزهایی که یاد خواهید گرفت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.learning_outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-orange-300/70">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">ثبت نام در دوره</CardTitle>
                <CardDescription>
                  آماده شروع یادگیری هستید؟
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">رایگان</div>
                  <p className="text-sm text-muted-foreground">دسترسی کامل به تمام مطالب</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">دسترسی مادام‌العمر</span>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">پشتیبانی ۲۴/۷</span>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">گواهی تکمیل</span>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                <Button 
                  className="w-full text-white"
                  style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}
                  size="lg"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? 'در حال ثبت نام...' : 'ثبت نام رایگان'}
                </Button>
                
                {!user && (
                  <p className="text-sm text-muted-foreground text-center">
                    برای ثبت نام ابتدا وارد حساب کاربری خود شوید
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;