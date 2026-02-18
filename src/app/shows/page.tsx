const upcomingShows = [
  {
    name: "CloseCall",
    venue: "Skatecafe",
    date: "27 February",
  },
];

export default function ShowsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[var(--font-bebas)] text-6xl tracking-wider">Shows</h1>
      <p className="mt-3 font-[var(--font-inter)] text-white/70">
        Upcoming dates. Edit this page to add/update bookings.
      </p>

      <div className="mt-8 space-y-4">
        {upcomingShows.map((show) => (
          <div
            key={`${show.name}-${show.date}`}
            className="border border-white/20 bg-white/[0.03] p-5 font-[var(--font-inter)]"
          >
            <p className="text-xl text-white">{show.name}</p>
            <p className="mt-1 text-white/75">{show.venue}</p>
            <p className="mt-2 text-white/90">{show.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
