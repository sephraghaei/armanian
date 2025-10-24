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
    <section id="departments" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            دپارتمان‌های آموزشی
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای طراحی شده‌اند، کاوش کنید.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-xl transition-all duration-300"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-xl transition-all duration-300"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-10 -mx-4 px-4 scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-8 px-4 md:px-16">
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

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            مشاهده همه دوره‌ها
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Departments;