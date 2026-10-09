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
  /** One-liner from the client (2026-10-08) */
  body: string;
  /** Where this stream's loose end used to live (v9 problem section) */
  from: { place: string; icon: IconName };
};

export const streams = {
  // Headline, sub and the card lines from the client (2026-10-08)
  headline: { lead: "Finally, all parts of your life", accent: "fits together in KloneME." },
  sub: "Six streams, each built for a different part of life, all connected and understood by one AI.",
  label: "Streams", // v9 aria-label
  from: "From", // same label as the Problem section's phone (new microcopy)

  // Stream names from the client; facts inside each card's screen from v9 (calendar, problem, privacy).
  // Order from the client (2026-10-09): Health, Wealth, Family, Vault, Travel, Hobbies.
  cards: [
    {
      key: "health",
      name: "Health",
      icon: "heart",
      color: "var(--berry)",
      expression: "helping",
      body: "Look after everyone’s health without carrying it all in your head.",
      from: { place: "Notes", icon: "note" },
    },
    {
      key: "wealth",
      name: "Wealth",
      icon: "dollar",
      color: "var(--lime)",
      expression: "focused",
      body: "Investments and assets tracked in one place, with no spreadsheets and no digging.",
      from: { place: "Bank app", icon: "bank" },
    },
    {
      key: "family",
      name: "Family",
      icon: "users",
      color: "var(--coral)",
      expression: "happy",
      body: "Run the household together with a shared calendar, chores, memories and emergency details.",
      from: { place: "Family chat", icon: "chat" },
    },
    {
      key: "vault",
      name: "Vault",
      icon: "vault",
      color: "var(--lagoon)",
      expression: "neutral",
      body: "IDs and documents kept safe and within easy reach, so you’re never digging through drawers.",
      from: { place: "Sticky note", icon: "sticky" },
    },
    {
      key: "travel",
      name: "Travel",
      icon: "plane",
      color: "var(--sky)",
      expression: "surprised",
      body: "Where you’ve been, where you’re going and what’s due before you leave, mapped in one place.",
      from: { place: "Calendar", icon: "cal" },
    },
    {
      key: "hobbies",
      name: "Hobbies",
      icon: "brush",
      color: "var(--lilac)",
      expression: "thinking",
      body: "Your passions deserve a place too. Track so you can see how far you’ve come.",
      from: { place: "Photos", icon: "photo" },
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
