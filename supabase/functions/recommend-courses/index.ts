import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';

const Body = z.object({
  interests: z.string().trim().min(2).max(500),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  goal: z.string().trim().max(300).optional().default(''),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const expLabel = { beginner: 'مبتدی (بدون تجربه)', intermediate: 'متوسط', advanced: 'پیشرفته' };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return json({ error: 'لطفاً علایق و سطح تجربه را درست وارد کنید.' }, 400);
    const { interests, experience, goal } = parsed.data;

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) return json({ error: 'سرویس هوش مصنوعی پیکربندی نشده است.' }, 500);

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);
    const { data: courses, error } = await supabase
      .from('courses').select('id, title, description, level, duration, features').limit(100);
    if (error) throw error;
    if (!courses?.length) return json({ recommendations: [], summary: 'فعلاً دوره‌ای موجود نیست.' });

    const catalog = courses.map((c) => ({
      id: c.id, title: c.title, level: c.level, duration: c.duration,
      description: (c.description ?? '').slice(0, 300), features: (c.features ?? []).slice(0, 6),
    }));

    const schema = {
      type: 'object', additionalProperties: false, required: ['summary', 'recommendations'],
      properties: {
        summary: { type: 'string' },
        recommendations: {
          type: 'array',
          items: {
            type: 'object', additionalProperties: false, required: ['course_id', 'reason', 'match'],
            properties: {
              course_id: { type: 'string' },
              reason: { type: 'string' },
              match: { type: 'integer' },
            },
          },
        },
      },
    };

    const upstream = await fetch('https://ai.gateway.lovable.dev/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Lovable-API-Key': apiKey,
        'X-Lovable-AIG-SDK': 'fetch',
      },
      body: JSON.stringify({
        model: 'openai/gpt-6-astra',
        stream: true,
        store: false,
        reasoning: { effort: 'low' },
        instructions:
          'تو مشاور آموزشی آموزشگاه آرمانیان هستی. فقط از میان دوره‌های فهرست داده‌شده (با course_id دقیق) پیشنهاد بده، با تمرکز بر دوره‌های برنامه‌نویسی و مرتبط با علایق دانش‌آموز. حداکثر ۳ دوره، مرتب از بهترین. match عددی بین ۰ تا ۱۰۰. reason یک یا دو جمله فارسی کوتاه. summary یک جمله فارسی. اگر دوره مناسبی نبود آرایه خالی بده.',
        input: `دوره‌های موجود:\n${JSON.stringify(catalog)}\n\nعلایق دانش‌آموز: ${interests}\nسطح تجربه: ${expLabel[experience]}\nهدف: ${goal || 'ذکر نشده'}`,
        text: { format: { type: 'json_schema', name: 'recommendations', strict: true, schema } },
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const t = await upstream.text();
      console.error('AI gateway error', upstream.status, t);
      const msg = upstream.status === 429 ? 'درخواست‌ها زیاد است، کمی بعد دوباره امتحان کنید.'
        : upstream.status === 402 ? 'اعتبار هوش مصنوعی تمام شده است.'
        : 'دریافت پیشنهاد با خطا مواجه شد.';
      return json({ error: msg }, upstream.status);
    }

    // Consume SSE stream and collect output text
    const reader = upstream.body.getReader();
    const dec = new TextDecoder();
    let buf = '', text = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith('data:')) continue;
        const d = line.slice(5).trim();
        if (!d || d === '[DONE]') continue;
        try {
          const ev = JSON.parse(d);
          if (ev.type === 'response.output_text.delta') text += ev.delta;
          if (ev.type === 'response.failed' || ev.type === 'error') console.error('stream error', d);
        } catch { /* ignore */ }
      }
    }

    if (!text) return json({ error: 'پاسخی از هوش مصنوعی دریافت نشد.' }, 502);
    const out = JSON.parse(text);
    const byId = new Map(courses.map((c) => [String(c.id), c]));
    const recommendations = (out.recommendations ?? [])
      .filter((r: any) => byId.has(String(r.course_id)))
      .map((r: any) => ({ ...r, course: byId.get(String(r.course_id)) }));
    return json({ summary: out.summary, recommendations });
  } catch (e) {
    console.error(e);
    return json({ error: 'خطای غیرمنتظره رخ داد.' }, 500);
  }
});
