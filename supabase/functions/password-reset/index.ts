// deno-lint-ignore-file no-explicit-any
declare const Deno: any;
// @ts-ignore
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  return bufferToHex(hashBuffer);
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const siteUrl = Deno.env.get("SITE_URL") || 'http://localhost:5173';

  if (!url || !key) {
    return new Response(JSON.stringify({ error: 'تنظیمات سرور ناقص است' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  }

  const supabase = createClient(url, key);

  try {
    const { email, token, newPassword } = await req.json();

    // درخواست بازیابی رمز
    if (email && !token && !newPassword) {
      const normalizedEmail = String(email).trim().toLowerCase();

      const { data: user, error: userError } = await supabase
        .from('users_app')
        .select('id, email, first_name, last_name')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (userError) {
        console.error('Database error fetching user for reset:', userError);
        return new Response(
          JSON.stringify({ error: 'خطای پایگاه داده' }),
          { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      if (!user) {
        return new Response(
          JSON.stringify({ message: 'اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی ارسال می‌شود' }),
          { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      const resetToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      await supabase
        .from('users_app_password_reset_tokens')
        .insert({
          user_id: user.id,
          token: resetToken,
          expires_at: expiresAt.toISOString(),
        });

      const resetLink = `${siteUrl}/reset-password?token=${resetToken}`;

      try {
        const emailResponse = await fetch(`${url}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
          },
          body: JSON.stringify({
            to: user.email,
            subject: 'بازیابی رمز عبور',
            html: `
              <div style="font-family: Tahoma, sans-serif; direction: rtl; text-align: right;">
                <h2>بازیابی رمز عبور</h2>
                <p>سلام ${user.first_name} ${user.last_name || ''}</p>
                <p>برای بازیابی رمز عبور خود روی لینک زیر کلیک کنید:</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                  بازیابی رمز عبور
                </a>
                <p>این لینک برای ۱ ساعت معتبر است.</p>
                <p>اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.</p>
              </div>
            `,
            type: 'reset_password',
          }),
        });

        if (!emailResponse.ok) {
          const emailResult = await emailResponse.text();
          console.error('Email send failed:', emailResult);
          throw new Error('Failed to send email');
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return new Response(
          JSON.stringify({ error: 'خطا در ارسال ایمیل' }),
          { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ message: 'اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی ارسال می‌شود' }),
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // تأیید توکن و تغییر رمز
    if (token && newPassword) {
      const { data: resetToken, error: tokenError } = await supabase
        .from('users_app_password_reset_tokens')
        .select('id, user_id')
        .eq('token', token)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (tokenError) {
        console.error('Database error fetching reset token:', tokenError);
        return new Response(
          JSON.stringify({ error: 'خطای پایگاه داده' }),
          { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      if (!resetToken) {
        return new Response(
          JSON.stringify({ error: 'لینک بازیابی نامعتبر یا منقضی شده است' }),
          { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      const passwordHash = await hashPassword(newPassword);

      await supabase
        .from('users_app')
        .update({ password_hash: passwordHash })
        .eq('id', resetToken.user_id);

      await supabase
        .from('users_app_password_reset_tokens')
        .update({ used: true })
        .eq('id', resetToken.id);

      return new Response(
        JSON.stringify({ message: 'رمز عبور با موفقیت تغییر کرد' }),
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'درخواست نامعتبر' }),
      { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Password reset error:', error);
    return new Response(
      JSON.stringify({ error: 'خطای سرور' }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
