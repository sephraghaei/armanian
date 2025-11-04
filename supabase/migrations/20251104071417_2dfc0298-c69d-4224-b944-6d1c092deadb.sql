-- رفع مشکلات امنیتی

-- 1. اضافه کردن policy برای password_reset_tokens (INFO 1)
CREATE POLICY "Service role can manage reset tokens"
  ON public.password_reset_tokens FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- 2. تنظیم search_path برای تابع cleanup_expired_tokens (WARN 3)
CREATE OR REPLACE FUNCTION public.cleanup_expired_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.password_reset_tokens
  WHERE expires_at < now() OR used = true;
END;
$$;