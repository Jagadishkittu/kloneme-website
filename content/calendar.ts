import type { StreamKey } from "@/content/streams";

export type CalEvent = { title: string; when: string; stream: StreamKey };
export type Period = { name: string; emoji: string; now?: boolean; events: CalEvent[] };

export const calendar = {
  // Copy from kloneme-website-v9.html (#calendar)
  kicker: "One calendar",
  headline: { lead: "Everything, on", accent: "one family calendar." },
  sub: "Renewals, payments, checkups and deadlines from every stream, each with a nudge early enough to act.",

  // v9's five periods and their events, in v9 order. Each event's stream follows v9's colour class.
  // Emoji from the client's render of v9 (not in the repo copy of v9).
  periods: [
    {
      name: "This week",
      emoji: "📌",
      now: true,
      events: [
        { title: "Watercolor club", when: "Today · 7:00 PM", stream: "hobbies" },
        { title: "Nana’s cardiology", when: "Tomorrow · 9:30 AM", stream: "health" },
        { title: "Refill Nana’s prescriptions", when: "Sep 29", stream: "health" },
      ],
    },
    {
      name: "Early October",
      emoji: "🍂",
      events: [
        { title: "Mortgage · $2,960", when: "Sep 30", stream: "wealth" },
        { title: "Leo’s flu shot", when: "Oct 1 · 4:30 PM", stream: "health" },
        { title: "Global Entry interview", when: "Oct 8 · SFO", stream: "travel" },
      ],
    },
    {
      name: "Mid October",
      emoji: "🏃",
      events: [
        { title: "Half-marathon", when: "Oct 12", stream: "hobbies" },
        { title: "Renew Leo’s passport", when: "By Oct 20", stream: "vault" },
      ],
    },
    {
      name: "Late October",
      emoji: "🎃",
      events: [
        { title: "20 paintings milestone", when: "Oct 31", stream: "hobbies" },
        { title: "Halloween with the kids", when: "Oct 31 · evening", stream: "family" },
      ],
    },
    {
      name: "November",
      emoji: "🦃",
      events: [
        { title: "Open enrollment", when: "Nov 1 – Dec 15", stream: "health" },
        { title: "Home insurance renews", when: "Nov 14", stream: "wealth" },
        { title: "Big Sur & Carmel", when: "Nov 14 · 2 nights", stream: "travel" },
      ],
    },
  ] satisfies Period[],
};
