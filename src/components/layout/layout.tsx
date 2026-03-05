// src/app/layout.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">

        {/* Header */}
        <header className="nav-bar">
          <Header />
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-6xl mx-auto w-full">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}