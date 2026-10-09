import type { ReactNode } from "react";

// Social network marks, simplified, filled with the current colour (even-odd, so the cut-outs show)
const MARKS = {
  instagram: (
    <>
      <path d="M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.9a3.1 3.1 0 110-6.2 3.1 3.1 0 010 6.2z" />
      <circle cx="17.1" cy="6.9" r="1.15" />
      <path d="M16.6 2.5H7.4A4.9 4.9 0 002.5 7.4v9.2a4.9 4.9 0 004.9 4.9h9.2a4.9 4.9 0 004.9-4.9V7.4a4.9 4.9 0 00-4.9-4.9zm3.2 14.1a3.2 3.2 0 01-3.2 3.2H7.4a3.2 3.2 0 01-3.2-3.2V7.4a3.2 3.2 0 013.2-3.2h9.2a3.2 3.2 0 013.2 3.2z" />
    </>
  ),
  facebook: (
    <path d="M14 8.5V6.9c0-.8.5-1.3 1.3-1.3H17V2.6h-2.6c-2.6 0-3.9 1.6-3.9 3.9v2H8v3.2h2.5v9.8H14v-9.8h2.6l.4-3.2z" />
  ),
  x: <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />,
  linkedin: (
    <path d="M5 3.4a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2zM3.2 9.3h3.6v11.3H3.2zm5.9 0h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.1h-3.6v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.5H9.1z" />
  ),
  youtube: (
    <path
      d="M21.6 7.2a2.6 2.6 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 00-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"
    />
  ),
} satisfies Record<string, ReactNode>;

export type SocialName = keyof typeof MARKS;

export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true" focusable="false" className={className ?? "size-5"}>
      {MARKS[name]}
    </svg>
  );
}
