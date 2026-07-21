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
    <section id="home" className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">

      <div className="container mx-auto px-4 py-16 md:py-20 pt-28 md:pt-32 relative z-10">
        {/* Content - Full Width */}
        <div className="text-center space-y-12 mb-20">
          <div className="space-y-6 md:space-y-8">
          <h1 className="text-[4.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] font-extrabold leading-[1.1] md:leading-tight max-w-5xl mx-auto mb-4 md:mb-8 tracking-tight text-primary animate-bounce-in">
              آرمانیان
          </h1>
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-foreground leading-[1.9] md:leading-[1.7] max-w-4xl mx-auto animate-slide-in-up py-2 overflow-visible">
                آموزشگاه آزاد فنی و حرفه‌ای کامپیوتر و معماری
              </h2>
            </div>
            
            <div className="pt-6">
              <p className="text-base sm:text-lg md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-loose md:leading-relaxed font-medium overflow-visible animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                <Typewriter text="مسیر آینده از آرمانیان می گذرد ..." />
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto pt-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
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
                className="w-full h-14 pr-12 text-lg bg-background/95 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/50 rounded-xl shadow-lg"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(null)}
                className={selectedCategory === null ? "bg-primary text-primary-foreground" : ""}
              >
                همه
              </Button>
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant={selectedCategory === dept.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(dept.id)}
                  className={selectedCategory === dept.id ? "bg-primary text-primary-foreground" : ""}
                >
                  {dept.name}
                </Button>
              ))}
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
                      <Building2 className="w-4 h-4 ml-2" />
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
                      <BookOpen className="w-4 h-4 ml-2" />
                      <div className="flex flex-col">
                        <span>{course.title}</span>
                        {course.description && (
                          <span className="text-xs text-muted-foreground">{course.description.substring(0, 60)}...</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </CommandDialog>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-2 md:pt-4">
            <Button variant="hero" size="lg" className="group w-full sm:w-auto animate-bounce-in hover-scale" style={{ animationDelay: '0.6s' }} onClick={handleSignUp}>
              همین امروز شروع کن
              <ArrowRight className="w-4 h-4 group-hover:-translate-x-2 group-hover:rotate-12 transition-all duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto animate-bounce-in hover-scale"
              style={{ animationDelay: '0.8s' }}
              onClick={() => navigate('/courses')}
            >
              مشاهده دوره‌ها
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;