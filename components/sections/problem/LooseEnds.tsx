"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { problem, streamColor } from "@/content/problem";
import { StatusBar } from "../hero/PhoneDemo";
import p from "../hero/phone.module.css";
import s from "./problem.module.css";

const ENDS = problem.looseEnds;
const { phone } = problem;

// Ring 0 (inner) carries 4 tiles, ring 1 (outer) 6. Tiles ride the arc from one end to the other
// (fading in and out at the ends, past the panel edge or beside the phone) and start again.
// `ring` per loose end, in v9 order; `tilt` is each tile's own slant on top of the ride.
const RINGS = [
  { from: 52, to: -52, count: 4 },
  { from: 58, to: -58, count: 6 },
] as const;
const PLACE: { ring: 0 | 1; tilt: number }[] = [
  { ring: 1, tilt: -10 }, // Sticky note
  { ring: 0, tilt: 8 }, // Gmail
  { ring: 1, tilt: 12 }, // Calendar
  { ring: 0, tilt: -12 }, // Notes
  { ring: 1, tilt: -6 }, // Bank app
  { ring: 1, tilt: 10 }, // Mail
  { ring: 0, tilt: 6 }, // Clinic portal
  { ring: 1, tilt: -12 }, // Family chat
  { ring: 0, tilt: -8 }, // Photos
  { ring: 1, tilt: 8 }, // Spreadsheet
];

// Same angular speed on both rings (they turn opposite ways)
const DUR = [
  (problem.orbit * (RINGS[0].from - RINGS[0].to)) / (RINGS[1].from - RINGS[1].to),
  problem.orbit,
];

const ARCS = ["--r0", "--r1", "--r2", "--r3", "--r4", "--r5"];

// The phone shows the first six loose ends, already filed by stream
const FILED = ENDS.slice(0, 6);

export default function LooseEnds({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  // Off-screen: pause the ride
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Position of each tile within its ring (0…count-1), in v9 order
  const seen = [0, 0];
  const slots = ENDS.map((e, i) => {
    const ring = PLACE[i].ring;
    const k = seen[ring]++;
    const { from, to, count } = RINGS[ring];
    return { e, ring, k, from, to, count, tilt: PLACE[i].tilt };
  });

  return (
    <div className={s.wrap}>
      <div ref={panel} className={s.panel} data-paused={!onScreen || undefined}>
        <div className={s.copy}>{children}</div>

        <div className={s.stage}>
          {/* Glowing concentric rings around the phone, each with a light travelling along it */}
          <div className={s.orbit} aria-hidden="true">
            {ARCS.map((r, i) => (
              <span key={r} className={s.arc} style={{ "--R": `var(${r})`, "--i": i } as CSSProperties} />
            ))}
          </div>

          {/* Phone with the loose ends filed by stream */}
          <div className={s.phoneAt} aria-hidden="true">
            <div className={p.phone}>
              <span className={`${p.btn} ${p.btnA}`} />
              <span className={`${p.btn} ${p.btnB}`} />
              <span className={`${p.btn} ${p.btnC}`} />
              <div className={p.screen}>
                <span className={s.glow} />
                <span className={p.island} />
                <StatusBar />
                <div className={s.bar}>
                  <span className={s.round}>
                    <Icon name="close" strokeWidth={2} />
                  </span>
                  <span className={s.pill}>
                    <Icon name="doc" strokeWidth={1.9} />
                    <Icon name="plus" strokeWidth={2} />
                  </span>
                </div>
                <p className={s.title}>{phone.title}</p>
                <div className={s.filters}>
                  {phone.filters.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
                <div className={s.list}>
                  {FILED.map((e) => (
                    <div key={e.place} className={s.rowBody} style={{ "--c": streamColor[e.stream] } as CSSProperties}>
                      <span className={s.thumb}>
                        <Icon name={e.icon} strokeWidth={1.8} />
                      </span>
                      <span className={s.rowText}>
                        <span className={s.tag}>{e.stream}</span>
                        <span className={s.rowTitle}>{e.item}</span>
                        <span className={s.rowSub}>
                          {phone.from} {e.place}
                        </span>
                      </span>
                      <Icon name="arrow" strokeWidth={2} className={s.chev} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* The ten places, travelling along two of the arcs */}
          <div className={s.orbit}>
            <ul className={s.tiles} aria-label={problem.looseEndsLabel}>
              {slots.map(({ e, ring, k, from, to, count, tilt }) => {
                const dur = DUR[ring];
                // Evenly spaced along the ride; the reduced-motion position is the middle of each tile's share
                const still = from + ((to - from) * (k + 0.5)) / count;
                return (
                  <li
                    key={e.place}
                    className={s.slot}
                    style={
                      {
                        "--R": `var(--r${ring + 1})`,
                        "--from": `${from}deg`,
                        "--to": `${to}deg`,
                        "--still": `${still}deg`,
                        "--dur": `${dur}s`,
                        "--delay": `${(-dur * k) / count}s`,
                        "--tilt": `${tilt}deg`,
                        // The two rings turn opposite ways
                        "--dir": ring === 0 ? "reverse" : "normal",
                        "--c": streamColor[e.stream],
                      } as CSSProperties
                    }
                  >
                    {/* A frosted tile with a wash of its stream's colour */}
                    <span className={s.tile}>
                      <Icon name={e.icon} strokeWidth={1.8} />
                      <span className={s.tip} aria-hidden="true">
                        {e.place} · <em>{e.issue}</em>
                      </span>
                    </span>
                    <span className="sr-only">
                      {e.place}: {e.issue}. {e.item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
