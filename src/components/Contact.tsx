import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Instagram, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'به ما سر بزنید',
      details: ['گیلان، کیاشهر', 'خیابان آدینه']
    },
    {
      icon: Phone,
      title: 'تماس بگیرید',
      details: ['۰۹۰۰۱۹۶۰۰۱۰']
    },
    {
      icon: Instagram,
      title: 'اینستاگرام',
      details: ['@armanian_edu_group']
    }
  ];

  return (
    <section id="contact" className="border-t border-border bg-secondary/30 py-20 sm:py-24 md:py-28">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            با ما در تماس باشید
          </h2>
          <p className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground">
            آماده شروع سفر یادگیری هستید؟ همین امروز با ما تماس بگیرید تا درباره دوره‌ها بیشتر بدانید یا برای بازدید از آموزشگاه وقت بگیرید.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="grid gap-4">

              {contactInfo.map((info, index) => {
                const isInstagram = info.title === 'اینستاگرام';
                const isPhone = info.title === 'تماس بگیرید';
                const CardWrapper = (isInstagram || isPhone) ? 'a' : 'div';
                const cardProps = isInstagram ? {
                  href: 'https://instagram.com/armanian_edu_group',
                  target: '_blank',
                  rel: 'noopener noreferrer'
                } : isPhone ? {
                  href: 'tel:09001960010'
                } : {};

                return (
                  <Card key={index} className={`border-border bg-card shadow-soft transition-colors duration-200 hover:border-foreground/20 ${(isInstagram || isPhone) ? 'cursor-pointer' : ''}`}>
                    <CardContent className="p-6">
                      <CardWrapper {...cardProps} className={(isInstagram || isPhone) ? "block" : ""}>
                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-right">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
                            <info.icon className="h-5 w-5 text-foreground" />
                          </div>

                          <div>
                            <h4 className="mb-1.5 text-base font-semibold text-foreground">{info.title}</h4>
                            <div className="space-y-1">
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-sm text-muted-foreground">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardWrapper>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-border bg-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">پیام خود را برای ما بفرستید</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                فرم زیر را پر کنید و ما ظرف ۲۴ ساعت با شما تماس خواهیم گرفت.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">نام</Label>
                  <Input id="firstName" placeholder="نام خود را وارد کنید" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">نام خانوادگی</Label>
                  <Input id="lastName" placeholder="نام خانوادگی خود را وارد کنید" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">ایمیل</Label>
                <Input id="email" type="email" placeholder="ایمیل خود را وارد کنید" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">شماره تلفن</Label>
                <Input id="phone" type="tel" placeholder="شماره تلفن خود را وارد کنید" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="childAge" className="text-foreground">سن فرزند</Label>
                <Input id="childAge" placeholder="فرزند شما چند ساله است؟" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">پیام</Label>
                <Textarea 
                  id="message" 
                  placeholder="درباره علایق فرزندتان و برنامه‌ای که در نظر دارید برای ما بنویسید..."
                  rows={4}
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4 ml-2" />
                ارسال پیام
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                با ارسال این فرم، شما با سیاست حفظ حریم خصوصی و شرایط خدمات ما موافقت می‌کنید.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;