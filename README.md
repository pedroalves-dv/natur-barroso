# Natur Barroso

Bookable outdoor & ecotourism platform for [Natur Barroso](https://naturbarroso.pt) — based in Montalegre, Terras de Barroso, operating within Peneda-Gerês National Park.

> **Source of truth:** [`BRIEF.md`](./BRIEF.md) — re-read before starting any new feature or session.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, SSR/SSG) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| i18n | next-intl v4 — PT (default) + EN, path-based |
| Animation | Framer Motion *(Phase 6)* |
| CMS | Sanity *(Phase 4)* |
| Booking | FareHarbor widget embed *(Phase 5)* |
| Maps | Mapbox GL JS *(Phase 6)* |
| Email | Resend via API route *(Phase 3)* |
| Deployment | Vercel (auto-deploy from `main`) |

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Getting Started

```bash
git clone <repo-url>
cd natur-barroso
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the middleware redirects to [http://localhost:3000/pt](http://localhost:3000/pt).

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Start production server |

---

## Directory Structure

```text
src/
  app/
    [locale]/          ← All pages live here (pt + en)
      layout.tsx       ← Root locale layout (html, body, fonts, i18n provider)
      page.tsx         ← Homepage
      not-found.tsx    ← On-brand 404
    layout.tsx         ← Minimal passthrough (next-intl pattern)
    globals.css        ← Tailwind v4 @theme tokens + base styles
  components/
    layout/
      Navbar.tsx       ← Scroll-aware, mobile drawer, locale toggle
      Footer.tsx       ← 4-column server component
      LayoutWrapper.tsx
    ui/
      NaturBarrosoLogo.tsx       ← Inline SVG, dark/light variants
      FloatingWhatsAppButton.tsx ← Fixed bottom-right
      CookieBanner.tsx           ← GDPR, localStorage persistence
  i18n/
    routing.ts    ← defineRouting (locales, defaultLocale, localePrefix)
    request.ts    ← getRequestConfig — loads messages per request
  lib/
    fonts.ts      ← next/font declarations (Instrument Serif + DM Sans)
  middleware.ts   ← next-intl routing middleware
messages/
  pt.json         ← Portuguese translations (default)
  en.json         ← English translations
```

---

## i18n

- **Default locale:** `pt` — served at `/pt/`
- **English:** served at `/en/`
- Root `/` redirects to `/pt/` via middleware
- Translation files: `messages/pt.json` + `messages/en.json`

**Adding a translation key:**

1. Add to both `pt.json` and `en.json`
2. Use `getTranslations("Namespace")` in server components or `useTranslations("Namespace")` in client components

**Adding a new locale:**

1. Add to `locales` array in `src/i18n/routing.ts`
2. Create `messages/<locale>.json`

---

## Design System

### Colours

| Token | Hex | Tailwind class | Usage |
| --- | --- | --- | --- |
| Forest | `#2D4A2F` | `bg-forest` / `text-forest` | Primary — deep green |
| Moss | `#3D5C3A` | `bg-moss` / `text-moss` | Primary variant |
| Amber | `#ffb547` | `bg-amber` / `text-amber` | Accent — golden hour |
| Granite | `#2A2A28` | `bg-granite` / `text-granite` | Neutral dark |
| Fog | `#F5F2EC` | `bg-fog` / `text-fog` | Light background |
| River | `#4A6B7C` | `bg-river` / `text-river` | Secondary accent |

### Typography

| Role | Font | Tailwind class |
| --- | --- | --- |
| Display / Headings | Instrument Serif | `font-serif` |
| Body / UI | DM Sans | `font-sans` |

Both loaded via `next/font` as CSS variables (`--font-dm-sans`, `--font-instrument-serif`).

---

## Build Phases

- [x] **Phase 1** — Foundation: scaffold, tokens, Navbar, Footer, Layout
- [ ] **Phase 2** — Core Pages: Home, Tours catalog, Tour detail
- [ ] **Phase 3** — Supporting Pages: Region, About, Contact, Reviews, FAQ
- [ ] **Phase 4** — CMS Integration: Sanity schemas + data migration
- [ ] **Phase 5** — Booking + SEO: FareHarbor, metadata, sitemap, OG images
- [ ] **Phase 6** — Polish: Framer Motion, Mapbox, Lighthouse audit, full EN translations

---

## Environment Variables

None required for Phase 1. Create `.env.local` for later phases:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_WHATSAPP_NUMBER=351960000000
```

---

## Deployment

Auto-deployed to Vercel from the `main` branch. No manual steps required.

> **Read [`BRIEF.md`](./BRIEF.md) before starting any new feature.**
