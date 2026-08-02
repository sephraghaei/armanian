import { Button } from '@/components/ui/button';
import { Code, Palette, Home, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import DepartmentCard from './DepartmentCard';
import HomeSearch from './HomeSearch';
import computerDeptImage from '@/assets/computer-department.jpg';
import graphicDeptImage from '@/assets/graphic-department.jpg';
import architectureDeptImage from '@/assets/architecture-department.jpg';
import englishDeptImage from '@/assets/english-department.jpg';

const Departments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');



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

  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return departments;
    const query = searchQuery.toLowerCase();
    return departments.filter(dept => 
      dept.title.toLowerCase().includes(query) ||
      dept.description.toLowerCase().includes(query) ||
      dept.courses.some(course => course.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <section id="departments" className="py-14 sm:py-20 md:py-24 bg-secondary/40 border-y border-border relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-5">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-sm font-bold text-primary">دپارتمان‌های تخصصی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            دپارتمان‌های آموزشی
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mx-auto mb-8">
            طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای طراحی شده‌اند، کاوش کنید.
          </p>

          <HomeSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="جستجوی دپارتمان یا دوره..."
          />
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">دپارتمانی با این مشخصات یافت نشد</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
            {filteredDepartments.map((dept, index) => (
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
        )}

        <div className="text-center mt-12 sm:mt-16">
          <Button
            variant="hero"
            size="lg"
            className="w-full font-bold px-8 sm:w-auto"
            onClick={() => navigate('/courses')}
          >
            مشاهده همه دوره‌ها
          </Button>
        </div>


      </div>
    </section>
  );
};

export default Departments;