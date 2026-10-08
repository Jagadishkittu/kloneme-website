"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/content/site";
import s from "./footer.module.css";

const LETTERS = Array.from(site.name);

// The giant wordmark: letters rise in once seen, and the colour brightens under the pointer
export default function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-seen", "");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    let raf = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${Math.round(x - b.left)}px`);
      el.style.setProperty("--my", `${Math.round(y - b.top)}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const footer = el.closest("footer") ?? el;
    footer.addEventListener("pointermove", onMove as EventListener);
    return () => {
      io.disconnect();
      footer.removeEventListener("pointermove", onMove as EventListener);
      cancelAnimationFrame(raf);
    };
  }, []);

  const word = (cls: string) => (
    <span className={cls}>
      {LETTERS.map((ch, i) => (
        <span key={i} style={{ "--i": i, "--n": LETTERS.length - 1 } as CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className={s.mark} aria-hidden="true">
      {word(s.base)}
      {word(s.lit)}
    </div>
  );
}
