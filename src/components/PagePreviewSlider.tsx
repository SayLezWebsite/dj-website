"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preview = {
  title: string;
  href: string;
  description: string;
  quickLinks?: { label: string; href: string }[];
};

const previews: Preview[] = [
  {
    title: "Music",
    href: "/music",
    description: "Latest drops and embedded players.",
    quickLinks: [
      { label: "SoundCloud", href: "https://soundcloud.com/saylezam" },
      { label: "Spotify", href: "https://open.spotify.com/" },
    ],
  },
  {
    title: "Socials",
    href: "/social",
    description: "Instagram, TikTok, YouTube and media highlights.",
    quickLinks: [
      { label: "Instagram", href: "https://www.instagram.com/say.lez_/" },
      { label: "TikTok", href: "https://www.tiktok.com/@saylez__?lang=en" },
      { label: "YouTube", href: "https://www.youtube.com/@saylezzzz" },
    ],
  },
  {
    title: "Shows",
    href: "/shows",
    description: "Upcoming + past events with lineup, flyer, and links.",
  },
  {
    title: "Videos",
    href: "/videos",
    description: "Visual archive with clips and live photo moments.",
    quickLinks: [{ label: "Open video grid", href: "/videos" }],
  },
  {
    title: "Presskit",
    href: "/presskit",
    description: "Booking details and downloadable press material.",
    quickLinks: [
      {
        label: "Download Presskit",
        href: "https://drive.google.com/drive/folders/1JnLIiZtqw5vBTM56z7u8yawbsQ8uGzFy?usp=sharing",
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Direct booking inquiry form and email contact.",
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
    <div className="max-w-xl rounded-2xl border border-white/25 bg-[#161a21]/75 p-5 font-[var(--font-inter)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Explore</p>

      <div className="mt-2 flex items-start justify-between gap-3">
        <Link href={active.href} className="font-[var(--font-bebas)] text-5xl leading-none tracking-wide hover:opacity-85">
          {active.title}
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + previews.length) % previews.length)}
            className="rounded-full border border-white/30 px-3 py-1 text-sm text-white/90"
            aria-label="Previous preview"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % previews.length)}
            className="rounded-full border border-white/30 px-3 py-1 text-sm text-white/90"
            aria-label="Next preview"
          >
            →
          </button>
        </div>
      </div>

      <p className="mt-2 text-white/85">{active.description}</p>

      {active.quickLinks && active.quickLinks.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {active.quickLinks.map((item) => (
            <a
              key={item.label + item.href}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full border border-white/25 px-3 py-1 text-white/90"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        {previews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
