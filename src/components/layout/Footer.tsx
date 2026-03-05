export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between gap-4">

        <p>
          © {new Date().getFullYear()} Women Trades Directory
        </p>

        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-pink-600">
            Privacy
          </a>

          <a href="/terms" className="hover:text-pink-600">
            Terms
          </a>

          <a href="/contact" className="hover:text-pink-600">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}