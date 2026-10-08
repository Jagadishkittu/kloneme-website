export type HowStep = {
  emoji: string;
  /** v9's emoji animation for this step */
  anim: "wiggle" | "bounce" | "beat";
  label: string;
  title: string;
  body: string;
  /** The words Klo hears (step 3), shown as if spoken */
  quote?: string;
  color: string;
  tint: string;
};

export const how = {
  // Copy from kloneme-website-v9.html (#how)
  kicker: "How it works",
  headline: { lead: "Set up in minutes.", accent: "Klo does the rest." },
  steps: [
    {
      emoji: "📲",
      anim: "wiggle",
      label: "Step 1",
      title: "Download and sign in",
      body: "Sign in with Apple, Google or email, then turn on Face ID. Your vault stays private to you.",
      color: "var(--lagoon-d)",
      tint: "#d6f3ef",
    },
    {
      emoji: "👨‍👩‍👧",
      anim: "bounce",
      label: "Step 2",
      title: "Invite your circle, if you like",
      body: "Use it on your own, or send one link to your family. Each person decides what they share.",
      color: "var(--sky-d)",
      tint: "#ddebfc",
    },
    {
      emoji: "🎙️",
      anim: "beat",
      label: "Step 3",
      title: "Say it, scan it or type it",
      quote: "“Add Daniel’s Omega Seamaster, bought June 2021 for $5,400.”",
      body: "Or scan a license, and Klo files it.",
      color: "var(--lilac-d)",
      tint: "#ece6fd",
    },
  ] satisfies HowStep[],
};
