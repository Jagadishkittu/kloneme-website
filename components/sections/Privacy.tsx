import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { privacy, type PrivacyFeature } from "@/content/privacy";
import { streams } from "@/content/streams";
import Bento from "./privacy/Bento";
import FaceScan from "./privacy/FaceScan";
import s from "./privacy/privacy.module.css";
import { AccessRequest, ActivityFeed, SharedNow, StealthToggle, VaultLock } from "./privacy/Widgets";

const F = privacy.features;

function Head({ f, icon }: { f: PrivacyFeature; icon?: ReactNode }) {
  return (
    <header className={s.fHead}>
      {icon ?? (
        <span className={s.fIcon}>
          <Icon name={f.icon} strokeWidth={1.9} />
        </span>
      )}
      <h3>{f.name}</h3>
      <p>{f.line}</p>
    </header>
  );
}

// One card of the bento: a privacy feature (v9 tile) with the in-app sample that shows it
function Feature({ f, className, icon, children }: { f: PrivacyFeature; className: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <article className={`${s.card} ${s.feature} ${className}`} data-glow style={{ "--c": f.color } as CSSProperties}>
      <span className={s.haze} aria-hidden="true" />
      <Head f={f} icon={icon} />
      <div className={s.demo}>{children}</div>
    </article>
  );
}

// An eye that follows the pointer (Bento sets --ex/--ey) and blinks now and then
function WatchEye() {
  return (
    <span className={`${s.fIcon} ${s.eye}`} data-eye aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <g className={s.lid}>
          <path d="M2.5 12c.6-2.5 4.5-7 9.5-7s8.9 4.5 9.5 7c-.6 2.5-4.5 7-9.5 7s-8.9-4.5-9.5-7z" />
          <g className={s.iris}>
            <circle cx="12" cy="12" r="3.3" />
            <circle className={s.pupil} cx="12" cy="12" r="1.4" />
          </g>
        </g>
      </svg>
    </span>
  );
}

export default function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-h" className={`${s.section} px-[var(--gut)] py-[clamp(96px,14vh,160px)]`}>
      {/* Transition from the dark Calendar section: a light sheet whose rounded top corners flatten as it scrolls in */}
      <span className={s.backing} aria-hidden="true" />
      <span className={s.sheet} aria-hidden="true" />

      <Bento>
        {/* Intro card, with a big padlock whose shackle clicks shut as the section arrives */}
        <div className={`${s.card} ${s.intro}`} data-glow>
          <svg className={s.bigLock} viewBox="0 0 120 140" aria-hidden="true">
            <path className={s.bigShackle} d="M32 64V42a28 28 0 0156 0v22" />
            <rect x="14" y="62" width="92" height="74" rx="20" />
            <circle cx="60" cy="94" r="8" />
            <path d="M60 102v13" />
          </svg>
          <p className={s.kicker}>
            <span className={s.dots} aria-hidden="true">
              {streams.cards.map((c) => (
                <i key={c.key} style={{ background: c.color }} />
              ))}
            </span>
            {privacy.kicker}
          </p>
          <h2 id="privacy-h" className={s.h2}>
            {privacy.headline.lead} <span className={s.accent}>{privacy.headline.accent}</span>
          </h2>
          <p className={s.sub}>{privacy.sub}</p>
          <span className={s.legend} aria-hidden="true">
            {Object.values(F).map((f) => (
              <span key={f.name} style={{ "--c": f.color } as CSSProperties}>
                <Icon name={f.icon} strokeWidth={1.9} />
              </span>
            ))}
          </span>
        </div>

        {/* Face ID: the scanner fills the top right; the vault and Daniel's request below */}
        <article
          className={`${s.card} ${s.feature} ${s.faceId}`}
          data-glow
          style={{ "--c": F.faceId.color } as CSSProperties}
        >
          <span className={s.haze} aria-hidden="true" />
          <div className={s.faceGrid}>
            <Head f={F.faceId} />
            <FaceScan />
            <div className={s.faceVault}>
              <VaultLock />
            </div>
            <div className={s.faceReq}>
              <AccessRequest />
            </div>
          </div>
        </article>

        <Feature f={F.shares} className={s.shares}>
          <SharedNow />
        </Feature>

        <Feature f={F.views} className={s.views} icon={<WatchEye />}>
          <ActivityFeed />
        </Feature>

        <Feature f={F.stealth} className={s.stealth}>
          <StealthToggle />
        </Feature>
      </Bento>
    </section>
  );
}
