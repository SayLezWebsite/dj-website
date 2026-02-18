const soundcloudProfile = "https://soundcloud.com/saylezam";

// Paste your latest 3 track URLs here and they will auto-embed.
const latestTracks = [
  "https://soundcloud.com/saylezam/lupita-ellaime-x-say-lez",
  "https://soundcloud.com/saylezam/say-lez-radio-tnp-0671225",
  "https://soundcloud.com/saylezam/nueva-bass",
];

function scEmbedUrl(trackUrl: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23ffffff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`;
}

export default function MusicPage() {
  const filledTracks = latestTracks.filter(Boolean);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Music</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">
        Latest from SoundCloud + Spotify.
      </p>

      <div className="mt-8 grid gap-8">
        <div>
          <h2 className="font-[var(--font-bebas)] text-3xl tracking-wide">SoundCloud</h2>
          <div className="mt-4 overflow-hidden border border-white/20 bg-white/5 p-3">
            <iframe
              title="Say Lez SoundCloud"
              width="100%"
              height="166"
              allow="autoplay"
              src={scEmbedUrl(soundcloudProfile)}
            />
          </div>
          <a
            className="mt-3 inline-block font-[var(--font-inter)] underline"
            href={soundcloudProfile}
            target="_blank"
            rel="noreferrer"
          >
            Open full SoundCloud profile
          </a>
        </div>

        <div>
          <h3 className="font-[var(--font-bebas)] text-2xl tracking-wide">Latest 3 tracks</h3>
          {filledTracks.length === 3 ? (
            <div className="mt-4 space-y-4">
              {filledTracks.map((trackUrl) => (
                <div key={trackUrl} className="overflow-hidden border border-white/20 bg-white/5 p-3">
                  <iframe title={trackUrl} width="100%" height="166" allow="autoplay" src={scEmbedUrl(trackUrl)} />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 font-[var(--font-inter)] text-white/70">
              Send me your last 3 SoundCloud track URLs and I’ll wire them in instantly.
            </p>
          )}
        </div>

        <div>
          <h2 className="font-[var(--font-bebas)] text-3xl tracking-wide">Spotify</h2>
          <a
            className="mt-3 inline-block font-[var(--font-inter)] underline"
            href="https://open.spotify.com/"
            target="_blank"
            rel="noreferrer"
          >
            Add your Spotify profile/artist link
          </a>
        </div>
      </div>
    </section>
  );
}
