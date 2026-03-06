import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UpdatePasswordModal from "@/components/profile/UpdateDetailsCard";

export default async function UpdatePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <UpdatePasswordModal></UpdatePasswordModal>;
}