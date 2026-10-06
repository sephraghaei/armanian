import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Exp = 'beginner' | 'intermediate' | 'advanced';
interface Rec { course_id: string; reason: string; match: number; course: { id: string; title: string; level: string | null; duration: string | null } }

const levels: { v: Exp; l: string }[] = [
  { v: 'beginner', l: 'مبتدی' },
  { v: 'intermediate', l: 'متوسط' },
  { v: 'advanced', l: 'پیشرفته' },
];

const CourseRecommender = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState('');
  const [goal, setGoal] = useState('');
  const [experience, setExperience] = useState<Exp>('beginner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ summary: string; recommendations: Rec[] } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.trim().length < 2) { setError('لطفاً علایق خود را بنویسید.'); return; }
    setLoading(true); setError(''); setResult(null);
    const { data, error } = await supabase.functions.invoke('recommend-courses', {
      body: { interests, experience, goal },
    });
    setLoading(false);
    if (error || data?.error) {
      let msg = data?.error;
      try { msg = msg || (await (error as any)?.context?.json())?.error; } catch { /* noop */ }
      setError(msg || 'دریافت پیشنهاد با خطا مواجه شد.');
      return;
    }
    setResult(data);
  };

  return (
    <section className="py-10 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-xl border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-foreground">پیشنهاد هوشمند دوره</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">علایق و سطح تجربه‌ات را بگو تا مناسب‌ترین دوره‌های برنامه‌نویسی را پیشنهاد کنیم.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="rec-interests" className="block text-sm font-medium mb-1.5">علایق تو</label>
              <Textarea id="rec-interests" value={interests} onChange={(e) => setInterests(e.target.value)}
                maxLength={500} rows={3} placeholder="مثلاً: ساخت بازی، طراحی سایت، هوش مصنوعی…" />
            </div>
            <div>
              <span className="block text-sm font-medium mb-1.5">سطح تجربه</span>
              <div className="flex gap-2" role="radiogroup">
                {levels.map((x) => (
                  <Button key={x.v} type="button" role="radio" aria-checked={experience === x.v}
                    variant={experience === x.v ? 'default' : 'outline'} size="sm" onClick={() => setExperience(x.v)}>
                    {x.l}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="rec-goal" className="block text-sm font-medium mb-1.5">هدف (اختیاری)</label>
              <Input id="rec-goal" value={goal} onChange={(e) => setGoal(e.target.value)} maxLength={300}
                placeholder="مثلاً: پیدا کردن شغل، آمادگی دانشگاه" />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin ml-2" />در حال بررسی…</> : 'دریافت پیشنهاد'}
            </Button>
          </form>

          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}

          {result && (
            <div className="mt-6 space-y-3" aria-live="polite">
              {result.summary && <p className="text-sm text-muted-foreground">{result.summary}</p>}
              {result.recommendations.length === 0 && <p className="text-sm">دوره مناسبی پیدا نشد.</p>}
              {result.recommendations.map((r) => (
                <div key={r.course_id} className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{r.course.title}</h3>
                      {r.course.level && <Badge variant="secondary">{r.course.level}</Badge>}
                      <Badge variant="outline">{Math.round(r.match)}٪ تطابق</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{r.reason}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/course-detail/${r.course.id}`)}>
                    مشاهده دوره <ArrowLeft className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseRecommender;
