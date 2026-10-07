import type { IconName } from "@/components/ui/Icon";
import type { Expression } from "@/content/twin";

export type StreamKey = "travel" | "health" | "wealth" | "family" | "hobbies" | "vault";

export type StreamCard = {
  key: StreamKey;
  name: string;
  icon: IconName;
  color: string;
  /** Klo's expression for this stream (same pairing as the Twin section) */
  expression: Expression;
  /** DRAFT one-liner (v9 has no stream descriptions; built from v9 facts) */
  body: string;
  /** Where this stream's loose end used to live (v9 problem section) */
  from: { place: string; icon: IconName };
};

export const streams = {
  // Copy from kloneme-website-v9.html (#streams)
  kicker: "The solution",
  headline: { lead: "Six streams.", accent: "One twin." },
  sub: "Every loose end gets a home. Pick a part of life and watch how KloneME handles it, step by step.",
  label: "Streams", // v9 aria-label
  from: "From", // same label as the Problem section's phone (new microcopy)

  // Stream names from the client; facts inside each card's screen from v9 (calendar, problem, privacy).
  cards: [
    {
      key: "travel",
      name: "Travel",
      icon: "plane",
      color: "var(--sky)",
      expression: "surprised",
      body: "Trips, interviews and bookings on one timeline, with a nudge before every date.",
      from: { place: "Calendar", icon: "cal" },
    },
    {
      key: "health",
      name: "Health",
      icon: "heart",
      color: "var(--berry)",
      expression: "helping",
      body: "Readings, checkups and prescriptions for the whole family, ready for the next appointment.",
      from: { place: "Notes", icon: "note" },
    },
    {
      key: "wealth",
      name: "Wealth",
      icon: "dollar",
      color: "var(--lime)",
      expression: "focused",
      body: "Bills, policies and renewals in one place, so nothing falls due or renews unnoticed.",
      from: { place: "Bank app", icon: "bank" },
    },
    {
      key: "family",
      name: "Family",
      icon: "users",
      color: "var(--coral)",
      expression: "happy",
      body: "Shared plans and turns, so everyone knows what’s next without having to ask you.",
      from: { place: "Family chat", icon: "chat" },
    },
    {
      key: "hobbies",
      name: "Hobbies",
      icon: "brush",
      color: "var(--lilac)",
      expression: "thinking",
      body: "Clubs, races and personal goals, tracked so your progress never gets lost.",
      from: { place: "Photos", icon: "photo" },
    },
    {
      key: "vault",
      name: "Vault",
      icon: "vault",
      color: "var(--lagoon)",
      expression: "neutral",
      body: "IDs, passports and cards behind Face ID. The Vault locks itself after 5 minutes.",
      from: { place: "Sticky note", icon: "sticky" },
    },
  ] satisfies StreamCard[],

  // What each card's mini screen shows (v9 facts)
  screens: {
    travel: {
      title: "Global Entry interview",
      meta: "Oct 8 · SFO",
      next: { title: "Big Sur & Carmel", meta: "Nov 14 · 2 nights" },
    },
    health: {
      title: "Nana’s readings",
      value: "141/88",
      next: { title: "Nana’s cardiology", meta: "Tomorrow · 9:30 AM" },
    },
    wealth: [
      { title: "Mortgage", meta: "$2,960 · Sep 30" },
      { title: "Home insurance renews", meta: "Nov 14" },
      { title: "Open enrollment", meta: "Nov 1 – Dec 15" },
    ],
    family: {
      title: "Whose turn to walk Biscuit?",
      people: ["Leo", "Daniel", "Nana"],
      next: { title: "Halloween with the kids", meta: "Oct 31 · evening" },
    },
    hobbies: {
      title: "Paintings",
      meta: "18 done · 12 to go",
      done: 18,
      total: 30,
      next: { title: "Half-marathon", meta: "Oct 12" },
    },
    vault: {
      docs: ["Leo’s passport", "Your member ID card"],
      lock: "Locks itself after 5 minutes",
    },
  },
};
