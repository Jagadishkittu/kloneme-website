"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { klo } from "@/content/klo";
import { StatusBar } from "../hero/PhoneDemo";
import p from "../hero/phone.module.css";
import s from "./klo.module.css";

const { rules, phone, nudge } = klo;
const N = phone.exchanges.length;

// Nudge card timeline (seconds): the answer streams in a word at a time, then the calendar draws in
const STREAM_AT = 1.9;
const WORD_STEP = 0.07;
let words = 0;
const ANSWER = nudge.answer
  .split(/(\s+)/)
  .filter(Boolean)
  .map((t) => (/^\s+$/.test(t) ? { t, w: -1 } : { t, w: words++ }));
const LAST_WORD = words - 1;
const CAL_AT = STREAM_AT + words * WORD_STEP + 0.35;

export default function KloBento() {
  const ref = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0); // bumped on every change so the chat and the timer bar replay
  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loop, setLoop] = useState(0); // replays the nudge card
  const ex = phone.exchanges[active];

  const go = (i: number) => {
    setActive(((i % N) + N) % N);
    setRun((r) => r + 1);
  };

  // Everything waits until the cards are on screen, and pauses again when they leave
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The nudge card plays again every few seconds while it's on screen
  useEffect(() => {
    if (!onScreen || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setLoop((l) => l + 1), nudge.loop * 1000);
    return () => clearTimeout(t);
  }, [onScreen, loop]);

  // Keep the lit rule tile in view (scrolls the strip sideways, never the page)
  useEffect(() => {
    const el = strip.current;
    const tile = el?.children[active] as HTMLElement | undefined;
    if (!el || !tile) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: tile.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: smooth ? "smooth" : "auto" });
  }, [active]);

  const hold = {
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (e: FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
    },
  };

  return (
    <div
      ref={ref}
      className={s.bento}
      data-paused={!onScreen || undefined}
      data-hold={hovered || focused || undefined}
      style={{ "--step": `${phone.step}s` } as CSSProperties}
    >
      {/* Phone with a Klo chat, cropped by the bottom of the card */}
      <div className={`${s.card} ${s.phoneCard}`} {...hold}>
        <div className={s.crop}>
          <div className={s.phoneAt}>
            <div className={p.phone} role="group" aria-label={`Chat with ${phone.title}`}>
              <span className={`${p.btn} ${p.btnA}`} />
              <span className={`${p.btn} ${p.btnB}`} />
              <span className={`${p.btn} ${p.btnC}`} />
              <div className={p.screen}>
                <span className={p.island} aria-hidden="true" />
                <StatusBar />

                <div className={s.top} aria-hidden="true">
                  <span className={s.round}>
                    <Icon name="menu" strokeWidth={2} />
                  </span>
                  <span className={s.title}>
                    <b>{phone.title}</b>
                    <small>
                      <Icon name="shield" strokeWidth={2.2} />
                      {phone.status}
                    </small>
                  </span>
                  <span className={`${s.round} ${s.face}`}>
                    <Image src="/klo/happy.png" alt="" width={528} height={456} sizes="48px" />
                  </span>
                </div>

                <div key={run} className={s.chat}>
                  <p className={s.q}>{ex.q}</p>
                  <div className={s.reply}>
                    <span className={s.pThink} aria-hidden="true">
                      <span className={s.pFace}>
                        <Image src="/klo/thinking.png" alt="" width={528} height={456} sizes="36px" />
                      </span>
                      <span className={s.shimmer}>{phone.thinking}</span>
                    </span>
                    <div className={s.a}>
                      <p>{ex.a}</p>
                      <span className={s.src}>
                        <Icon name="doc" strokeWidth={2} />
                        {ex.source}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={s.pager}>
                  <div className={s.pagerTop}>
                    <button type="button" aria-label="Previous question" onClick={() => go(active - 1)}>
                      <Icon name="left" strokeWidth={2} />
                    </button>
                    <span>
                      {active + 1} of {N}
                    </span>
                    <button type="button" aria-label="Next question" onClick={() => go(active + 1)}>
                      <Icon name="left" strokeWidth={2} className={s.flip} />
                    </button>
                    <span className={s.try}>{klo.tryLabel}</span>
                  </div>
                  <p className={s.pagerQ}>{ex.q}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Klo's rules; the one the chat is showing is lit, and its bar times the next turn */}
      <div className={`${s.card} ${s.rulesCard}`} {...hold}>
        <div ref={strip} className={s.strip} role="group" aria-label="Klo’s rules">
          {rules.map((r, i) => (
            <button
              key={r.title}
              type="button"
              className={s.tile}
              data-on={i === active || undefined}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span className={s.tileHead}>
                <span className={s.tileIcon}>
                  <Icon name={r.icon} strokeWidth={2} />
                </span>
                <b>{r.title}</b>
              </span>
              <span className={s.track}>
                {i === active && <span key={run} className={s.fill} onAnimationEnd={() => go(active + 1)} />}
              </span>
              <span className={s.tileBody}>{r.body}</span>
            </button>
          ))}
        </div>
      </div>

      {/* A morning nudge: the answer streams in, its dates light up, and the calendar it came from draws in */}
      <div className={`${s.card} ${s.nudgeCard}`}>
        <div key={loop} className={s.nudge} style={{ "--loop": `${nudge.loop}s`, "--cal-at": `${CAL_AT}s` } as CSSProperties}>
          <p className={s.tKlo}>{nudge.klo}</p>
          <p className={s.tYou}>{nudge.you}</p>
          <p className={s.tAnswer}>
            {ANSWER.map(({ t, w }, i) =>
              w < 0 ? (
                t
              ) : (
                <span
                  key={i}
                  className={s.w}
                  data-last={w === LAST_WORD || undefined}
                  style={{ "--d": `${STREAM_AT + w * WORD_STEP}s` } as CSSProperties}
                >
                  {t}
                </span>
              ),
            )}
          </p>
          <div className={s.cal}>
            <span className={s.calSrc}>
              <Icon name="cal" strokeWidth={2} />
              {nudge.source}
            </span>
            <ol className={s.calLine}>
              {nudge.dates.map((d, i) => (
                <li key={d.day} data-mark={d.mark || undefined} style={{ "--i": i } as CSSProperties}>
                  <b>{d.day}</b>
                  <small>{d.label}</small>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
