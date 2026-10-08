import type { IconName } from "@/components/ui/Icon";

export type EmergencyStep = { title: string; body: string };
export type EmergencyDoc = { icon: IconName; name: string; detail: string; on: boolean };
export type EmergencyPerson = { initial: string; name: string; role: string; color: string };

export const emergency = {
  // Copy from kloneme-website-v9.html (#emergency)
  kicker: "Emergency share",
  headline: { lead: "When it matters most,", accent: "one press." },
  sub: "Choose ahead of time what gets shared and who receives it. Press and hold, and the people you trust can see your IDs, health records and insurance cards for 72 hours.",
  steps: [
    { title: "Documents shared", body: "IDs, health records, insurance cards" },
    { title: "Your people are notified", body: "Daniel, Nana Grace and Dr. Anil" },
    { title: "Klo calls your first contact", body: "Daniel, straight away" },
    { title: "Access ends on its own", body: "After 72 hours, or the moment you stop it" },
  ] satisfies EmergencyStep[],
  tryIt: "Try it on the phone: pick what to share, then hold the red button for 2 seconds. This demo sends nothing.",

  // The in-app Emergency share screen (v9)
  phone: {
    label: "Emergency share demo",
    back: "Back",
    title: "Emergency share",
    intro: "One press sends the essentials to the people you trust.",
    whatLabel: "What gets shared",
    docs: [
      { icon: "doc", name: "IDs & passports", detail: "5 documents", on: true },
      { icon: "heart", name: "Health records", detail: "Allergies · meds", on: true },
      { icon: "shield", name: "Insurance", detail: "Health · home · auto", on: true },
      { icon: "home", name: "Legal", detail: "Will · power of attorney", on: false },
      { icon: "dollar", name: "Wealth", detail: "Accounts summary", on: false },
      { icon: "plane", name: "Travel", detail: "Itineraries", on: false },
    ] satisfies EmergencyDoc[],
    whoLabel: "Who receives it",
    expires: "Access expires after 72 hours",
    people: [
      { initial: "D", name: "Daniel", role: "Partner", color: "#138A72" },
      { initial: "N", name: "Nana Grace", role: "Mother", color: "#D98A2B" },
      { initial: "AP", name: "Dr. Anil", role: "Family doctor", color: "#2EA3D8" },
    ] satisfies EmergencyPerson[],
    hold: "Hold to send",
    holdNote: "Press and hold for 2 seconds. Klo also calls your first contact.",
    holdMs: 2000,
    island: { title: "Sharing is on", small: "3 people can see it", hours: 72 },
    sent: {
      title: "Emergency share sent",
      body: "Daniel, Nana Grace and Dr. Anil can see your IDs, health records and insurance until Thursday at 7:40 PM.",
      calling: "Klo is calling Daniel",
      callingRole: "First contact",
      stop: "Stop sharing now",
    },
    stopped: "Emergency share stopped. Access removed for everyone.",
  },
};
