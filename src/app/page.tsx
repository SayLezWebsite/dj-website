import Link from "next/link";
import fs from "node:fs/promises";
import path from "node:path";
import HeroMediaRotator from "@/components/HeroMediaRotator";
import PagePreviewSlider from "@/components/PagePreviewSlider";

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

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <HeroMediaRotator items={heroMedia} />
      <div className="absolute inset-0 bg-[#0d0f12]/45" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="max-w-4xl font-[var(--font-inter)] text-2xl leading-relaxed text-white/92 md:text-4xl">
          Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for
          R&amp;B, Soul and sampling. His sets and tracks lean into swing, warmth and emotion,
          always rooted in feeling.
        </p>

        <div className="mt-8 w-full max-w-xl text-left">
          <PagePreviewSlider />
        </div>

        <div className="mt-4 w-full max-w-xl border border-white/20 bg-[#13161b]/60 p-4 font-[var(--font-inter)] text-left">
          <p className="text-xs uppercase tracking-widest text-white/65">Next showdate</p>
          <p className="mt-1 text-lg text-white">CloseCall — Skatecafe — 27 February</p>
          <Link href="/shows" className="mt-3 inline-block underline text-white/90">
            View all dates
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 font-[var(--font-inter)] text-sm text-white/90">
          <a href="https://www.instagram.com/say.lez_/" target="_blank" rel="noreferrer" className="underline">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@saylez__?lang=en" target="_blank" rel="noreferrer" className="underline">
            TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
