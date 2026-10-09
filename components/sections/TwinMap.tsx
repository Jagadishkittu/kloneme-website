import { twin } from "@/content/twin";
import Beam from "./twin/Beam";
import KloCarousel from "./twin/KloCarousel";
import s from "./twin/twin.module.css";

export default function TwinMap() {
  return (
    <section id="twin" className={s.twin} aria-labelledby="twin-h">
      <div className={s.horizon} aria-hidden="true">
        <span className={s.horizonGlow} />
        <span className={s.horizonRim} />
        <span className={s.horizonBody} />
        <span className={s.horizonFill} />
      </div>
      <Beam />
      <span className={s.flare} aria-hidden="true" />

      <div className={s.stage}>
        <div className={s.spot} aria-hidden="true" />
        <KloCarousel />
      </div>

      <div className={s.copy}>
        <h2
          id="twin-h"
          className="text-[clamp(32px,min(5vw,7.6vh),80px)] font-semibold leading-[1.04] tracking-[-0.035em]"
        >
          <span className="block text-bg/45">{twin.headline.lead}</span>
          <span className="block text-bg">{twin.headline.accent}</span>
        </h2>
        <p className="mt-[clamp(12px,2vh,20px)] max-w-[760px] text-balance text-[15px] font-medium leading-[1.55] text-bg/55 sm:text-[clamp(16px,2.1vh,19px)]">
          {twin.sub}
        </p>
      </div>
    </section>
  );
}
