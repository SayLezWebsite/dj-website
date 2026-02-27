import type { Metadata } from "next";
import { Bebas_Neue, Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import RadioPlayer from "@/components/RadioPlayer";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Say Lez",
  description: "Say Lez — DJ/Producer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable} ${playfair.variable} antialiased`}>
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-[#0c111a]/85 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:py-3">
            <Link href="/" className="font-[var(--font-bebas)] text-2xl tracking-widest md:text-3xl">
              SAY LEZ
            </Link>
            <div className="no-scrollbar flex w-full gap-4 overflow-x-auto whitespace-nowrap pb-1 text-sm font-[var(--font-inter)] font-semibold text-white/95 md:w-auto md:gap-5 md:overflow-visible md:pb-0 md:text-lg">
              <Link href="/">Home</Link>
              <Link href="/shows">Shows</Link>
              <Link href="/music">Music</Link>
              <Link href="/social">Socials</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/presskit">Presskit</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="pt-24 md:pt-16">{children}</main>
        <RadioPlayer />
      </body>
    </html>
  );
}
