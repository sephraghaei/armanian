import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Palette, Home, Globe, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DepartmentsPage = () => {
  const departments = [
    {
      icon: Code,
      title: 'دپارتمان کامپیوتر',
      description: 'آموزش مهارت‌های کامپیوتری و برنامه‌نویسی برای تمام سنین.',
      courses: [
        {
          name: 'ICDL کودکان',
          description: 'آموزش مهارت‌های اولیه کامپیوتر برای کودکان ۶ تا ۱۲ سال',
          duration: '۸ هفته'
        },
        {
          name: 'ICDL بزرگسالان',
          description: 'گواهینامه بین‌المللی مهارت‌های کامپیوتری برای بزرگسالان',
          duration: '۱۰ هفته'
        },
        {
          name: 'برنامه‌نویسی اسکرچ کودکان',
          description: 'آموزش برنامه‌نویسی بصری با اسکرچ برای کودکان',
          duration: '۱۲ هفته'
        },
        {
          name: 'برنامه‌نویسی پایتون نوجوانان',
          description: 'آموزش زبان برنامه‌نویسی پایتون برای نوجوانان',
          duration: '۱۴ هفته'
        },
        {
          name: 'برنامه‌نویسی پایتون بزرگسالان',
          description: 'دوره حرفه‌ای برنامه‌نویسی پایتون برای بزرگسالان',
          duration: '۱۶ هفته'
        }
      ]
    },
    {
      icon: Palette,
      title: 'دپارتمان گرافیک',
      description: 'آموزش طراحی گرافیک و نرم‌افزارهای طراحی حرفه‌ای.',
      courses: [
        {
          name: 'فتوشاپ نوجوانان',
          description: 'آموزش فتوشاپ برای نوجوانان با پروژه‌های خلاقانه',
          duration: '۱۰ هفته'
        },
        {
          name: 'فتوشاپ بزرگسالان',
          description: 'دوره حرفه‌ای فتوشاپ برای بزرگسالان',
          duration: '۱۲ هفته'
        },
        {
          name: 'افترافکت بزرگسالان',
          description: 'آموزش انیمیشن و جلوه‌های ویژه با افترافکت',
          duration: '۱۴ هفته'
        }
      ]
    },
    {
      icon: Home,
      title: 'دپارتمان معماری',
      description: 'آموزش طراحی معماری و نرم‌افزارهای تخصصی ساختمان.',
      courses: [
        {
          name: 'طراحی داخلی معماری',
          description: 'آموزش اصول طراحی داخلی و دکوراسیون',
          duration: '۱۲ هفته'
        },
        {
          name: 'نرم‌افزارهای معماری',
          description: 'آموزش اسکچاپ، اتوکد و تریدی مکس',
          duration: '۱۶ هفته'
        },
        {
          name: 'نقشه‌کشی معماری',
          description: 'آموزش اصول نقشه‌کشی و طراحی نقشه‌های فنی',
          duration: '۱۰ هفته'
        },
        {
          name: 'اسکیس و راندو',
          description: 'آموزش تکنیک‌های اسکیس و ارائه طرح',
          duration: '۸ هفته'
        }
      ]
    },
    {
      icon: Globe,
      title: 'دپارتمان زبان انگلیسی',
      description: 'آموزش زبان انگلیسی با روش‌های مدرن و تکنولوژی.',
      courses: [
        {
          name: 'آموزش زبان با کامپیوتر',
          description: 'آموزش زبان انگلیسی با نرم‌افزارهای تعاملی',
          duration: '۱۲ هفته'
        },
        {
          name: 'آموزش زبان ترمیک',
          description: 'آموزش زبان انگلیسی با روش ترمیک',
          duration: '۱۰ هفته'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              دپارتمان‌های آموزشی
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              طیف جامعی از دپارتمان‌های تخصصی ما را که برای آموزش مهارت‌های فنی و حرفه‌ای 
              طراحی شده‌اند، کاوش کنید.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gradient-hero rounded-2xl p-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center ml-4">
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{dept.title}</h2>
                    <p className="text-muted-foreground">{dept.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dept.courses.map((course, courseIndex) => (
                    <Card key={courseIndex} className="hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <CardTitle className="text-lg text-foreground">{course.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-primary font-medium">مدت: {course.duration}</span>
                        </div>
                        <Button variant="outline" className="w-full group">
                          ثبت نام
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-card rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                آماده شروع هستید؟
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                با متخصصان ما تماس بگیرید تا بهترین دپارتمان متناسب با علایق و نیازهای خود را انتخاب کنید.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  مشاوره رایگان
                </Button>
                <Button variant="outline" size="lg">
                  اطلاعات بیشتر
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepartmentsPage;