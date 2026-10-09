"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { klo } from "@/content/klo";
import s from "./wheel.module.css";

const STATS = klo.stats;
const ROWS = 3; // shown at a time
const STEPS = STATS.length - ROWS + 1; // 1–3, 2–4, 3–5

// Where the scroll holds still (each step) and where the list moves on, as shares of the pinned stretch
const MOVES: [number, number][] = [
  [0.12, 0.44],
  [0.56, 0.88],
];
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
// Scroll (0–1) → how far the list has moved, in steps (0–2)
const shiftAt = (p: number) => MOVES.reduce((n, [a, b]) => n + ease(clamp((p - a) / (b - a))), 0);

// Stripes run from amber at the top of the wheel to coral at the bottom (by angle), so the turning shows
const BARS = 150;
const AMBER = [245, 179, 31];
const CORAL = [238, 99, 82];
const BAR_COLOR = Array.from({ length: BARS }, (_, i) => {
  const t = Math.sqrt((1 - Math.cos((2 * Math.PI * i) / BARS)) / 2);
  const [r, g, b] = AMBER.map((a, k) => Math.round(a + (CORAL[k] - a) * t));
  return `rgb(${r} ${g} ${b})`;
});

// The wheel: a pale ring of fine stripes round a soft warm core
function Disc({ id }: { id: string }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#f39479" />
          <stop offset="0.65" stopColor="#f6ad95" />
          <stop offset="1" stopColor="#f9c6b4" />
        </radialGradient>
      </defs>
      <circle r="100" className={s.base} />
      <g strokeLinecap="butt">
        {BAR_COLOR.map((color, i) => (
          <line
            key={i}
            x1="0"
            y1={-63}
            x2="0"
            y2={-97}
            stroke={color}
            strokeWidth={1.7}
            transform={`rotate(${(360 / BARS) * i})`}
          />
        ))}
      </g>
      <circle r="58" fill={`url(#${id})`} />
    </svg>
  );
}

export default function StatWheel() {
  const root = useRef<HTMLDivElement>(null);
  const pinned = useMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
  const [step, setStep] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  // Pinned: the scroll moves the list on and turns the wheel (--s, 0–2), lets the lines reach out only
  // near a resting place (--k, 0–1) and fills the ring (--p, 0–1)
  useEffect(() => {
    const el = root.current;
    if (!el || !pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? clamp(-r.top / run) : 0;
      const shift = shiftAt(p);
      el.style.setProperty("--s", shift.toFixed(4));
      el.style.setProperty("--k", Math.max(0, 1 - Math.abs(shift - Math.round(shift)) * 5).toFixed(3));
      el.style.setProperty("--p", p.toFixed(4));
      setStep(Math.round(shift));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned]);

  // Not pinned (reduced motion on wide screens): the dots move the list a step at a time
  useEffect(() => {
    const el = root.current;
    if (!el || pinned) return;
    el.style.setProperty("--s", String(step));
    el.style.setProperty("--k", "1");
    el.style.setProperty("--p", ((step + 1) / STEPS).toFixed(3));
  }, [pinned, step]);

  // Off-screen: the glow's breathing pauses
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className={s.wheel} data-paused={!onScreen || undefined}>
      <div className={s.sticky}>
        <div className={s.frame}>
          <div className={s.head}>
            <h2 id="klone-h" className={s.h2}>
              <span>{klo.headline.lead}</span> <span className={s.h2Accent}>{klo.headline.accent}</span>
            </h2>
            <div className={s.progress}>
              {/* Reduced motion only: a dot per step to move the list by hand */}
              {!pinned && (
                <span className={s.steps}>
                  {Array.from({ length: STEPS }, (_, k) => (
                    <button
                      key={k}
                      type="button"
                      aria-label={`Figures ${k + 1} to ${k + ROWS} of ${STATS.length}`}
                      aria-pressed={k === step}
                      data-on={k === step || undefined}
                      onClick={() => setStep(k)}
                    />
                  ))}
                </span>
              )}
              <svg className={s.ring} viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="17" />
                <circle cx="22" cy="22" r="17" pathLength={1} className={s.ringFill} />
              </svg>
            </div>
          </div>

          {/* Every figure in order, for screen readers (the wheel shows three at a time) */}
          <ol className="sr-only" aria-label={klo.statsLabel}>
            {STATS.map((st) => (
              <li key={st.label}>
                {st.label}: {st.value} {st.statement} ({st.source})
              </li>
            ))}
          </ol>

          <div className={s.stage} aria-hidden="true">
            {/* Laid out in the reference's proportions, scaled to fit */}
            <div className={s.canvas}>
              {/* The wheel's right half, seen through frosted glass: a vivid blurred ring */}
              <span className={s.blurHalf}>
                <Disc id="kw-core-blur" />
              </span>
              <span className={s.veil} />
              {/* Its left half, sharp, turning as the list moves */}
              <span className={s.disc}>
                <Disc id="kw-core" />
              </span>
              <span className={s.arc}>
                <i />
              </span>

              {/* Lines from the three places to the arc: top, left-most point, bottom */}
              {[0, 1, 2].map((r) => (
                <span key={r} className={s.line} data-slot={r} />
              ))}

              {/* The figures: one list moving up through three places (the next comes in from below) */}
              {STATS.map((st, i) => (
                <div key={st.label} className={s.item} style={{ "--i": i } as CSSProperties}>
                  <span className={s.num}>{st.value}</span>
                  <span className={s.chip}>
                    <Icon name={st.icon} strokeWidth={2} />
                    {st.label}
                  </span>
                  <p className={s.statement}>{st.statement}</p>
                  <span className={s.source}>{st.source}</span>
                </div>
              ))}

              {/* The problems on glass cards over the blurred ring: four in view, moving up with the list;
                  the ones whose figures are showing are lit */}
              <div className={s.cards}>
                {STATS.map((st, i) => (
                  <div key={st.label} className={s.card} style={{ "--i": i } as CSSProperties}>
                    <span className={s.badge}>
                      <Icon name={st.icon} strokeWidth={1.9} />
                    </span>
                    <span className={s.cardLabel}>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
