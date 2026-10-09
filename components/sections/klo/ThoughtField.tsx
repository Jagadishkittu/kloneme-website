"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { klo } from "@/content/klo";
import { rng } from "@/lib/rng";
import ShapeIcon from "../problem/ShapeIcon";
import s from "./klo.module.css";

// Scattered family life, as thoughts drifting through your head: the family's ten loose ends
// (v9's notes, each with its app's icon) float toward you out of a soft, blurred depth, come
// sharply into focus one after another (what's wrong with each one surfaces as it does), then
// drift past you and fade. Small things of family life and soft points of light drift with them,
// the whole field turns slowly like a galaxy (the text stays upright), and rings ripple out of a
// warm glow at its centre, where the thoughts come from. The pointer gently tilts the field.
// Pure CSS motion; reduced motion shows the notes still and sharp.

const { scattered } = klo;
const N = scattered.notes.length;
const COLORS = ["var(--sky)", "var(--coral)", "var(--lime)", "var(--lilac)"];
const STREAM_COLORS = ["var(--sky)", "var(--berry)", "var(--coral)", "var(--lime)", "var(--lagoon)", "var(--lilac)"];

// A spot on a ring around the middle (in % of the card)
const spot = (deg: number, rx: number, ry: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: `${(50 + Math.cos(a) * rx).toFixed(2)}%`, y: `${(50 + Math.sin(a) * ry).toFixed(2)}%` };
};

// Notes around the middle (never on it), each 108° on from the last, so notes that follow each
// other in time are far apart on the card. Spread through the cycle so the field is full from the
// start; they come into focus in v9 order.
const THOUGHTS = scattered.notes.map((e, i) => ({
  e,
  ...spot(i * 108 - 90, i % 2 === 0 ? 26 : 19, i % 2 === 0 ? 31 : 23),
  delay: (-((N - i) % N) * scattered.cycle) / N,
  color: COLORS[i % COLORS.length],
}));

// Small things of family life, on an outer ring between the notes, on a slightly slower cycle
const OBJECTS: IconName[] = ["plane", "heart", "id", "home", "dollar", "clock"];
const OBJECT_CYCLE = scattered.cycle * 1.13;
const THINGS = OBJECTS.map((icon, i) => ({
  icon,
  ...spot(i * 60 + 36, i % 2 ? 35 : 30, i % 2 ? 38 : 33),
  delay: (-i * OBJECT_CYCLE) / OBJECTS.length,
  color: STREAM_COLORS[i % STREAM_COLORS.length],
}));

// Soft points of light at their own speeds
const MOTES = (() => {
  const r = rng(5);
  return Array.from({ length: 14 }, (_, i) => ({
    x: `${(8 + r() * 84).toFixed(1)}%`,
    y: `${(8 + r() * 84).toFixed(1)}%`,
    size: `${Math.round(14 + r() * 34)}px`,
    dur: `${(22 + r() * 18).toFixed(1)}s`,
    delay: `${(-r() * 40).toFixed(1)}s`,
    color: STREAM_COLORS[i % STREAM_COLORS.length],
  }));
})();

export default function ThoughtField() {
  const ref = useRef<HTMLDivElement>(null);

  // Pointer tilt (mouse only, and only when motion is welcome)
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--tx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty("--ty", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`${s.card} ${s.fieldCard}`}>
      {/* Where the thoughts come from: a warm glow with rings rippling out of it */}
      <span className={s.source} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <div className={s.field}>
        <div className={s.swirl}>
          <span className={s.layer} aria-hidden="true">
            {MOTES.map((m, i) => (
              <i
                key={i}
                className={s.mote}
                style={
                  { "--x": m.x, "--y": m.y, "--size": m.size, "--dur": m.dur, "--delay": m.delay, "--c": m.color } as CSSProperties
                }
              />
            ))}
          </span>

          <span className={s.layer} aria-hidden="true">
            {THINGS.map((t) => (
              <span
                key={t.icon}
                className={s.thing}
                style={
                  {
                    "--x": t.x,
                    "--y": t.y,
                    "--dur": `${OBJECT_CYCLE.toFixed(2)}s`,
                    "--delay": `${t.delay.toFixed(2)}s`,
                    "--gc": t.color,
                  } as CSSProperties
                }
              >
                <Icon name={t.icon} strokeWidth={1.9} />
              </span>
            ))}
          </span>

          <ul className={s.thoughts} aria-label={scattered.label}>
            {THOUGHTS.map(({ e, x, y, delay, color }) => (
              <li
                key={e.place}
                className={s.thought}
                style={
                  {
                    "--x": x,
                    "--y": y,
                    "--dur": `${scattered.cycle}s`,
                    "--delay": `${delay.toFixed(2)}s`,
                    "--gc": color,
                  } as CSSProperties
                }
              >
                <span className={s.tIcon}>
                  <ShapeIcon icon={e.icon} />
                </span>
                <span className={s.tPlace}>{e.place}</span>
                <span className={s.tItem}>{e.item}</span>
                <span className={s.tIssue}>{e.issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
