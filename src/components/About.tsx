import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, Lightbulb } from 'lucide-react';
import successImage from '@/assets/success-students.jpg';
import facilityImage from '@/assets/facility-exterior.jpg';
import video1 from '@/assets/1.mp4';
import video2 from '@/assets/2.mp4';
import video3 from '@/assets/3.mp4';

const About = () => {
  const features = [
  {
    icon: Target,
    title: 'ماموریت ما',
    description: 'الهام بخشیدن و آموزش نسل آینده برنامه‌نویسان و نوآوران دیجیتال از طریق تجربیات یادگیری جذاب و متناسب با سن.'
  },
  {
    icon: Users,
    title: 'مربیان متخصص',
    description: 'معلمان مجاز ما تخصص فنی را با دانش رشد کودک ترکیب می‌کنند تا محیط یادگیری کاملی ایجاد کنند.'
  },
  {
    icon: Award,
    title: 'تعالی شناخته شده',
    description: 'برنامه‌های تایید شده و گواهینامه‌های معتبر بین‌المللی از جمله ICDL که کودکان را برای آینده دیجیتال آماده می‌کند.'
  },
  {
    icon: Lightbulb,
    title: 'یادگیری خلاقانه',
    description: 'ما کدنویسی را با خلاقیت ترکیب می‌کنیم و یادگیری را از طریق بازی‌ها، پروژه‌ها و چالش‌های تعاملی که تخیل را برمی‌انگیزد، سرگرم‌کننده می‌کنیم.'
  }];


  const videos = [
  {
    src: video1,
    title: "۵ مهارت کلیدی که هرگز در مدرسه یاد نمی‌گیرید"
  },
  {
    src: video2,
    title: "مدارس فعلی آماده چالش‌های آینده هستند؟"
  },
  {
    src: video3,
    title: "چگونه رایانگ عامل رشد خلاقیت می‌شود؟"
  }];


  const [selectedVideo, setSelectedVideo] = React.useState(0);

  return (
    <section id="about" className="border-t border-border py-20 sm:py-24 md:py-28">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            درباره آرمانیان
          </h2>
          <p className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground">
            ما فراتر از یک مدرسه کدنویسی هستیم؛ جامعه‌ای برای پرورش استعدادهای جوان، ساختن اعتماد به نفس و آماده کردن کودکان برای آینده‌ای فناورانه.
          </p>
        </div>

        <div className="mx-auto grid max-w-sm gap-5 sm:max-w-none md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) =>
          <Card key={index} className="border-border bg-card shadow-soft transition-colors duration-200 hover:border-foreground/20">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>


        
        {/* Video Section */}
        <div className="mt-20 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-6 md:mb-8 text-center px-4 animate-bounce-in">
            ویدیوهای آموزشی ما
          </h3>
          
          <div className="max-w-2xl mx-auto px-4">
            <Card className="overflow-hidden bg-card border-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:scale-105">
              {/* Video List */}
              <div className="border-l-4 border-primary bg-card">
                {videos.map((video, index) =>
                <button
                  key={index}
                  onClick={() => setSelectedVideo(index)}
                  className={`w-full flex items-center justify-between gap-2 md:gap-4 p-3 md:p-4 transition-all border-b last:border-b-0 hover:bg-primary/10 hover:scale-105 ${
                  selectedVideo === index ?
                  'bg-primary/5 animate-glow' :
                  'hover:bg-muted/50'}`
                  }>

                    <h4 className="text-right text-xs md:text-sm lg:text-base font-bold text-foreground flex-1 leading-relaxed">
                      {video.title}
                    </h4>
                    
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-12 md:w-24 md:h-16 bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <video
                        src={video.src}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />

                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:bg-primary transition-all duration-300 animate-heartbeat">
                          <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-4 h-4 md:w-5 md:h-5 mr-[-2px]">

                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Main Video Player */}
              <div className="p-4 md:p-6 bg-muted/30">
                <div className="relative rounded-xl overflow-hidden shadow-2xl bg-muted hover:shadow-primary/25 transition-all duration-500">
                  <video
                    key={selectedVideo}
                    src={videos[selectedVideo].src}
                    controls
                    className="w-full aspect-video hover:scale-105 transition-transform duration-500" />

                </div>
                
                <p className="text-center text-foreground mt-3 md:mt-4 font-extrabold text-sm md:text-base lg:text-lg px-2 animate-slide-in-up">
                  {videos[selectedVideo].title}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>);

};

export default About;