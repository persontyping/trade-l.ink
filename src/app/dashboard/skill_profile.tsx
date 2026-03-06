// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/supabase/getSession";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) redirect("/auth/login");

  return <>{children}</>; // just render children; optional: provide context if needed
}