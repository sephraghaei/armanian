-- Update enrollments table RLS policies to make them public temporarily
-- This allows the custom auth system to work with enrollments

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can delete their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON enrollments;

-- Create new permissive policies for custom auth
-- Allow all authenticated operations (we'll handle auth in the application layer)
CREATE POLICY "Allow public read access to enrollments"
ON enrollments FOR SELECT
USING (true);

CREATE POLICY "Allow public insert to enrollments"
ON enrollments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update to enrollments"
ON enrollments FOR UPDATE
USING (true);

CREATE POLICY "Allow public delete from enrollments"
ON enrollments FOR DELETE
USING (true);