import { Icon } from "@/components/ui/Icon";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import Flow from "./hero/Flow";
import HeroStage from "./hero/HeroStage";
import LightLines from "./hero/LightLines";
import PhoneDemo from "./hero/PhoneDemo";
import QrCard from "./hero/QrCard";
import s from "./hero/hero.module.css";

export default function Hero() {
  return (
    <HeroStage labelledBy="hero-h">
      <div className={s.sky} aria-hidden="true" />

      <div className={s.copy}>
        <h1
          id="hero-h"
          className="text-[clamp(42px,min(5.8vw,10.4vh),96px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          {hero.headline.lead}
          <br />
          {hero.headline.accent}
        </h1>
        <p className="mt-4 max-w-[560px] text-balance text-[15px] font-medium leading-[1.55] text-muted sm:text-[17px]">
          {hero.sub}
        </p>
        <a
          href={site.downloadUrl}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex h-[52px] items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-semibold text-bg shadow-[0_14px_30px_-14px_rgba(23,20,29,0.6)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Icon name="download" className="size-[18px]" strokeWidth={2} />
          {hero.cta}
        </a>
        <p className="mt-4 max-w-[300px] text-[13px] font-medium leading-snug text-muted sm:max-w-none">
          <Icon name="face" className="mr-1.5 inline-block size-4 -translate-y-px align-middle text-accent" strokeWidth={2} />
          {hero.note}
        </p>
      </div>

      <div className={s.stage}>
        <LightLines />
        <div className={s.glow} aria-hidden="true" />
        <Flow />
        <div className={s.fog} aria-hidden="true" />
        <div className={s.phoneWrap}>
          <div className={s.phoneFloat}>
            <div className={s.phoneTilt}>
              <PhoneDemo />
            </div>
          </div>
        </div>
      </div>

      <QrCard />
    </HeroStage>
  );
}
