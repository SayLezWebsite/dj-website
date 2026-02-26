export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Contact</h1>
      <p className="mt-4 font-[var(--font-inter)] text-white/85">
        For bookings and inquiries, send email to:
      </p>
      <p className="mt-2 font-[var(--font-inter)] text-lg">
        <a className="underline" href="mailto:simon@itsaclosecall.nl">
          simon@itsaclosecall.nl
        </a>
      </p>

      <form
        className="mt-8 grid gap-3 rounded-xl border border-white/20 bg-[#13161b]/65 p-5 font-[var(--font-inter)]"
        action="mailto:simon@itsaclosecall.nl"
        method="post"
        encType="text/plain"
      >
        <p className="text-sm text-white/75">Direct application email draft</p>
        <label className="inline-flex items-center gap-2 text-sm text-white/85">
          <input type="checkbox" name="Email" value="simon@itsaclosecall.nl" defaultChecked />
          Send to simon@itsaclosecall.nl
        </label>
        <input
          className="border border-white/20 bg-black/30 px-3 py-2"
          type="text"
          name="Subject"
          placeholder="Subject"
          required
        />
        <textarea
          className="min-h-36 border border-white/20 bg-black/30 px-3 py-2"
          name="Message"
          placeholder="Your message"
          required
        />
        <button className="w-fit border border-white px-5 py-2" type="submit">
          Open Email Draft
        </button>
      </form>
    </section>
  );
}
