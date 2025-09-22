-- Add RLS policy for Departments table
CREATE POLICY "Departments are publicly readable" 
ON public."Departments" 
FOR SELECT 
USING (true);