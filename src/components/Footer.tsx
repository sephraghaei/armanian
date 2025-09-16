import { Code, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { label: 'درباره ما', href: '#about' },
    { label: 'دوره‌ها', href: '#programs' },
    { label: 'بخش‌ها', href: '#departments' },
    { label: 'تماس', href: '#contact' },
  ];

  const programs = [
    { label: 'کاوشگر مبتدی', href: '#' },
    { label: 'ماجراجوی کد', href: '#' },
    { label: 'توسعه‌دهنده آینده', href: '#' },
    { label: 'گواهینامه ICDL', href: '#' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">آرمانیان</h3>
                <p className="text-xs text-muted-foreground">برنامه‌نویسان آینده</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              توانمندسازی ذهن‌های جوان با مهارت‌های برنامه‌نویسی و سواد دیجیتال 
              برای آینده‌ای محور فناوری.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">لینک‌های سریع</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">دوره‌ها</h4>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.label}>
                  <a
                    href={program.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">اطلاعات تماس</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">info@armanian.ir</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">۰۱۳-۳۳۱۲۳۴۵۶</span>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground text-sm">
                  کیاشهر<br />
                  خیابان فناوری ۱۲۳<br />
                  ایران
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © ۱۴۰۳ آرمانیان. تمامی حقوق محفوظ است.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                سیاست حفظ حریم خصوصی
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                شرایط خدمات
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                سیاست کوکی
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;