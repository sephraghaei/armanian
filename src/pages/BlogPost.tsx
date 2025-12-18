import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, ArrowRight, Tag, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category: string;
  tags: string[];
  published_at: string;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (!error && data) {
      setPost(data as Post);
    }
    setLoading(false);
  };

  const sharePost = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'کپی شد',
        description: 'لینک مطلب در کلیپ‌بورد کپی شد',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">مطلب یافت نشد</h1>
            <p className="text-muted-foreground mb-6">این مطلب وجود ندارد یا حذف شده است.</p>
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                بازگشت به مطالب
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        {post.featured_image && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowRight className="h-4 w-4" />
              بازگشت به مطالب
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <Badge variant="secondary">{post.category}</Badge>
              )}
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at || post.created_at).toLocaleDateString('fa-IR')}
              </span>
              <Button variant="ghost" size="sm" onClick={sharePost} className="gap-1">
                <Share2 className="h-4 w-4" />
                اشتراک‌گذاری
              </Button>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-muted-foreground mb-8 border-r-4 border-primary pr-4">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {post.content?.split('\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i}>{paragraph}</p>
              ))}
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  برچسب‌ها
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <Badge key={i} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
