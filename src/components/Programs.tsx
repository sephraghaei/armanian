import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Star } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      title: 'کاوشگر مبتدی',
      description: 'گام اول کامل به دنیای برنامه‌نویسی برای فراگیران جوان.',
      price: '۱,۲۰۰,۰۰۰ تومان',
      duration: '۸ هفته',
      level: 'مبتدی',
      ages: '۶-۹ سال',
      classSize: '۸ دانشجو',
      features: [
        'برنامه‌نویسی بصری Scratch',
        'مهارت‌های اولیه کامپیوتر',
        'حل مسائل خلاقانه',
        'بازی‌ها و پروژه‌های تعاملی',
        'گواهی تکمیل دوره'
      ],
      popular: false
    },
    {
      title: 'ماجراجوی کد',
      description: 'دوره جامع برنامه‌نویسی برای کدنویسان جوان متوسط.',
      price: '۲,۰۰۰,۰۰۰ تومان',
      duration: '۱۲ هفته',
      level: 'متوسط',
      ages: '۱۰-۱۳ سال',
      classSize: '۱۰ دانشجو',
      features: [
        'مبانی برنامه‌نویسی Python',
        'آشنایی با توسعه وب',
        'پروژه‌های توسعه بازی',
        'مهارت‌های کار تیمی',
        'ایجاد نمونه کارها',
        'جلسات منتورشیپ صنعتی'
      ],
      popular: true
    },
    {
      title: 'توسعه‌دهنده آینده',
      description: 'برنامه پیشرفته آماده‌سازی نوجوانان برای توسعه واقعی.',
      price: '۳,۰۰۰,۰۰۰ تومان',
      duration: '۱۶ هفته',
      level: 'پیشرفته',
      ages: '۱۴-۱۶ سال',
      classSize: '۶ دانشجو',
      features: [
        'توسعه وب فول‌استک',
        'توسعه اپلیکیشن موبایل',
        'آشنایی با AI و یادگیری ماشین',
        'پروژه‌های مشتری واقعی',
        'فرصت‌های کارآموزی',
        'آماده‌سازی دانشگاهی',
        'گواهینامه ICDL'
      ],
      popular: false
    }
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            مسیر یادگیری خود را انتخاب کنید
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            برنامه‌های ساختارمندی که کودک شما را از کنجکاوی کدنویسی به سازنده‌ای با اعتماد به نفس تبدیل می‌کند. 
            هر مسیر به دقت برای گروه‌های سنی و سطوح مهارت مختلف طراحی شده است.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className={`relative hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 ${program.popular ? 'border-primary shadow-glow-primary' : ''}`}>
              {program.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-primary text-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    محبوب‌ترین
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl text-foreground">{program.title}</CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{program.price}</div>
                    <div className="text-sm text-muted-foreground">هر دوره</div>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground">
                  {program.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.classSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.ages}</span>
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">شامل موارد:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={program.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {program.popular ? "شروع یادگیری" : "انتخاب دوره"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-gradient-hero rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            هنوز مطمئن نیستید؟
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            جلسه مشاوره رایگان با متخصصان آموزشی ما رزرو کنید تا بهترین برنامه متناسب با علایق و سطح مهارت فرزندتان را پیدا کنید.
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
  );
};

export default Programs;