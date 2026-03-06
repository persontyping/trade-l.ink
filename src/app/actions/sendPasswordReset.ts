"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function sendLoginLink(formData: FormData) {
  const email = formData.get("email")?.toString();

  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Check your email for a login link.",
  };
}