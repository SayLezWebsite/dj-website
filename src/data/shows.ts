export type Show = {
  name: string;
  venue: string;
  city: string;
  date: string;
  lineup: string[];
  flyer?: string;
  eventUrl?: string;
  status: "upcoming" | "past";
};

export const shows: Show[] = [
  {
    name: "CloseCall",
    venue: "Skatecafe",
    city: "Amsterdam",
    date: "27 February 2026 · 22:00–03:00",
    lineup: ["YEMZ", "DANN", "SAY LEZ", "DAVE NUNES", "MAEY", "BLACKSTA", "PASSION DEEZ"],
    flyer: "/photos/events/closecall-2026-02-27.png",
    eventUrl: "https://skatecafe.weticket.io/closecall",
    status: "upcoming",
  },
  {
    name: "Overbruggen",
    venue: "Shelter",
    city: "Amsterdam",
    date: "31 January 2026 · 23:00–06:00",
    lineup: ["Nik-ey", "S.A.M.", "Riordan", "Boss Priester b2b Mad.Again", "Say Lez", "Safiya", "Arter b2b DC Noises"],
    flyer: "/photos/events/overbruggen-2026-01-31.jpg",
    eventUrl: "https://www.shelteramsterdam.nl/event/31-01-overbruggen/",
    status: "past",
  },
  {
    name: "KUMO invites: CLOSECALL",
    venue: "Parallel",
    city: "Amsterdam",
    date: "5 December 2025 · 23:59–05:00",
    lineup: ["Ryota", "Yung Singh", "21-L", "DANN", "SAY LEZ", "Aures"],
    flyer: "/photos/home-main.jpg",
    eventUrl: "https://parallel.am/programme/kumo-invites-closecall",
    status: "past",
  },
];
