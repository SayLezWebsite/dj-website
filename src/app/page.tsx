export default function Home() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col justify-end px-6 pb-14">
        <h1 className="font-[var(--font-bebas)] text-7xl tracking-widest md:text-9xl">LEZ</h1>
        <p className="mt-5 max-w-2xl font-[var(--font-inter)] text-base text-white/90 md:text-lg">
          Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for
          R&amp;B, Soul and sampling. His sets and tracks lean into swing, warmth and emotion,
          always rooted in feeling.
        </p>
      </div>
    </section>
  );
}
