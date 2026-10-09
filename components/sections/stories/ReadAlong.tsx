"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { stories } from "@/content/stories";
import s from "./stories.module.css";

const LIST = stories.list;
const N = LIST.length;
const READ = 0.75; // share of each story's scroll spent lighting its words (the rest holds it fully lit)

type Part = "quote" | "effect";
type Word = { t: string; part: Part; n: number };

// Every story's words in reading order: the quote, then the KloneME effect
const WORDS = LIST.map((st) => {
  let n = 0;
  const split = (text: string, part: Part) =>
    text
      .split(" ")
      .filter(Boolean)
      .map((t) => ({ t, part, n: n++ }));
  const words: Word[] = [...split(st.quote, "quote"), ...split(st.effect, "effect")];
  return words;
});

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function ReadAlong() {
  const section = useRef<HTMLElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [pos, setPos] = useState({ step: 0, lit: 0 });

  // Scrolling through the pinned stretch reads the stories: each story's words light up in turn
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

  // A pill jumps to its story, fully read
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
    <section ref={section} id="stories" aria-labelledby="stories-h" className={s.section} data-still={still || undefined}>
      {/* Transition from the dark Calendar section: a light sheet whose rounded top corners flatten as it scrolls in */}
      <span className={s.backing} aria-hidden="true" />
      <span className={s.sheet} aria-hidden="true" />
      <div className={s.sticky}>
        <div className={s.col}>
          <h2 id="stories-h" className={s.h2}>
            <span className={s.lead}>{stories.headline.lead}</span>{" "}
            <span className={s.accent}>{stories.headline.accent}</span>
          </h2>
          <p className={s.sub}>{stories.sub}</p>
          <p className={s.note}>
            <Icon name="info" strokeWidth={2} />
            {stories.note}
          </p>

          {/* The people as coloured pills; the one being read fills as its words light up */}
          <div className={s.pills} role="group" aria-label={stories.label}>
            {LIST.map((st, i) => {
              const f = litIn(i) / WORDS[i].length;
              const label = (
                <span className={s.pLabel}>
                  <span className={s.av} aria-hidden="true">
                    {st.initials}
                  </span>
                  <span className={s.pName}>{st.name}</span>
                </span>
              );
              return (
                <button
                  key={st.name}
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

          {/* The story being read: the quote lighting up word by word, then its KloneME effect, then who said it */}
          <div className={s.read}>
            {LIST.map((st, i) => {
              const lit = litIn(i);
              const words = WORDS[i];
              const show = (part: Part) =>
                words
                  .filter((w) => w.part === part)
                  .map((w) => (
                    <span key={w.n} className={s.w} data-lit={w.n < lit || undefined}>
                      {w.t}{" "}
                    </span>
                  ));
              return (
                <figure
                  key={st.name}
                  data-para
                  className={s.para}
                  data-active={still || i === pos.step || undefined}
                  data-done={lit >= words.length || undefined}
                  style={{ "--c": st.color, "--t": st.tint } as CSSProperties}
                >
                  <blockquote className={s.title}>{show("quote")}</blockquote>
                  <p className={s.effect}>
                    <span className={s.effLabel}>
                      <span aria-hidden="true">{st.emoji}</span> {stories.effectLabel}
                    </span>
                    <span className={s.body}>{show("effect")}</span>
                  </p>
                  <figcaption className={s.who}>
                    <span className={s.whoAv} aria-hidden="true">
                      {st.initials}
                    </span>
                    <span className={s.whoT}>
                      <b>{st.name}</b>
                      <span>
                        {st.role} · {st.place}
                      </span>
                    </span>
                    <span className={s.tags}>
                      {st.tags.map((t) => (
                        <span
                          key={t}
                          style={{ "--c": stories.tags[t].color, "--t": stories.tags[t].tint } as CSSProperties}
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className={s.klo}>
                      <Image src={`/klo/${st.face}.png`} alt="" width={528} height={456} sizes="40px" />
                      <em>{st.mood}</em>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
