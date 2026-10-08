import type { CSSProperties, ReactNode } from "react";
import { privacy, type PrivacyFeature } from "@/content/privacy";
import { streams } from "@/content/streams";
import Bento from "./privacy/Bento";
import FaceScan from "./privacy/FaceScan";
import { GlassIcon, isGlyph } from "./privacy/GlassIcon";
import s from "./privacy/privacy.module.css";
import { AccessRequest, ActivityFeed, SharedNow, StealthToggle, VaultLock } from "./privacy/Widgets";

const F = privacy.features;

// A feature's glass icon; the eye follows the pointer
function FeatureIcon({ f, size }: { f: PrivacyFeature; size?: string }) {
  if (!isGlyph(f.icon)) return null;
  return <GlassIcon name={f.icon} color={f.color} size={size} follow={f.icon === "eye"} />;
}

function Head({ f }: { f: PrivacyFeature }) {
  return (
    <header className={s.fHead}>
      <FeatureIcon f={f} />
      <h3>{f.name}</h3>
      <p>{f.line}</p>
    </header>
  );
}

// One card of the bento: a privacy feature (v9 tile) with the in-app sample that shows it
function Feature({ f, className, children }: { f: PrivacyFeature; className: string; children: ReactNode }) {
  return (
    <article className={`${s.card} ${s.feature} ${className}`} data-glow style={{ "--c": f.color } as CSSProperties}>
      <span className={s.haze} aria-hidden="true" />
      <Head f={f} />
      <div className={s.demo}>{children}</div>
    </article>
  );
}

export default function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-h" className={`${s.section} px-[var(--gut)] py-[clamp(96px,14vh,160px)]`}>
      {/* Transition from the dark Calendar section: a light sheet whose rounded top corners flatten as it scrolls in */}
      <span className={s.backing} aria-hidden="true" />
      <span className={s.sheet} aria-hidden="true" />

      <Bento>
        {/* Intro card, with a big frosted-glass padlock whose shackle clicks shut as the section arrives */}
        <div className={`${s.card} ${s.intro}`} data-glow>
          <svg className={s.bigLock} viewBox="0 0 120 140" aria-hidden="true">
            <defs>
              <linearGradient id="pv-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#d8cefb" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="pv-rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#b6a4f6" />
              </linearGradient>
              <clipPath id="pv-body">
                <rect x="14" y="62" width="92" height="74" rx="20" />
              </clipPath>
            </defs>
            <g className={s.bigShackle}>
              <path d="M32 64V42a28 28 0 0156 0v22" fill="none" stroke="url(#pv-rim)" strokeWidth="14" />
              <path d="M32 64V42a28 28 0 0156 0v22" fill="none" stroke="#efeafd" strokeWidth="9.5" />
            </g>
            <rect x="14" y="62" width="92" height="74" rx="20" fill="url(#pv-glass)" />
            <g clipPath="url(#pv-body)">
              <rect className={s.bigSweep} x="-30" y="40" width="22" height="120" fill="#fff" />
            </g>
            <rect x="14.75" y="62.75" width="90.5" height="72.5" rx="19.25" fill="none" stroke="#fff" strokeWidth="1.5" />
            <rect x="21" y="69" width="78" height="60" rx="14" fill="none" stroke="rgba(132,102,235,0.18)" strokeWidth="1.2" />
            <circle cx="60" cy="94" r="8" fill="var(--lilac)" fillOpacity="0.55" />
            <path d="M60 100v13" stroke="var(--lilac)" strokeOpacity="0.55" strokeWidth="6" strokeLinecap="round" />
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
              <FeatureIcon key={f.name} f={f} size="50px" />
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

        <Feature f={F.views} className={s.views}>
          <ActivityFeed />
        </Feature>

        <Feature f={F.stealth} className={s.stealth}>
          <StealthToggle />
        </Feature>
      </Bento>
    </section>
  );
}
