"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMedia } from "@/components/ui/useMedia";
import { features, type ScreenKey } from "@/content/features";
import { StatusBar } from "../hero/PhoneDemo";
import { SCREENS } from "./Screens";
import s from "./features.module.css";

const F = features;

// Every phone screen in order, with the step it belongs to
const FLOW = F.steps.flatMap((st, step) => st.screens.map((key) => ({ key, step })));

// Seconds each screen holds: on the timer (small screens) and as its share of the scroll (pinned)
const HOLD: Record<ScreenKey, number> = {
  auth: 3.6,
  chat: 5.4,
  travel: 3.8,
  goals: 3.4,
  hobbies: 3.4,
  vault: 3.6,
  calendar: 3.6,
  chores: 4,
  memories: 3.4,
  emergency: 5.6,
};
const STARTS = FLOW.map((_, i) => FLOW.slice(0, i).reduce((t, f) => t + HOLD[f.key], 0));
const TOTAL = STARTS[FLOW.length - 1] + HOLD[FLOW[FLOW.length - 1].key];
const END = 0.97; // the last screen holds for the final stretch of the pin
const FIRST = F.steps.map((_, i) => FLOW.findIndex((f) => f.step === i));
const STEP_AT = FIRST.map((i) => (STARTS[i] / TOTAL) * END); // where each step starts on the progress line

// Screens with a dark top, where the status bar turns white
const DARK = new Set<ScreenKey>(["travel", "goals", "hobbies", "vault"]);

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const pad = (n: number) => String(n).padStart(2, "0");

export default function FeatureStory() {
  const section = useRef<HTMLElement>(null);
  const pinned = useMedia("(min-width: 1080px) and (prefers-reduced-motion: no-preference)");
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  // Scroll: --enter as the section arrives; on wide screens the pinned stretch picks the screen
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
      const at = run > 0 ? clamp(-r.top / run) : 0;
      sec.style.setProperty("--line", at.toFixed(4));
      const t = clamp(at / END) * TOTAL;
      let i = 0;
      while (i < FLOW.length - 1 && STARTS[i + 1] <= t) i++;
      setIdx(i);
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

  // Loops pause while the section is off-screen
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  // Elsewhere the phone moves on by itself while it's on screen
  useEffect(() => {
    if (pinned || still || !visible) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % FLOW.length), HOLD[FLOW[idx].key] * 1000);
    return () => clearTimeout(t);
  }, [idx, pinned, still, visible]);

  // A step or screen picked by hand: scroll to it when pinned, otherwise show it
  const goTo = (i: number) => {
    const sec = section.current;
    if (!pinned || !sec) {
      setIdx(i);
      return;
    }
    const run = sec.offsetHeight - window.innerHeight;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + run * (STARTS[i] / TOTAL) * END + 2, behavior: "smooth" });
  };

  const cur = FLOW[idx];
  const step = cur.step;

  return (
    <section
      ref={section}
      id="features"
      aria-labelledby="ft-h"
      className={s.section}
      data-paused={!visible || undefined}
    >
      <div className={s.sticky}>
        <div
          className={s.panel}
          data-pinned={pinned || undefined}
          style={{ "--glow": F.screens[cur.key].glow, "--c": F.steps[step].color } as CSSProperties}
        >
          <span className={s.glow} aria-hidden="true" />

          {/* Right on wide screens: the heading */}
          <div className={s.copy}>
            <h2 id="ft-h" className={s.h2}>
              {F.headline.lead} <em>{F.headline.accent}</em>
            </h2>
            <p className={s.sub}>{F.sub}</p>
          </div>

          {/* Middle: the app screen (no phone frame), showing the screens for the current step */}
          <div className={s.phoneCol}>
            <div className={s.phoneWrap}>
              <div
                className={s.screen}
                role="img"
                aria-label={`${F.phone.label}: ${F.screens[cur.key].label}`}
                data-dark={DARK.has(cur.key) || undefined}
              >
                <StatusBar />
                {FLOW.map((f, i) => {
                  const Screen = SCREENS[f.key];
                  return (
                    <div
                      key={f.key}
                      className={`${s.scr} ${s[f.key]}`}
                      data-pos={i === idx ? "on" : i < idx ? "past" : "next"}
                      aria-hidden="true"
                    >
                      <Screen />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Left on wide screens: the step beside a progress line (a list of steps elsewhere) */}
          <div className={s.stepsCol}>
            <div className={s.rail}>
              <span className={s.line} aria-hidden="true" />
              {F.steps.map((st, i) => (
                <button
                  key={st.title}
                  type="button"
                  className={s.dot}
                  style={{ "--at": STEP_AT[i] } as CSSProperties}
                  data-on={step >= i || undefined}
                  aria-label={`${pad(i + 1)} ${st.title}`}
                  aria-current={step === i ? "step" : undefined}
                  onClick={() => goTo(FIRST[i])}
                />
              ))}
            </div>
            <ol className={s.steps}>
              {F.steps.map((st, i) => (
                <li
                  key={st.title}
                  data-active={step === i || undefined}
                  style={{ "--c": st.color } as CSSProperties}
                >
                  <button
                    type="button"
                    className={s.stepBtn}
                    aria-current={step === i ? "step" : undefined}
                    onClick={() => goTo(FIRST[i])}
                  >
                    <span className={s.num} aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <span className={s.stepText}>
                      <b>{st.title}</b> <span>{st.body}</span>
                    </span>
                  </button>
                  {st.screens.length > 1 && (
                    <span className={s.chips}>
                      {st.screens.map((k) => {
                        const at = FLOW.findIndex((f) => f.key === k);
                        return (
                          <button
                            key={k}
                            type="button"
                            data-on={at === idx || undefined}
                            aria-pressed={at === idx}
                            onClick={() => goTo(at)}
                          >
                            {F.screens[k].label}
                          </button>
                        );
                      })}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
