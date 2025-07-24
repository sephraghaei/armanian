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
        {/* Content - Full Width */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-reverse space-x-2 text-accent">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">به آینده خوش آمدید</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight max-w-4xl mx-auto mb-4">
              آرمانیان
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
              آموزشگاه آزاد فنی و حرفه‌ای
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                مهارت‌های آینده را بیاموزید
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              آموزش تخصصی کامپیوتر، گرافیک، معماری و زبان انگلیسی برای تمام سنین. 
              از کودکان تا بزرگسالان، مهارت‌های فنی و حرفه‌ای مورد نیاز بازار کار را کسب کنید.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href="#contact">
                امروز شروع کنید
                <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/courses">
                مشاهده دوره‌ها
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
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

        {/* Image - Below Text */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="کودکان در حال یادگیری برنامه‌نویسی در کلاس مدرن"
              className="w-full h-[400px] md:h-[500px] object-cover"
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
    </section>
  );
};

export default Hero;