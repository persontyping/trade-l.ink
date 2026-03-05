import Link from "next/link";
import { getUserFromSupabase } from "@/lib/supabase/server";

export default async function Header() {
  const user = await getUserFromSupabase();

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          Women Trades Directory
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-pink-600">
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className="text-gray-600 hover:text-pink-600">
                Profile
              </Link>

              {/* ✅ Logout form goes here */}
              <form action="/actions/logout" method="post">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-pink-600">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}