import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'به ما سر بزنید',
      details: ['کیاشهر', 'خیابان فناوری ۱۲۳', 'ایران']
    },
    {
      icon: Phone,
      title: 'تماس بگیرید',
      details: ['۰۱۳-۳۳۱۲۳۴۵۶', '۰۹۱۲-۳۴۵۶۷۸۹']
    },
    {
      icon: Mail,
      title: 'ایمیل بزنید',
      details: ['info@armanian.ir', 'admissions@armanian.ir']
    },
    {
      icon: Clock,
      title: 'ساعات کاری',
      details: ['شنبه-چهارشنبه: ۹:۰۰ تا ۱۸:۰۰', 'پنج‌شنبه: ۱۰:۰۰ تا ۱۶:۰۰', 'جمعه: تعطیل']
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            با ما در تماس باشید
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            آماده شروع سفر کدنویسی فرزندتان هستید؟ همین امروز با ما تماس بگیرید تا درباره برنامه‌هایمان 
            بیشتر بدانید یا برای بازدید از امکانات مدرن ما وقت بگیرید.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                بیایید ارتباط برقرار کنیم
              </h3>
              <p className="text-muted-foreground mb-8">
                ما دوست داریم از شما بشنویم! چه سوالی درباره برنامه‌هایمان داشته باشید، 
                بخواهید کلاس آزمایشی رزرو کنید، یا اطلاعات بیشتری نیاز داشته باشید، ما اینجا هستیم تا کمک کنیم.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-glow-primary transition-all duration-300">
                  <CardContent className="p-8 bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300">
                    <div className="flex items-start space-x-reverse space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-glow-primary">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">پیام خود را برای ما بفرستید</CardTitle>
              <CardDescription className="text-muted-foreground">
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