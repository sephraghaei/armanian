import { Code, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/armanian_edu_group', label: 'Instagram' },
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
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">آرمانیان</h3>
                <p className="text-xs text-gray-300 font-semibold">برنامه‌نویسان آینده</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm font-medium">
              توانمندسازی ذهن‌های جوان با مهارت‌های برنامه‌نویسی و سواد دیجیتال 
              برای آینده‌ای محور فناوری.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 text-gray-300 rounded-lg flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-extrabold text-white mb-4">لینک‌های سریع</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-200 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-extrabold text-white mb-4">دوره‌ها</h4>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    className="text-gray-300 hover:text-blue-200 transition-colors duration-300"
                  >
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-extrabold text-white mb-4">اطلاعات تماس</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-200" />
                <span className="text-gray-300 text-sm">info@armanian.ir</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-200" />
                <span className="text-gray-300 text-sm">۰۹۰۰۱۹۶۰۰۱۰</span>
              </div>
              <div className="mt-4">
                <p className="text-gray-300 text-sm">
                  گیلان، کیاشهر<br />
                  خیابان آدینه
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © ۱۴۰۳ آرمانیان. تمامی حقوق محفوظ است.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-blue-200 transition-colors">
                سیاست حفظ حریم خصوصی
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-200 transition-colors">
                شرایط خدمات
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-200 transition-colors">
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