import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Trophy, Star, CheckCircle, Loader2, Search, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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

interface Department {
  id: number;
  name: string;
}

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [showPopularOnly, setShowPopularOnly] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, departmentsRes] = await Promise.all([
        supabase.from('courses').select('*').order('is_popular', { ascending: false }),
        supabase.from('departments').select('id, name')
      ]);

      if (coursesRes.error) throw coursesRes.error;
      if (departmentsRes.error) throw departmentsRes.error;

      setCourses(coursesRes.data || []);
      setDepartments(departmentsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique levels from courses
  const levels = useMemo(() => {
    const uniqueLevels = [...new Set(courses.map(c => c.level).filter(Boolean))];
    return uniqueLevels as string[];
  }, [courses]);

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Level filter
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

      // Department filter
      const matchesDepartment = selectedDepartment === 'all' || 
        course.department_id?.toString() === selectedDepartment;

      // Popular filter
      const matchesPopular = !showPopularOnly || course.is_popular;

      return matchesSearch && matchesLevel && matchesDepartment && matchesPopular;
    });
  }, [courses, searchQuery, selectedLevel, selectedDepartment, showPopularOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedDepartment('all');
    setShowPopularOnly(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedLevel !== 'all' || 
    selectedDepartment !== 'all' || showPopularOnly;

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

      {/* Filter Section */}
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="جستجوی دوره..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground hidden sm:inline">فیلتر:</span>
              </div>

              {/* Level Filter */}
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="سطح" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه سطوح</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Department Filter */}
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="رشته" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه رشته‌ها</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Popular Toggle */}
              <Button
                variant={showPopularOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPopularOnly(!showPopularOnly)}
                className={showPopularOnly ? "text-white" : ""}
                style={showPopularOnly ? { background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' } : {}}
              >
                <Star className="w-4 h-4 ml-1" />
                محبوب‌ها
              </Button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 ml-1" />
                  پاک کردن
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredCourses.length} دوره یافت شد
            {hasActiveFilters && ` از ${courses.length} دوره`}
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
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                {hasActiveFilters ? 'هیچ دوره‌ای با این فیلترها یافت نشد.' : 'هیچ دوره‌ای یافت نشد.'}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  پاک کردن فیلترها
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredCourses.map((course) => (
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