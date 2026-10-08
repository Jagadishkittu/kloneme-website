import { contact } from "@/content/contact";
import TopicUnfold from "./contact/TopicUnfold";
import s from "./contact/contact.module.css";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className={s.section}>
      <div className={s.grid}>
        <div className={s.copy}>
          <p className={s.kicker}>
            <i aria-hidden="true" />
            {contact.kicker}
          </p>
          <h2 id="contact-h" className={s.h2}>
            {contact.headline.lead} <em>{contact.headline.accent}</em>
          </h2>
          <p className={s.sub}>{contact.sub}</p>
        </div>
        <TopicUnfold />
      </div>
    </section>
  );
}
