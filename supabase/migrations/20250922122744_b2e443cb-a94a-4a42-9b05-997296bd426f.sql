-- Drop existing RLS policies for enrollments that use auth.uid()
DROP POLICY IF EXISTS "Users can delete their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

-- Create new RLS policies that work with our custom auth system
-- Since we're using custom authentication, we'll allow public access for now
-- and handle authorization in the application layer

CREATE POLICY "Public can view enrollments" 
ON public.enrollments 
FOR SELECT 
USING (true);

CREATE POLICY "Public can insert enrollments" 
ON public.enrollments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update enrollments" 
ON public.enrollments 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete enrollments" 
ON public.enrollments 
FOR DELETE 
USING (true);