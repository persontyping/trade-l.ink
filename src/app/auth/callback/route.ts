// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Parse and handle all Supabase callback GET requests
 * Works for magic links, password resets, OAuth codes
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams.entries());

  console.log(`[callback] Incoming GET`, query);

  const supabase = await createSupabaseServerClient();

  // 1️⃣ Magic link / OAuth code flow
  if (query.code) {
    console.log("[callback] Exchanging code for session:", query.code);
    const { error } = await supabase.auth.exchangeCodeForSession(query.code as string);
    if (error) {
      console.error("[callback] exchangeCodeForSession error:", error.message);
      return NextResponse.redirect("/?error=session_failed");
    }
    console.log("[callback] Session exchange success");
  }

  // 2️⃣ Direct access token flow (some magic links include access_token)
  else if (query.access_token && query.refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token: query.access_token as string,
      refresh_token: query.refresh_token as string,
    });
    if (error) {
      console.error("[callback] setSession error:", error.message);
      return NextResponse.redirect("/?error=session_failed");
    }
    console.log("[callback] Session set via access_token");
  }

  // 3️⃣ Fallback: redirect to dashboard or update-password
  let redirectUrl = "/dashboard";

  if (query.type === "recovery") {
    // password reset link
    redirectUrl = "/auth/update-password";
  }

  console.log("[callback] Redirecting to:", redirectUrl);
  return NextResponse.redirect(redirectUrl);
}