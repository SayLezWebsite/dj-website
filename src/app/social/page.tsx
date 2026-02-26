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

const youtubeChannelUrl = "https://www.youtube.com/@saylezzzz";
const youtubeChannelId = "UCvdodF39BFDMyfrGxpKHMbw";

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

type YouTubeVideo = { id: string; title: string; url: string; thumbnail: string };

async function getLatestYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}`;
    const xml = await fetch(rssUrl, { next: { revalidate: 1800 } }).then((r) => r.text());

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g)?.slice(0, 6) ?? [];

    return entries
      .map((entry) => {
        const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
        const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? "YouTube upload";
        return {
          id,
          title,
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((v) => Boolean(v.id));
  } catch {
    return [];
  }
}

export default async function SocialPage() {
  const photoWall = await getPhotoWall();
  const youtubeVideos = await getLatestYouTubeVideos();
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
        <h2 className="font-[var(--font-bebas)] text-4xl tracking-wide">YouTube Profile Preview</h2>
        <p className="mt-2 font-[var(--font-inter)] text-white/70">
          Latest uploads from your channel. Click any video card to watch on YouTube.
        </p>

        <a
          href={youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block font-[var(--font-inter)] underline"
        >
          Open @saylezzzz channel ↗
        </a>

        {youtubeVideos.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {youtubeVideos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden border border-white/20 bg-white/[0.03] transition hover:border-white"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={1280}
                  height={720}
                  className="h-auto w-full object-cover"
                />
                <div className="p-3 font-[var(--font-inter)] text-sm text-white/90">{video.title}</div>
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 font-[var(--font-inter)] text-white/70">Couldn’t load channel videos right now, but the channel link above works.</p>
        )}
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
