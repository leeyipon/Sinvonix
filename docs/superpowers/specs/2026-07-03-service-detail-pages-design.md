# Service Detail Pages + Services Index — Design

**Date:** 2026-07-03
**Status:** Approved, building

## Goal

Turn the four homepage service cards (Software Development, AI Solutions,
Digital Marketing, UI/UX Design) into real destinations: a `/services` index
hub plus a full-landing-page detail route for each service. Match the existing
Nimbus design system exactly — no new dependencies, reuse the scheduler modal
for contact.

## Routes

- **`/services`** — index hub. Intro heading + four linked service cards +
  shared CTA.
- **`/services/[slug]`** — dynamic, statically generated via
  `generateStaticParams`, with per-page `generateMetadata`. Slugs:
  - `software-development`
  - `ai-solutions`
  - `digital-marketing`
  - `ui-ux-design`

Next 16 note: `params` is a `Promise` — pages/metadata must `await params`.
Unknown slugs call `notFound()` (existing `not-found.tsx` handles rendering).

## Detail page anatomy (7 sections)

1. **Hero** — service eyebrow, large title + `tagline`, `overview` paragraph,
   accent-gradient visual, two CTAs (Book a Call via scheduler / anchor to
   deliverables).
2. **Deliverables** — "What's included" grid of `{ title, desc }` cards.
3. **Approach** — service-specific 4-step numbered process (distinct from the
   homepage's generic 7-step process).
4. **Tech** — relevant subset of existing `techStack`, reusing `/icons/*.svg`.
5. **Outcomes** — 3 proof stats + one-line `result` tied to the matching case
   study (Atlas / Helix / Pulse).
6. **FAQ** — 4 Q&As, animated accordion (only new interactive piece).
7. **CTA** — reusable scheduler CTA, headline personalized per service.

## Data model (extend `src/lib/site.ts`)

Extend each `Service` with:

```ts
slug: string;
tagline: string;              // hero subhead
overview: string;             // 1–2 sentence intro paragraph
deliverables: { title: string; desc: string }[];
approach: { title: string; desc: string }[];   // 4 steps
techSlugs: string[];          // subset of techStack slugs
outcome: {
  stats: { value: number; suffix: string; label: string }[]; // 3
  result: string;             // one-line proof
};
faqs: { q: string; a: string }[];  // 4
```

Add a `getService(slug)` helper (or find inline). Copy is written to
agency quality for all four services.

## New components (`src/components/services/`)

- `services-index.tsx` — hub sections (client where motion needed).
- `service-hero.tsx`
- `service-deliverables.tsx`
- `service-approach.tsx`
- `service-tech.tsx`
- `service-outcomes.tsx` (reuse `Counter` motion component for stats)
- `service-faq.tsx` — **client**, accordion with motion height.
- `service-cta.tsx` — **client**, uses `useScheduler`, takes service name.

All reuse `Container/Section/SectionHeading`, `Reveal/Stagger/StaggerItem`,
`Button`, and the per-service `accent` gradient.

## Wiring changes

- `nav` in `site.ts`: "Services" `#services` → `/services`.
- Homepage `Services` cards → wrap in `Link` to `/services/[slug]` (needs
  `slug`). Preserve hover-expand behavior.
- Footer "Services" column → link the four detail pages by slug.

## Scope guardrails

- No new dependencies.
- No new contact form — reuse existing scheduler modal.
- FAQ accordion is the only new interactive component.
- Don't touch unrelated sections/pages.

## Testing / verification

- `next build` (or dev) compiles; all four detail routes + index prerender.
- Preview: index renders four cards; each detail page renders 7 sections;
  FAQ expands/collapses; CTA opens scheduler; nav + footer links resolve;
  dark/light both intact; unknown slug → 404.
