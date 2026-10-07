import type { IconName } from "@/components/ui/Icon";

export type Rule = { icon: IconName; title: string; body: string };

export type Exchange = { q: string; a: string; source: string };

export const klo = {
  // Copy from kloneme-website-v9.html (#klone)
  kicker: "Your AI companion",
  headline: { lead: "Meet Klo,", accent: "always one question away." },
  sub: "Klo is your family’s AI companion. It watches every stream, answers from your own records and nudges you when something needs you, so nothing important lives only in your head.",
  rules: [
    { icon: "check", title: "Answers only from your records", body: "No guessing and no internet trivia, just what’s in your twin." },
    { icon: "eye", title: "Shows its source every time", body: "Each answer tells you exactly where it came from." },
    { icon: "shield", title: "Never a diagnosis or financial advice", body: "Klo shares information, then points you to the right person." },
  ] satisfies Rule[],
  tryLabel: "Try asking",

  // DRAFT: v9 has no chat copy (its sample questions were filled in by a script that isn't in the file).
  // Facts come from v9's calendar and problem sections. Confirm wording with the client.
  phone: {
    title: "Klo",
    status: "Face ID protected", // v9 hero trust line
    thinking: "Thinking…",
    // One exchange per rule, in the same order: exchange i lights up rule i
    exchanges: [
      {
        q: "When does Leo’s passport need renewing?",
        a: "By Oct 20. I’ll nudge you early enough to act.",
        source: "Leo’s passport",
      },
      {
        q: "When does our home insurance renew?",
        a: "Your home policy renews on Nov 14.",
        source: "Home insurance policy",
      },
      {
        q: "Is Nana’s blood pressure okay?",
        a: "Her last reading was 141/88. I can’t give a diagnosis, so it’s worth asking her cardiologist tomorrow at 9:30 AM.",
        source: "Nana’s readings",
      },
    ] satisfies Exchange[],
    step: 7, // seconds per exchange
  },
  // DRAFT: a morning nudge. Klo's answer streams in word by word, and the family calendar it came
  // from draws in underneath with the dates it mentioned lit. Facts and dates from v9's calendar.
  nudge: {
    klo: "Good morning. Your Global Entry interview is on Oct 8 at SFO.",
    you: "Thanks. Anything else coming up?",
    answer: "Leo’s flu shot is Oct 1 at 4:30 PM, and his passport needs renewing by Oct 20.",
    source: "Family calendar",
    dates: [
      { day: "Oct 1", label: "Flu shot", mark: true },
      { day: "Oct 8", label: "Global Entry" },
      { day: "Oct 20", label: "Passport", mark: true },
    ] satisfies { day: string; label: string; mark?: boolean }[],
    loop: 12, // seconds before the card plays again
  },
};
