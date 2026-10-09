export type ContactTopic = {
  key: string;
  emoji: string;
  /** v9's emoji animation */
  anim: "bounce" | "wiggle" | "fly";
  title: string;
  body: string;
};

export const contact = {
  // Eyebrow, headline and body from the client (2026-10-09); topics and form from kloneme-website-v9.html (#contact)
  kicker: "Get in touch",
  headline: { lead: "Reach the team", accent: "behind KloneME." },
  sub: "Whether it’s a question, an idea or a quick hello, send us a message and the team will reply.",
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
    // DRAFT: v9 has no confirmation text (its form isn't wired to anything). Built from v9's old subline.
    // The form doesn't send anywhere yet; connect it once the client says where messages go.
    sent: "Thanks. The team will get back to you.",
  },
};
