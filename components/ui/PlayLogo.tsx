// The Google Play mark (four-colour triangle), for the Google Play store badge
export function PlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-6 shrink-0"} aria-hidden="true">
      <path d="M3.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2L13 12z" fill="#00d7fe" />
      <path d="M16.2 15.3L13 12l3.2-3.3 3.9 2.2c1.1.6 1.1 1.6 0 2.2z" fill="#ffce00" />
      <path d="M16.2 15.3L13 12l-9.4 9.7c.4.4 1 .4 1.6.1z" fill="#f63448" />
      <path d="M16.2 8.7L5.2 2.2c-.6-.4-1.2-.3-1.6.1L13 12z" fill="#00f076" />
    </svg>
  );
}
