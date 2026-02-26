import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/photos/home-main.jpg?v=20260226a')" }}
      />
      <div className="absolute inset-0 bg-[#0d0f12]/65" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col justify-end px-6 pb-14">
        <h1 className="font-[var(--font-bebas)] text-7xl tracking-widest md:text-9xl">SAY LEZ</h1>
        <p className="mt-5 max-w-2xl font-[var(--font-inter)] text-base text-white/90 md:text-lg">
          Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for
          R&amp;B, Soul and sampling. His sets and tracks lean into swing, warmth and emotion,
          always rooted in feeling.
        </p>

        <div className="mt-8 max-w-xl border border-white/20 bg-[#13161b]/65 p-4 font-[var(--font-inter)]">
          <p className="text-xs uppercase tracking-widest text-white/65">Next showdate</p>
          <p className="mt-1 text-lg text-white">CloseCall — Skatecafe — 27 February</p>
          <Link href="/shows" className="mt-3 inline-block underline text-white/90">
            View all dates
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 font-[var(--font-inter)] text-sm text-white/90">
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
