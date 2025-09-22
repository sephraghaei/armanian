-- Fix critical security vulnerability in users_app table
-- Remove the dangerous policy that allows anyone to read all user data
DROP POLICY IF EXISTS "Users can select their own data" ON public.users_app;

-- Since this is a custom auth system (not using Supabase's built-in auth),
-- we'll handle user data access through secure edge functions only
-- The existing "Allow service role full access" policy will allow edge functions
-- to access data securely while preventing direct client access

-- Add a comment for documentation
COMMENT ON TABLE public.users_app IS 'User data access is handled through secure edge functions only. No direct client SELECT access allowed.';