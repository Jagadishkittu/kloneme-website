"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { twin } from "@/content/twin";
import s from "./twin.module.css";

const AREAS = twin.areas;
const N = AREAS.length;

// Place of avatar i relative to the middle: -1 left, 0 middle, 1 right.
// -2, 2 and 3 wait hidden in the fade. Everything moves right → left, so the next avatar waits on the right.
function place(i: number, active: number) {
  const p = (((i - active) % N) + N) % N;
  return p > 3 ? p - N : p;
}

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribe(onChange: () => void) {
  const mq = matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function KloCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const reduced = useSyncExternalStore(subscribe, () => matchMedia(REDUCED).matches, () => false);
  const paused = hovered || focused || !onScreen || reduced;

  // Off-screen: stop the turns and pause the section's animations
  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const io = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
      section.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // One step every few seconds; restarts after any move, so a clicked avatar gets a full turn in the middle
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % N), twin.step * 1000);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <div
      ref={ref}
      className={s.window}
      role="group"
      aria-roledescription="carousel"
      aria-label={twin.label}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <ul className={s.track}>
        {AREAS.map((area, i) => {
          const pos = place(i, active);
          return (
            <li key={area.name} className={s.item} data-pos={pos} style={{ "--p": pos } as CSSProperties} inert={Math.abs(pos) > 1}>
              <button type="button" className={s.btn} onClick={() => setActive(i)} aria-current={pos === 0 ? "true" : undefined}>
                <span className={s.avatar}>
                  <Image src={`/klo/${area.expression}.png`} alt="" width={528} height={456} sizes="(max-width: 767px) 30vw, 236px" />
                </span>
                <span className={s.pill}>{area.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
