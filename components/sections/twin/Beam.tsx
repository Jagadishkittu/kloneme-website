import type { CSSProperties } from "react";
import { rng } from "@/lib/rng";
import s from "./twin.module.css";

// Light pouring down onto the avatars (Bevel reference): a fan of thin pastel lines that starts as a
// point at the top of the horizon (right under the phone) and flares out over the three avatars, with
// brighter streaks running down. Drawn in a 1000×1000 box stretched from the horizon's top point
// (top) to the middle of the avatars (bottom).
const N = 150;
// Hero pastels, left → right
const PALETTE = ["#6fc3d4", "#86d3e3", "#93b6f0", "#b9cdf6", "#c6b6f3", "#efa5c6"];

type Line = { d: string; color: number; opacity: number; width: number; inner: boolean };

const LINES: Line[] = (() => {
  const r = rng(29);
  return Array.from({ length: N }, (_, i) => {
    const u = i / (N - 1);
    const sgn = (u - 0.5) * 2; // -1 (left) … 1 (right)
    const top = 500 + sgn * 12 + (r() - 0.5) * 4;
    const bottom = 500 + sgn * 480 + (r() - 0.5) * 16;
    const color = Math.min(PALETTE.length - 1, Math.max(0, Math.floor(u * PALETTE.length + (r() - 0.5) * 1.4)));
    return {
      // Stays narrow for most of the drop, then flares out above the avatars
      d: `M ${top.toFixed(1)} 0 C ${top.toFixed(1)} 480, ${(top + (bottom - top) * 0.32).toFixed(1)} 780, ${bottom.toFixed(1)} 1000`,
      color,
      // Brightest in the middle of the beam, softer toward its sides
      opacity: (0.75 - 0.55 * Math.pow(Math.abs(sgn), 1.4)) * (0.8 + r() * 0.4),
      width: 1.3 + r() * 1.3,
      inner: Math.abs(sgn) < 0.6,
    };
  });
})();

type Streak = { line: Line; dash: string; dur: number; delay: number };

const STREAKS: Streak[] = (() => {
  const r = rng(41);
  return LINES.filter((l) => l.inner)
    .filter(() => r() < 0.2)
    .map((line) => {
      const a = 40 + r() * 100;
      const b = 220 + r() * 220;
      const c = 20 + r() * 50;
      return {
        line,
        dash: `${a.toFixed(0)} ${b.toFixed(0)} ${c.toFixed(0)} ${(1000 - a - b - c).toFixed(0)}`,
        dur: 2.2 + r() * 1.8,
        delay: -r() * 4,
      };
    });
})();

function Gradients() {
  return (
    <defs>
      {PALETTE.map((c, i) => (
        <linearGradient key={i} id={`bm-${i}`} x1="0" x2="0" y1="0" y2="1000" gradientUnits="userSpaceOnUse">
          {/* Lit from the top point, brightest above the avatars, fading out behind them */}
          <stop offset="0" stopColor={c} stopOpacity="0.3" />
          <stop offset="0.12" stopColor={c} stopOpacity="0.8" />
          <stop offset="0.45" stopColor={c} stopOpacity="1" />
          <stop offset="0.8" stopColor={c} stopOpacity="0.5" />
          <stop offset="0.92" stopColor={c} stopOpacity="0.15" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      ))}
      <linearGradient id="bm-white" x1="0" x2="0" y1="0" y2="1000" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
        <stop offset="0.4" stopColor="#fff" stopOpacity="1" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

export default function Beam() {
  return (
    <div className={s.beam} aria-hidden="true">
      {/* Soft colour glow under the lines (blurred in CSS); uses the gradients defined below */}
      <svg className={s.beamHaze} viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {LINES.filter((_, i) => i % 4 === 1).map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={`url(#bm-${l.color})`} strokeWidth={22} />
        ))}
      </svg>
      <svg className={s.beamLines} viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <Gradients />
        {LINES.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={`url(#bm-${l.color})`} strokeOpacity={l.opacity} strokeWidth={l.width} />
        ))}
      </svg>
      <svg className={s.beamStreaks} viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {STREAKS.map((st, i) => (
          <path
            key={i}
            d={st.line.d}
            pathLength={1000}
            className={s.streak}
            stroke={i % 3 === 0 ? "url(#bm-white)" : `url(#bm-${st.line.color})`}
            strokeWidth={st.line.width * 1.3}
            strokeDasharray={st.dash}
            style={{ "--dur": `${st.dur.toFixed(2)}s`, "--delay": `${st.delay.toFixed(2)}s` } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}
