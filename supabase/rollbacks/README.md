# Rollback Scripts

هر فایل اینجا معکوس یک migration در `supabase/migrations/` است.

قواعد:
- نام فایل: `<همان‌timestamp>_<همان‌نام>.down.sql`
- باید idempotent باشد (`DROP ... IF EXISTS`, `DROP POLICY IF EXISTS`).
- برای هشدار از دست رفتن داده، بالای فایل کامنت `-- WARNING: data loss` بگذار.

اجرا:

```bash
psql "$STAGING_DB_URL" -f supabase/rollbacks/<file>.down.sql   # اول staging
psql "$PROD_DB_URL"    -f supabase/rollbacks/<file>.down.sql   # فقط در اضطرار
```

برای فرایند کامل به `STAGING.md` در ریشه‌ی پروژه مراجعه کن.
