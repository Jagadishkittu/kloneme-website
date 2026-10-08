import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { stories } from "@/content/stories";
import MomentStack from "./stories/MomentStack";
import s from "./stories/stories.module.css";

export default function Stories() {
  return (
    <section id="stories" aria-labelledby="h-stories" className={s.section}>
      <div className={s.head}>
        <div>
          <p className={s.kicker}>{stories.kicker}</p>
          <h2 id="h-stories" className={s.h2}>
            {stories.headline.lead} <em>{stories.headline.accent}</em>
          </h2>
        </div>
        {/* Klo in the corner, where Sol keeps its mark */}
        <span className={s.klo} aria-hidden="true">
          <Image src="/klo/happy.png" alt="" width={528} height={456} sizes="96px" />
        </span>
      </div>

      <div className={s.stage}>
        <div className={s.aurora} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <MomentStack />
      </div>

      <div className={s.lines}>
        <p>
          <span className={s.ico} aria-hidden="true">
            <Icon name="users" strokeWidth={1.9} />
          </span>
          {stories.sub}
        </p>
        <p>
          <span className={`${s.ico} ${s.info}`} aria-hidden="true">
            i
          </span>
          {stories.note}
        </p>
      </div>
    </section>
  );
}
