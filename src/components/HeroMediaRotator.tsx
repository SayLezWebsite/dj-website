"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type MediaItem = {
  type: "photo" | "video";
  src: string;
};

type SizeMap = Record<string, number>; // aspect ratio (w/h)

function MediaTile({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <video
        key={item.src}
        className="h-full w-full object-cover"
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return <Image key={item.src} src={item.src} alt="Say Lez hero" fill priority className="object-cover" />;
}

export default function HeroMediaRotator({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [aspects, setAspects] = useState<SizeMap>({});

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(id);
  }, [items.length]);

  useEffect(() => {
    let alive = true;

    const loadAspect = (item: MediaItem) =>
      new Promise<{ src: string; aspect: number }>((resolve) => {
        if (item.type === "photo") {
          const img = new window.Image();
          img.onload = () => resolve({ src: item.src, aspect: img.width / img.height || 1 });
          img.onerror = () => resolve({ src: item.src, aspect: 1 });
          img.src = item.src;
          return;
        }

        const v = document.createElement("video");
        v.preload = "metadata";
        v.onloadedmetadata = () =>
          resolve({ src: item.src, aspect: (v.videoWidth || 1) / (v.videoHeight || 1) });
        v.onerror = () => resolve({ src: item.src, aspect: 1 });
        v.src = item.src;
      });

    (async () => {
      const results = await Promise.all(items.map(loadAspect));
      if (!alive) return;
      setAspects(Object.fromEntries(results.map((r) => [r.src, r.aspect])));
    })();

    return () => {
      alive = false;
    };
  }, [items]);

  const current = items[index];
  const next = items[(index + 1) % items.length];

  const showSplit = useMemo(() => {
    if (!current || items.length < 2) return false;
    const aspect = aspects[current.src] ?? 1;
    return aspect < 0.95; // portrait-ish => split with another tile
  }, [aspects, current, items.length]);

  if (!current) return null;

  return (
    <div className="absolute inset-0 grayscale contrast-110 saturate-75">
      {showSplit ? (
        <div className="grid h-full w-full grid-cols-1 gap-2 md:grid-cols-2">
          <div className="relative h-full w-full overflow-hidden">
            <MediaTile item={current} />
          </div>
          <div className="relative hidden h-full w-full overflow-hidden md:block">
            <MediaTile item={next} />
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full overflow-hidden">
          <MediaTile item={current} />
        </div>
      )}
    </div>
  );
}
