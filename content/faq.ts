import type { Expression } from "@/content/twin";

export type FaqItem = {
  q: string;
  a: string;
  /** Klo's face while answering */
  face: Expression;
};

export const faq = {
  // Copy from kloneme-website-v9.html (#faq)
  kicker: "FAQ",
  headline: { lead: "Questions?", accent: "We’ve got answers." },
  items: [
    {
      q: "How is my family’s information protected?",
      a: "The app and each protected stream open only with Face ID, and the Vault locks itself again after 5 minutes. Nothing is shared until you choose. Every share can be time-limited and revoked in one tap, and Recent activity shows who opened what, and when.",
      face: "focused",
    },
    {
      q: "What is a “digital twin”?",
      a: "A private, living copy of your household’s life: the trips, money, health, memories and documents that make up your week. KloneME keeps it current, and Klo watches it so reminders arrive before deadlines do.",
      face: "happy",
    },
    {
      q: "Does Klo give medical or financial advice?",
      a: "No. Klo shares information from your own records, never a diagnosis and never financial advice. It will tell you a reading is trending down or a savings goal is behind, so you can take it to your doctor or advisor.",
      face: "thinking",
    },
    {
      q: "Can my kids and parents use it?",
      a: "Yes. Kids get their own accounts with parental controls. Parents and grandparents can share readings, medication lists and insurance cards with you, and with their doctor when they choose.",
      face: "helping",
    },
    {
      q: "What happens in an emergency?",
      a: "Set up Emergency share ahead of time. Press and hold for 2 seconds, and your pinned contacts can see the documents you chose for 72 hours. Klo also calls your first contact, and you can stop sharing at any moment.",
      face: "surprised",
    },
  ] satisfies FaqItem[],
};
