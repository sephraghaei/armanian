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
    
    const { firstName, lastName, phone, password } = body;
    console.log("Extracted fields:", { firstName, lastName, phoneLength: phone?.length });

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
    console.log("Normalized phone length:", normalizedPhone.length);

    // Check if user exists
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

    // For now, store password as plain text (NOT RECOMMENDED FOR PRODUCTION)
    console.log("Creating user...");
    const { data: user, error: insErr } = await supabase
      .from("users_app")
      .insert({ 
        first_name: firstName, 
        last_name: lastName, 
        phone: normalizedPhone, 
        password_hash: password // Temporary - should be hashed
      })
      .select("id, first_name, last_name, phone")
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

    return new Response(JSON.stringify({ 
      message: "ثبت نام با موفقیت انجام شد",
      token, 
      user 
    }), { 
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  } catch (e) {
    console.error("Registration error:", e);
    console.error("Error stack:", e.stack);
    return new Response(JSON.stringify({ error: "خطای سرور: " + e.message }), { 
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' }
    });
  }
});