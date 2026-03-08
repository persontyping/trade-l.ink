export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4">

        <p>
          © {new Date().getFullYear()} 🌈 TRADE-L.INK
        </p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-pink-600">
            Privacy
          </a>

          <a href="#" className="hover:text-pink-600">
            Terms
          </a>

          <a href="#" className="hover:text-pink-600">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}