import { klo } from "@/content/klo";
import KloBento from "./klo/KloBento";
import s from "./klo/klo.module.css";

export default function MeetKlo() {
  return (
    <section
      id="klone"
      aria-labelledby="klone-h"
      className={`${s.section} px-[var(--gut)] py-[clamp(72px,11vh,128px)]`}
    >
      {/* Transition from the dark Twin section: a light sheet whose rounded top corners flatten as it scrolls in */}
      <span className={s.backing} aria-hidden="true" />
      <span className={s.sheet} aria-hidden="true" />

      <div className="mx-auto max-w-[1180px]">
        <header className={`${s.reveal} grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16`}>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{klo.kicker}</p>
            <h2
              id="klone-h"
              className="mt-3 text-balance text-[clamp(32px,4.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em]"
            >
              <span className="text-ink">{klo.headline.lead}</span> <span className="text-muted">{klo.headline.accent}</span>
            </h2>
          </div>
          <p className="max-w-[460px] text-[15px] font-medium leading-[1.6] text-muted sm:text-[17px] lg:pb-2">{klo.sub}</p>
        </header>
        <KloBento />
        <p className="mx-auto mt-[clamp(44px,7vh,80px)] max-w-[780px] text-balance text-center text-[clamp(19px,1.7vw,26px)] font-medium leading-[1.4] tracking-[-0.015em]">
          <span className="text-ink">{klo.closing.lead}</span> <span className="text-muted">{klo.closing.rest}</span>
        </p>
      </div>
    </section>
  );
}
