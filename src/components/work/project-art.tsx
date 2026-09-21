/**
 * Per-project poster illustrations — the bold, full-bleed graphic used as
 * the project image on the home showcase cards and the /work pages.
 * Each of Sinvonix's three live deployment tracks gets a purpose-built
 * scene: a saturated brand-gradient field, an oversized "ghost" icon for
 * depth, and a bright foreground motif + headline stat — not a flat,
 * thin-line app-screenshot mockup. Palette is drawn from the real brand
 * + status tokens throughout.
 */

import { Headset, Lock, ShieldCheck, type LucideIcon } from "lucide-react";

const T = "var(--color-brand-600)"; // primary accent
const A = "var(--color-brand-400)"; // secondary accent (lighter)
const B = "var(--color-brand-300)"; // tertiary accent (lightest)
const OK = "var(--color-success-400)"; // live / protected / granted — bright, for dark grounds
const INK = "var(--color-neutral-900)";
const SOFT = "var(--color-neutral-400)";
const PANEL = "var(--color-neutral-100)";
const LINE = "var(--color-neutral-200)";

type ArtKind = "soc" | "contact" | "identity" | "crm" | "ai" | "commerce" | "analytics" | "ops";
type ArtProject = { name: string; category: string; slug?: string };

// Sinvonix's three live tracks get an explicit, deliberate scene each —
// no guessing from keywords for the cases that actually exist.
const KIND_BY_SLUG: Record<string, ArtKind> = {
  "managed-detection-response": "soc",
  "omnichannel-contact-centre": "contact",
  "identity-access-governance": "identity",
};

// Full-bleed poster kinds paint their own background; the legacy kinds
// below still use the shared white-card + window-chrome treatment.
const POSTER_KINDS = new Set<ArtKind>(["soc", "contact", "identity"]);

function artKind(p: ArtProject): ArtKind {
  if (p.slug && KIND_BY_SLUG[p.slug]) return KIND_BY_SLUG[p.slug];
  const s = `${p.name} ${p.category}`.toLowerCase();
  if (s.includes("detection") || s.includes("monitoring") || s.includes("soc") || s.includes("security")) return "soc";
  if (s.includes("contact") || s.includes("omnichannel") || s.includes("customer operations")) return "contact";
  if (s.includes("identity") || s.includes("access") || s.includes("governance")) return "identity";
  if (s.includes("crm") || s.includes("enterprise")) return "crm";
  if (s.includes(" ai") || s.includes("ai ") || s.includes("intelligence platform")) return "ai";
  if (s.includes("commerce") || s.includes("shop") || s.includes("store")) return "commerce";
  if (s.includes("analytic") || s.includes("marketing") || s.includes("intelligence")) return "analytics";
  return "ops";
}

/** A project-specific poster illustration — the card's "image". */
export function ProjectArt({
  project,
  kind: kindProp,
  className,
}: {
  project: ArtProject;
  kind?: ArtKind;
  className?: string;
}) {
  const kind = kindProp ?? artKind(project);
  const isPoster = POSTER_KINDS.has(kind);

  return (
    <div
      className={
        className ??
        "mt-5 overflow-hidden rounded-lg border border-line bg-surface shadow-[0_1px_2px_rgba(0,0,0,.05)]"
      }
    >
      <svg viewBox="0 0 320 176" className="block w-full" role="img" aria-label={`${project.name} preview`}>
        {!isPoster && (
          <>
            <rect width="320" height="176" fill="var(--color-surface, #fff)" />
            {/* window chrome */}
            <rect width="320" height="22" fill={PANEL} />
            <circle cx="14" cy="11" r="3" fill={OK} opacity="0.6" />
            <circle cx="26" cy="11" r="3" fill={SOFT} opacity="0.4" />
            <circle cx="38" cy="11" r="3" fill={SOFT} opacity="0.4" />
            <rect x="60" y="7" width="120" height="8" rx="4" fill={LINE} />
          </>
        )}
        {kind === "soc" && <ArtSoc />}
        {kind === "contact" && <ArtContact />}
        {kind === "identity" && <ArtIdentity />}
        {kind === "analytics" && <ArtAnalytics />}
        {kind === "commerce" && <ArtCommerce />}
        {kind === "crm" && <ArtCrm />}
        {kind === "ai" && <ArtAi />}
        {kind === "ops" && <ArtOps />}
      </svg>
    </div>
  );
}

/* ---- poster building blocks -------------------------------------------- */

/** Sparse dot texture over the whole canvas — restrained, not decorative noise. */
function DotTexture({ id }: { id: string }) {
  return (
    <>
      <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="1.4" cy="1.4" r="1.4" fill="#fff" opacity="0.14" />
      </pattern>
      <rect width="320" height="176" fill={`url(#${id})`} />
    </>
  );
}

/** A small circular icon badge, top-left of the poster — the card's identity mark. */
function Badge({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <foreignObject x="16" y="16" width="36" height="36">
      <div
        className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,.25)]"
        style={{ color }}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={2.4} />
      </div>
    </foreignObject>
  );
}

/** Managed Detection & Response — dark vault gradient, radar sweep, a headline "24/7". */
function ArtSoc() {
  const rows = [
    { label: "Endpoints", on: true },
    { label: "Identity", on: true },
    { label: "Network", on: true },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="soc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-brand-800)" />
          <stop offset="1" stopColor="var(--color-brand-950)" />
        </linearGradient>
      </defs>
      <rect width="320" height="176" fill="url(#soc-bg)" />
      <DotTexture id="soc-dots" />

      {/* oversized ghost shield, bottom-right, for depth */}
      <path
        d="M0 -46 L34 -32 L34 6 Q34 40 0 58 Q-34 40 -34 6 L-34 -32 Z"
        fill="#fff"
        opacity="0.07"
        transform="translate(266,150) scale(1.9) rotate(-10)"
      />

      {/* radar */}
      <g transform="translate(88,102)">
        <circle r="36" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle r="24" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle r="12" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.2" />
        <path d="M0 0 L0 -36 A36 36 0 0 1 34 -13 Z" fill="#fff" opacity="0.14" />
        <circle cx="20" cy="-22" r="3" fill={OK} />
        <circle cx="20" cy="-22" r="7" fill="none" stroke={OK} opacity="0.4" />
        <circle cx="-16" cy="18" r="2.5" fill="#fff" opacity="0.5" />
        <circle r="4" fill="#fff" />
      </g>

      {/* headline stat */}
      <text x="304" y="88" textAnchor="end" fontFamily="system-ui" fontWeight="900" fontSize="46" fill="#fff">
        24/7
      </text>
      <text
        x="304"
        y="104"
        textAnchor="end"
        fontFamily="system-ui"
        fontWeight="700"
        fontSize="10"
        letterSpacing="1.5"
        fill="#fff"
        opacity="0.65"
      >
        THREAT MONITORING
      </text>

      {/* protected-surface pills */}
      <g transform="translate(30,138)">
        {rows.map((r, i) => (
          <g key={r.label} transform={`translate(${i * 92},0)`}>
            <rect width="84" height="26" rx="13" fill="#fff" opacity="0.1" />
            <circle cx="16" cy="13" r="4" fill={OK} />
            <text x="28" y="17" fontFamily="system-ui" fontWeight="700" fontSize="10.5" fill="#fff">
              {r.label}
            </text>
          </g>
        ))}
      </g>

      <Badge icon={ShieldCheck} color="var(--color-brand-700)" />
    </g>
  );
}

/** Omnichannel Contact Centre — vivid gradient, channels converging on a hub, agent assist. */
function ArtContact() {
  return (
    <g>
      <defs>
        <linearGradient id="contact-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-brand-500)" />
          <stop offset="1" stopColor="var(--color-brand-700)" />
        </linearGradient>
      </defs>
      <rect width="320" height="176" fill="url(#contact-bg)" />
      <DotTexture id="contact-dots" />

      {/* oversized ghost speech bubble, bottom-right */}
      <path
        d="M-42 -28 H42 a12 12 0 0 1 12 12 v30 a12 12 0 0 1 -12 12 H-14 l-18 16 v-16 H-42 a12 12 0 0 1 -12 -12 v-30 a12 12 0 0 1 12 -12 Z"
        fill="#fff"
        opacity="0.08"
        transform="translate(250,130) scale(1.7) rotate(6)"
      />

      {/* channels converging on the hub */}
      <path d="M46 52 Q 104 40 146 88" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M46 96 L146 96" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M46 140 Q 104 152 146 104" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
      {[
        { y: 52, o: 0.55 },
        { y: 96, o: 0.75 },
        { y: 140, o: 0.95 },
      ].map((c, i) => (
        <circle key={i} cx="34" cy={c.y} r="13" fill="#fff" opacity={c.o} />
      ))}
      <circle cx="150" cy="96" r="22" fill="#fff" />
      <circle cx="150" cy="96" r="22" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="8" />
      <circle cx="150" cy="96" r="10" fill="none" stroke={T} strokeWidth="2" opacity="0.7" />

      {/* headline stat */}
      <text x="304" y="52" textAnchor="end" fontFamily="system-ui" fontWeight="900" fontSize="30" fill="#fff">
        OMNI
      </text>
      <text
        x="304"
        y="66"
        textAnchor="end"
        fontFamily="system-ui"
        fontWeight="700"
        fontSize="9.5"
        letterSpacing="1.5"
        fill="#fff"
        opacity="0.7"
      >
        EVERY CHANNEL, ONE HUB
      </text>

      {/* agent assist transcript */}
      <rect x="196" y="80" width="110" height="26" rx="10" fill="#fff" opacity="0.16" />
      <rect x="206" y="88" width="80" height="4.5" rx="2.25" fill="#fff" opacity="0.7" />
      <rect x="206" y="97" width="56" height="4.5" rx="2.25" fill="#fff" opacity="0.5" />
      <rect x="206" y="112" width="100" height="30" rx="10" fill="#fff" />
      <rect x="216" y="121" width="72" height="4.5" rx="2.25" fill={T} opacity="0.85" />
      <rect x="216" y="130" width="50" height="4.5" rx="2.25" fill={T} opacity="0.55" />

      <Badge icon={Headset} color="var(--color-brand-600)" />
    </g>
  );
}

/** Identity & Access Management — deep gradient, zero-trust shield, "0" standing access. */
function ArtIdentity() {
  const tiers = [
    { label: "Admin", w: 66, fill: "#fff" },
    { label: "Standard", w: 44, fill: "#fff", o: 0.6 },
    { label: "Guest", w: 22, fill: "#fff", o: 0.3 },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="id-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-brand-700)" />
          <stop offset="1" stopColor="var(--color-brand-900)" />
        </linearGradient>
      </defs>
      <rect width="320" height="176" fill="url(#id-bg)" />
      <DotTexture id="id-dots" />

      {/* oversized ghost shield, bottom-right */}
      <path
        d="M0 -46 L34 -32 L34 6 Q34 40 0 58 Q-34 40 -34 6 L-34 -32 Z"
        fill="#fff"
        opacity="0.07"
        transform="translate(272,146) scale(1.9) rotate(9)"
      />

      {/* access graph */}
      <path d="M34 56 L58 84" stroke={OK} strokeWidth="2" />
      <path d="M34 140 L60 112" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" />
      <path d="M112 150 L84 118" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.6" strokeDasharray="3 4" />
      <circle cx="30" cy="52" r="11" fill={OK} />
      <circle cx="30" cy="144" r="10" fill="#fff" opacity="0.7" />
      <circle cx="118" cy="154" r="9" fill="#fff" opacity="0.35" />

      {/* shield / perimeter, glowing */}
      <circle cx="70" cy="98" r="40" fill="#fff" opacity="0.08" />
      <path
        d="M70 62 L100 74 L100 106 Q100 134 70 148 Q40 134 40 106 L40 74 Z"
        fill="#fff"
      />
      <rect x="59" y="98" width="22" height="17" rx="3.5" fill={INK} />
      <path d="M63 98 v-8 a7 7 0 0 1 14 0 v8" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* headline stat */}
      <text x="304" y="56" textAnchor="end" fontFamily="system-ui" fontWeight="900" fontSize="46" fill="#fff">
        0
      </text>
      <text
        x="304"
        y="72"
        textAnchor="end"
        fontFamily="system-ui"
        fontWeight="700"
        fontSize="9.5"
        letterSpacing="1.5"
        fill="#fff"
        opacity="0.7"
      >
        STANDING ACCESS
      </text>

      {/* least-privilege tiers */}
      <g transform="translate(192,96)">
        {tiers.map((t, i) => (
          <g key={t.label} transform={`translate(0,${i * 22})`}>
            <text x="0" y="-4" fontFamily="system-ui" fontWeight="600" fontSize="9" fill="#fff" opacity="0.6">
              {t.label}
            </text>
            <rect y="1" width="112" height="7" rx="3.5" fill="#fff" opacity="0.14" />
            <rect y="1" width={t.w} height="7" rx="3.5" fill={t.fill} opacity={t.o ?? 1} />
          </g>
        ))}
      </g>

      <Badge icon={Lock} color="var(--color-brand-800)" />
    </g>
  );
}

function ArtAnalytics() {
  const bars = [30, 52, 40, 66, 48, 78, 58, 90];
  return (
    <g>
      {/* KPI tiles */}
      <rect x="14" y="34" width="88" height="40" rx="6" fill={PANEL} />
      <rect x="24" y="44" width="30" height="6" rx="3" fill={SOFT} />
      <text x="24" y="68" fontFamily="system-ui" fontWeight="800" fontSize="16" fill={INK}>3.4x</text>
      <rect x="110" y="34" width="88" height="40" rx="6" fill={PANEL} />
      <rect x="120" y="44" width="30" height="6" rx="3" fill={SOFT} />
      <text x="120" y="68" fontFamily="system-ui" fontWeight="800" fontSize="16" fill={T}>-27%</text>
      {/* area line */}
      <polyline points="14,150 50,132 86,138 122,118 158,124 194,100 230,108 266,80 306,86"
        fill="none" stroke={OK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="14,150 50,132 86,138 122,118 158,124 194,100 230,108 266,80 306,86 306,166 14,166"
        fill={OK} opacity="0.12" />
      {/* bar chart right */}
      <g transform="translate(210,34)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 13} y={40 - (h / 100) * 40} width="8" height={(h / 100) * 40} rx="2"
            fill={i === bars.length - 1 ? T : B} opacity={i === bars.length - 1 ? 1 : 0.5} />
        ))}
      </g>
    </g>
  );
}

function ArtCommerce() {
  const cards = [0, 1, 2];
  return (
    <g>
      {cards.map((i) => (
        <g key={i} transform={`translate(${14 + i * 98},34)`}>
          <rect width="86" height="118" rx="8" fill="var(--color-surface, #fff)" stroke={LINE} />
          <rect x="8" y="8" width="70" height="52" rx="6" fill={PANEL} />
          <circle cx="43" cy="34" r="15" fill={i === 1 ? OK : B} opacity="0.6" />
          <rect x="8" y="70" width="52" height="7" rx="3.5" fill={INK} opacity="0.8" />
          <rect x="8" y="82" width="34" height="6" rx="3" fill={SOFT} />
          <text x="8" y="108" fontFamily="system-ui" fontWeight="800" fontSize="12" fill={T}>${19 + i * 10}</text>
          <rect x="52" y="96" width="26" height="16" rx="8" fill={T} />
          <path d="M60 104 h10 M66 100 l4 4 -4 4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </g>
  );
}

function ArtCrm() {
  const rows = [0, 1, 2, 3];
  const tones = [OK, T, B, OK];
  return (
    <g>
      <rect x="14" y="34" width="292" height="18" rx="4" fill={PANEL} />
      <rect x="24" y="40" width="40" height="6" rx="3" fill={SOFT} />
      <rect x="150" y="40" width="40" height="6" rx="3" fill={SOFT} />
      <rect x="250" y="40" width="40" height="6" rx="3" fill={SOFT} />
      {rows.map((r) => (
        <g key={r} transform={`translate(0,${60 + r * 28})`}>
          <circle cx="28" cy="10" r="9" fill={tones[r]} opacity="0.75" />
          <rect x="46" y="4" width="80" height="7" rx="3.5" fill={INK} opacity="0.75" />
          <rect x="46" y="14" width="50" height="5" rx="2.5" fill={SOFT} />
          <rect x="150" y="5" width="70" height="9" rx="4.5" fill={LINE} />
          <rect x="250" y="3" width="46" height="14" rx="7" fill={r % 2 ? B : OK} opacity="0.25" />
          <rect x="256" y="7" width="34" height="6" rx="3" fill={r % 2 ? A : T} />
        </g>
      ))}
    </g>
  );
}

function ArtAi() {
  return (
    <g>
      {/* incoming bubble */}
      <rect x="14" y="36" width="150" height="34" rx="10" fill={PANEL} />
      <rect x="26" y="46" width="110" height="6" rx="3" fill={SOFT} />
      <rect x="26" y="57" width="80" height="6" rx="3" fill={SOFT} />
      {/* agent bubble */}
      <rect x="120" y="80" width="186" height="40" rx="10" fill={T} />
      <rect x="132" y="90" width="150" height="6" rx="3" fill="#fff" opacity="0.85" />
      <rect x="132" y="102" width="110" height="6" rx="3" fill="#fff" opacity="0.6" />
      {/* resolved tag + sparkline */}
      <rect x="14" y="130" width="120" height="26" rx="13" fill={OK} opacity="0.16" />
      <circle cx="30" cy="143" r="6" fill={OK} />
      <path d="M27 143 l2 2 4 -5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="147" fontFamily="system-ui" fontWeight="700" fontSize="10" fill={T}>68% auto-resolved</text>
      <polyline points="150,150 172,140 194,146 216,130 238,138 260,120 282,128 306,112"
        fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function ArtOps() {
  const rows = [0, 1, 2, 3];
  const on = [true, true, false, true];
  return (
    <g>
      {/* gauge */}
      <g transform="translate(60,102)">
        <path d="M-42 0 A42 42 0 0 1 42 0" fill="none" stroke={PANEL} strokeWidth="10" strokeLinecap="round" />
        <path d="M-42 0 A42 42 0 0 1 30 -29" fill="none" stroke={OK} strokeWidth="10" strokeLinecap="round" />
        <text x="0" y="-4" textAnchor="middle" fontFamily="system-ui" fontWeight="800" fontSize="16" fill={INK}>99%</text>
      </g>
      {/* status toggles */}
      {rows.map((r) => (
        <g key={r} transform={`translate(150,${40 + r * 30})`}>
          <circle cx="6" cy="8" r="4" fill={on[r] ? OK : SOFT} />
          <rect x="20" y="4" width="86" height="7" rx="3.5" fill={INK} opacity="0.65" />
          <rect x="128" y="0" width="30" height="16" rx="8" fill={on[r] ? T : LINE} />
          <circle cx={on[r] ? 150 : 136} cy="8" r="6" fill="var(--color-surface, #fff)" />
        </g>
      ))}
    </g>
  );
}
