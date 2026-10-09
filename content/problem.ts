import type { IconName } from "@/components/ui/Icon";

export type StreamName = "Travel" | "Health" | "Wealth" | "Family" | "Hobbies" | "Vault";

export type LooseEnd = {
  /** Where it's stuck today (v9 note source) */
  place: string;
  icon: IconName;
  /** What's wrong with it there (v9 tag) */
  issue: string;
  item: string;
  /** The stream it's filed into once it's in KloneME */
  stream: StreamName;
};

export const problem = {
  // Kicker and the notes from kloneme-website-v9.html (#problem); headline and sub from the client (2026-10-08)
  kicker: "The problem",
  headline: { lead: "Swap a dozen apps for", accent: "one AI that knows your family." },
  sub: "Hand the remembering to KloneME’s AI. It knows your family, organises their details and lets you find any of it in seconds, with sharing always on your terms.",
  looseEndsLabel: "Examples of scattered family information", // v9 aria-label

  // v9's ten scattered notes, in v9 order: tiles travelling along the arcs; the first six are filed in the phone
  looseEnds: [
    { place: "Sticky note", icon: "sticky", issue: "Where is it?", item: "Leo’s passport, desk drawer?", stream: "Vault" },
    { place: "Gmail", icon: "inbox", issue: "Buried", item: "Your member ID card", stream: "Health" },
    { place: "Calendar", icon: "cal", issue: "Only on one phone", item: "Global Entry interview, Oct 8", stream: "Travel" },
    { place: "Notes", icon: "note", issue: "Not shared", item: "Nana BP: 141/88", stream: "Health" },
    { place: "Bank app", icon: "bank", issue: "Easy to miss", item: "Mortgage $2,960 due Sep 30", stream: "Wealth" },
    { place: "Mail", icon: "mail", issue: "Renews unnoticed", item: "Home policy renews Nov 14", stream: "Wealth" },
    { place: "Clinic portal", icon: "clinic", issue: "Overdue", item: "Daniel’s physical is overdue", stream: "Health" },
    { place: "Family chat", icon: "chat", issue: "Lost in chat", item: "Whose turn to walk Biscuit?", stream: "Family" },
    { place: "Photos", icon: "photo", issue: "No tracking", item: "18 paintings, 12 to go", stream: "Hobbies" },
    { place: "Spreadsheet", icon: "sheet", issue: "Out of date", item: "Crypto value from Aug 10", stream: "Wealth" },
  ] satisfies LooseEnd[],
  orbit: 36, // seconds for a tile to travel the outer arc

  // In-phone screen: the client's KME "Family" screen (screenshot from the client, 2026-10-08)
  screen: "/app/family-screen.png",
};
