# Content & i18n Architecture — Natur Barroso

> **Purpose**: This document is a Claude Code briefing for future sessions. It covers the current state of content and translation after Phase A, and defines the remaining work (Phases B, C, D) to reach a clean federated source of truth.

---

## Current State (after Phase A)

### What works well

- **UI chrome** is fully managed via `next-intl` with JSON files at `messages/pt.json` and `messages/en.json`
- All navigation, buttons, labels, section headers, form fields, difficulty descriptions, dropdown options, and aria-labels now live in these JSON files
- No more `isPt ? "PT string" : "EN string"` inline ternaries in component code (except for CMS content fields — those are Phase C)
- 13 namespaces, ~220+ keys, 100% parity between PT and EN

### What is broken / still missing

**Sanity CMS has no language support at all.**

- Every Sanity schema (`tour`, `blogPost`, `regionPage`, `faqItem`, `guide`, `category`, `review`, `siteSettings`) has zero language/locale fields
- Tours and blog posts render the same Portuguese content for both `/pt/` and `/en/` routes
- The `siteSettings.conditionsBanner.message` is a single-language string
- This is the most critical gap: the entire content layer is language-unaware

**Hardcoded TypeScript data files (not in CMS):**

- `src/data/region.ts` — Region places, highlights, descriptions (all PT, no EN fields, no Sanity entry)
- `src/data/tours.ts` — Legacy tour data with `_en` suffix fields (used by region sub-pages and similar tours components, NOT yet using Sanity)
- `src/data/guides.ts` — Guide bios (no EN)
- `src/data/faq.ts` — FAQ content (no EN)
- `src/data/reviews.ts` — Review text (no translation needed — reviewer copy)

**Remaining `isPt` ternaries (intentionally left — Phase C scope):**

These are CMS data fields, not UI strings. They exist in:
- `TourCard.tsx`, `TourHero.tsx`, `TourPricingTable.tsx`, `FareHarborWidget.tsx`: `tour.title_en`, `tour.shortDescription_en`, `tour.duration_en`, `tier.label_en`
- `ToursFilter.tsx`, `TourDifficultyGauge.tsx`, `TourHero.tsx`, `BlogFilter.tsx`: `cfg.labelPt/cfg.label` — from `DIFFICULTY_CONFIG` and `CATEGORY_CONFIG` in `src/types/tour.ts`

---

## Target Architecture

```
SANITY CMS (all content)
  └── Every document: { title_pt, title_en, body_pt, body_en, ... }
  └── GROQ queries: coalesce(title_en, title_pt) based on locale param
  └── All data files removed: src/data/ deleted

next-intl JSON files (UI chrome only)
  └── messages/pt.json + messages/en.json
  └── Nav, buttons, labels, section headers, form copy, aria-labels

Components
  └── Zero inline ternaries for user-facing copy
  └── CMS content rendered via locale-aware GROQ results
```

---

## Phase B — Add i18n fields to Sanity schemas

**Goal**: Every Sanity document can store PT and EN versions of its text content.

**Strategy**: Field-level duplication with `_pt` / `_en` suffixes. Single document per entity (no plugin needed). Use GROQ `coalesce()` to fall back to PT if EN is empty.

**Files to change**: All files in `sanity/schemas/`

### Schema changes (per document type)

**`sanity/schemas/tour.ts`** — add `_pt`/`_en` variants for:
- `title` → `title_pt`, `title_en`
- `shortDescription` → `shortDescription_pt`, `shortDescription_en`
- `overview` (portable text array) → `overview_pt`, `overview_en`
- `highlights` (string array) → `highlights_pt`, `highlights_en`
- `itinerary[].title` and `itinerary[].description` → object fields `title_pt/title_en` and `description_pt/description_en`
- `included`, `notIncluded`, `whatToBring` (string arrays) → `*_pt`, `*_en`
- `faqs[].question` and `faqs[].answer` → `question_pt/question_en`, `answer_pt/answer_en`
- `seo.title`, `seo.description` → `seo.title_pt/title_en`, `seo.description_pt/description_en`
- **Keep as-is**: `slug`, `category`, `guide`, `difficulty`, `duration` (duration gets `duration_pt`/`duration_en`), `groupSize`, `pricing` (pricing labels get `label_pt`/`label_en`), `seasonAvailability`, `coverImage`, `gallery`, `fareharborWidgetId`

**`sanity/schemas/blogPost.ts`** — add:
- `title_pt`, `title_en`
- `excerpt_pt`, `excerpt_en`
- `body_pt`, `body_en` (portable text)
- `seo.title_pt/title_en`, `seo.description_pt/description_en`

**`sanity/schemas/regionPage.ts`** — add:
- `title_pt`, `title_en`
- `summary_pt`, `summary_en` (portable text)
- `seo.title_pt/title_en`, `seo.description_pt/description_en`

**`sanity/schemas/faqItem.ts`** — add:
- `question_pt`, `question_en`
- `answer_pt`, `answer_en` (portable text)

**`sanity/schemas/guide.ts`** — add:
- `bio_pt`, `bio_en` (portable text)

**`sanity/schemas/category.ts`** — add:
- `label_pt`, `label_en`
- `shortDescription_pt`, `shortDescription_en`

**`sanity/schemas/siteSettings.ts`** — add:
- `conditionsBanner.message_pt`, `conditionsBanner.message_en`

**`sanity/schemas/review.ts`** — no changes (review text is user-generated, no translation)

### Sanity Studio UX tip

Group the `_pt` / `_en` fields visually in the studio using `fieldset` groups:
```ts
fieldsets: [
  { name: "pt", title: "Português", options: { collapsible: true } },
  { name: "en", title: "English", options: { collapsible: true, collapsed: true } },
],
```

---

## Phase C — Update GROQ queries to be locale-aware

**Goal**: Every page and component receives content in the correct language.

**File**: `sanity/lib/queries.ts`

### Pattern to apply

All queries need to accept a `locale` parameter and use `coalesce()`:

```typescript
// Before
export const TOURS_LIST_QUERY = groq`
  *[_type == "tour"] | order(_createdAt desc) {
    "title": title,
    "shortDescription": shortDescription,
    ...
  }
`

// After — locale-aware
export const toursListQuery = (locale: string) => groq`
  *[_type == "tour"] | order(_createdAt desc) {
    "title": coalesce(title_${locale}, title_pt),
    "shortDescription": coalesce(shortDescription_${locale}, shortDescription_pt),
    ...
  }
`
```

The `coalesce()` ensures the site never breaks if EN hasn't been filled in — it falls back to PT silently.

### Pages that need updating (pass locale to queries)

- `src/app/[locale]/tours/page.tsx` — `TOURS_LIST_QUERY`
- `src/app/[locale]/tours/[slug]/page.tsx` — `TOUR_DETAIL_QUERY`, `SIMILAR_TOURS_QUERY`
- `src/app/[locale]/blog/page.tsx` — `BLOG_POSTS_QUERY`
- `src/app/[locale]/blog/[slug]/page.tsx` — `BLOG_POST_DETAIL_QUERY`, `RELATED_POSTS_QUERY`

### Components that use `isPt ? ... : tour.title_en` (remove these after Phase C)

Once GROQ returns the right language directly, these components no longer need the ternary:
- `src/components/ui/TourCard.tsx` — `tour.title_en`, `tour.shortDescription_en`, `tour.duration_en`
- `src/components/tours/TourHero.tsx` — `tour.title_en`, `tour.shortDescription_en`, `tour.duration_en`
- `src/components/ui/FareHarborWidget.tsx` — `tier.label_en`
- `src/components/tours/TourPricingTable.tsx` — `tier.label_en`

Also remove `locale` prop from these components (no longer needed for rendering).

### Config-level labels (DIFFICULTY_CONFIG, CATEGORY_CONFIG)

These live in `src/types/tour.ts`. They have `labelPt` and `label` (EN) fields used in `ToursFilter`, `TourDifficultyGauge`, `TourHero`, `BlogFilter`. These could be moved to `messages/pt.json` and `messages/en.json` for full consistency, but they are enum-like values tightly coupled to filter logic. Moving them is optional.

---

## Phase D — Migrate hardcoded data files to Sanity

**Goal**: All content is editable via Sanity Studio. The `src/data/` directory is deleted.

### Data files to migrate (in order of priority)

**1. `src/data/region.ts`** → Sanity `regionPage` documents
- Sanity already has a `regionPage` schema
- Each `regionPlace` object in the file becomes one Sanity document
- Fields: `name`, `slug`, `tagline`, `description`, `sectionTitle`, `highlights`, `gallery`, `howToGetThere`, `coverImage`, `relatedTourSlugs`, `seo`
- After Phase B, add `_pt`/`_en` to all text fields

**2. `src/data/faq.ts`** → Sanity `faqItem` documents
- Sanity schema exists already
- Each FAQ entry becomes one document

**3. `src/data/guides.ts`** → Sanity `guide` documents
- Sanity schema exists
- Each guide object becomes one document with photo, bio, specialties, languages

**4. `src/data/tours.ts`** → Already partially migrated to Sanity
- Region sub-pages (`region/[slug]/page.tsx`) and `SimilarTours` still import from `src/data/tours.ts`
- After Phase C, update these pages to query Sanity instead
- Delete `src/data/tours.ts` once all consumers are moved

### Migration process for each data type

1. Enter data into Sanity Studio manually (or via migration script)
2. Add new GROQ query for that data type in `sanity/lib/queries.ts`
3. Update the page/component to fetch from Sanity instead of importing from `src/data/`
4. Run `next build` — TypeScript will catch broken imports
5. Delete the data file

---

## On Translation Workflow

**There is no automatic translation.** Options:
1. **Manual** (current only option): Team writes PT content first, then fills in the `_en` fields in Sanity Studio
2. **Sanity AI Assist plugin** (recommended enhancement): Install `@sanity/assist` — adds a "Translate" button in the Studio that uses AI to generate an EN draft from the PT field, which the team then reviews. One click per document.
3. **Machine translation services** (Phrase, Transifex, Weglot) — overkill for this scale

---

## Verification Plan (run after each Phase)

- **After Phase B**: Open Sanity Studio, create a test tour with both `title_pt` and `title_en` filled in
- **After Phase C**: Visit `/pt/tours/[test-slug]` and `/en/tours/[test-slug]` — confirm different language content renders. Check that a tour with only `title_pt` still renders correctly on the EN route (coalesce fallback)
- **After Phase D**: Run `next build` with no `src/data/` imports — zero TypeScript errors confirms full migration

---

## Files Reference

| Path | Role |
|------|------|
| `messages/pt.json` | UI chrome — Portuguese |
| `messages/en.json` | UI chrome — English |
| `src/i18n/routing.ts` | next-intl locale config (`["pt", "en"]`, default `pt`) |
| `src/i18n/request.ts` | Dynamic message loader |
| `sanity/schemas/` | All 8 Sanity document type schemas |
| `sanity/lib/queries.ts` | All GROQ queries + TypeScript types |
| `sanity/lib/client.ts` | `sanityFetch()` helper |
| `src/data/` | Legacy hardcoded data (to be deleted in Phase D) |
| `src/types/tour.ts` | `DIFFICULTY_CONFIG`, `CATEGORY_CONFIG`, `SEASON_LABELS` |
