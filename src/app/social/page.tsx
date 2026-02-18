export default function SocialPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Social</h1>

      <div className="mt-8 space-y-4 font-[var(--font-inter)]">
        <a
          className="block border border-white/20 p-4 hover:border-white"
          href="https://www.instagram.com/itsaclosecall/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          className="block border border-white/20 p-4 hover:border-white"
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noreferrer"
        >
          TikTok
        </a>
        <a
          className="block border border-white/20 p-4 hover:border-white"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
        >
          YouTube
        </a>
      </div>
    </section>
  );
}
