import type { CSSProperties, ReactNode } from "react";
import type { StreamKey } from "@/content/streams";
import s from "./twin.module.css";

// Each Klo has a glossy 3D object for its part of life, in that stream's colour (as in Streams),
// and each in its own place: a suitcase standing at its side (Travel), a heart held up high
// (Health), a coin raised beside its face (Wealth), a house hugged in front (Family), a palette in
// one hand while the other stays at its chin (Hobbies), a padlock standing at its feet (Vault).
// Drawn over the Klo image in the image's own space (528×456), with soft hands in Klo's yellow;
// Health's drawn hand sits right over the raised hand in the render. Light comes from the top
// right, as in the renders: lit top-right edges, a shaded side below, a shadow cast down-left.

type Tone = { l: string; b: string; d: string; e: string };
const TONE: Record<StreamKey, Tone> = {
  travel: { l: "#9ccbff", b: "#3b8beb", d: "#1d5aa8", e: "#123c73" },
  health: { l: "#f7a6d6", b: "#d0539f", d: "#8e2a67", e: "#5e1543" },
  wealth: { l: "#cdee7a", b: "#7cb518", d: "#45700a", e: "#2c4a05" },
  family: { l: "#ffb3a5", b: "#ee6352", d: "#a8321f", e: "#741f12" },
  hobbies: { l: "#c9bbff", b: "#8466eb", d: "#5236b8", e: "#36217f" },
  vault: { l: "#86e3d9", b: "#17a398", d: "#0b6e66", e: "#064843" },
};

type Shape = {
  /** Outline of the front face, centred on 0 0 (about 150 wide) */
  body: string;
  /** Parts behind the body: handle, chimney, shackle */
  back?: (t: Tone, id: string) => ReactNode;
  /** What sits on the face: a white mark, or paint */
  front: (t: Tone) => ReactNode;
  /** Thickness, toward the bottom left */
  depth?: [number, number];
  /** Specular glint, top right */
  glint: [number, number];
};

// A white mark pressed into the face: a soft dark copy below it, then the mark
function mark(t: Tone, node: ReactNode) {
  return (
    <>
      <g transform="translate(-1.5 3)" opacity="0.5" style={{ color: t.e }}>
        {node}
      </g>
      <g style={{ color: "#fff" }}>{node}</g>
    </>
  );
}

// A bar behind the body (handle, shackle): its dark side, then the lit bar
function rod(t: Tone, id: string, d: string, w: number) {
  return (
    <>
      <path d={d} fill="none" stroke={t.e} strokeWidth={w} strokeLinecap="round" transform="translate(-2.5 6)" />
      <path d={d} fill="none" stroke={`url(#${id}-rod)`} strokeWidth={w} strokeLinecap="round" />
    </>
  );
}

const PLANE =
  "M10.5 13.5L4 11l1.5-1.5 7 .5 4-4c1-1 2.8-1.3 3.4-.7s.3 2.4-.7 3.4l-4 4 .5 7L14.2 21l-2.5-6.5-3.2 3.2.3 2.3-1.3 1.3-1.8-3.4-3.4-1.8 1.3-1.3 2.3.3z";
const DOLLAR =
  "M14.5 9.2c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2s1 1.7 2.7 2.1 2.8.9 2.8 2.2-1.2 2.1-2.8 2.1c-1.2 0-2.3-.6-2.8-1.5M12 6.5v11";

const SHAPES: Record<StreamKey, Shape> = {
  travel: {
    body: "M-50-42H50A20 20 0 0 1 70-22V36A20 20 0 0 1 50 56H-50A20 20 0 0 1-70 36V-22A20 20 0 0 1-50-42Z",
    back: (t, id) => rod(t, id, "M-22-42V-54Q-22-64-12-64H12Q22-64 22-54V-42", 11),
    front: (t) =>
      mark(
        t,
        <path
          d={PLANE}
          transform="translate(-33.4 -32.7) scale(2.9)"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />,
      ),
    glint: [48, -28],
  },
  health: {
    body: "M0 56C-34 34-78 8-78-24C-78-48-60-64-39-64C-22-64-8-55 0-41C8-55 22-64 39-64C60-64 78-48 78-24C78 8 34 34 0 56Z",
    front: (t) =>
      mark(
        t,
        <path
          d="M-56-14H-28L-15-40 3 12 17-20H56"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />,
      ),
    glint: [50, -46],
  },
  wealth: {
    body: "M-64 0A64 58 0 1 0 64 0A64 58 0 1 0-64 0Z",
    front: (t) =>
      mark(
        t,
        <>
          <ellipse rx="49" ry="43" fill="none" stroke="currentColor" strokeWidth="3.5" opacity="0.55" />
          <path
            d={DOLLAR}
            transform="translate(-43.2 -43.2) scale(3.6)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>,
      ),
    depth: [-4, 13],
    glint: [34, -38],
  },
  family: {
    body: "M-9-61Q0-68 9-61L62-19Q68-14 68-6V44Q68 56 56 56H-56Q-68 56-68 44V-6Q-68-14-62-19Z",
    back: (t, id) => (
      <>
        <rect x="27.5" y="-53" width="18" height="40" rx="4" fill={t.e} />
        <rect x="30" y="-58" width="18" height="40" rx="4" fill={`url(#${id}-rod)`} />
      </>
    ),
    front: (t) =>
      mark(
        t,
        <g transform="translate(-36 -26.6) scale(3)" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <circle cx="9" cy="8.5" r="3.2" />
          <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
          <path d="M15.5 5.6a3.2 3.2 0 010 6M17.5 14.3c1.8.7 3 2.3 3.5 4.7" />
        </g>,
      ),
    glint: [46, -10],
  },
  hobbies: {
    // A paint palette, with a thumb hole you can see Klo through
    body: "M-4-62C42-64 84-40 84-2C84 28 62 40 44 34C30 29 20 34 22 46C24 58 10 66-10 64C-52 60-86 30-84-6C-82-40-46-60-4-62ZM30 0A10 10 0 1 0 50 0A10 10 0 1 0 30 0Z",
    front: () => (
      <>
        {(
          [
            [6, -42, 12, "#ee6352"],
            [40, -27, 11, "#7cb518"],
            [12, -2, 12, "#f5b31f"],
            [-46, 26, 12, "#3b8beb"],
            [-10, 38, 11, "#d0539f"],
          ] as const
        ).map(([x, y, r, c]) => (
          <g key={c}>
            <circle cx={x - 1.5} cy={y + 3} r={r} fill="#24104f" opacity="0.35" />
            <circle cx={x} cy={y} r={r} fill={c} />
            <ellipse
              cx={x + r * 0.3}
              cy={y - r * 0.4}
              rx={r * 0.42}
              ry={r * 0.26}
              transform={`rotate(-30 ${x + r * 0.3} ${y - r * 0.4})`}
              fill="#fff"
              opacity="0.75"
            />
          </g>
        ))}
      </>
    ),
    glint: [56, -36],
  },
  vault: {
    body: "M-44-16H44A18 18 0 0 1 62 2V38A18 18 0 0 1 44 56H-44A18 18 0 0 1-62 38V2A18 18 0 0 1-44-16Z",
    back: (t, id) => rod(t, id, "M-31-16V-30A31 31 0 0 1 31-30V-16", 14),
    front: (t) =>
      mark(
        t,
        <g fill="currentColor">
          <circle cy="13" r="12.5" />
          <path d="M-6.5 18L-9.5 42H9.5L6.5 18Z" />
        </g>,
      ),
    glint: [42, -4],
  },
};

/** A hand in Klo's yellow; lit: on Klo's lit (right) side */
type Hand = { x: number; y: number; rx: number; ry: number; r: number; lit?: boolean };
type Place = {
  /** Centre, size and tilt of the object (image pixels) */
  x: number;
  y: number;
  k: number;
  rot: number;
  hands: Hand[];
  /** Stands on the floor: half-width of its shadow on the ground (and it doesn't float) */
  ground?: number;
};

// Fitted to the renders: Klo is widest at mid-height (≈ 115–426) and narrows to its feet (≈ 431)
const PLACE: Record<StreamKey, Place> = {
  // Standing at Klo's right, leaning in, Klo's hand on its top edge
  travel: { x: 430, y: 366, k: 1.25, rot: -4, ground: 82, hands: [{ x: 380, y: 314, rx: 30, ry: 28, r: -10, lit: true }] },
  // Held up high on the raised hand (drawn over the render's hand, ≈ 322–412 × 272–358)
  health: { x: 424, y: 226, k: 1.05, rot: 14, hands: [{ x: 370, y: 312, rx: 54, ry: 50, r: 0, lit: true }] },
  // Raised beside the face on the left, a hand under its edge
  wealth: { x: 118, y: 236, k: 1.1, rot: -12, hands: [{ x: 170, y: 290, rx: 30, ry: 28, r: 25 }] },
  // Hugged in front with both hands
  family: {
    x: 273,
    y: 366,
    k: 1.18,
    rot: 0,
    hands: [
      { x: 197, y: 392, rx: 32, ry: 35, r: 18 },
      { x: 349, y: 392, rx: 32, ry: 35, r: -18, lit: true },
    ],
  },
  // In the right hand, tilted; the other hand stays at the chin (the render's own)
  hobbies: { x: 414, y: 338, k: 1.05, rot: 16, hands: [{ x: 346, y: 376, rx: 30, ry: 32, r: -10, lit: true }] },
  // Standing at Klo's feet on the left, leaning in, Klo's hand resting on it
  vault: { x: 112, y: 369, k: 1.2, rot: 5, ground: 72, hands: [{ x: 168, y: 344, rx: 30, ry: 28, r: 20 }] },
};

export default function HeldIcon({ stream }: { stream: StreamKey }) {
  const t = TONE[stream];
  const sh = SHAPES[stream];
  const p = PLACE[stream];
  const id = `held-${stream}`;
  const [dx, dy] = sh.depth ?? [-3, 9];

  return (
    <svg className={s.held} viewBox="0 0 528 456" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-face`} x1="0.9" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor={t.l} />
          <stop offset="0.45" stopColor={t.b} />
          <stop offset="1" stopColor={t.d} />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.d} />
          <stop offset="1" stopColor={t.e} />
        </linearGradient>
        <linearGradient id={`${id}-rod`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={t.d} />
          <stop offset="0.45" stopColor={t.l} />
          <stop offset="0.7" stopColor={t.b} />
          <stop offset="1" stopColor={t.d} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-l`} cx="0.62" cy="0.32" r="0.78" fx="0.68" fy="0.24">
          <stop offset="0" stopColor="#fcd98f" />
          <stop offset="0.3" stopColor="#f3be63" />
          <stop offset="0.72" stopColor="#e2a246" />
          <stop offset="1" stopColor="#bf7e2e" />
        </radialGradient>
        <radialGradient id={`${id}-r`} cx="0.62" cy="0.32" r="0.78" fx="0.68" fy="0.24">
          <stop offset="0" stopColor="#ffe9b0" />
          <stop offset="0.3" stopColor="#fed27c" />
          <stop offset="0.72" stopColor="#f2b552" />
          <stop offset="1" stopColor="#d69238" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d={sh.body} clipRule="evenodd" />
        </clipPath>
        <filter id={`${id}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={`${id}-edge`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      {p.ground && (
        <ellipse cx={p.x - 6} cy="438" rx={p.ground} ry="9" fill="#2a1402" opacity="0.45" filter={`url(#${id}-soft)`} />
      )}

      <g
        className={s.heldObj}
        data-ground={p.ground ? "" : undefined}
        style={{ transformOrigin: `${p.x}px ${p.y}px` } as CSSProperties}
      >
        <g transform={`translate(${p.x} ${p.y}) rotate(${p.rot}) scale(${p.k})`}>
          {/* Shadow cast down-left onto Klo */}
          <path d={sh.body} fillRule="evenodd" transform="translate(-10 16)" fill="#5a2a00" opacity="0.38" filter={`url(#${id}-blur)`} />
          {sh.back?.(t, id)}
          {/* Thickness, then the face */}
          {[1 / 3, 2 / 3, 1].map((f) => (
            <path key={f} d={sh.body} fillRule="evenodd" transform={`translate(${dx * f} ${dy * f})`} fill={`url(#${id}-side)`} />
          ))}
          <path d={sh.body} fillRule="evenodd" fill={`url(#${id}-face)`} />
          <g clipPath={`url(#${id}-clip)`}>
            <ellipse cx="34" cy="-44" rx="74" ry="52" fill={`url(#${id}-glow)`} />
            {/* Shade along the bottom-left edge, light along the top-right edge */}
            <path d={sh.body} fill="none" stroke={t.e} strokeOpacity="0.45" strokeWidth="7" transform="translate(4 -5)" filter={`url(#${id}-soft)`} />
            <path d={sh.body} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" transform="translate(-2.5 3.5)" />
            {sh.front(t)}
            <ellipse
              cx={sh.glint[0]}
              cy={sh.glint[1]}
              rx="11"
              ry="6"
              transform={`rotate(-35 ${sh.glint[0]} ${sh.glint[1]})`}
              fill="#fff"
              opacity="0.85"
              filter={`url(#${id}-edge)`}
            />
            <g className={s.heldSheen}>
              <rect x="-14" y="-110" width="28" height="220" transform="rotate(24)" fill={`url(#${id}-sheen)`} />
            </g>
          </g>
        </g>
      </g>

      {p.hands.map((h) => (
        <g key={`${h.x} ${h.y}`} transform={`translate(${h.x} ${h.y}) rotate(${h.r})`}>
          <ellipse rx={h.rx + 3} ry={h.ry + 3} transform="translate(-5 8)" fill="#6a3204" opacity="0.42" filter={`url(#${id}-soft)`} />
          <ellipse rx={h.rx} ry={h.ry} fill={`url(#${id}-${h.lit ? "r" : "l"})`} filter={`url(#${id}-edge)`} />
          <ellipse cx={h.rx * 0.28} cy={-h.ry * 0.45} rx={h.rx * 0.4} ry={h.ry * 0.22} fill="#fff" opacity="0.35" filter={`url(#${id}-soft)`} />
        </g>
      ))}
    </svg>
  );
}
