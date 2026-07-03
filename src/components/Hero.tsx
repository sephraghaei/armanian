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
      {/* Smooth Flowing Wave Backgrounds */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Mobile subtle orange waves */}
        <svg className="absolute inset-0 w-full h-full z-0 sm:hidden" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mobileOrange1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(28,92%,56%)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="hsl(30,92%,60%)" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="mobileOrange2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(28,92%,56%)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="hsl(30,92%,60%)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <g style={{ filter: 'blur(0.5px)' }}>
            <path d="M0,260 C220,230 420,290 600,260 C820,230 1000,290 1200,260 L1200,800 L0,800 Z"
                  fill="url(#mobileOrange1)"
                  style={{ animation: 'wave 16s ease-in-out infinite', opacity: 0.7 }} />
            <path d="M0,340 C240,310 460,360 720,340 C940,320 1080,360 1200,340 L1200,800 L0,800 Z"
                  fill="url(#mobileOrange2)"
                  style={{ animation: 'waveFlow 22s ease-in-out infinite', opacity: 0.7 }} />
          </g>
        </svg>

        <svg className="absolute inset-0 w-full h-full z-0 hidden sm:block" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Smooth bottom waves */}
          <path d="M0,200 C240,140 360,260 600,200 C840,140 960,260 1200,200 L1200,800 L0,800 Z" 
                fill="url(#waveGradient1)" 
                className="opacity-50" 
                style={{
                  animation: 'wave 8s ease-in-out infinite',
                  animationDelay: '0s'
                }} />
          
          <path d="M0,320 C180,240 420,380 660,300 C900,220 1080,360 1200,300 L1200,800 L0,800 Z" 
                fill="url(#waveGradient2)" 
                className="opacity-40" 
                style={{
                  animation: 'wave 12s ease-in-out infinite reverse',
                  animationDelay: '2s'
                }} />
          
          <path d="M0,440 C300,360 500,520 800,440 C1000,360 1100,480 1200,440 L1200,800 L0,800 Z" 
                fill="url(#waveGradient3)" 
                className="opacity-35" 
                style={{
                  animation: 'waveFlow 10s ease-in-out infinite',
                  animationDelay: '4s'
                }} />
        </svg>
        
        {/* Subtle top waves */}
        <svg className="absolute inset-0 w-full h-full z-0 hidden sm:block" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M0,100 C300,40 600,160 900,100 C1050,70 1150,130 1200,100 L1200,0 L0,0 Z" 
                fill="hsl(var(--accent) / 0.04)" 
                className="opacity-50" 
                style={{
                  animation: 'wave 14s ease-in-out infinite reverse',
                  animationDelay: '1s'
                }} />
          
          <path d="M0,180 C200,120 500,240 800,180 C1000,120 1100,200 1200,180 L1200,0 L0,0 Z" 
                fill="hsl(var(--primary) / 0.03)" 
                className="opacity-40" 
                style={{
                  animation: 'waveFlow 16s ease-in-out infinite',
                  animationDelay: '3s'
                }} />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 pt-28 md:pt-32 relative z-10">
        {/* Content - Full Width */}
        <div className="text-center space-y-12 mb-20">
          <div className="space-y-6 md:space-y-8">
          <h1 className="text-[4.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] font-extrabold leading-[1.1] md:leading-tight max-w-5xl mx-auto mb-4 md:mb-8 tracking-tight bg-clip-text text-transparent animate-gradient-x animate-bounce-in" style={{ backgroundImage: 'linear-gradient(90deg, hsl(233,63%,67%), hsl(200 51% 65%), hsl(233,63%,67%))' }}>
              آرمانیان
          </h1>
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-[1.9] md:leading-[1.7] max-w-4xl mx-auto animate-slide-in-up py-2 overflow-visible">
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
                className={selectedCategory === null ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
              >
                همه
              </Button>
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant={selectedCategory === dept.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(dept.id)}
                  className={selectedCategory === dept.id ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
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