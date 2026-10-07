import type { ReactNode, SVGProps } from "react";

// Line icons ported from the <symbol> set in kloneme-website-v9.html, plus a few UI glyphs (mic, close, download).
const paths = {
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" />
    </>
  ),
  face: (
    <>
      <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
      <path d="M9 9.5v1M15 9.5v1M12 9v4h-1M9.5 15.5c1.4 1.2 3.6 1.2 5 0" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
      <path d="M15.5 5.6a3.2 3.2 0 010 6M17.5 14.3c1.8.7 3 2.3 3.5 4.7" />
    </>
  ),
  plane: (
    <path d="M10.5 13.5L4 11l1.5-1.5 7 .5 4-4c1-1 2.8-1.3 3.4-.7s.3 2.4-.7 3.4l-4 4 .5 7L14.2 21l-2.5-6.5-3.2 3.2.3 2.3-1.3 1.3-1.8-3.4-3.4-1.8 1.3-1.3 2.3.3z" />
  ),
  heart: <path d="M12 20s-7.5-4.3-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.7-7.5 10-7.5 10z" />,
  vault: (
    <>
      <rect x="3.5" y="4" width="17" height="15" rx="2.5" />
      <circle cx="12" cy="11.5" r="3.5" />
      <path d="M6.5 19v1.5M17.5 19v1.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  id: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M14 10h4M14 13h3" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  home: <path d="M4 11l8-6.5 8 6.5V20h-5v-5.5h-6V20H4z" />,
  cal: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  left: <path d="M15 5l-7 7 7 7" />,
  doc: (
    <>
      <path d="M7 3.5h7l4 4V20.5H6.5V3.5z" />
      <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
    </>
  ),
  dollar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2s1 1.7 2.7 2.1 2.8.9 2.8 2.2-1.2 2.1-2.8 2.1c-1.2 0-2.3-.6-2.8-1.5M12 6.5v11" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" />
    </>
  ),
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.76-.96 2.8 1.02.08 2.05-.52 2.68-1.28z"
    />
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & { name: IconName };

export function Icon({ name, className, strokeWidth = 1.7, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className ?? "size-5 shrink-0"}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
