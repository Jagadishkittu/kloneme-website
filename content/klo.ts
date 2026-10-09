import type { IconName } from "@/components/ui/Icon";

export type Stat = {
  /** The big number */
  value: string;
  statement: string;
  /** Where the figure comes from */
  source: string;
  /** The problem it shows, on the card beside the wheel */
  label: string;
  icon: IconName;
};

export const klo = {
  // Headline and closing line from the client (2026-10-08); the subline was removed at their request (2026-10-09)
  headline: { lead: "You’re not forgetful.", accent: "Life is just scattered." },
  closing: {
    lead: "KloneME was built to take that job off you:",
    rest: "one AI-powered Life OS that does the heavy lifting for you and your family.",
  },
  tryLabel: "Try asking",

  // The five figures, verbatim from the client's table (2026-10-09). Three are shown at a time;
  // scrolling moves them up one place at a time (1–3, 2–4, 3–5). Icons are Claude's pick.
  statsLabel: "Why life feels scattered", // for screen readers
  stats: [
    {
      value: "75%",
      statement: "of Americans can’t estimate their net worth without opening their apps or checking their accounts.",
      source: "Western & Southern, 2026",
      label: "Unclear Net Worth",
      icon: "dollar",
    },
    {
      value: "31.9M",
      statement: "401(k) accounts have been forgotten, holding $2.13 trillion between them as of July 2025.",
      source: "Capitalize + CRR, 2025",
      label: "Forgotten Accounts",
      icon: "bank",
    },
    {
      value: "71%",
      statement: "of travelers print their booking confirmations, and the same share dig through email on a phone.",
      source: "TripIt, 2014",
      label: "Scattered Planning",
      icon: "plane",
    },
    {
      value: "60%",
      statement: "of hobbyists spend under five hours a week, mostly because of family and work.",
      source: "CivicScience, 2025",
      label: "Fading Hobbies",
      icon: "palette",
    },
    {
      value: "31%",
      statement: "of Americans keep personal, medical and financial records backed up somewhere safe and easy to reach.",
      source: "AICPA / Harris Poll, 2019",
      label: "Records At Risk",
      icon: "shield",
    },
  ] satisfies Stat[],

  // Used by the FAQ's chat (faq/AskKlo.tsx)
  phone: {
    title: "Klo",
    status: "Face ID protected", // v9 hero trust line
    thinking: "Thinking…",
  },
};
