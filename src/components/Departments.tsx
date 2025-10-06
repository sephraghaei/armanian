import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Palette, Home, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import computerDeptImage from '@/assets/computer-department.jpg';
import graphicDeptImage from '@/assets/graphic-department.jpg';
import architectureDeptImage from '@/assets/architecture-department.jpg';
import englishDeptImage from '@/assets/english-department.jpg';

const Departments = () => {
  const navigate = useNavigate();

  const handleLearnMore = (departmentName?: string) => {
    if (departmentName === 'کامپیوتر') {
      navigate('/departments#computer');
    } else {
      navigate('/departments');
    }
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            دپارتمان‌های آموزشی
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای طراحی شده‌اند، کاوش کنید.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {departments.map((dept, index) => (
            <AccordionItem key={index} value={`dept-${index}`} className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-foreground">{dept.title}</h3>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {dept.courses.map((course, idx) => (
                    <Card key={idx} className="hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base text-foreground">{course}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 group" onClick={() => handleLearnMore(dept.title.includes('کامپیوتر') ? 'کامپیوتر' : undefined)}>
                            <span className="text-xs">ثبت نام</span>
                            <ArrowRight className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleLearnMore(dept.title.includes('کامپیوتر') ? 'کامپیوتر' : undefined)}>
                            <span className="text-xs">بیشتر بدانید</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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