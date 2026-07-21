// Client helper for calling the enrollments-api edge function.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export async function callEnrollments<T = any>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<{ data?: T; error?: string }> {
  const token = localStorage.getItem('app_token') || '';
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/enrollments-api`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-app-token': token,
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ action, ...payload }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { error: body.error || 'خطا در ارتباط با سرور' };
    return { data: body.data as T };
  } catch (e: any) {
    return { error: e?.message || 'خطای شبکه' };
  }
}
