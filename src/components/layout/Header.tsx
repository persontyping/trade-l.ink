import Link from "next/link";
import { getUserFromSupabase } from "@/lib/supabase/server";

export default async function Header() {
  const user = await getUserFromSupabase();

  return (
    <header className="atom-navbar sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="logo">
          🌈 TRADE-L.INK
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
        <Link href="/about" className="logo">
          ABOUT
        </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="atom-navlink">
                DASHBOARD
              </Link>

              <Link href="/dashboard/profile" className="atom-navlink">
                PROFILE
              </Link>

              <form action="/actions/logout" method="post">
                <button
                  type="submit"
                  className="btn-atom"
                >
                  LOGOUT
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="atom-navlink">
                LOGIN
              </Link>

              <Link href="/signup" className="atom-navlink">
                SIGN UP
              </Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}