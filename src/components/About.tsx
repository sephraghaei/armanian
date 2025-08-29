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

      </div>
    </section>
  );
};

export default About;