// app/api/auth/confirm/route.ts
import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get('token_hash');
  const type = (url.searchParams.get('type') ?? '') as EmailOtpType | '';
  const nextPath = url.searchParams.get('next') ?? '/';

  // Redirect target after verification
  const redirectTo = new URL(nextPath, url);
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');
  redirectTo.searchParams.delete('next');

  // Basic validation
  if (!token_hash || !type) {
    return NextResponse.redirect(new URL('/auth/error', url), 302);
  }

  // ✅ Server-side cookie store (synchronous, NOT a Promise)
  const cookieStore = cookies();

  // Minimal Supabase server client using cookie adapter
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // get cookie by name
        get: (name: string) => {
          const c = cookieStore.get(name);
          return c ? { name: c.name, value: c.value } : null;
        },
        // set cookie individually
        set: (name: string, value: string, options?: Parameters<typeof cookieStore.set>[1]) => {
          cookieStore.set(name, value, options);
        },
      },
    }
  );

  try {
    // Verify OTP and create Supabase session
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      console.error('Supabase verifyOtp error:', error.message);
      return NextResponse.redirect(new URL('/auth/error', url), 302);
    }

    // Optional: custom cookie after login
    // cookieStore.set('my-token', 'abc123', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });

    return NextResponse.redirect(redirectTo, 302);
  } catch (err) {
    console.error('Unexpected verifyOtp error:', err);
    return NextResponse.redirect(new URL('/auth/error', url), 302);
  }
}