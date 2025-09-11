import { useState } from 'react';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/80 backdrop-blur-xl border-b border-border/20"></div>
      <div className="relative container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between h-16 gap-8 px-6 rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">آرمانیان</h1>
              <p className="text-xs text-muted-foreground/80 font-medium">آموزشگاه آزاد فنی و حرفه‌ای</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">آرمانیان</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.href || (item.href.startsWith('#') && location.pathname === '/');
              const isHashLink = item.href.startsWith('#');
              
              return isHashLink ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-md' 
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 right-1/2 translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    isActive ? 'w-6' : 'w-0 group-hover:w-4'
                  }`}></span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-md' 
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 right-1/2 translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    isActive ? 'w-6' : 'w-0 group-hover:w-4'
                  }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:block">
            {loading ? (
              <div className="w-32 h-12 bg-muted/50 animate-pulse rounded-xl" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="gap-2 bg-card/50 hover:bg-card border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <User className="w-4 h-4" />
                    حساب کاربری
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/30 shadow-2xl">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors" 
                    onClick={() => window.location.href = '/profile'}
                  >
                    <User className="w-4 h-4" />
                    <span>پروفایل کاربری</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 opacity-60">
                    <span className="text-sm text-muted-foreground">{user.phone || user.email || 'کاربر'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/30" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="w-4 h-4" />
                    خروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="lg" className="shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300" onClick={() => navigate('/auth')}>
                ورود / ثبت نام
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-card/50 border border-border/30 text-foreground hover:text-primary hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-6 rounded-2xl border border-border/30 bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/10">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href || (item.href.startsWith('#') && location.pathname === '/');
                const isHashLink = item.href.startsWith('#');
                
                return isHashLink ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`transition-all duration-300 py-4 px-6 rounded-xl text-center font-medium ${
                      isActive 
                        ? 'text-primary bg-primary/10 border border-primary/20 shadow-md' 
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-all duration-300 py-4 px-6 rounded-xl text-center font-medium ${
                      isActive 
                        ? 'text-primary bg-primary/10 border border-primary/20 shadow-md' 
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-border/30">
                {user ? (
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }} 
                      className="w-full gap-2 py-4 bg-card/50 hover:bg-card border-border/50 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <User className="w-4 h-4" />
                      پروفایل کاربری
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut} 
                      className="w-full gap-2 py-4 text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full py-4 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300" 
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