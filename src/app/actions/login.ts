"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const action = formData.get("action")?.toString() || "login"; // login / magicLink / updateDetails

  const supabase = await createSupabaseServerClient();

  // Handle update details directly
  if (action === "updateDetails") {
    return { redirectTo: `/auth/login?email=${encodeURIComponent(email)}` };
  }

  // Handle magic link
  if (action === "magicLink") {
    const otpResult = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (otpResult.error) {
      return { error: otpResult.error.message };
    }

    return { success: "Magic link sent! Please check your email." };
  }

  // Default password login
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (!error && data.session) {
    return { redirectTo: "/dashboard" };
  }

  // Password failed → frontend will show modal
  return { showModal: true, email };
}