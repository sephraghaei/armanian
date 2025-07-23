import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, Brain, Monitor } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const menuItems = [
    { label: 'خانه', href: '/' },
    { label: 'درباره ما', href: '#about' },
    { label: 'بخش‌ها', href: '/departments' },
    { label: 'دوره‌ها', href: '/courses' },
    { label: 'تماس', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">آرمانیان</h1>
              <p className="text-xs text-muted-foreground">آموزشگاه آزاد فنی و حرفه‌ای</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
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
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg">
              ثبت نام کنید
            </Button>
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
              <Button variant="hero" size="lg" className="mt-4">
                ثبت نام کنید
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;