import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import HomeSearch from './HomeSearch';

const Programs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignUp = () => {
    navigate('/courses');
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

  const filteredPrograms = useMemo(() => {
    if (!searchQuery.trim()) return programs;
    const query = searchQuery.toLowerCase();
    return programs.filter(program => 
      program.title.toLowerCase().includes(query) ||
      program.description.toLowerCase().includes(query) ||
      program.features.some(feature => feature.toLowerCase().includes(query)) ||
      program.level.toLowerCase().includes(query) ||
      program.ages.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-in-up mb-8" style={{ animationDelay: '0.3s' }}>
            دوره‌های تخصصی ما برای هر سن و سطحی طراحی شده‌اند تا شما را از مبتدی به حرفه‌ای تبدیل کنند.
          </p>
          <HomeSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="جستجوی برنامه‌ها..."
          />
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">برنامه‌ای با این مشخصات یافت نشد</p>
          </div>
        ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <Card key={index} className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-primary/20 hover:border-primary/50 ${program.popular ? 'border-2 border-primary/50' : 'border'} bg-card animate-fade-in`} style={{ animationDelay: `${index * 0.15}s` }}>
              
              {program.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1">
                    محبوب ترین
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-foreground mb-2">{program.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {program.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-5 flex-1 flex flex-col">
                {/* Program Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{program.classSize}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{program.level}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{program.ages}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-3">شامل موارد:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-reverse space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="default" 
                  className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300"
                  size="lg"
                  onClick={handleSignUp}
                >
                  انتخاب دوره
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

      </div>
    </section>
  );
};

export default Programs;