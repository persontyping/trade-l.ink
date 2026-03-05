import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-semibold text-gray-900">
          Women Trades Directory
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/trades" className="text-gray-600 hover:text-pink-600">
            Trades
          </Link>

          <Link href="/about" className="text-gray-600 hover:text-pink-600">
            About
          </Link>

          <Link
            href="/login"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}