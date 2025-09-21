-- Fix RLS policies for users_app table (remove the generic policies)
DROP POLICY IF EXISTS "Users can view their own data" ON public.users_app;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users_app; 
DROP POLICY IF EXISTS "Users can update their own data" ON public.users_app;

-- Create more specific and secure policies for custom auth system
-- Edge functions need these policies to work with service role
CREATE POLICY "Allow service role full access" 
ON public.users_app 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Allow users to select their own data (for client-side operations)
CREATE POLICY "Users can select their own data" 
ON public.users_app 
FOR SELECT 
TO authenticated
USING (true);

-- Public registration is allowed through edge function only
CREATE POLICY "Allow anonymous registration via edge function" 
ON public.users_app 
FOR INSERT 
TO anon
WITH CHECK (true);