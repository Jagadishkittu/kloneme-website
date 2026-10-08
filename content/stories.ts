import { emergency } from "@/content/emergency";
import { privacy } from "@/content/privacy";

export const stories = {
  // Copy from kloneme-website-v9.html (#stories)
  kicker: "Stories",
  headline: { lead: "What changes when it’s", accent: "all in one place." },
  sub: "Families spread across cities and countries, and the moments KloneME made easier.",
  note: "Illustrative stories written for the KloneME prototype. Names and details are placeholders until real customer reviews are added.",
  label: "Stories", // v9 aria-label

  // v9's story row is empty (no quotes in the file), so the cards show moments from the sample
  // household that already appear on the site (Privacy and Emergency share), each with the in-app
  // action that resolves it. Swap in real reviews when the client sends them.
  moments: {
    stealth: {
      label: privacy.stealth.caption,
      value: privacy.stealth.value,
      action: privacy.stealth.label,
    },
    shared: {
      label: privacy.shared.label,
      rows: privacy.shared.rows,
      revoked: privacy.shared.revoked,
      action: privacy.shared.revoke,
    },
    emergency: {
      label: emergency.phone.title,
      intro: emergency.phone.intro,
      people: emergency.phone.people,
      sent: emergency.phone.sent.title,
      calling: emergency.phone.sent.calling,
      callingRole: emergency.phone.sent.callingRole,
      action: emergency.phone.hold,
    },
    request: {
      who: privacy.request.who,
      title: privacy.request.title,
      body: privacy.request.body,
      lengthLabel: privacy.request.lengthLabel,
      lengths: privacy.request.lengths,
      preset: privacy.request.preset,
      done: privacy.request.approved(privacy.request.preset),
      action: privacy.request.approve,
    },
  },
};
