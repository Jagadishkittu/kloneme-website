"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./privacy.module.css";

// The bento grid: each card's edge lights up near the pointer, eyes follow it, one-off entrances play
// the first time it's in view (data-seen), and the loops pause while it's off-screen (data-paused)
export default function Bento({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        el.toggleAttribute("data-paused", !e.isIntersecting);
        if (e.intersectionRatio >= 0.2) el.setAttribute("data-seen", "");
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);

    let raf = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      raf = 0;
      el.querySelectorAll<HTMLElement>("[data-glow]").forEach((card) => {
        const b = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${Math.round(px - b.left)}px`);
        card.style.setProperty("--my", `${Math.round(py - b.top)}px`);
      });
      // --ex/--ey: direction to the pointer (-1…1), shorter when the pointer is close
      el.querySelectorAll<HTMLElement>("[data-eye]").forEach((eye) => {
        const b = eye.getBoundingClientRect();
        const dx = px - (b.left + b.width / 2);
        const dy = py - (b.top + b.height / 2);
        const len = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, len / 220);
        eye.style.setProperty("--ex", ((dx / len) * k).toFixed(3));
        eye.style.setProperty("--ey", ((dy / len) * k).toFixed(3));
      });
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onLeave = () => {
      el.querySelectorAll<HTMLElement>("[data-eye]").forEach((eye) => {
        eye.style.setProperty("--ex", "0");
        eye.style.setProperty("--ey", "0");
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={s.bento}>
      {children}
    </div>
  );
}
