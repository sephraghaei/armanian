import { Button } from '@/components/ui/button';
import { Code, Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-coding.jpg';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-right">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-accent">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">به آینده خوش آمدید</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                آموزشگاه آزاد فنی و حرفه‌ای
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  مهارت‌های آینده را بیاموزید
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                آموزش تخصصی کامپیوتر، گرافیک، معماری و زبان انگلیسی برای تمام سنین. 
                از کودکان تا بزرگسالان، مهارت‌های فنی و حرفه‌ای مورد نیاز بازار کار را کسب کنید.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                امروز شروع کنید
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                مشاهده دوره‌ها
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">۵۰۰+</div>
                <div className="text-sm text-muted-foreground">دانشجوی خوشحال</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">۱۵+</div>
                <div className="text-sm text-muted-foreground">معلم متخصص</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">۱۲</div>
                <div className="text-sm text-muted-foreground">دوره آموزشی</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="کودکان در حال یادگیری برنامه‌نویسی در کلاس مدرن"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg animate-bounce">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-lg animate-bounce delay-1000">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;