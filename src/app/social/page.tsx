import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";

const socials = [
  {
    name: "Instagram",
    handle: "@say.lez_",
    url: "https://www.instagram.com/say.lez_/",
    note: "Photo/video drops, event updates, clips",
  },
  {
    name: "TikTok",
    handle: "@saylez__",
    url: "https://www.tiktok.com/@saylez__?lang=en",
    note: "Short edits, crowd moments, previews",
  },
  {
    name: "YouTube",
    handle: "@saylezzzz",
    url: "https://www.youtube.com/@saylezzzz",
    note: "Longer sets, edits, and uploads",
  },
];

const youtubeUploadsPlaylistId = "UUvdodF39BFDMyfrGxpKHMbw";

// Paste direct post/reel links here for latest embeds-style cards.
const latestInstagramPosts = ["", "", ""];

const latestTikTokPosts = ["", "", ""];

async function getPhotoWall() {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const files = await fs.readdir(photosDir).catch(() => []);
  return files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(-12)
    .reverse()
    .map((file) => `/photos/${file}`);
}

export default async function SocialPage() {
  const photoWall = await getPhotoWall();
  const igLinks = latestInstagramPosts.filter(Boolean);
  const tiktokLinks = latestTikTokPosts.filter(Boolean);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Social</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">Profile previews, latest links, and media wall.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="group border border-white/20 bg-white/[0.03] p-5 transition hover:border-white"
          >
            <p className="font-[var(--font-bebas)] text-3xl tracking-wide">{social.name}</p>
            <p className="mt-1 font-[var(--font-inter)] text-white/90">{social.handle}</p>
            <p className="mt-3 font-[var(--font-inter)] text-sm text-white/70">{social.note}</p>
            <p className="mt-4 font-[var(--font-inter)] text-sm underline">Open profile</p>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-[var(--font-bebas)] text-4xl tracking-wide">YouTube Preview</h2>
        <p className="mt-2 font-[var(--font-inter)] text-white/70">
          Auto-updating latest uploads from your channel.
        </p>
        <div className="mt-4 overflow-hidden border border-white/20 bg-black">
          <iframe
            title="Say Lez YouTube uploads"
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/videoseries?list=${youtubeUploadsPlaylistId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-[var(--font-bebas)] text-4xl tracking-wide">Latest Posts</h2>
        {igLinks.length === 0 && tiktokLinks.length === 0 ? (
          <p className="mt-3 font-[var(--font-inter)] text-white/70">
            Send me 3 Instagram post/reel links and 3 TikTok links, and I’ll plug them in here.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {igLinks.map((url) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="border border-white/20 p-4 font-[var(--font-inter)] hover:border-white">
                Instagram post ↗
              </a>
            ))}
            {tiktokLinks.map((url) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="border border-white/20 p-4 font-[var(--font-inter)] hover:border-white">
                TikTok post ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="font-[var(--font-bebas)] text-4xl tracking-wide">Media Wall</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {photoWall.map((src, i) => (
            <div key={src} className="overflow-hidden border border-white/15 bg-white/[0.03]">
              <Image src={src} alt={`Social wall ${i + 1}`} width={900} height={1200} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border border-white/20 bg-white/[0.03] p-5 font-[var(--font-inter)] text-white/80">
        Instagram API can be added later, but your YouTube preview is now auto-updating from channel uploads.
      </div>
    </section>
  );
}
