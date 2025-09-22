// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const { phone, password } = await req.json();
    if (!phone || !password) {
      return new Response(JSON.stringify({ error: "شماره تلفن و رمز عبور الزامی هستند" }), { 
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(url, key);

    const normalizedPhone = String(phone).replace(/[^\d]/g, "");
    const { data: user, error } = await supabase
      .from("users_app")
      .select("id, first_name, last_name, phone, password_hash")
      .eq("phone", normalizedPhone)
      .maybeSingle();
    if (error) {
      console.error("Database error during login:", error);
      throw error;
    }
    if (!user) {
      return new Response(JSON.stringify({ error: "شماره تلفن یا رمز عبور اشتباه است" }), { 
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    // For now, using plain text comparison to match the registration function
    // TODO: Implement proper password hashing for production
    if (password !== user.password_hash) {
      return new Response(JSON.stringify({ error: "شماره تلفن یا رمز عبور اشتباه است" }), { 
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    console.log("User logged in successfully:", user.id);

    const token = crypto.randomUUID();
    const { password_hash, ...safeUser } = user;

    const headers = new Headers({ 
      ...corsHeaders,
      "content-type": "application/json"
    });
    headers.append(
      "set-cookie",
      `app_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
    );
    return new Response(JSON.stringify({ 
      message: "ورود با موفقیت انجام شد",
      token, 
      user: safeUser 
    }), { headers });
  } catch (e) {
    console.error("Login error:", e);
    return new Response(JSON.stringify({ error: "خطای سرور. لطفاً دوباره تلاش کنید" }), { 
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  }
});


