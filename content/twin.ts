export type Expression = "neutral" | "happy" | "thinking" | "focused" | "surprised" | "helping";

export type Area = {
  name: string;
  /** Klo expression from the client's expressions sheet (public/klo/<expression>.png) */
  expression: Expression;
};

export const twin = {
  // Copy from kloneme-website-v9.html (#twin)
  headline: { lead: "One twin for every", accent: "part of life." },
  sub: "KloneME keeps your documents, health, money, travel and plans in one private place, for you or your whole family, and reminds you before anything slips.",
  appStore: { small: "Download on the", big: "App Store", label: "Download KloneME on the App Store" },
  explore: { label: "Explore the streams", href: "#streams" },

  // Parts of life (names from the client), each with a different Klo expression.
  // They take turns in the middle in this order, arriving from the right.
  label: "Parts of life",
  areas: [
    { name: "Travel", expression: "surprised" },
    { name: "Health", expression: "helping" },
    { name: "Wealth", expression: "focused" },
    { name: "Family", expression: "happy" },
    { name: "Hobbies", expression: "thinking" },
    { name: "Vault", expression: "neutral" },
  ] satisfies Area[],
  step: 1.5, // seconds per step (the slide itself takes 0.85s of it)
};
