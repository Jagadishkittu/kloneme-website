import { problem } from "@/content/problem";
import LooseEnds from "./problem/LooseEnds";

export default function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-h" className="bg-bg pb-[clamp(72px,11vh,128px)]">
      <LooseEnds>
        <div className="w-full max-w-[430px]">
          <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/70">
            <span className="h-px w-7 bg-ink/40" aria-hidden="true" />
            {problem.kicker}
          </p>
          <h2
            id="problem-h"
            className="mt-4 text-balance text-[clamp(28px,2.8vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em]"
          >
            <span className="text-ink">{problem.headline.lead}</span>{" "}
            <span className="text-ink/55">{problem.headline.accent}</span>
          </h2>
          <p className="mt-5 max-w-[430px] text-[15px] font-medium leading-[1.65] text-ink/75 sm:text-[clamp(15px,1.2vw,18px)]">
            {problem.sub}
          </p>
        </div>
      </LooseEnds>
    </section>
  );
}
