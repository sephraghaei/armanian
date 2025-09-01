import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CourseDetailsPage = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const navigate = useNavigate();

  // Sample course data - in real app, this would come from API/database
  const courseData = {
    'icdl-kids': {
      title: 'ICDL کودکان',
      description: 'آموزش جامع مهارت‌های اولیه کامپیوتر برای کودکان ۶ تا ۱۲ سال. این دوره شامل آشنایی با سیستم عامل، مرورگر اینترنت، نرم‌افزارهای آفیس و مفاهیم امنیت سایبری می‌باشد.',
      duration: '۸ هفته',
      sessions: '۱۶ جلسه',
      price: '۱,۵۰۰,۰۰۰ تومان',
      level: 'مقدماتی',
      ageGroup: '۶ تا ۱۲ سال',
      classSize: '۱۰ نفر',
      teacher: 'مریم احمدی',
      teacherExperience: '۵ سال سابقه تدریس',
      schedule: 'شنبه و دوشنبه - ۱۶:۰۰ تا ۱۷:۳۰',
      prerequisites: ['علاقه به یادگیری', 'آشنایی اولیه با کامپیوتر'],
      features: [
        'گواهینامه معتبر بین‌المللی',
        'پروژه‌های عملی',
        'نرم‌افزارهای روز دنیا',
        'پشتیبانی آنلاین'
      ],
      learningOutcomes: [
        'کار با سیستم عامل ویندوز',
        'استفاده از مرورگر و جستجو در اینترنت',
        'تایپ و کار با متن',
        'ایجاد ارائه ساده',
        'مفاهیم امنیت سایبری'
      ]
    }
    // Add more courses as needed
  };

  const course = courseData[courseName as keyof typeof courseData] || courseData['icdl-kids'];

  const handleEnroll = () => {
    navigate('/auth');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            بازگشت
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <div className="bg-gradient-hero rounded-2xl p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline">{course.ageGroup}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {course.description}
                </p>
              </div>

              {/* Course Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    جزئیات دوره
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">مدت دوره</p>
                        <p className="text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">تعداد جلسات</p>
                        <p className="text-muted-foreground">{course.sessions}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">ظرفیت کلاس</p>
                        <p className="text-muted-foreground">{course.classSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">هزینه دوره</p>
                        <p className="text-muted-foreground">{course.price}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">زمان‌بندی کلاس‌ها</h3>
                    <p className="text-muted-foreground">{course.schedule}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle>پیش نیاز ها</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Learning Outcomes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    نتایج یادگیری
                  </CardTitle>
                  <CardDescription>
                    پس از اتمام این دوره قادر خواهید بود:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card>
                <CardHeader>
                  <CardTitle>ویژگی‌های دوره</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    مدرس دوره
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{course.teacher}</h3>
                    <p className="text-muted-foreground">{course.teacherExperience}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Enrollment Card */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">ثبت نام در دوره</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{course.price}</p>
                    <p className="text-muted-foreground">هزینه کل دوره</p>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleEnroll}
                  >
                    ثبت نام کنید
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    امکان پرداخت قسطی موجود است
                  </p>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>نیاز به مشاوره دارید؟</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    برای دریافت مشاوره رایگان با کارشناسان ما تماس بگیرید.
                  </p>
                  <Button variant="outline" className="w-full">
                    مشاوره رایگان
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;