"use client";

import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties, type FocusEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { klo } from "@/content/klo";
import ThoughtField from "./ThoughtField";
import s from "./klo.module.css";

const { phone, pains, checkIn } = klo;
const P = pains.length;

// Check-in card timeline (seconds): Klo greets, you reply, Klo thinks, then its answer streams in
const STREAM_AT = 3.6;
const WORD_STEP = 0.07;
// Each check-in's answer split into words (spaces kept as plain text), and when its source lands
const CHATS = checkIn.chats.map((c) => {
  let words = 0;
  const answer = c.answer
    .split(/(\s+)/)
    .filter(Boolean)
    .map((t) => (/^\s+$/.test(t) ? { t, w: -1 } : { t, w: words++ }));
  return { ...c, answer, last: words - 1, srcAt: STREAM_AT + words * WORD_STEP + 0.3 };
});

// Hovering or focusing something holds its timer (CSS pauses the bar that drives it)
function useHold() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  return {
    held: hovered || focused,
    on: {
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (e: FocusEvent<HTMLElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      },
    },
  };
}

// Only the element's own animation, not one bubbling up from inside it
const own = (fn: () => void) => (e: AnimationEvent) => {
  if (e.target === e.currentTarget) fn();
};

export default function KloBento() {
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [pain, setPain] = useState(0);
  const [painRun, setPainRun] = useState(0);
  const [loop, setLoop] = useState(0); // each play of the check-in card shows the next chat
  const painHold = useHold();
  const chat = CHATS[loop % CHATS.length];

  const pick = (i: number) => {
    setPain(((i % P) + P) % P);
    setPainRun((r) => r + 1);
  };

  // Everything waits until the cards are on screen, and pauses again when they leave
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={s.bento}
      data-paused={!onScreen || undefined}
      style={{ "--pain-step": `${klo.painStep}s` } as CSSProperties}
    >
      {/* Scattered family life: thoughts drifting through your head */}
      <ThoughtField />

      {/* The pain of daily life: v9's pain points as tiles; each is lit in turn, its bar running */}
      <div className={`${s.card} ${s.painCard}`} data-hold={painHold.held || undefined} {...painHold.on}>
        <div className={s.tilesWindow}>
          <ul className={s.tiles} aria-label={klo.painsLabel} style={{ "--at": pain, "--n": P } as CSSProperties}>
            {pains.map((t, i) => {
              const on = i === pain;
              return (
                <li key={t.title} className={s.tileItem}>
                  <button
                    type="button"
                    className={s.tile}
                    data-on={on || undefined}
                    aria-pressed={on}
                    onClick={() => pick(i)}
                  >
                    <span className={s.tileHead}>
                      <Icon name={t.icon} strokeWidth={1.9} className={s.tileIcon} />
                      {t.title}
                    </span>
                    <span className={s.tileBar} aria-hidden="true">
                      {on && <span key={painRun} className={s.tileFill} onAnimationEnd={own(() => pick(pain + 1))} />}
                    </span>
                    <span className={s.tileBody}>{t.body}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <span className={s.dots} aria-hidden="true">
          {pains.map((t, i) => (
            <i key={t.title} data-on={i === pain || undefined} />
          ))}
        </span>
      </div>

      {/* Morning check-ins, a new one each play: Klo greets you, you reply, Klo thinks, then its answer streams in */}
      <div className={`${s.card} ${s.checkCard}`}>
        {onScreen && (
          <div
            key={loop}
            className={s.check}
            style={{ "--loop": `${checkIn.loop}s`, "--src-at": `${chat.srcAt}s`, "--stream-at": `${STREAM_AT}s` } as CSSProperties}
            onAnimationEnd={own(() => setLoop((l) => l + 1))}
          >
            <p className={s.tKlo}>{chat.klo}</p>
            <p className={s.tYou}>{chat.you}</p>
            <div className={s.reply}>
              <span className={s.cThink} aria-hidden="true">
                <span className={s.orb} />
                <span className={s.shimmer}>{phone.thinking}</span>
              </span>
              <p className={s.tAnswer}>
                {chat.answer.map(({ t, w }, i) =>
                  w < 0 ? (
                    t
                  ) : (
                    <span
                      key={i}
                      className={s.w}
                      data-last={w === chat.last || undefined}
                      style={{ "--d": `${STREAM_AT + w * WORD_STEP}s` } as CSSProperties}
                    >
                      {t}
                    </span>
                  ),
                )}
              </p>
            </div>
            <span className={s.cSrc}>
              <Icon name={chat.icon} strokeWidth={2} />
              {chat.source}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
