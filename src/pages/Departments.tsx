import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Gamepad2, Palette, Globe, Brain, Monitor, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DepartmentsPage = () => {
  const departments = [
    {
      icon: Code,
      title: 'مبانی برنامه‌نویسی',
      description: 'یادگیری اصول کدنویسی با زبان‌های برنامه‌نویسی Python، JavaScript و Scratch.',
      age: '۸-۱۶ سال',
      duration: '۱۲ هفته',
      highlights: ['برنامه‌نویسی بصری', 'کدنویسی متنی', 'حل مسئله', 'منطق سازی'],
      fullDescription: 'در این دوره، دانش‌آموزان با مبانی برنامه‌نویسی آشنا می‌شوند و مهارت‌های حل مسئله خود را توسعه می‌دهند. از برنامه‌نویسی بصری Scratch شروع کرده و به تدریج به زبان‌های متنی می‌پردازند.'
    },
    {
      icon: Gamepad2,
      title: 'توسعه بازی',
      description: 'ساخت بازی‌های شگفت‌انگیز با استفاده از Unity، Roblox و سایر پلتفرم‌های توسعه بازی.',
      age: '۱۰-۱۶ سال',
      duration: '۱۶ هفته',
      highlights: ['بازی‌های ۲D/۳D', 'طراحی بازی', 'انیمیشن شخصیت', 'طراحی مرحله'],
      fullDescription: 'دانش‌آموزان در این بخش یاد می‌گیرند که چگونه بازی‌های جذاب و تعاملی بسازند. از طراحی شخصیت‌ها گرفته تا ساخت مراحل چالش‌برانگیز، همه چیز در این دوره پوشش داده می‌شود.'
    },
    {
      icon: Globe,
      title: 'توسعه وب',
      description: 'ساخت وب‌سایت‌ها و اپلیکیشن‌های وب با استفاده از HTML، CSS و JavaScript.',
      age: '۱۲-۱۶ سال',
      duration: '۱۴ هفته',
      highlights: ['HTML/CSS', 'JavaScript', 'طراحی ریسپانسیو', 'انتشار وب'],
      fullDescription: 'این دوره به دانش‌آموزان کمک می‌کند تا وب‌سایت‌های حرفه‌ای و ریسپانسیو بسازند. از مبانی HTML و CSS شروع کرده و با JavaScript به وب‌سایت‌های تعاملی دست پیدا می‌کنند.'
    },
    {
      icon: Palette,
      title: 'طراحی دیجیتال',
      description: 'یادگیری طراحی گرافیک، اصول UI/UX و هنر دیجیتال خلاقانه.',
      age: '۱۰-۱۶ سال',
      duration: '۱۰ هفته',
      highlights: ['طراحی گرافیک', 'مبانی UI/UX', 'هنر دیجیتال', 'ابزارهای خلاقانه'],
      fullDescription: 'در این بخش، خلاقیت و هنر با فناوری ترکیب می‌شود. دانش‌آموزان با ابزارهای طراحی آشنا شده و مهارت‌های بصری خود را پرورش می‌دهند.'
    },
    {
      icon: Brain,
      title: 'هوش مصنوعی و یادگیری ماشین',
      description: 'آشنایی با مفاهیم هوش مصنوعی و یادگیری ماشین برای کودکان.',
      age: '۱۳-۱۶ سال',
      duration: '۱۲ هفته',
      highlights: ['مبانی AI', 'علم داده', 'یادگیری ماشین', 'فناوری آینده'],
      fullDescription: 'این دوره پیشرفته، دانش‌آموزان را با فناوری‌های آینده آشنا می‌کند. آن‌ها یاد می‌گیرند که چگونه ماشین‌ها می‌توانند یاد بگیرند و تصمیم‌گیری کنند.'
    },
    {
      icon: Monitor,
      title: 'گواهینامه ICDL',
      description: 'گواهینامه بین‌المللی رانندگی کامپیوتر - گواهی مهارت‌های دیجیتال ضروری.',
      age: '۸-۱۶ سال',
      duration: '۸ هفته',
      highlights: ['مبانی کامپیوتر', 'برنامه‌های آفیس', 'امنیت اینترنت', 'سواد دیجیتال'],
      fullDescription: 'گواهینامه ICDL به دانش‌آموزان مهارت‌های پایه‌ای کامپیوتر را آموزش می‌دهد که در دنیای امروز ضروری است. این گواهینامه بین‌المللی شناخته شده است.'
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
              بخش‌های آموزشی
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              طیف جامعی از دوره‌های فناوری و برنامه‌نویسی ما را که برای الهام بخشیدن 
              و آموزش ذهن‌های جوان طراحی شده‌اند، کاوش کنید.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="group hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 border-border/50">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {dept.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {dept.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-accent font-medium">سن: {dept.age}</span>
                    <span className="text-primary font-medium">مدت: {dept.duration}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">چیزهایی که یاد خواهید گرفت:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {dept.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {dept.fullDescription}
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full group">
                    ثبت نام در این بخش
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-hero rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                آماده شروع هستید؟
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                با متخصصان ما تماس بگیرید تا بهترین بخش متناسب با علایق و سطح مهارت فرزندتان را انتخاب کنید.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  مشاوره رایگان
                </Button>
                <Button variant="outline" size="lg">
                  مشاهده دوره‌ها
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