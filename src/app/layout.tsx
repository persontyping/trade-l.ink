// app/layout.tsx
import '@/styles/globals.css';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "My App",
  description: "Next.js App with proper base styles",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className='flex flex-col min-h-screen w-full'>
        <Header />
        <main className="main-container flex flex-1 flex-wrap justify-center gap-6 p-8 p-5rem">
          {children}
        </main>
       
        {/* <!-- Footer --> */}
        <footer className="p-4 w-full">
          <Footer />
        </footer>

      </body>
    </html>
  )
}