-- Create posts table for CMS content
CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  featured_image text,
  status text NOT NULL DEFAULT 'draft',
  author_id uuid REFERENCES public.users_app(id),
  category text,
  tags text[],
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Posts are publicly readable when published
CREATE POLICY "Published posts are publicly readable"
ON public.posts
FOR SELECT
USING (status = 'published');

-- Admins can read all posts
CREATE POLICY "Admins can read all posts"
ON public.posts
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Admins can insert posts
CREATE POLICY "Admins can insert posts"
ON public.posts
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Admins can update posts
CREATE POLICY "Admins can update posts"
ON public.posts
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Admins can delete posts
CREATE POLICY "Admins can delete posts"
ON public.posts
FOR DELETE
USING (public.is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();