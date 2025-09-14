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
      {/* Smooth Flowing Wave Backgrounds */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary-wave))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--accent-wave))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Smooth bottom waves */}
          <path d="M0,200 C240,140 360,260 600,200 C840,140 960,260 1200,200 L1200,800 L0,800 Z" 
                fill="url(#waveGradient1)" 
                className="opacity-80" 
                style={{
                  animation: 'wave 8s ease-in-out infinite',
                  animationDelay: '0s'
                }} />
          
          <path d="M0,320 C180,240 420,380 660,300 C900,220 1080,360 1200,300 L1200,800 L0,800 Z" 
                fill="url(#waveGradient2)" 
                className="opacity-70" 
                style={{
                  animation: 'wave 12s ease-in-out infinite reverse',
                  animationDelay: '2s'
                }} />
          
          <path d="M0,440 C300,360 500,520 800,440 C1000,360 1100,480 1200,440 L1200,800 L0,800 Z" 
                fill="url(#waveGradient3)" 
                className="opacity-60" 
                style={{
                  animation: 'waveFlow 10s ease-in-out infinite',
                  animationDelay: '4s'
                }} />
        </svg>
        
        {/* Subtle top waves */}
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M0,100 C300,40 600,160 900,100 C1050,70 1150,130 1200,100 L1200,0 L0,0 Z" 
                fill="hsl(var(--accent) / 0.04)" 
                className="opacity-50" 
                style={{
                  animation: 'wave 14s ease-in-out infinite reverse',
                  animationDelay: '1s'
                }} />
          
          <path d="M0,180 C200,120 500,240 800,180 C1000,120 1100,200 1200,180 L1200,0 L0,0 Z" 
                fill="hsl(var(--primary) / 0.03)" 
                className="opacity-40" 
                style={{
                  animation: 'waveFlow 16s ease-in-out infinite',
                  animationDelay: '3s'
                }} />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
        {/* Content - Full Width */}
        <div className="text-center space-y-12 mb-20">
          <div className="space-y-8">
          <h1 className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-extrabold text-primary leading-tight max-w-5xl mx-auto mb-8 tracking-tight">
              آرمانیان
          </h1>
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto">
                آموزشگاه آزاد فنی و حرفه‌ای کامپیوتر و معماری
              </h2>
            </div>
            
            <div className="pt-6">
              <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-medium">
                مسیر آینده از آرمانیان می گذرد ...
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Button variant="hero" size="lg" className="group" onClick={handleSignUp}>
              همین امروز شروع کن
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