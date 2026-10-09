import type { IconName } from "@/components/ui/Icon";
import { problem } from "./problem";

export type Pain = { icon: IconName; title: string; body: string };

export type CheckIn = { klo: string; you: string; answer: string; source: string; icon: IconName };

export const klo = {
  // Kicker from kloneme-website-v9.html (#klone); headline, sub and closing line from the client (2026-10-08)
  kicker: "Your AI companion",
  headline: { lead: "You’re not forgetful.", accent: "Life is just scattered." },
  sub: "Right now, you’re the operating system for your family’s life.",
  closing: {
    lead: "KloneME was built to take that job off you:",
    rest: "one AI-powered Life OS that does the heavy lifting for you and your family.",
  },
  tryLabel: "Try asking",

  // The pain of daily life: v9's pain points (kloneme-website-v9.html #problem), as tiles
  painsLabel: "The problem", // v9 kicker, used as the tiles' label for screen readers
  pains: [
    { icon: "inbox", title: "10 places to look", body: "Apps, inboxes, drawers and notes." },
    { icon: "clock", title: "Deadlines found too late", body: "Renewals and checkups slip by." },
    { icon: "users", title: "Only one person knows", body: "Everyone else has to ask you." },
    { icon: "sos", title: "No plan for an emergency", body: "Where’s the insurance card at 3 AM?" },
  ] satisfies Pain[],
  painStep: 3.6, // seconds each tile stays lit

  // Scattered family life: thoughts drifting through your head. v9's ten notes (kloneme-website-v9.html #problem)
  scattered: {
    label: problem.looseEndsLabel, // v9 aria-label
    notes: problem.looseEnds,
    cycle: 30, // seconds for one note to drift from the far depth past you
  },

  // Used by the check-in card and the FAQ's chat (faq/AskKlo.tsx)
  phone: {
    title: "Klo",
    status: "Face ID protected", // v9 hero trust line
    thinking: "Thinking…",
  },

  // DRAFT: morning check-ins, a different one each time the card plays. Klo greets you, you reply,
  // Klo thinks, then its answer streams in word by word with its source. Facts and dates from v9's
  // calendar and loose-end notes.
  checkIn: {
    chats: [
      {
        klo: "Good morning. Your Global Entry interview is on Oct 8 at SFO.",
        you: "Thanks. Anything else coming up?",
        answer: "Leo’s flu shot is Oct 1 at 4:30 PM, and his passport needs renewing by Oct 20.",
        source: "Family calendar",
        icon: "cal",
      },
      {
        klo: "Heads up. Your mortgage payment of $2,960 is due Sep 30.",
        you: "Got it. Anything else for the house?",
        answer: "Your home policy renews on Nov 14. I’ll nudge you early enough to act.",
        source: "Home insurance policy",
        icon: "home",
      },
      {
        klo: "Good morning. Nana’s cardiology appointment is tomorrow at 9:30 AM.",
        you: "Thanks. Does she need anything?",
        answer: "Her prescriptions need refilling by Sep 29, and her latest blood pressure reading is 141/88.",
        source: "Nana’s records",
        icon: "heart",
      },
    ] satisfies CheckIn[],
    loop: 12, // seconds each check-in plays before the next one
  },
};
