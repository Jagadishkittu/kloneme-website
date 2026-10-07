# KloneMe Website — Project Rules

## 1. Project overview
KloneMe is an AI-powered **LifeOS** app: one organised place for the important parts of your life, with an AI that helps look after them for you.

- People keep their lives scattered across phone galleries, emails, notes and cloud folders, and the things that matter most are the easiest to lose track of. Example: a passport is valid for ten years, which is exactly why nobody remembers to renew it until it is almost too late. KloneMe makes sure the right thing reaches you at the right time instead of depending on your memory.
- **Klo** is the in-app AI companion that helps you manage it all.
- It is **not just storage** like Google Drive (which holds files and leaves the rest to you). KloneMe actively works for you, and helps you think about what happens to your important information over the long term, including your **digital legacy**.
- Live on the **Play Store**. Flagship product of **Haplet LLC**.

Goal of this repo: a working marketing website for KloneMe.

## 2. Content source of truth
- `kloneme-website-v9.html` is the **content** of the website: copy, headings, section order, stream names, FAQ, contact text, and the SVG icon set (`<symbol id="i-…">`).
- Reuse its copy verbatim. Do not invent product claims, features, stats or testimonials. Edit copy only when the user asks.
- The v9 file is **read-only reference**. Never edit, move or delete it.
- Brand spelling: the source uses `KloneME`; the product description uses `KloneMe`. Use `KloneME` as in the source until the user decides otherwise.

## 3. Section map (source order)
| # | Section | Source id / class |
|---|---------|-------------------|
| 1 | Nav / header (with Streams dropdown, mobile menu) | `header.nav` |
| 2 | Top hero + app demo phone | `section.top9` |
| 3 | Twin map: "One twin for every part of life." | `#twin` |
| 4 | Meet Klo: "always one question away." | `#klone` |
| 5 | Problem: "Your family has loose ends everywhere." | `#problem` |
| 6 | Six streams. One twin. | `#streams` |
| 7 | Calendar | `#calendar` |
| 8 | Privacy (vault, approvals, Stealth Mode) | `#privacy` |
| 9 | Emergency: "When it matters most, one press." | `#emergency` |
| 10 | How it works | `#how` |
| 11 | Stories | `#stories` |
| 12 | FAQ | `#faq` |
| 13 | Contact | `#contact` |
| 14 | Closing CTA | `#get` |
| 15 | Footer | `footer` |

## 4. Workflow: reference → 3 options → selection → build
This is the core rule for every section.

1. The user gives a **design reference** (image, URL or description) for a specific section.
2. Claude replies with **exactly three options** as **written descriptions only — no code**. Each option states:
   - **Name** (short label, e.g. "Option A — Split Spotlight")
   - **Layout** (desktop structure)
   - **Typography & colour** (using the project tokens)
   - **Motion & interaction**
   - **Mobile behaviour**
   - **How it uses the reference**
   The three options must be clearly different from each other, not minor variations.
3. Claude **stops and waits** for the user to pick. Nothing is implemented before a selection.
4. Claude implements **only the selected option**, **only for that section**. Other sections are not restyled.
5. After building, Claude gives a short summary and how to view it (`npm run dev` → `http://localhost:3000/#<section-id>`).
6. Claude appends an entry to `DESIGN_DECISIONS.md`: date · section · reference · chosen option · one-line summary.

If a reference is unclear or does not say which section it is for, ask before proposing options.

**The user does all checking and QA.** Don't run screenshot reviews, review agents/workflows, or your own visual checks of alignment/layout. Implement the change, keep the dev server running so the user can look, hand back, and wait for their feedback. Apply feedback exactly as given.

## 5. Tech stack & conventions
- **Next.js** (App Router, TypeScript) + **Tailwind CSS**.
- Structure:
  - `app/page.tsx` composes sections in source order.
  - `components/sections/` — one component per section (`Header.tsx`, `Hero.tsx`, `TwinMap.tsx`, `MeetKlo.tsx`, `Problem.tsx`, `Streams.tsx`, `Calendar.tsx`, `Privacy.tsx`, `Emergency.tsx`, `HowItWorks.tsx`, `Stories.tsx`, `Faq.tsx`, `Contact.tsx`, `Closing.tsx`, `Footer.tsx`).
  - `components/ui/` — shared pieces (`Icon`, buttons, etc.).
  - `content/` — typed content objects extracted from v9. Components read from here; copy is not scattered across components.
- **Brand palette (client-approved, use these)** — defined in `app/globals.css` and exposed to Tailwind as `bg-bg`, `text-ink`, `bg-accent`, `text-muted`:
  | Token | Hex | Use |
  |-------|-----|-----|
  | `--bg` | `#FAF8F6` | Page / section backgrounds |
  | `--ink` | `#17141D` | Text and buttons |
  | `--accent` | `#F5B31F` | Accent (underlines, rings, highlights, mic button) |
  | `--muted` | `#7A7382` | Secondary text |
  Rule of thumb: **light backgrounds, dark buttons, dark text** in most cases. The v9 stream colours (sky / berry / coral / lime / lagoon / lilac) stay available for illustration (aurora band, chip icons). Light mode only for now.
- **Icons**: `components/ui/Icon.tsx` (v9 `<symbol>` set + a few UI glyphs).
- **Fonts**: **Poppins** via `next/font/google` (weights 400–700), exposed as `font-sans`.
- **App screens**: the client's KME app screenshots are the reference for any in-phone UI (rebuilt in code; see `components/sections/hero/PhoneDemo.tsx`).
- **CSS**: Tailwind for layout/utilities; complex art and keyframes go in a co-located CSS module (`*.module.css`). `next.config.ts` runs the Tailwind loader on global CSS only — keep it that way or CSS modules break.
- **Responsive** from 360px up; no horizontal scroll.
- **Accessibility**: semantic landmarks, keep v9's aria labels, keyboard-usable interactions, respect `prefers-reduced-motion`.
- **Store links**: Play Store is live; the client will send the link. Until then every download button and the QR code use `site.downloadUrl` in `content/site.ts` (placeholder) — change it there only.
- **Running locally**: `npm run dev` → http://localhost:3000. `npm run build` must pass before handing work back.

## 6. Don'ts
- Don't build sections or features the user hasn't asked for.
- Don't use lorem ipsum or invented copy.
- Don't add dependencies without a clear reason (state it when you do).
- Don't change a section's chosen design beyond what was selected; propose changes instead.
- Don't modify `kloneme-website-v9.html`.
