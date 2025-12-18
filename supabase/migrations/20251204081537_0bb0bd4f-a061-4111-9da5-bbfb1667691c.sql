-- Drop the old foreign key to auth.users
ALTER TABLE public.enrollments DROP CONSTRAINT enrollments_user_id_fkey;