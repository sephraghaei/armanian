import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
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

  const commonBtn = "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border/30 bg-card/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105";

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 sm:gap-3">
      {showDown && (
        <button aria-label="Scroll down" className={commonBtn} onClick={scrollDown}>
          <ChevronDown className="w-5 h-5 text-foreground/80" />
        </button>
      )}
      {showUp && (
        <button aria-label="Back to top" className={commonBtn} onClick={scrollToTop}>
          <ChevronUp className="w-5 h-5 text-foreground/80" />
        </button>
      )}
    </div>
  );
};

export default ScrollArrows;


