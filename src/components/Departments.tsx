import { Button } from '@/components/ui/button';
import { Code, Palette, Home, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import DepartmentCard from './DepartmentCard';
import computerDeptImage from '@/assets/computer-department.jpg';
import graphicDeptImage from '@/assets/graphic-department.jpg';
import architectureDeptImage from '@/assets/architecture-department.jpg';
import englishDeptImage from '@/assets/english-department.jpg';

const Departments = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleLearnMore = (departmentTitle: string) => {
    // Convert department title to slug for navigation
    const departmentSlug = departmentTitle
      .replace('دپارتمان ', '')
      .replace('کامپیوتر', 'computer')
      .replace('گرافیک', 'graphic')
      .replace('معماری', 'architecture')
      .replace('زبان انگلیسی', 'english');
    
    navigate(`/departments#${departmentSlug}`);
  };

  const departments = [
    {
      icon: Code,
      title: 'دپارتمان کامپیوتر',
      description: 'آموزش مهارت‌های کامپیوتری و برنامه‌نویسی برای تمام سنین.',
      image: computerDeptImage,
      courses: [
        'ICDL کودکان',
        'ICDL بزرگسالان',
        'برنامه‌نویسی اسکرچ کودکان',
        'برنامه‌نویسی پایتون نوجوانان',
        'برنامه‌نویسی پایتون بزرگسالان'
      ]
    },
    {
      icon: Palette,
      title: 'دپارتمان گرافیک',
      description: 'آموزش طراحی گرافیک و نرم‌افزارهای طراحی حرفه‌ای.',
      image: graphicDeptImage,
      courses: [
        'فتوشاپ نوجوانان',
        'فتوشاپ بزرگسالان',
        'افترافکت بزرگسالان'
      ]
    },
    {
      icon: Home,
      title: 'دپارتمان معماری',
      description: 'آموزش طراحی معماری و نرم‌افزارهای تخصصی ساختمان.',
      image: architectureDeptImage,
      courses: [
        'طراحی داخلی معماری',
        'نرم‌افزارهای معماری (اسکچاپ، اتوکد، تریدی مکس)',
        'نقشه‌کشی معماری',
        'اسکیس و راندو'
      ]
    },
    {
      icon: Globe,
      title: 'دپارتمان زبان انگلیسی',
      description: 'آموزش زبان انگلیسی با روش‌های مدرن و تکنولوژی.',
      image: englishDeptImage,
      courses: [
        'آموزش زبان با کامپیوتر',
        'آموزش زبان ترمیک'
      ]
    }
  ];

  return (
    <section id="departments" className="py-24 bg-gradient-to-b from-transparent via-background/30 to-transparent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-bold text-primary">دپارتمان‌های تخصصی</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            دپارتمان‌های آموزشی
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای طراحی شده‌اند، کاوش کنید.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/95 backdrop-blur-md hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:border-transparent shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/95 backdrop-blur-md hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:border-transparent shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-12 -mx-4 px-4 scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-10 px-4 md:px-16">
              {departments.map((dept, index) => (
                <DepartmentCard
                  key={index}
                  title={dept.title}
                  description={dept.description}
                  icon={dept.icon}
                  image={dept.image}
                  courses={dept.courses}
                  onLearnMore={() => handleLearnMore(dept.title)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="hero" 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            مشاهده همه دوره‌ها
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Departments;