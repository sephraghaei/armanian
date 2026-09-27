# محیط Staging و Migrationهای Reversible

این سند فرایند تست تغییرات دیتابیس روی یک پروژه‌ی Supabase **جدا از production** را قبل از اعمال روی prod توضیح می‌دهد.

## معماری

```
[Preview Lovable]  --->  Supabase Production (drthfkbvxqjhuurmxjrk)
                                 ↑
                    فقط بعد از تست موفق روی staging
                                 ↑
[Local psql / SQL Editor]  --->  Supabase Staging (شما می‌سازید)
```

Lovable مستقیماً به دو پروژه Supabase وصل نمی‌شود؛ پس **staging دستی مدیریت می‌شود**:
- کد فرانت‌اند فقط به prod وصل است.
- Migrationها اول روی staging اجرا و rollback می‌شوند.
- بعد از تایید، همان migration داخل Lovable برای prod اجرا می‌شود.

## راه‌اندازی اولیه (یک‌بار)

1. وارد https://supabase.com/dashboard شوید و یک پروژه جدید بسازید: `armanian-staging`.
2. در **Project Settings → Database → Connection string (URI)** رشته‌ی اتصال را کپی کنید (با پسورد پروژه).
3. آن را به‌عنوان متغیر محیطی محلی نگه دارید:

   ```bash
   export STAGING_DB_URL="postgresql://postgres:PASSWORD@db.xxxx.supabase.co:5432/postgres"
   ```

4. schema فعلی prod را روی staging کپی کنید. ساده‌ترین راه: در Supabase Studio prod → **SQL Editor** → اجرای این کوئری و کپی نتیجه، سپس اجرای آن در staging:

   ```sql
   -- run in prod, then paste output into staging SQL editor
   -- یا از pg_dump --schema-only استفاده کنید (نیازمند دسترسی مستقیم psql است)
   ```

   یا اگر psql محلی دارید:

   ```bash
   pg_dump --schema-only "$PROD_DB_URL" > /tmp/prod-schema.sql
   psql "$STAGING_DB_URL" < /tmp/prod-schema.sql
   ```

## فرایند Migration Reversible

برای هر تغییر دیتابیس، **دو فایل** نگه می‌داریم:

```
supabase/migrations/<timestamp>_<name>.sql       ← up migration (Lovable خودش می‌سازد)
supabase/rollbacks/<timestamp>_<name>.down.sql   ← rollback دستی
```

### مراحل

1. **در Lovable از من بخواه migration را بنویسم.** من هم up و هم down می‌سازم.
2. **تست روی staging:**
   ```bash
   psql "$STAGING_DB_URL" -f supabase/migrations/<file>.sql
   # اپ را دستی تست کن (اگر staging را به یک نسخه لوکال از فرانت وصل کرده‌ای)
   psql "$STAGING_DB_URL" -f supabase/rollbacks/<file>.down.sql
   # مطمئن شو schema به حالت قبل برگشته
   ```
3. **اگر همه‌چیز درست بود:** در Lovable تایید کن تا همان up-migration روی prod اجرا شود.
4. **اگر روی prod مشکل پیش آمد:** فایل `.down.sql` را در SQL Editor پروژه‌ی prod اجرا کن.

## محدودیت‌های Rollback

- Rollback یک `DROP COLUMN` داده‌ی داخل آن ستون را از دست می‌دهد. قبل از هر rollback روی prod حتماً **Cloud → Advanced settings → Export data** بگیر.
- تغییرات RLS و Functionها معمولاً امن هستند و rollback دقیق دارند.
- تغییرات نوع ستون (`ALTER TYPE`) در صورت داشتن داده‌ی ناسازگار ممکن است reversible نباشد؛ در down.sql این موارد را با کامنت هشدار مشخص می‌کنیم.

## نمونه: افزودن ستون بی‌خطر

به‌عنوان تست فرایند، یک migration nullable و کاملاً reversible برای اضافه کردن `internal_note` به `posts` اضافه شده است. به فایل‌های زیر مراجعه کن:

- `supabase/migrations/20260719_add_posts_internal_note.sql`
- `supabase/rollbacks/20260719_add_posts_internal_note.down.sql`
