-- Update existing Departments table
ALTER TABLE public.Departments 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS icon TEXT,
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  level TEXT,
  features TEXT[],
  learning_outcomes TEXT[],
  department_id BIGINT REFERENCES public.Departments(id),
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  level TEXT,
  age_group TEXT,
  class_size INTEGER,
  features TEXT[],
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.Departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Departments are publicly readable" ON public.Departments FOR SELECT USING (true);
CREATE POLICY "Courses are publicly readable" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Programs are publicly readable" ON public.programs FOR SELECT USING (true);

-- Insert departments data
INSERT INTO public.Departments (Name, description, icon, slug) VALUES
('کامپیوتر', 'یادگیری مفاهیم پایه تا پیشرفته برنامه‌نویسی و علوم کامپیوتر', 'Code', 'computer'),
('گرافیک', 'طراحی حرفه‌ای و خلاقانه با ابزارهای مدرن', 'Palette', 'graphics'),
('معماری', 'اصول طراحی و ساخت فضاهای زیبا و کاربردی', 'Home', 'architecture'),
('زبان انگلیسی', 'تسلط کامل بر زبان انگلیسی در تمام سطوح', 'Globe', 'english')
ON CONFLICT (slug) DO UPDATE SET 
  Name = EXCLUDED.Name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- Insert courses data
INSERT INTO public.courses (title, description, duration, level, features, learning_outcomes, department_id, is_popular) 
SELECT 
  'برنامه‌نویسی Python',
  'یادگیری کامل زبان برنامه‌نویسی Python از مبتدی تا پیشرفته',
  '3 ماه',
  'مبتدی تا متوسط',
  ARRAY['پروژه‌های عملی', 'گواهی معتبر', 'پشتیبانی 24/7'],
  ARRAY['توسعه اپلیکیشن‌های وب', 'تحلیل داده', 'هوش مصنوعی پایه'],
  d.id,
  true
FROM public.Departments d WHERE d.slug = 'computer'
UNION ALL
SELECT 
  'طراحی گرافیک با Photoshop',
  'آموزش حرفه‌ای طراحی گرافیک و ویرایش تصاویر',
  '2 ماه',
  'مبتدی',
  ARRAY['پروژه‌های واقعی', 'نرم‌افزار اورجینال', 'کلاس‌های کوچک'],
  ARRAY['تسلط بر Photoshop', 'طراحی لوگو', 'ویرایش حرفه‌ای تصاویر'],
  d.id,
  false
FROM public.Departments d WHERE d.slug = 'graphics'
UNION ALL
SELECT 
  'AutoCAD Architecture',
  'نقشه‌کشی معماری حرفه‌ای با AutoCAD',
  '4 ماه',
  'متوسط',
  ARRAY['نرم‌افزار لایسنس دار', 'پروژه نهایی', 'استاد مجرب'],
  ARRAY['نقشه‌کشی دقیق', 'طراحی ساختمان', 'مدل‌سازی 3D'],
  d.id,
  true
FROM public.Departments d WHERE d.slug = 'architecture'
UNION ALL
SELECT 
  'IELTS Preparation',
  'آمادگی کامل برای آزمون آیلتس',
  '6 ماه',
  'متوسط تا پیشرفته',
  ARRAY['آزمون‌های تمرینی', 'کلاس‌های فشرده', 'مشاوره تخصصی'],
  ARRAY['نمره 7+ در آیلتس', 'مهارت‌های چهارگانه', 'اعتماد به نفس در صحبت'],
  d.id,
  false
FROM public.Departments d WHERE d.slug = 'english';

-- Insert programs data
INSERT INTO public.programs (title, description, duration, level, age_group, class_size, features, is_popular) VALUES
('دوره‌های کودکان', 'برنامه‌های آموزشی تخصصی برای کودکان 6 تا 12 سال', '4 ماه', 'مبتدی', '6-12 سال', 8, ARRAY['بازی‌های آموزشی', 'فعالیت‌های گروهی', 'ارزیابی مستمر'], true),
('دوره‌های نوجوانان', 'مسیرهای یادگیری مناسب نوجوانان 13 تا 18 سال', '6 ماه', 'مبتدی تا متوسط', '13-18 سال', 12, ARRAY['پروژه‌های تیمی', 'رقابت‌های علمی', 'مشاوره تحصیلی'], false),
('دوره‌های بزرگسالان', 'برنامه‌های تخصصی برای بزرگسالان و حرفه‌ای‌ها', '3-8 ماه', 'همه سطوح', '18+ سال', 15, ARRAY['زمان‌بندی انعطاف‌پذیر', 'گواهی حرفه‌ای', 'شبکه‌سازی'], true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON public.programs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();