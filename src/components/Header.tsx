import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, Brain, Monitor, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add debugging to see if AuthProvider is available
  console.log('Header rendering, checking auth context...');
  
  const { user, signOut, loading } = useAuth();
  console.log('Auth context loaded:', { user: !!user, loading });
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "خطا در خروج",
        description: error.message,
      });
    } else {
      toast({
        title: "خروج موفقیت‌آمیز",
        description: "با موفقیت از حساب کاربری خارج شدید.",
      });
      navigate('/');
    }
  };

  const menuItems = [
    { label: 'خانه', href: '/' },
    { label: 'دپارتمان ها', href: '/departments' },
    { label: 'دوره‌ها', href: '/courses' },
    { label: 'درباره ما', href: '#about' },
    { label: 'تماس', href: '#contact' },
  ];

  // Scroll spy for hash sections on home page
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const hashIds = useMemo(() => (
    menuItems
      .filter(i => i.href.startsWith('#'))
      .map(i => i.href.slice(1))
  ), []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHash(null);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Include hero section as home anchor
    const idsToObserve = ['home', ...hashIds];
    const elements = idsToObserve
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the entry most in view (largest intersection ratio)
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio - a.intersectionRatio));
      if (visible.length > 0) {
        const top = visible[0];
        const id = top.target.id;
        setActiveHash(id === 'home' ? '#' : `#${id}`);
      } else {
        // If none intersect (e.g., at very top), default to home
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY < 120) setActiveHash('#');
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });
    observerRef.current = observer;

    elements.forEach(el => observer.observe(el));

    // Initial set on mount
    setTimeout(() => {
      const initialEntries = elements.map(el => ({
        target: el,
        isIntersecting: true,
        intersectionRatio: 0,
        time: 0,
        boundingClientRect: el.getBoundingClientRect(),
        intersectionRect: el.getBoundingClientRect(),
        rootBounds: null,
      })) as unknown as IntersectionObserverEntry[];
      handleIntersect(initialEntries);
    }, 0);

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [location.pathname, hashIds]);

  const scrollToHash = (hash: string) => {
    const id = hash.replace('#', '') || 'home';
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        window.history.replaceState(null, '', hash === '#' ? '/' : hash);
      } catch {}
    }
  };

  const handleHashClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => scrollToHash(hash), 60);
    } else {
      scrollToHash(hash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/85 backdrop-blur-2xl border-b border-border/10"></div>
      <div className="relative container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between h-14 gap-3 px-3 md:px-6 rounded-2xl border border-border/20 bg-card/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-2 md:space-x-3 group hover-scale min-w-0 flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 group-hover:rotate-3">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold transition-colors duration-300 bg-clip-text text-transparent animate-gradient-x" style={{ backgroundImage: 'linear-gradient(90deg, hsl(233,63%,67%), hsl(200 51% 65%), hsl(233,63%,67%))' }}>آرمانیان</h1>
              <p className="text-xs text-muted-foreground/70 font-medium">آموزشگاه آزاد فنی و حرفه‌ای</p>
            </div>
            <div className="sm:hidden min-w-0 flex-1">
              <h1 className="text-base font-bold transition-colors duration-300 bg-clip-text text-transparent animate-gradient-x overflow-visible whitespace-nowrap" style={{ backgroundImage: 'linear-gradient(90deg, hsl(233,63%,67%), hsl(200 51% 65%), hsl(233,63%,67%))' }}>آرمانیان</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-2">
            {menuItems.map((item, index) => {
              const isHashLink = item.href.startsWith('#');
              const isActive = isHashLink
                ? (location.pathname === '/' && (activeHash ? activeHash === item.href || (activeHash === '#' && item.label === 'خانه') : false))
                : location.pathname === item.href;
              
              return isHashLink ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`story-link relative px-3 py-2 rounded-lg font-medium transition-all duration-300 group animate-fade-in ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-sm' 
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={(e) => handleHashClick(e, item.href)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`story-link relative px-3 py-2 rounded-lg font-medium transition-all duration-300 group animate-fade-in ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-sm' 
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:block">
            {loading ? (
              <div className="w-28 h-10 bg-muted/40 animate-pulse rounded-lg" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 hover-scale bg-card/60 hover:bg-card border-border/30 hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg">
                    <User className="w-4 h-4" />
                    حساب کاربری
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 bg-card backdrop-blur-xl border-border/20 shadow-xl z-50 animate-scale-in">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors" 
                    onClick={() => window.location.href = '/profile'}
                  >
                    <User className="w-4 h-4" />
                    <span>پروفایل کاربری</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 opacity-60">
                    <span className="text-sm text-muted-foreground">{user.phone || 'کاربر'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/20" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="w-4 h-4" />
                    خروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="sm" className="hover-scale shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all duration-300" onClick={() => navigate('/auth')}>
                ورود / ثبت نام
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-card/60 border border-border/20 text-foreground hover:text-primary hover:bg-card hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg hover-scale"
          >
            {isMenuOpen ? 
              <X className="w-5 h-5 animate-scale-in" /> : 
              <Menu className="w-5 h-5 animate-scale-in" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-xl border border-border/20 bg-card/90 backdrop-blur-xl shadow-xl animate-slide-in-right">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => {
                const isHashLink = item.href.startsWith('#');
                const isActive = isHashLink
                  ? (location.pathname === '/' && (activeHash ? activeHash === item.href || (activeHash === '#' && item.label === 'خانه') : false))
                  : location.pathname === item.href;
                
                return isHashLink ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`transition-all duration-300 py-3 px-4 rounded-lg text-center font-medium animate-fade-in ${
                      isActive 
                        ? 'text-primary bg-primary/10 border border-primary/20 shadow-sm' 
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={(e) => { handleHashClick(e, item.href); setIsMenuOpen(false); }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-all duration-300 py-3 px-4 rounded-lg text-center font-medium animate-fade-in ${
                      isActive 
                        ? 'text-primary bg-primary/10 border border-primary/20 shadow-sm' 
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <div className="pt-3 mt-3 border-t border-border/20">
                {user ? (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }} 
                      className="w-full gap-2 py-3 bg-card/60 hover:bg-card border-border/30 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <User className="w-4 h-4" />
                      پروفایل کاربری
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut} 
                      className="w-full gap-2 py-3 text-destructive border-destructive/20 hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="w-full py-3 shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all duration-300" 
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                  >
                    ورود / ثبت نام
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;