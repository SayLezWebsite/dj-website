"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preview = {
  title: string;
  href: string;
  description: string;
  quickLinks?: { label: string; href: string }[];
  feature?:
    | { kind: "youtube"; title: string; videoUrl: string; embedUrl: string }
    | { kind: "contact"; email: string }
    | { kind: "text"; label: string; value: string };
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
    feature: { kind: "text", label: "Featured", value: "Newest SoundCloud tracks are embedded on the Music page." },
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
    feature: {
      kind: "youtube",
      title: "YouTube preview",
      videoUrl: "https://www.youtube.com/@saylezzzz",
      embedUrl: "https://www.youtube.com/embed/videoseries?list=UUvdodF39BFDMyfrGxpKHMbw",
    },
  },
  {
    title: "Shows",
    href: "/shows",
    description: "Upcoming + past events with lineup, flyer, and links.",
    feature: { kind: "text", label: "Next", value: "CloseCall · Skatecafe · 27 Feb" },
  },
  {
    title: "Videos",
    href: "/videos",
    description: "Visual archive with clips and live photo moments.",
    quickLinks: [{ label: "Open video grid", href: "/videos" }],
    feature: { kind: "text", label: "Feature", value: "Pick one clip with the Video Selector." },
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
    feature: { kind: "text", label: "Direct", value: "Open/download action available in Presskit." },
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Direct booking inquiry form and email contact.",
    feature: { kind: "contact", email: "simon@itsaclosecall.nl" },
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
    <div className="max-w-xl rounded-2xl border border-white/30 bg-gradient-to-b from-[#1a1f27]/85 to-[#11151b]/82 p-5 font-[var(--font-inter)] shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-md">
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

      {active.feature?.kind === "youtube" && (
        <div className="mt-3 overflow-hidden rounded-lg border border-white/20 bg-black/35">
          <iframe
            title={active.feature.title}
            src={active.feature.embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-40 w-full"
          />
          <a href={active.feature.videoUrl} target="_blank" rel="noreferrer" className="block px-3 py-2 text-sm underline text-white/90">
            Open YouTube channel ↗
          </a>
        </div>
      )}

      {active.feature?.kind === "contact" && (
        <div className="mt-3 rounded-lg border border-white/20 bg-black/25 px-3 py-2 text-sm text-white/90">Email: {active.feature.email}</div>
      )}

      {active.feature?.kind === "text" && (
        <div className="mt-3 rounded-lg border border-white/20 bg-black/25 px-3 py-2 text-sm text-white/90">
          <span className="text-white/70">{active.feature.label}:</span> {active.feature.value}
        </div>
      )}

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
