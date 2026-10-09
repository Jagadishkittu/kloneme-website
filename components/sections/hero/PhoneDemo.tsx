"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { hero } from "@/content/hero";
import p from "./phone.module.css";

const { listen, place } = hero.phone;
const WORDS = listen.quote.split(" ");

// Timeline (seconds) for one loop of the demo
const CYCLE = 12.6;
const SWITCH = 6.2; // listening → category screen
const WORD_START = 0.7;
const WORD_STEP = 0.38;
const PRESS_CONTINUE: [number, number] = [5.75, 6.15];
const SELECT_AT = 7.6;
const PRESS_YES: [number, number] = [11.85, 12.25];
const STATIC_T = 5.5; // frame shown when motion is reduced

const TILE_BG: Record<string, string> = {
  wealth: "linear-gradient(90deg, #08281e 30%, #08503a 100%)",
  travel: "linear-gradient(100deg, #0b0b0c 35%, #2a2511 100%)",
  wellness: "linear-gradient(90deg, #24bfef 30%, #4ccbf3 100%)",
  hobbies: "linear-gradient(90deg, #f56923 30%, #f9915e 100%)",
  family: "linear-gradient(90deg, #753ce8 30%, #8f5eef 100%)",
  other: "linear-gradient(90deg, #56063a 25%, #8c2560 100%)",
};

// Waveform bar heights (cqw) traced from the app screenshot
const BARS = [3.6, 5.6, 7.2, 4.4, 9.6, 12.4, 7, 13, 8.4, 5.8, 11, 7.8, 5.2, 9, 11.6, 6.4, 3.8];

const within = (t: number, [a, b]: [number, number]) => t >= a && t < b;

// Copies of the outline stacked behind the face to give the phone its thickness
const LAYERS = 16;

function KmeLogo() {
  return (
    <span className={p.logo}>
      <svg viewBox="0 0 30 22" aria-hidden="true">
        <defs>
          <linearGradient id="kme-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b18cff" />
            <stop offset="1" stopColor="#6d4df2" />
          </linearGradient>
        </defs>
        <path
          d="M2 19.5c2.6-6.2 4.9-14 8.4-14 2.5 0 3.6 3.8 4.6 7.3 1-3.5 2.1-7.3 4.6-7.3 3.5 0 5.8 7.8 8.4 14-3.3.4-5.3-1.6-6.8-4.6-1.2 2.6-3.3 4.1-6.2 4.1s-5-1.5-6.2-4.1C7.3 17.9 5.3 19.9 2 19.5z"
          fill="url(#kme-mark)"
        />
      </svg>
      kme
    </span>
  );
}

export function StatusBar() {
  return (
    <div className={p.status} aria-hidden="true">
      <span>9:41</span>
      <span className={p.statusIcons}>
        <svg viewBox="0 0 18 12">
          <rect x="0" y="8" width="3" height="4" rx="0.8" fill="currentColor" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" fill="currentColor" opacity="0.3" />
        </svg>
        <svg viewBox="0 0 16 12">
          <path d="M8 11.5l2.4-2.8a3.4 3.4 0 00-4.8 0z" fill="currentColor" />
          <path d="M3.6 6.6a6.3 6.3 0 018.8 0M1 3.8a10 10 0 0114 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 27 12">
          <rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.4" fill="none" />
          <rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor" />
          <path d="M25 4v4c.8-.3 1.4-1.1 1.4-2S25.8 4.3 25 4z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

function TopBar() {
  return (
    <div className={p.top}>
      <KmeLogo />
      <span className={p.navBtns}>
        <span className={p.navBtn}>
          <Icon name="left" strokeWidth={2} />
        </span>
        <span className={p.navBtn}>
          <Icon name="close" strokeWidth={2} />
        </span>
      </span>
    </div>
  );
}

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export default function PhoneDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, () => matchMedia(REDUCED).matches, () => false);
  const t = reduced ? STATIC_T : tick;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let inView = true;
    let elapsed = 0;
    let last = performance.now();
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    io.observe(el);

    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.25);
      last = now;
      if (!inView || document.hidden) return;
      elapsed = (elapsed + dt) % CYCLE;
      setTick(Math.round(elapsed * 20) / 20);
    }, 50);

    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [reduced]);

  const onPlace = t >= SWITCH;
  const listenState = !onPlace ? "on" : t < SWITCH + 1 ? "out" : "idle";
  const placeState = onPlace ? "on" : t < 1 ? "out" : "idle";
  const words = t < WORD_START ? 0 : Math.min(WORDS.length, Math.floor((t - WORD_START) / WORD_STEP) + 1);
  const seconds = Math.min(8, Math.floor(t * 1.45));
  const listening = !onPlace && t < PRESS_CONTINUE[0];
  const selected = t >= SELECT_AT;

  return (
    <div ref={ref} className={p.device} role="img" aria-label={`KloneME app: you say “${listen.quote}” and Klo files it as a ${place.categories[0].label} goal.`}>
      {/* The body's thickness: outlines stacked behind the face, the last one casting the shadow */}
      {Array.from({ length: LAYERS }, (_, i) => (
        <span
          key={i}
          className={`${p.layer} ${i === LAYERS - 1 ? p.layerBack : ""}`}
          style={{ "--z": i + 1, "--hi": Math.sin((Math.PI * i) / (LAYERS - 1)).toFixed(2) } as CSSProperties}
        />
      ))}
      <span className={`${p.sideBtn} ${p.sideBtnA}`} />
      <span className={`${p.sideBtn} ${p.sideBtnB}`} />
      <div className={p.face}>
        <div className={p.bezel}>
          <div className={p.screen} aria-hidden="true">
            <span className={p.notch}>
              <i className={p.earpiece} />
              <i className={p.cam} />
            </span>
            <StatusBar />

            {/* Screen 1: speak a goal */}
            <div className={`${p.scr} ${listening ? p.listening : ""}`} data-state={listenState}>
              <TopBar />
              <p className={p.eyebrow}>{listen.eyebrow}</p>
              <p className={p.title}>
                {listen.title[0]}
                <br />
                {listen.title[1]}
              </p>
              <p className={p.body}>
                <b>{listen.bodyStrong}</b>
                {listen.body}
              </p>
              <div className={p.listen}>
                <p className={p.quote}>
                  {WORDS.map((w, i) => (
                    <span key={i} className={p.word} data-on={i < words || undefined}>
                      {i === 0 ? "“" : ""}
                      {w}
                      {i === WORDS.length - 1 ? "”" : ""}{" "}
                    </span>
                  ))}
                </p>
                <div className={p.wave}>
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      className={p.bar}
                      style={
                        {
                          "--h": `${h}cqw`,
                          "--d": `${0.55 + ((i * 37) % 7) / 10}s`,
                          "--dl": `${-((i * 53) % 9) / 10}s`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
                <div className={p.listenFoot}>
                  <span>
                    {listen.status} 0:0{seconds}
                  </span>
                  <span className={p.mic}>
                    <Icon name="mic" strokeWidth={2} />
                  </span>
                </div>
              </div>
              <div className={p.actions}>
                <span className={p.primary} data-pressed={within(t, PRESS_CONTINUE) || undefined}>
                  {listen.primary}
                </span>
                <span className={p.secondary}>{listen.secondary}</span>
              </div>
            </div>

            {/* Screen 2: Klo suggests a category */}
            <div className={p.scr} data-state={placeState}>
              <TopBar />
              <p className={p.eyebrow}>{place.eyebrow}</p>
              <p className={p.title}>
                {place.title[0]}
                <br />
                {place.title[1]}
              </p>
              <p className={`${p.body} ${p.bodyMuted}`}>{place.body}</p>
              <div className={p.goal}>{place.goal}</div>
              <div className={p.grid}>
                {place.categories.map((c, i) => (
                  <div
                    key={c.key}
                    className={p.tile}
                    data-selected={(c.key === "wealth" && selected) || undefined}
                    style={{ "--tile": TILE_BG[c.key], "--i": i } as CSSProperties}
                  >
                    <Image src={`/app/tile-${c.key}.png`} alt="" width={252} height={222} className={p.tileImg} />
                    <span className={p.tileLabel}>{c.label}</span>
                    {c.key === "wealth" && (
                      <span className={p.check}>
                        <Icon name="check" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className={p.actions}>
                <span className={p.primary} data-pressed={within(t, PRESS_YES) || undefined}>
                  {place.primary}
                </span>
              </div>
              <p className={p.note}>{place.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
