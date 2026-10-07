import { klo } from "@/content/klo";

// Placeholder for section 3 (Meet Klo) so the sections around it can be reviewed in context.
// Replace with the chosen design once the client sends the reference.
export default function MeetKlo() {
  return (
    <section
      id="klone"
      aria-labelledby="klone-h"
      className="relative flex min-h-[100svh] flex-col items-center justify-center bg-bg px-[var(--gut)] py-24 text-center"
    >
      <span className="rounded-full border border-dashed border-muted/40 px-3 py-1 text-[12px] font-medium tracking-wide text-muted">
        Section 3 · placeholder
      </span>
      <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{klo.kicker}</p>
      <h2
        id="klone-h"
        className="mt-3 max-w-[900px] text-balance text-[clamp(32px,4.4vw,64px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
      >
        {klo.headline.lead} {klo.headline.accent}
      </h2>
      <p className="mt-4 max-w-[620px] text-balance text-[15px] font-medium leading-[1.55] text-muted sm:text-[17px]">
        {klo.sub}
      </p>
    </section>
  );
}
