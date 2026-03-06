// app/layout.tsx
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
        >
            <body className={`min-h-screen flex flex-col ${inter.className}`}>
                <Header />
                <main className="flex-1 max-w-7xl mx-auto w-full px-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}