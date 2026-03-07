import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * GET /auth/confirm?token_hash=...&type=email&next=/somewhere
 *
 * Exchanges the token_hash for a session server-side using supabase.auth.verifyOtp(...)
 * On success: redirects to the `next` param or /account (session cookies will be set).
 * On failure: redirects to /auth/error (or you can choose another path).
 *
 * Notes:
 * - This uses createServerClient from @supabase/ssr which expects cookie helpers.
 * - Adjust redirect targets as needed.
 */

export async function GET(request: NextRequest) {
    

    console.log("----- CALLBACK HIT -----");
    console.log("Full URL:", request.url);
    const url = new URL(request.url);
    const token_hash = url.searchParams.get('token_hash');
    console.log("url:", url);
    console.log("token_hash", token_hash);
//  Exchanges the token_hash for a session server-side using supabase.auth.verifyOtp(...)
    const type = (url.searchParams.get('type') ?? '') as EmailOtpType | '';
    const nextPath = url.searchParams.get('next') ?? '/';

    console.log("token_hash:", token_hash);


    // Build a redirect URL without auth params for final redirect
    const redirectTo = new URL(nextPath, url);
    // Remove auth params so they don't leak
    redirectTo.searchParams.delete('token_hash');
    redirectTo.searchParams.delete('type');
    redirectTo.searchParams.delete('next');

    // Minimal validation
    if (!token_hash || !type) {
        // Bad request — redirect to error
        return NextResponse.redirect(new URL('/auth/error', url), 302);
    }

    // Create a server Supabase client that uses Next.js cookies
    // We need to provide cookies helpers to createServerClient.
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                async getAll() {
                    // next/headers cookies() returns a readonly Cookies object; adapt to expected shape
                    return (await cookieStore).getAll();
                },
                setAll(cookiesToSet) {
                    // Called when Supabase client wants to set cookies (e.g., on session set/refresh).
                    // We mirror them to the Next Response by setting cookies in the cookie store.
                    // Note: In a Route Handler, cookies() writes directly to the response cookies.
                    // `cookieStore.set` in next/headers accepts (name, value, options?)
                    cookiesToSet.forEach(({ name, value, options }: any) => {
                        try {
                            // next/headers Cookies.set signature: set(name, value, options?)
                            // options may include attributes like path, httpOnly, sameSite, maxAge, secure, etc.
                            cookieStore.set(name, value, options ?? {});
                        } catch {
                            // ignore non-fatal cookie set errors
                        }
                    });
                },
            },
        }
    );

    try {
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as EmailOtpType,
        });

        if (error) {
            // verification failed
            return NextResponse.redirect(new URL('/auth/error', url), 302);
        }

        // Success: redirect to the cleaned next path. The Supabase client has set cookies.
        return NextResponse.redirect(redirectTo, 302);
    } catch (err) {
        // Unexpected error
        console.error('verifyOtp error', err);
        return NextResponse.redirect(new URL('/auth/error', url), 302);
    }
}