import { klo } from "@/content/klo";
import StatWheel from "./klo/StatWheel";
import s from "./klo/klo.module.css";

export default function MeetKlo() {
  return (
    <section
      id="klone"
      aria-labelledby="klone-h"
      className={`${s.section} px-[var(--gut)] pb-[clamp(72px,11vh,128px)] pt-[clamp(40px,6vh,72px)]`}
    >
      {/* Transition from the dark Twin section: a light sheet whose rounded top corners flatten as it scrolls in */}
      <span className={s.backing} aria-hidden="true" />
      <span className={s.sheet} aria-hidden="true" />

      <div className="mx-auto max-w-[1180px]">
        {/* The heading sits in the wheel's pinned view, centred at the top */}
        <StatWheel />
        <p className="mx-auto mt-[clamp(44px,7vh,80px)] max-w-[780px] text-balance text-center text-[clamp(19px,1.7vw,26px)] font-medium leading-[1.4] tracking-[-0.015em]">
          <span className="text-ink">{klo.closing.lead}</span> <span className="text-muted">{klo.closing.rest}</span>
        </p>
      </div>
    </section>
  );
}
