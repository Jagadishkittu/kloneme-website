import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { hero, type FlowCard, type FlowChip, type Stream } from "@/content/hero";
import s from "./hero.module.css";

const streamColor: Record<Stream, string> = {
  accent: "#d79a0b",
  sky: "var(--sky)",
  berry: "var(--berry)",
  coral: "var(--coral)",
  lime: "#5f8f0f",
  lagoon: "var(--lagoon)",
  lilac: "var(--lilac)",
};

function RingBadge({ icon, color, end = 0 }: { icon: IconName; color: string; end?: number }) {
  return (
    <span className="relative grid size-[54px] place-items-center" style={{ color }}>
      <svg viewBox="0 0 54 54" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="27" cy="27" r="23" fill="none" stroke="rgba(23,20,29,0.07)" strokeWidth="5" />
        <circle
          cx="27"
          cy="27"
          r="23"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={end}
        />
      </svg>
      <Icon name={icon} className="size-[20px]" strokeWidth={1.9} />
    </span>
  );
}

function Chip({ c }: { c: FlowChip }) {
  return (
    <div className={s.chipBody} data-icon-only={c.label ? undefined : ""} style={{ "--c": streamColor[c.stream] } as CSSProperties}>
      <span className={s.chipIcon}>
        <Icon name={c.icon} className="size-[18px]" strokeWidth={1.9} />
      </span>
      {c.label && <span className={s.chipLabel}>{c.label}</span>}
    </div>
  );
}

function Card({ c }: { c: FlowCard }) {
  if (c.variant === "reminder") {
    return (
      <div className={`${s.cardSurface} flex items-center gap-3 py-3 pl-3 pr-5`}>
        <span className="grid size-10 place-items-center rounded-full bg-accent/15 text-[#c48c06]">
          <Icon name={c.icon} className="size-[20px]" strokeWidth={1.9} />
        </span>
        <span className="whitespace-nowrap text-left leading-tight">
          <b className="block text-[15px] font-semibold text-ink">{c.title}</b>
          <span className="text-[13px] font-medium text-muted">{c.sub}</span>
        </span>
      </div>
    );
  }
  return (
    <div className={`${s.cardSurface} flex w-[122px] flex-col items-center gap-1.5 px-3 pb-3 pt-3.5 text-center`}>
      <RingBadge icon={c.icon} color={c.color ?? "var(--accent)"} end={c.icon === "face" ? 18 : 0} />
      <b className="text-[11.5px] font-semibold leading-tight text-ink">{c.title}</b>
      <span className="-mt-1 text-[10.5px] font-medium text-muted">{c.sub}</span>
    </div>
  );
}

// Items travel one after another: left edge → along the lines → behind the phone → out to the right.
export default function Flow() {
  const { cycle, items } = hero.flow;
  return (
    <div className={s.flow} aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={i}
          className={s.flowItem}
          data-size={item.kind}
          style={
            {
              "--lane": `${item.lane}px`,
              "--dur": `${cycle}s`,
              "--delay": `${(-(i * cycle) / items.length).toFixed(2)}s`,
            } as CSSProperties
          }
        >
          <div className={s.flowBody}>{item.kind === "chip" ? <Chip c={item} /> : <Card c={item} />}</div>
        </div>
      ))}
    </div>
  );
}
