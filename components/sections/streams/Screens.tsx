import type { CSSProperties, JSX } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { streams, type StreamKey } from "@/content/streams";
import s from "./streams.module.css";

const sc = streams.screens;

// Rows and blocks play in when their card reaches the centre; --i staggers them
const at = (i: number) => ({ "--i": i }) as CSSProperties;

function Row({ i, icon, title, meta }: { i: number; icon: IconName; title: string; meta: string }) {
  return (
    <div className={s.row} style={at(i)}>
      <span className={s.rowIcon}>
        <Icon name={icon} strokeWidth={2} />
      </span>
      <span className={s.rowText}>
        <b>{title}</b>
        <small>{meta}</small>
      </span>
    </div>
  );
}

function Travel() {
  const t = sc.travel;
  return (
    <>
      <Row i={0} icon="plane" title={t.title} meta={t.meta} />
      <div className={s.route} style={at(1)}>
        <span className={s.routeDot} />
        <span className={s.routeTrack}>
          <span className={s.routeFill} />
        </span>
        <span className={s.routeDot} />
      </div>
      <Row i={2} icon="cal" title={t.next.title} meta={t.next.meta} />
    </>
  );
}

function Health() {
  const h = sc.health;
  return (
    <>
      <div className={s.reading} style={at(0)}>
        <small>{h.title}</small>
        <b>{h.value}</b>
      </div>
      <svg className={s.spark} viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden="true" style={at(1)}>
        <path d="M2 34 L28 30 L54 36 L80 25 L106 29 L132 19 L158 24 L184 13 L198 16" pathLength={1} />
      </svg>
      <Row i={2} icon="cal" title={h.next.title} meta={h.next.meta} />
    </>
  );
}

const WEALTH_ICONS: IconName[] = ["home", "shield", "card"];

function Wealth() {
  return (
    <>
      {sc.wealth.map((r, i) => (
        <Row key={r.title} i={i} icon={WEALTH_ICONS[i]} title={r.title} meta={r.meta} />
      ))}
    </>
  );
}

function Family() {
  const f = sc.family;
  return (
    <>
      <p className={s.ask} style={at(0)}>
        {f.title}
      </p>
      <div className={s.people} style={at(1)}>
        <span className={s.turn} />
        {f.people.map((name) => (
          <span key={name} className={s.person}>
            <i>{name[0]}</i>
            <small>{name}</small>
          </span>
        ))}
      </div>
      <Row i={2} icon="cal" title={f.next.title} meta={f.next.meta} />
    </>
  );
}

function Hobbies() {
  const h = sc.hobbies;
  return (
    <>
      <div className={s.reading} style={at(0)}>
        <small>{h.title}</small>
        <b className={s.readingSm}>{h.meta}</b>
      </div>
      <div className={s.cells} style={at(1)}>
        {Array.from({ length: h.total }, (_, i) => (
          <i key={i} data-on={i < h.done || undefined} style={{ "--k": i } as CSSProperties} />
        ))}
      </div>
      <Row i={2} icon="cal" title={h.next.title} meta={h.next.meta} />
    </>
  );
}

function Vault() {
  const v = sc.vault;
  return (
    <>
      <div className={s.scan} style={at(0)}>
        <span className={s.scanBox}>
          <Icon name="face" strokeWidth={1.8} />
          <span className={s.scanLine} />
        </span>
        <span className={s.scanOk}>
          <Icon name="check" strokeWidth={2.6} />
        </span>
      </div>
      {v.docs.map((d, i) => (
        <Row key={d} i={i + 1} icon={i === 0 ? "id" : "card"} title={d} meta="" />
      ))}
      <p className={s.lock} style={at(3)}>
        <Icon name="lock" strokeWidth={2} />
        {v.lock}
      </p>
    </>
  );
}

const SCREENS: Record<StreamKey, () => JSX.Element> = {
  travel: Travel,
  health: Health,
  wealth: Wealth,
  family: Family,
  hobbies: Hobbies,
  vault: Vault,
};

export default function Screen({ kind }: { kind: StreamKey }) {
  const S = SCREENS[kind];
  return (
    <div className={s.screen} aria-hidden="true">
      <S />
    </div>
  );
}
