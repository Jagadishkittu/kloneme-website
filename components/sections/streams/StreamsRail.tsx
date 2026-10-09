"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { streams } from "@/content/streams";
import Pattern from "./Patterns";
import Screen from "./Screens";
import s from "./streams.module.css";

const CARDS = streams.cards;
const N = CARDS.length;
const pad = (n: number) => String(n).padStart(2, "0");

export default function StreamsRail() {
  const section = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1); // -1: the intro card is in the middle
  const [still, setStill] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  // Scrolling down moves the row right → left while the section stays pinned; once the last card
  // is in, the page carries on. With reduced motion the row is a plain sideways-scrolling list.
  useEffect(() => {
    const sec = section.current;
    const box = sticky.current;
    const row = track.current;
    if (!sec || !box || !row) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }

    let dist = 0;
    let raf = 0;
    const items = () => Array.from(row.children) as HTMLElement[];

    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      row.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      sec.style.setProperty("--p", p.toFixed(4));

      // The card nearest the middle of the screen is the active one (index 0 is the intro)
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestD = Infinity;
      items().forEach((el, i) => {
        const b = el.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best - 1);
    };

    const measure = () => {
      dist = Math.max(0, row.offsetWidth - box.clientWidth);
      sec.style.height = `calc(100svh + ${dist}px)`;
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Patterns pause while the section is off-screen
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  const current = active >= 0 ? CARDS[active] : null;

  return (
    <section
      ref={section}
      id="streams"
      aria-labelledby="streams-h"
      className={s.streams}
      data-still={still || undefined}
      data-paused={!onScreen || undefined}
    >
      <div ref={sticky} className={s.sticky}>
        <div ref={track} className={s.track}>
          {/* Title card: scrolls away with the row */}
          <div className={s.intro}>
            <h2 id="streams-h" className={s.h2}>
              <span>{streams.headline.lead}</span> <span className={s.h2Accent}>{streams.headline.accent}</span>
            </h2>
            <p className={s.sub}>{streams.sub}</p>
            <span className={s.hint} aria-hidden="true">
              <Icon name="arrow" strokeWidth={2} />
            </span>
          </div>

          {CARDS.map((c, i) => (
            <article
              key={c.key}
              className={s.card}
              data-active={i === active || undefined}
              aria-labelledby={`stream-${c.key}`}
              style={{ "--c": c.color } as CSSProperties}
            >
              <div className={s.art}>
                <Pattern kind={c.key} still={still} />
                <Screen kind={c.key} />
                <span className={s.from} aria-hidden="true">
                  <Icon name={c.from.icon} strokeWidth={2} />
                  {streams.from} {c.from.place}
                </span>
                <span className={s.klo} aria-hidden="true">
                  <Image src={`/klo/${c.expression}.png`} alt="" width={528} height={456} sizes="(max-width: 767px) 30vw, 180px" />
                </span>
              </div>
              <h3 id={`stream-${c.key}`} className={s.title}>
                <Icon name={c.icon} strokeWidth={2} />
                {c.name}
              </h3>
              <p className={s.body}>{c.body}</p>
            </article>
          ))}
        </div>

        {/* Progress: a dot per stream, an amber bar for the whole run, and the current stream */}
        <div className={s.progress} aria-hidden="true">
          <span className={s.dots}>
            {CARDS.map((c, i) => (
              <i key={c.key} data-on={i === active || undefined} style={{ "--c": c.color } as CSSProperties} />
            ))}
          </span>
          <span className={s.bar}>
            <span />
          </span>
          <span className={s.count}>
            {pad(Math.max(active + 1, 0))} / {pad(N)}
            {current && <b> · {current.name}</b>}
          </span>
        </div>
      </div>
    </section>
  );
}
