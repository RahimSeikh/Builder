
# রবীন্দ্র নাট্যভুবন — Build Plan

A premium, content-focused Bengali literary archive dedicated to রবীন্দ্রনাথ ঠাকুর and three plays: **রক্তকরবী, রাজা, অচলায়তন**.

## Note on stack
The project is on **TanStack Start + React + TypeScript + Tailwind v4 + shadcn/ui** (not Next.js, which isn't supported here). Everything else in your spec is preserved — static JSON data, no DB, no auth, no admin. Routing will use TanStack file-based routes; URLs match your spec.

## Design direction
- Palette: deep navy (`#0B1B33`), dark indigo (`#1A1147`), gold accent (`#C9A24B`), warm ivory text (`#F5EFE0`).
- Typography: **Noto Serif Bengali** for display/headings, **Hind Siliguri** for body — loaded via `<link>` in `__root.tsx`, registered in `@theme` in `src/styles.css`.
- Aesthetic: digital museum / literary archive — gold rule lines, serif drop-caps, restrained motion (subtle gradient hero, fade-in on scroll), card hover lifts with gold underline.
- Theatre cues: curtain-style hero divider, ornamental motifs.

## Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx         shell, fonts, nav, footer, JSON-LD Organization
  index.tsx          /                Home (hero, about, plays grid)
  natok.index.tsx    /natok           Plays index
  natok.raktakarabi.tsx    /natok/raktakarabi
  natok.raja.tsx           /natok/raja
  natok.achalayatan.tsx    /natok/achalayatan
```
Each route sets its own `head()` with Bengali title/description, og:title/description/url, canonical (leaf only), og:type=article on play pages, plus JSON-LD (`CreativeWork`/`Book` per play, `Person` for Tagore on home).

## Data layer
Static TypeScript modules (typed, easier than JSON for nested content):
```
src/data/
  tagore.ts          biography sections
  plays/
    index.ts         play metadata list
    raktakarabi.ts
    raja.ts
    achalayatan.ts
  types.ts           Play, Character, TimelineEvent, Symbol, Theme, Relationship
```
Each play exports: `meta` (title, year, genre, cover), `summary`, `plot` (acts → scenes, collapsible), `characters[]`, `relationships[]`, `timeline[]`, `symbols[]`, `literarySignificance`, `themes[]`.

Content is **originally written in Bengali** by me — no copied passages, no full dialogue, only short referential phrases where unavoidable. Cross-referenced from public knowledge of these plays (Banglapedia/Wikipedia-style facts: publication years, character lists, established thematic readings).

## Components
```
src/components/
  layout/Nav.tsx              sticky, Home + নাটকসমূহ
  layout/Footer.tsx
  home/Hero.tsx               portrait, name, years, intro, animated gradient
  home/AboutTagore.tsx        biography sections
  home/PlaysGrid.tsx          3 premium cards
  play/PlayHero.tsx           title, year, genre, cover
  play/SectionHeading.tsx     gold-underlined heading with id anchors
  play/Summary.tsx
  play/PlotAccordion.tsx      shadcn Accordion for acts/scenes
  play/CharacterGrid.tsx      cards (name, role, description, importance)
  play/RelationshipMap.tsx    CSS/SVG node-edge diagram (lightweight, no lib)
  play/Timeline.tsx           vertical timeline w/ alternating cards
  play/Symbols.tsx            two-column analysis cards
  play/LiterarySignificance.tsx
  play/Themes.tsx             tag chips + expandable analysis
  play/FloatingTOC.tsx        sticky right-side TOC w/ scroll-spy + smooth scroll; collapses to bottom sheet (shadcn Drawer) on mobile
```

## Images
- Generate a tasteful illustrated portrait of Tagore (premium imagegen, ivory/indigo palette) → `src/assets/tagore.jpg`.
- Generate 3 theatre-poster style cover illustrations for the plays, each thematically distinct (red oleander/blood lotus for রক্তকরবী, throne in shadow for রাজা, monastery walls cracking for অচলায়তন) → `src/assets/covers/*.jpg`.
- Optional ornamental divider SVG (gold filigree) inline.
- Use as og:image on respective play routes.

## SEO
- Home: title `রবীন্দ্র নাট্যভুবন — রবীন্দ্রনাথ ঠাকুরের নাট্যজগৎ`, Bengali meta description, og tags, JSON-LD Person.
- Play pages: title `<play> — রবীন্দ্রনাথ ঠাকুর | রবীন্দ্র নাট্যভুবন`, description summarizing the play, og:type article, canonical leaf, JSON-LD CreativeWork with author=Tagore, datePublished.
- `public/llms.txt` listing home + 3 play routes.
- `public/robots.txt` (allow all), `public/sitemap.xml` with the 5 routes.

## Performance
- Tailwind v4 utilities only; no heavy chart/diagram libs.
- Images served as JPG, sized to viewport, `loading="lazy"` below the fold.
- Framer-motion only for hero + section reveals (single small dep) — or pure CSS keyframes to keep bundle lean. **Decision:** pure CSS animations to avoid the dep.
- Smooth scroll via `scroll-behavior: smooth` + `scroll-margin-top` on section anchors.

## Out of scope (per your spec)
No auth, accounts, comments, admin, blog, payments, AI chat, social, or full-text reproduction of the plays.

## Build order
1. Tokens (colors, fonts, theme) in `src/styles.css`; fonts via `<link>` in `__root.tsx`; Nav + Footer.
2. Generate images (Tagore portrait + 3 covers) in parallel.
3. Author Bengali content data files for Tagore bio + 3 plays.
4. Home page (Hero, About, PlaysGrid) with SEO.
5. Play page template + 3 routes wired to data, with FloatingTOC, accordion plot, relationship diagram, timeline.
6. SEO/JSON-LD, llms.txt, sitemap.xml, robots.txt; verify build.
