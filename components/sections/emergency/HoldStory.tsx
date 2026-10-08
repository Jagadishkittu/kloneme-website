"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { emergency } from "@/content/emergency";
import { StatusBar } from "../hero/PhoneDemo";
import p from "../hero/phone.module.css";
import s from "./emergency.module.css";

const E = emergency;
const P = E.phone;
const FULL = P.island.hours * 3600 - 1; // 71:59:59

// The scroll story, as progress (0…1) through the pinned stretch: the button fills, the share goes
// out, the people are notified, Klo calls Daniel, then the 72 hours run out and access ends
const HOLD: [number, number] = [0.05, 0.24];
const NOTIFY = [0.3, 0.35, 0.4];
const CALL = 0.48;
const CLOCK: [number, number] = [0.7, 0.86];
const END = 0.89;
const STEP_AT = [0, 0.27, 0.46, 0.66]; // where each step's text takes over

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const fillAt = (at: number) => (at >= HOLD[1] ? 0 : clamp((at - HOLD[0]) / (HOLD[1] - HOLD[0])));
const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (sec: number) => `${pad(Math.floor(sec / 3600))}:${pad(Math.floor((sec % 3600) / 60))}:${pad(sec % 60)}`;

type View = { sent: boolean; notified: number; calling: boolean; clock: number; step: number; line: number };

function fromScroll(at: number): View {
  const sent = at >= HOLD[1] && at < END;
  return {
    sent,
    notified: sent ? NOTIFY.filter((t) => at >= t).length : 0,
    calling: sent && at >= CALL,
    clock: sent ? Math.round(FULL * (1 - clamp((at - CLOCK[0]) / (CLOCK[1] - CLOCK[0])))) : FULL,
    step: STEP_AT.filter((t) => at >= t).length - 1,
    line: clamp(at / END),
  };
}

export default function HoldStory() {
  const section = useRef<HTMLElement>(null);
  const steps = useRef<HTMLOListElement>(null);
  const hold = useRef<HTMLButtonElement>(null);
  const holdRaf = useRef(0);
  const manualRef = useRef(false);
  const timers = useRef<number[]>([]);
  const clockTimer = useRef(0);
  const toastTimer = useRef(0);

  const pinned = useMedia("(min-width: 1080px) and (prefers-reduced-motion: no-preference)");
  const [at, setAt] = useState(0);
  const [docs, setDocs] = useState(() => P.docs.map((d) => d.on));
  const [holding, setHolding] = useState(false);
  const [toast, setToast] = useState(false);
  // Hands-on mode: once the visitor touches the phone it runs like the app, not the scroll
  const [manual, setManual] = useState(false);
  const [m, setM] = useState<View>({ sent: false, notified: 0, calling: false, clock: FULL, step: 0, line: 0 });

  const clearRun = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    clearInterval(clockTimer.current);
  };

  // Scroll: --enter as the section arrives; on wide screens the pinned stretch plays the story
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      sec.style.setProperty("--enter", clamp(1 - r.top / vh).toFixed(3));
      if (!pinned) return;
      const run = r.height - vh;
      const now = run > 0 ? clamp(-r.top / run) : 0;
      setAt(Math.round(now * 1000) / 1000);
      if (!manualRef.current) hold.current?.style.setProperty("--fill", fillAt(now).toFixed(3));
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

  // Leaving the section hands the phone back to the scroll story; the step list ticks once seen
  useEffect(() => {
    const sec = section.current;
    const list = steps.current;
    if (!sec || !list) return;
    const out = new IntersectionObserver(([e]) => {
      if (e.isIntersecting || !manualRef.current) return;
      clearRun();
      manualRef.current = false;
      setManual(false);
      setM({ sent: false, notified: 0, calling: false, clock: FULL, step: 0, line: 0 });
    });
    const seen = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) list.setAttribute("data-seen", "");
      },
      { threshold: 0.6 },
    );
    out.observe(sec);
    seen.observe(list);
    return () => {
      out.disconnect();
      seen.disconnect();
    };
  }, []);

  useEffect(
    () => () => {
      clearRun();
      cancelAnimationFrame(holdRaf.current);
      clearTimeout(toastTimer.current);
    },
    [],
  );

  const takeOver = () => {
    manualRef.current = true;
    setManual(true);
  };

  const send = () => {
    clearRun();
    setM({ sent: true, notified: 0, calling: true, clock: FULL, step: 0, line: 0.25 });
    P.people.forEach((_, i) =>
      timers.current.push(window.setTimeout(() => setM((v) => ({ ...v, notified: i + 1 })), 600 + i * 450)),
    );
    timers.current.push(
      window.setTimeout(() => setM((v) => ({ ...v, step: 1, line: 0.5 })), 600),
      window.setTimeout(() => setM((v) => ({ ...v, step: 2, line: 0.75 })), 2200),
    );
    clockTimer.current = window.setInterval(() => setM((v) => ({ ...v, clock: Math.max(0, v.clock - 1) })), 1000);
  };

  const startHold = () => {
    if (holdRaf.current || view.sent) return;
    takeOver();
    setHolding(true);
    const btn = hold.current;
    const t0 = performance.now();
    const tick = (t: number) => {
      const f = Math.min(1, (t - t0) / P.holdMs);
      btn?.style.setProperty("--fill", f.toFixed(3));
      if (f >= 1) {
        holdRaf.current = 0;
        setHolding(false);
        btn?.style.setProperty("--fill", "0");
        send();
        return;
      }
      holdRaf.current = requestAnimationFrame(tick);
    };
    holdRaf.current = requestAnimationFrame(tick);
  };

  const endHold = () => {
    if (!holdRaf.current) return;
    cancelAnimationFrame(holdRaf.current);
    holdRaf.current = 0;
    setHolding(false);
    hold.current?.style.setProperty("--fill", "0");
  };

  const stop = () => {
    takeOver();
    clearRun();
    setM({ sent: false, notified: 0, calling: false, clock: FULL, step: 3, line: 1 });
    setToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(false), 2600);
  };

  const view = manual ? m : fromScroll(at);
  // The button looks pressed while it fills, by hand or by scrolling
  const pressed = holding || (!manual && pinned && fillAt(at) > 0 && fillAt(at) < 1);

  return (
    <section
      ref={section}
      id="emergency"
      aria-labelledby="emx-h"
      className={s.section}
    >
      <div className={s.sticky}>
        <div
          className={s.panel}
          data-pinned={pinned || undefined}
          data-sent={view.sent || undefined}
          style={{ "--line": view.line } as CSSProperties}
        >
          <span className={s.glow} aria-hidden="true" />
          <span className={s.ripple} aria-hidden="true" />
          <span className={`${s.ripple} ${s.ripple2}`} aria-hidden="true" />

          {/* Right on wide screens: the heading */}
          <div className={s.copy}>
            <p className={s.kicker}>
              <i aria-hidden="true" />
              {E.kicker}
            </p>
            <h2 id="emx-h" className={s.h2}>
              {E.headline.lead} <em>{E.headline.accent}</em>
            </h2>
            <p className={s.sub}>{E.sub}</p>
            <p className={s.try}>
              <Icon name="arrow" strokeWidth={2} className={s.tryArrow} />
              {E.tryIt}
            </p>
          </div>

          {/* Middle: the app's Emergency share screen, working like the app */}
          <div className={s.phoneCol}>
            <div className={s.phoneWrap}>
              <div className={p.phone} role="group" aria-label={P.label}>
                <span className={`${p.btn} ${p.btnA}`} />
                <span className={`${p.btn} ${p.btnB}`} />
                <span className={`${p.btn} ${p.btnC}`} />
                <div className={`${p.screen} ${s.screen}`}>
                  {/* Dynamic Island: grows into the live "Sharing is on" panel */}
                  <div className={s.island} data-on={view.sent || undefined}>
                    <div className={s.islLive}>
                      <span className={s.liveDot} />
                      <span className={s.islT} aria-live="polite">
                        {view.sent && (
                          <>
                            <b>{P.island.title}</b>
                            <small>{P.island.small}</small>
                          </>
                        )}
                      </span>
                      <span className={s.islClock} aria-hidden="true">
                        {fmt(view.clock)}
                      </span>
                    </div>
                  </div>
                  <StatusBar />

                  <div className={s.app}>
                    <span className={s.back} aria-hidden="true">
                      <Icon name="left" strokeWidth={2.4} />
                      {P.back}
                    </span>
                    <p className={s.appH}>{P.title}</p>
                    <p className={s.appP}>{P.intro}</p>

                    <p className={s.appL}>{P.whatLabel}</p>
                    <div className={s.docs} role="group" aria-label={P.whatLabel}>
                      {P.docs.map((d, i) => (
                        <button
                          key={d.name}
                          type="button"
                          aria-pressed={docs[i]}
                          onClick={() => setDocs((v) => v.map((on, j) => (j === i ? !on : on)))}
                        >
                          <i>
                            <Icon name={d.icon} strokeWidth={2} />
                          </i>
                          <span>
                            <b>{d.name}</b>
                            <small>{d.detail}</small>
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className={s.lr}>
                      <p className={s.appL}>{P.whoLabel}</p>
                      <small>{P.expires}</small>
                    </div>
                    <ul className={s.people}>
                      {P.people.map((person, i) => (
                        <li key={person.name} data-ok={view.notified > i || undefined}>
                          <span className={s.av} style={{ background: person.color }}>
                            {person.initial}
                            <em aria-hidden="true">
                              <Icon name="check" strokeWidth={3.4} />
                            </em>
                          </span>
                          <b>{person.name}</b>
                          <small>{person.role}</small>
                        </li>
                      ))}
                    </ul>

                    <div className={s.holdArea}>
                      <button
                        ref={hold}
                        type="button"
                        className={s.hold}
                        data-holding={pressed || undefined}
                        aria-describedby="emx-hold-note"
                        onPointerDown={(e: PointerEvent) => {
                          e.preventDefault();
                          startHold();
                        }}
                        onPointerUp={endHold}
                        onPointerLeave={endHold}
                        onPointerCancel={endHold}
                        onContextMenu={(e) => e.preventDefault()}
                        onKeyDown={(e: KeyboardEvent) => {
                          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
                            e.preventDefault();
                            startHold();
                          }
                        }}
                        onKeyUp={(e: KeyboardEvent) => {
                          if (e.key === " " || e.key === "Enter") endHold();
                        }}
                      >
                        <Icon name="sos" strokeWidth={2.2} />
                        <span>{P.hold}</span>
                      </button>
                      <p id="emx-hold-note">{P.holdNote}</p>
                    </div>

                    {/* Sent: a sheet rises with who can see it and Klo's call */}
                    <div className={s.sheet} data-on={view.sent || undefined} inert={!view.sent}>
                      <span className={s.ok} aria-hidden="true">
                        <Icon name="check" strokeWidth={3} />
                      </span>
                      <b className={s.sheetT}>{P.sent.title}</b>
                      <p>{P.sent.body}</p>
                      <div className={s.call} data-on={view.calling || undefined}>
                        <span className={s.av} style={{ background: P.people[0].color }}>
                          {P.people[0].initial}
                        </span>
                        <span>
                          <b>{P.sent.calling}</b>
                          <small>{P.sent.callingRole}</small>
                        </span>
                        <i aria-hidden="true" />
                      </div>
                      <button type="button" onClick={stop}>
                        {P.sent.stop}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className={s.toast} data-on={toast || undefined} role="status">
              {toast ? P.stopped : ""}
            </p>
          </div>

          {/* Left on wide screens: one step at a time beside a progress line (a list elsewhere) */}
          <div className={s.stepsCol}>
            <span className={s.line} aria-hidden="true" />
            <ol ref={steps} className={s.steps}>
              {E.steps.map((st, i) => (
                <li
                  key={st.title}
                  data-active={view.step === i || undefined}
                  aria-current={pinned && view.step === i ? "step" : undefined}
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className={s.tick} aria-hidden="true" />
                  <span className={s.num} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className={s.stepText}>
                    <b>{st.title}</b> <span>{st.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
