import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Palette, Home, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DepartmentsPage = () => {
  const navigate = useNavigate();
  
  const handleSignUp = () => {
    navigate('/auth');
  };
  const departments = [
    {
      icon: Code,
      title: 'دپارتمان کامپیوتر',
      description: 'آموزش مهارت‌های کامپیوتری و برنامه‌نویسی برای تمام سنین.',
      courses: [
        {
          name: 'ICDL کودکان',
          slug: 'icdl-kids',
          description: 'آموزش جامع مهارت‌های اولیه کامپیوتر شامل سیستم عامل، آفیس و امنیت سایبری',
          duration: '۸ هفته',
          instructor: 'سیمین آقایی',
          ageGroup: '۶ تا ۱۲ سال',
          price: '۱,۵۰۰,۰۰۰ تومان'
        },
        {
          name: 'ICDL بزرگسالان',
          slug: 'icdl-adults',
          description: 'گواهینامه بین‌المللی شامل تمامی ماژول‌های ICDL و آمادگی آزمون',
          duration: '۱۰ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۸ سال به بالا',
          price: '۲,۲۰۰,۰۰۰ تومان'
        },
        {
          name: 'برنامه‌نویسی اسکرچ کودکان',
          slug: 'scratch-kids',
          description: 'یادگیری برنامه‌نویسی بصری، ساخت بازی و انیمیشن‌های تعاملی',
          duration: '۱۲ هفته',
          instructor: 'سیمین آقایی',
          ageGroup: '۸ تا ۱۴ سال',
          price: '۱,۸۰۰,۰۰۰ تومان'
        },
        {
          name: 'برنامه‌نویسی پایتون نوجوانان',
          slug: 'python-teens',
          description: 'آموزش Python با پروژه‌های عملی و ساخت برنامه‌های کاربردی',
          duration: '۱۴ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۳ تا ۱۷ سال',
          price: '۲,۵۰۰,۰۰۰ تومان'
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
          slug: 'photoshop-teens',
          description: 'طراحی پوستر، ویرایش تصاویر و ساخت آثار هنری دیجیتال',
          duration: '۱۰ هفته',
          instructor: 'سیمین آقایی',
          ageGroup: '۱۲ تا ۱۷ سال',
          price: '۲,۰۰۰,۰۰۰ تومان'
        },
        {
          name: 'فتوشاپ بزرگسالان',
          slug: 'photoshop-adults',
          description: 'تکنیک‌های حرفه‌ای طراحی گرافیک و ویرایش تصاویر پیشرفته',
          duration: '۱۲ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۸ سال به بالا',
          price: '۲,۸۰۰,۰۰۰ تومان'
        },
        {
          name: 'افترافکت بزرگسالان',
          slug: 'after-effects',
          description: 'انیمیشن، جلوه‌های ویژه و موشن گرافیک حرفه‌ای',
          duration: '۱۴ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۸ سال به بالا',
          price: '۳,۵۰۰,۰۰۰ تومان'
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
          slug: 'interior-design',
          description: 'اصول طراحی داخلی، دکوراسیون و چیدمان فضا',
          duration: '۱۲ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۸ سال به بالا',
          price: '۳,۰۰۰,۰۰۰ تومان'
        },
        {
          name: 'نرم‌افزارهای معماری',
          slug: 'architecture-software',
          description: 'اسکچاپ، اتوکد، تریدی مکس و رندرگیری حرفه‌ای',
          duration: '۱۶ هفته',
          instructor: 'سیمین آقایی',
          ageGroup: '۱۸ سال به بالا',
          price: '۴,۰۰۰,۰۰۰ تومان'
        },
        {
          name: 'نقشه‌کشی معماری',
          slug: 'architectural-drawing',
          description: 'اصول نقشه‌کشی، طراحی نقشه‌های فنی و جزئیات اجرایی',
          duration: '۱۰ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۸ سال به بالا',
          price: '۲,۵۰۰,۰۰۰ تومان'
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
          slug: 'english-computer',
          description: 'زبان انگلیسی با نرم‌افزارهای تعاملی و تکنولوژی نوین',
          duration: '۱۲ هفته',
          instructor: 'سیمین آقایی',
          ageGroup: '۱۰ سال به بالا',
          price: '۱,۶۰۰,۰۰۰ تومان'
        },
        {
          name: 'آموزش زبان ترمیک',
          slug: 'english-thermic',
          description: 'روش نوین ترمیک برای یادگیری سریع و مؤثر زبان انگلیسی',
          duration: '۱۰ هفته',
          instructor: 'مهدی محمدی',
          ageGroup: '۱۵ سال به بالا',
          price: '۱,۴۰۰,۰۰۰ تومان'
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
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">مدت دوره:</span>
                            <span className="text-primary font-medium">{course.duration}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">مدرس:</span>
                            <span className="font-medium">{course.instructor}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">سن:</span>
                            <span className="text-sm">{course.ageGroup}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">هزینه:</span>
                            <span className="font-bold text-primary">{course.price}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 group" onClick={handleSignUp}>
                            ثبت نام
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="flex-1"
                            onClick={() => navigate(`/course/${course.slug}`)}
                          >
                            بیشتر بدانید
                          </Button>
                        </div>
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