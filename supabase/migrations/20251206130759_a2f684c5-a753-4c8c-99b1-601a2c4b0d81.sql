-- Create user_roles table for role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

-- Service role can manage all roles
CREATE POLICY "Service role can manage roles"
ON public.user_roles
FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');