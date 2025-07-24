import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Star, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CoursesPage = () => {
  const courses = [
    {
      title: 'دوره‌های کودکان',
      description: 'برنامه‌های آموزشی ویژه کودکان با روش‌های بازی محور.',
      duration: '۸ هفته',
      level: 'مبتدی',
      ages: '۶-۱۲ سال',
      classSize: '۸ دانشجو',
      features: [
        'ICDL کودکان',
        'برنامه‌نویسی اسکرچ',
        'آموزش مهارت‌های اولیه کامپیوتر',
        'بازی‌ها و پروژه‌های تعاملی',
        'گواهی تکمیل دوره'
      ],
      popular: false,
      detailedDescription: 'این دوره ویژه کودکان طراحی شده که تازه وارد دنیای فناوری می‌شوند. با استفاده از روش‌های بازی محور، کودکان اصول اولیه کامپیوتر و برنامه‌نویسی را به صورت شاد و جذاب فرا می‌گیرند.',
      whatYoullLearn: [
        'آشنایی با کامپیوتر و قطعات آن',
        'یادگیری برنامه‌نویسی بصری',
        'حل مسئله با بازی',
        'خلاقیت و تفکر منطقی'
      ]
    },
    {
      title: 'دوره‌های نوجوانان',
      description: 'برنامه‌های تخصصی برای نوجوانان با پروژه‌های عملی.',
      duration: '۱۲ هفته',
      level: 'متوسط',
      ages: '۱۳-۱۷ سال',
      classSize: '۱۰ دانشجو',
      features: [
        'برنامه‌نویسی پایتون',
        'فتوشاپ نوجوانان',
        'طراحی معماری مقدماتی',
        'پروژه‌های گروهی',
        'نمونه کار حرفه‌ای',
        'آماده‌سازی دانشگاهی'
      ],
      popular: true,
      detailedDescription: 'محبوب‌ترین دوره ما که نوجوانان را به سطح متوسط ارتقا می‌دهد. این دوره شامل پروژه‌های عملی و کار تیمی است که تجربه واقعی کار با فناوری را فراهم می‌کند.',
      whatYoullLearn: [
        'برنامه‌نویسی با پایتون',
        'طراحی گرافیک با فتوشاپ',
        'اصول طراحی معماری',
        'کار در تیم و مهارت‌های ارتباطی'
      ]
    },
    {
      title: 'دوره‌های بزرگسالان',
      description: 'برنامه‌های حرفه‌ای برای بزرگسالان و ارتقای مهارت شغلی.',
      duration: '۱۶ هفته',
      level: 'پیشرفته',
      ages: '۱۸+ سال',
      classSize: '۶ دانشجو',
      features: [
        'ICDL بزرگسالان',
        'برنامه‌نویسی پایتون پیشرفته',
        'فتوشاپ و افترافکت حرفه‌ای',
        'نرم‌افزارهای معماری کامل',
        'آموزش زبان ترمیک',
        'مهارت‌های شغلی',
        'گواهینامه‌های معتبر'
      ],
      popular: false,
      detailedDescription: 'دوره پیشرفته ما برای بزرگسالانی که به دنبال ارتقای مهارت‌های شغلی خود هستند. شامل آموزش‌های کاربردی و مهارت‌های مورد نیاز بازار کار.',
      whatYoullLearn: [
        'مهارت‌های کامپیوتری پیشرفته',
        'برنامه‌نویسی حرفه‌ای',
        'طراحی گرافیک و انیمیشن',
        'نرم‌افزارهای معماری و مهندسی'
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
              دوره‌های آموزشی
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              مسیر یادگیری خود را انتخاب کنید. برنامه‌های ساختارمندی که فراگیران را در گروه‌های سنی مختلف 
              به متخصصین آینده تبدیل می‌کند.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {courses.map((course, index) => (
              <Card key={index} className={`relative hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 ${course.popular ? 'border-primary shadow-glow-primary' : ''}`}>
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="bg-gradient-primary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      محبوب‌ترین
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-foreground mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{course.classSize}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{course.level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{course.ages}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">شامل موارد:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant={course.popular ? "hero" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    {course.popular ? "شروع یادگیری" : "انتخاب دوره"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Course Information */}
          <div className="space-y-12">
            {courses.map((course, index) => (
              <div key={index} className="bg-gradient-hero rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                      {course.title}
                      {course.popular && (
                        <Badge variant="default" className="bg-gradient-primary text-white mr-2">
                          محبوب
                        </Badge>
                      )}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {course.detailedDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="hero" size="lg">
                        ثبت نام در دوره
                      </Button>
                      <Button variant="outline" size="lg">
                        اطلاعات بیشتر
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">چیزهایی که یاد خواهید گرفت:</h4>
                    <ul className="space-y-3">
                      {course.whatYoullLearn.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-card rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              هنوز مطمئن نیستید؟
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              جلسه مشاوره رایگان با متخصصان آموزشی ما رزرو کنید تا بهترین برنامه متناسب با علایق و نیازهای خود را پیدا کنید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                رزرو مشاوره رایگان
              </Button>
              <Button variant="outline" size="lg">
                دانلود بروشور
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;