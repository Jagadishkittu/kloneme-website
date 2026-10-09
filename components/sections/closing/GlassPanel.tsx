"use client";

import { useEffect, useRef, useState } from "react";
import { GlassIcon } from "@/components/ui/GlassIcon";
import { closing } from "@/content/closing";
import s from "./closing.module.css";

// The big glass padlock on the right of the panel, cropped by its bottom edge
function Lock() {
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

      {/* Shackle */}
      <g>
        <path
          d="M110 350V230a190 190 0 01380 0v120h-78V230a112 112 0 00-224 0v120z"
          fill="url(#glass-face)"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="2"
        />
      </g>

      {/* Body, with the glow's colour caught in the glass and a keyhole pressed in */}
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

      {/* A light runs across the glass now and then */}
      <g clipPath="url(#glass-shape)">
        <rect className={s.sweep} x="-260" y="-40" width="220" height="880" fill="url(#glass-sweep)" />
      </g>
    </svg>
  );
}

export default function GlassPanel() {
  const panel = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  // Off-screen: pause the icons and the light on the glass
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={panel} className={s.panel} data-paused={!onScreen || undefined}>
      <span className={s.dots} aria-hidden="true" />
      <span className={`${s.corner} ${s.cornerL}`} aria-hidden="true" />
      <span className={`${s.corner} ${s.cornerR}`} aria-hidden="true" />
      <Lock />

      <div className={s.content}>
        <p className={s.kicker}>
          <i aria-hidden="true" />
          {closing.kicker}
        </p>
        <h2 id="get-h" className={s.h2}>
          {closing.headline.lead} <span className={s.accent}>{closing.headline.accent}</span>
        </h2>
        <p className={s.sub}>{closing.sub}</p>
        {/* The four privacy features' icons, floating gently */}
        <span className={s.icons} aria-hidden="true">
          {closing.icons.map((f) => (
            <GlassIcon key={f.name} name={f.name} color={f.color} size="50px" />
          ))}
        </span>
        <p className={s.fine}>{closing.smallPrint}</p>
      </div>
    </div>
  );
}
