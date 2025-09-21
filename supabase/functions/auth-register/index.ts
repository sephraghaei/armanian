// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const { firstName, lastName, phone, password } = await req.json();
    console.log("Received registration request with data:", { firstName, lastName, phone: phone?.substring(0, 5) + "***" });

    if (!firstName || !lastName || !phone || !password) {
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

    console.log("Password validation passed");

    console.log("Creating Supabase client...");
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!url || !key) {
      console.error("Missing Supabase environment variables");
      return new Response(JSON.stringify({ error: "تنظیمات سرور ناقص است" }), { 
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }
    
    const supabase = createClient(url, key);
    console.log("Supabase client created successfully");

    const normalizedPhone = String(phone).replace(/[^\d]/g, "");
    console.log("Normalized phone:", normalizedPhone.substring(0, 5) + "***");

    // Ensure not exists
    console.log("Checking if user exists...");
    const { data: exist, error: existErr } = await supabase
      .from("users_app")
      .select("id")
      .eq("phone", normalizedPhone)
      .maybeSingle();
    
    if (existErr) {
      console.error("Database error checking existing user:", existErr);
      return new Response(JSON.stringify({ error: "خطای پایگاه داده" }), { 
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

    console.log("Hashing password...");
    const passwordHash = await bcrypt.hash(password);
    console.log("Password hashed successfully");

    console.log("Creating user...");
    const { data: user, error: insErr } = await supabase
      .from("users_app")
      .insert({ first_name: firstName, last_name: lastName, phone: normalizedPhone, password_hash: passwordHash })
      .select("id, first_name, last_name, phone")
      .single();
    
    if (insErr) {
      console.error("Database error creating user:", insErr);
      return new Response(JSON.stringify({ error: "خطای ایجاد کاربر" }), { 
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' }
      });
    }

    console.log("User registered successfully:", user.id);

    // Create a very simple signed token (JWT) is ideal, but to keep minimal we return a pseudo token
    // In production, use a JWT (e.g., with jose) and set httpOnly cookie
    const token = crypto.randomUUID();

    const headers = new Headers({ 
      ...corsHeaders,
      "content-type": "application/json"
    });
    headers.append(
      "set-cookie",
      `app_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
    );
    return new Response(JSON.stringify({ 
      message: "ثبت نام با موفقیت انجام شد",
      token, 
      user 
    }), { headers });
  } catch (e) {
    console.error("Registration error:", e);
    return new Response(JSON.stringify({ error: "خطای سرور. لطفاً دوباره تلاش کنید" }), { 
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  }
});
