import type { Expression } from "@/content/twin";

export type FaqItem = {
  q: string;
  a: string;
  /** Klo's face while answering */
  face: Expression;
};

export const faq = {
  // Headline and the five questions and answers from the client (2026-10-09)
  headline: { lead: "Ask before", accent: "you trust us." },
  items: [
    {
      q: "How is my family’s information protected?",
      a: "The app and each protected stream open only with Face ID, and the Vault locks again after 5 minutes. Everything is end-to-end encrypted, so only you hold the key. Nothing is shared until you choose. Every share is time-limited and can be revoked in one tap, and Recent activity shows who opened what, and when.",
      face: "focused",
    },
    {
      q: "What is a “digital twin”?",
      a: "It’s Klonie, the AI companion inside KloneME. It builds a private picture of your family’s life from what you add, across trips, money, health, documents and memories, so you can ask it anything about them.",
      face: "happy",
    },
    {
      q: "Does Klonie give medical or financial advice?",
      a: "No. Klonie answers from your own records and never gives a diagnosis or financial advice. If you ask, it can show that a reading is trending down or a savings goal is behind, so you can take it to your doctor or advisor.",
      face: "thinking",
    },
    {
      q: "Can my kids and parents use it?",
      a: "Yes. Kids get their own accounts with parental controls. Parents and grandparents can share readings, medication lists and insurance cards with you, and with their doctor when they choose.",
      face: "helping",
    },
    {
      q: "What happens in an emergency?",
      a: "Set up Emergency share ahead of time. Press and hold for 2 seconds, and your pinned contacts can see the documents you chose for 72 hours. Klonie also calls your first contact, and you can stop sharing at any moment.",
      face: "surprised",
    },
  ] satisfies FaqItem[],
};
