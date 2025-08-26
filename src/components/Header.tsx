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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">آرمانیان</h1>
              <p className="text-xs text-muted-foreground">آموزشگاه آزاد فنی و حرفه‌ای</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8 mr-12">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href || (item.href.startsWith('#') && location.pathname === '/');
              const isHashLink = item.href.startsWith('#');
              
              return isHashLink ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-300 relative group ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors duration-300 relative group ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:block">
            {loading ? (
              <div className="w-24 h-10 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="gap-2">
                    <User className="w-4 h-4" />
                    حساب کاربری
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{user.phone || user.email || 'کاربر'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    خروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="lg" onClick={() => navigate('/auth')}>
                ورود / ثبت نام
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href || (item.href.startsWith('#') && location.pathname === '/');
                const isHashLink = item.href.startsWith('#');
                
                return isHashLink ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`transition-colors duration-300 py-2 ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-colors duration-300 py-2 ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {user ? (
                <Button variant="outline" onClick={handleSignOut} className="mt-4 gap-2">
                  <LogOut className="w-4 h-4" />
                  خروج
                </Button>
              ) : (
                <Button variant="hero" size="lg" className="mt-4" onClick={() => navigate('/auth')}>
                  ورود / ثبت نام
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;