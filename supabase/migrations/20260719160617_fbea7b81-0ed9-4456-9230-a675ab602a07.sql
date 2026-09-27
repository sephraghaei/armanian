-- Reversible sample migration: add nullable internal_note to posts
-- Down script: supabase/rollbacks/20260719_add_posts_internal_note.down.sql
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS internal_note TEXT;

COMMENT ON COLUMN public.posts.internal_note IS
  'Admin-only internal note. Nullable, reversible via DROP COLUMN.';