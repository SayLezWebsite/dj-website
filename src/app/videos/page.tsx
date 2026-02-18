import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";

type MediaBuckets = {
  photos: string[];
  videos: string[];
  other: string[];
};

async function getMedia(): Promise<MediaBuckets> {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const videosDir = path.join(process.cwd(), "public", "videos");

  const photoFiles = await fs.readdir(photosDir).catch(() => []);
  const videoFiles = await fs.readdir(videosDir).catch(() => []);

  const photos = photoFiles
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/photos/${file}`);

  const videos = videoFiles
    .filter((file) => /\.(mp4|webm|mov)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/videos/${file}`);

  const other = photoFiles
    .filter((file) => !/\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/photos/${file}`);

  return { photos, videos, other };
}

export default async function VideosPage() {
  const { photos, videos, other } = await getMedia();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Videos & Photos</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">
        Visual-only mode enabled for videos (muted loops).
      </p>

      <div className="mt-10">
        <h2 className="font-[var(--font-bebas)] text-3xl tracking-wide">Videos</h2>
        {videos.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {videos.map((src) => (
              <div key={src} className="overflow-hidden border border-white/15 bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full"
                  src={src}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 font-[var(--font-inter)] text-white/70">
            No videos yet. Upload files to <code className="text-white">public/videos/</code> and they’ll appear automatically.
          </p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="font-[var(--font-bebas)] text-3xl tracking-wide">Photo Highlights</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((src, i) => (
            <div key={src} className="overflow-hidden border border-white/15 bg-white/[0.03]">
              <Image
                src={src}
                alt={`Say Lez live photo ${i + 1}`}
                width={1200}
                height={1600}
                className="h-full w-full object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>

      {other.length > 0 && (
        <div className="mt-12">
          <h3 className="font-[var(--font-bebas)] text-2xl tracking-wide">Other media files</h3>
          <p className="mt-2 font-[var(--font-inter)] text-white/70">
            Some files (like HEIC) may not display in all browsers, but are available here:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 font-[var(--font-inter)] text-white/85">
            {other.map((src) => (
              <li key={src}>
                <a href={src} className="underline" target="_blank" rel="noreferrer">
                  {src.replace("/photos/", "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
