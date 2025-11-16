// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

serve(async (req: Request): Promise<Response> => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials in environment");
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

    // Handle forgot password route
    if (req.url.endsWith("/forgot")) {
      const { phone }: { phone?: string } = await req.json().catch(() => ({}));
      if (!phone) {
        return jsonResponse({ error: "شماره تلفن الزامی است" }, 400);
      }

      const normalizedPhone = String(phone).replace(/[^\d]/g, "");
      const { data: user, error } = await supabase
        .from("users_app")
        .select("id, phone")
        .eq("phone", normalizedPhone)
        .maybeSingle();

      if (error) {
        console.error("Database error:", error);
        return jsonResponse({ error: "خطای پایگاه داده" }, 500);
      }

      if (!user) {
        return jsonResponse({ error: "کاربری با این شماره پیدا نشد" }, 404);
      }

      const resetToken = crypto.randomUUID();
      console.log(`Reset token for ${phone}: ${resetToken}`);

      return jsonResponse({
        message: "کد بازیابی ارسال شد",
        token: resetToken,
      });
    }

    // Handle login route
    const { phone, password }: { phone?: string; password?: string } = await req.json().catch(() => ({}));
    if (!phone || !password) {
      return jsonResponse({ error: "شماره تلفن و رمز عبور الزامی هستند" }, 400);
    }

    const normalizedPhone = String(phone).replace(/[^\d]/g, "");
    const { data: user, error } = await supabase
      .from("users_app")
      .select("id, first_name, last_name, phone, password_hash")
      .eq("phone", normalizedPhone)
      .maybeSingle();

    if (error) {
      console.error("Database error during login:", error);
      return jsonResponse({ error: "خطای پایگاه داده" }, 500);
    }

    if (!user) {
      return jsonResponse({ error: "شماره تلفن یا رمز عبور اشتباه است" }, 401);
    }

    // Compare password hash safely
    const encoder = new TextEncoder();
    const inputHashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
    const storedHashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(user.password_hash));

    const hashesMatch =
      Buffer.from(inputHashBuffer).toString("hex") === Buffer.from(storedHashBuffer).toString("hex");

    if (!hashesMatch) {
      return jsonResponse({ error: "شماره تلفن یا رمز عبور اشتباه است" }, 401);
    }

    const token = crypto.randomUUID();
    const { password_hash, ...safeUser } = user;

    const headers = new Headers({
      ...corsHeaders,
      "content-type": "application/json",
    });

    headers.append(
      "set-cookie",
      `app_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
    );

    return new Response(
      JSON.stringify({
        message: "ورود با موفقیت انجام شد",
        token,
        user: safeUser,
      }),
      { headers },
    );
  } catch (err) {
    console.error("Unexpected server error:", err);
    return jsonResponse({ error: "خطای سرور. لطفاً دوباره تلاش کنید" }, 500);
  }
});
