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
      teacher: 'سیمین آقایی',
      teacherExperience: '۸ سال سابقه تدریس کودکان',
      schedule: 'شنبه و دوشنبه - ۱۶:۰۰ تا ۱۷:۳۰',
      prerequisites: ['علاقه به یادگیری', 'آشنایی اولیه با کامپیوتر'],
      features: [
        'گواهینامه معتبر بین‌المللی ICDL',
        'پروژه‌های عملی تعاملی',
        'بازی‌های آموزشی',
        'پشتیبانی آنلاین والدین'
      ],
      learningOutcomes: [
        'کار با سیستم عامل ویندوز',
        'استفاده از مرورگر و جستجو در اینترنت',
        'تایپ ده انگشتی فارسی و انگلیسی',
        'ایجاد ارائه ساده با PowerPoint',
        'مفاهیم امنیت سایبری برای کودکان'
      ]
    },
    'icdl-adults': {
      title: 'ICDL بزرگسالان',
      description: 'گواهینامه بین‌المللی مهارت‌های کامپیوتری برای بزرگسالان شامل تمامی ماژول‌های ICDL و آمادگی برای آزمون بین‌المللی.',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۲,۲۰۰,۰۰۰ تومان',
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۵ نفر',
      teacher: 'مهدی محمدی',
      teacherExperience: '۱۰ سال سابقه تدریس ICDL',
      schedule: 'یکشنبه و سه‌شنبه - ۱۸:۰۰ تا ۲۰:۰۰',
      prerequisites: ['آشنایی اولیه با کامپیوتر', 'انگیزه یادگیری'],
      features: [
        'گواهینامه بین‌المللی ICDL',
        'نرم‌افزارهای Microsoft Office',
        'آمادگی آزمون بین‌المللی',
        'پروژه‌های کاربردی'
      ],
      learningOutcomes: [
        'مهارت کامل Microsoft Office',
        'مدیریت فایل و پوشه',
        'استفاده حرفه‌ای از اینترنت',
        'مفاهیم امنیت اطلاعات',
        'آمادگی بازار کار'
      ]
    },
    'scratch-kids': {
      title: 'برنامه‌نویسی اسکرچ کودکان',
      description: 'آموزش برنامه‌نویسی بصری با نرم‌افزار Scratch برای کودکان. ایجاد بازی، انیمیشن و پروژه‌های تعاملی.',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۱,۸۰۰,۰۰۰ تومان',
      level: 'مقدماتی',
      ageGroup: '۸ تا ۱۴ سال',
      classSize: '۱۰ نفر',
      teacher: 'سیمین آقایی',
      teacherExperience: '۶ سال سابقه تدریس برنامه‌نویسی کودکان',
      schedule: 'چهارشنبه و جمعه - ۱۶:۳۰ تا ۱۸:۰۰',
      prerequisites: ['آشنایی با کامپیوتر', 'علاقه به خلاقیت'],
      features: [
        'پروژه‌های بازی‌سازی',
        'انیمیشن‌های تعاملی',
        'منطق برنامه‌نویسی',
        'ارائه پروژه‌های نهایی'
      ],
      learningOutcomes: [
        'مفاهیم پایه برنامه‌نویسی',
        'ساخت بازی‌های ساده',
        'ایجاد انیمیشن‌های تعاملی',
        'حل مسئله خلاقانه',
        'کار تیمی و ارائه'
      ]
    },
    'python-teens': {
      title: 'برنامه‌نویسی پایتون نوجوانان',
      description: 'آموزش زبان برنامه‌نویسی Python برای نوجوانان با تمرکز بر پروژه‌های عملی و ساخت برنامه‌های کاربردی.',
      duration: '۱۴ هفته',
      sessions: '۲۸ جلسه',
      price: '۲,۵۰۰,۰۰۰ تومان',
      level: 'متوسط',
      ageGroup: '۱۳ تا ۱۷ سال',
      classSize: '۱۲ نفر',
      teacher: 'مهدی محمدی',
      teacherExperience: '۱۲ سال سابقه تدریس برنامه‌نویسی',
      schedule: 'شنبه و دوشنبه - ۱۷:۰۰ تا ۱۹:۰۰',
      prerequisites: ['منطق ریاضی', 'علاقه به برنامه‌نویسی'],
      features: [
        'پروژه‌های عملی',
        'یادگیری تعاملی',
        'کار با کتابخانه‌های Python',
        'ساخت برنامه‌های کاربردی'
      ],
      learningOutcomes: [
        'دستور زبان Python',
        'برنامه‌نویسی شی‌گرا',
        'کار با فایل و داده',
        'ایجاد رابط کاربری',
        'مهارت‌های حل مسئله'
      ]
    },
    'photoshop-teens': {
      title: 'فتوشاپ نوجوانان',
      description: 'آموزش Adobe Photoshop برای نوجوانان با پروژه‌های خلاقانه، طراحی پوستر، ویرایش تصاویر و ساخت آثار هنری دیجیتال.',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۲,۰۰۰,۰۰۰ تومان',
      level: 'مقدماتی',
      ageGroup: '۱۲ تا ۱۷ سال',
      classSize: '۱۲ نفر',
      teacher: 'سیمین آقایی',
      teacherExperience: '۷ سال سابقه تدریس گرافیک',
      schedule: 'یکشنبه و چهارشنبه - ۱۶:۰۰ تا ۱۸:۰۰',
      prerequisites: ['علاقه به هنر', 'آشنایی با کامپیوتر'],
      features: [
        'پروژه‌های خلاقانه',
        'تکنیک‌های حرفه‌ای',
        'طراحی پوستر و کارت',
        'ویرایش عکس‌های دیجیتال'
      ],
      learningOutcomes: [
        'ابزارهای اصلی Photoshop',
        'لایه‌بندی و ماسک',
        'فیلترها و افکت‌ها',
        'ویرایش رنگ و نور',
        'طراحی گرافیک‌های کاربردی'
      ]
    },
    'interior-design': {
      title: 'طراحی داخلی معماری',
      description: 'آموزش اصول طراحی داخلی، دکوراسیون، انتخاب رنگ و چیدمان فضا با نرم‌افزارهای تخصصی معماری.',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۳,۰۰۰,۰۰۰ تومان',
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۰ نفر',
      teacher: 'مهدی محمدی',
      teacherExperience: '۱۵ سال سابقه طراحی و تدریس معماری',
      schedule: 'شنبه و سه‌شنبه - ۱۹:۰۰ تا ۲۱:۰۰',
      prerequisites: ['علاقه به طراحی', 'حس زیبایی‌شناسی'],
      features: [
        'پروژه‌های واقعی',
        'نرم‌افزارهای حرفه‌ای',
        'بازدید از پروژه‌ها',
        'کارگاه عملی طراحی'
      ],
      learningOutcomes: [
        'اصول طراحی داخلی',
        'انتخاب رنگ و بافت',
        'چیدمان و فضاسازی',
        'طراحی با نرم‌افزار',
        'ارائه پروژه به کارفرما'
      ]
    },
    'english-computer': {
      title: 'آموزش زبان با کامپیوتر',
      description: 'آموزش زبان انگلیسی با استفاده از نرم‌افزارهای تعاملی، بازی‌های آموزشی و تکنولوژی‌های نوین یادگیری.',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۱,۶۰۰,۰۰۰ تومان',
      level: 'مقدماتی تا متوسط',
      ageGroup: '۱۰ سال به بالا',
      classSize: '۱۵ نفر',
      teacher: 'سیمین آقایی',
      teacherExperience: '۹ سال سابقه تدریس زبان انگلیسی',
      schedule: 'دوشنبه و پنج‌شنبه - ۱۷:۰۰ تا ۱۸:۳۰',
      prerequisites: ['انگیزه یادگیری', 'آشنایی اولیه با انگلیسی'],
      features: [
        'نرم‌افزارهای تعاملی',
        'بازی‌های آموزشی',
        'تست‌های آنلاین',
        'گفتگوی تعاملی'
      ],
      learningOutcomes: [
        'مهارت‌های چهارگانه زبان',
        'واژگان کاربردی',
        'گرامر عملی',
        'تلفظ صحیح',
        'اعتماد به نفس در مکالمه'
      ]
    }
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