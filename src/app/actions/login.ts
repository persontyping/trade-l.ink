"use server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const supabase = await createSupabaseServerClient();

  // Try password login first
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!error && data.session) {
    redirect("/dashboard"); // ✅ Works in server actions
  }

// After calling signInWithOtp
const otpResult = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  },
});


const redirectUrl = new URL( "/check-email", process.env.NEXT_PUBLIC_SITE_URL);

if (otpResult.error) {
  redirectUrl.searchParams.set("error", otpResult.error.message);
} else {
  redirectUrl.searchParams.set(
    "success",
    "Magic link sent! Please check your email."
  );
}

redirect(redirectUrl.toString());
}