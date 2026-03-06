'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/browser';
import type { User } from '@supabase/supabase-js';
import LogoutButton  from "@/components/client/KillSesh";


export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch session on mount
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    fetchSession();

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Clean up subscription
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <section>
      <header className="atom-navbar sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-12 flex items-center justify-between">

          <Link href="/" className="logo font-bold text-lg">
            🌈 TRADE-L.INK
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/home">HOME</Link>
            <Link href="/about">ABOUT</Link>

            {user ? (
              <>
                <Link href="/dashboard">DASHBOARD</Link>
                <Link href="/dashboard/profile">PROFILE</Link>
      <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/auth/login">LOGIN</Link>
                <Link href="/auth/signup">SIGN UP</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Optional session bar */}
      {user && (
        <div className="session-bar sticky top-12 z-40 w-full atom-nav-link">
          Logged in as {user.user_metadata?.full_name || user.email}
        </div>
      )}
    </section>
  );
}