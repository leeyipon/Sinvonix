/**
 * Per-project "screenshot" illustrations — framed mini-UIs used as the
 * project image on the home showcase cards and the /work pages.
 * Palette tuned to sit on the cream paper of the pinboard cards.
 */

const T = "#0E7A66"; // teal
const G = "#2AA96E"; // green
const L = "#9CCB4C"; // lime
const INK = "#26332C";
const SOFT = "#9aa79f";
const PANEL = "#EEF2E8";
const LINE = "#DEE4D7";

type ArtKind = "crm" | "ai" | "commerce" | "analytics" | "ops";
type ArtProject = { name: string; category: string };

function artKind(p: ArtProject): ArtKind {
  const s = `${p.name} ${p.category}`.toLowerCase();
  if (s.includes("crm") || s.includes("enterprise")) return "crm";
  if (s.includes(" ai") || s.includes("ai ") || s.includes("intelligence platform")) return "ai";
  if (s.includes("commerce") || s.includes("shop") || s.includes("store")) return "commerce";
  if (s.includes("analytic") || s.includes("marketing") || s.includes("intelligence")) return "analytics";
  return "ops";
}

/** A framed, project-specific mini-UI illustration — the card's "image". */
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
  return (
    <div
      className={
        className ??
        "mt-5 overflow-hidden rounded-lg border border-[#ded8c6] bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)]"
      }
    >
      <svg viewBox="0 0 320 176" className="block w-full" role="img" aria-label={`${project.name} preview`}>
        <rect width="320" height="176" fill="#fff" />
        {/* window chrome */}
        <rect width="320" height="22" fill={PANEL} />
        <circle cx="14" cy="11" r="3" fill={G} opacity="0.6" />
        <circle cx="26" cy="11" r="3" fill={G} opacity="0.4" />
        <circle cx="38" cy="11" r="3" fill={G} opacity="0.4" />
        <rect x="60" y="7" width="120" height="8" rx="4" fill={LINE} />
        {kind === "analytics" && <ArtAnalytics />}
        {kind === "commerce" && <ArtCommerce />}
        {kind === "crm" && <ArtCrm />}
        {kind === "ai" && <ArtAi />}
        {kind === "ops" && <ArtOps />}
      </svg>
    </div>
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
        fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="14,150 50,132 86,138 122,118 158,124 194,100 230,108 266,80 306,86 306,166 14,166"
        fill={G} opacity="0.12" />
      {/* bar chart right */}
      <g transform="translate(210,34)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 13} y={40 - (h / 100) * 40} width="8" height={(h / 100) * 40} rx="2"
            fill={i === bars.length - 1 ? T : L} opacity={i === bars.length - 1 ? 1 : 0.5} />
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
          <rect width="86" height="118" rx="8" fill="#fff" stroke={LINE} />
          <rect x="8" y="8" width="70" height="52" rx="6" fill={PANEL} />
          <circle cx="43" cy="34" r="15" fill={i === 1 ? G : L} opacity="0.6" />
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
  const tones = [G, T, L, G];
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
          <rect x="250" y="3" width="46" height="14" rx="7" fill={r % 2 ? L : G} opacity="0.25" />
          <rect x="256" y="7" width="34" height="6" rx="3" fill={r % 2 ? "#6d8a1f" : T} />
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
      <rect x="14" y="130" width="120" height="26" rx="13" fill={G} opacity="0.16" />
      <circle cx="30" cy="143" r="6" fill={G} />
      <path d="M27 143 l2 2 4 -5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="147" fontFamily="system-ui" fontWeight="700" fontSize="10" fill={T}>68% auto-resolved</text>
      <polyline points="150,150 172,140 194,146 216,130 238,138 260,120 282,128 306,112"
        fill="none" stroke={L} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
        <path d="M-42 0 A42 42 0 0 1 30 -29" fill="none" stroke={G} strokeWidth="10" strokeLinecap="round" />
        <text x="0" y="-4" textAnchor="middle" fontFamily="system-ui" fontWeight="800" fontSize="16" fill={INK}>99%</text>
      </g>
      {/* status toggles */}
      {rows.map((r) => (
        <g key={r} transform={`translate(150,${40 + r * 30})`}>
          <circle cx="6" cy="8" r="4" fill={on[r] ? G : SOFT} />
          <rect x="20" y="4" width="86" height="7" rx="3.5" fill={INK} opacity="0.65" />
          <rect x="128" y="0" width="30" height="16" rx="8" fill={on[r] ? T : LINE} />
          <circle cx={on[r] ? 150 : 136} cy="8" r="6" fill="#fff" />
        </g>
      ))}
    </g>
  );
}
