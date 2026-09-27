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
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
          <Card key={index} className="h-full border-border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lifted">
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
        <div className="mt-20">
          <h3 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground">
            ویدیوهای آموزشی ما
          </h3>

           <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-soft lg:grid-cols-[0.42fr_0.58fr]">
            <Card className="contents border-0 bg-transparent shadow-none">
              {/* Video List */}
              <div className="order-2 border-t border-border lg:order-1 lg:border-l lg:border-t-0">
                {videos.map((video, index) =>
                <button
                  key={index}
                  onClick={() => setSelectedVideo(index)}
                  className={`flex w-full items-center justify-between gap-3 border-b border-border p-4 text-right transition-colors duration-150 last:border-b-0 ${
                  selectedVideo === index ? 'bg-secondary' : 'hover:bg-secondary/60'}`
                  }>

                    <h4 className="flex-1 text-right text-sm font-medium leading-relaxed text-foreground">
                      {video.title}
                    </h4>

                    <div className="relative flex-shrink-0">
                      <div className="h-12 w-16 overflow-hidden rounded-md border border-border bg-muted md:h-14 md:w-20">
                        <video
                        src={video.src}
                        className="h-full w-full object-cover" />

                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                          <svg
                          viewBox="0 0 24 24"
                          className="mr-[-2px] h-3.5 w-3.5 fill-primary-foreground">

                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Main Video Player */}
               <div className="order-1 bg-secondary/40 p-4 md:p-6 lg:order-2">
                <div className="relative overflow-hidden rounded-md border border-border bg-muted">
                  <video
                    key={selectedVideo}
                    src={videos[selectedVideo].src}
                    controls
                    className="aspect-video w-full" />

                </div>

                <p className="mt-4 text-center text-sm font-medium text-foreground">
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