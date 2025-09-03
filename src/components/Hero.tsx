import { Button } from '@/components/ui/button';
import { Code, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-coding.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/auth');
  };
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
        {/* Content - Full Width */}
        <div className="text-center space-y-12 mb-20">
          {/* Wave Element */}
          <div className="absolute inset-x-0 bottom-0 overflow-hidden">
            <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z" 
                fill="hsl(var(--primary) / 0.1)"
                className="animate-pulse"
              />
              <path 
                d="M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,80 L1200,120 L0,120 Z" 
                fill="hsl(var(--accent) / 0.08)"
                className="animate-pulse delay-1000"
              />
            </svg>
          </div>
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight max-w-5xl mx-auto mb-6">
              آرمانیان
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
                آموزشگاه آزاد فنی و حرفه‌ای
              </h2>
              <h3 className="text-2xl md:text-4xl font-semibold bg-gradient-primary bg-clip-text text-transparent leading-relaxed max-w-4xl mx-auto">
                مهارت‌های آینده را بیاموزید
              </h3>
            </div>
            
            <div className="pt-4">
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                آموزش تخصصی کامپیوتر، گرافیک، معماری و زبان انگلیسی برای تمام سنین. 
                از کودکان تا بزرگسالان، مهارت‌های فنی و حرفه‌ای مورد نیاز بازار کار را کسب کنید.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Button variant="hero" size="lg" className="group" onClick={handleSignUp}>
              امروز شروع کنید
              <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/courses">
                مشاهده دوره‌ها
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">۵۰۰+</div>
              <div className="text-sm md:text-base text-muted-foreground">دانشجوی خوشحال</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">۱۵+</div>
              <div className="text-sm md:text-base text-muted-foreground">معلم متخصص</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">۱۲</div>
              <div className="text-sm md:text-base text-muted-foreground">دوره آموزشی</div>
            </div>
          </div>
        </div>

        {/* Image - Below Text */}
        <div className="relative max-w-4xl mx-auto mt-16">
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