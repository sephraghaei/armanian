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
  console.log("Auth register function called");
  
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
    console.log("Processing request...");
    const body = await req.json();
    console.log("Request body parsed successfully");
    
    const { firstName, lastName, phone, email, password } = body;
    console.log("Extracted fields:", { firstName, lastName, phoneLength: phone?.length, email });

    if (!firstName || !lastName || !phone || !password || !email) {
      console.log("Missing required fields");
      return new Response(JSON.stringify({ error: "تمام فیلدها الزامی هستند" }), { 
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    const strong = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strong.test(password)) {
      console.log("Password validation failed");
      return new Response(JSON.stringify({ error: "رمز عبور باید حداقل ۸ کاراکتر، یک حرف بزرگ و یک عدد داشته باشد" }), { 
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    console.log("Getting environment variables...");
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    console.log("Environment check:", { urlExists: !!url, keyExists: !!key });
    
    if (!url || !key) {
      console.error("Missing Supabase environment variables");
      return new Response(JSON.stringify({ error: "تنظیمات سرور ناقص است" }), { 
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }
    
    console.log("Creating Supabase client...");
    const supabase = createClient(url, key);
    console.log("Supabase client created successfully");

    const normalizedPhone = String(phone).replace(/[^\d]/g, "");
    const normalizedEmail = String(email).trim().toLowerCase();

    const emailRegex = /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      return new Response(JSON.stringify({ error: "ایمیل معتبر نیست" }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }
    console.log("Normalized phone length:", normalizedPhone.length);

    // Check if user exists by phone
    console.log("Checking if user exists...");
    const { data: exist, error: existErr } = await supabase
      .from("users_app")
      .select("id")
      .eq("phone", normalizedPhone)
      .maybeSingle();
    
    console.log("User check result:", { exist: !!exist, error: existErr });
    
    if (existErr) {
      console.error("Database error checking existing user:", existErr);
      return new Response(JSON.stringify({ error: "خطای پایگاه داده در بررسی کاربر موجود" }), { 
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }
    
    if (exist) {
      console.log("Phone number already exists");
      return new Response(JSON.stringify({ error: "این شماره تلفن قبلاً ثبت شده است" }), { 
        status: 409,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    const { data: emailExist, error: emailErr } = await supabase
      .from("users_app")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (emailErr) {
      console.error("Database error checking existing email:", emailErr);
      return new Response(JSON.stringify({ error: "خطای پایگاه داده در بررسی ایمیل" }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    if (emailExist) {
      return new Response(JSON.stringify({ error: "این ایمیل قبلاً ثبت شده است" }), {
        status: 409,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    console.log("Hashing password...");
    const passwordHash = await hashPassword(password);

    console.log("Creating user...");
    const { data: user, error: insErr } = await supabase
      .from("users_app")
      .insert({ 
        first_name: firstName, 
        last_name: lastName, 
        phone: normalizedPhone, 
        email: normalizedEmail,
        password_hash: passwordHash
      })
      .select("id, first_name, last_name, phone, email")
      .single();
    
    console.log("User creation result:", { user: !!user, error: insErr });
    
    if (insErr) {
      console.error("Database error creating user:", insErr);
      return new Response(JSON.stringify({ error: "خطای ایجاد کاربر: " + insErr.message }), { 
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    console.log("User registered successfully:", user.id);

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const { error: sessionErr } = await supabase
      .from("user_sessions")
      .insert({ token, user_id: user.id, expires_at: expiresAt });
    if (sessionErr) {
      console.error("Session create failed:", sessionErr);
    }

    return new Response(JSON.stringify({ 
      message: "ثبت نام با موفقیت انجام شد",
      token, 
      user 
    }), { 
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("Registration error:", error);
    if (stack) console.error("Error stack:", stack);
    return new Response(JSON.stringify({ error: "خطای سرور: " + message }), { 
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  }
});