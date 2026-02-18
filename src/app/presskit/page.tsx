import Link from "next/link";

export default function PresskitPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Presskit</h1>
      <p className="mt-3 max-w-3xl font-[var(--font-inter)] text-white/80">
        Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for R&B,
        Soul and sampling. His sets and tracks lean into swing, warmth and emotion, always rooted in feeling.
      </p>

      <div className="mt-8">
        <a
          href="https://drive.google.com/drive/folders/1JnLIiZtqw5vBTM56z7u8yawbsQ8uGzFy?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="inline-block border border-white px-6 py-3 font-[var(--font-bebas)] text-2xl tracking-widest transition hover:bg-white hover:text-black"
        >
          PRESSKIT
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="border border-white/20 bg-white/[0.03] p-5 font-[var(--font-inter)]">
          <p className="font-[var(--font-bebas)] text-3xl tracking-wide">Booking</p>
          <p className="mt-2 text-white/85">simon@itsaclosecall.nl</p>
        </div>
        <div className="border border-white/20 bg-white/[0.03] p-5 font-[var(--font-inter)]">
          <p className="font-[var(--font-bebas)] text-3xl tracking-wide">Socials</p>
          <p className="mt-2 text-white/85">Instagram: @say.lez_</p>
          <p className="text-white/85">TikTok: @saylez__</p>
        </div>
      </div>

      <div className="mt-10 border border-white/20 bg-white/[0.03] p-5 font-[var(--font-inter)]">
        <p className="font-[var(--font-bebas)] text-3xl tracking-wide">Downloads</p>
        <p className="mt-2 text-white/75">Drop your files into <code className="text-white">public/files/</code> and link them below.</p>
        <ul className="mt-4 list-disc pl-5 text-white/90">
          <li><a className="underline" href="/files/press-photo-1.jpg" target="_blank" rel="noreferrer">Press Photo 1</a></li>
          <li><a className="underline" href="/files/press-photo-2.jpg" target="_blank" rel="noreferrer">Press Photo 2</a></li>
          <li><a className="underline" href="/files/tech-rider.pdf" target="_blank" rel="noreferrer">Tech Rider (PDF)</a></li>
        </ul>
      </div>

      <div className="mt-8 font-[var(--font-inter)] text-sm text-white/70">
        <Link href="/contact" className="underline">Need custom materials? Contact here.</Link>
      </div>
    </section>
  );
}
