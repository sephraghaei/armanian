import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Programs = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/auth');
  };

  const programs = [
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
        'فتوشاپ مقدماتی',
        'آموزش زبان تعاملی',
        'گواهی تکمیل دوره'
      ],
      popular: false
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
      popular: true
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
      popular: false
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-transparent via-background/30 to-transparent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 animate-bounce-in">
            مسیر یادگیری خود را انتخاب کنید
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            برنامه‌های ساختارمندی که فراگیران را در گروه‌های سنی مختلف به متخصصین آینده تبدیل می‌کند. 
            هر مسیر به دقت برای نیازهای ویژه هر رده سنی طراحی شده است.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className={`relative transition-all duration-700 hover:-translate-y-4 hover:rotate-1 border-orange-300/70 hover:shadow-[0_0_50px_hsl(28_92%_56%_/_0.4)] ${program.popular ? 'border-2 animate-glow' : 'border'} bg-white/95 hover:bg-white animate-slide-in-up`} style={{ animationDelay: `${index * 0.3}s` }}>
              
              {program.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-4 py-1 animate-heartbeat">
                    محبوب ترین
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-foreground mb-2 group-hover:text-orange-600 transition-colors duration-300">{program.title}</CardTitle>
                <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {program.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-reverse space-x-2 hover:scale-105 transition-transform duration-300">
                    <Clock className="w-4 h-4 animate-heartbeat" style={{ color: 'hsl(28,92%,56%)' }} />
                    <span className="text-muted-foreground">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 hover:scale-105 transition-transform duration-300">
                    <Users className="w-4 h-4 animate-heartbeat" style={{ color: 'hsl(28,92%,56%)' }} />
                    <span className="text-muted-foreground">{program.classSize}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 hover:scale-105 transition-transform duration-300">
                    <Trophy className="w-4 h-4 animate-heartbeat" style={{ color: 'hsl(28,92%,56%)' }} />
                    <span className="text-muted-foreground">{program.level}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 hover:scale-105 transition-transform duration-300">
                    <Star className="w-4 h-4 animate-heartbeat" style={{ color: 'hsl(28,92%,56%)' }} />
                    <span className="text-muted-foreground">{program.ages}</span>
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="font-extrabold text-foreground mb-3">شامل موارد:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-reverse space-x-2 text-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 animate-heartbeat" style={{ backgroundColor: 'hsl(28,92%,56%)' }}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="default" 
                  className="w-full group hover-scale transition-all duration-500 text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/25"
                  style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}
                  size="lg"
                  onClick={handleSignUp}
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-105">انتخاب دوره</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Programs;