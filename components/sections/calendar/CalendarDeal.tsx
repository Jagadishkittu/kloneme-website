"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { calendar } from "@/content/calendar";
import { streams, type StreamKey } from "@/content/streams";
import type { Expression } from "@/content/twin";
import s from "./calendar.module.css";

const PERIODS = calendar.periods;

// Stream colour for each event's dot
const COLOR = Object.fromEntries(streams.cards.map((c) => [c.key, c.color])) as Record<StreamKey, string>;

// Klo's expression on each card's twin side
const KLO: Expression[] = ["helping", "focused", "surprised", "happy", "thinking"];

// Each card's twin side: one dark gradient in its own hue (light end, deep end) and a brighter tone of
// that hue for its sheen, Klo's halo and the edge light. In v9 order: plum, emerald, ocean, wine, copper.
const TONES = [
  { a: "#3b1f63", b: "#150b26", tone: "#8457e0" },
  { a: "#0f4d3c", b: "#061b15", tone: "#22a87c" },
  { a: "#123f6b", b: "#07162a", tone: "#3a83d8" },
  { a: "#5e1a35", b: "#210913", tone: "#cc4777" },
  { a: "#5c3313", b: "#200f06", tone: "#cf7a30" },
];

// Where each card lands, left → right: x in card widths and y in card heights from the middle of
// the heading, r its tilt (deg), sp the extra turn it flies in with, br the twin side's bar tilt.
// The outer cards tilt the most; the middle one sits lowest and straight, in front.
// m* is the mobile pile.
const FAN = [
  { x: -2.1, y: 0, r: -12, sp: -28, br: -3, mx: -0.04, my: 0.46, mr: -6 },
  { x: -1.08, y: 0.22, r: -6, sp: -28, br: 3, mx: 0.05, my: 0.48, mr: 5 },
  { x: 0, y: 0.44, r: 0.5, sp: 22, br: -2, mx: -0.02, my: 0.46, mr: -2 },
  { x: 1.08, y: 0.2, r: 6, sp: 28, br: 3, mx: 0.04, my: 0.45, mr: 4 },
  { x: 2.1, y: -0.02, r: 12, sp: 28, br: -2, mx: -0.05, my: 0.47, mr: -5 },
];

// Dealing order: outside in, alternating sides, so the middle card lands last, on top
const DEAL = [0, 4, 1, 3, 2];
const RANK = PERIODS.map((_, i) => DEAL.indexOf(i));

// Progress through the pinned stretch (0…1): the heading holds alone until START; each card then
// takes FLY to land, the next one setting off STEP later
const START = 0.08;
const FLY = 0.24;
const STEP = 0.155;
const END = START + STEP * (PERIODS.length - 1) + FLY;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const m = matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

export default function CalendarDeal({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const deck = useRef<HTMLUListElement>(null);
  const landed = useRef(false);
  const timers = useRef<number[]>([]);
  const [allIn, setAllIn] = useState(false);
  const [order, setOrder] = useState(DEAL); // mobile pile, bottom → top
  const [open, setOpen] = useState<number | null>(null); // mobile: the top card, turned to its twin side
  const [sending, setSending] = useState<number | null>(null);
  const pile = useMedia("(max-width: 767px)");
  const still = useMedia("(prefers-reduced-motion: reduce)");

  // Scrolling through the pinned section deals the cards; scrolling back up takes them away again.
  // Sets --enter (section scrolling in) and --cover (cards landing) on the section, --e on each card.
  useEffect(() => {
    const sec = section.current;
    const list = deck.current;
    if (!sec || !list) return;
    const items = Array.from(list.children) as HTMLElement[];
    // Reduced motion: no dealing, every card is already down (and can be turned over)
    if (still) {
      items.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    let raf = 0;
    let last = "";

    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const run = r.height - vh;
      const at = run > 0 ? clamp(-r.top / run) : 0;
      const enter = clamp(1 - r.top / vh);
      const key = `${at.toFixed(4)}|${enter.toFixed(3)}`;
      if (key === last) return;
      last = key;

      sec.style.setProperty("--enter", enter.toFixed(3));
      sec.style.setProperty("--cover", clamp((at - START) / (END - START)).toFixed(3));
      items.forEach((el, i) => {
        const t = clamp((at - START - RANK[i] * STEP) / FLY);
        el.style.setProperty("--e", (1 - (1 - t) ** 3).toFixed(4));
        el.toggleAttribute("data-in", t >= 1);
      });

      const done = at >= END;
      if (done !== landed.current) {
        landed.current = done;
        setAllIn(done);
        if (!done) {
          setOrder(DEAL);
          setOpen(null);
        }
      }
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
  }, [still]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // Off-screen: the auroras and emoji stop moving
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => sec.toggleAttribute("data-paused", !e.isIntersecting));
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  // Mobile, once the pile is complete: tapping the top card turns it over to its twin side;
  // tapping again tucks it under the pile
  const top = order[order.length - 1];
  const ready = pile && (allIn || still) && sending === null;

  const tapTop = (i: number) => {
    if (open !== i) {
      setOpen(i);
      return;
    }
    setOpen(null);
    const toBack = (o: number[]) => [i, ...o.filter((k) => k !== i)];
    if (still) {
      setOrder(toBack);
      return;
    }
    setSending(i);
    timers.current.push(
      window.setTimeout(() => setOrder(toBack), 300),
      window.setTimeout(() => setSending(null), 700),
    );
  };

  // Hover (mouse): the card tilts towards the pointer and its light follows it (--px/--py: -0.5…0.5)
  const tilt = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - b.left) / b.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - b.top) / b.height - 0.5).toFixed(3));
  };
  const untilt = (e: PointerEvent<HTMLLIElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };

  return (
    <section ref={section} id="calendar" aria-labelledby="calendar-h" className={s.section}>
      <div className={s.sticky}>
        <div className={s.intro}>{children}</div>

        <ul ref={deck} className={s.deck}>
          {PERIODS.map((p, i) => {
            const f = FAN[i];
            const tap = ready && i === top;
            // Aurora colours: the streams of this period's events
            return (
              <li
                key={p.name}
                className={s.card}
                data-open={open === i || undefined}
                data-sending={sending === i || undefined}
                onPointerMove={tilt}
                onPointerLeave={untilt}
                style={
                  {
                    "--tone-a": TONES[i].a,
                    "--tone-b": TONES[i].b,
                    "--tone": TONES[i].tone,
                    "--fx": f.x,
                    "--fy": f.y,
                    "--fr": f.r,
                    "--fs": f.sp,
                    "--mx": f.mx,
                    "--my": f.my,
                    "--mr": f.mr,
                    "--ms": Math.sign(f.mr) * 24,
                    "--br": `${f.br}deg`,
                    "--z": RANK[i] + 1,
                    "--mz": order.indexOf(i) + 1,
                  } as CSSProperties
                }
              >
                <div
                  className={s.face}
                  tabIndex={pile && !tap ? undefined : 0}
                  role={tap ? "button" : undefined}
                  aria-label={tap ? `${p.name}: ${open === i ? "next" : "turn over"}` : undefined}
                  onClick={tap ? () => tapTop(i) : undefined}
                  onKeyDown={
                    tap
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            tapTop(i);
                          }
                        }
                      : undefined
                  }
                >
                  {/* Paper side (shown when the card turns over): a page from a wall calendar */}
                  <div className={s.front}>
                    <div className={s.page} data-now={p.now || undefined}>
                      <span className={s.binding} aria-hidden="true">
                        <i />
                        <i />
                      </span>
                      <h3 className={s.period}>
                        <span className={s.emo} aria-hidden="true">
                          <span>{p.emoji}</span>
                        </span>
                        {p.name}
                      </h3>
                      <ul className={s.events}>
                        {p.events.map((ev) => (
                          <li key={ev.title} style={{ "--dot": COLOR[ev.stream] } as CSSProperties}>
                            <b>{ev.title}</b>
                            <small>{ev.when}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Twin side (facing out): the same dates as Klo's nudges, on dark glass (visual only) */}
                  <div className={s.back} aria-hidden="true">
                    <div className={s.tile}>
                      <span className={s.aurora} />
                      <span className={s.glare} />
                      <span className={s.klo}>
                        <Image src={`/klo/${KLO[i]}.png`} alt="" width={528} height={456} sizes="80px" />
                      </span>
                      <ul className={s.nudges}>
                        {p.events.map((ev) => (
                          <li key={ev.title} style={{ "--dot": COLOR[ev.stream] } as CSSProperties}>
                            <b>{ev.title}</b>
                            <small>{ev.when}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className={s.bar}>
                      <span className={s.barEmo}>{p.emoji}</span>
                      <span>{p.name}</span>
                      <Icon name="arrow" strokeWidth={2.2} className={s.arrow} />
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
