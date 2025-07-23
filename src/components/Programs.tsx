import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Star } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      title: 'دوره‌های کودکان',
      description: 'برنامه‌های آموزشی ویژه کودکان با روش‌های بازی محور.',
      price: '۱,۲۰۰,۰۰۰ تومان',
      duration: '۸ هفته',
      level: 'مبتدی',
      ages: '۶-۱۲ سال',
      classSize: '۸ دانشجو',
      features: [
        'ICDL کودکان',
        'برنامه‌نویسی اسکرچ',
        'فتوشاپ مقدماتی',
        'آموزش زبان تعاملی',
        'گواهی تکمیل دوره'
      ],
      popular: false
    },
    {
      title: 'دوره‌های نوجوانان',
      description: 'برنامه‌های تخصصی برای نوجوانان با پروژه‌های عملی.',
      price: '۲,۰۰۰,۰۰۰ تومان',
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
      popular: true
    },
    {
      title: 'دوره‌های بزرگسالان',
      description: 'برنامه‌های حرفه‌ای برای بزرگسالان و ارتقای مهارت شغلی.',
      price: '۳,۰۰۰,۰۰۰ تومان',
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
            برنامه‌های ساختارمندی که فراگیران را در گروه‌های سنی مختلف به متخصصین آینده تبدیل می‌کند. 
            هر مسیر به دقت برای نیازهای ویژه هر رده سنی طراحی شده است.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className={`relative hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 ${program.popular ? 'border-primary shadow-glow-primary' : ''}`}>
              {program.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-primary text-white">
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
            جلسه مشاوره رایگان با متخصصان آموزشی ما رزرو کنید تا بهترین برنامه متناسب با علایق و سن فرزندتان را پیدا کنید.
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