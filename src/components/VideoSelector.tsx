"use client";

import { useState } from "react";

export default function VideoSelector({ videos }: { videos: string[] }) {
  const [active, setActive] = useState(videos[0] ?? "");

  if (!videos.length) return null;

  return (
    <div className="mt-4 rounded-xl border border-white/20 bg-[#13161b]/60 p-4">
      <label className="font-[var(--font-inter)] text-sm text-white/80">Choose video</label>
      <select
        className="mt-2 w-full border border-white/20 bg-black/40 px-3 py-2 font-[var(--font-inter)]"
        value={active}
        onChange={(e) => setActive(e.target.value)}
      >
        {videos.map((src) => (
          <option key={src} value={src}>
            {src.replace("/videos/", "")}
          </option>
        ))}
      </select>

      <div className="mt-4 overflow-hidden border border-white/15 bg-black">
        <video autoPlay muted loop playsInline preload="metadata" className="h-full w-full" src={active} />
      </div>
    </div>
  );
}
