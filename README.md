# آکادمی آرمانیان

## نمای کلی پروژه

این پروژه یک پلتفرم آموزشی کامل است که شامل سیستم احراز هویت، مدیریت دوره‌ها، ثبت‌نام کاربران و پنل مدیریت می‌باشد.

**URL پروژه**: https://lovable.dev/projects/0f4237ec-2697-4040-b652-faa8099a0b72

## امکانات پیاده‌سازی شده

### ✅ 1. سیستم احراز هویت کامل

#### ثبت‌نام کاربران
- استفاده از Supabase Authentication
- ثبت‌نام با ایمیل، رمز عبور، نام و نام خانوادگی
- ارسال خودکار ایمیل خوش‌آمدگویی
- ایجاد خودکار پروفایل کاربر
- تخصیص خودکار نقش "user" به کاربران جدید

```typescript
// نمونه فراخوانی
const { error } = await signUp(
  "user@example.com",
  "SecurePass123",
  "علی",
  "احمدی",
  "+989123456789" // اختیاری
);
```

#### ورود کاربران
- ورود با ایمیل و رمز عبور
- نگهداری session در localStorage
- بررسی خودکار وضعیت کاربر

```typescript
const { error } = await signIn("user@example.com", "SecurePass123");
```

#### بازیابی رمز عبور
- درخواست لینک بازیابی با ایمیل
- ارسال ایمیل حاوی لینک امن
- تغییر رمز عبور از طریق توکن

```typescript
// درخواست بازیابی
const { error } = await resetPassword("user@example.com");

// تغییر رمز با توکن
const { error } = await updatePassword(token, "NewPassword123");
```

#### محافظت از مسیرها
```typescript
// استفاده از RequireAuth component
<Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
```

### ✅ 2. بخش مدیریت دوره‌ها (پنل ادمین)

#### دسترسی
فقط کاربران با نقش `admin` می‌توانند به پنل دسترسی داشته باشند.

#### امکانات
- ✅ ایجاد دوره جدید
- ✅ ویرایش دوره‌های موجود
- ✅ حذف دوره‌ها
- ✅ مشاهده لیست تمام دوره‌ها

مسیر: `/admin`

### ✅ 3. بخش کاربر (داشبورد)

#### امکانات پروفایل
- مشاهده اطلاعات کاربری
- ویرایش نام نمایشی
- آواتار کاربر

#### مدیریت ثبت‌نام‌ها
- مشاهده دوره‌های ثبت‌نام شده
- وضعیت دوره‌ها (فعال/منقضی/به‌زودی منقضی)
- امکان لغو ثبت‌نام
- تمدید دوره‌ها

مسیر: `/profile`

### ✅ 4. سیستم اطلاع‌رسانی

#### ارسال ایمیل‌های خودکار
1. **ایمیل خوش‌آمدگویی**: پس از ثبت‌نام
2. **ایمیل بازیابی رمز**: برای تغییر رمز عبور
3. **ایمیل ثبت‌نام در دوره**: پس از ثبت‌نام در هر دوره (قابل پیاده‌سازی)

Edge Function مربوطه: `send-email`

### ✅ 5. ساختار داده‌ها

#### جداول اصلی

**users (auth.users)**
- مدیریت توسط Supabase Auth
- شامل ایمیل، رمز عبور (hash شده)، metadata

**profiles**
```sql
- id: UUID (PK)
- user_id: UUID (FK -> auth.users)
- display_name: TEXT
- avatar_url: TEXT
- phone: TEXT
- first_name: TEXT
- last_name: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**user_roles**
```sql
- id: UUID (PK)
- user_id: UUID (FK -> auth.users)
- role: app_role ENUM ('admin', 'user')
- created_at: TIMESTAMP
```

**courses**
```sql
- id: UUID (PK)
- title: TEXT
- description: TEXT
- duration: TEXT
- level: TEXT
- features: TEXT[]
- learning_outcomes: TEXT[]
- department_id: BIGINT (FK -> departments)
- is_popular: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**enrollments**
```sql
- id: UUID (PK)
- user_id: UUID (FK -> auth.users)
- course_id: UUID (FK -> courses)
- enrolled_at: TIMESTAMP
- expires_at: TIMESTAMP
- status: TEXT ('active', 'expired')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**password_reset_tokens**
```sql
- id: UUID (PK)
- user_id: UUID (FK -> auth.users)
- token: TEXT (UNIQUE)
- expires_at: TIMESTAMP
- used: BOOLEAN
- created_at: TIMESTAMP
```

### ✅ 6. امنیت و RLS Policies

#### Row Level Security فعال برای تمام جداول

**profiles**
- کاربران فقط پروفایل خود را می‌بینند
- کاربران فقط پروفایل خود را ویرایش می‌کنند

**user_roles**
- کاربران نقش‌های خود را می‌بینند
- Admin ها تمام نقش‌ها را می‌بینند و مدیریت می‌کنند

**courses**
- همه می‌توانند دوره‌ها را ببینند
- فقط Admin ها می‌توانند دوره ایجاد/ویرایش/حذف کنند

**enrollments**
- کاربران فقط ثبت‌نام‌های خود را می‌بینند
- Admin ها تمام ثبت‌نام‌ها را می‌بینند

## Edge Functions

### 1. send-email
**مسیر**: `/functions/v1/send-email`  
**احراز هویت**: نیاز به JWT

**ورودی**:
```json
{
  "to": "user@example.com",
  "subject": "عنوان ایمیل",
  "html": "<h1>محتوای HTML</h1>",
  "type": "welcome" | "enrollment" | "reset_password"
}
```

**خروجی**:
```json
{
  "id": "email-id",
  "from": "آرمانیان آکادمی <onboarding@resend.dev>",
  "to": ["user@example.com"],
  "created_at": "2025-01-01T00:00:00Z"
}
```

### 2. password-reset
**مسیر**: `/functions/v1/password-reset`  
**احراز هویت**: عمومی (verify_jwt = false)

**درخواست لینک بازیابی**:
```json
{
  "email": "user@example.com"
}
```

**تغییر رمز با توکن**:
```json
{
  "token": "uuid-token",
  "newPassword": "NewSecurePass123"
}
```

**خروجی موفق**:
```json
{
  "message": "رمز عبور با موفقیت تغییر کرد"
}
```

## تنظیمات محیط (Secrets)

### Secrets مورد نیاز

1. **RESEND_API_KEY**: کلید API سرویس Resend برای ارسال ایمیل
2. **SUPABASE_URL**: آدرس پروژه Supabase (خودکار)
3. **SUPABASE_SERVICE_ROLE_KEY**: کلید سرویس Supabase (خودکار)

## نصب و راه‌اندازی

```bash
# 1. کلون پروژه
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. نصب dependencies
npm install

# 3. اجرای پروژه در محیط توسعه
npm run dev
```

## نقش‌های کاربری

### ایجاد اولین Admin

برای تبدیل یک کاربر به Admin، باید یک رکورد در جدول `user_roles` ایجاد کنید:

```sql
-- در Supabase SQL Editor
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin');
```

یا از طریق Supabase Dashboard:
1. Authentication → Users → کپی UUID کاربر
2. Table Editor → user_roles → Insert row
3. user_id: UUID کاربر، role: admin

## مسیرها (Routes)

| مسیر | دسترسی | توضیحات |
|------|--------|---------|
| `/` | عمومی | صفحه اصلی |
| `/auth` | عمومی | ورود/ثبت‌نام |
| `/reset-password` | عمومی | بازیابی رمز عبور |
| `/courses` | عمومی | لیست دوره‌ها |
| `/course/:id` | عمومی | جزئیات دوره |
| `/profile` | کاربران | داشبورد کاربر |
| `/admin` | فقط Admin | پنل مدیریت |
| `/departments` | عمومی | بخش‌های آموزشی |

## نمونه فلوهای کاری

### فلو ثبت‌نام کاربر جدید
1. کاربر وارد `/auth` می‌شود
2. فرم ثبت‌نام را پر می‌کند
3. `signUp()` فراخوانی می‌شود
4. Supabase کاربر را ایجاد می‌کند
5. Trigger `handle_new_user` اجرا می‌شود
6. پروفایل و نقش "user" ایجاد می‌شوند
7. ایمیل خوش‌آمدگویی ارسال می‌شود
8. کاربر وارد می‌شود و به صفحه اصلی می‌رود

### فلو ثبت‌نام در دوره
1. کاربر دوره مورد نظر را انتخاب می‌کند
2. روی دکمه ثبت‌نام کلیک می‌کند
3. رکورد جدید در جدول `enrollments` ایجاد می‌شود
4. ایمیل تأیید ثبت‌نام ارسال می‌شود (قابل پیاده‌سازی)
5. دوره در داشبورد کاربر نمایش داده می‌شود

### فلو مدیریت دوره (Admin)
1. Admin وارد `/admin` می‌شود
2. فرم ایجاد/ویرایش دوره را پر می‌کند
3. درخواست به Supabase ارسال می‌شود
4. RLS policy بررسی می‌کند کاربر Admin است
5. تغییرات اعمال می‌شوند
6. لیست دوره‌ها به‌روز می‌شود

## تکنولوژی‌های استفاده شده

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn-ui
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Edge Functions**: Deno (Supabase Functions)
- **Email**: Resend
- **State Management**: React Context API
- **Routing**: React Router v6

## مستندات مفید

- [Supabase Authentication](https://supabase.com/docs/guides/auth)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Resend Email API](https://resend.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## استقرار (Deployment)

پروژه به صورت خودکار از طریق Lovable قابل استقرار است:

1. در Lovable، روی دکمه "Publish" کلیک کنید
2. پروژه به صورت خودکار deploy می‌شود
3. لینک عمومی دریافت می‌کنید

برای استقرار سفارشی:
```bash
npm run build
# فایل‌های dist را روی هاست دلخواه آپلود کنید
```

## پشتیبانی

برای سوالات یا گزارش مشکلات، به مخزن GitHub مراجعه کنید یا با تیم پشتیبانی تماس بگیرید.

---

**نسخه**: 1.0.0  
**آخرین به‌روزرسانی**: 2025
