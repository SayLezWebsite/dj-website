import Link from "next/link";

export default function PresskitPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Presskit</h1>
      <p className="mt-3 max-w-3xl font-[var(--font-inter)] text-white/80">
        Say Lez is a DJ/producer based in Amsterdam, focused on Garage with a serious love for R&B,
        Soul and sampling. His sets and tracks lean into swing, warmth and emotion, always rooted in feeling.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://drive.google.com/drive/folders/1JnLIiZtqw5vBTM56z7u8yawbsQ8uGzFy?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="inline-block border border-white px-6 py-3 font-[var(--font-bebas)] text-2xl tracking-widest transition hover:bg-white hover:text-black"
        >
          PRESSKIT
        </a>
        <a
          href="https://drive.google.com/drive/folders/1JnLIiZtqw5vBTM56z7u8yawbsQ8uGzFy?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="inline-block border border-white/70 px-5 py-3 font-[var(--font-inter)] text-sm uppercase tracking-wider"
        >
          Download / Open Folder
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
        <p className="font-[var(--font-bebas)] text-3xl tracking-wide">Presskit Download</p>
        <p className="mt-2 text-white/75">Click once to open the complete presskit folder for all files.</p>
        <a
          href="https://drive.google.com/drive/folders/1JnLIiZtqw5vBTM56z7u8yawbsQ8uGzFy?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block border border-white px-5 py-3 text-sm uppercase tracking-wider"
        >
          Click here for presskit
        </a>
      </div>

      <div className="mt-8 font-[var(--font-inter)] text-sm text-white/70">
        <Link href="/contact" className="underline">Need custom materials? Contact here.</Link>
      </div>
    </section>
  );
}
