import Image from "next/image";
import { shows, type Show } from "@/data/shows";

function ShowCard({ show }: { show: Show }) {
  return (
    <article className="grid gap-4 border border-white/20 bg-white/[0.03] p-5 md:grid-cols-[220px_1fr]">
      <div className="overflow-hidden border border-white/15 bg-black/30">
        {show.flyer ? (
          <Image src={show.flyer} alt={`${show.name} flyer`} width={800} height={1000} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full min-h-56 items-center justify-center font-[var(--font-inter)] text-sm text-white/60">Flyer coming soon</div>
        )}
      </div>

      <div className="font-[var(--font-inter)]">
        <p className="font-[var(--font-bebas)] text-4xl tracking-wide">{show.name}</p>
        <p className="mt-1 text-white/80">{show.venue} — {show.city}</p>
        <p className="mt-1 text-white/90">{show.date}</p>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-white/60">Line-up</p>
          <p className="mt-1 text-white/90">{show.lineup.join(" · ")}</p>
        </div>

        {show.eventUrl ? (
          <a href={show.eventUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block underline">Event link ↗</a>
        ) : (
          <p className="mt-4 text-sm text-white/60">Event link coming soon</p>
        )}
      </div>
    </article>
  );
}

export default function ShowsPage() {
  const upcoming = shows.filter((s) => s.status === "upcoming");
  const past = shows.filter((s) => s.status === "past");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Shows</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">Upcoming and past shows with lineup, flyer, and event links.</p>

      <div className="mt-8 space-y-6">
        {upcoming.map((show) => (
          <ShowCard key={`${show.name}-${show.date}`} show={show} />
        ))}
      </div>

      <h2 className="mt-14 font-[var(--font-bebas)] text-4xl tracking-wider">Past Shows</h2>
      <div className="mt-6 space-y-6 opacity-95">
        {past.map((show) => (
          <ShowCard key={`${show.name}-${show.date}`} show={show} />
        ))}
      </div>
    </section>
  );
}
