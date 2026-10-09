import type { IconName } from "@/components/ui/Icon";

export type ScreenKey =
  | "auth"
  | "chat"
  | "travel"
  | "goals"
  | "hobbies"
  | "vault"
  | "calendar"
  | "chores"
  | "memories"
  | "emergency";

export type FeatureStep = {
  title: string;
  body: string;
  /** Number and progress colour for this step */
  color: string;
  /** The phone screens that show this step, in order */
  screens: ScreenKey[];
};

/** Members of the prototype's sample household (the Carters of Oakland) */
export type Member = "M" | "D" | "A" | "L" | "G";

export const people: Record<Member, { name: string; short: string; color: string }> = {
  M: { name: "Maya", short: "Maya", color: "#7b3fe4" },
  D: { name: "Daniel", short: "Daniel", color: "#138a72" },
  A: { name: "Ava", short: "Ava", color: "#e0569b" },
  L: { name: "Leo", short: "Leo", color: "#2f7ae5" },
  G: { name: "Nana Grace", short: "Grace", color: "#d9822b" },
};

export const features = {
  // Heading, subheading and the four cards from the client (2026-10-09)
  headline: { lead: "Simple to start,", accent: "easy to manage." },
  sub: "Add, track and find everything across your health, wealth, travel, hobbies, family, and documents.",
  steps: [
    { title: "Sign in your way", body: "Create your account with Apple, Google or email", color: "#7b3fe4", screens: ["auth"] },
    { title: "Just ask Klonie", body: "Ask in chat to find anything stored in KloneME", color: "#8a5a05", screens: ["chat"] },
    {
      title: "Track what you care about",
      body: "Trip maps and deadlines, savings goals and hobby progress",
      color: "#0a7a55",
      screens: ["travel", "goals", "hobbies", "vault"],
    },
    {
      title: "Run the family together",
      body: "Shared calendar, chores leaderboard, family memories and one-press emergency share",
      color: "#c2356b",
      screens: ["calendar", "chores", "memories", "emergency"],
    },
  ] satisfies FeatureStep[],

  // Each screen's name (the chips under the step) and the glow behind the phone
  screens: {
    auth: { label: "Sign in", glow: "#c9a8ff" },
    chat: { label: "Chat", glow: "#ffd46b" },
    travel: { label: "Travel", glow: "#ffd400" },
    goals: { label: "Savings & goals", glow: "#00e5a0" },
    hobbies: { label: "Hobbies", glow: "#ff8a3d" },
    vault: { label: "Vault", glow: "#ff8fb8" },
    calendar: { label: "Calendar", glow: "#b59bff" },
    chores: { label: "Chores", glow: "#ffb27a" },
    memories: { label: "Memories", glow: "#ff9ac1" },
    emergency: { label: "Emergency share", glow: "#ff8a7a" },
  } satisfies Record<ScreenKey, { label: string; glow: string }>,

  // ---------------------------------------------------------------------------------------------
  // The phone screens, picked from the client's prototype (kloneme-prototype.html) with its copy and
  // sample data. The prototype calls the companion "Klone"; it is "Klonie" here, as in the client's
  // newer copy. Brand spelling follows the site (KloneME).
  // ---------------------------------------------------------------------------------------------
  phone: {
    label: "KloneME app screens",

    auth: {
      title: "Meet Klonie.",
      accent: "Your life’s best friend.",
      body: "One private home for your family’s trips, money, health, memories and documents.",
      apple: "Continue with Apple",
      google: "Continue with Google",
      email: "Continue with email",
      member: "Already a member?",
      faceId: "Sign in with Face ID",
    },

    chat: {
      name: "Klonie",
      tagline: "Your KloneME companion",
      status: "Ask me about your trips, hobbies or money",
      thinking: "Thinking…",
      answered: "3 things coming up",
      question: "What’s due before Morocco?",
      intro: "Here’s what’s coming up:",
      items: [
        { title: "Renew Leo’s passport", due: "20 Oct" },
        { title: "Global Entry interview", due: "8 Oct" },
        { title: "Morocco — entry requirements", due: "1 Jan" },
      ],
      outro: { lead: "The most urgent is", strong: "Leo’s passport", rest: ". It expires 14 Dec, before the Morocco trip." },
      sources: ["Travel prep", "Family vault"],
      open: "Open travel prep",
      suggestions: ["How many countries have we visited?", "How am I doing on watercolor?", "Plan my week for hobbies"],
      placeholder: "Ask Klonie anything…",
    },

    travel: {
      title: "TRAVEL",
      sub: "Plan. Share. Celebrate.",
      seg: ["My Travel", "Family Travel"],
      legend: { visited: "Visited", count: "· 12 countries", bucket: "Bucket list", tap: "Tap a pin" },
      hero: { name: "Kyoto", at: [558.7, 128.7] as [number, number] },
      home: [85.4, 123.3] as [number, number],
      // Visited places and the bucket list, as map coordinates (the prototype's projection, 660 × 300)
      visited: [
        [269.6, 63.2],
        [336.6, 117.6],
        [149.5, 155.9],
        [293.1, 121.5],
        [98, 95.2],
        [174.2, 117.5],
        [314.1, 100.4],
        [313.8, 116.1],
        [336.3, 97.7],
        [520.8, 205],
        [587.1, 250.7],
      ] as [number, number][],
      bucket: [
        [356.5, 126],
        [344.6, 47.5],
        [373.7, 121.6],
        [176.8, 213.3],
        [444.1, 185.3],
      ] as [number, number][],
      counters: [
        { name: "Countries visited", value: 12, of: 20 },
        { name: "Trips in 2026", value: 4, of: 6 },
        { name: "Local this year", value: 3, of: 5 },
      ],
      track: {
        name: "Trips taken",
        value: 4,
        of: 6,
        nextLabel: "Next milestone",
        next: "Big Sur · 14 Nov",
      },
    },

    goals: {
      back: "Wealth",
      title: "Savings & goals",
      sub: { lead: "4 goals ·", money: "$89,700", rest: "saved" },
      ring: { value: "$89.7K", pct: 48 },
      overall: "Overall progress",
      summary: "2 on track · 1 behind · 1 just started",
      add: "Add money",
      list: [
        { name: "Emergency fund", icon: "shield", color: "#00e5a0", saved: "$31,000", target: "$36,000", pct: 86, due: "Dec 2026", state: "ok", status: "On track · 5.2 months saved" },
        { name: "Morocco trip", icon: "plane", color: "#ffd400", saved: "$6,200", target: "$9,000", pct: 69, due: "Mar 2027", state: "ok", status: "On track for March" },
        { name: "Ava’s college fund", icon: "grad", color: "#d4b168", saved: "$48,500", target: "$120,000", pct: 40, due: "Sep 2032", state: "bad", status: "Behind · +$250/mo to catch up" },
        { name: "New family car", icon: "car", color: "#9ae6c7", saved: "$4,000", target: "$21,000", pct: 19, due: "2028", state: "new", status: "Just started" },
      ] satisfies { name: string; icon: IconName; color: string; saved: string; target: string; pct: number; due: string; state: "ok" | "bad" | "new"; status: string }[],
    },

    hobbies: {
      title: "HOBBIES",
      sub: "Create. Learn. Engage.",
      overall: { pct: "61%", label: "overall" },
      // Rings, outside in: radius (of 170), share done, colour
      rings: [
        { name: "Creative", r: 72, pct: 0.6, color: "#ffffff" },
        { name: "Upskilling", r: 56, pct: 0.72, color: "#ffe0c7" },
        { name: "Community", r: 40, pct: 0.45, color: "#7a2e0b" },
      ],
      categoriesLabel: "Categories",
      add: "Add hobby",
      categories: [
        { name: "Creative", line: "Painting, writing and making", count: "2 hobbies", icon: "brush", bg: "#fff1e6", fg: "#ff7a2f" },
        { name: "Upskilling", line: "Time you put into new skills", count: "2 hobbies", icon: "grad", bg: "#eaf2ff", fg: "#3867d6" },
        { name: "Milestones", line: "Targets and dates you set", count: "3 next", icon: "trophy", bg: "#fff6d6", fg: "#b98100" },
        { name: "Engagement", line: "Local clubs and events", count: "4 nearby", icon: "users", bg: "#e8f7ef", fg: "#1f9d6b" },
      ] satisfies { name: string; line: string; count: string; icon: IconName; bg: string; fg: string }[],
    },

    vault: {
      title: "VAULT",
      sub: "Store. Share. Protect.",
      lock: "Unlocked with Face ID · locks in 5 min",
      seg: ["My vault", "Family vault"],
      owner: "Maya · 6 documents",
      cats: ["All · 6", "IDs", "Health", "Legal", "Wealth"],
      held: "Held",
      docs: [
        { name: "Passport", line: "Valid to Mar 2031", icon: "doc", from: "#6a5cff", to: "#3a2bd1" },
        { name: "Driver’s license", line: "Expires Jun 2028", icon: "car", from: "#ff8f6b", to: "#e0456a" },
        { name: "Health insurance card", line: "Evergreen PPO", icon: "heart", from: "#22c3ff", to: "#0b62c4" },
        { name: "Home deed", line: "Oakland · joint with Daniel", icon: "home", from: "#34c38f", to: "#0f6b45" },
        { name: "Will & trust", line: "Updated Feb 2025", icon: "shield", from: "#b59bff", to: "#6a2fe0" },
        { name: "Tax return 2025", line: "Filed Apr 2026", icon: "dollar", from: "#f5c26b", to: "#c98a12" },
      ] satisfies { name: string; line: string; icon: IconName; from: string; to: string }[],
    },

    calendar: {
      back: "Home",
      eyebrow: "Everything, one calendar",
      month: "September",
      // September 2026 starts on a Tuesday; Monday-first grid
      lead: 1,
      days: 30,
      today: 21,
      dow: ["M", "T", "W", "T", "F", "S", "S"],
      filters: [
        { name: "All", color: "" },
        { name: "Family", color: "#7b3fe4" },
        { name: "Travel", color: "#e6b800" },
        { name: "Hobbies", color: "#ff7a2f" },
        { name: "Wealth", color: "#0a9a6c" },
        { name: "Health", color: "#0aa8d9" },
      ],
      // Day of the month → colours of the streams with events that day
      dots: {
        21: ["#7b3fe4", "#ff7a2f"],
        22: ["#0aa8d9"],
        23: ["#ff7a2f"],
        24: ["#0a9a6c", "#ff7a2f"],
        25: ["#7b3fe4"],
        26: ["#ff7a2f", "#7b3fe4"],
        28: ["#0aa8d9"],
        30: ["#0a9a6c"],
      } as Record<number, string[]>,
      day: "Today",
      count: "2 plans",
      agenda: [
        { time: "4:00", ampm: "pm", name: "Leo’s soccer practice", stream: "Family", color: "#7b3fe4", icon: "run", who: ["L", "D"] },
        { time: "7:00", ampm: "pm", name: "Watercolor club", stream: "Hobbies", color: "#ff7a2f", icon: "brush", who: ["M"] },
      ] satisfies { time: string; ampm: string; name: string; stream: string; color: string; icon: IconName; who: Member[] }[],
    },

    chores: {
      back: "Family",
      title: "Chores",
      sub: "This week’s leaderboard",
      // Podium, left to right: 2nd, 1st, 3rd
      podium: [
        { who: "M", points: 120, height: 120, from: "#b59bff", to: "#7b3fe4" },
        { who: "A", points: 140, height: 160, from: "#ffd46b", to: "#ff9a3d", crown: true },
        { who: "D", points: 95, height: 90, from: "#ff9ac1", to: "#e0457f" },
      ] satisfies { who: Member; points: number; height: number; from: string; to: string; crown?: boolean }[],
      tabs: ["To do", "Done"],
      list: [
        { name: "Walk Biscuit", who: "A", due: "Today 6 pm", points: 10, icon: "heart", color: "#e0457f" },
        { name: "Unload the dishwasher", who: "L", due: "Today", points: 5, icon: "home", color: "#0aa8d9" },
        { name: "Water the tomatoes", who: "A", due: "Tomorrow", points: 5, icon: "spark", color: "#1f9d6b" },
        { name: "Clean out the garage", who: "D", due: "3 days overdue", late: true, points: 25, icon: "car", color: "#e2483d" },
      ] satisfies { name: string; who: Member; due: string; late?: boolean; points: number; icon: IconName; color: string }[],
    },

    memories: {
      back: "Family",
      title: "Memories",
      sub: "126 moments · shared with the family",
      story: { img: "/app/proto/reykjavik.jpg", eyebrow: "On this day · 2025", title: "Planning Iceland", line: "Tap to play the story" },
      tabs: ["All", "Trips", "Art", "Milestones"],
      // Two columns of the masonry, as in the prototype
      columns: [
        [
          { img: "/app/proto/reykjavik.jpg", title: "Midnight sun, Iceland", when: "Jun 2026", who: ["M", "D", "A", "L"], h: 220 },
          { img: "/app/proto/kyoto.jpg", title: "Blossoms in Kyoto", when: "Apr 2025", who: ["M", "D", "A", "L"], h: 170 },
        ],
        [
          { img: "/app/proto/wc-taj.jpg", title: "Maya’s Taj Mahal", when: "Sep 2026", who: ["M"], h: 160 },
          { img: "/app/proto/tulum.jpg", title: "Christmas cenotes", when: "Dec 2025", who: ["A", "L"], h: 200 },
        ],
      ] satisfies { img: string; title: string; when: string; who: Member[]; h: number }[][],
    },

    emergency: {
      back: "Back",
      title: "Emergency share",
      sub: "One press sends the essentials to the people you trust.",
      whatLabel: "What gets shared",
      docs: [
        { name: "IDs & passports", line: "5 documents", icon: "doc", on: true },
        { name: "Health records", line: "Allergies · meds", icon: "heart", on: true },
        { name: "Insurance", line: "Health · home · auto", icon: "shield", on: true },
        { name: "Legal", line: "Will · power of attorney", icon: "home", on: false },
        { name: "Wealth", line: "Accounts summary", icon: "dollar", on: false },
        { name: "Travel", line: "Itineraries", icon: "plane", on: false },
      ] satisfies { name: string; line: string; icon: IconName; on: boolean }[],
      whoLabel: "Who receives it",
      expires: "Access expires after 72 hours",
      who: [
        { who: "D", name: "Daniel", role: "Partner" },
        { who: "G", name: "Nana Grace", role: "Mother" },
        { who: null, initials: "AP", name: "Dr. Anil Patel", role: "Family doctor" },
      ] as { who: Member | null; initials?: string; name: string; role: string }[],
      add: "+ Add",
      hold: "Hold to send",
      note: "Press and hold for 2 seconds. Klonie also calls your first contact.",
      sent: "Emergency share sent",
      sentBody: "Daniel, Nana Grace and Dr. Patel can now see the documents you chose, until Thursday 7:40 pm.",
      delivered: "Delivered",
      stop: "Stop sharing now",
    },
  },
};
