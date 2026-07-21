
-- 1) Lock down enrollments: remove permissive "true" policies; only service_role can access
DROP POLICY IF EXISTS "Allow public delete from enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow public insert to enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow public read access to enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow public update to enrollments" ON public.enrollments;

REVOKE ALL ON public.enrollments FROM anon, authenticated, public;
GRANT ALL ON public.enrollments TO service_role;

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages enrollments"
  ON public.enrollments FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- 2) users_app: explicit service-role only policy, revoke direct client grants
REVOKE ALL ON public.users_app FROM anon, authenticated, public;
GRANT ALL ON public.users_app TO service_role;
ALTER TABLE public.users_app ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role manages users_app" ON public.users_app;
CREATE POLICY "Service role manages users_app"
  ON public.users_app FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- 3) users_app_password_reset_tokens: ensure locked to service role only
REVOKE ALL ON public.users_app_password_reset_tokens FROM anon, authenticated, public;
GRANT ALL ON public.users_app_password_reset_tokens TO service_role;

-- 4) Convert has_role / is_admin to SECURITY INVOKER (safe: RLS on user_roles already
--    lets users read their own roles). Fixes definer-executable findings.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$ SELECT public.has_role(_user_id, 'admin') $$;

-- 5) cleanup_expired_tokens: add fixed search_path, revoke from callers
CREATE OR REPLACE FUNCTION public.cleanup_expired_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$ BEGIN DELETE FROM public.password_reset_tokens WHERE expires_at < now() OR used = true; END; $function$;

-- 6) Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated/public
REVOKE ALL ON FUNCTION public.make_user_admin(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.cleanup_expired_tokens() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Ensure invoker functions are still callable by client roles (needed for RLS eval)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO anon, authenticated;
