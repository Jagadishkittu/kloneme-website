import type { SocialName } from "@/components/ui/SocialIcon";

export const site = {
  name: "KloneME",
  // Placeholder until the Play Store link is provided. Used by every download button.
  downloadUrl: "https://kloneme.ai",
  // The store buttons (hero and footer), in the stores' own badge wording. Both use downloadUrl for now.
  stores: {
    appStore: { small: "Download on the", big: "App Store", label: "Download KloneME on the App Store" },
    googlePlay: { small: "Get it on", big: "Google Play", label: "Get KloneME on Google Play" },
  },
};

export const nav = {
  links: [
    { label: "Klo", href: "#klone" },
    // The "Simple to start, easy to manage." section now carries the how-it-works steps
    { label: "How it works", href: "#features" },
  ],
  // The button in the header pill (client, 2026-10-09)
  cta: { label: "Contact us", href: "#contact" },
};

export const footer = {
  // Copy from kloneme-website-v9.html (footer)
  label: "Footer", // v9 aria-label
  links: [
    { label: "Streams", href: "#streams" },
    { label: "How it works", href: "#features" },
    { label: "Stories", href: "#stories" },
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#faq" },
  ],
  // Social profiles: placeholders until the client sends KloneME's real profile links
  social: [
    { name: "instagram", label: "KloneME on Instagram", href: "#" },
    { name: "facebook", label: "KloneME on Facebook", href: "#" },
    { name: "x", label: "KloneME on X", href: "#" },
    { name: "linkedin", label: "KloneME on LinkedIn", href: "#" },
    { name: "youtube", label: "KloneME on YouTube", href: "#" },
  ] satisfies { name: SocialName; label: string; href: string }[],
  // DRAFT wording (client asked for a newsletter sign-up, 2026-10-09). Not yet connected to a mailing service.
  newsletter: {
    title: "Sign up for our newsletter",
    label: "Email address",
    placeholder: "you@example.com",
    button: "Sign up",
    invalid: "Enter an email address like you@example.com.",
    thanks: "Thanks. You’re on the list.",
  },
  fine: [
    "© 2026 KloneME. App Store is a service mark of Apple Inc.",
    "Examples use a sample household, the Carter family of Oakland, CA. All names, figures and photos are illustrative. Klo shares information from your records; it does not provide medical, legal or financial advice.",
  ],
};
