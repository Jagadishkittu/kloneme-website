"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { closing } from "@/content/closing";
import { site } from "@/content/site";
import s from "./closing.module.css";

const W = closing.words;
const A = closing.android;

// The big glass padlock behind the heading (one shape, as in the reference), cropped by the panel
function Lock({ sweep }: { sweep: number }) {
  return (
    <svg className={s.lock} viewBox="0 0 600 780" aria-hidden="true">
      <defs>
        <linearGradient id="glass-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34333b" />
          <stop offset="0.55" stopColor="#24232a" />
          <stop offset="1" stopColor="#1d1c22" />
        </linearGradient>
        <radialGradient id="glass-tint" cx="0.3" cy="0.15" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glass-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="glass-shape">
          <path d="M110 350V230a190 190 0 01380 0v120h-78V230a112 112 0 00-224 0v120z" />
          <rect x="60" y="330" width="480" height="440" rx="74" />
        </clipPath>
      </defs>

      {/* Shackle: lifts when the download button is hovered */}
      <g className={s.shackle}>
        <path
          d="M110 350V230a190 190 0 01380 0v120h-78V230a112 112 0 00-224 0v120z"
          fill="url(#glass-face)"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="2"
        />
      </g>

      {/* Body, with the word's colour caught in the glass and a keyhole pressed in */}
      <rect x="60" y="330" width="480" height="440" rx="74" fill="url(#glass-face)" />
      <rect x="60" y="330" width="480" height="440" rx="74" fill="url(#glass-tint)" />
      <rect
        x="61"
        y="331"
        width="478"
        height="438"
        rx="73"
        fill="none"
        stroke="rgba(255,255,255,0.13)"
        strokeWidth="2"
      />
      <rect x="74" y="344" width="452" height="412" rx="62" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
      <g className={s.keyhole}>
        <circle cx="300" cy="510" r="50" />
        <path d="M276 545l-18 110h84l-18-110z" />
      </g>

      {/* A light runs across the glass each time the word changes */}
      <g clipPath="url(#glass-shape)">
        <rect key={sweep} className={s.sweep} x="-260" y="-40" width="220" height="880" fill="url(#glass-sweep)" />
      </g>
    </svg>
  );
}

// v9's Android sign-up: the form sits in the row beside App Store; its line and message centre below
function useNotify() {
  const [msg, setMsg] = useState<{ text: string; err?: boolean } | null>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const v = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setMsg({ text: A.invalid, err: true });
      return;
    }
    setMsg({ text: A.thanks(v) });
    input.value = "";
  };
  const form = (
    <form className={s.form} noValidate onSubmit={submit}>
      <label className="sr-only" htmlFor="get-email">
        {A.label}
      </label>
      <input
        id="get-email"
        name="email"
        type="email"
        placeholder={A.placeholder}
        autoComplete="email"
        aria-describedby="get-android"
      />
      <button type="submit">{A.button}</button>
    </form>
  );
  const notes = (
    <>
      <p id="get-android" className={s.androidLine}>
        {A.line}
      </p>
      <p className={s.formMsg} data-err={msg?.err || undefined} role="status">
        {msg?.text ?? ""}
      </p>
    </>
  );
  return { form, notes };
}

export default function GlassPanel() {
  const panel = useRef<HTMLDivElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const notify = useNotify();

  // v9's rotating word: out, swap (word and colour), back in; paused off-screen
  useEffect(() => {
    const el = panel.current;
    if (!el || still) return;
    let tick = 0;
    let swap = 0;
    const run = () => {
      tick = window.setInterval(() => {
        setOut(true);
        swap = window.setTimeout(() => {
          setI((n) => (n + 1) % W.length);
          setOut(false);
        }, 350);
      }, closing.step * 1000);
    };
    const io = new IntersectionObserver(([e]) => {
      clearInterval(tick);
      if (e.isIntersecting) run();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [still]);

  return (
    <div ref={panel} className={s.panel} style={{ "--wc": W[i].color } as CSSProperties}>
      <span className={s.dots} aria-hidden="true" />
      <span className={`${s.corner} ${s.cornerL}`} aria-hidden="true" />
      <span className={`${s.corner} ${s.cornerR}`} aria-hidden="true" />
      <Lock sweep={i} />

      <div className={s.content}>
        <p className={s.kicker}>
          <i aria-hidden="true" />
          {closing.kicker}
        </p>
        <h2 id="get-h" className={s.h2}>
          {closing.headline}
          <br />
          <span className={s.rot} aria-live="off">
            <em data-out={out || undefined}>{W[i].word}</em>
          </span>
        </h2>
        {/* App Store and the Android sign-up side by side, on the centre line */}
        <div className={s.actions}>
          <a
            href={site.downloadUrl}
            target="_blank"
            rel="noopener"
            aria-label={closing.appStore.label}
            className={s.store}
          >
            <Icon name="apple" className={s.apple} />
            <span>
              <small>{closing.appStore.small}</small>
              <b>{closing.appStore.big}</b>
            </span>
          </a>
          {notify.form}
        </div>
        {notify.notes}
      </div>
    </div>
  );
}
