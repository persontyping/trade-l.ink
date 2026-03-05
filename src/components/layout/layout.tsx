// src/app/layout.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import '@/styles/globals.css'   // using the path alias @/* -> src/*

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />

        <main className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}