"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MediaItem = {
  type: "photo" | "video";
  src: string;
};

export default function HeroMediaRotator({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[index];

  if (!current) return null;

  return (
    <div className="absolute inset-0">
      {current.type === "video" ? (
        <video
          key={current.src}
          className="h-full w-full object-cover opacity-40"
          src={current.src}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          key={current.src}
          src={current.src}
          alt="Say Lez hero"
          fill
          priority
          className="object-cover opacity-40"
        />
      )}
    </div>
  );
}
