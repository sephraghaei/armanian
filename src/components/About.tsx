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
    }
  ];

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
    }
  ];

  const [selectedVideo, setSelectedVideo] = React.useState(0);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-transparent via-background/20 to-transparent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 animate-bounce-in">
            درباره آرمانیان
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            ما فراتر از یک مدرسه کدنویسی هستیم. ما جامعه‌ای هستیم که به پرورش استعدادهای جوان، 
            ایجاد اعتماد به نفس و آماده کردن کودکان برای آینده‌ای محور فناوری اختصاص دارد.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-3 hover:rotate-1 animate-slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-heartbeat">
                  <feature.icon className="w-8 h-8 text-white group-hover:animate-wiggle" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
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
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVideo(index)}
                    className={`w-full flex items-center justify-between gap-2 md:gap-4 p-3 md:p-4 transition-all border-b last:border-b-0 hover:bg-primary/10 hover:scale-105 ${
                      selectedVideo === index 
                        ? 'bg-primary/5 animate-glow' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <h4 className="text-right text-xs md:text-sm lg:text-base font-bold text-foreground flex-1 leading-relaxed">
                      {video.title}
                    </h4>
                    
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-12 md:w-24 md:h-16 bg-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <video
                          src={video.src}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:bg-primary transition-all duration-300 animate-heartbeat">
                          <svg 
                            viewBox="0 0 24 24" 
                            fill="white" 
                            className="w-4 h-4 md:w-5 md:h-5 mr-[-2px]"
                          >
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Video Player */}
              <div className="p-4 md:p-6 bg-muted/30">
                <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black hover:shadow-primary/25 transition-all duration-500">
                  <video
                    key={selectedVideo}
                    src={videos[selectedVideo].src}
                    controls
                    className="w-full aspect-video hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <p className="text-center text-foreground mt-3 md:mt-4 font-extrabold text-sm md:text-base lg:text-lg px-2 animate-slide-in-up">
                  {videos[selectedVideo].title}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;