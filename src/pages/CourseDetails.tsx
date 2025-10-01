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
      title: 'دوره مهارت های پنجگانه ICDL کودکان',
      description: 'در این دوره کودکان از پایه با سخت افزار کامپیوتر، فناوری اطلاعات، کار با سیستم عامل ویندوز و نرم افزار های آفیس شامل ورد و پاورپورینت و کار با ایمیل و اینترنت آشنا می شوند. این دوره مخصوص کودکان ۷ تا ۱۴ سال می باشد و با متد های بازی و سرگرمی همراه با یادگیری برای کودکان فضایی مفرح و جذاب فراهم کرده است.',
      duration: '۱۰ هفته',
      sessions: '۲۵ جلسه',
      price: '۴,۶۰۰,۰۰۰ تومان',
      oldPrice: '۴,۹۰۰,۰۰۰ تومان',
      level: 'مقدماتی',
      ageGroup: '۷ تا ۱۴ سال',
      classSize: '۱۰ نفر',
      schedule: null,
      prerequisites: ['علاقه به یادگیری'],
      certificate: 'گواهینامه معتبر بین المللی ICDL',
      features: [
        'پروژه‌های عملی تعاملی',
        'بازی‌های آموزشی',
        'پشتیبانی آنلاین والدین'
      ],
      learningOutcomes: [
        'کار با سیستم عامل ویندوز ۷ و ۱۰',
        'مدیریت فایل ها و پوشه ها',
        'شناخت سخت افزار و نرم افزار کامپیوتر',
        'تایپ ده انگشتی',
        'ارایه مطالب با power point',
        'طراحی جلد کتاب با word',
        'طراحی تراکت با word',
        'ساخت ایمیل',
        'سرچ اصولی در گوگل و copilot'
      ]
    },
    'icdl-adults': {
      title: 'ICDL بزرگسالان',
      description: 'گواهینامه بین‌المللی مهارت‌های کامپیوتری برای بزرگسالان شامل تمامی ماژول‌های ICDL و آمادگی برای آزمون بین‌المللی.',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۲,۲۰۰,۰۰۰ تومان',
      oldPrice: undefined,
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۵ نفر',
      schedule: 'یکشنبه و سه‌شنبه - ۱۸:۰۰ تا ۲۰:۰۰',
      prerequisites: ['آشنایی اولیه با کامپیوتر', 'انگیزه یادگیری'],
      certificate: undefined,
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
      oldPrice: undefined,
      level: 'مقدماتی',
      ageGroup: '۸ تا ۱۴ سال',
      classSize: '۱۰ نفر',
      schedule: 'چهارشنبه و جمعه - ۱۶:۳۰ تا ۱۸:۰۰',
      prerequisites: ['آشنایی با کامپیوتر', 'علاقه به خلاقیت'],
      certificate: undefined,
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
      oldPrice: undefined,
      level: 'متوسط',
      ageGroup: '۱۳ تا ۱۷ سال',
      classSize: '۱۲ نفر',
      schedule: 'شنبه و دوشنبه - ۱۷:۰۰ تا ۱۹:۰۰',
      prerequisites: ['منطق ریاضی', 'علاقه به برنامه‌نویسی'],
      certificate: undefined,
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
      oldPrice: undefined,
      level: 'مقدماتی',
      ageGroup: '۱۲ تا ۱۷ سال',
      classSize: '۱۲ نفر',
      schedule: 'یکشنبه و چهارشنبه - ۱۶:۰۰ تا ۱۸:۰۰',
      prerequisites: ['علاقه به هنر', 'آشنایی با کامپیوتر'],
      certificate: undefined,
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
      oldPrice: undefined,
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۰ نفر',
      schedule: 'شنبه و سه‌شنبه - ۱۹:۰۰ تا ۲۱:۰۰',
      prerequisites: ['علاقه به طراحی', 'حس زیبایی‌شناسی'],
      certificate: undefined,
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
      oldPrice: undefined,
      level: 'مقدماتی تا متوسط',
      ageGroup: '۱۰ سال به بالا',
      classSize: '۱۵ نفر',
      schedule: 'دوشنبه و پنج‌شنبه - ۱۷:۰۰ تا ۱۸:۳۰',
      prerequisites: ['انگیزه یادگیری', 'آشنایی اولیه با انگلیسی'],
      certificate: undefined,
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

                  {course.schedule && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">زمان‌بندی کلاس‌ها</h3>
                        <p className="text-muted-foreground">{course.schedule}</p>
                      </div>
                    </>
                  )}
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
                    توانایی هایی که بعد از اتمام این دوره کسب می کنید
                  </CardTitle>
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

              {/* Certificate */}
              {course.certificate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      مدارک دوره
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{course.certificate}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

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
              {/* Enrollment Card */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">ثبت نام در دوره</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    {course.oldPrice && (
                      <p className="text-lg text-muted-foreground line-through">{course.oldPrice}</p>
                    )}
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;