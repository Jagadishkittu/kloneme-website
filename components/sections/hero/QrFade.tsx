"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Keeps the download card fixed bottom-right while the hero is on screen, and fades it out as the
// Twin section (section 2) scrolls in; it's fully gone once section 2 has taken over the screen.
export default function QrFade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const next = document.getElementById("twin");
    if (!el || !next) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const h = window.innerHeight;
      // 0 while section 2 is below 85% of the screen, 1 once its top is up at 40%
      const p = Math.min(1, Math.max(0, (h * 0.85 - next.getBoundingClientRect().top) / (h * 0.45)));
      el.style.opacity = String(1 - p);
      el.style.translate = `0 ${Math.round(p * 24)}px`;
      el.style.visibility = p >= 1 ? "hidden" : "visible";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 hidden lg:block">
      {children}
    </div>
  );
}
