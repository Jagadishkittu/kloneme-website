import type { Expression } from "@/content/twin";

export type StoryTag = "Health" | "Wealth" | "Vault" | "Family";

export type Story = {
  initials: string;
  name: string;
  role: string;
  place: string;
  tags: StoryTag[];
  /** Klo's reaction, shown as a badge beside its face */
  mood: string;
  face: Expression;
  quote: string;
  /** "The KloneME effect" line */
  effect: string;
  emoji: string;
  color: string;
  tint: string;
};

export const stories = {
  // Headline, subline and note from kloneme-website-v9.html (#stories). The stories are the
  // three complete cards in the client's render of v9's story row (2026-10-09); v9's file itself has
  // no story text. The two cut-off cards in that render (the first, "Wait, what?", and Lakshmi V.)
  // are left out until the client sends their full text.
  headline: { lead: "What changes when it’s", accent: "all in one place." },
  sub: "Families spread across cities and countries, and the moments KloneME made easier.",
  note: "Illustrative stories written for the KloneME prototype. Names and details are placeholders until real customer reviews are added.",
  label: "Stories", // v9 aria-label
  effectLabel: "The KloneME effect",

  // Stream tag colours, as in the render
  tags: {
    Health: { color: "var(--lagoon-d)", tint: "#d6f3ef" },
    Wealth: { color: "var(--lime-d)", tint: "#e9f5d6" },
    Vault: { color: "var(--lilac-d)", tint: "#ece6fd" },
    Family: { color: "var(--coral-d)", tint: "#fde3df" },
  } satisfies Record<StoryTag, { color: string; tint: string }>,

  list: [
    {
      initials: "MR",
      name: "Meera R.",
      role: "Product manager",
      place: "Jersey City · parents in Coimbatore",
      tags: ["Health", "Vault"],
      mood: "Touched",
      face: "happy",
      quote: "“My mother’s cardiologist asked for two years of readings. I had them on screen before he finished the sentence.”",
      effect: "Two years of readings, found in seconds",
      emoji: "🩺",
      color: "var(--lagoon-d)",
      tint: "#d6f3ef",
    },
    {
      initials: "AP",
      name: "Arun & Priya S.",
      role: "Founders",
      place: "Dubai · property in Chennai and Pune",
      tags: ["Wealth"],
      mood: "Proud",
      face: "focused",
      quote: "“Two countries, two currencies, two accountants, and for the first time, one number.”",
      effect: "One net worth across two countries",
      emoji: "📊",
      color: "var(--lime-d)",
      tint: "#e9f5d6",
    },
    {
      initials: "SK",
      name: "Sunil K.",
      role: "Software architect",
      place: "Toronto · four siblings, three countries",
      tags: ["Vault", "Family"],
      mood: "Relieved",
      face: "neutral",
      quote: "“When Appa was admitted, nobody had to ask where the papers were.”",
      effect: "Insurance card in his sister’s hands in under a minute",
      emoji: "🆘",
      color: "var(--lilac-d)",
      tint: "#ece6fd",
    },
  ] satisfies Story[],
};
