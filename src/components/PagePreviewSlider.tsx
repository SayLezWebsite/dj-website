"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preview = {
  title: string;
  href: string;
  description: string;
};

const previews: Preview[] = [
  {
    title: "Music",
    href: "/music",
    description: "Latest SoundCloud + Spotify links and drops.",
  },
  {
    title: "Socials",
    href: "/social",
    description: "Instagram, TikTok, YouTube and media highlights.",
  },
  {
    title: "Shows",
    href: "/shows",
    description: "Upcoming + past events with lineup, flyer, and links.",
  },
  {
    title: "Videos",
    href: "/videos",
    description: "Visual archive with videos and live photo moments.",
  },
  {
    title: "Presskit",
    href: "/presskit",
    description: "Booking details and downloadable press materials.",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Direct booking inquiry flow and email contact.",
  },
];

export default function PagePreviewSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % previews.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const active = previews[index];

  return (
    <div className="mt-8 max-w-xl border border-white/20 bg-[#13161b]/65 p-4 font-[var(--font-inter)]">
      <p className="text-xs uppercase tracking-widest text-white/65">Explore</p>
      <Link href={active.href} className="mt-1 block font-[var(--font-bebas)] text-4xl tracking-wide leading-none">
        {active.title}
      </Link>
      <p className="mt-2 text-white/85">{active.description}</p>
      <Link href={active.href} className="mt-3 inline-block underline text-white/90">
        Open page
      </Link>
    </div>
  );
}
