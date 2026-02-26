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

  const photoCandidates = photoFiles.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const videoCandidates = videoFiles.filter((f) => /\.(mp4|mov|webm|m4v)$/i.test(f));

  const photosByMtime = await Promise.all(
    photoCandidates.map(async (f) => ({
      file: f,
      mtime: (await fs.stat(path.join(photosDir, f))).mtimeMs,
    })),
  );

  const videosByMtime = await Promise.all(
    videoCandidates.map(async (f) => ({
      file: f,
      mtime: (await fs.stat(path.join(videosDir, f))).mtimeMs,
    })),
  );

  const photos = photosByMtime
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, 10)
    .map((x) => ({ type: "photo" as const, src: `/photos/${x.file}` }));

  const videos = videosByMtime
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, 8)
    .map((x) => ({ type: "video" as const, src: `/videos/${x.file}` }));

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

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl flex-col items-center justify-center px-4 py-5 text-center md:h-[calc(100vh-64px)] md:px-5 md:py-4">
        <p className="mb-4 max-w-4xl px-1 font-[var(--font-inter)] text-xs leading-relaxed text-white/92 sm:text-sm md:mb-5 md:text-lg">
          Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for
          R&amp;B, Soul and sampling. His sets and tracks lean into swing, warmth and emotion,
          always rooted in feeling.
        </p>

        <div className="mt-1 w-full max-w-xl text-left">
          <PagePreviewSlider />
        </div>

        <div className="mt-2 w-full max-w-xl rounded-2xl border border-white/30 bg-gradient-to-b from-[#1a1f27]/85 to-[#11151b]/82 p-3 font-[var(--font-inter)] text-left shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-md md:mt-3 md:p-4">
          <p className="font-[var(--font-bebas)] text-xl tracking-wider text-white">Next showdate</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-[82px_1fr]">
            <div className="overflow-hidden rounded-md border border-white/15 bg-black/30">
              {nextShow?.flyer ? (
                <Image src={nextShow.flyer} alt={`${nextShow.name} flyer`} width={240} height={320} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full min-h-24 items-center justify-center text-xs text-white/60">No flyer</div>
              )}
            </div>
            <div>
              <p className="text-sm text-white md:text-base">{nextShow?.name} — {nextShow?.venue}</p>
              <p className="text-xs text-white/85 md:text-sm">{nextShow?.date}</p>
              <p className="mt-1 text-xs text-white/80 md:text-sm">Artists: {nextShow?.lineup.join(" · ")}</p>
              <Link href="/shows" className="mt-1 inline-block underline text-white/90 text-sm">
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
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-black/35"
            title="Instagram"
          >
            <img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5 invert" />
          </a>
          <a
            href="https://www.tiktok.com/@saylez__?lang=en"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-black/35"
            title="TikTok"
          >
            <img src="/icons/tiktok.svg" alt="TikTok" className="h-5 w-5 invert" />
          </a>
          <a
            href="https://soundcloud.com/saylezam"
            target="_blank"
            rel="noreferrer"
            aria-label="SoundCloud"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-black/35"
            title="SoundCloud"
          >
            <img src="/icons/soundcloud.svg" alt="SoundCloud" className="h-5 w-5 invert" />
          </a>
        </div>
      </div>
    </section>
  );
}
