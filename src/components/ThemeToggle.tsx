import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggle = () => {
    const html = document.documentElement;
    const willBeDark = !html.classList.contains('dark');
    // next-themes key persists the choice; system default restored via a long-press could be added later
    setTheme(willBeDark ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
      title={isDark ? 'حالت روشن' : 'حالت تاریک'}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/40 bg-card/60 text-foreground/80 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover-scale flex-shrink-0 ${className}`}
    >
      <Sun
        className={`w-[1.1rem] h-[1.1rem] absolute transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        className={`w-[1.1rem] h-[1.1rem] absolute transition-all duration-500 ${
          isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
