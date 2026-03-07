/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // If Supabase magic link lands here incorrectly
    if (window.location.search.includes("access_token")) {
      router.replace(`/auth/callback${window.location.search}`);
    } else {
      setRedirecting(false);
    }
  }, []);

  // Wait until redirect check completes
  if (redirecting) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
 
    </div>
  );
}