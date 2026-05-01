# Natur Barroso — Claude Code Brief

> Last updated: April 2026  
> This is the source of truth for the entire build. Re-read this before starting any new feature or session.

---

## 1. Project Overview

**Natur Barroso** is an outdoor animation and ecotourism company based in **Montalegre, Portugal**, operating within and around **Peneda-Gerês National Park** in northern Portugal (Trás-os-Montes region).

The goal is a **fully functional, bookable web platform** — not a brochure site. Visitors should be able to discover the region, browse tours, understand what they're booking, and complete a booking, all within the site.

**Key differentiator:** Natur Barroso is local and rooted in Barroso — not a Porto-based day-trip operator. This authenticity is a core part of the brand and should come through in the copy, imagery, and structure. They offer both custom/all inclusive luxury experiences for holiday trips that has clients stay in Portugal's northern palaces and rustic escapades, as well as more adventurous tours that guide clients along amazing trails, historic villages, and offers all kids of outdoor activities.

---

## 2. Target Audiences

- International tourists (EN) — Porto/Lisbon-based travellers looking for authentic experiences
- Portuguese domestic tourists (PT) — weekend and holiday market
- Local community in Barroso / Trás-os-Montes
- Schools, corporate groups, team-building
- Specialist adventure travellers (trail runners, climbers, photographers)

---

## 3. Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | SSR/SSG for SEO, file-based routing |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS (v4) + CSS custom properties | Design tokens via CSS vars |
| Animation | Framer Motion | Scroll-triggered, page transitions |
| i18n | `next-intl` | PT (default) + EN, path-based: `/pt/`, `/en/` |
| CMS | Sanity (hosted Studio) | Schema-first, see Section 8 |
| Booking | FareHarbor widget embed | No custom booking system — see Section 9 |
| Maps | Mapbox GL JS | Tour routes, region POIs |
| Images | Next.js Image + Unsplash placeholders | Cloudinary-ready for production |
| Email | Resend (via Next.js API route) | For custom enquiry forms only |
| Deployment | Vercel | Auto-deploy from main branch |

---

## 4. Brand & Design System

### 4.1 Logo

user designed a logo.

### 4.2 Colour Palette

```css
--color-forest:    #2D4A2F;   /* primary — deep forest green */
--color-moss:      #3D5C3A;   /* primary variant */
--color-amber:     #C8882A;   /* accent — golden hour */
--color-granite:   #2A2A28;   /* neutral dark */
--color-fog:       #F5F2EC;   /* light background */
--color-river:     #4A6B7C;   /* secondary accent — slate blue */
```

### 4.3 Typography

- **(Main) Display / Body / UI:** Stack (clean, readable, modern)
- **(Variant) Display / headings variations:** Instrument Serif (humanist serif — premium without stiffness)

- Load via `next/font` (Google Fonts)

### 4.4 Tone of Voice

Friendly but polished. Grounded and confident. Think: a knowledgeable local guide who is also a professional. Not poetic to the point of vagueness. Not casual slang. Somewhere between warm and premium — never posh. Think high-end and avant garde hiking equipment brand mixed with luxury hotel while still being grounded.

---

## 5. Site Architecture

```text
/                             → Home
/tours                        → Tours catalog (filterable)
/tours/[slug]                 → Individual tour detail + booking widget
/region                       → Barroso region hub
/region/[slug]                → Sub-pages per area (SEO — see Section 10)
/about                        → Our story + guide profiles
/blog                         → Journal / articles
/blog/[slug]                  → Individual post
/reviews                      → Aggregated testimonials
/faq                          → FAQ (accordion)
/contact                      → Contact + custom enquiry form
/404                          → On-brand error page
```

---

## 6. Page Specifications

### 6.1 Home `/`

The homepage is storytelling-first with a high "wow factor", but it must convert — every section has a clear next action.

**Sections in order:**

1. **Hero**
   - Full-screen video loop (autoplay, muted) or parallax image fallback
   - Animated headline entrance (Framer Motion)
   - Headline example: *"Terras de Barroso. Discovered on foot."*
   - Two CTAs: `Explore Our Tours` (primary) + `About the Region` (ghost/secondary)

2. **Trust strip**
   - 4 items: `Local guides` · `4.8★ on TripAdvisor` · `Small groups` · `Year-round`
   - Icon + label, minimal, full-width

3. **Featured Tours**
   - 3–4 tour cards in a horizontal scroll (mobile) / grid (desktop)
   - Card: cover photo, category badge (colour-coded), title, difficulty pill, duration, price-from, "View Tour" CTA
   - Link to `/tours` for full catalog

4. **Region Teaser**
   - Split-screen: left = text intro to Trás-os-Montes + Barroso, right = Mapbox embed or scenic image
   - CTA: `Discover the Region`

5. **How It Works**
   - 3 steps: Browse → Book → Experience
   - Visual, minimal, no more than 2 lines per step

6. **Testimonials**
   - Auto-scrolling carousel
   - Seed with 4–5 static reviews initially (real TripAdvisor reviews as copy)

7. **WhatsApp CTA section**
   - Warm, short copy: "Prefer to talk it through? Message us directly."
   - Large WhatsApp button — prominent, not hidden in footer

8. **Latest from the Journal**
   - 2–3 latest blog post cards
   - CMS-driven (Sanity)

9. **Footer**
   - Logo + tagline / Quick nav links / Tour categories / Contact + socials
   - Language toggle (PT / EN)
   - Legal: Privacy Policy, Cookie Policy

**Persistent UI:**

- Floating WhatsApp button (bottom-right, all pages)
- Cookie consent banner (GDPR compliant)

---

### 6.2 Tours Catalog `/tours`

**Goal:** Browsable and filterable. Must scale easily — adding a new tour is a Sanity entry, no code change required.

**Filters (sidebar on desktop, drawer on mobile):**

- Category (multi-select, colour-coded badges)
- Difficulty: Easy / Moderate / Challenging / Expert
- Duration: Half-day / Full day / Multi-day
- Group type: Private / Small group / Custom
- Season availability: Spring / Summer / Autumn / Winter

**Tour card:**

- Cover photo
- Category badge (colour from category definition)
- Title + short tagline
- Difficulty pill + Duration + Group size range
- Price from (e.g. `From €65 per person`)
- "View Tour" CTA

**Tour Categories — Starter Set:**

| Slug | Label | Colour | Description |
| --- | --- | --- | --- |
| `4x4` | 4×4 Off-Road | Amber | Rugged terrain excursions in 4WD vehicles |
| `hiking` | Guided Hikes | Forest green | Curated trail walks, easy paths to wild ridgelines |
| `climbing` | Rock Climbing | Slate | Routes for all levels on Barroso granite |
| `cultural` | Cultural & Heritage | Warm brown | Villages, castles, Mosteiro das Júnias, Vinho dos Mortos |
| `gastronomy` | Taste of Barroso | Terracotta | Local food, wine, Barrosã cattle, regional products |
| `kayak` | Rivers & Kayak | River blue | Kayaking, canoe, SUP on rivers and reservoirs |
| `photography` | Photography Tours | Dark grey | Guided outings designed for landscape/wildlife photographers |
| `wildlife` | Wildlife & Nature | Deep green | Iberian wolf territory, endemic flora, birdwatching |
| `groups` | Schools & Groups | Purple | Educational and team-building programmes |
| `multiday` | Multi-Day Expeditions | Dark amber | Camping + full itinerary stays in the wilderness |

Each category is a Sanity document with: slug, label, colour hex, icon, cover image, short description. Adding a new category = new Sanity entry, no frontend code change.

---

### 6.3 Tour Detail `/tours/[slug]`

**Layout sections:**

1. Hero — full-width image, title overlay, category badge, difficulty, duration, price
2. Overview — 2–3 paragraph description
3. Highlights — bulleted list (what you'll see/do)
4. Itinerary — accordion or timeline component
5. Included / Not Included — two-column checklist
6. Difficulty & Fitness — visual gauge (Easy → Expert)
7. What to Bring — checklist
8. Group Size & Pricing — table (private vs group, adult/child rates)
9. Meet Your Guide — guide profile card (photo, name, bio, specialties) linked from Sanity
10. Mapbox embed — trail/route drawn (static for now, GPX support later)
11. Inline FAQ — 4–6 Q&As specific to this tour (e.g. "What if it rains?", "Can children join?")
12. Photo gallery — lightbox grid (Sanity-managed images)
13. Reviews — filtered to this tour
14. **Booking widget** — FareHarbor embed (sticky sidebar on desktop, bottom drawer on mobile)
15. Similar Tours — 3-card row at bottom

**Seasonal availability note** on each tour: e.g. `Runs April – October` or `Year-round`. Displayed prominently near the hero, not buried in the itinerary.

---

### 6.4 Region Hub `/region`

The region pages are the **SEO backbone of the site**. They rank for people who don't yet know Natur Barroso exists but are planning a Gerês/Barroso trip.

**Hub page `/region`:**

- Hero with pull quote about Trás-os-Montes
- Interactive Mapbox map with POI markers (villages, waterfalls, viewpoints, castles)
- "Why Barroso" — cultural, ecological, gastronomic uniqueness
- Grid of sub-page cards linking to `/region/[slug]`
- Seasonal guide — visual calendar of when to visit
- Getting here — from Porto, Lisbon, Madrid; airport options (Porto OPO, Vila Real VRL)
- Wildlife section — Iberian wolf, Barrosã cattle, endemic birds

**Sub-pages `/region/[slug]` — starter set:**

- `pinhoes-das-junias` — Pitões das Júnias village + waterfall + monastery
- `tourem` — border village, remote beauty
- `castelo-de-montalegre` — castle + town
- `cascata-de-pincaes` — waterfall hiking
- `pedra-bela` — viewpoint, dramatic granite plateau
- `vinho-dos-mortos` — Vinho dos Mortos cultural story

Each sub-page: description, imagery, how to get there, what tours visit this place (linked tour cards at bottom). This internal linking is important for SEO.

---

### 6.5 About `/about`

- Company revival story — brief, honest, human (not corporate)
- Guide profiles — photo, name, short bio, specialties, languages spoken
- Philosophy / values — environmental commitment, small groups, local economy
- Certifications and safety standards
- TripAdvisor rating badge

---

### 6.6 Blog `/blog` + `/blog/[slug]`

- Fully CMS-driven (Sanity)
- Categories: Trail Reports / Wildlife Spotting / Seasonal Guides / Culture & Heritage / Photography Tips
- Card: cover image, category, title, excerpt, date, estimated read time
- Post page: full content (Portable Text from Sanity), author, date, tags, social share buttons, related posts

---

### 6.7 Reviews `/reviews`

- Aggregate display with star rating + source label (TripAdvisor / Google)
- Filter by tour (optional, if enough reviews)
- Pull-quote highlights in a hero carousel
- CTA: `Leave us a review` → links to Google and TripAdvisor

---

### 6.8 FAQ `/faq`

- Accordion layout, grouped by category
- Categories: Booking & Payment / Activities / What to Bring / Groups & Private Tours / Accessibility / Cancellation Policy
- Note: high-priority FAQs also appear **inline on tour detail pages** — don't duplicate, link or reuse content intelligently

---

### 6.9 Contact `/contact`

- Contact form: name, email, subject (dropdown), message → sends via Resend API
- **"Plan a Custom Experience"** enquiry form (separate, prominent):
  - Activity interest, group size, preferred dates, budget range, special requirements
  - This is the highest-value conversion path for corporate, private, and school groups
- WhatsApp button — large and prominent
- Phone + email listed explicitly
- Montalegre location with embedded Mapbox
- Response time notice: "We reply within 24 hours"

---

## 7. Global UI Components

| Component | Notes |
| --- | --- |
| Navbar | Logo left, nav centre, PT/EN toggle + "Book a Tour" CTA right. Transparent on hero, solid on scroll. |
| Mobile nav | Hamburger → full-screen slide-in drawer |
| Footer | 4-column layout as described in Home section |
| Floating WhatsApp button | Bottom-right, all pages, all screen sizes |
| Cookie consent banner | GDPR compliant, minimal design |
| Seasonal conditions banner | Manually updated in Sanity — e.g. "❄️ Some high-altitude trails may be snow-covered" |
| Tour card | Reusable across Home, /tours, /region sub-pages, Similar Tours |
| Guide profile card | Reusable on /about and /tours/[slug] |
| Loading skeletons | For tour cards and blog cards |
| 404 page | On-brand, with navigation suggestions |

---

## 8. CMS Schema (Sanity)

Define these content types before writing any data-fetching code:

```text
Tour
  - title (string)
  - slug (slug)
  - category → Category (reference)
  - guide → Guide (reference)
  - shortDescription (text)
  - overview (Portable Text)
  - highlights (array of strings)
  - itinerary (array: { title, description })
  - included (array of strings)
  - notIncluded (array of strings)
  - difficulty (enum: easy | moderate | challenging | expert)
  - duration (string: e.g. "Full day – 8 hours")
  - groupSize (object: { min, max })
  - pricing (array: { label, price })
  - seasonAvailability (array of enums: spring | summer | autumn | winter)
  - coverImage (image)
  - gallery (array of images)
  - faqs (array: { question, answer })
  - fareharborWidgetId (string)  ← FareHarbor embed ID per tour
  - mapboxRouteGeoJSON (text, optional)
  - seo (object: { title, description, ogImage })

Category
  - label (string)
  - slug (slug)
  - colour (string — hex)
  - icon (string — icon name or SVG)
  - coverImage (image)
  - shortDescription (text)

Guide
  - name (string)
  - slug (slug)
  - photo (image)
  - bio (Portable Text)
  - specialties (array of strings)
  - languages (array of strings)

BlogPost
  - title (string)
  - slug (slug)
  - author → Guide (reference)
  - category (enum)
  - coverImage (image)
  - excerpt (text)
  - body (Portable Text)
  - publishedAt (datetime)
  - tags (array of strings)
  - seo (object)

RegionPage
  - title (string)
  - slug (slug)
  - summary (Portable Text)
  - coverImage (image)
  - mapCoordinates (object: { lat, lng })
  - relatedTours (array of Tour references)
  - gallery (array of images)
  - seo (object)

Review
  - author (string)
  - source (enum: tripadvisor | google | direct)
  - rating (number 1–5)
  - text (text)
  - tourReference → Tour (reference, optional)
  - date (datetime)
  - featured (boolean)

FAQItem
  - question (string)
  - answer (Portable Text)
  - category (enum)
  - order (number)

SiteSettings (singleton)
  - conditionsBanner (object: { active: boolean, message: string })
  - whatsappNumber (string)
  - contactEmail (string)
  - socialLinks (object)
```

---

## 9. Booking Integration (FareHarbor)

**Do not build a custom booking system.**

Use **FareHarbor** (or **Bokun** as alternative — evaluate at integration time):

- Free for the operator; small % added to customer price
- Handles: availability calendar, payment processing, automated confirmation + reminder emails, group/private pricing, waivers
- Each tour in Sanity has a `fareharborWidgetId` field
- On the tour detail page, render the FareHarbor embed in the sticky sidebar / bottom drawer
- FareHarbor provides a script snippet per item — embed it in a `<FareHarborWidget tourId={tour.fareharborWidgetId} />` component

For enquiries that don't fit a standard booking (custom groups, school trips, corporate), route to the `/contact` custom enquiry form instead.

**Placeholder during build:** Use a "Request This Tour" form (name, email, date, group size → Resend email) as a stand-in until FareHarbor account is set up. Build the UI slot for the real widget from day one.

---

## 10. SEO Architecture

- `generateMetadata` per page (Next.js App Router)
- Structured data schemas:
  - `LocalBusiness` — site-wide
  - `TouristTrip` — per tour detail page
  - `Review` / `AggregateRating` — reviews page + tour pages
  - `BlogPosting` — per blog post
  - `BreadcrumbList` — all pages
- Sitemap: `next-sitemap` auto-generation
- OpenGraph images: dynamic via `next/og` per page
- Region sub-pages are **primary SEO targets** — write titles like:
  - "Best Hikes in Peneda-Gerês National Park"
  - "Things to do in Montalegre, Trás-os-Montes"
  - "Pitões das Júnias: Waterfall, Village & Monastery Guide"
- Internal linking: region sub-pages ↔ tour pages ↔ blog posts
- Google Analytics 4 + Meta Pixel (placeholder script slots from day one)
- Performance: Core Web Vitals optimised — image lazy loading, font preload via `next/font`, minimal client JS

---

## 11. i18n

- Default locale: `pt` (Portuguese)
- Secondary: `en` (English)
- Path-based: `/pt/tours`, `/en/tours`
- All page content, metadata, form labels, and error messages translatable
- Language toggle in navbar and footer
- Sanity content: bilingual fields on all user-facing strings (`title_pt`, `title_en`) or use Sanity's i18n plugin
- Seed content in PT first; EN translations can follow

---

## 12. Placeholder Content

**Images:** Use Unsplash with descriptive queries:

- Hero: `https://images.unsplash.com/photo-1566438480900-0609be27a4be`
- Hiking: `https://images.unsplash.com/photo-1551632811-561732d1e306`
- River/forest: `https://images.unsplash.com/photo-1508193638397-1c4234db14d8`
- Village: `https://images.unsplash.com/photo-1528360983277-13d401cdc186`
- Or dynamically: `https://source.unsplash.com/1200x800/?nature,portugal,mountains`

**Seed Tours (hardcode as JSON fixtures initially, migrate to Sanity later):**

```json
[
  {
    "slug": "rota-aldeias-graniticas",
    "title": "Rota das Aldeias Graníticas",
    "category": "cultural",
    "difficulty": "easy",
    "duration": "Half day – 4 hours",
    "groupSize": { "min": 2, "max": 12 },
    "pricing": [{ "label": "Per person", "price": 45 }],
    "seasonAvailability": ["spring", "summer", "autumn", "winter"]
  },
  {
    "slug": "trilho-pitoes-junias",
    "title": "Trilho de Pitões das Júnias",
    "category": "hiking",
    "difficulty": "moderate",
    "duration": "Full day – 7 hours",
    "groupSize": { "min": 2, "max": 10 },
    "pricing": [{ "label": "Per person", "price": 65 }],
    "seasonAvailability": ["spring", "summer", "autumn"]
  },
  {
    "slug": "expedicao-4x4-barroso",
    "title": "Expedição 4×4 ao Barroso Profundo",
    "category": "4x4",
    "difficulty": "moderate",
    "duration": "Full day – 8 hours",
    "groupSize": { "min": 2, "max": 8 },
    "pricing": [{ "label": "Per person", "price": 85 }, { "label": "Private group", "price": 480 }],
    "seasonAvailability": ["spring", "summer", "autumn", "winter"]
  },
  {
    "slug": "fim-de-semana-geres",
    "title": "Fim de Semana no Coração do Gerês",
    "category": "multiday",
    "difficulty": "moderate",
    "duration": "2 days / 1 night",
    "groupSize": { "min": 2, "max": 8 },
    "pricing": [{ "label": "Per person", "price": 195 }],
    "seasonAvailability": ["spring", "summer", "autumn"]
  }
]
```

---

## 13. Build Order

Work through this in sequence. Do not skip ahead — each phase depends on the previous.

### **Phase 1 — Foundation**

- [ ] Next.js 14 + TypeScript + Tailwind + next-intl scaffold
- [ ] CSS design tokens (colours, fonts, spacing)
- [ ] Navbar + Footer + Layout wrapper
- [ ] Floating WhatsApp button component
- [ ] Cookie consent banner
- [ ] 404 page

### **Phase 2 — Core Pages**

- [ ] Home page (all sections, static content)
- [ ] Tours catalog `/tours` with filter system (using JSON seed data)
- [ ] Tour detail page `/tours/[slug]` (full layout, FareHarbor widget placeholder)

### **Phase 3 — Supporting Pages**

- [ ] Region hub `/region`
- [ ] 2–3 Region sub-pages `/region/[slug]`
- [ ] About page with guide profile cards
- [ ] Contact page + custom enquiry form (Resend integration)
- [ ] Reviews page
- [ ] FAQ page

### **Phase 4 — CMS Integration**

- [ ] Sanity project setup + schema definitions (Section 8)
- [ ] Migrate seed tour data to Sanity
- [ ] Blog list + post pages (Sanity Portable Text rendering)
- [ ] Conditions banner (Sanity SiteSettings singleton)

### **Phase 5 — Booking + SEO**

- [ ] FareHarbor widget integration (replace placeholder forms)
- [ ] Structured data (all schemas from Section 10)
- [ ] `generateMetadata` per page
- [ ] Sitemap via `next-sitemap`
- [ ] Dynamic OG images
- [ ] GA4 + Meta Pixel script slots

### **Phase 6 — Polish**

- [ ] Framer Motion animations (hero entrance, scroll-triggered sections, page transitions)
- [ ] Mapbox integration (region hub + tour detail maps)
- [ ] Loading skeleton states
- [ ] Full i18n wiring (EN translations)
- [ ] Performance pass (Lighthouse audit, image optimisation, bundle analysis)

---

## 14. Out of Scope (v1)

These are intentionally deferred to v2:

- Newsletter signup / email marketing integration
- Standalone `/gallery` page (photos embedded in tour and region pages is sufficient for v1)
- Custom payment processing (FareHarbor handles this)
- GPX file upload / dynamic trail rendering on maps
- User accounts / booking history
- Affiliate or OTA (GetYourGuide, Viator) integration

---

## 15. Key Decisions Log

| Decision | Rationale |
| --- | --- |
| FareHarbor over custom booking | Months of saved dev time; better UX; handles payments, availability, reminders |
| Sanity over Contentful | More editor-friendly Studio; better for non-technical team |
| Region pages as SEO backbone | Primary organic traffic source — people search for Gerês, not "Natur Barroso" |
| Inline FAQs on tour pages | Reduces drop-off; answers objections at point of decision |
| WhatsApp prominent on all pages | Portuguese market converts heavily via WhatsApp; not just a footer link |
| No standalone gallery page (v1) | Low conversion value; images embedded contextually are more effective |
| JSON fixtures before Sanity | Unblocks frontend build; CMS integrated in Phase 4 |
