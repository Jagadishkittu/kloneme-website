export type ContactTopic = {
  key: string;
  emoji: string;
  /** v9's emoji animation */
  anim: "bounce" | "wiggle" | "fly";
  title: string;
  body: string;
};

export const contact = {
  // Copy from kloneme-website-v9.html (#contact)
  kicker: "Contact",
  headline: { lead: "Talk to", accent: "a real person." },
  sub: "Questions about your account, partnerships or press. Send us a note and the team will get back to you.",
  topics: [
    { key: "help", emoji: "💬", anim: "bounce", title: "Help with the app", body: "Setup, sharing, Face ID and your data." },
    { key: "partners", emoji: "🤝", anim: "wiggle", title: "Partnerships", body: "Ideas for working together with KloneME." },
    { key: "press", emoji: "📰", anim: "fly", title: "Press", body: "Interviews, images and product details." },
  ] satisfies ContactTopic[],
  other: "Something else", // v9's fourth topic option
  form: {
    topic: "Topic",
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@example.com" },
    message: { label: "Message", placeholder: "How can we help?" },
    send: "Send message",
    back: "Back", // closes the form back to the topics (v9's "Back" label from the Emergency share screen)
    // DRAFT: v9 has no confirmation text (its form isn't wired to anything). Built from v9's subline.
    // The form doesn't send anywhere yet; connect it once the client says where messages go.
    sent: "Thanks. The team will get back to you.",
  },
};
