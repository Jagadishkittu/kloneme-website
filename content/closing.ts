export const closing = {
  // Kicker, heading, rotating words and small print from the client (2026-10-09);
  // the App Store button and the Notify form are v9's (#get)
  kicker: "Zero knowledge architecture",
  headline: "KloneME can’t read your",
  // The rotating word, in the client's order, and its colour (v9's dark-theme shades, for the dark panel)
  words: [
    { word: "memories.", color: "#f4978a" },
    { word: "checkups.", color: "#4fc7bd" },
    { word: "finances.", color: "#a6d454" },
    { word: "documents.", color: "#ae98f4" },
    { word: "plans.", color: "#7db3f3" },
    { word: "everything.", color: "#f4be4f" },
  ],
  step: 2.2, // seconds per word
  smallPrint: "End-to-end encrypted. Only you hold the key; we never see inside.",
  appStore: { small: "Download on the", big: "App Store", label: "Download KloneME on the App Store" },
  // v9's Notify form, kept as is. KloneME is live on Google Play, so the client may want this swapped
  // for a Google Play button (awaiting their call).
  android: {
    label: "Email address",
    placeholder: "you@example.com",
    button: "Notify me",
    invalid: "Enter an email address like you@example.com.",
    thanks: (email: string) => `Thanks. We’ll email ${email} when KloneME is on Google Play.`,
  },
};
