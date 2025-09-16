import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Departments from '@/components/Departments';
import Programs from '@/components/Programs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Wave Layers - Full Height Coverage */}
      <div className="absolute inset-0 w-full min-h-full pointer-events-none z-0 hidden sm:block">
        {/* Multiple SVG layers for full coverage */}
        <svg 
          className="absolute top-0 left-0 w-full h-screen"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top section waves */}
          <path 
            d="M0,100 Q300,50 600,100 T1200,100 L1200,0 L0,0 Z" 
            fill="hsl(var(--primary) / 0.04)"
            className="animate-pulse"
          />
          <path 
            d="M0,180 Q300,130 600,180 T1200,180 L1200,0 L0,0 Z" 
            fill="hsl(var(--accent) / 0.03)"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          
          {/* Flowing lines */}
          <path 
            d="M0,300 Q150,250 300,300 T600,300 Q750,250 900,300 T1200,300" 
            stroke="hsl(var(--primary) / 0.12)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.5s'}}
          />
          <path 
            d="M0,380 Q150,330 300,380 T600,380 Q750,330 900,380 T1200,380" 
            stroke="hsl(var(--accent) / 0.1)" 
            strokeWidth="1.2" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1.5s'}}
          />
          <path 
            d="M0,460 Q150,410 300,460 T600,460 Q750,410 900,460 T1200,460" 
            stroke="hsl(var(--primary) / 0.08)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2s'}}
          />
          <path 
            d="M0,540 Q150,490 300,540 T600,540 Q750,490 900,540 T1200,540" 
            stroke="hsl(var(--accent) / 0.06)" 
            strokeWidth="0.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.3s'}}
          />
          <path 
            d="M0,620 Q150,570 300,620 T600,620 Q750,570 900,620 T1200,620" 
            stroke="hsl(var(--primary) / 0.05)" 
            strokeWidth="0.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2.5s'}}
          />
          
          {/* Bottom waves */}
          <path 
            d="M0,700 Q300,650 600,700 T1200,700 L1200,800 L0,800 Z" 
            fill="hsl(var(--accent) / 0.03)"
            className="animate-pulse"
            style={{animationDelay: '1.8s'}}
          />
        </svg>
        
        {/* Additional waves for middle sections */}
        <svg 
          className="absolute top-[100vh] left-0 w-full h-screen"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path 
            d="M0,100 Q150,50 300,100 T600,100 Q750,50 900,100 T1200,100" 
            stroke="hsl(var(--primary) / 0.1)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          <path 
            d="M0,200 Q150,150 300,200 T600,200 Q750,150 900,200 T1200,200" 
            stroke="hsl(var(--accent) / 0.08)" 
            strokeWidth="1.2" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2.5s'}}
          />
          <path 
            d="M0,300 Q150,250 300,300 T600,300 Q750,250 900,300 T1200,300" 
            stroke="hsl(var(--primary) / 0.06)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '3s'}}
          />
          <path 
            d="M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z" 
            fill="hsl(var(--accent) / 0.02)"
            className="animate-pulse"
            style={{animationDelay: '0.5s'}}
          />
          <path 
            d="M0,600 Q300,550 600,600 T1200,600 L1200,800 L0,800 Z" 
            fill="hsl(var(--primary) / 0.02)"
            className="animate-pulse"
            style={{animationDelay: '1.5s'}}
          />
        </svg>
        
        {/* Bottom section waves */}
        <svg 
          className="absolute top-[200vh] left-0 w-full h-screen"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path 
            d="M0,150 Q150,100 300,150 T600,150 Q750,100 900,150 T1200,150" 
            stroke="hsl(var(--accent) / 0.1)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.8s'}}
          />
          <path 
            d="M0,250 Q150,200 300,250 T600,250 Q750,200 900,250 T1200,250" 
            stroke="hsl(var(--primary) / 0.08)" 
            strokeWidth="1.2" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2s'}}
          />
          <path 
            d="M0,350 Q300,300 600,350 T1200,350 L1200,0 L0,0 Z" 
            fill="hsl(var(--primary) / 0.03)"
            className="animate-pulse"
            style={{animationDelay: '1.2s'}}
          />
          <path 
            d="M0,700 Q300,650 600,700 T1200,700 L1200,800 L0,800 Z" 
            fill="hsl(var(--accent) / 0.03)"
            className="animate-pulse"
            style={{animationDelay: '2.8s'}}
          />
        </svg>
      </div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Departments />
        <Programs />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
