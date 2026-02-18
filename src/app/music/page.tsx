export default function MusicPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Music</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">
        Replace these links with your official profiles.
      </p>

      <div className="mt-8 space-y-4 font-[var(--font-inter)]">
        <a
          className="block border border-white/20 p-4 hover:border-white"
          href="https://soundcloud.com/"
          target="_blank"
          rel="noreferrer"
        >
          SoundCloud
        </a>
        <a
          className="block border border-white/20 p-4 hover:border-white"
          href="https://open.spotify.com/"
          target="_blank"
          rel="noreferrer"
        >
          Spotify
        </a>
      </div>
    </section>
  );
}
