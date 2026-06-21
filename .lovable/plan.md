
# হাসান আজিজুল হক গল্পবিশ্ব — Build Plan

A single-route SPA literary reader. All navigation (writer profile + 3 stories) happens via state, with Framer Motion transitions. No page reloads, no extra routes.

## Tech & Setup

- Existing stack: TanStack Start + React + TS + Tailwind v4 + shadcn (already installed).
- Add: `framer-motion` (animations only — no AnimatePresence-driven routing).
- Bengali typography: load **Noto Serif Bengali** (headings) + **Hind Siliguri** (body) via `<link>` in `src/routes/__root.tsx`, register as `--font-display` / `--font-bengali` in `@theme` inside `src/styles.css`.
- No backend, no Cloud — pure static content from a typed data module.

## Routing

- Single route: `src/routes/index.tsx` renders the whole app.
- Optional `#writer` / `#story-1` hash sync for shareable deep-links (state ↔ `location.hash`), no router involvement.
- `head()` defaults set on the index route; titles/OG tags updated dynamically per selection via a small `useEffect` that mutates `document.title` and `<meta property="og:*">`.

## Data Model

`src/data/hasan.ts` — typed, original Bengali analytical content (no story text reproduction). Shape:

```ts
type Character = { name: string; role: string; psychology: string; symbolism: string };
type Section = { id: string; title: string; body: string | string[] };
type Story = {
  id: string; title: string;
  overview: { background: string; setting: string; tone: string; socialContext: string };
  narrative: { beginning: string; conflict: string; escalation: string; climax: string; ending: string };
  characters: Character[];
  themes: string[];
  symbolism: { symbol: string; meaning: string }[];
  psychology: string[];
  literaryView: string[];
  historicalContext: string[];
  significance: string[];
};
type Writer = { name: string; lifespan: string; intro: string; portrait: string };
```

Three story entries with original summaries, plot reconstruction, character cards, themes, symbol analyses, psychological notes, literary technique, post-partition context, and legacy notes for each of the three stories.

## Component Structure

```
src/components/hasan/
  AppShell.tsx          // sidebar + main, mobile drawer
  Sidebar.tsx           // writer chip + 3 story buttons (active highlight)
  WriterView.tsx        // portrait, name, lifespan, intro
  StoryView.tsx         // composes the 9 sections
  sections/
    Overview.tsx
    NarrativeFlow.tsx   // shadcn Accordion (collapsible 5 beats)
    Characters.tsx      // Card grid
    ThemesSociety.tsx
    Symbolism.tsx
    Psychology.tsx
    LiteraryView.tsx
    HistoricalContext.tsx
    Significance.tsx
  SectionNav.tsx        // sticky in-page anchor list (scrollspy)
```

State: a single `useState<{ kind: 'writer' } | { kind: 'story'; id: string }>` lifted in `AppShell`. No Zustand needed — one consumer.

## Interaction & Motion

- Framer Motion `motion.div` with `key={selection}` for fade+slide on content swap (~250ms).
- Sidebar items: hover scale, active = left accent bar in muted green.
- Section anchors scroll within the main column; scroll position preserved per selection via a `Map<selectionKey, scrollTop>` saved on swap.
- Mobile: sidebar collapses into a top sheet (shadcn `Sheet`) triggered from a header button.

## Design System

Add tokens to `src/styles.css` (`:root` + `.dark`, default to dark):

- Palette (oklch): deep bark `--background`, warm parchment `--foreground`, muted forest green `--primary`, ochre `--accent`, faded sienna `--ring`.
- `--gradient-paper`, subtle SVG paper-grain `::before` overlay on `<body>`.
- Typography utilities: `.font-display` (Noto Serif Bengali), body defaults to Hind Siliguri.
- Generous line-height (1.85) and max-width (~68ch) for Bengali readability.

## SEO

- Index route `head()`: title "হাসান আজিজুল হক গল্পবিশ্ব", description, og:title/description/type=website, twitter card.
- On selection change, update `document.title` to `${storyTitle} — হাসান আজিজুল হক গল্পবিশ্ব` and sync og:title/description meta tags imperatively.
- Single H1 ("হাসান আজিজুল হক গল্পবিশ্ব") in shell; story title rendered as H2 inside main.

## Out of Scope (per content rules)

- No reproduction of original story text or quotations.
- All summaries/analyses written as original interpretation.

## Build Steps

1. Install `framer-motion`.
2. Add fonts via `<link>` in `__root.tsx`; extend `@theme` + token palette in `src/styles.css`.
3. Author `src/data/hasan.ts` with the writer + 3 fully-populated stories.
4. Build `AppShell`, `Sidebar`, `WriterView`, `StoryView` + 9 section components.
5. Wire selection state, hash sync, dynamic meta updates, scroll-position memory.
6. Replace placeholder in `src/routes/index.tsx` with `<AppShell />` and set route `head()`.
7. Verify mobile (390px) layout and section transitions in preview.
