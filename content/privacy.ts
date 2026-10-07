import type { IconName } from "@/components/ui/Icon";

export type PrivacyFeature = { name: string; line: string; icon: IconName; color: string };

export const privacy = {
  // Copy from kloneme-website-v9.html (#privacy)
  kicker: "Privacy",
  headline: { lead: "Nothing leaves", accent: "without your say-so." },
  sub: "You’re trusting KloneME with your most personal information. So every stream locks, every share expires, and every view is recorded.",
  demoLabel: "How privacy works in the app, sample", // v9 aria-label

  // v9's four privacy tiles, in v9 order and colours. Each titles one card of the bento.
  features: {
    faceId: { name: "Face ID on every stream", line: "The Vault locks itself after 5 minutes.", icon: "face", color: "var(--lilac)" },
    shares: { name: "Shares that expire", line: "A day, a week or a month. Revoke any time.", icon: "clock", color: "var(--lagoon)" },
    views: { name: "See who opened what", line: "Every view shows up in Recent activity.", icon: "eye", color: "var(--sky)" },
    stealth: { name: "Stealth Mode", line: "Blur every money figure in one tap.", icon: "eyeoff", color: "var(--lime)" },
  } satisfies Record<string, PrivacyFeature>,

  // The in-app samples (v9)
  vault: {
    label: "Vault",
    title: "Unlocked with Face ID",
    locks: "Locks again in",
    seconds: 300,
  },
  request: {
    who: { initial: "D", color: "#138A72" },
    title: "Daniel asked to see Leo’s passport",
    body: "For the renewal appointment on Oct 20.",
    lengths: ["1 day", "7 days", "30 days"],
    lengthLabel: "Access length",
    preset: "7 days",
    approve: "Approve",
    decline: "Decline",
    approved: (length: string) => `Approved. Daniel can view Leo’s passport for ${length}. Revoke any time.`,
    declined: "Declined. Daniel has been told kindly.",
  },
  shared: {
    label: "Shared right now",
    rows: [
      { initial: "P", color: "#2B6CA8", title: "Nana’s medication list → Dr. Patel", left: "2 of 7 days left", fill: 0.28 },
      { initial: "D", color: "#138A72", title: "Your insurance card → Daniel", left: "24 of 30 days left", fill: 0.8 },
    ],
    revoke: "Revoke",
    revoked: "Revoked just now",
    toast: "Access removed.",
  },
  activity: {
    label: "Recent activity",
    items: [
      { text: "Daniel viewed the home deed", when: "Sun", color: "var(--sky)" },
      { text: "Dr. Patel opened a share", when: "Fri", color: "var(--lagoon)" },
      { text: "You scanned a license", when: "Thu", color: "var(--lilac)" },
    ],
  },
  stealth: {
    label: "Stealth Mode",
    value: "$873.6K",
    caption: "Net worth",
  },
};
