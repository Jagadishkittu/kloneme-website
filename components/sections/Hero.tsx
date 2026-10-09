import { Icon } from "@/components/ui/Icon";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { hero } from "@/content/hero";
import Flow from "./hero/Flow";
import HeroStage from "./hero/HeroStage";
import LightLines from "./hero/LightLines";
import PhoneDemo from "./hero/PhoneDemo";
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
        <p className="mt-4 max-w-[560px] text-balance text-[15px] font-medium leading-[1.55] text-muted sm:text-[17px] md:max-w-[800px]">
          {hero.sub}
        </p>
        <StoreButtons className="mt-6 justify-center" />
        <p className="mt-4 max-w-[300px] text-[13px] font-medium leading-snug text-muted sm:max-w-none">
          <Icon name="shield" className="mr-1.5 inline-block size-4 -translate-y-px align-middle text-accent" strokeWidth={2} />
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
    </HeroStage>
  );
}
