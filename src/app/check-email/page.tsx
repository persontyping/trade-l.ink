'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/browser';
import type { Session } from '@supabase/supabase-js';

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          router.push('/dashboard');
        } else {
          setError('No active session found.');
        }
      } catch (err: any) {
        setError(err.message || 'Login failed.');
      } finally {
        setLoading(false);
      }
    };

    handleLogin();
  }, [router]);

  if (loading) return <p>Logging in…</p>;
  if (error) return 
          <p className="text-red-500">Error: {error}</p>
;
  return null;
}