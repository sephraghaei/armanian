-- Drop the foreign key constraint that requires course_id to be a valid UUID from courses table
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_course_id_fkey;