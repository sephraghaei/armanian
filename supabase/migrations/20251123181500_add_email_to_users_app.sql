-- Add email column to users_app and create password reset tokens table
ALTER TABLE public.users_app
ADD COLUMN IF NOT EXISTS email TEXT;

-- Ensure emails are unique when provided
CREATE UNIQUE INDEX IF NOT EXISTS users_app_email_unique_idx
ON public.users_app (lower(email))
WHERE email IS NOT NULL;

-- Password reset tokens tied to users_app
CREATE TABLE IF NOT EXISTS public.users_app_password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users_app(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.users_app_password_reset_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role full access on users_app_password_reset_tokens"
ON public.users_app_password_reset_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
