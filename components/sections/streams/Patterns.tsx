import type { StreamKey } from "@/content/streams";
import s from "./streams.module.css";

// Abstract motif behind each card's screen, drawn in the stream colour (currentColor).
// viewBox is 400 × 320; the motifs sit mostly on the right, clear of the screen.
const FLIGHT = "M -20 290 C 120 150, 250 30, 430 70";
const BEAT = "M 0 200 H 170 L 190 150 L 210 250 L 232 110 L 254 230 L 270 200 H 400";
const STROKES = [
  "M 210 70 C 260 40, 320 100, 380 60",
  "M 220 150 C 270 120, 330 180, 395 140",
  "M 230 230 C 280 200, 330 260, 390 225",
];

export default function Pattern({ kind, still }: { kind: StreamKey; still: boolean }) {
  return (
    <svg className={s.pattern} viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {kind === "travel" && (
        <>
          <path d={FLIGHT} className={s.flight} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 14" />
          <g transform={still ? "translate(255 96) rotate(-22)" : undefined}>
            {/* Paper plane pointing along +x, so rotate="auto" turns it with the path */}
            <path d="M14 0L-10 -10L-5 0L-10 10Z" fill="currentColor" />
            {!still && <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={FLIGHT} />}
          </g>
        </>
      )}

      {kind === "health" && (
        <path d={BEAT} pathLength={1} className={s.beat} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      )}

      {kind === "wealth" &&
        [0, 1, 2, 3, 4].map((i) => (
          <rect key={i} className={s.col}x={236 + i * 30} y={300 - (60 + i * 40)} width="18" height={60 + i * 40} rx="9" fill="currentColor" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}

      {kind === "family" && (
        <g transform="translate(318 100)">
          <circle r="16" fill="currentColor" opacity="0.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              className={s.dot}
              // Rounded so the server and the browser write the same number (no hydration mismatch)
              cx={+(Math.cos((i * Math.PI) / 3) * 58).toFixed(2)}
              cy={+(Math.sin((i * Math.PI) / 3) * 58).toFixed(2)}
              r="11"
              fill="currentColor"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </g>
      )}

      {kind === "hobbies" &&
        STROKES.map((d, i) => (
          <path key={i} d={d} pathLength={1} className={s.stroke} fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}

      {kind === "vault" && (
        <g transform="translate(320 110)">
          {[86, 62, 38].map((r, i) => (
            <circle
              key={r}
              className={i % 2 ? s.ringRev : s.ring}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={i === 2 ? "10 14" : "28 18"}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
