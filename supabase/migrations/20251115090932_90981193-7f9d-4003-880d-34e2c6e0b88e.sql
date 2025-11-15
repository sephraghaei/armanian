-- Function to make a user an admin by phone number (for initial setup)
-- This is a helper function that can be called manually to assign admin role
CREATE OR REPLACE FUNCTION public.make_user_admin(user_phone TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find user by phone
  SELECT id INTO target_user_id
  FROM public.users_app
  WHERE phone = user_phone;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with phone % not found', user_phone;
  END IF;
  
  -- Insert admin role if not exists
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Example usage (commented out - uncomment and update phone number to use):
-- SELECT public.make_user_admin('989123456789');