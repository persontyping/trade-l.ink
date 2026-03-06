'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/browser';
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // fetch session on mount
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getSession();

    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="atom-navbar sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
        <Link href="/" className="logo">
          🌈 TRADE-L.INK
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">HOME</Link>
          <Link href="/about">ABOUT</Link>

          {user ? (
            <>
              <Link href="/dashboard">DASHBOARD</Link>
              <Link href="/dashboard/profile">PROFILE</Link>
              <form action="/actions/logout" method="post">
                <button type="submit" className="btn-atom">LOGOUT</button>
              </form>
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
  );
}