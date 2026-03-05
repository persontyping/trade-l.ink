import Link from "next/link";
import { getUserFromSupabase } from "@/lib/supabase/server";

export default async function Header() {
  const user = await getUserFromSupabase();

  return (
    <header className="atom-navbar">
      <div className="atom-navlink atom-navlink:hover flex items-center justify-between">
        <Link href="/" className="">
          Women Trades Directory
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="atom-navlink atom-navlink:hover">
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className="atom-navlink atom-navlink:hover">
                Profile
              </Link>

              {/* ✅ Logout form goes here */}
              <form action="/actions/logout" method="post">
                <button
                  type="submit"
                  className="btn-atom btn-atom:hover"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="atom-navlink atom-navlink:hover">
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-atom">
              
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}