import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollArrows = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowUp(y > 300);
      setShowDown(y < 120);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollDown = () => {
    if (location.pathname === '/') {
      const target = document.getElementById('departments') || document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Fallback for other pages: scroll roughly one viewport down
    const nextY = Math.min(
      (window.scrollY || document.documentElement.scrollTop) + Math.round(window.innerHeight * 0.85),
      document.documentElement.scrollHeight
    );
    window.scrollTo({ top: nextY, behavior: 'smooth' });
  };

  const commonBtn = "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/90 to-accent/90 backdrop-blur-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 hover:border-primary";
  
  const consultationBtn = "flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full border-3 border-green-400/50 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 backdrop-blur-xl shadow-2xl hover:shadow-green-400/60 transition-all duration-300 hover:scale-110 hover:border-green-300 relative overflow-hidden group";

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:gap-4">
      {/* Consultation Button */}
      <a 
        href="tel:09001960010"
        aria-label="تماس برای مشاوره"
        className={consultationBtn}
        title="تماس برای مشاوره"
      >
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        
        {/* Phone icon */}
        <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 drop-shadow-lg" />
        
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-300/40 animate-pulse"></div>
      </a>
      
      {/* Scroll Buttons */}
      {showDown && (
        <button aria-label="Scroll down" className={commonBtn} onClick={scrollDown}>
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
      )}
      {showUp && (
        <button aria-label="Back to top" className={commonBtn} onClick={scrollToTop}>
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
      )}
    </div>
  );
};

export default ScrollArrows;


