import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, PhoneCall } from "lucide-react";
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

  const commonBtn = "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border bg-card text-foreground shadow-soft hover:shadow-lifted transition-all duration-300 hover:scale-105";
  
  const consultationBtn = "flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-primary/20 bg-primary shadow-lifted transition-all duration-300 hover:scale-105 relative overflow-hidden group";

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
        <div className="absolute inset-0 rounded-full bg-primary-foreground/10 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        
        {/* Phone icon */}
        <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground relative z-10" />
      </a>

      {/* Scroll Buttons */}
      {showDown && (
        <button aria-label="Scroll down" className={commonBtn} onClick={scrollDown}>
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}
      {showUp && (
        <button aria-label="Back to top" className={commonBtn} onClick={scrollToTop}>
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

    </div>
  );
};

export default ScrollArrows;


