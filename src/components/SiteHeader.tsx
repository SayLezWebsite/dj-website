"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const toneByPath: Record<string, string> = {
  "/": "from-[#0c111a]/90 to-[#0b1220]/85",
  "/shows": "from-[#17120c]/90 to-[#22160f]/85",
  "/music": "from-[#10120c]/90 to-[#1a2210]/85",
  "/social": "from-[#0c1216]/90 to-[#10222a]/85",
  "/videos": "from-[#150c16]/90 to-[#241028]/85",
  "/presskit": "from-[#15110c]/90 to-[#2a1f10]/85",
  "/contact": "from-[#0f0f0f]/90 to-[#1f1f1f]/85",
};

export default function SiteHeader() {
  const pathname = usePathname();
  const tone = toneByPath[pathname] ?? toneByPath["/"];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-gradient-to-r ${tone} shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md`}>
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
  );
}
