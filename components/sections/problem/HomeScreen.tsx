import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { problem } from "@/content/problem";
import s from "./home.module.css";

// The app's home screen inside the section's phone, rebuilt from the client's prototype
// (kloneme-prototype.html, #v-home). Sizes are prototype pixels × --k (its screen is 405px wide).

const H = problem.home;
const RING = 239; // the hobby ring's circumference (r 38), as in the prototype

function HobbyRing() {
  return (
    <svg className={s.ring} viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="10" />
      <circle
        cx="48"
        cy="48"
        r="38"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={RING}
        strokeDashoffset={Math.round(RING * (1 - H.hobbyRing / 100))}
        transform="rotate(-90 48 48)"
      />
      <text x="48" y="55" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">
        {H.hobbyRing}%
      </text>
    </svg>
  );
}

export default function HomeScreen() {
  return (
    <div className={s.home}>
      <div className={s.top}>
        <Image src="/brand/kloneme-logo.webp" alt="" width={722} height={158} className={s.logo} />
        <span className={s.acts}>
          <span className={s.iconBtn}>
            <Icon name="search" strokeWidth={1.9} className={s.ic} />
          </span>
          <span className={s.iconBtn}>
            <Icon name="bell" strokeWidth={1.9} className={s.ic} />
            <i className={s.pip} />
          </span>
          <span className={s.me}>{H.initial}</span>
        </span>
      </div>
      <p className={s.greet}>{H.greeting}</p>
      <p className={s.greetSub}>{H.sub}</p>

      <div className={s.tiles}>
        {H.tiles.map((t) => (
          <div key={t.key} className={`${s.tile} ${s[t.key]}`}>
            {/* Travel shows photos and Hobbies a ring; the others a large faded icon */}
            {t.key === "travel" ? (
              <span className={s.photos}>
                {H.photos.map((src) => (
                  <Image key={src} src={src} alt="" width={132} height={172} sizes="90px" />
                ))}
              </span>
            ) : t.key === "hobbies" ? (
              <HobbyRing />
            ) : (
              <Icon name={t.icon} strokeWidth={1} className={s.art} />
            )}
            <span className={s.pill}>
              <Icon name={t.icon} strokeWidth={2} className={s.pillIc} />
              {t.label}
            </span>
            <b className={s.slogan}>
              {t.slogan.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </b>
            <span className={s.meta}>{t.meta}</span>
            <span className={s.go}>
              {H.open}
              <Icon name="arrow" strokeWidth={2.2} className={s.goIc} />
            </span>
          </div>
        ))}
      </div>

      <div className={s.ask}>
        <span className={s.askKlo}>
          <Image src={H.ask.klo} alt="" width={360} height={366} sizes="60px" />
        </span>
        <span className={s.askText}>
          <b>{H.ask.title}</b>
          <span>{H.ask.prompt}</span>
        </span>
        <span className={s.askGo}>
          <Icon name="arrow" strokeWidth={2} className={s.ic} />
        </span>
      </div>

      {/* Bottom bar, on top of the tiles (Home is the open tab) */}
      <div className={s.nav}>
        <span className={`${s.navBtn} ${s.navOn}`}>
          <Icon name="home" strokeWidth={1.9} className={s.navIc} />
          {H.nav.home}
        </span>
        <span className={s.navBtn}>
          <Icon name="plane" strokeWidth={1.9} className={s.navIc} />
        </span>
        <span className={s.kloBtn}>
          <Image src={H.nav.klo} alt="" width={360} height={392} sizes="60px" />
        </span>
        <span className={s.navBtn}>
          <Icon name="palette" strokeWidth={1.9} className={s.navIc} />
        </span>
        <span className={s.navBtn}>
          <Icon name="cal" strokeWidth={1.9} className={s.navIc} />
        </span>
      </div>
    </div>
  );
}
