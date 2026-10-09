import type { IconName } from "@/components/ui/Icon";

export type Stream = "accent" | "sky" | "berry" | "coral" | "lime" | "lagoon" | "lilac";

type Lane = {
  /** Vertical lane in px at the screen edges, relative to the centre of the lines (narrows behind the phone). */
  lane: number;
};

export type FlowChip = Lane & {
  kind: "chip";
  icon: IconName;
  stream: Stream;
  /** Text label for pill chips; icon-only when omitted. */
  label?: string;
};

export type FlowCard = Lane & {
  kind: "card";
  variant: "reminder" | "ring";
  icon: IconName;
  title: string;
  sub: string;
  /** Ring colour for ring cards */
  color?: string;
};

export type FlowItem = FlowChip | FlowCard;

export const hero = {
  // Headline, sub and trust line from the client (2026-10-08); the button from kloneme-website-v9.html
  headline: { lead: "One Life, One LifeOS", accent: "designed for your family" },
  sub: "Speak, type or scan whatever’s on your mind. KloneME is your AI-powered Life OS, here to make every part of life easier to understand, plan and enjoy.",
  cta: "Download app",
  note: "Private by Design",

  // Items travelling along the lines, left → behind the phone → right, one after another.
  // Each crossing takes half the cycle and items are evenly staggered, so 3 are on screen at a time.
  // Text from v9 calendar, privacy and emergency sections.
  flow: {
    cycle: 10.5, // seconds (crossing = 5.25s)
    items: [
      { kind: "card", variant: "reminder", icon: "cal", title: "Renew Leo’s passport", sub: "By Oct 20", lane: -150 },
      { kind: "chip", icon: "heart", stream: "berry", label: "Health records", lane: 130 },
      { kind: "chip", icon: "shield", stream: "lagoon", label: "Insurance", lane: -50 },
      { kind: "card", variant: "ring", icon: "id", title: "IDs & passports", sub: "5 documents", color: "var(--accent)", lane: 170 },
      { kind: "chip", icon: "plane", stream: "sky", label: "Travel", lane: -175 },
      { kind: "card", variant: "ring", icon: "face", title: "Face ID", sub: "Unlocked", color: "var(--lilac)", lane: 60 },
    ] satisfies FlowItem[],
  },

  // New microcopy for the QR card (not in v9; confirm with client)
  qr: { title: "Download KloneME", sub: "Scan to get the app on your phone." },

  // App screens shown inside the phone (copy from the client's app screenshots)
  phone: {
    listen: {
      eyebrow: "Speak freely",
      title: ["What would you", "like to achieve?"],
      bodyStrong: "I am Listening",
      body: ", Tell me what you have in mind. You can edit the words before continuing.",
      quote: "I want to reach a net worth of $500 million by 2030.",
      status: "Listening...",
      primary: "Continue",
      secondary: "Use Text instead",
    },
    place: {
      eyebrow: "Find its place",
      title: ["This looks like", "a Wealth goal."],
      body: "Is that correct? Choose the area that fits best.",
      goal: "Reach $500M net worth by 2030",
      categories: [
        { key: "wealth", label: "Wealth" },
        { key: "travel", label: "Travel" },
        { key: "wellness", label: "Wellness\n/ Health" },
        { key: "hobbies", label: "Hobbies" },
        { key: "family", label: "Family" },
        { key: "other", label: "Other" },
      ],
      primary: "Yes, Wealth",
      note: "You can change the category later.",
    },
  },
};
