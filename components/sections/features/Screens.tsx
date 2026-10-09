import Image from "next/image";
import type { CSSProperties, JSX } from "react";
import { Icon } from "@/components/ui/Icon";
import { features, people, type Member, type ScreenKey } from "@/content/features";
import s from "./features.module.css";

// The ten app screens of section 9, rebuilt from the client's prototype (kloneme-prototype.html).
// Sizes are in prototype pixels × --k, so each screen scales with the phone.

const P = features.phone;

function Logo() {
  return (
    <span className={s.logo}>
      <Image src="/brand/kloneme-logo.webp" alt="" width={722} height={158} />
    </span>
  );
}

function Av({ who, className }: { who: Member; className?: string }) {
  return (
    <span className={`${s.av} ${className ?? ""}`} style={{ "--ac": people[who].color } as CSSProperties}>
      {people[who].name[0]}
    </span>
  );
}

function Avs({ list }: { list: readonly Member[] }) {
  return (
    <span className={s.avs}>
      {list.map((w) => (
        <Av key={w} who={w} />
      ))}
    </span>
  );
}

const Klo = ({ face, className }: { face: string; className?: string }) => (
  <Image src={`/klo/${face}.png`} alt="" width={528} height={456} sizes="140px" className={className} />
);

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9z" />
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z" />
    </svg>
  );
}

/* ---------- 1 · Sign in ---------- */
function Auth() {
  const A = P.auth;
  return (
    <>
      <span className={s.auBg} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <div className={s.top}>
        <span className={`${s.backBtn} ${s.auBack}`}>
          <Icon name="left" strokeWidth={2.2} />
        </span>
        <Logo />
        <span className={s.spacer} />
      </div>
      <div className={s.auStage}>
        <Klo face="happy" />
      </div>
      <p className={s.auH}>
        {A.title}
        <br />
        <em>{A.accent}</em>
      </p>
      <p className={s.auP}>{A.body}</p>
      <div className={s.auBtns}>
        <span className={`${s.auBtn} ${s.auDark}`}>
          <Icon name="apple" />
          {A.apple}
        </span>
        <span className={`${s.auBtn} ${s.auLight}`}>
          <GoogleG />
          {A.google}
        </span>
        <span className={`${s.auBtn} ${s.auLine}`}>
          <Icon name="send" strokeWidth={2} />
          {A.email}
        </span>
        <span className={s.auFace}>
          <Icon name="face" strokeWidth={2} />
          {A.member} <b>{A.faceId}</b>
        </span>
      </div>
    </>
  );
}

/* ---------- 2 · Chat with Klonie ---------- */
function Chat() {
  const C = P.chat;
  return (
    <>
      <div className={s.chatTop}>
        <span className={`${s.backBtn} ${s.chatBack}`}>
          <Icon name="left" strokeWidth={2.2} />
        </span>
        <span className={s.chatId}>
          <b>{C.name}</b>
          <span>{C.tagline}</span>
        </span>
        <span className={s.spacer} />
      </div>
      <div className={s.stage}>
        <span className={s.halo} />
        <span className={s.stageKlo}>
          <Klo face="helping" />
          <Klo face="thinking" className={s.kloThink} />
        </span>
        <span className={s.kstatus}>
          <i />
          <span className={s.ks}>
            <span className={s.ksA}>{C.status}</span>
            <span className={s.ksB}>{C.thinking}</span>
            <span className={s.ksC}>{C.answered}</span>
          </span>
        </span>
      </div>
      <div className={s.msgs}>
        <p className={`${s.msg} ${s.me}`}>{C.question}</p>
        <div className={`${s.msg} ${s.ai}`}>
          {C.intro}
          <ul>
            {C.items.map((it, i) => (
              <li key={it.title} style={{ "--i": i } as CSSProperties}>
                <b>{it.title}</b>: {it.due}
              </li>
            ))}
          </ul>
          {C.outro.lead} <b>{C.outro.strong}</b>
          {C.outro.rest}
          <span className={s.src}>
            {C.sources.map((src) => (
              <span key={src}>{src}</span>
            ))}
          </span>
          <span className={s.opens}>
            <span>{C.open}</span>
          </span>
        </div>
      </div>
      <div className={s.sugg}>
        {C.suggestions.map((q) => (
          <span key={q}>{q}</span>
        ))}
      </div>
      <div className={s.composer}>
        <span>{C.placeholder}</span>
        <i className={s.mic}>
          <Icon name="mic" strokeWidth={2} />
        </i>
        <i>
          <Icon name="send" strokeWidth={2} />
        </i>
      </div>
    </>
  );
}

/* ---------- 3a · Travel: map and trip deadlines ---------- */
function Travel() {
  const T = P.travel;
  const [hx, hy] = T.hero.at;
  return (
    <>
      <span className={s.stars} aria-hidden="true" />
      <span className={s.flyby} aria-hidden="true">
        <Icon name="plane" strokeWidth={2} />
      </span>
      <div className={s.top}>
        <Logo />
        <span className={`${s.iconBtn} ${s.darkIb}`}>
          <Icon name="bell" strokeWidth={2} />
          <i className={s.pip} />
        </span>
      </div>
      <p className={s.bigT}>{T.title}</p>
      <p className={s.tvSub}>{T.sub}</p>
      <div className={s.seg}>
        <span className={s.knob} />
        <span data-on>{T.seg[0]}</span>
        <span>{T.seg[1]}</span>
      </div>
      <div className={s.mapcard}>
        <div className={s.map}>
          <Image src="/app/proto/world-land.svg" alt="" width={660} height={300} unoptimized />
          <Image src="/app/proto/world-visited.svg" alt="" width={660} height={300} unoptimized className={s.mapVis} />
          <svg className={s.pins} viewBox="0 0 660 300">
            {T.bucket.map(([x, y], i) => (
              <circle
                key={`b${i}`}
                className={s.pin}
                style={{ "--i": i + 4 } as CSSProperties}
                cx={x}
                cy={y}
                r="5"
                fill="#0f0f10"
                stroke="#fff"
                strokeWidth="1.6"
                strokeDasharray="2.6 2"
              />
            ))}
            {T.visited.map(([x, y], i) => (
              <circle
                key={`v${i}`}
                className={s.pin}
                style={{ "--i": i } as CSSProperties}
                cx={x}
                cy={y}
                r="4.6"
                fill="#fff"
                stroke="#0f0f10"
                strokeWidth="1.8"
              />
            ))}
            <g className={s.pin}>
              <circle cx={T.home[0]} cy={T.home[1]} r="6.5" fill="#fff" />
              <circle cx={T.home[0]} cy={T.home[1]} r="3" fill="#0f0f10" />
            </g>
            <g className={`${s.pin} ${s.heroPin}`} style={{ "--i": 10 } as CSSProperties}>
              <circle className={s.halo9} cx={hx} cy={hy} r="9" fill="none" stroke="#fff" strokeWidth="2" />
              <circle cx={hx} cy={hy} r="7" fill="#fff" stroke="#0f0f10" strokeWidth="1.8" />
              <circle cx={hx} cy={hy} r="2.6" fill="#0f0f10" />
              <rect x={hx - 30} y={hy - 34} width="60" height="22" rx="11" fill="#fff" />
              <text x={hx} y={hy - 19} textAnchor="middle" fontSize="12" fontWeight="700" fill="#111">
                {T.hero.name}
              </text>
            </g>
          </svg>
        </div>
        <div className={s.legend}>
          <span>
            <i style={{ background: "#ffd400" }} />
            {T.legend.visited} {T.legend.count}
          </span>
          <span>
            <i className={s.legendRing} />
            {T.legend.bucket}
          </span>
          <span>{T.legend.tap}</span>
        </div>
      </div>
      <div className={s.counters}>
        {T.counters.map((c, i) => (
          <div key={c.name} className={s.counter} style={{ "--w": c.value / c.of, "--i": i } as CSSProperties}>
            <b>
              {c.value}
              <small> / {c.of}</small>
            </b>
            <span>{c.name}</span>
            <i className={s.mbar}>
              <i />
            </i>
          </div>
        ))}
      </div>
      <div className={s.track} style={{ "--w": T.track.value / T.track.of } as CSSProperties}>
        <div className={s.trTop}>
          <b>{T.track.name}</b>
          <span>{String(T.track.value).padStart(2, "0")}</span>
        </div>
        <div className={s.trLab}>
          <span>
            {T.track.value} of {T.track.of}
          </span>
          <span>{Math.round((T.track.value / T.track.of) * 100)}% of target</span>
        </div>
        <i className={s.pbar}>
          <i />
        </i>
        <div className={s.next}>
          <span>{T.track.nextLabel}</span>
          <b>{T.track.next}</b>
        </div>
      </div>
    </>
  );
}

/* ---------- 3b · Savings & goals ---------- */
function Goals() {
  const G = P.goals;
  return (
    <>
      <div className={s.subhead}>
        <span className={`${s.backBtn} ${s.darkBack}`}>
          <Icon name="left" strokeWidth={2.2} />
          {G.back}
        </span>
        <span className={`${s.iconBtn} ${s.glAdd}`}>
          <Icon name="plus" strokeWidth={2.2} />
        </span>
      </div>
      <p className={s.subttl}>{G.title}</p>
      <p className={s.glSub}>
        {G.sub.lead} <b>{G.sub.money}</b> {G.sub.rest}
      </p>
      <div className={s.gSum}>
        <svg viewBox="0 0 120 120">
          <defs>
            <linearGradient id="ft-gg">
              <stop offset="0" stopColor="#00b87f" />
              <stop offset="1" stopColor="#8dffd6" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="12" />
          <circle
            className={s.arc}
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="url(#ft-gg)"
            strokeWidth="12"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${G.ring.pct / 100} 1`}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
            {G.ring.value}
          </text>
        </svg>
        <div>
          <span>{G.overall}</span>
          <b>{G.ring.pct}%</b>
          <p>{G.summary}</p>
        </div>
      </div>
      {G.list.map((g, i) => (
        <div key={g.name} className={s.goal} style={{ "--w": g.pct / 100, "--i": i } as CSSProperties}>
          <div className={s.gR1}>
            <span className={s.gIc} style={{ "--gc": g.color } as CSSProperties}>
              <Icon name={g.icon} strokeWidth={2} />
            </span>
            <span className={s.gT}>
              <b>{g.name}</b>
              <span>
                Target {g.target} · {g.due}
              </span>
            </span>
            <span className={s.gAmt}>
              <b>{g.saved}</b>
              <span>{g.pct}%</span>
            </span>
          </div>
          <i className={s.gBar}>
            <i />
          </i>
          <div className={s.gFoot}>
            <span className={s.gSt} data-st={g.state}>
              {g.status}
            </span>
            <span className={s.gFund}>
              <Icon name="plus" strokeWidth={2.4} />
              {G.add}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

/* ---------- 3c · Hobbies: progress rings ---------- */
function Hobbies() {
  const H = P.hobbies;
  return (
    <>
      <div className={s.hbHero}>
        <span className={`${s.blob} ${s.b1}`} />
        <span className={`${s.blob} ${s.b2}`} />
        <span className={`${s.blob} ${s.b3}`} />
        <div className={s.top}>
          <Logo />
          <span className={`${s.iconBtn} ${s.hbIb}`}>
            <Icon name="bell" strokeWidth={2} />
          </span>
        </div>
        <p className={s.bigT}>{H.title}</p>
        <p className={s.hbSub}>{H.sub}</p>
        <div className={s.ringwrap}>
          <svg viewBox="0 0 170 170">
            {H.rings.map((r, i) => (
              <g key={r.name}>
                <circle cx="85" cy="85" r={r.r} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="12" />
                <circle
                  className={s.arc}
                  style={{ "--i": i } as CSSProperties}
                  cx="85"
                  cy="85"
                  r={r.r}
                  fill="none"
                  stroke={r.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={`${r.pct} 1`}
                  transform="rotate(-90 85 85)"
                />
              </g>
            ))}
            <text x="85" y="88" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700">
              {H.overall.pct}
            </text>
            <text x="85" y="106" textAnchor="middle" fill="rgba(255,255,255,.85)" fontSize="11">
              {H.overall.label}
            </text>
          </svg>
          <div className={s.rlegend}>
            {H.rings.map((r) => (
              <div key={r.name}>
                <span>
                  <i style={{ background: r.color }} />
                  {r.name}
                </span>
                <b>{Math.round(r.pct * 100)}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className={s.hbSec}>
        {H.categoriesLabel}
        <span className={s.addBtn}>
          <Icon name="plus" strokeWidth={2.4} />
          {H.add}
        </span>
      </p>
      <div className={s.catgrid}>
        {H.categories.map((c, i) => (
          <div key={c.name} className={s.cat} style={{ "--bgc": c.bg, "--fc": c.fg, "--i": i } as CSSProperties}>
            <span className={s.catRow}>
              <span className={s.catIc}>
                <Icon name={c.icon} strokeWidth={2} />
              </span>
              <span className={s.catN}>{c.count}</span>
            </span>
            <b>{c.name}</b>
            <span>{c.line}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- 3d · Vault ---------- */
function Vault() {
  const V = P.vault;
  return (
    <>
      <span className={s.vlGrid} aria-hidden="true" />
      <div className={s.top}>
        <Logo />
        <span className={`${s.iconBtn} ${s.darkIb}`}>
          <Icon name="share" strokeWidth={2} />
          <i className={`${s.pip} ${s.vlPip}`} />
        </span>
      </div>
      <p className={s.bigT}>{V.title}</p>
      <p className={s.vlSub}>{V.sub}</p>
      <p className={s.vlLock}>
        <Icon name="shield" strokeWidth={2.2} />
        {V.lock}
      </p>
      <div className={`${s.seg} ${s.vlSeg}`}>
        <span className={s.knob} />
        <span data-on>{V.seg[0]}</span>
        <span>{V.seg[1]}</span>
      </div>
      <div className={s.vlMem}>
        <span>
          <Av who="M" />
          <b>{V.owner}</b>
        </span>
      </div>
      <div className={s.vlCats}>
        {V.cats.map((c, i) => (
          <span key={c} data-on={i === 0 || undefined}>
            {c}
          </span>
        ))}
      </div>
      <div className={s.vlStack}>
        {V.docs.map((d, i) => (
          <div
            key={d.name}
            className={s.doc}
            style={{ "--d1": d.from, "--d2": d.to, "--i": i, zIndex: i + 1 } as CSSProperties}
          >
            <span className={s.docIc}>
              <Icon name={d.icon} strokeWidth={2} />
            </span>
            <span className={s.docT}>
              <b>{d.name}</b>
              <span>{d.line}</span>
            </span>
            <span className={s.pill}>{V.held}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- 4a · Family calendar ---------- */
function Calendar() {
  const C = P.calendar;
  return (
    <>
      <div className={s.top}>
        <span className={`${s.backBtn} ${s.lightBack}`}>
          <Icon name="left" strokeWidth={2.2} />
          {C.back}
        </span>
        <span className={`${s.iconBtn} ${s.inkBtn}`}>
          <Icon name="plus" strokeWidth={2.2} />
        </span>
      </div>
      <div className={s.calH}>
        <div>
          <p className={s.eyebrow}>{C.eyebrow}</p>
          <p className={s.subttl}>{C.month}</p>
        </div>
        <span className={s.calArrows}>
          <span>
            <Icon name="left" strokeWidth={2.2} />
          </span>
          <span>
            <Icon name="left" strokeWidth={2.2} className={s.flip} />
          </span>
        </span>
      </div>
      <div className={s.calFilters}>
        {C.filters.map((f, i) => (
          <span key={f.name} data-on={i === 0 || undefined} style={{ "--c": f.color } as CSSProperties}>
            <i className={i === 0 ? s.allDot : undefined} />
            {f.name}
          </span>
        ))}
      </div>
      <div className={s.calGrid}>
        {C.dow.map((d, i) => (
          <span key={i} className={s.dow}>
            {d}
          </span>
        ))}
        {Array.from({ length: C.lead }, (_, i) => (
          <span key={`x${i}`} />
        ))}
        {Array.from({ length: C.days }, (_, i) => {
          const d = i + 1;
          return (
            <span
              key={d}
              className={s.day}
              data-sel={d === C.today || undefined}
              style={{ "--i": i } as CSSProperties}
            >
              {d}
              <span className={s.dts}>
                {(C.dots[d] ?? []).map((c) => (
                  <i key={c} style={{ "--c": c } as CSSProperties} />
                ))}
              </span>
            </span>
          );
        })}
      </div>
      <p className={s.hSec}>
        <span>{C.day}</span>
        <small>{C.count}</small>
      </p>
      <div className={s.agenda}>
        {C.agenda.map((e, i) => (
          <div key={e.name} className={s.ag} style={{ "--c": e.color, "--i": i } as CSSProperties}>
            <span className={s.agTm}>
              {e.time}
              <span>{e.ampm}</span>
            </span>
            <span className={s.agBar} />
            <span className={s.agIc}>
              <Icon name={e.icon} strokeWidth={2} />
            </span>
            <span className={s.agT}>
              <b>{e.name}</b>
              <span>{e.stream}</span>
            </span>
            <Avs list={e.who} />
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- 4b · Chores leaderboard ---------- */
function Chores() {
  const C = P.chores;
  return (
    <>
      <div className={s.subhead}>
        <span className={`${s.backBtn} ${s.faBack}`}>
          <Icon name="left" strokeWidth={2.2} />
          {C.back}
        </span>
      </div>
      <p className={`${s.subttl} ${s.faInk}`}>{C.title}</p>
      <p className={s.greet}>{C.sub}</p>
      <div className={s.podium}>
        {C.podium.map((p, i) => (
          <div key={p.who} className={s.pod} style={{ "--i": i } as CSSProperties}>
            {p.crown && <span className={s.crown} />}
            <Av who={p.who} />
            <div
              className={s.blk}
              style={{ "--h": p.height, "--c1": p.from, "--c2": p.to } as CSSProperties}
            >
              <b>{p.points}</b>
              <span>{people[p.who].short}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={s.faTabs}>
        {C.tabs.map((t, i) => (
          <span key={t} data-on={i === 0 || undefined}>
            {t}
          </span>
        ))}
      </div>
      {C.list.map((c, i) => (
        <div key={c.name} className={s.chore} data-first={i === 0 || undefined} style={{ "--c": c.color, "--i": i } as CSSProperties}>
          <span className={s.chIc}>
            <Icon name={c.icon} strokeWidth={2} />
          </span>
          <span className={s.chT}>
            <b>{c.name}</b>
            <span data-late={c.late || undefined}>{c.due}</span> <span>· {people[c.who].short}</span>
          </span>
          <span className={s.pts}>+{c.points}</span>
          <span className={s.ck}>
            <Icon name="check" strokeWidth={2.6} />
          </span>
          {i === 0 && <span className={s.ptsPop}>+{c.points}</span>}
        </div>
      ))}
    </>
  );
}

/* ---------- 4c · Memories ---------- */
function Memories() {
  const M = P.memories;
  return (
    <>
      <div className={s.subhead}>
        <span className={`${s.backBtn} ${s.faBack}`}>
          <Icon name="left" strokeWidth={2.2} />
          {M.back}
        </span>
        <span className={`${s.iconBtn} ${s.mmAdd}`}>
          <Icon name="plus" strokeWidth={2.2} />
        </span>
      </div>
      <p className={`${s.subttl} ${s.faInk}`}>{M.title}</p>
      <p className={s.greet}>{M.sub}</p>
      <div className={s.otd}>
        <Image src={M.story.img} alt="" fill sizes="320px" className={s.otdImg} />
        <span className={s.otdBars}>
          <i data-on />
          <i />
          <i />
          <i />
        </span>
        <span className={s.otdT}>
          <span className={s.otdEye}>{M.story.eyebrow}</span>
          <b>{M.story.title}</b>
          <span>{M.story.line}</span>
        </span>
        <span className={s.otdPlay}>
          <svg viewBox="0 0 24 24">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </span>
      </div>
      <div className={`${s.faTabs} ${s.mmTabs}`}>
        {M.tabs.map((t, i) => (
          <span key={t} data-on={i === 0 || undefined}>
            {t}
          </span>
        ))}
      </div>
      <div className={s.masonry}>
        {M.columns.map((col, c) => (
          <div key={c}>
            {col.map((m, i) => (
              <div key={m.title} className={s.mem} style={{ "--i": i * 2 + c } as CSSProperties}>
                <span className={s.memImg} style={{ "--h": m.h } as CSSProperties}>
                  <Image src={m.img} alt="" fill sizes="160px" />
                </span>
                <span className={s.mt}>
                  <b>{m.title}</b>
                  <span>{m.when}</span>
                  <Avs list={m.who} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- 4d · Emergency share ---------- */
function Emergency() {
  const E = P.emergency;
  return (
    <>
      <div className={s.subhead}>
        <span className={`${s.backBtn} ${s.faBack}`}>
          <Icon name="left" strokeWidth={2.2} />
          {E.back}
        </span>
      </div>
      <p className={`${s.subttl} ${s.faInk}`}>{E.title}</p>
      <p className={s.greet}>{E.sub}</p>
      <p className={s.emSec}>
        <b>{E.whatLabel}</b>
      </p>
      <div className={s.emDocs}>
        {E.docs.map((d) => (
          <span key={d.name} className={s.emDoc} data-on={d.on || undefined}>
            <span className={s.emIc}>
              <Icon name={d.icon} strokeWidth={2} />
            </span>
            <span>
              <b>{d.name}</b>
              <span>{d.line}</span>
            </span>
          </span>
        ))}
      </div>
      <p className={s.emSec}>
        <b>{E.whoLabel}</b>
        <span>{E.expires}</span>
      </p>
      <div className={s.emWho}>
        {E.who.map((w) => (
          <span key={w.name} className={s.emP}>
            {w.who ? (
              <Av who={w.who} />
            ) : (
              <span className={s.av} style={{ "--ac": "#0aa8d9" } as CSSProperties}>
                {w.initials}
              </span>
            )}
            <span>
              <b>{w.name}</b>
              <span>{w.role}</span>
            </span>
          </span>
        ))}
        <span className={`${s.emP} ${s.emAdd}`}>{E.add}</span>
      </div>
      <div className={s.emHold}>
        <span className={s.hold}>
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(226,72,61,.15)" strokeWidth="8" />
            <circle
              className={s.holdArc}
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e2483d"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <span className={s.holdIn}>
            <Icon name="sos" strokeWidth={2} />
            <b>{E.hold}</b>
          </span>
        </span>
        <p className={s.emNote}>{E.note}</p>
      </div>
      <div className={s.emDone}>
        <span className={s.emOk}>
          <Icon name="check" strokeWidth={2.6} />
        </span>
        <b>{E.sent}</b>
        <p>{E.sentBody}</p>
        <div className={s.emRcpt}>
          {E.who.map((w, i) => (
            <div key={w.name} style={{ "--i": i } as CSSProperties}>
              {w.who ? (
                <Av who={w.who} />
              ) : (
                <span className={s.av} style={{ "--ac": "#0aa8d9" } as CSSProperties}>
                  {w.initials}
                </span>
              )}
              {w.name}
              <em>{E.delivered}</em>
            </div>
          ))}
        </div>
        <span className={s.emUndo}>{E.stop}</span>
      </div>
    </>
  );
}

export const SCREENS: Record<ScreenKey, () => JSX.Element> = {
  auth: Auth,
  chat: Chat,
  travel: Travel,
  goals: Goals,
  hobbies: Hobbies,
  vault: Vault,
  calendar: Calendar,
  chores: Chores,
  memories: Memories,
  emergency: Emergency,
};
