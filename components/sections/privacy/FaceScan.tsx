import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { streams } from "@/content/streams";
import s from "./privacy.module.css";

// Face ID, on every stream: a dot-projector face lights up as the scan line passes, a check pops in,
// then the six stream chips around it unlock one by one (and lock again, and the cycle repeats).
// All CSS animation on one shared cycle (--cycle in privacy.module.css).

// Dots inside a face-shaped oval, in offset rows; --d is how far down the face each one sits
const DOTS = (() => {
  const out: { x: number; y: number; d: number }[] = [];
  let row = 0;
  for (let y = 13; y <= 87; y += 5, row++) {
    for (let x = 12 + (row % 2) * 2.5; x <= 88; x += 5) {
      const nx = (x - 50) / 32;
      const ny = (y - 50) / 38;
      if (nx * nx + ny * ny <= 1) out.push({ x, y, d: (y - 13) / 74 });
    }
  }
  return out;
})();

export default function FaceScan() {
  return (
    <div className={s.scanner} aria-hidden="true">
      <span className={s.scanGlow} />
      <svg className={s.orbit} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>

      <div className={s.face}>
        <svg className={s.mesh} viewBox="0 0 100 100">
          {DOTS.map((p) => (
            <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="1.15" style={{ "--d": p.d.toFixed(3) } as CSSProperties} />
          ))}
          {/* Eyes, nose and smile (v9's Face ID glyph) */}
          <path className={s.features} d="M36 37.5v5M64 37.5v5M50 37.5V55h-5M38.75 66c6.25 5 16.25 5 22.5 0" />
        </svg>
        <svg className={s.brackets} viewBox="0 0 80 80">
          <path d="M6 24V14a8 8 0 018-8h10M56 6h10a8 8 0 018 8v10M74 56v10a8 8 0 01-8 8H56M24 74H14a8 8 0 01-8-8V56" />
        </svg>
        <span className={s.sweep} />
        <span className={s.ok}>
          <Icon name="check" strokeWidth={2.6} />
        </span>
      </div>

      {/* The six streams, each with a lock that opens once Face ID passes */}
      <ul className={s.chips}>
        {streams.cards.map((c, i) => (
          <li key={c.key} style={{ "--a": `${i * 60 - 90}deg`, "--c": c.color, "--i": i } as CSSProperties}>
            <span className={s.chip}>
              <Icon name={c.icon} strokeWidth={2} />
              <span className={s.chipLock}>
                <svg viewBox="0 0 24 24">
                  <path className={s.shackle} d="M8 11V8a4 4 0 018 0v3" />
                  <rect x="5.5" y="11" width="13" height="9.5" rx="2.5" />
                </svg>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
