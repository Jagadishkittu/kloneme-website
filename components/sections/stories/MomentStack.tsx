"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { stories } from "@/content/stories";
import s from "./stories.module.css";

const M = stories.moments;
const ORDER = ["stealth", "shared", "emergency", "request"] as const;
type Key = (typeof ORDER)[number];

const ICON: Record<Key, IconName> = { stealth: "eyeoff", shared: "clock", emergency: "sos", request: "check" };
const ACTION: Record<Key, string> = {
  stealth: M.stealth.action,
  shared: M.shared.action,
  emergency: M.emergency.action,
  request: M.request.action,
};

// Timeline for each card (ms): the pill hops on, presses, the card resolves, then on to the next
const ARRIVE = 650;
const PRESS = 1100;
const NEXT = 3400;

function Card({ k, active, done, children }: { k: Key; active: boolean; done: boolean; children: ReactNode }) {
  return (
    <li className={`${s.card} ${s[k]}`} data-active={active || undefined} data-done={done || undefined}>
      {children}
      {/* The dark action pill, Sol's "Share doc": it hops onto the card being resolved */}
      <span className={s.pill} aria-hidden="true">
        <Icon name={ICON[k]} strokeWidth={2} />
        {ACTION[k]}
      </span>
    </li>
  );
}

export default function MomentStack() {
  const ref = useRef<HTMLUListElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(-1); // the card the pill is on (-1 before it starts)
  const [done, setDone] = useState<number[]>([]);
  const [onScreen, setOnScreen] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setOnScreen(e.isIntersecting);
        if (e.intersectionRatio >= 0.35) el.setAttribute("data-seen", "");
      },
      { threshold: [0, 0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The pill moves on to the next card; after the last one the stack resets and it starts again.
  // Pauses on hover and off-screen.
  useEffect(() => {
    if (still || !onScreen || hover) return;
    const t = window.setTimeout(
      () => {
        const next = active + 1;
        if (next >= ORDER.length) {
          setDone([]);
          setActive(-1);
        } else setActive(next);
      },
      active < 0 ? ARRIVE : NEXT,
    );
    return () => clearTimeout(t);
  }, [active, onScreen, hover, still]);

  // Once it lands, the pill presses and the card resolves
  useEffect(() => {
    if (active < 0 || still) return;
    const t = window.setTimeout(() => setDone((d) => (d.includes(active) ? d : [...d, active])), PRESS);
    return () => clearTimeout(t);
  }, [active, still]);

  const isOn = (k: Key) => (still ? k === "request" : active === ORDER.indexOf(k));
  const isDone = (k: Key) => !still && done.includes(ORDER.indexOf(k));

  return (
    <ul
      ref={ref}
      className={s.stack}
      aria-label={stories.label}
      data-still={still || undefined}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* Stealth Mode: the net worth frosts over */}
      <Card k="stealth" active={isOn("stealth")} done={isDone("stealth")}>
        <header className={s.cHead}>
          <span>{M.stealth.label}</span>
          <i className={s.toggle} aria-hidden="true" />
        </header>
        <div className={s.worthWrap}>
          <b className={s.worth}>{M.stealth.value}</b>
          <span className={s.frost} aria-hidden="true">
            <Icon name="eyeoff" strokeWidth={2} />
          </span>
        </div>
      </Card>

      {/* Shares that run out: the first one is revoked */}
      <Card k="shared" active={isOn("shared")} done={isDone("shared")}>
        <header className={s.cHead}>
          <span>{M.shared.label}</span>
        </header>
        <ul className={s.rows}>
          {M.shared.rows.map((row, i) => (
            <li key={row.title} style={{ "--left": row.fill } as CSSProperties} data-first={i === 0 || undefined}>
              <span className={s.av} style={{ background: row.color }}>
                {row.initial}
              </span>
              <span className={s.grow}>
                <b>{row.title}</b>
                <span className={s.bar}>
                  <i />
                </span>
                <small>
                  <span className={s.was}>{row.left}</span>
                  {i === 0 && <span className={s.now}>{M.shared.revoked}</span>}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Emergency share: held, sent, Klo calls Daniel */}
      <Card k="emergency" active={isOn("emergency")} done={isDone("emergency")}>
        <header className={s.cHead}>
          <span>{M.emergency.label}</span>
          <i className={s.live} aria-hidden="true" />
        </header>
        <p className={s.cBody}>{M.emergency.intro}</p>
        <div className={s.people}>
          {M.emergency.people.map((p) => (
            <span key={p.name} className={s.av} style={{ background: p.color }} title={p.name}>
              {p.initial}
              <em aria-hidden="true">
                <Icon name="check" strokeWidth={3.4} />
              </em>
            </span>
          ))}
        </div>
        <div className={s.sentRow}>
          <div>
            <b className={s.sentT}>{M.emergency.sent}</b>
            <span className={s.call}>
              <span className={s.av} style={{ background: M.emergency.people[0].color }}>
                {M.emergency.people[0].initial}
              </span>
              <span>
                <b>{M.emergency.calling}</b>
                <small>{M.emergency.callingRole}</small>
              </span>
            </span>
          </div>
        </div>
      </Card>

      {/* Daniel's request: approved for 7 days */}
      <Card k="request" active={isOn("request")} done={isDone("request")}>
        <header className={s.cHead}>
          <span className={s.av} style={{ background: M.request.who.color }}>
            {M.request.who.initial}
          </span>
          <span className={s.reqT}>{M.request.title}</span>
        </header>
        <p className={s.cBody}>{M.request.body}</p>
        <p className={s.lenLabel}>{M.request.lengthLabel}</p>
        <div className={s.outcome}>
          <div className={s.lengths}>
            {M.request.lengths.map((l) => (
              <span key={l} data-on={l === M.request.preset || undefined}>
                {l}
              </span>
            ))}
          </div>
          <p className={s.approved}>
            <Icon name="check" strokeWidth={2.4} />
            {M.request.done}
          </p>
        </div>
      </Card>
    </ul>
  );
}
