import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, BookOpen, Building2, GraduationCap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Typewriter from '@/components/Typewriter';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

interface Course {
  id: string;
  title: string;
  description: string | null;
  department_id: number | null;
}

interface Department {
  id: number;
  name: string;
  slug: string | null;
}

const Hero = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, departmentsRes] = await Promise.all([
        supabase.from('courses').select('id, title, description, department_id'),
        supabase.from('departments').select('id, name, slug')
      ]);

      if (coursesRes.data) setCourses(coursesRes.data);
      if (departmentsRes.data) setDepartments(departmentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === null || course.department_id === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchQuery, selectedCategory]);

  const filteredDepartments = useMemo(() => {
    if (selectedCategory) {
      return departments.filter(dept => dept.id === selectedCategory);
    }
    if (searchQuery) {
      return departments.filter(dept => 
        dept.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return departments;
  }, [departments, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    navigate(`/course-detail/${courseId}`);
    setOpen(false);
    setSearchQuery('');
  };

  const handleSelectDepartment = (departmentId: number) => {
    navigate('/departments');
    setOpen(false);
    setSearchQuery('');
    // Scroll to department section if needed
    setTimeout(() => {
      const element = document.getElementById(`department-${departmentId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCategoryClick = (departmentId: number | null) => {
    setSelectedCategory(departmentId);
    setSearchQuery('');
    setOpen(false);
    if (departmentId) {
      // Navigate to courses page with department filter
      navigate('/courses');
      // The courses page will need to handle the filter via URL params or state
      // For now, just navigate to courses page
    }
  };

  const handleSignUp = () => {
    navigate('/auth');
  };
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-transparent pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Text column */}
          <div className="max-w-2xl animate-slide-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-bold text-primary shadow-soft">
              <span className="h-2 w-2 rounded-full bg-accent" />
              آموزشگاه آزاد فنی و حرفه‌ای
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
              آرمانیان
            </h1>

            <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              آموزش کامپیوتر، گرافیک، معماری و زبان
            </h2>

            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              <Typewriter text="مسیر آینده از آرمانیان می گذرد ..." />
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجوی دوره یا دپارتمان..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length > 0 || courses.length > 0 || departments.length > 0) {
                      setOpen(true);
                    }
                  }}
                  className="h-14 w-full rounded-xl border-border bg-card pr-12 text-base shadow-soft focus-visible:ring-primary"
                />
              </div>

              {/* Categories */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryClick(null)}
                >
                  همه
                </Button>
                {departments.map((dept) => (
                  <Button
                    key={dept.id}
                    variant={selectedCategory === dept.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryClick(dept.id)}
                  >
                    {dept.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto" onClick={handleSignUp}>
                همین امروز شروع کن
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate('/courses')}
              >
                مشاهده دوره‌ها
              </Button>
            </div>
          </div>

          {/* Visual column */}
          <div className="relative animate-scale-in">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-lifted md:p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: 'دپارتمان تخصصی', value: '۴' },
                  { icon: BookOpen, label: 'دوره فعال', value: '+۱۴' },
                  { icon: GraduationCap, label: 'دانشجوی آموزش‌دیده', value: '+۱۲۰۰' },
                  { icon: Award, label: 'گواهینامه معتبر', value: 'فنی و حرفه‌ای' },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border/70 bg-secondary/60 p-4 transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-lg font-bold text-foreground">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground">
                <p className="text-sm font-bold">ثبت‌نام ترم جدید آغاز شد</p>
                <p className="mt-1 text-sm opacity-90">
                  مشاوره رایگان انتخاب دوره برای همه‌ی سنین.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            <div className="pointer-events-none absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
          </div>
        </div>

        {/* Search Results Dialog */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="جستجوی دوره یا دپارتمان..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>نتیجه‌ای یافت نشد.</CommandEmpty>

            {filteredDepartments.length > 0 && (
              <CommandGroup heading="دپارتمان‌ها">
                {filteredDepartments.map((dept) => (
                  <CommandItem
                    key={dept.id}
                    onSelect={() => handleSelectDepartment(dept.id)}
                    className="cursor-pointer"
                  >
                    <Building2 className="ml-2 h-4 w-4" />
                    {dept.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {filteredCourses.length > 0 && (
              <CommandGroup heading="دوره‌ها">
                {filteredCourses.map((course) => (
                  <CommandItem
                    key={course.id}
                    onSelect={() => handleSelectCourse(course.id)}
                    className="cursor-pointer"
                  >
                    <BookOpen className="ml-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{course.title}</span>
                      {course.description && (
                        <span className="text-xs text-muted-foreground">
                          {course.description.substring(0, 60)}...
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      </div>
    </section>
  );
};

export default Hero;
