// src/app/actions/login.ts
"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export default async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // 1️⃣ Attempt password login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Success
  if (!error && data.session) {
    redirect("/dashboard");
  }

  // 2️⃣ Password failed → attempt magic link
  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (otpError) {
    const message = otpError.message.toLowerCase();

    // 3️⃣ User doesn't exist → redirect to signup
    if (message.includes("user not found") || message.includes("invalid login")) {
      redirect(`/signup?email=${encodeURIComponent(email)}`);
    }

    throw new Error(otpError.message);
  }

  // 4️⃣ Magic link sent
  redirect("/check-email");
}