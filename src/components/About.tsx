import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, Lightbulb } from 'lucide-react';
import successImage from '@/assets/success-students.jpg';
import facilityImage from '@/assets/facility-exterior.jpg';

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
    <section id="about" className="py-20 bg-transparent">
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

        {/* Success Stories Section with Image */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src={successImage} 
              alt="دانشجویان موفق آرمانیان"
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl"></div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              داستان‌های موفقیت ما
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              بیش از ۵۰۰ دانشجوی خوشحال و موفق که مهارت‌های آینده را در آرمانیان فرا گرفته‌اند. 
              از کودکان که اولین خط کد خود را نوشته‌اند تا بزرگسالانی که مسیر شغلی جدیدی آغاز کرده‌اند.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card rounded-xl border">
                <div className="text-2xl font-bold text-primary">۵۰۰+</div>
                <div className="text-sm text-muted-foreground">دانشجوی فارغ‌التحصیل</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border">
                <div className="text-2xl font-bold text-accent">۹۵٪</div>
                <div className="text-sm text-muted-foreground">رضایت والدین</div>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Section with Image */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              امکانات مدرن و استاندارد
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              محیط یادگیری مجهز به جدیدترین تجهیزات و فناوری‌های روز دنیا. 
              کلاس‌های هوشمند، رایانه‌های مدرن و فضای الهام‌بخش برای رشد خلاقیت.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-reverse space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">کلاس‌های مجهز به تکنولوژی مدرن</span>
              </li>
              <li className="flex items-center space-x-reverse space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">محیط یادگیری ایمن و دوستانه</span>
              </li>
              <li className="flex items-center space-x-reverse space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">دسترسی آسان و پارکینگ رایگان</span>
              </li>
            </ul>
          </div>
          <div className="relative order-1 md:order-2">
            <img 
              src={facilityImage} 
              alt="ساختمان آموزشگاه آرمانیان"
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-accent/20 rounded-2xl"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;