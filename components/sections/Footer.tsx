import Image from "next/image";
import { footer, site } from "@/content/site";
import Wordmark from "./footer/Wordmark";
import s from "./footer/footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <a href="#top" aria-label={`${site.name} home`} className={s.logo}>
          <Image src="/brand/kloneme-logo.webp" alt="" width={722} height={158} className="h-6 w-auto" />
        </a>
        <nav aria-label={footer.label} className={s.nav}>
          {footer.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className={s.fine}>
        {footer.fine.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <Wordmark />
    </footer>
  );
}
