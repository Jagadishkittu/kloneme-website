import type { Glyph } from "@/components/ui/GlassIcon";

export const closing = {
  // Kicker and small print from the client (2026-10-09). Headline and paragraph from the client's
  // image (2026-10-09), which showed the opening of the old Privacy section (since removed).
  // v9's App Store button and Notify form were removed at the client's request (2026-10-09).
  kicker: "Zero knowledge architecture",
  headline: { lead: "Nothing leaves", accent: "without your say-so." },
  sub: "You’re trusting KloneME with your most personal information. So every stream locks, every share expires, and every view is recorded.",
  smallPrint: "End-to-end encrypted. Only you hold the key; we never see inside.",
  // The four icons in the image: v9's privacy features, in v9's order and colours
  icons: [
    { name: "face", color: "var(--lilac)" }, // Face ID on every stream
    { name: "clock", color: "var(--lagoon)" }, // Shares that expire
    { name: "eye", color: "var(--sky)" }, // See who opened what
    { name: "eyeoff", color: "var(--lime)" }, // Stealth Mode
  ] satisfies { name: Glyph; color: string }[],
};
