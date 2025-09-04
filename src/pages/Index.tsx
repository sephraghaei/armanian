import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Departments from '@/components/Departments';
import Programs from '@/components/Programs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Wave Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top waves */}
          <path 
            d="M0,100 Q300,50 600,100 T1200,100 L1200,0 L0,0 Z" 
            fill="hsl(var(--primary) / 0.03)"
            className="animate-pulse"
          />
          <path 
            d="M0,150 Q300,100 600,150 T1200,150 L1200,0 L0,0 Z" 
            fill="hsl(var(--accent) / 0.02)"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          
          {/* Flowing lines throughout */}
          <path 
            d="M0,250 Q150,200 300,250 T600,250 Q750,200 900,250 T1200,250" 
            stroke="hsl(var(--primary) / 0.1)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.5s'}}
          />
          <path 
            d="M0,320 Q150,270 300,320 T600,320 Q750,270 900,320 T1200,320" 
            stroke="hsl(var(--accent) / 0.08)" 
            strokeWidth="1.2" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1.5s'}}
          />
          <path 
            d="M0,400 Q150,350 300,400 T600,400 Q750,350 900,400 T1200,400" 
            stroke="hsl(var(--primary) / 0.06)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2s'}}
          />
          <path 
            d="M0,480 Q150,430 300,480 T600,480 Q750,430 900,480 T1200,480" 
            stroke="hsl(var(--accent) / 0.05)" 
            strokeWidth="0.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '0.3s'}}
          />
          <path 
            d="M0,560 Q150,510 300,560 T600,560 Q750,510 900,560 T1200,560" 
            stroke="hsl(var(--primary) / 0.04)" 
            strokeWidth="0.8" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '2.5s'}}
          />
          
          {/* Bottom waves */}
          <path 
            d="M0,650 Q300,600 600,650 T1200,650 L1200,800 L0,800 Z" 
            fill="hsl(var(--accent) / 0.02)"
            className="animate-pulse"
            style={{animationDelay: '1.8s'}}
          />
          <path 
            d="M0,700 Q300,650 600,700 T1200,700 L1200,800 L0,800 Z" 
            fill="hsl(var(--primary) / 0.03)"
            className="animate-pulse"
            style={{animationDelay: '0.8s'}}
          />
        </svg>
      </div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Departments />
        <Programs />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
