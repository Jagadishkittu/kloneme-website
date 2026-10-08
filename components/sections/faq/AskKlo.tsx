"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { faq } from "@/content/faq";
import { klo } from "@/content/klo";
import s from "./faq.module.css";

const ITEMS = faq.items;
const THINK = 900; // ms Klo thinks before answering
const WORD = 0.028; // s between words as the answer streams in

type Exchange = { id: number; i: number };

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function AskKlo() {
  const thread = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  // v9 opens the first question, so the chat starts with it answered
  const [log, setLog] = useState<Exchange[]>([{ id: 0, i: 0 }]);
  const [thinking, setThinking] = useState<number | null>(null); // id of the exchange Klo is thinking about
  const [streaming, setStreaming] = useState<number | null>(null); // id of the answer streaming in
  const [flash, setFlash] = useState<number | null>(null);

  const latest = log[log.length - 1];
  const busy = thinking !== null;

  // Keep the newest exchange in view (scrolls the chat, never the page)
  useEffect(() => {
    const el = thread.current;
    if (!el || log.length === 1) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced() ? "auto" : "smooth" });
  }, [log.length, thinking]);

  useEffect(() => {
    if (thinking === null) return;
    const t = window.setTimeout(() => {
      setThinking(null);
      setStreaming(thinking);
    }, THINK);
    return () => clearTimeout(t);
  }, [thinking]);

  useEffect(() => {
    if (flash === null) return;
    const t = window.setTimeout(() => setFlash(null), 1400);
    return () => clearTimeout(t);
  }, [flash]);

  const ask = (i: number) => {
    // Already answered: bring that answer back into view instead of asking again
    const prior = log.find((x) => x.i === i);
    if (prior && !(busy && prior.id === latest.id)) {
      const el = thread.current?.querySelector<HTMLElement>(`[data-ex="${prior.id}"]`);
      if (el && thread.current) {
        thread.current.scrollTo({ top: el.offsetTop - 16, behavior: reduced() ? "auto" : "smooth" });
      }
      setFlash(prior.id);
      return;
    }
    if (prior) return;
    const id = nextId.current++;
    setLog((l) => [...l, { id, i }]);
    setStreaming(null);
    if (reduced()) return;
    setThinking(id);
  };

  const face = thinking !== null ? "thinking" : ITEMS[latest.i].face;

  return (
    <div className={s.panel}>
      <header className={s.bar}>
        <span className={s.avatar} aria-hidden="true">
          <Image key={face} src={`/klo/${face}.png`} alt="" width={528} height={456} sizes="48px" />
        </span>
        <span className={s.who}>
          <b>{klo.phone.title}</b>
          <small>
            <Icon name="shield" strokeWidth={2.2} />
            {klo.phone.status}
          </small>
        </span>
      </header>

      <div ref={thread} className={s.thread} role="log">
        {log.map(({ id, i }) => {
          const item = ITEMS[i];
          const isThinking = thinking === id;
          const words = item.a.split(" ");
          return (
            <div key={id} data-ex={id} className={s.ex} data-flash={flash === id || undefined}>
              <p className={s.you}>{item.q}</p>
              <div className={s.reply}>
                <span className={s.face} aria-hidden="true">
                  <Image
                    src={`/klo/${isThinking ? "thinking" : item.face}.png`}
                    alt=""
                    width={528}
                    height={456}
                    sizes="36px"
                  />
                </span>
                {isThinking ? (
                  <span className={s.thinking}>
                    <span className={s.shimmer}>{klo.phone.thinking}</span>
                  </span>
                ) : (
                  <p className={s.answer} data-stream={streaming === id || undefined}>
                    {words.map((w, j) => (
                      <span key={j} style={{ "--d": `${j * WORD}s` } as CSSProperties}>
                        {w}{" "}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={s.ask}>
        <p className={s.try}>{klo.tryLabel}</p>
        <div className={s.chips}>
          {ITEMS.map((item, i) => {
            const asked = log.some((x) => x.i === i);
            return (
              <button
                key={item.q}
                type="button"
                className={s.chip}
                data-asked={asked || undefined}
                data-current={latest.i === i || undefined}
                onClick={() => ask(i)}
              >
                {asked && <Icon name="check" strokeWidth={2.4} />}
                {item.q}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
