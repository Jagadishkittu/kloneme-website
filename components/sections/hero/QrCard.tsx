import QRCode from "qrcode";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import QrFade from "./QrFade";

function qrPath(text: string) {
  const { modules } = QRCode.create(text, { errorCorrectionLevel: "M" });
  const n = modules.size;
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return { d, n };
}

// Download card, fixed bottom-right on desktop (as in the reference) while the hero is on screen;
// QrFade fades it out as section 2 scrolls in.
export default function QrCard() {
  const { d, n } = qrPath(site.downloadUrl);
  return (
    <QrFade>
      <a
        href={site.downloadUrl}
        target="_blank"
        rel="noopener"
        className="flex items-center gap-3 rounded-2xl bg-ink p-2.5 pr-5 text-bg shadow-[0_20px_40px_-18px_rgba(23,20,29,0.55)] transition-transform hover:-translate-y-0.5"
      >
        <span className="rounded-lg bg-white p-1.5">
          <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="size-[64px]" shapeRendering="crispEdges" role="img" aria-label="QR code to download the app">
            <path d={d} fill="#17141d" />
          </svg>
        </span>
        <span className="leading-tight">
          <b className="block text-[14px] font-semibold">{hero.qr.title}</b>
          <span className="mt-1 block max-w-[150px] text-[11.5px] text-bg/65">{hero.qr.sub}</span>
        </span>
      </a>
    </QrFade>
  );
}
