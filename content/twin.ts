import type { StreamKey } from "./streams";

export type Expression = "neutral" | "happy" | "thinking" | "focused" | "surprised" | "helping";

export type Area = {
  name: string;
  /** Klo expression from the client's expressions sheet (public/klo/<expression>.png) */
  expression: Expression;
  /** The stream it stands for: Klo holds that stream's object, in its colour (twin/HeldIcon.tsx) */
  stream: StreamKey;
};

export const twin = {
  // Copy from the client (2026-10-08). Store badges use the stores' own badge wording.
  headline: { lead: "Hi, I’m Klonie", accent: "your AI Digital Twin" },
  sub: "I’m your AI companion inside KloneME. I keep track of the everyday, plan ahead and look after every part of life, so you and your family can spend your time on what matters most.",
  appStore: { small: "Download on the", big: "App Store", label: "Download KloneME on the App Store" },
  googlePlay: { small: "Get it on", big: "Google Play", label: "Get KloneME on Google Play" },

  // Parts of life (names from the client), each with a different Klo expression.
  // They take turns in the middle in this order, arriving from the right.
  label: "Parts of life",
  areas: [
    { name: "Travel", expression: "surprised", stream: "travel" },
    { name: "Health", expression: "helping", stream: "health" },
    { name: "Wealth", expression: "focused", stream: "wealth" },
    { name: "Family", expression: "happy", stream: "family" },
    { name: "Hobbies", expression: "thinking", stream: "hobbies" },
    { name: "Vault", expression: "neutral", stream: "vault" },
  ] satisfies Area[],
  step: 1.5, // seconds per step (the slide itself takes 0.85s of it)
};
