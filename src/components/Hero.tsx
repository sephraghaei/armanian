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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Beautiful Animated Wave Backgrounds */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        
        {/* Bottom flowing waves */}
        <path d="M0,180 C300,120 500,220 800,160 C1000,120 1100,200 1200,180 L1200,800 L0,800 Z" 
              fill="url(#waveGradient1)" className="animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}} />
        
        <path d="M0,280 C200,200 400,320 700,240 C900,180 1050,300 1200,260 L1200,800 L0,800 Z" 
              fill="url(#waveGradient2)" className="animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}} />
        
        <path d="M0,380 C350,300 600,420 900,360 C1050,320 1150,400 1200,380 L1200,800 L0,800 Z" 
              fill="url(#waveGradient3)" className="animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}} />
        
        <path d="M0,480 C250,400 450,520 750,460 C950,420 1100,500 1200,480 L1200,800 L0,800 Z" 
              fill="hsl(var(--primary) / 0.04)" className="animate-pulse" style={{animationDelay: '3s', animationDuration: '7s'}} />
      </svg>
      
      {/* Top flowing waves */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path d="M0,120 C400,60 600,180 1000,100 C1100,80 1150,140 1200,120 L1200,0 L0,0 Z" 
              fill="hsl(var(--accent) / 0.06)" className="animate-pulse" style={{animationDelay: '1.5s', animationDuration: '5s'}} />
        
        <path d="M0,220 C300,140 550,280 850,200 C1000,160 1100,240 1200,220 L1200,0 L0,0 Z" 
              fill="hsl(var(--primary) / 0.04)" className="animate-pulse" style={{animationDelay: '2.5s', animationDuration: '6s'}} />
        
        <path d="M0,80 C250,20 500,120 800,60 C1000,20 1150,100 1200,80 L1200,0 L0,0 Z" 
              fill="hsl(var(--accent) / 0.03)" className="animate-pulse" style={{animationDelay: '0.5s', animationDuration: '4s'}} />
      </svg>

      <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
        {/* Content - Full Width */}
        <div className="text-center space-y-12 mb-20">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-primary leading-tight max-w-5xl mx-auto mb-8 tracking-tight">
              آرمانیان
            </h1>
            
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto">
                آموزشگاه آزاد فنی و حرفه‌ای
              </h2>
            </div>
            
            <div className="pt-6">
              <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-medium">
                جایی که رویاها به مهارت تبدیل می‌شوند و استعدادها شکوفا می‌گردند
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