import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import s from "./problem.module.css";

// A flat icon after the client's reference (a solid red heart with a white cross): each place as a
// solid shape of its own (a calendar, an envelope, a sticky note…) in one colour, the parent's
// --gc, with its details in white. No gradients, no depth. Drawn in a 100×100 box from the icons
// in Icon.tsx; the parent sets --cs, its size.

type Shape = {
  /** The solid shape */
  body: string;
  /** The white details */
  marks: ReactNode;
};

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
  `H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

const SHAPES: Partial<Record<IconName, Shape>> = {
  // A sticky note with its corner folded up
  sticky: {
    body: "M20 12H80A8 8 0 0 1 88 20V60L60 88H20A8 8 0 0 1 12 80V20A8 8 0 0 1 20 12Z",
    marks: (
      <>
        <path className={s.fold} d="M88 60L60 88V68A8 8 0 0 1 68 60Z" />
        <path className={s.mark} d="M27 34H70M27 50H58" />
      </>
    ),
  },
  // An inbox tray with a letter arrow dropping in
  inbox: {
    body: "M28 16H72A6 6 0 0 1 77.6 19.9L90 52V80A8 8 0 0 1 82 88H18A8 8 0 0 1 10 80V52L22.4 19.9A6 6 0 0 1 28 16Z",
    marks: <path className={s.mark} d="M50 26V44M42 37L50 45L58 37M14 57H33L38 67H62L67 57H86" />,
  },
  // A desk calendar: binder rings, the header line and the days
  cal: {
    body: `${rr(10, 22, 80, 70, 12)}${rr(26, 8, 10, 26, 5)}${rr(64, 8, 10, 26, 5)}`,
    marks: (
      <>
        <rect className={s.markFill} x="27.5" y="9.5" width="7" height="23" rx="3.5" />
        <rect className={s.markFill} x="65.5" y="9.5" width="7" height="23" rx="3.5" />
        <path className={`${s.mark} ${s.thin}`} d="M18 44H82" />
        {[31, 50, 69].flatMap((x) => [60, 77].map((y) => <circle key={`${x} ${y}`} className={s.markFill} cx={x} cy={y} r="4.6" />))}
      </>
    ),
  },
  // A notes page
  note: {
    body: rr(18, 8, 64, 84, 12),
    marks: <path className={s.mark} d="M32 32H68M32 48H68M32 64H54" />,
  },
  // A bank: roof, columns, base
  bank: {
    body: "M50 8L90 30V40H84V76H90V90H10V76H16V40H10V30Z",
    marks: (
      <>
        <circle className={s.markFill} cx="50" cy="27" r="5" />
        <path className={s.mark} d="M30 49V68M44 49V68M56 49V68M70 49V68" />
      </>
    ),
  },
  // An envelope with its flap
  mail: {
    body: rr(8, 20, 84, 62, 12),
    marks: <path className={s.mark} d="M18 32L50 56L82 32" />,
  },
  // A clinic sign: rounded square with a cross
  clinic: {
    body: rr(10, 10, 80, 80, 20),
    marks: <path className={s.markFill} d="M43 26H57V43H74V57H57V74H43V57H26V43H43Z" />,
  },
  // A chat bubble with three dots
  chat: {
    body: "M24 12H76A14 14 0 0 1 90 26V58A14 14 0 0 1 76 72H50L28 90V72H24A14 14 0 0 1 10 58V26A14 14 0 0 1 24 12Z",
    marks: (
      <>
        {[33, 50, 67].map((x) => (
          <circle key={x} className={s.markFill} cx={x} cy="42" r="5.6" />
        ))}
      </>
    ),
  },
  // A photo: sun and hills
  photo: {
    body: rr(8, 16, 84, 68, 12),
    marks: (
      <>
        <circle className={s.markFill} cx="33" cy="37" r="7" />
        <path className={s.markFill} d="M18 73L39 51L55 66L66 56L82 73Z" />
      </>
    ),
  },
  // A spreadsheet: header row and grid
  sheet: {
    body: rr(10, 12, 80, 76, 12),
    marks: <path className={`${s.mark} ${s.thin}`} d="M14 36H86M14 62H86M38 36V84" />,
  },
};

export default function ShapeIcon({ icon }: { icon: IconName }) {
  const shape = SHAPES[icon];
  return (
    <span className={s.shape} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <path className={s.body} d={shape?.body ?? "M50 10A40 40 0 1 1 49.99 10Z"} />
        {shape?.marks}
      </svg>
      {/* Anything without its own shape: a round token with the icon */}
      {!shape && <Icon name={icon} strokeWidth={2.6} className={s.glyph} />}
    </span>
  );
}
