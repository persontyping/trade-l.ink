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
          {user ? (
            <>
              <Link href="/dashboard" className="atom-navlink">
                Dashboard
              </Link>

              <Link href="/dashboard/profile" className="atom-navlink">
                Profile
              </Link>

              <form action="/actions/logout" method="post">
                <button
                  type="submit"
                  className="btn-atom"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="atom-navlink">
                Login
              </Link>

              <Link href="/signup" className="atom-navlink">
                Sign Up
              </Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}