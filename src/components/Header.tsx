import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, User, LogOut, Shield, Home as HomeIcon, Building2, GraduationCap, Info, Phone } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
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
  
  const { user, signOut, loading, isAdmin } = useAuth();
  console.log('Auth context loaded:', { user: !!user, loading, isAdmin });
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    { label: 'خانه', href: '/', icon: HomeIcon },
    { label: 'دپارتمان‌ها', href: '/departments', icon: Building2 },
    { label: 'دوره‌ها', href: '/courses', icon: GraduationCap },
    { label: 'درباره ما', href: '#about', icon: Info },
    { label: 'تماس', href: '#contact', icon: Phone },
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="group flex flex-shrink-0 items-center gap-2.5" aria-label="صفحه اصلی آرمانیان">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-transform duration-200 group-hover:-translate-y-0.5 md:h-10 md:w-10">
                <Code className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full border-2 border-background pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="block text-base font-semibold leading-5 text-foreground">آرمانیان</span>
              <span className="block text-[11px] leading-5 text-muted-foreground">آموزشگاه آزاد فنی و حرفه‌ای</span>
            </div>
            <div className="sm:hidden">
              <span className="text-base font-semibold text-foreground">آرمانیان</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="منوی اصلی">
            {menuItems.map((item, index) => {
              const isHashLink = item.href.startsWith('#');
              const isActive = isHashLink
                ? (location.pathname === '/' && (activeHash ? activeHash === item.href || (activeHash === '#' && item.label === 'خانه') : false))
                : location.pathname === item.href;
              
              return isHashLink ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'bg-secondary text-foreground' 
                      : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
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
                  className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'bg-secondary text-foreground' 
                      : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="w-28 h-10 bg-muted/40 animate-pulse rounded-lg" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-card shadow-none">
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
                  {isAdmin && (
                    <DropdownMenuItem 
                      className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors" 
                      onClick={() => window.location.href = '/admin'}
                    >
                      <Shield className="w-4 h-4" />
                      <span>پنل مدیریت</span>
                    </DropdownMenuItem>
                  )}
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
              <Button size="sm" className="shadow-none hover:shadow-none" onClick={() => navigate('/auth')}>
                ورود / ثبت نام
              </Button>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-10 w-10 flex-shrink-0 bg-card shadow-none md:hidden"
            aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? 
              <X className="w-5 h-5 animate-scale-in" /> : 
              <Menu className="w-5 h-5 animate-scale-in" />
            }
          </Button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-0 z-[60] flex justify-start md:hidden" role="dialog" aria-modal="true" aria-label="منوی موبایل">
            <button
              type="button"
              className="absolute inset-0 bg-foreground/15 backdrop-blur-sm"
              aria-label="بستن منو"
              onClick={() => setIsMenuOpen(false)}
            />
            <aside className="relative flex h-full w-[86%] max-w-[340px] animate-slide-in-right flex-col border-l border-border bg-background/95 shadow-lifted backdrop-blur-xl">
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Code className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">آرمانیان</span>
                </Link>
                <Button type="button" variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="بستن منو">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="منوی موبایل">
                <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">دسترسی سریع</p>
                <div className="space-y-1">
              {menuItems.map((item, index) => {
                const isHashLink = item.href.startsWith('#');
                const isActive = isHashLink
                  ? (location.pathname === '/' && (activeHash ? activeHash === item.href || (activeHash === '#' && item.label === 'خانه') : false))
                  : location.pathname === item.href;
                
                return isHashLink ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-secondary text-foreground' 
                        : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                    }`}
                    onClick={(e) => { handleHashClick(e, item.href); setIsMenuOpen(false); }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-secondary text-foreground' 
                        : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
                </div>
              </nav>

              <div className="space-y-3 border-t border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                  <span className="text-sm text-muted-foreground">حالت نمایش</span>
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }} 
                      className="w-full gap-2 bg-card shadow-none"
                    >
                      <User className="w-4 h-4" />
                      پروفایل کاربری
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut} 
                      className="w-full gap-2 border-destructive/30 text-destructive shadow-none hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </Button>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="h-11 w-full shadow-none hover:shadow-none" 
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                  >
                    ورود / ثبت نام
                  </Button>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;