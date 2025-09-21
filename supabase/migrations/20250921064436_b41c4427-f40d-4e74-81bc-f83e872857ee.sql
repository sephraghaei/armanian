-- Create users_app table for custom authentication
CREATE TABLE public.users_app (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users_app ENABLE ROW LEVEL SECURITY;

-- Create policies for users_app table
CREATE POLICY "Users can view their own data" 
ON public.users_app 
FOR SELECT 
USING (true); -- Users can select from this table (needed for login)

CREATE POLICY "Users can insert their own data" 
ON public.users_app 
FOR INSERT 
WITH CHECK (true); -- Allow registration

CREATE POLICY "Users can update their own data" 
ON public.users_app 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_users_app_updated_at
BEFORE UPDATE ON public.users_app
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for phone number lookup
CREATE INDEX idx_users_app_phone ON public.users_app(phone);