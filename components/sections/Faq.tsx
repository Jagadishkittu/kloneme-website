import { faq } from "@/content/faq";
import AskKlo from "./faq/AskKlo";
import s from "./faq/faq.module.css";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-h" className={s.section}>
      <div className={s.head}>
        <h2 id="faq-h" className={s.h2}>
          {faq.headline.lead} <em>{faq.headline.accent}</em>
        </h2>
      </div>

      <AskKlo />

      {/* Every question and answer as plain text, for search engines and screen readers */}
      <dl className="sr-only">
        {faq.items.map((item) => (
          <div key={item.q}>
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
