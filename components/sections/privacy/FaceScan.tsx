import type { CSSProperties } from "react";
import { streams } from "@/content/streams";
import s from "./privacy.module.css";

// Face ID as a depth scan: fine horizontal lines lie flat; a soft scan light glides down and each
// line rises as it passes, so a face emerges in relief. Thin Face ID corners ease in around it and
// six small lilac dots light up (every stream). Then the lines settle and it
// repeats. All CSS, on one loop (--cycle in privacy.module.css).

// Height of the face at a point (0 off the face): a soft dome, with nose, brow, lips and chin
// raised and the eye sockets set in
const g = (x: number, y: number, cx: number, cy: number, sx: number, sy: number) =>
  Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));

function depth(x: number, y: number) {
  const nx = (x - 50) / 26;
  const ny = (y - 50) / 35;
  const r = nx * nx + ny * ny;
  if (r >= 1) return 0;
  let h = 7 * Math.sqrt(1 - r);
  h += 4.4 * g(x, y, 50, 53, 3.2, 9);
  h -= 2.6 * (g(x, y, 39.5, 43, 5, 3.4) + g(x, y, 60.5, 43, 5, 3.4));
  h += 1.4 * g(x, y, 50, 36, 14, 2.6);
  h += 1.6 * g(x, y, 50, 69, 6, 2.2);
  h += 1.2 * g(x, y, 50, 80, 8, 3);
  return h * Math.min(1, (1 - r) * 4);
}

// One line per row; each rises from its baseline (--y) by the face's height along it
const LINES = Array.from({ length: 20 }, (_, i) => {
  const y = 12 + i * 4;
  const pts: string[] = [];
  for (let x = 8; x <= 92.01; x += 1.5) pts.push(`${x.toFixed(1)} ${(y - depth(x, y) * 0.55).toFixed(2)}`);
  return { y, d: `M${pts.join("L")}` };
});

export default function FaceScan() {
  return (
    <div className={s.scanner} aria-hidden="true">
      <span className={s.scanGlow} />
      <svg className={s.faceArt} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="fs-line" gradientUnits="userSpaceOnUse" x1="8" y1="0" x2="92" y2="0">
            <stop offset="0" stopColor="#8466eb" stopOpacity="0" />
            <stop offset="0.22" stopColor="#5236b8" />
            <stop offset="0.78" stopColor="#5236b8" />
            <stop offset="1" stopColor="#8466eb" stopOpacity="0" />
          </linearGradient>
          {/* The dots share the lines' lilac, light to deep across the row */}
          <linearGradient id="fs-dots" gradientUnits="userSpaceOnUse" x1="41" y1="0" x2="59" y2="0">
            <stop offset="0" stopColor="#a993ff" />
            <stop offset="1" stopColor="#5236b8" />
          </linearGradient>
          <linearGradient id="fs-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8466eb" stopOpacity="0" />
            <stop offset="1" stopColor="#8466eb" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {LINES.map((l, i) => (
          <path
            key={l.y}
            className={s.reliefLine}
            d={l.d}
            stroke="url(#fs-line)"
            style={{ "--i": i, "--y": `${l.y}px` } as CSSProperties}
          />
        ))}

        {/* The scan light: a soft band with a bright edge */}
        <g className={s.beamBand}>
          <rect x="6" y="-10" width="88" height="10" fill="url(#fs-beam)" />
          <rect x="6" y="-0.4" width="88" height="0.8" rx="0.4" fill="#fff" />
        </g>

        <path
          className={s.fidCorners}
          d="M20 22v-6a6 6 0 016-6h6M68 10h6a6 6 0 016 6v6M80 78v6a6 6 0 01-6 6h-6M32 90h-6a6 6 0 01-6-6v-6"
        />

        {streams.cards.map((c, i) => (
          <circle
            key={c.key}
            className={s.streamDot}
            cx={42.5 + i * 3}
            cy="96"
            r="0.9"
            fill="url(#fs-dots)"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}
