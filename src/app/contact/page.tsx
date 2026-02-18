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
    </section>
  );
}
