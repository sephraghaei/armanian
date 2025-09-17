// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { firstName, lastName, phone, password } = await req.json();

    if (!firstName || !lastName || !phone || !password) {
      return new Response(JSON.stringify({ error: "INVALID_INPUT" }), { status: 400 });
    }

    const strong = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strong.test(password)) {
      return new Response(JSON.stringify({ error: "WEAK_PASSWORD" }), { status: 400 });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(url, key);

    const normalizedPhone = String(phone).replace(/[^\d]/g, "");

    // Ensure not exists
    const { data: exist, error: existErr } = await supabase
      .from("users_app")
      .select("id")
      .eq("phone", normalizedPhone)
      .maybeSingle();
    if (existErr) throw existErr;
    if (exist) {
      return new Response(JSON.stringify({ error: "PHONE_EXISTS" }), { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password);
    const { data: user, error: insErr } = await supabase
      .from("users_app")
      .insert({ first_name: firstName, last_name: lastName, phone: normalizedPhone, password_hash: passwordHash })
      .select("id, first_name, last_name, phone")
      .single();
    if (insErr) throw insErr;

    // Create a very simple signed token (JWT) is ideal, but to keep minimal we return a pseudo token
    // In production, use a JWT (e.g., with jose) and set httpOnly cookie
    const token = crypto.randomUUID();

    const headers = new Headers({ "content-type": "application/json" });
    headers.append(
      "set-cookie",
      `app_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
    );
    return new Response(JSON.stringify({ token, user }), { headers });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "SERVER_ERROR" }), { status: 500 });
  }
});


