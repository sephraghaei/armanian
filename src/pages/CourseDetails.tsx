import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  DollarSign,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { callEnrollments } from '@/lib/enrollmentsApi';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [enrolling, setEnrolling] = useState(false);

  // Sample course data - in real app, this would come from API/database
  const courseData: Record<string, any> = {
    'icdl-kids': {
      title: 'دوره مهارت های پنجگانه ICDL کودکان',
      description: 'در این دوره کودکان از پایه با سخت افزار کامپیوتر، فناوری اطلاعات، کار با سیستم عامل ویندوز و نرم افزار های آفیس شامل ورد و پاورپورینت و کار با ایمیل و اینترنت آشنا می شوند.',
      duration: '۱۰ هفته',
      sessions: '۲۵ جلسه',
      price: '۴,۶۰۰,۰۰۰ تومان',
      priceNumber: 4600000,
      oldPrice: '۴,۹۰۰,۰۰۰ تومان',
      level: 'مقدماتی',
      ageGroup: '۷ تا ۱۴ سال',
      classSize: '۱۰ نفر',
      prerequisites: ['علاقه به یادگیری'],
      certificate: 'گواهینامه معتبر بین المللی ICDL',
      features: ['پروژه‌های عملی تعاملی', 'بازی‌های آموزشی', 'پشتیبانی آنلاین والدین'],
      learningOutcomes: ['کار با سیستم عامل ویندوز', 'مدیریت فایل ها', 'تایپ ده انگشتی', 'ارایه مطالب با PowerPoint']
    },
    'icdl-adults': {
      title: 'مهارت های هفتگانه بزرگسالان',
      description: 'در این دوره‌ مهارت های کار با سخت افزار و نرم افزار کامپیوتر مانند ویندوز، اینترنت، ورد، پاورپوین و اکسل به صورت کامل و کاربردی آموزش داده می شود.',
      duration: '۱۰ هفته',
      sessions: '۲۵ جلسه',
      price: '۲,۲۰۰,۰۰۰ تومان',
      priceNumber: 2200000,
      level: 'متوسط',
      ageGroup: '۱۴ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['علاقه به یادگیری'],
      certificate: 'مدرک معتبر سازمان فنی و حرفه ای ICDL',
      features: ['گواهینامه بین‌المللی ICDL', 'نرم‌افزارهای Microsoft Office', 'پروژه‌های کاربردی'],
      learningOutcomes: ['کار با سیستم عامل ویندوز', 'استفاده از مرورگر', 'تایپ ده انگشتی', 'طراحی فاکتور با اکسل']
    },
    'scratch-kids': {
      title: 'برنامه‌نویسی اسکرچ کودکان',
      description: 'آموزش برنامه‌نویسی بصری با نرم‌افزار Scratch برای کودکان.',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۱,۸۰۰,۰۰۰ تومان',
      priceNumber: 1800000,
      level: 'مقدماتی',
      ageGroup: '۸ تا ۱۴ سال',
      classSize: '۱۰ نفر',
      prerequisites: ['آشنایی با کامپیوتر'],
      features: ['پروژه‌های بازی‌سازی', 'انیمیشن‌های تعاملی', 'منطق برنامه‌نویسی'],
      learningOutcomes: ['مفاهیم پایه برنامه‌نویسی', 'ساخت بازی‌های ساده', 'حل مسئله خلاقانه']
    },
    'python-basic': {
      title: 'برنامه نویسی پایتون مقدماتی',
      description: 'آموزش پایتون از مبتدی با پروژه‌های عملی',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۲,۲۰۰,۰۰۰ تومان',
      priceNumber: 2200000,
      level: 'مقدماتی',
      ageGroup: '۱۳ سال به بالا',
      classSize: '۱۲ نفر',
      prerequisites: ['منطق ریاضی'],
      features: ['پروژه‌های عملی', 'یادگیری تعاملی'],
      learningOutcomes: ['دستور زبان Python', 'برنامه‌نویسی پایه', 'کار با فایل']
    },
    'python-advanced': {
      title: 'برنامه نویسی پایتون پیشرفته',
      description: 'تکنیک‌های پیشرفته Python و توسعه پروژه‌های حرفه‌ای',
      duration: '۱۴ هفته',
      sessions: '۲۸ جلسه',
      price: '۲,۸۰۰,۰۰۰ تومان',
      priceNumber: 2800000,
      level: 'پیشرفته',
      ageGroup: '۱۶ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['پایتون مقدماتی'],
      features: ['پروژه‌های حرفه‌ای', 'کتابخانه‌های پیشرفته'],
      learningOutcomes: ['برنامه‌نویسی شی‌گرا', 'وب اسکریپینگ', 'API ها']
    },
    'photoshop-basic': {
      title: 'فتوشاپ مقدماتی',
      description: 'اصول اولیه فتوشاپ، ویرایش تصاویر و طراحی‌های ساده',
      duration: '۸ هفته',
      sessions: '۱۶ جلسه',
      price: '۱,۸۰۰,۰۰۰ تومان',
      priceNumber: 1800000,
      level: 'مقدماتی',
      ageGroup: '۱۲ سال به بالا',
      classSize: '۱۲ نفر',
      prerequisites: ['علاقه به هنر'],
      features: ['پروژه‌های خلاقانه', 'تکنیک‌های پایه'],
      learningOutcomes: ['ابزارهای اصلی', 'لایه‌بندی', 'ویرایش رنگ']
    },
    'photoshop-professional': {
      title: 'فتوشاپ جامع مخصوص بازارکار',
      description: 'تکنیک‌های حرفه‌ای طراحی گرافیک برای ورود به بازار کار',
      duration: '۱۴ هفته',
      sessions: '۲۸ جلسه',
      price: '۳,۲۰۰,۰۰۰ تومان',
      priceNumber: 3200000,
      level: 'پیشرفته',
      ageGroup: '۱۶ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['فتوشاپ مقدماتی'],
      features: ['پروژه‌های واقعی', 'آماده‌سازی بازار کار'],
      learningOutcomes: ['طراحی حرفه‌ای', 'رتوش پیشرفته', 'موکاپ']
    },
    'after-effects-basic': {
      title: 'افترافکت مقدماتی',
      description: 'آموزش اصول انیمیشن و جلوه‌های ویژه برای مبتدیان',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۲,۵۰۰,۰۰۰ تومان',
      priceNumber: 2500000,
      level: 'مقدماتی',
      ageGroup: '۱۵ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['آشنایی با فتوشاپ'],
      features: ['انیمیشن پایه', 'جلوه‌های ویژه'],
      learningOutcomes: ['اصول انیمیشن', 'کیفریم‌ها', 'اکسپرشن‌ها']
    },
    'after-effects-advanced': {
      title: 'افترافکت پیشرفته',
      description: 'تکنیک‌های حرفه‌ای موشن گرافیک و انیمیشن پیشرفته',
      duration: '۱۴ هفته',
      sessions: '۲۸ جلسه',
      price: '۳,۸۰۰,۰۰۰ تومان',
      priceNumber: 3800000,
      level: 'پیشرفته',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۸ نفر',
      prerequisites: ['افترافکت مقدماتی'],
      features: ['موشن گرافیک', 'پلاگین‌ها'],
      learningOutcomes: ['انیمیشن پیشرفته', 'VFX', 'کامپوزیت']
    },
    'interior-design-complete': {
      title: 'طراحی داخلی معماری جامع',
      description: 'آموزش جامع طراحی داخلی، دکوراسیون و چیدمان فضا',
      duration: '۱۶ هفته',
      sessions: '۳۲ جلسه',
      price: '۳,۵۰۰,۰۰۰ تومان',
      priceNumber: 3500000,
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['علاقه به طراحی'],
      features: ['پروژه‌های واقعی', 'نرم‌افزارهای حرفه‌ای'],
      learningOutcomes: ['طراحی داخلی', 'دکوراسیون', 'رندرگیری']
    },
    'sketchup': {
      title: 'اسکچاپ',
      description: 'آموزش مدل‌سازی سه بعدی و طراحی معماری با اسکچاپ',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۲,۲۰۰,۰۰۰ تومان',
      priceNumber: 2200000,
      level: 'مقدماتی',
      ageGroup: '۱۶ سال به بالا',
      classSize: '۱۲ نفر',
      prerequisites: ['آشنایی با کامپیوتر'],
      features: ['مدل‌سازی 3D', 'پروژه عملی'],
      learningOutcomes: ['مدل‌سازی', 'متریال', 'رندر']
    },
    'autocad-complete': {
      title: 'اتوکد جامع',
      description: 'نقشه‌کشی و طراحی فنی حرفه‌ای با اتوکد',
      duration: '۱۴ هفته',
      sessions: '۲۸ جلسه',
      price: '۳,۰۰۰,۰۰۰ تومان',
      priceNumber: 3000000,
      level: 'متوسط',
      ageGroup: '۱۶ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['آشنایی با کامپیوتر'],
      features: ['نقشه‌کشی', 'طراحی فنی'],
      learningOutcomes: ['نقشه‌کشی 2D', 'مدل‌سازی 3D', 'پلات']
    },
    '3ds-max': {
      title: '3DS Max',
      description: 'مدل‌سازی و رندرگیری حرفه‌ای با تریدی مکس',
      duration: '۱۶ هفته',
      sessions: '۳۲ جلسه',
      price: '۴,۲۰۰,۰۰۰ تومان',
      priceNumber: 4200000,
      level: 'پیشرفته',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۸ نفر',
      prerequisites: ['آشنایی با طراحی 3D'],
      features: ['مدل‌سازی', 'رندر V-Ray'],
      learningOutcomes: ['مدل‌سازی حرفه‌ای', 'نورپردازی', 'انیمیشن']
    },
    'facade-design': {
      title: 'طراحی نما مخصوص بازارکار',
      description: 'طراحی نمای ساختمان برای ورود به بازار کار',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۲,۸۰۰,۰۰۰ تومان',
      priceNumber: 2800000,
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['آشنایی با اتوکد'],
      features: ['طراحی نما', 'پروژه واقعی'],
      learningOutcomes: ['طراحی نما', 'متریال', 'ارائه']
    },
    'architectural-drawing': {
      title: 'نقشه کشی و معماری',
      description: 'اصول نقشه‌کشی، طراحی نقشه‌های فنی و جزئیات اجرایی',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۲,۶۰۰,۰۰۰ تومان',
      priceNumber: 2600000,
      level: 'متوسط',
      ageGroup: '۱۸ سال به بالا',
      classSize: '۱۰ نفر',
      prerequisites: ['آشنایی با معماری'],
      features: ['نقشه‌کشی', 'جزئیات اجرایی'],
      learningOutcomes: ['نقشه‌کشی فنی', 'استاندارد‌ها', 'جزئیات']
    },
    'english-computer': {
      title: 'آموزش زبان با کامپیوتر',
      description: 'زبان انگلیسی با نرم‌افزارهای تعاملی و تکنولوژی نوین',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۱,۶۰۰,۰۰۰ تومان',
      priceNumber: 1600000,
      level: 'مقدماتی',
      ageGroup: '۱۰ سال به بالا',
      classSize: '۱۵ نفر',
      prerequisites: ['انگیزه یادگیری'],
      features: ['نرم‌افزارهای تعاملی', 'بازی‌های آموزشی'],
      learningOutcomes: ['مهارت‌های چهارگانه', 'واژگان کاربردی', 'گرامر']
    },
    'english-thermic': {
      title: 'زبان ترمیک',
      description: 'روش نوین ترمیک برای یادگیری سریع و مؤثر زبان انگلیسی',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۱,۴۰۰,۰۰۰ تومان',
      priceNumber: 1400000,
      level: 'مقدماتی',
      ageGroup: '۱۵ سال به بالا',
      classSize: '۱۵ نفر',
      prerequisites: ['انگیزه یادگیری'],
      features: ['روش نوین', 'یادگیری سریع'],
      learningOutcomes: ['مکالمه روان', 'گرامر کاربردی']
    },
    'english-conversation': {
      title: 'زبان مکالمه محور',
      description: 'تمرکز بر مکالمه و ارتباط روان به زبان انگلیسی',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۱,۸۰۰,۰۰۰ تومان',
      priceNumber: 1800000,
      level: 'متوسط',
      ageGroup: '۱۲ سال به بالا',
      classSize: '۱۲ نفر',
      prerequisites: ['آشنایی اولیه با انگلیسی'],
      features: ['مکالمه عملی', 'تمرین گروهی'],
      learningOutcomes: ['مکالمه روان', 'تلفظ صحیح', 'اعتماد به نفس']
    },
    'english-movies': {
      title: 'یادگیری زبان با فیلم و سریال خارجی',
      description: 'یادگیری زبان انگلیسی از طریق تماشای فیلم و سریال',
      duration: '۸ هفته',
      sessions: '۱۶ جلسه',
      price: '۱,۵۰۰,۰۰۰ تومان',
      priceNumber: 1500000,
      level: 'متوسط',
      ageGroup: '۱۴ سال به بالا',
      classSize: '۱۵ نفر',
      prerequisites: ['انگلیسی پایه'],
      features: ['یادگیری جذاب', 'زبان روزمره'],
      learningOutcomes: ['لهجه طبیعی', 'اصطلاحات روزمره', 'درک شنیداری']
    },
    'robotics-kids': {
      title: 'رباتیک کودکان',
      description: 'آموزش ساخت و برنامه‌نویسی ربات‌ها با پروژه‌های عملی',
      duration: '۱۲ هفته',
      sessions: '۲۴ جلسه',
      price: '۲,۵۰۰,۰۰۰ تومان',
      priceNumber: 2500000,
      level: 'مقدماتی',
      ageGroup: '۷ تا ۱۴ سال',
      classSize: '۸ نفر',
      prerequisites: ['علاقه به فناوری'],
      features: ['ساخت ربات', 'برنامه‌نویسی'],
      learningOutcomes: ['ساخت ربات', 'برنامه‌نویسی ربات', 'حل مسئله']
    },
    'wordpress': {
      title: 'طراحی سایت با وردپرس',
      description: 'آموزش جامع طراحی و مدیریت وب سایت با وردپرس',
      duration: '۱۰ هفته',
      sessions: '۲۰ جلسه',
      price: '۲,۰۰۰,۰۰۰ تومان',
      priceNumber: 2000000,
      level: 'مقدماتی',
      ageGroup: '۱۵ سال به بالا',
      classSize: '۱۲ نفر',
      prerequisites: ['آشنایی با اینترنت'],
      features: ['طراحی سایت', 'سئو پایه'],
      learningOutcomes: ['ساخت سایت', 'مدیریت محتوا', 'افزونه‌ها']
    }
  };

  const course = courseData[courseId as string] || courseData['icdl-kids'];

  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }

    setEnrolling(true);
    try {
      // Check if already enrolled
      const { data: existingEnrollment } = await callEnrollments<{ id: string } | null>(
        'check_existing',
        { course_id: courseId }
      );

      if (existingEnrollment) {
        toast({
          title: "قبلاً ثبت نام شده",
          description: "شما قبلاً در این دوره ثبت نام کرده‌اید",
          variant: "destructive",
        });
        setEnrolling(false);
        return;
      }

      // Create enrollment
      const { data: newEnrollment, error } = await callEnrollments<{ id: string }>('create', {
        course_id: courseId,
        amount_due: (course.priceNumber || 0).toString(),
        payment_status: 'pending',
        payment_method: 'manual',
        payment_notes: 'در انتظار تایید پرداخت توسط مدیریت',
      });

      if (error) {
        console.error('Enrollment error:', error);
        toast({
          title: "خطا",
          description: "خطا در ثبت نام. لطفاً دوباره تلاش کنید",
          variant: "destructive",
        });
      } else {
        toast({
          title: "ثبت نام موفق",
          description: "در حال انتقال به صفحه پرداخت...",
        });
        if (newEnrollment?.id) {
          navigate(`/payment/${newEnrollment.id}`);
        } else {
          navigate('/profile');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطا",
        description: "خطای غیرمنتظره رخ داد",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
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
              <div className="bg-gradient-hero rounded-lg p-8">
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
                </CardContent>
              </Card>

              {/* Prerequisites */}
              {course.prerequisites && (
                <Card>
                  <CardHeader>
                    <CardTitle>پیش نیاز ها</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prerequisite: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Learning Outcomes */}
              {course.learningOutcomes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      توانایی هایی که کسب می کنید
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {course.learningOutcomes.map((outcome: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Certificate */}
              {course.certificate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      مدرک دوره
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
              {course.features && (
                <Card>
                  <CardHeader>
                    <CardTitle>ویژگی‌های دوره</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <Card className="border-primary/20 sticky top-24">
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
                    className="w-full text-white" 
                    size="lg"
                    onClick={handleEnroll}
                    disabled={enrolling}
                    style={{ background: 'linear-gradient(135deg, hsl(28,92%,56%), hsl(24,95%,55%))' }}
                  >
                    {enrolling ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        در حال ثبت نام...
                      </>
                    ) : (
                      <>
                        ثبت نام کنید
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </>
                    )}
                  </Button>
                  {!user && (
                    <p className="text-sm text-muted-foreground text-center">
                      برای ثبت نام ابتدا وارد حساب کاربری خود شوید
                    </p>
                  )}
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
