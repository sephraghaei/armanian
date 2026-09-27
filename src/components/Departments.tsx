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
    <section id="departments" className="border-y border-border bg-secondary/30 py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            دپارتمان‌های تخصصی
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            دپارتمان‌های آموزشی
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای طراحی شده‌اند، کاوش کنید.
          </p>

          <div className="mt-8">
            <HomeSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="جستجوی دپارتمان یا دوره..."
            />
          </div>
        </div>


        {filteredDepartments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">دپارتمانی با این مشخصات یافت نشد</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-sm items-stretch gap-5 sm:max-w-none sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="w-full px-8 shadow-none hover:shadow-none sm:w-auto"
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