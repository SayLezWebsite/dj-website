import Link from "next/link";
import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";
import HeroMediaRotator from "@/components/HeroMediaRotator";
import PagePreviewSlider from "@/components/PagePreviewSlider";
import { shows } from "@/data/shows";

type MediaItem = {
  type: "photo" | "video";
  src: string;
};

async function getHeroMedia(): Promise<MediaItem[]> {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const videosDir = path.join(process.cwd(), "public", "videos");

  const photoFiles = await fs.readdir(photosDir).catch(() => []);
  const videoFiles = await fs.readdir(videosDir).catch(() => []);

  const photos = photoFiles
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(-10)
    .map((f) => ({ type: "photo" as const, src: `/photos/${f}` }));

  const videos = videoFiles
    .filter((f) => /\.(mp4|mov|webm|m4v)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(-8)
    .map((f) => ({ type: "video" as const, src: `/videos/${f}` }));

  const mixed: MediaItem[] = [];
  const max = Math.max(photos.length, videos.length);
  for (let i = 0; i < max; i++) {
    if (videos[i]) mixed.push(videos[i]);
    if (photos[i]) mixed.push(photos[i]);
  }

  return mixed.length > 0 ? mixed : [{ type: "photo", src: "/photos/home-main.jpg" }];
}

export default async function Home() {
  const heroMedia = await getHeroMedia();
  const nextShow = shows.find((s) => s.status === "upcoming") ?? shows[0];

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <HeroMediaRotator items={heroMedia} />
      <div className="absolute inset-0 bg-[#0d0f12]/45" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-start px-6 pb-16 pt-20 text-center md:pt-24">
        <p className="mb-10 mt-8 max-w-4xl font-[var(--font-inter)] text-base leading-relaxed text-white/92 md:text-xl">
          Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for
          R&amp;B, Soul and sampling. His sets and tracks lean into swing, warmth and emotion,
          always rooted in feeling.
        </p>

        <div className="mt-8 w-full max-w-xl text-left">
          <PagePreviewSlider />
        </div>

        <div className="mt-4 w-full max-w-xl rounded-2xl border border-white/30 bg-gradient-to-b from-[#1a1f27]/85 to-[#11151b]/82 p-5 font-[var(--font-inter)] text-left shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <p className="font-[var(--font-bebas)] text-2xl tracking-wider text-white">Next showdate</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[96px_1fr]">
            <div className="overflow-hidden rounded-md border border-white/15 bg-black/30">
              {nextShow?.flyer ? (
                <Image src={nextShow.flyer} alt={`${nextShow.name} flyer`} width={240} height={320} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full min-h-24 items-center justify-center text-xs text-white/60">No flyer</div>
              )}
            </div>
            <div>
              <p className="text-base text-white md:text-lg">{nextShow?.name} — {nextShow?.venue}</p>
              <p className="text-sm text-white/85">{nextShow?.date}</p>
              <p className="mt-2 text-sm text-white/80">Artists: {nextShow?.lineup.join(" · ")}</p>
              <Link href="/shows" className="mt-2 inline-block underline text-white/90">
                View all dates
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-white/90">
          <a
            href="https://www.instagram.com/say.lez_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35"
            title="Instagram"
          >
            <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="h-6 w-6" />
          </a>
          <a
            href="https://www.tiktok.com/@saylez__?lang=en"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35"
            title="TikTok"
          >
            <Image src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} className="h-6 w-6" />
          </a>
          <a
            href="https://soundcloud.com/saylezam"
            target="_blank"
            rel="noreferrer"
            aria-label="SoundCloud"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35"
            title="SoundCloud"
          >
            <Image src="/icons/soundcloud.svg" alt="SoundCloud" width={24} height={24} className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
