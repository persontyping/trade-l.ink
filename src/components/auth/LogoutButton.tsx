"use client";

import { createClient } from "@/lib/supabase/browser";

export default function LogoutButton() {
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    location.href = "/";
  };

  return <button onClick={logout}>Logout</button>;
}