-- Remove overly permissive RLS policies from users_app table
-- This prevents direct public access to sensitive user data
-- Edge functions will still work as they use the service role key which bypasses RLS

-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Allow service role full access" ON public.users_app;
DROP POLICY IF EXISTS "Allow anonymous registration via edge function" ON public.users_app;

-- RLS remains enabled, but with no policies
-- This means:
-- 1. No direct client access to user data (secure)
-- 2. Edge functions using service role key can still access the table (functional)
-- 3. All authentication flows through the auth-login and auth-register edge functions