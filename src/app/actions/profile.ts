"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function updateDetailsAction(formData: FormData) {
  const newPassword = formData.get("newPassword")?.toString();

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Password updated successfully!" };
}