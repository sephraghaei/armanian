import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Palette, Home, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/departments');
  };

  const departments = [
    {
      icon: Code,
      title: 'دپارتمان کامپیوتر',
      description: 'آموزش مهارت‌های کامپیوتری و برنامه‌نویسی برای تمام سنین.',
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
      courses: [
        'آموزش زبان با کامپیوتر',
        'آموزش زبان ترمیک'
      ]
    }
  ];

  return (
    <section id="departments" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            دپارتمان‌های آموزشی
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای طراحی شده‌اند، کاوش کنید.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <Card key={index} className="group hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 border-border/50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <dept.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {dept.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {dept.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">دوره‌های ارائه شده:</h4>
                  <ul className="space-y-1">
                    {dept.courses.map((course, idx) => (
                      <li key={idx} className="flex items-center space-x-reverse space-x-1 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button variant="default" className="w-full group hover-scale hover:shadow-glow-primary transition-all duration-300" onClick={handleLearnMore}>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">بیشتر بدانید</span>
                  <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
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