"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/contact";
import s from "./contact.module.css";

const F = contact.form;
const TOPICS = [
  ...contact.topics,
  { key: "other", emoji: "", anim: "bounce" as const, title: contact.other, body: "" },
];
const TINT: Record<string, string> = { help: "#ddebfc", partners: "#d6f3ef", press: "#ffe3df", other: "#f1eef4" };

// Picking a topic unfolds its card into the form (a view transition where the browser has one)
function morph(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return update();
  doc.startViewTransition(() => flushSync(update));
}

export default function TopicUnfold() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0].key);
  const [sent, setSent] = useState(false);
  const timer = useRef(0);
  const name = useRef<HTMLInputElement>(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (key: string) =>
    morph(() => {
      setTopic(key);
      setOpen(true);
    });

  // Focus the first field once the card has unfolded
  useEffect(() => {
    if (open) name.current?.focus({ preventScroll: true });
  }, [open]);

  // Not wired to anything yet (v9's form isn't either): confirm, clear, and let the button settle
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSent(false), 5000);
  };

  const t = TOPICS.find((x) => x.key === topic) ?? TOPICS[0];

  return (
    <div className={s.unfold} data-open={open || undefined}>
      {/* The topics as quiet rows in one card (wide screens, before one is picked) */}
      <ul className={s.pickView}>
        {TOPICS.map((x) => (
          <li key={x.key}>
            <button
              type="button"
              className={s.row}
              style={{ viewTransitionName: `ct-${x.key}`, "--t": TINT[x.key] } as CSSProperties}
              onClick={() => pick(x.key)}
            >
              <span className={s.emo} data-anim={x.anim} aria-hidden="true">
                {x.emoji ? <span>{x.emoji}</span> : <Icon name="mail" strokeWidth={1.9} />}
              </span>
              <span className={s.rowText}>
                <b>{x.title}</b>
                {x.body && <span>{x.body}</span>}
              </span>
              <span className={s.go} aria-hidden="true">
                <Icon name="arrow" strokeWidth={2} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* The form, unfolded from the picked card (always shown on phones) */}
      <form
        className={s.form}
        style={{ viewTransitionName: open ? `ct-${topic}` : undefined, "--t": TINT[topic] } as CSSProperties}
        onSubmit={submit}
      >
        <div className={s.formHead}>
          <span className={s.emo} data-anim={t.anim} aria-hidden="true">
            {t.emoji ? <span>{t.emoji}</span> : <Icon name="mail" strokeWidth={1.9} />}
          </span>
          <span className={s.fhText}>
            <b>{t.title}</b>
            {t.body && <span>{t.body}</span>}
          </span>
          <button
            type="button"
            className={s.close}
            aria-label={F.back}
            onClick={() => morph(() => setOpen(false))}
          >
            <Icon name="close" strokeWidth={2} />
          </button>
        </div>

        <fieldset className={s.topics}>
          <legend>{F.topic}</legend>
          <div className={s.tPills}>
            {TOPICS.map((x) => (
              <label key={x.key} className={s.tPill}>
                <input
                  type="radio"
                  name="topic"
                  value={x.title}
                  checked={topic === x.key}
                  onChange={() => setTopic(x.key)}
                />
                <span>
                  {x.emoji && <span aria-hidden="true">{x.emoji}</span>}
                  {x.title}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={s.row2}>
          <div>
            <label htmlFor="ctName">{F.name.label}</label>
            <input ref={name} id="ctName" name="name" autoComplete="name" placeholder={F.name.placeholder} />
          </div>
          <div>
            <label htmlFor="ctEmail">{F.email.label}</label>
            <input
              id="ctEmail"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={F.email.placeholder}
            />
          </div>
        </div>
        <label htmlFor="ctMsg">{F.message.label}</label>
        <textarea id="ctMsg" name="message" required placeholder={F.message.placeholder} />

        <div className={s.sendRow}>
          <button type="submit" className={s.submit} data-sent={sent || undefined}>
            <span className={s.sendLabel}>
              {F.send}
              <Icon name="arrow" strokeWidth={2} />
            </span>
            <span className={s.sentIcon} aria-hidden="true">
              <Icon name="check" strokeWidth={2.6} />
            </span>
          </button>
          <p className={s.status} role="status">
            {sent ? F.sent : ""}
          </p>
        </div>
      </form>
    </div>
  );
}
