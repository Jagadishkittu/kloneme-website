import { problem } from "@/content/problem";
import LooseEnds from "./problem/LooseEnds";

export default function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-h" className="bg-bg pb-[clamp(72px,11vh,128px)]">
      <LooseEnds>
        <div className="w-full max-w-[420px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/75">{problem.kicker}</p>
          <h2
            id="problem-h"
            className="mt-3 text-balance text-[clamp(26px,2.6vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em]"
          >
            <span className="text-ink">{problem.headline.lead}</span>{" "}
            <span className="text-ink/60">{problem.headline.accent}</span>
          </h2>
          <p className="mt-3.5 text-[14px] font-medium leading-[1.6] text-ink/85 sm:text-[clamp(14px,1.05vw,16px)]">
            {problem.sub}
          </p>
        </div>
      </LooseEnds>
    </section>
  );
}
