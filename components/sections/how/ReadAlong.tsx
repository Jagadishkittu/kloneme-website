"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { how } from "@/content/how";
import s from "./how.module.css";

const STEPS = how.steps;
const N = STEPS.length;
const READ = 0.75; // share of each step's scroll spent lighting its words (the rest holds it fully lit)

type Part = "title" | "quote" | "body";
type Word = { t: string; part: Part; n: number };

// Every step's words in reading order: title, then the spoken quote (step 3), then the rest
const WORDS = STEPS.map((st) => {
  let n = 0;
  const split = (text: string | undefined, part: Part) =>
    (text ?? "").split(" ").filter(Boolean).map((t) => ({ t, part, n: n++ }));
  const words: Word[] = [...split(st.title, "title"), ...split(st.quote, "quote"), ...split(st.body, "body")];
  return words;
});

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function ReadAlong() {
  const section = useRef<HTMLElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [pos, setPos] = useState({ step: 0, lit: 0 });

  // Scrolling through the pinned stretch reads the steps: each step's words light up in turn
  useEffect(() => {
    const sec = section.current;
    if (!sec || still) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const at = run > 0 ? clamp(-r.top / run) : 0;
      const step = Math.min(N - 1, Math.floor(at * N));
      const lit = Math.round(clamp((at * N - step) / READ) * WORDS[step].length);
      setPos((p) => (p.step === step && p.lit === lit ? p : { step, lit }));
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

  // A pill jumps to its step, fully read
  const go = (i: number) => {
    const sec = section.current;
    if (!sec) return;
    const smooth = still ? "auto" : "smooth";
    if (still) {
      sec.querySelectorAll("[data-para]")[i]?.scrollIntoView({ behavior: smooth, block: "center" });
      return;
    }
    const run = sec.offsetHeight - window.innerHeight;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + READ + 0.05) / N) * run, behavior: smooth });
  };

  const litIn = (i: number) => (still || i < pos.step ? WORDS[i].length : i === pos.step ? pos.lit : 0);

  return (
    <section ref={section} id="how" aria-labelledby="how-h" className={s.section} data-still={still || undefined}>
      <div className={s.sticky}>
        <div className={s.col}>
          <p className={s.kicker}>
            <i aria-hidden="true" />
            {how.kicker}
          </p>
          <h2 id="how-h" className={s.h2}>
            <span className={s.lead}>{how.headline.lead}</span> <span className={s.accent}>{how.headline.accent}</span>
          </h2>

          {/* The steps as coloured pills; the one being read fills as its words light up */}
          <div className={s.pills} role="group" aria-label={how.kicker}>
            {STEPS.map((st, i) => {
              const f = litIn(i) / WORDS[i].length;
              const label = (
                <span className={s.pLabel}>
                  <span className={s.emo} data-anim={st.anim} aria-hidden="true">
                    <span>{st.emoji}</span>
                  </span>
                  {st.label}
                </span>
              );
              return (
                <button
                  key={st.label}
                  type="button"
                  className={s.pill}
                  data-on={(!still && i === pos.step) || undefined}
                  aria-current={!still && i === pos.step ? "step" : undefined}
                  style={{ "--c": st.color, "--t": st.tint, "--f": f } as CSSProperties}
                  onClick={() => go(i)}
                >
                  {label}
                  <span className={s.pFill} aria-hidden="true">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* The step being read, as one big two-tone paragraph lighting up word by word */}
          <div className={s.read}>
            {STEPS.map((st, i) => {
              const lit = litIn(i);
              const words = WORDS[i];
              const quote = words.filter((w) => w.part === "quote");
              const speaking = quote.length > 0 && lit > quote[0].n && lit <= quote[quote.length - 1].n + 1;
              const show = (part: Part) =>
                words
                  .filter((w) => w.part === part)
                  .map((w) => (
                    <span key={w.n} className={s.w} data-lit={w.n < lit || undefined}>
                      {w.t}{" "}
                    </span>
                  ));
              return (
                <p
                  key={st.label}
                  data-para
                  className={s.para}
                  data-active={still || i === pos.step || undefined}
                  style={{ "--c": st.color } as CSSProperties}
                >
                  <span className={s.title}>{show("title")}</span>
                  {st.quote && (
                    <span className={s.quote} data-speaking={speaking || undefined}>
                      <span className={s.mic} aria-hidden="true">
                        <Icon name="mic" strokeWidth={2.2} />
                      </span>
                      {show("quote")}
                    </span>
                  )}
                  <span className={s.body}>{show("body")}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
