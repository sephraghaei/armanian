import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'ماموریت ما',
      description: 'الهام بخشیدن و آموزش نسل آینده برنامه‌نویسان و نوآوران دیجیتال از طریق تجربیات یادگیری جذاب و متناسب با سن.'
    },
    {
      icon: Users,
      title: 'مربیان متخصص',
      description: 'معلمان مجاز ما تخصص فنی را با دانش رشد کودک ترکیب می‌کنند تا محیط یادگیری کاملی ایجاد کنند.'
    },
    {
      icon: Award,
      title: 'تعالی شناخته شده',
      description: 'برنامه‌های تایید شده و گواهینامه‌های معتبر بین‌المللی از جمله ICDL که کودکان را برای آینده دیجیتال آماده می‌کند.'
    },
    {
      icon: Lightbulb,
      title: 'یادگیری خلاقانه',
      description: 'ما کدنویسی را با خلاقیت ترکیب می‌کنیم و یادگیری را از طریق بازی‌ها، پروژه‌ها و چالش‌های تعاملی که تخیل را برمی‌انگیزد، سرگرم‌کننده می‌کنیم.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            درباره آرمانیان
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ما فراتر از یک مدرسه کدنویسی هستیم. ما جامعه‌ای هستیم که به پرورش استعدادهای جوان، 
            ایجاد اعتماد به نفس و آماده کردن کودکان برای آینده‌ای محور فناوری اختصاص دارد.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 bg-gradient-hero rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                چرا ما را انتخاب کنید؟
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center space-x-reverse space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>برنامه درسی متناسب با سن طراحی شده توسط متخصصان آموزش</span>
                </li>
                <li className="flex items-center space-x-reverse space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>کلاس‌های کوچک برای توجه شخصی</span>
                </li>
                <li className="flex items-center space-x-reverse space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>امکانات مدرن با جدیدترین فناوری</span>
                </li>
                <li className="flex items-center space-x-reverse space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>پیگیری منظم پیشرفت و گزارش به والدین</span>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">۵+</div>
              <div className="text-lg text-muted-foreground mb-4">سال تعالی</div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">۹۵٪</div>
              <div className="text-lg text-muted-foreground">رضایت دانشجویان</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;