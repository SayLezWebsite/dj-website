export default function VideosPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Videos</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">
        Add your latest sets, teaser edits, or performance clips.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="aspect-video border border-white/20 bg-white/5 p-4 font-[var(--font-inter)] text-white/70">
          Video slot 1
        </div>
        <div className="aspect-video border border-white/20 bg-white/5 p-4 font-[var(--font-inter)] text-white/70">
          Video slot 2
        </div>
      </div>
    </section>
  );
}
