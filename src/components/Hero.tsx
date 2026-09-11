import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, BookOpen, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
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

  const spotlightRef = useRef<HTMLDivElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      const ease = 0.12;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;
        spotlightRef.current.style.opacity = visibleRef.current ? '1' : '0';
      }

      if (dotGridRef.current) {
        dotGridRef.current.style.setProperty('--mx', `${currentRef.current.x}px`);
        dotGridRef.current.style.setProperty('--my', `${currentRef.current.y}px`);
        dotGridRef.current.style.opacity = visibleRef.current ? '1' : '0';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    currentRef.current = { ...targetRef.current };
    visibleRef.current = true;
  };

  const handleMouseLeave = () => {
    visibleRef.current = false;
  };

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
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[76vh] items-center overflow-hidden bg-background pb-20 pt-28 sm:pt-32 lg:min-h-[78vh] lg:pb-24 lg:pt-36"
    >
      {/* Cursor spotlight */}
      {/* Dot-grid spotlight */}
      <div
        ref={dotGridRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--foreground) / 0.09) 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(circle 240px at var(--mx, 50%) var(--my, 50%), black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(circle 240px at var(--mx, 50%) var(--my, 50%), black 0%, transparent 70%)',
        }}
      />

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 z-0 opacity-0 transition-opacity duration-500 ease-out will-change-transform"
        style={{ transform: 'translate(0, 0)' }}
      >
        {/* Soft outer halo */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'clamp(260px, 28vw, 420px)',
            height: 'clamp(260px, 28vw, 420px)',
            background:
              'radial-gradient(circle at center, hsl(var(--accent) / 0.18) 0%, hsl(var(--accent) / 0.07) 40%, transparent 72%)',
            filter: 'blur(28px)',
          }}
        />
        {/* Mid glow */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'clamp(90px, 11vw, 150px)',
            height: 'clamp(90px, 11vw, 150px)',
            background:
              'radial-gradient(circle at center, hsl(var(--accent) / 0.38) 0%, hsl(var(--accent) / 0.14) 45%, transparent 72%)',
            filter: 'blur(10px)',
          }}
        />
        {/* Tiny cursor dot */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'clamp(18px, 2vw, 28px)',
            height: 'clamp(18px, 2vw, 28px)',
            background:
              'radial-gradient(circle at center, hsl(var(--accent) / 0.85) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center animate-slide-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            آموزشگاه آزاد فنی و حرفه‌ای
          </span>

          <h1 className="mt-7 text-5xl font-semibold text-foreground sm:text-6xl lg:text-7xl">
            آرمانیان
          </h1>

          <h2 className="mt-3 text-balance text-xl font-medium text-foreground/90 sm:text-2xl lg:text-3xl">
            آموزش کامپیوتر، گرافیک، معماری و زبان
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <Typewriter text="مسیر آینده از آرمانیان می گذرد ..." />
          </p>

          {/* Search Bar */}
          <div className="mt-9 w-full max-w-xl">
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
                className="h-13 w-full rounded-lg border-border bg-card pr-11 text-sm shadow-soft focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="mt-5 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
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
          <CommandList className="max-h-[440px] p-2">
            <CommandEmpty>نتیجه‌ای یافت نشد.</CommandEmpty>

            {filteredDepartments.length > 0 && (
              <CommandGroup
                heading="دپارتمان‌ها"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {filteredDepartments.map((dept) => (
                  <CommandItem
                    key={dept.id}
                    onSelect={() => handleSelectDepartment(dept.id)}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition-colors group-hover:bg-card group-data-[selected=true]:border-primary-foreground/20 group-data-[selected=true]:bg-primary-foreground/20 group-data-[selected=true]:text-primary-foreground">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{dept.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {filteredCourses.length > 0 && (
              <CommandGroup
                heading="دوره‌ها"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {filteredCourses.map((course) => (
                  <CommandItem
                    key={course.id}
                    onSelect={() => handleSelectCourse(course.id)}
                    className="group flex cursor-pointer items-start gap-3 rounded-lg px-3 py-3 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition-colors group-hover:bg-card group-data-[selected=true]:border-primary-foreground/20 group-data-[selected=true]:bg-primary-foreground/20 group-data-[selected=true]:text-primary-foreground">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold">{course.title}</span>
                      {course.description && (
                        <span className="mt-0.5 text-xs text-muted-foreground group-data-[selected=true]:text-primary-foreground/80">
                          {course.description.substring(0, 60)}...
                        </span>
                      )}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

          {/* Footer / keyboard hints */}
          <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">↑↓</kbd>
                <span className="text-[10px] text-muted-foreground">پیمایش</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">↵</kbd>
                <span className="text-[10px] text-muted-foreground">انتخاب</span>
              </span>
            </div>
            <span className="text-[10px] font-light italic text-muted-foreground/60">آرمانیان</span>
          </div>
        </CommandDialog>
      </div>
    </section>
  );
};

export default Hero;
