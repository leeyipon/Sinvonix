# Design System

Token architecture for the Sinvonix / Nimbus site. It mirrors the Figma
**Brand → Alias → Mapped → Responsive** model (see the team Notion "Design
System Generator") expressed as CSS custom properties + Tailwind v4 `@theme`.
Source of truth: [`src/app/globals.css`](src/app/globals.css).

## Architecture

Four layers, **strict one-directional inheritance**: `Mapped → Alias → Brand`.

| Layer | Holds | "Modes" |
|---|---|---|
| **Brand** | Raw color scales named **by hue** (`Blue`, `Green`, `Red`, `Yellow`, `Grey`), fonts, radii, motion | 1 (value) |
| **Alias** | Role tokens (`Primary`, `Success`, `Error`, `Warning`, `Neutral`) → Brand | 1 (`Blue Theme`) |
| **Mapped** | Semantic UI tokens (`Surface`, `Text`, `Border`, status) → Alias | `Light` / `Dark` |
| **Responsive** | Breakpoint-aware type & spacing | Tailwind `sm` / `md` / `lg` |

**Rules**
- A raw color is **named by hue, never by role** (`Blue`, not `Primary`).
- A Mapped token **never** points straight at a Brand hue — always through Alias.
- Swapping the whole brand identity = re-point `Primary` in the Alias layer only.
  The structure is ready for a second theme mode without restructuring.

---

## Layer 1 — Brand (raw hue scales)

Generated with the DS algorithm (input hex → 11-step HSL ramp) except where an
already-committed scale existed, which is kept rather than regenerated.

**Blue** — source of Primary. Core `#0152A5` (dark blue → white ink on fills).
Shipped Aurora ramp, kept as-is.

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#EBF3FD` | `#D6E7FA` | `#AAD1F8` | `#72B2F3` | `#2A8CEF` | `#0152A5` | `#01478E` | `#013A74` | `#012D5A` | `#022141` | `#021529` |

**Green** — Success (`500` = shipped success green).

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#E8F8EE` | `#D0F1DC` | `#A0EFBD` | `#6BE698` | `#37DD74` | `#22C55E` | `#1DA54F` | `#178740` | `#126932` | `#104724` | `#0A2E17` |

**Red** — Error (hue 4°, generated).

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F9EBEA` | `#F2D5D3` | `#F0A7A2` | `#E7756D` | `#DE4439` | `#DB3024` | `#AA251C` | `#8B1E17` | `#6C1812` | `#4A1410` | `#310D0B` |

**Yellow** — Warning (hue 38°, generated).

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FBF4E8` | `#F6E8CE` | `#FBD697` | `#F8BF5C` | `#F6A821` | `#F59F0A` | `#BE7B08` | `#9C6506` | `#794F05` | `#533708` | `#372505` |

**Grey** — Neutral. Shipped Aurora **teal** ramp (brand-tinted neutral, hue ~193°),
kept as the committed scale. Includes a half-step `850` the UI uses, plus flat
`White`/`Black`.

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 850 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `#EFF5F6` | `#D6E4E8` | `#AEC9D0` | `#6BA3B1` | `#4890A4` | `#317689` | `#1F5A6B` | `#113E4A` | `#0A2E38` | `#06232B` | `#041D24` | `#021920` |

Plus `White #FFFFFF`, `Black #000000`.

**Type** — `Display` = Space Grotesk (headings), `Body` = Inter, `Mono` =
JetBrains Mono, `Hand` = Caveat. Wired via `next/font` in `layout.tsx`.
**Radii** — `xl 16px`, `2xl 20px`, `3xl 28px`. **Spacing** — Tailwind's 4px grid.
**Motion** — `--ease-out-expo`, `--ease-spring`; 300–700ms.

---

## Layer 2 — Alias (role → hue), mode `Blue Theme`

| Role | Aliases | Varies per theme? |
|---|---|---|
| `Primary/{step}` (utility name: **`brand-{step}`**) | `Blue/{step}` | **Yes** — the one thing a theme swap changes |
| `Success/{step}` | `Green/{step}` | No |
| `Error/{step}` | `Red/{step}` | No |
| `Warning/{step}` | `Yellow/{step}` | No |
| `Neutral/{step}` | `Grey/{step}` (+ White/Black) | No |

Legacy gradient/accent aliases (`electric`, `indigo`, `purple`, `cyan`,
`emerald`) are re-pointed onto the scale — values unchanged — for CTA bands,
chat, mascot, avatars, and `shadow-glow`.

---

## Layer 3 — Mapped (semantic, Light / Dark)

Every token aliases an Alias step. Tailwind utility in **bold**.

### Surface
| Token (utility) | Light | Dark |
|---|---|---|
| page (**`bg-bg`**) | Neutral/50 | Neutral/950 |
| app (**`bg-bg-subtle`**) | Neutral/100 | Neutral/900 |
| card (**`bg-surface`**) | Neutral/White | Neutral/900 |
| raised (**`bg-surface-2`**) | Neutral/White | Neutral/850 |

### Text (Icon follows Text 1:1)
| Token (utility) | Light | Dark |
|---|---|---|
| primary (**`text-content`**) | Neutral/950 | Neutral/50 |
| secondary (**`text-muted`**) | Neutral/700 | Neutral/200 |
| tertiary (**`text-faint`**) | Neutral/600 | Neutral/300 |
| accent (**`text-accent`**) | Primary/500 | Primary/400 |
| success (**`text-success`**) | Success/700 | Success/400 |
| error (**`text-error`**) | Error/700 | Error/400 |
| warning (**`text-warning`**) | Warning/800 | Warning/400 |

### Border
| Token (utility) | Light | Dark |
|---|---|---|
| default (**`border-line`**) | Neutral/100 | Neutral/800 |

### Effect tokens (composite — the code's "Effect Styles")
`--glass-bg`, `--glass-border`, `--glass-shadow`, `--grid-line` — consumed by the
`glass`, `bg-grid`, `bg-dots`, `noise`, `shadow-glow` utilities. Kept as literal
composite values (they're rgba/shadow recipes, not single tokens).

---

## Layer 4 — Responsive

Handled by Tailwind breakpoints + `clamp()` per component (no separate Figma-style
mode collection in code). Breakpoint map to the Figma model:

| Figma mode | Width | Tailwind |
|---|---|---|
| Phone | 393 | base / `sm:` |
| Tablet | 1024 | `md:` / `lg:` |
| Desktop | 1440 | `lg:` / `xl:` |

Fluid headings use `clamp()` (display ceiling ≤ 6rem). Body ≥16px on mobile.

---

## Utility quick reference

- **Brand/roles:** `brand-50…950` (Primary), `success-*`, `error-*`, `warning-*`,
  `neutral-*` (+ `neutral-white` / `neutral-black`). Raw hues also available:
  `blue-*`, `green-*`, `red-*`, `yellow-*`, `grey-*`.
- **Semantic surfaces:** `bg-bg`, `bg-bg-subtle`, `bg-surface`, `bg-surface-2`.
- **Semantic text:** `text-content`, `text-muted`, `text-faint`, `text-accent`,
  `text-success`, `text-error`, `text-warning`.
- **Border:** `border-line`.
- **Effects:** `glass`, `text-gradient`, `bg-grid`, `bg-dots`, `noise`, `shadow-glow`.

---

## Do / Don't

- **Do** reach for a Mapped/semantic utility first (`bg-surface`, `text-muted`,
  `border-line`); use `brand-*`/status scales for the action & status roles.
- **Do** add a new `Brand/Grey` (or other hue) step if a value is missing, rather
  than hardcoding a one-off hex in a component.
- **Don't** let a component point a semantic need straight at a raw hue where a
  role exists (e.g. use `text-error`, not `text-red-700`).
- **Don't** rename a Brand group by role, or duplicate a hue scale under a second
  name.
- **Don't** invent Success/Error/Warning hues elsewhere — extend the scales here.

## Deviations from the generic generator (intentional)

- **Blue anchored at `500`, not `600`.** The algorithm would place `#0152A5`
  (a dark blue) at `600`; the shipped ramp labels it `500`. The committed ramp
  wins (identity preservation).
- **Neutral is teal-tinted (hue ~193°), not Primary-blue-tinted.** The Aurora
  theme's committed neutral is teal; kept over the generator's "Grey = Primary
  hue" default.
- **`Surface/page` (light) is `Neutral/50`, not pure White.** The site commits to
  a tinted base with White reserved for cards.
- **`--accent-c` (dark) `#4C9BF2` is off-ramp**, a hand-tuned mid-blue accent.
