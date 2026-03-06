'use client'; // must be client-side
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Logging in…");

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          setStatus("Login successful! Redirecting…");
          router.push("/dashboard");
        } else {
          setStatus("Invalid or expired magic link.");
        }
      } catch (err: any) {
        setStatus(err.message || "Login failed.");
      }
    };

    handleMagicLink();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <p>{status}</p>
    </div>
  );
}