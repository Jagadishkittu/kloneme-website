import type { CSSProperties } from "react";
import s from "./hero.module.css";

// Light-speed lines converging on the phone (look of the Bevel reference): a fan of thin,
// clearly visible pastel lines on each side, plus brighter streaks that race toward the centre.
const W = 1440;
const H = 600;
const CY = H / 2;
const END_X = 660;
// Dense enough that neighbouring lines overlap — one merged band, no empty gaps
const PER_SIDE = 260;

// Top → bottom colour order, as in the reference (cyan/blue above, pink/peach below)
const PALETTE = ["#86d3e3", "#6fc3d4", "#93b6f0", "#b9cdf6", "#c6b6f3", "#efa5c6", "#f4bea0", "#f3cf86"];

// Small seeded PRNG so server output is stable between renders
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Line = { d: string; color: number; opacity: number; width: number; inner: boolean };

function fan(seed: number, spread: number): Line[] {
  const r = rng(seed);
  return Array.from({ length: PER_SIDE }, (_, i) => {
    const u = i / (PER_SIDE - 1);
    const sgn = (u - 0.5) * 2; // -1 (top) … 1 (bottom)
    const off = Math.sign(sgn) * Math.pow(Math.abs(sgn), 1.1) * spread + (r() - 0.5) * 4;
    // Flares wide at the screen edges, stays a broad band (~27% of the edge spread) through the centre
    const y0 = CY + off;
    const c1 = CY + off * 0.56;
    const c2 = CY + off * 0.3;
    const y1 = CY + off * 0.27;
    const endX = END_X - r() * 30;
    const inner = Math.abs(sgn) < 0.7;
    const color = Math.min(PALETTE.length - 1, Math.max(0, Math.floor(u * PALETTE.length + (r() - 0.5) * 1.6)));
    return {
      d: `M -20 ${y0.toFixed(1)} C 220 ${c1.toFixed(1)}, 420 ${c2.toFixed(1)}, ${endX.toFixed(1)} ${y1.toFixed(1)}`,
      color,
      // Thick, overlapping strokes with only slight opacity differences: lines read as one soft cloud
      // Strongest in the middle of the band, fading smoothly into the background toward its outer rim
      opacity: (0.62 - 0.5 * Math.pow(Math.abs(sgn), 1.6)) * (0.85 + r() * 0.3),
      width: inner ? 2.6 + r() * 1.6 : 1.9 + r() * 1.1,
      inner,
    };
  });
}

const LEFT = fan(7, 292);
const RIGHT = fan(19, 296);
const MIRROR = `translate(${W} 0) scale(-1 1)`;

type Streak = { line: Line; dash: string; dur: number; delay: number; mobile: boolean };

function streaks(lines: Line[], seed: number): Streak[] {
  const r = rng(seed);
  return lines
    .filter((l) => l.inner)
    .filter(() => r() < 0.17)
    .map((line, i) => {
      const a = 50 + r() * 140;
      const b = 260 + r() * 260;
      const c = 20 + r() * 60;
      return {
        line,
        dash: `${a.toFixed(0)} ${b.toFixed(0)} ${c.toFixed(0)} ${(1000 - a - b - c).toFixed(0)}`,
        dur: 2 + r() * 2.4,
        delay: -r() * 5,
        mobile: i % 2 === 0,
      };
    });
}

const LEFT_STREAKS = streaks(LEFT, 3);
const RIGHT_STREAKS = streaks(RIGHT, 11);

function Gradients() {
  return (
    <defs>
      {PALETTE.map((c, i) => (
        <linearGradient key={i} id={`ll-${i}`} x1="0" x2={END_X} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          {/* Faded at the screen edge, building toward the centre, then softening behind the phone */}
          <stop offset="0" stopColor={c} stopOpacity="0.18" />
          <stop offset="0.2" stopColor={c} stopOpacity="0.5" />
          <stop offset="0.48" stopColor={c} stopOpacity="1" />
          <stop offset="0.8" stopColor={c} stopOpacity="0.35" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      ))}
      <linearGradient id="ll-white" x1="0" x2={END_X} y1="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function BaseLines({ lines }: { lines: Line[] }) {
  return lines.map((l, i) => (
    <path key={i} d={l.d} fill="none" stroke={`url(#ll-${l.color})`} strokeOpacity={l.opacity} strokeWidth={l.width} />
  ));
}

function StreakLines({ list, out = false }: { list: Streak[]; out?: boolean }) {
  return list.map((st, i) => (
    <path
      key={i}
      d={st.line.d}
      pathLength={1000}
      className={out ? `${s.streak} ${s.streakOut}` : s.streak}
      data-desktop-only={st.mobile ? undefined : ""}
      stroke={i % 4 === 0 ? "url(#ll-white)" : `url(#ll-${st.line.color})`}
      strokeWidth={st.line.width}
      strokeDasharray={st.dash}
      style={{ "--dur": `${st.dur.toFixed(2)}s`, "--delay": `${st.delay.toFixed(2)}s` } as CSSProperties}
    />
  ));
}

// Wide soft colour bands under the lines (heavily blurred in CSS) — the "cloudy film" of the reference
// Every few lines get a wide blurred twin so the colour fills every gap between lines
const HAZE_STEP = 5;
function Haze({ lines }: { lines: Line[] }) {
  return lines
    .filter((_, i) => i % HAZE_STEP === 1)
    .map((l, i) => (
      <path key={i} d={l.d} fill="none" stroke={`url(#ll-${l.color})`} strokeWidth={l.inner ? 44 : 34} strokeLinecap="round" />
    ));
}

export default function LightLines() {
  return (
    <div className={s.lines} aria-hidden="true">
      <svg className={s.linesHaze} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <g>
          <Haze lines={LEFT} />
        </g>
        <g transform={MIRROR}>
          <Haze lines={RIGHT} />
        </g>
      </svg>
      <svg className={s.linesBase} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <Gradients />
        <g>
          <BaseLines lines={LEFT} />
        </g>
        <g transform={MIRROR}>
          <BaseLines lines={RIGHT} />
        </g>
      </svg>
      {/* Reuses the gradients defined in the first SVG (ids resolve document-wide) */}
      <svg className={s.linesStreaks} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <g>
          <StreakLines list={LEFT_STREAKS} />
        </g>
        <g transform={MIRROR}>
          <StreakLines list={RIGHT_STREAKS} out />
        </g>
      </svg>
    </div>
  );
}
