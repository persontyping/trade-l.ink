// src/app/layout.tsx
import '@/styles/globals.css'   // using the path alias @/* -> src/*

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}