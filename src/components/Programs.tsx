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
    <section id="programs" className="py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            مسیر یادگیری خود را انتخاب کنید
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            دوره‌های تخصصی ما برای هر سن و سطحی طراحی شده‌اند تا شما را از مبتدی به حرفه‌ای تبدیل کنند.
          </p>

          <div className="mt-8">
            <HomeSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="جستجوی برنامه‌ها..."
            />
          </div>
        </div>


        {filteredPrograms.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">برنامه‌ای با این مشخصات یافت نشد</p>
          </div>
        ) : (
        <div className="mx-auto grid max-w-sm gap-5 sm:max-w-none md:grid-cols-3">
          {filteredPrograms.map((program, index) => (
            <Card
              key={index}
              className={`relative flex h-full flex-col bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lifted ${program.popular ? 'border-foreground/25' : 'border-border'}`}
            >
              {program.popular && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <Badge className="bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                    محبوب‌ترین
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">{program.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {program.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-6">
                {/* Program Details */}
                <div className="grid grid-cols-2 gap-3 border-y border-border py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground/80">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground/80">{program.classSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground/80">{program.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground/80">{program.ages}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">شامل موارد</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="mt-auto w-full shadow-none hover:shadow-none"
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