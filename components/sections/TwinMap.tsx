import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";
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
        {/* v9 buttons; the App Store badge gets a light outline so it reads on the dark background */}
        <div className="mt-[clamp(18px,3vh,30px)] flex flex-wrap items-center justify-center gap-3.5">
          <a
            href={site.downloadUrl}
            target="_blank"
            rel="noopener"
            aria-label={twin.appStore.label}
            className="inline-flex h-14 items-center gap-2.5 rounded-full bg-[#0e0c12] pl-[18px] pr-[22px] text-bg ring-1 ring-white/25 transition-transform hover:-translate-y-px"
          >
            <Icon name="apple" className="size-6 shrink-0" />
            <span className="flex flex-col text-left leading-[1.05]">
              <small className="text-[10.5px] font-medium opacity-80">{twin.appStore.small}</small>
              <b className="text-[20px] font-semibold tracking-[-0.02em]">{twin.appStore.big}</b>
            </span>
          </a>
          <a
            href={twin.explore.href}
            className="inline-flex h-[52px] items-center gap-2 rounded-[14px] border border-white/10 bg-paper px-5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-px"
          >
            {twin.explore.label}
            <Icon name="arrow" className="size-[17px] shrink-0" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
