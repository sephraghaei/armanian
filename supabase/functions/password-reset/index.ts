import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(url, key);

  try {
    const { email, token, newPassword } = await req.json();

    // درخواست بازیابی رمز
    if (email && !token) {
      const { data: user } = await supabase.auth.admin.listUsers();
      const foundUser = user?.users.find(u => u.email === email);
      
      if (!foundUser) {
        return new Response(
          JSON.stringify({ message: "اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی ارسال می‌شود" }), 
          { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      const resetToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      await supabase
        .from("password_reset_tokens")
        .insert({
          user_id: foundUser.id,
          token: resetToken,
          expires_at: expiresAt.toISOString(),
        });

      const resetLink = `${Deno.env.get("SITE_URL") || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
      
      console.log('Attempting to send email to:', email);
      console.log('Reset link:', resetLink);
      
      // ارسال ایمیل
      try {
        const emailResponse = await fetch(`${url}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
          },
          body: JSON.stringify({
            to: email,
            subject: 'بازیابی رمز عبور',
            html: `
              <div style="font-family: Tahoma, sans-serif; direction: rtl; text-align: right;">
                <h2>بازیابی رمز عبور</h2>
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

        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          console.error('Email send failed:', emailResult);
          throw new Error('Failed to send email');
        }
        
        console.log('Email sent successfully:', emailResult);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return new Response(
          JSON.stringify({ error: 'خطا در ارسال ایمیل' }), 
          { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ message: "اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی ارسال می‌شود" }), 
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // تأیید توکن و تغییر رمز
    if (token && newPassword) {
      const { data: resetToken } = await supabase
        .from("password_reset_tokens")
        .select("*")
        .eq("token", token)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (!resetToken) {
        return new Response(
          JSON.stringify({ error: "لینک بازیابی نامعتبر یا منقضی شده است" }), 
          { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }

      await supabase.auth.admin.updateUserById(resetToken.user_id, {
        password: newPassword,
      });

      await supabase
        .from("password_reset_tokens")
        .update({ used: true })
        .eq("id", resetToken.id);

      return new Response(
        JSON.stringify({ message: "رمز عبور با موفقیت تغییر کرد" }), 
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: "درخواست نامعتبر" }), 
      { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );

  } catch (error: any) {
    console.error("Password reset error:", error);
    return new Response(
      JSON.stringify({ error: "خطای سرور" }), 
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
