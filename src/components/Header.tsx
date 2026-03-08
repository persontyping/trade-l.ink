import Link from "next/link";

export default function Header() {
  return(
     <section>
      <header className="header-a sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 tedxt-sm flex items-center justify-between">
          
      
          <Link href="/" className="header-a logo font-bold text-sm">
            🌈 TRADE-L.INK
          </Link>

          {/* Main Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/home">HOME</Link>
            <Link href="/dashboard">DASHBOARD</Link>

  
            <Link href="/auth/signup">SIGN UP</Link>
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
  );}

   