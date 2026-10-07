import { calendar } from "@/content/calendar";
import { streams } from "@/content/streams";
import CalendarDeal from "./calendar/CalendarDeal";

export default function Calendar() {
  return (
    <CalendarDeal>
      <p className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">
        {/* A dot for each stream */}
        <span className="flex gap-1" aria-hidden="true">
          {streams.cards.map((c) => (
            <i key={c.key} className="size-[7px] rounded-full" style={{ background: c.color }} />
          ))}
        </span>
        {calendar.kicker}
      </p>
      {/* "one family calendar." in v9's sky accent (its dark-theme shade) */}
      <h2
        id="calendar-h"
        className="mt-3 max-w-[16ch] text-balance text-[clamp(36px,5.2vw,84px)] font-semibold leading-[1.04] tracking-[-0.035em]"
      >
        <span className="text-bg">{calendar.headline.lead}</span>{" "}
        <span className="text-[#7db3f3]">{calendar.headline.accent}</span>
      </h2>
      <p className="mt-5 max-w-[540px] text-balance text-[15px] font-medium leading-[1.55] text-white/60 sm:text-[18px]">
        {calendar.sub}
      </p>
    </CalendarDeal>
  );
}
