// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { phone, password } = await req.json();
    if (!phone || !password) {
      return new Response(JSON.stringify({ error: "INVALID_INPUT" }), { status: 400 });
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
    if (error) throw error;
    if (!user) {
      return new Response(JSON.stringify({ error: "INVALID_CREDENTIALS" }), { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return new Response(JSON.stringify({ error: "INVALID_CREDENTIALS" }), { status: 401 });
    }

    const token = crypto.randomUUID();
    const { password_hash, ...safeUser } = user;

    const headers = new Headers({ "content-type": "application/json" });
    headers.append(
      "set-cookie",
      `app_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
    );
    return new Response(JSON.stringify({ token, user: safeUser }), { headers });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "SERVER_ERROR" }), { status: 500 });
  }
});


