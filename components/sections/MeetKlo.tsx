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

      <div className={`${s.reveal} mx-auto flex max-w-[900px] flex-col items-center text-center`}>
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{klo.kicker}</p>
        <h2
          id="klone-h"
          className="mt-3 text-balance text-[clamp(30px,3.9vw,56px)] font-semibold leading-[1.08] tracking-[-0.03em]"
        >
          <span className="text-ink">{klo.headline.lead}</span> <span className="text-muted">{klo.headline.accent}</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-balance text-[15px] font-medium leading-[1.55] text-muted sm:text-[17px]">
          {klo.sub}
        </p>
      </div>
      <KloBento />
    </section>
  );
}
