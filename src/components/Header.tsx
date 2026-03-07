import Link from "next/link";
import LogoutButton from "./Auth/LogoutButton";

export default function Header() {
  return (
    <section>
      <header className="atom-navbar sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="logo font-bold text-lg">
            🌈 TRADE-L.INK
          </Link>

          {/* Main Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/home">HOME</Link>
            <Link href="/dashboard">DASHBOARD</Link>

            <Link href="/auth/login">LOGIN</Link>
            <Link href="/auth/signup">SIGN UP</Link>

            <LogoutButton />
          </nav>

          {/* Admin Navigation */}
          <nav className="admin-nav flex items-center gap-6">
            <Link href="/admin">ADMIN MODE</Link>
          </nav>

        </div>
      </header>

      {/* Session Bar */}
      <div className="session-bar sticky top-12 z-40 w-full atom-nav-link">
        <h4>Logged in as...</h4>
      </div>
    </section>
  );
}