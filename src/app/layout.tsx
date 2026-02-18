import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LEZ",
  description: "Say Lez — DJ/Producer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable} antialiased`}>
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-[var(--font-bebas)] text-3xl tracking-widest">
              LEZ
            </Link>
            <div className="flex gap-4 text-sm font-[var(--font-inter)] text-white/90">
              <Link href="/">Home</Link>
              <Link href="/music">Music</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/social">Social</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
