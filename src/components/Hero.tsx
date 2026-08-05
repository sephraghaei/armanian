import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, BookOpen, Building2 } from 'lucide-react';
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
    if (!searchQuery.trim()) return courses;
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return departments;
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

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

  const handleSignUp = () => {
    navigate('/auth');
  };
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-transparent pt-32 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32"
    >
      <div className="container mx-auto max-w-3xl px-5 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center animate-slide-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            آموزشگاه آزاد فنی و حرفه‌ای
          </span>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            آرمانیان
          </h1>

          <h2 className="mt-4 text-balance text-xl font-medium text-foreground/90 sm:text-2xl md:text-3xl">
            آموزش کامپیوتر، گرافیک، معماری و زبان
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <Typewriter text="مسیر آینده از آرمانیان می گذرد ..." />
          </p>

          {/* Search Bar */}
          <div className="mt-10 w-full max-w-lg">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                className="h-12 w-full rounded-lg border-border bg-card pr-11 text-sm shadow-soft focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="mt-6 flex w-full max-w-lg flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button size="lg" className="group w-full shadow-none hover:shadow-none sm:w-auto" onClick={handleSignUp}>
              همین امروز شروع کن
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-card sm:w-auto"
              onClick={() => navigate('/courses')}
            >
              مشاهده دوره‌ها
            </Button>
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
