import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Star, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  level: string | null;
  features: string[] | null;
  learning_outcomes: string[] | null;
  is_popular: boolean | null;
  department_id: number | null;
}

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('is_popular', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-page-in">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              دوره‌های آموزشی
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              مسیر یادگیری خود را انتخاب کنید. برنامه‌های ساختارمندی که فراگیران را در گروه‌های سنی مختلف 
              به متخصصین آینده تبدیل می‌کند.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">هیچ دوره‌ای یافت نشد.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {courses.map((course) => (
                  <Card key={course.id} className={`relative transition-all duration-500 hover:-translate-y-2 border-orange-300/70 hover:shadow-[0_0_40px_hsl(28_92%_56%_/_0.35)] ${course.is_popular ? 'border-2' : 'border'} bg-white/95`}>
                    {course.is_popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge variant="default" className="text-white" style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}>
                          <Star className="w-3 h-3 mr-1" />
                          محبوب‌ترین
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl text-foreground mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Course Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {course.duration && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" style={{ color: 'hsl(28,92%,56%)' }} />
                            <span className="text-muted-foreground">{course.duration}</span>
                          </div>
                        )}
                        {course.level && (
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4" style={{ color: 'hsl(28,92%,56%)' }} />
                            <span className="text-muted-foreground">{course.level}</span>
                          </div>
                        )}
                      </div>

                      {/* Features List */}
                      {course.features && course.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">شامل موارد:</h4>
                          <ul className="space-y-2">
                            {course.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'hsl(28,92%,56%)' }} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button 
                        variant={course.is_popular ? "default" : "outline"} 
                        className="w-full text-white"
                        style={course.is_popular ? { background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' } : {}}
                        size="lg"
                        onClick={() => navigate(`/course-detail/${course.id}`)}
                      >
                        {course.is_popular ? "شروع یادگیری" : "مشاهده جزئیات"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Learning Outcomes Section */}
              {courses.some(c => c.learning_outcomes && c.learning_outcomes.length > 0) && (
                <div className="space-y-12">
                  {courses
                    .filter(c => c.learning_outcomes && c.learning_outcomes.length > 0)
                    .map((course) => (
                      <div key={course.id} className="bg-gradient-hero rounded-2xl p-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                              {course.title}
                              {course.is_popular && (
                                <Badge variant="default" className="bg-gradient-primary text-white mr-2">
                                  محبوب
                                </Badge>
                              )}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              {course.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button variant="hero" size="lg" onClick={() => navigate(`/course-detail/${course.id}`)}>
                                ثبت نام در دوره
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-4">چیزهایی که یاد خواهید گرفت:</h4>
                            <ul className="space-y-3">
                              {course.learning_outcomes?.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-3 text-muted-foreground">
                                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center bg-card rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              هنوز مطمئن نیستید؟
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              جلسه مشاوره رایگان با متخصصان آموزشی ما رزرو کنید تا بهترین برنامه متناسب با علایق و نیازهای خود را پیدا کنید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                رزرو مشاوره رایگان
              </Button>
              <Button variant="outline" size="lg">
                دانلود بروشور
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;