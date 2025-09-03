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
      {/* Beautiful Wave Animations */}
      <div className="absolute inset-0">
        {/* Multiple Wave Layers */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {/* Wave Layer 1 */}
          <path 
            d="M0,100 C300,50 600,150 900,100 C1050,75 1150,125 1200,100 L1200,0 L0,0 Z" 
            fill="hsl(var(--primary) / 0.1)"
            className="animate-pulse"
          />
          {/* Wave Layer 2 */}
          <path 
            d="M0,200 C300,150 600,250 900,200 C1050,175 1150,225 1200,200 L1200,0 L0,0 Z" 
            fill="hsl(var(--accent) / 0.08)"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          {/* Wave Layer 3 */}
          <path 
            d="M0,300 C300,250 600,350 900,300 C1050,275 1150,325 1200,300 L1200,0 L0,0 Z" 
            fill="hsl(var(--primary) / 0.06)"
            className="animate-pulse"
            style={{animationDelay: '2s'}}
          />
          
          {/* Bottom Waves */}
          <path 
            d="M0,700 C300,650 600,750 900,700 C1050,675 1150,725 1200,700 L1200,800 L0,800 Z" 
            fill="hsl(var(--accent) / 0.1)"
            className="animate-pulse"
            style={{animationDelay: '0.5s'}}
          />
          <path 
            d="M0,600 C300,550 600,650 900,600 C1050,575 1150,625 1200,600 L1200,800 L0,800 Z" 
            fill="hsl(var(--primary) / 0.08)"
            className="animate-pulse"
            style={{animationDelay: '1.5s'}}
          />
          
          {/* Flowing Wave Lines */}
          <path 
            d="M0,150 Q150,100 300,150 T600,150 Q750,100 900,150 T1200,150" 
            stroke="hsl(var(--primary) / 0.4)" 
            strokeWidth="2.5" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M0,250 Q150,200 300,250 T600,250 Q750,200 900,250 T1200,250" 
            stroke="hsl(var(--primary) / 0.3)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M0,320 Q150,270 300,320 T600,320 Q750,270 900,320 T1200,320" 
            stroke="hsl(var(--accent) / 0.35)" 
            strokeWidth="1.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.7s'}}
          />
          <path 
            d="M0,350 Q150,300 300,350 T600,350 Q750,300 900,350 T1200,350" 
            stroke="hsl(var(--accent) / 0.25)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          <path 
            d="M0,420 Q150,370 300,420 T600,420 Q750,370 900,420 T1200,420" 
            stroke="hsl(var(--primary) / 0.25)" 
            strokeWidth="1.3" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1.3s'}}
          />
          <path 
            d="M0,450 Q150,400 300,450 T600,450 Q750,400 900,450 T1200,450" 
            stroke="hsl(var(--primary) / 0.2)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2s'}}
          />
          <path 
            d="M0,520 Q150,470 300,520 T600,520 Q750,470 900,520 T1200,520" 
            stroke="hsl(var(--accent) / 0.18)" 
            strokeWidth="1.2" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.3s'}}
          />
          <path 
            d="M0,550 Q150,500 300,550 T600,550 Q750,500 900,550 T1200,550" 
            stroke="hsl(var(--accent) / 0.15)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.5s'}}
          />
          <path 
            d="M0,620 Q150,570 300,620 T600,620 Q750,570 900,620 T1200,620" 
            stroke="hsl(var(--primary) / 0.15)" 
            strokeWidth="0.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1.7s'}}
          />
          <path 
            d="M0,680 Q150,630 300,680 T600,680 Q750,630 900,680 T1200,680" 
            stroke="hsl(var(--accent) / 0.12)" 
            strokeWidth="0.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2.3s'}}
          />
        </svg>
        
        {/* Side Waves */}
        <svg className="absolute left-0 top-0 w-32 h-full opacity-30" viewBox="0 0 120 800" preserveAspectRatio="none">
          <path 
            d="M0,0 Q60,100 0,200 T0,400 Q60,500 0,600 T0,800 L120,800 L120,0 Z" 
            fill="hsl(var(--primary) / 0.1)"
            className="animate-pulse"
          />
        </svg>
        
        <svg className="absolute right-0 top-0 w-32 h-full opacity-30" viewBox="0 0 120 800" preserveAspectRatio="none">
          <path 
            d="M120,0 Q60,100 120,200 T120,400 Q60,500 120,600 T120,800 L0,800 L0,0 Z" 
            fill="hsl(var(--accent) / 0.1)"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
        {/* Content - Full Width */}
        <div className="text-center space-y-12 mb-20">
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
      
      {/* Wave Element */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg className="relative block w-full h-20 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z" 
            fill="hsl(var(--primary) / 0.15)"
            className="animate-pulse"
          />
          <path 
            d="M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,80 L1200,120 L0,120 Z" 
            fill="hsl(var(--accent) / 0.1)"
            className="animate-pulse delay-1000"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;