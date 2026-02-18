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
];

export default function SocialPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Social</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">
        Profile previews + direct links.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
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
    </section>
  );
}
