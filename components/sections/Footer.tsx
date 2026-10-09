import Image from "next/image";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { footer, site } from "@/content/site";
import Newsletter from "./footer/Newsletter";
import s from "./footer/footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        {/* Left: logo, links and social profiles */}
        <div className={s.brand}>
          <a href="#top" aria-label={`${site.name} home`} className={s.logo}>
            <Image src="/brand/kloneme-logo.webp" alt="" width={722} height={158} className="h-7 w-auto" />
          </a>
          <nav aria-label={footer.label} className={s.nav}>
            {footer.links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <ul className={s.social}>
            {footer.social.map((n) => (
              <li key={n.name}>
                <a href={n.href} aria-label={n.label}>
                  <SocialIcon name={n.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: newsletter sign-up and the store buttons */}
        <div className={s.side}>
          <Newsletter />
          <StoreButtons size="sm" />
        </div>
      </div>
      <div className={s.fine}>
        {footer.fine.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </footer>
  );
}
