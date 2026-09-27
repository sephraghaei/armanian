-- Rollback for: 20260719_add_posts_internal_note.sql
-- WARNING: any data stored in posts.internal_note will be lost.

ALTER TABLE public.posts
  DROP COLUMN IF EXISTS internal_note;
