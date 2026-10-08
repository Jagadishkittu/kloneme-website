export const closing = {
  // Copy from kloneme-website-v9.html (#get)
  kicker: "Get the app",
  headline: "Never lose track of",
  // The rotating word and its colour (v9's dark-theme shades, for the dark panel)
  words: [
    { word: "passports.", color: "#ae98f4" },
    { word: "checkups.", color: "#4fc7bd" },
    { word: "renewals.", color: "#a6d454" },
    { word: "deadlines.", color: "#7db3f3" },
    { word: "memories.", color: "#f4978a" },
    { word: "everything.", color: "#f4be4f" },
  ],
  step: 2.2, // seconds per word
  appStore: { small: "Download on the", big: "App Store", label: "Download KloneME on the App Store" },
  // v9 copy kept as is. KloneME is live on Google Play, so the client may want this swapped for a
  // Google Play button (awaiting their call).
  android: {
    line: "On Android? We’ll email you when KloneME arrives on Google Play.",
    label: "Email address",
    placeholder: "you@example.com",
    button: "Notify me",
    invalid: "Enter an email address like you@example.com.",
    thanks: (email: string) => `Thanks. We’ll email ${email} when KloneME is on Google Play.`,
  },
};
