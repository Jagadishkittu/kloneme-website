"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { privacy } from "@/content/privacy";
import { GlassIcon } from "./GlassIcon";
import s from "./privacy.module.css";

// In-app samples from v9's privacy section, each working like the app

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Vault unlocked with Face ID; the lock counts down while on screen and starts again at 5:00
export function VaultLock() {
  const v = privacy.vault;
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(v.seconds);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setLeft((n) => (n <= 1 ? v.seconds : n - 1)), 1000);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [v.seconds]);

  return (
    <div ref={ref} className={`${s.widget} ${s.vault}`}>
      <GlassIcon name="face" color="var(--lilac)" size="54px" />
      <div className={s.grow}>
        <small className={s.tag}>{v.label}</small>
        <b className={s.wTitle}>{v.title}</b>
        <span className={s.lockBar}>
          <i style={{ scale: `${left / v.seconds} 1` }} />
        </span>
        <small className={s.muted}>
          {v.locks}{" "}
          <b className={s.num}>
            {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
          </b>
        </small>
      </div>
      <GlassIcon name="lock" color="var(--lilac)" size="42px" solid className={s.padlock} />
    </div>
  );
}

// Daniel asks to see Leo's passport: pick how long, then approve or decline
export function AccessRequest() {
  const r = privacy.request;
  const [length, setLength] = useState(r.preset);
  const [done, setDone] = useState<string | null>(null);

  return (
    <div className={`${s.widget} ${s.request}`}>
      <div className={s.who}>
        <span className={s.av} style={{ background: r.who.color }}>
          {r.who.initial}
        </span>
        <div>
          <b className={s.wTitle}>{r.title}</b>
          <p className={s.muted}>{r.body}</p>
        </div>
      </div>
      <div className={s.reqActs} aria-live="polite">
        {done ? (
          <p className={s.done}>
            <Icon name="check" strokeWidth={2.4} />
            {done}
          </p>
        ) : (
          <>
            <div className={s.lengths} role="group" aria-label={r.lengthLabel}>
              {r.lengths.map((l) => (
                <button key={l} type="button" aria-pressed={l === length} onClick={() => setLength(l)}>
                  {l}
                </button>
              ))}
            </div>
            <div className={s.acts}>
              <button type="button" className={s.approve} onClick={() => setDone(r.approved(length))}>
                {r.approve}
              </button>
              <button type="button" className={s.decline} onClick={() => setDone(r.declined)}>
                {r.decline}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Shares that run out on their own (a ring and a bar of time left); Revoke ends one now
export function SharedNow() {
  const sh = privacy.shared;
  const [gone, setGone] = useState<number[]>([]);
  const [toast, setToast] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const revoke = (i: number) => {
    setGone((g) => [...g, i]);
    setToast(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(false), 2600);
  };

  return (
    <div className={`${s.widget} ${s.shared}`}>
      <span className={s.tag}>{sh.label}</span>
      <ul className={s.rows}>
        {sh.rows.map((row, i) => {
          const off = gone.includes(i);
          return (
            <li key={row.title} data-gone={off || undefined} style={{ "--left": off ? 0 : row.fill } as CSSProperties}>
              <span className={s.ring}>
                <span className={s.av} style={{ background: row.color }}>
                  {row.initial}
                </span>
              </span>
              <div className={s.grow}>
                <b className={s.wTitle}>{row.title}</b>
                <span className={s.timeBar}>
                  <i />
                </span>
                <small className={s.muted}>{off ? sh.revoked : row.left}</small>
              </div>
              <button type="button" className={s.revoke} disabled={off} onClick={() => revoke(i)}>
                {sh.revoke}
              </button>
            </li>
          );
        })}
      </ul>
      <p className={s.toast} data-on={toast || undefined} aria-live="polite">
        {toast ? sh.toast : ""}
      </p>
    </div>
  );
}

// Recent activity, arriving live: oldest first, each new view pushing in at the top; then it starts over
export function ActivityFeed() {
  const a = privacy.activity;
  const n = a.items.length;
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(n); // how many entries have arrived (all of them before it's seen)
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let timer = 0;
    let k = 0;
    // Steps of 1.3s: n arrivals, a pause on the full list, a fade, then it starts over
    const tick = () => {
      k = (k + 1) % (n + 4);
      setCount(Math.min(k, n));
      setFading(k === n + 3);
    };
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) {
        k = 0;
        setCount(0);
        setFading(false);
        timer = window.setInterval(tick, 1300);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [n]);

  // The latest `count` entries, newest (v9's first) on top
  const shown = a.items.slice(n - count);

  return (
    <div ref={ref} className={`${s.widget} ${s.activity}`}>
      <span className={s.tag}>
        {a.label}
        <i className={s.live} aria-hidden="true" />
      </span>
      <ol className={s.log} data-fading={fading || undefined}>
        {shown.map((item) => (
          <li key={item.text} style={{ "--dot": item.color } as CSSProperties}>
            <span>{item.text}</span>
            <small>{item.when}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Stealth Mode: the figure rolls in, shows the blur once, then one tap slides frosted glass over it
export function StealthToggle() {
  const st = privacy.stealth;
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [on, setOn] = useState(false);
  const [shown, setShown] = useState(st.value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const target = st.value;
        let step = 0;
        const steps = 16;
        const roll = window.setInterval(() => {
          step++;
          // Digits settle left to right; the rest keep rolling
          setShown(
            Array.from(target, (ch, i) =>
              /\d/.test(ch) && i / target.length >= step / steps ? String(Math.floor(Math.random() * 10)) : ch,
            ).join(""),
          );
          if (step >= steps) {
            clearInterval(roll);
            setShown(target);
            timers.push(
              window.setTimeout(() => !touched.current && setOn(true), 1000),
              window.setTimeout(() => !touched.current && setOn(false), 3200),
            );
          }
        }, 60);
        timers.push(roll);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => {
        clearInterval(t);
        clearTimeout(t);
      });
    };
  }, [st.value]);

  return (
    <div ref={ref} className={`${s.widget} ${s.stealthW}`} data-on={on || undefined}>
      <div className={s.stealthTop}>
        <span className={s.tag}>{st.label}</span>
        <button
          type="button"
          className={s.toggle}
          aria-pressed={on}
          aria-label={st.label}
          onClick={() => {
            touched.current = true;
            setOn((v) => !v);
          }}
        >
          <i />
        </button>
      </div>
      <span className={s.worthWrap}>
        <b className={s.worth}>{shown}</b>
        <span className={s.frost} aria-hidden="true">
          <Icon name="eyeoff" strokeWidth={2} />
        </span>
      </span>
      <small className={s.muted}>{st.caption}</small>
    </div>
  );
}
