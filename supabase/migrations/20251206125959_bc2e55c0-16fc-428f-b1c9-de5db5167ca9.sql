-- Change course_id column type from UUID to TEXT to allow both UUIDs and slugs
ALTER TABLE public.enrollments ALTER COLUMN course_id TYPE text;