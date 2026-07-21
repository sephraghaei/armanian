// deno-lint-ignore-file no-explicit-any
declare const Deno: any;
// @ts-ignore
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-app-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method Not Allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "Server configuration error" }, 500);
  const supabase = createClient(url, key);

  const token = req.headers.get("x-app-token") || "";
  if (!token) return json({ error: "Missing session token" }, 401);

  // Validate session
  const { data: session } = await supabase
    .from("user_sessions")
    .select("user_id, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (!session || new Date(session.expires_at) < new Date()) {
    return json({ error: "Invalid or expired session" }, 401);
  }

  const userId: string = session.user_id;

  // Check admin
  const { data: adminRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  const isAdmin = !!adminRow;

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  try {
    if (action === "list_mine") {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", userId)
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      return json({ data });
    }

    if (action === "get") {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id, course_id, status, amount_due, user_id")
        .eq("id", body.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return json({ error: "Not found" }, 404);
      if (!isAdmin && data.user_id !== userId) return json({ error: "Forbidden" }, 403);
      return json({ data });
    }

    if (action === "check_existing") {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", body.course_id)
        .maybeSingle();
      if (error) throw error;
      return json({ data });
    }

    if (action === "create") {
      const payload = {
        user_id: userId,
        course_id: String(body.course_id),
        expires_at: body.expires_at || new Date(Date.now() + 365 * 86400_000).toISOString(),
        payment_status: body.payment_status || "pending",
        payment_method: body.payment_method || "manual",
        amount_due: String(body.amount_due ?? "0"),
        amount_paid: "0",
        payment_notes: body.payment_notes || null,
      };
      const { data, error } = await supabase
        .from("enrollments")
        .insert(payload)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      return json({ data });
    }

    if (action === "mark_paid") {
      // Ensure ownership
      const { data: enr } = await supabase
        .from("enrollments").select("user_id, amount_due").eq("id", body.id).maybeSingle();
      if (!enr) return json({ error: "Not found" }, 404);
      if (!isAdmin && enr.user_id !== userId) return json({ error: "Forbidden" }, 403);
      const { error } = await supabase
        .from("enrollments")
        .update({
          payment_status: "paid",
          paid_at: new Date().toISOString(),
          amount_paid: String(body.amount_paid ?? enr.amount_due ?? "0"),
          payment_notes: body.payment_notes || "پرداخت آزمایشی موفق",
        })
        .eq("id", body.id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "extend") {
      const { data: enr } = await supabase
        .from("enrollments").select("user_id").eq("id", body.id).maybeSingle();
      if (!enr) return json({ error: "Not found" }, 404);
      if (!isAdmin && enr.user_id !== userId) return json({ error: "Forbidden" }, 403);
      const newExpiry = new Date();
      newExpiry.setMonth(newExpiry.getMonth() + 1);
      const { error } = await supabase
        .from("enrollments")
        .update({ expires_at: newExpiry.toISOString(), status: "active" })
        .eq("id", body.id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "delete") {
      const { data: enr } = await supabase
        .from("enrollments").select("user_id").eq("id", body.id).maybeSingle();
      if (!enr) return json({ error: "Not found" }, 404);
      if (!isAdmin && enr.user_id !== userId) return json({ error: "Forbidden" }, 403);
      const { error } = await supabase.from("enrollments").delete().eq("id", body.id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "admin_list") {
      if (!isAdmin) return json({ error: "Forbidden" }, 403);
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      return json({ data });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err: any) {
    console.error("enrollments-api error:", err);
    return json({ error: err?.message || "Server error" }, 500);
  }
});
