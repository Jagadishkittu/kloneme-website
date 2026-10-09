import type { CSSProperties, ReactNode } from "react";
import s from "./glassIcon.module.css";

export type Glyph = "face" | "clock" | "eye" | "eyeoff" | "lock" | "users" | "brush" | "vault" | "dollar" | "plane" | "heart";

export const isGlyph = (name: string): name is Glyph => name in GLYPHS;

const ALMOND = "M2.5 12c.6-2.5 4.5-7 9.5-7s8.9 4.5 9.5 7c-.6 2.5-4.5 7-9.5 7s-8.9-4.5-9.5-7z";

// Two-tone glyphs: soft colour shapes behind (gFill), crisp deep-tone lines on top (gLine).
// Lines marked gDraw redraw when the tile is hovered; the other classes are each glyph’s own motion.
const GLYPHS: Record<Glyph, ReactNode> = {
  // Face ID: a scan line passes, the corners snap in, the eyes blink
  face: (
    <>
      <rect className={s.gFill} x="7" y="7" width="10" height="10" rx="3.6" />
      <path
        className={`${s.gLine} ${s.gCorners}`}
        d="M4 8.5v-2A2.5 2.5 0 016.5 4h2M15.5 4h2A2.5 2.5 0 0120 6.5v2M20 15.5v2a2.5 2.5 0 01-2.5 2.5h-2M8.5 20h-2A2.5 2.5 0 014 17.5v-2"
      />
      <path className={`${s.gLine} ${s.gEyes}`} d="M9.6 9.9v1M14.4 9.9v1" />
      <path className={`${s.gLine} ${s.gDraw}`} pathLength={1} d="M12 9.6v3.4h-.9M9.8 15.2c1.2 1 3.2 1 4.4 0" />
      <rect className={s.gScan} x="5.5" y="11.4" width="13" height="1.2" rx="0.6" />
    </>
  ),
  // Shares that expire: the time left drains as the hand goes round, then refills
  clock: (
    <>
      <circle className={s.gFill} cx="12" cy="12" r="8.5" />
      <circle className={s.gPie} cx="12" cy="12" r="4.25" pathLength={100} transform="rotate(-90 12 12)" />
      <circle className={`${s.gLine} ${s.gDraw}`} pathLength={1} cx="12" cy="12" r="8.5" />
      <path className={`${s.gLine} ${s.gHand}`} d="M12 12V6.6" />
      <circle className={s.gHub} cx="12" cy="12" r="1.35" />
    </>
  ),
  // See who opened what: blinks, and follows the pointer when a parent sets --ex/--ey
  eye: (
    <g className={s.gLid}>
      <path className={s.gFill} d={ALMOND} />
      <g className={s.gIris}>
        <circle className={s.gMid} cx="12" cy="12" r="3.7" />
        <circle className={s.gDeep} cx="12" cy="12" r="1.7" />
        <circle className={s.gGlint} cx="13.3" cy="10.6" r="0.8" />
      </g>
      <path className={`${s.gLine} ${s.gDraw}`} pathLength={1} d={ALMOND} />
    </g>
  ),
  // Stealth Mode: a slash draws across and the eye goes dark, then it opens again
  eyeoff: (
    <>
      <path className={s.gFill} d={ALMOND} />
      <g className={s.gHide}>
        <circle className={s.gMid} cx="12" cy="12" r="3.5" />
        <circle className={s.gDeep} cx="12" cy="12" r="1.6" />
      </g>
      <path className={`${s.gLine} ${s.gDraw}`} pathLength={1} d={ALMOND} />
      <path className={s.gGap} pathLength={1} d="M4.5 4.5l15 15" />
      <path className={`${s.gLine} ${s.gSlash}`} pathLength={1} d="M4.5 4.5l15 15" />
    </>
  ),
  // The Vault's lock: the shackle lifts and clicks shut
  lock: (
    <>
      <rect className={s.gFill} x="4.5" y="10.5" width="15" height="10" rx="2.8" />
      <path className={`${s.gLine} ${s.gShackle}`} d="M8 10.5V7.6a4 4 0 018 0v2.9" />
      <rect className={`${s.gLine} ${s.gDraw}`} pathLength={1} x="4.5" y="10.5" width="15" height="10" rx="2.8" />
      <path className={s.gLine} d="M12 14.3v2.4" />
    </>
  ),
  // Family: the second person bobs up beside the first
  users: (
    <>
      <circle className={s.gFill} cx="9" cy="8.5" r="3.2" />
      <path className={s.gFill} d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5z" />
      <circle className={`${s.gLine} ${s.gDraw}`} pathLength={1} cx="9" cy="8.5" r="3.2" />
      <path className={`${s.gLine} ${s.gDraw}`} pathLength={1} d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
      <path className={`${s.gLine} ${s.gBob}`} d="M15.5 5.6a3.2 3.2 0 010 6M17.5 14.3c1.8.7 3 2.3 3.5 4.7" />
    </>
  ),
  // Hobbies: the brush paints a stroke
  brush: (
    <>
      <path className={s.gPaint} pathLength={1} d="M3.5 21.2c3-.4 6-.6 9.5-.3" />
      <g className={s.gWiggle}>
        <path className={s.gFill} d="M14.5 4.5l5 5L11 18l-5-5z" />
        <path className={`${s.gLine} ${s.gDraw}`} pathLength={1} d="M14.5 4.5l5 5L11 18l-5-5z" />
        <path className={s.gMid} d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5.5 5.5-1 1.5-3.5 1.5-3.5z" />
        <path
          className={s.gLine}
          d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5.5 5.5-1 1.5-3.5 1.5-3.5"
        />
      </g>
    </>
  ),
  // Vault: the dial turns like a combination lock
  vault: (
    <>
      <rect className={s.gFill} x="3.5" y="4" width="17" height="15" rx="2.5" />
      <rect className={`${s.gLine} ${s.gDraw}`} pathLength={1} x="3.5" y="4" width="17" height="15" rx="2.5" />
      <path className={s.gLine} d="M6.5 19v1.5M17.5 19v1.5" />
      <g className={s.gDial}>
        <circle className={s.gMid} cx="12" cy="11.5" r="3.6" />
        <circle className={s.gLine} cx="12" cy="11.5" r="3.6" />
        <path className={s.gLine} d="M12 7.9v1.7" />
      </g>
    </>
  ),
  // Wealth: the coin flips
  dollar: (
    <g className={s.gFlip}>
      <circle className={s.gFill} cx="12" cy="12" r="8.5" />
      <circle className={`${s.gLine} ${s.gDraw}`} pathLength={1} cx="12" cy="12" r="8.5" />
      <path
        className={s.gLine}
        d="M14.5 9.2c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2s1 1.7 2.7 2.1 2.8.9 2.8 2.2-1.2 2.1-2.8 2.1c-1.2 0-2.3-.6-2.8-1.5M12 6.5v11"
      />
    </g>
  ),
  // Travel: the plane lifts off and lands again, a trail behind it
  plane: (
    <>
      <path className={s.gTrail} pathLength={1} d="M3 21l3.5-3.5M6.5 21.5l2-2" />
      <g className={s.gFly}>
        <path
          className={s.gFill}
          d="M10.5 13.5L4 11l1.5-1.5 7 .5 4-4c1-1 2.8-1.3 3.4-.7s.3 2.4-.7 3.4l-4 4 .5 7L14.2 21l-2.5-6.5-3.2 3.2.3 2.3-1.3 1.3-1.8-3.4-3.4-1.8 1.3-1.3 2.3.3z"
        />
        <path
          className={`${s.gLine} ${s.gDraw}`}
          pathLength={1}
          d="M10.5 13.5L4 11l1.5-1.5 7 .5 4-4c1-1 2.8-1.3 3.4-.7s.3 2.4-.7 3.4l-4 4 .5 7L14.2 21l-2.5-6.5-3.2 3.2.3 2.3-1.3 1.3-1.8-3.4-3.4-1.8 1.3-1.3 2.3.3z"
        />
      </g>
    </>
  ),
  // Health: it beats, and a pulse line runs through it
  heart: (
    <g className={s.gBeat}>
      <path className={s.gFill} d="M12 20s-7.5-4.3-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.7-7.5 10-7.5 10z" />
      <path
        className={`${s.gLine} ${s.gDraw}`}
        pathLength={1}
        d="M12 20s-7.5-4.3-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.7-7.5 10-7.5 10z"
      />
      <path className={s.gPulse} pathLength={1} d="M7.5 12.2h2.1l1.1-2 1.8 4 1.2-2h2.8" />
    </g>
  ),
};

type Props = {
  name: Glyph;
  /** Stream / feature colour */
  color: string;
  /** Tile size, e.g. "48px" or "14cqw" */
  size?: string;
  /** A filled tile in the colour with white lines (buttons) */
  solid?: boolean;
  /** The eye follows the pointer */
  follow?: boolean;
  className?: string;
};

// A glass tile (glossy sheen, coloured shadow, a light glinting across now and then) holding a glyph
export function GlassIcon({ name, color, size, solid, follow, className }: Props) {
  return (
    <span
      className={`${s.gi} ${className ?? ""}`}
      data-g={name}
      data-solid={solid || undefined}
      data-eye={follow || undefined}
      style={{ "--c": color, "--gs": size } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24">{GLYPHS[name]}</svg>
    </span>
  );
}
