# Natur Barroso — Design System Reference

> Read-only reference. Treat every class name and value here as canonical — derived from the actual homepage codebase. Do not invent alternatives; match these exactly.

---

## 1. Colour Tokens

Defined in `src/app/globals.css` inside `@theme {}`. Tailwind v4 maps `--color-*` variables automatically to utility classes (`bg-forest`, `text-amber`, etc.).

| CSS Variable | Hex | Tailwind utility | Primary uses |
|---|---|---|---|
| `--color-forest` | `#3a5c3d` | `forest` | Card CTA button, journal eyebrow, active nav link hover, `btn-forest` |
| `--color-moss` | `#4d7050` | `moss` | FeaturedTours eyebrow, section backgrounds (`bg-moss/10`), btn-granite hover bg |
| `--color-amber` | `#ffb547` | `amber` | Accent — region eyebrow, testimonials eyebrow, WhatsApp eyebrow, nav active state, star rating, dot indicators, `btn-amber`, `btn-amber-solid` |
| `--color-amber-hover` | `#fcc97d` | `amber-hover` | Hover state for `btn-amber-solid` only (used on dark/image backgrounds) |
| `--color-granite` | `#2a2a28` | `granite` | Default text color, Navbar bg on mobile drawer, Footer bg, `bg-granite` dark sections, borders (`border-granite/10`, `border-granite/30`) |
| `--color-fog` | `#f5f2ec` | `fog` | Default page background, light section bg (`bg-fog`), FeaturedTours bg, JournalTeaser bg, card inner bg, testimonial card bg |
| `--color-river` | `#4a6b7c` | `river` | Defined but not yet used in homepage components |
| `--color-whatsapp` | `#25d366` | `whatsapp` | WhatsApp section eyebrow (`text-whatsapp`), footer WhatsApp button bg, inline WhatsApp button; also used as inline `style={{ backgroundColor: "#25D366" }}` in Navbar |

**Opacity modifiers in use:**
- `granite/10` — subtle borders on cards, dividers
- `granite/25` — inactive carousel dots
- `granite/30` — navbar border
- `granite/40` — inactive dots hover, footer heading text, "from" price label
- `granite/45` — region fact description
- `granite/55` — image overlay gradient end
- `granite/60` — body text (`text-granite/60`)
- `granite/65` — card body text, pill text
- `granite/70` — testimonial body text
- `fog/10` — mobile nav item borders
- `fog/20` — mobile language toggle border
- `fog/30` — HowItWorks eyebrow on dark bg
- `fog/40` — footer headings, social icons, legal text
- `fog/55` — HowItWorks step body text
- `fog/60` — footer links, tagline
- `fog/70` — card price "from" label overlay
- `fog/80` — hero subtitle text
- `fog/85` — SeasonPill background
- `moss/10` — TrustStrip bg, RegionTeaser bg, Testimonials bg
- `amber/60` — `btn-amber` hover bg (on light backgrounds)
- `forest/10` — `btn-forest` background
- `whatsapp/50` — WhatsApp button hover bg
- `whatsapp/70` — Footer WhatsApp link hover

**Hardcoded colour (not from token):**
- Star icons in Testimonials use inline `fill="#ffb547"`

---

## 2. Typography

### 2.1 Font Definitions

Loaded in `src/lib/fonts.ts` via `next/font/google` and applied as CSS variables:

| Font family | next/font export | CSS variable | Tailwind utility | Weights/styles |
|---|---|---|---|---|
| DM Sans | `dmSans` | `--font-dm-sans` | `font-sans` | Variable weight |
| Instrument Serif | `instrumentSerif` | `--font-instrument-serif` | `font-serif` | 400 normal + italic |
| Inter | `inter` | `--font-inter` | `font-display` | Variable weight |
| JetBrains Mono | `jetBrains` | `--font-jetbrains` | `font-mono` | Variable weight |
| Stack (local) | — | `--font-stack` | `font-stack` | 400 normal (woff2 at `/fonts/stack_regular.woff2`) |

**Theme mappings** (in `globals.css @theme`):
```
--font-serif:   var(--font-instrument-serif), ui-serif, Georgia, serif
--font-sans:    var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif
--font-display: var(--font-inter), ui-sans-serif, system-ui, sans-serif
--font-mono:    var(--font-jetbrains), ui-monospace, monospace
--font-stack:   "Stack", ui-sans-serif, system-ui, sans-serif
```

**Base default** (in `globals.css @layer base`):
```css
html { @apply font-stack text-granite bg-fog; }
```
Stack is the primary UI font for all body and UI text. Instrument Serif is reserved for display headings.

### 2.2 Type Scale in Use

**Eyebrow labels** (used above every section heading):
```
text-[10px] md:text-base uppercase tracking-wide md:tracking-wide mb-3
```
Font: inherits `font-stack` (base). Color varies per section:
- `text-moss` — FeaturedTours (on `bg-fog`)
- `text-amber` — RegionTeaser (on `bg-moss/10`), Testimonials (on `bg-moss/10`)
- `text-fog/30` — HowItWorks (on `bg-granite`)
- `text-whatsapp` — WhatsAppCTA (on `bg-white`)
- `text-forest` — JournalTeaser (on `bg-fog`)

**Section headings (h2) — standard:**
```
text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite
```
Used in: FeaturedTours, RegionTeaser, HowItWorks (with `text-fog`), Testimonials.

**Section headings (h2) — large variant:**
```
text-4xl md:text-6xl font-serif leading-[0.8] tracking-[-0.01em] text-granite
```
Used in: WhatsAppCTA, JournalTeaser.

**Sub-headings (h3) — WhatsApp section panels:**
```
text-3xl md:text-4xl font-serif text-granite leading-[0.8] tracking-[-0.01em]
```

**Sub-headings (h3) — HowItWorks steps:**
```
text-2xl md:text-4xl font-serif text-fog leading-snug
```

**Tour card title (h3):**
```
font-stack text-xl text-granite mb-2 leading-snug
```

**Journal card title (h3):**
```
text-granite text-lg leading-snug mb-3 line-clamp-2
```
Font: inherits `font-stack`.

**Step counter numbers:**
```
font-serif text-6xl md:text-9xl text-fog/30 leading-[0.8]
```

**Region stats numbers:**
```
text-4xl font-stack text-amber leading-none
```

**Hero subtitle:**
```
text-lg md:text-xl text-fog/80 max-w-xl leading-relaxed
```

**Body / description text (standard):**
```
text-sm md:text-base text-granite/60 leading-relaxed
```

**Card description text:**
```
text-sm text-granite/60 leading-relaxed line-clamp-2
```

**Price overlay on image (small card):**
```
text-[9px] font-medium tracking-widest uppercase text-fog/70 leading-none  /* "From" label */
font-serif text-4xl text-fog leading-none                                    /* price number */
```

**Price on desktop featured card:**
```
text-[10px] font-medium tracking-widest uppercase text-granite/40 leading-none  /* "From" label */
font-serif text-6xl text-granite leading-none                                     /* price number */
```

**Phone number display:**
```
text-2xl font-stack text-granite
```

**Footer column headings:**
```
text-xs  uppercase tracking-widest text-fog/40 mb-5 font-sans
```

**Footer / nav links:**
```
text-sm text-fog/60 hover:text-fog transition-colors
```

**Nav links (desktop):**
```
text-md font-medium  /* active: text-amber / default: text-granite hover:text-forest */
```

**Mobile nav links:**
```
text-3xl font-serif py-3 border-b border-fog/10  /* active: text-amber / default: text-fog hover:text-amber */
```

**Metadata / captions:**
- Card meta pills: `text-xs font-medium`
- SeasonPill text: `text-xs font-medium tracking-wide`
- Journal card meta: `text-xs` (category in `text-amber`, date/readTime in `text-granite/40`)
- Testimonial author: `text-sm  text-granite`
- Testimonial source: `text-xs text-granite/50`
- Map waypoint labels: `text-[10px] font-mono text-granite tracking-wide`

**Custom text size token:**
```css
--text-md: 1rem   /* used as text-md = 16px, Tailwind's default text-base */
```

---

## 3. Spacing & Layout

### 3.1 Container

Standard content container used in all sections:
```
max-w-7xl mx-auto px-4 md:px-6
```
Max width: 80rem (1280px). Horizontal padding: 1rem mobile, 1.5rem desktop.

**Exception — RegionTeaser left column** uses edge-to-edge grid with manual padding to align with 7xl max-w:
```
lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]
```

**Exception — TrustStrip** uses `px-4 md:px-6` without max-w (items spread to full width).

### 3.2 Section Padding Pattern

| Variant | Class | Used in |
|---|---|---|
| Standard | `py-20` | FeaturedTours, Testimonials, WhatsAppCTA, JournalTeaser |
| Large | `py-24` | HowItWorks |
| Compact | `py-6 md:py-8` | TrustStrip |
| Full-screen | `min-h-screen` | HeroSection |
| Grid-driven | (no section py) | RegionTeaser (min-h drives height) |

Footer: `pt-16 pb-24`.

### 3.3 Section Header Bottom Margin

Always `mb-16` between the header block (eyebrow + heading + optional CTA) and the content below. This is a hard rule across all sections.

### 3.4 Common Gap Values

| Context | Value |
|---|---|
| Section header flex gap | `gap-6` |
| Card grids / carousel tracks | `gap-4` |
| HowItWorks step (number ↔ text) | `gap-6 md:gap-16` |
| Footer column grid | `gap-12` |
| Region fact items | `gap-y-4` (grid) |
| Card metadata pills row | `gap-1` (flex-wrap) |
| Journal card meta row | `gap-3` |

### 3.5 Responsive Breakpoints

| Breakpoint | Value | Key behaviour changes |
|---|---|---|
| `md:` | 768px | 1→2/3/4 col grids, desktop nav visible, flex-row section headers, hide/show CTAs |
| `lg:` | 1024px | 2→3 col grids, RegionTeaser side-by-side layout, featured tour card spans 2 cols |
| `sm:` | 640px | Footer bottom bar: stacks → row |

No `xl:` or `2xl:` breakpoints are used in homepage components.

### 3.6 Navbar Height

`h-16 md:h-20` (64px mobile, 80px desktop). Fixed positioned, `z-50`. Content below hero should account for this offset.

---

## 4. Button System

### 4.1 Base Classes

**Large button (`.btn-lg`)** — all main CTAs:
```css
inline-flex items-center justify-center px-6 py-2 rounded-lg text-md font-medium transition-colors min-w-[9rem]
/* Mobile override (max-width: 47.9375rem): */
padding: 0.375rem 1rem; font-size: 0.875rem; line-height: 1.25rem; min-width: 7rem;
```

**Small button (`.btn-sm`)** — card CTAs only:
```css
pl-4 pr-3 py-1.5 inline-flex items-center gap-1 text-sm font-medium rounded-md transition-colors
```

### 4.2 Colour Variants

| Class | Base style | Hover | Usage context |
|---|---|---|---|
| `.btn-amber` | `bg-amber border border-amber text-white` | `bg-amber/60 text-granite border-granite/10` | On light backgrounds (`bg-fog`, `bg-moss/10`, `bg-white`) |
| `.btn-amber-solid` | `bg-amber border border-amber text-white` | `bg-amber-hover text-granite border-granite/10` | On dark or image backgrounds (hero, dark sections) |
| `.btn-granite` | `pl-6 pr-5 py-2 bg-granite border border-granite/10 text-fog` | `bg-moss/50 text-granite` | Not used in homepage — defined for future use |
| `.btn-forest` | `text-forest bg-forest/10` | Via parent `group`: `bg-forest text-fog` | Card inner CTAs (TourCard, JournalCard) |
| `.btn-ghost` | `border border-white/40 text-white` | `bg-white/10` | On image backgrounds (hero) or dark sections (HowItWorks) |
| `.btn-granite-ghost` | `border border-granite/60 text-granite` | `bg-moss/10` | Secondary CTAs on light backgrounds ("View All", "Read More") |

**WhatsApp button** (not a named utility class, ad-hoc):
```
btn-lg bg-whatsapp border border-whatsapp text-white hover:bg-whatsapp/50 hover:text-granite
```

### 4.3 CTA Placement Pattern

- Desktop: right side of section header (`hidden md:block`)
- Mobile: below section content, full-width (`mt-8 md:hidden`, `w-full` on button)
- Primary action always uses `btn-amber` or `btn-amber-solid`; secondary uses `btn-granite-ghost` or `btn-ghost`

---

## 5. Component Patterns

### 5.1 Section Header Block

The exact markup pattern used in every section with a heading and optional CTA:

```tsx
<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
  <div>
    <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-{color} mb-3">
      {eyebrow}
    </p>
    <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-{granite|fog}">
      {heading}
    </h2>
  </div>
  {/* Desktop CTA — hidden on mobile */}
  <div className="hidden md:block">
    <Link href="..." className="btn-lg btn-granite-ghost">{label}&nbsp; →</Link>
  </div>
</div>
{/* Mobile CTA — below content */}
<div className="mt-8 md:hidden">
  <Link href="..." className="btn-lg btn-granite-ghost w-full">{label}&nbsp; →</Link>
</div>
```

The `→` arrow is always a literal character separated by `&nbsp;`, not an icon.

### 5.2 TourCard

```tsx
<article className="group relative flex h-full bg-white overflow-hidden border border-granite/10
  hover:border-granite/40 hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)]
  hover:-translate-y-1 transition-all duration-300 ease-out flex-col">

  {/* Full-card invisible link */}
  <Link href="..." className="absolute inset-0 z-10" />

  {/* Image area */}
  <div className="relative overflow-hidden shrink-0 h-56">
    <Image fill className="object-cover" />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-granite/55 pointer-events-none" />
    {/* Top-left: category badge */}
    <div className="absolute top-3 left-3 z-20"><CategoryBadge /></div>
    {/* Top-right: season pill */}
    <div className="absolute top-3 right-3 z-20"><SeasonPill /></div>
    {/* Bottom-right: price overlay */}
    <div className="absolute bottom-3 right-3 z-20 text-right">
      <span className="block text-[9px] font-medium tracking-widest uppercase text-fog/70 leading-none mb-0.5">From</span>
      <span className="block font-serif text-4xl text-fog leading-none">€{price}</span>
    </div>
  </div>

  {/* Content area */}
  <div className="flex flex-col flex-1 p-4">
    <h3 className="font-stack text-xl text-granite mb-2 leading-snug">{title}</h3>
    <p className="text-sm text-granite/60 mb-4 leading-relaxed line-clamp-2">{shortDescription}</p>

    {/* Metadata pills row */}
    <div className="mb-4 flex items-center gap-1 flex-wrap">
      <DifficultyPill />
      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-fog text-granite/65">
        {/* Clock icon w-3 h-3 opacity-50 mr-1 */}
        {duration}
      </span>
      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-fog text-granite/65">
        {/* Person icon */}
        {min}–{max} pessoas
      </span>
    </div>

    {/* Card footer CTA */}
    <div className="mt-auto flex justify-end pt-4 border-t border-granite/10 px-4 -mx-5">
      <span className="btn-sm btn-forest group-hover:bg-forest group-hover:text-fog">
        Ver <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </div>
  </div>
</article>
```

**Featured variant** (first card, spans `lg:col-span-2`): adds `lg:flex-row` layout, image becomes `lg:w-3/5 lg:h-full lg:min-h-72`, price overlay hidden on desktop, large price shown in content area instead (`font-serif text-6xl text-granite`).

### 5.3 JournalCard (Blog Post Card)

Shares the same hover shell as TourCard. Differences:

```tsx
<article className="group relative flex flex-col bg-white overflow-hidden border border-granite/10
  hover:border-granite/40 hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)]
  hover:-translate-y-1 transition-all duration-300 ease-out">

  <Link href="..." className="absolute inset-0 z-10" />

  {/* Image: fixed height, no overlay */}
  <div className="relative h-48 overflow-hidden">
    <Image fill className="object-cover transition-transform duration-500" />
  </div>

  <div className="flex flex-col flex-1 p-4">
    {/* Meta row */}
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-medium text-amber">{category}</span>
      <span className="text-xs text-granite/40">{date}</span>
      <span className="text-xs text-granite/40">{readTime}</span>
    </div>
    <h3 className="text-granite text-lg leading-snug mb-3 line-clamp-2">{title}</h3>
    <p className="text-sm text-granite/60 leading-relaxed line-clamp-3 flex-1 mb-4">{excerpt}</p>

    {/* Same footer pattern as TourCard */}
    <div className="mt-auto flex justify-end pt-4 border-t border-granite/10 px-4 -mx-5">
      <span className="btn-sm btn-forest group-hover:bg-forest group-hover:text-fog">
        Ler artigo <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </div>
  </div>
</article>
```

Key differences from TourCard: no absolute-positioned link clickthrough suppression needed, image height `h-48` (not `h-56`), no gradient overlay, no price/badge overlays, category text replaces CategoryBadge component.

### 5.4 Testimonial Card

Note: uses `rounded-lg` (unlike TourCard/JournalCard which have no border-radius).

```tsx
<article className="bg-fog border border-granite/10 rounded-lg px-6 pt-6 pb-4 flex flex-col gap-4
  snap-start shrink-0 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">

  <div className="flex gap-0.5">
    {Array(rating).fill(null).map(() => <StarIcon />)}
  </div>

  <p className="text-granite/70 text-sm leading-relaxed flex-1">"{text}"</p>

  <div>
    <p className="text-granite text-sm ">{author}</p>
    <p className="text-granite/50 text-xs">{country} · {tour}</p>
  </div>
</article>
```

### 5.5 CategoryBadge

```tsx
<span
  className={`inline-flex items-center font-medium rounded-full ${
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs"
  }`}
  style={{ backgroundColor: config.color + "EE", color: "#ffffff" }}
>
  {label}
</span>
```

Color sourced from `CATEGORY_CONFIG[category].color` (hex string) with `"EE"` appended for ~93% opacity. Always white text.

### 5.6 DifficultyPill

```tsx
<span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${DIFFICULTY_STYLES[difficulty]}`}>
  <svg viewBox="0 0 12 12" className="w-3 h-3 opacity-60 mr-1" fill="currentColor">
    <polygon points="1,11 6,2 11,11" />  {/* triangle/mountain icon */}
  </svg>
  {label}
</span>
```

Difficulty colour map (hardcoded, not from tokens):
```
easy:        bg-[#eaf3de] text-[#3b6d11]   /* soft green */
moderate:    bg-[#faeeda] text-[#854f0b]   /* soft amber */
challenging: bg-[#fcebeb] text-[#a32d2d]   /* soft red */
expert:      bg-[#f7c1c1] text-[#791f1f]   /* stronger red */
```

### 5.7 SeasonPill

```tsx
<span className="text-xs font-medium tracking-wide px-2 py-1 rounded-full bg-fog/85 backdrop-blur text-granite/70">
  {isPt ? "Todo o ano" : "Year-round"}  {/* or "Mar – Nov" format */}
</span>
```

Always positioned `absolute top-3 right-3 z-20` inside the card image area.

### 5.8 Draggable Carousel Track

Used by FeaturedToursTrack and JournalTeaserTrack — same pattern:

```tsx
{/* Mobile: horizontal scroll. Desktop: CSS grid */}
<div
  className={`flex gap-4 overflow-x-auto snap-x snap-mandatory select-none
    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
    md:grid md:grid-cols-{n} md:overflow-visible md:cursor-default
    ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
>
  {items.map(item => (
    <div className="snap-start shrink-0 w-full md:w-auto">
      <Card />
    </div>
  ))}
</div>

{/* Dot indicators — mobile only */}
<div className="flex items-center justify-center gap-2 mt-4 md:hidden">
  {items.map((_, i) => (
    <button className={[
      "h-2 rounded-full transition-all duration-300 ease-out",
      i === activeIndex ? "w-6 bg-{forest|amber}" : "w-2 bg-granite/25 hover:bg-granite/40"
    ].join(" ")} />
  ))}
</div>
```

Active dot color: `bg-forest` for tours/journal, `bg-amber` for testimonials.

### 5.9 TrustStrip Item

```tsx
<li className="flex flex-row items-center justify-center gap-3">
  <span className="text-amber shrink-0 [&>svg]:w-8 [&>svg]:h-8">{icon}</span>
  <span className="text-sm md:text-md font-medium">{label}</span>
</li>
```

Grid: `grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6`. Icons: 32×32 stroke SVG, `strokeWidth="1.5"`, in `text-amber`.

### 5.10 Region Fact Item

```tsx
<div className="pr-8 pt-4">
  <div className="flex items-center gap-2 mb-2">
    <span className="text-amber shrink-0">{icon}</span>
    <span className="text-4xl font-stack text-amber leading-none">{num}</span>
  </div>
  <div className="text-sm font-medium text-granite/90 leading-snug mb-0.5">{label}</div>
  <div className="text-xs text-granite/45 leading-snug">{desc}</div>
</div>
```

Grid: `grid grid-cols-2 gap-y-4`.

### 5.11 HowItWorks Step Item

```tsx
<li className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 pb-2 mb-4">
  <span className="font-serif text-6xl md:text-9xl text-fog/30 leading-[0.8] shrink-0 md:w-28">
    {number}  {/* "01", "02", "03" */}
  </span>
  <div className="flex flex-col gap-2">
    <h3 className="text-2xl md:text-4xl font-serif text-fog leading-snug">{title}</h3>
    <p className="text-base text-fog/55 leading-relaxed max-w-2xl">{body}</p>
  </div>
</li>
```

### 5.12 Map Waypoint Marker

```tsx
<div className="absolute w-5 h-5" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
  <span className="absolute inset-0 rounded-full border border-fog/40 animate-ping" />
  <span className="absolute inset-0 rounded-full border border-fog/50" />
  <span className="absolute top-1/2 left-1/2 w-[10px] h-[10px] rounded-full bg-fog -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute top-1/2 left-[calc(100%+8px)] -translate-y-1/2 bg-fog px-2 py-1.5 pt-2 rounded-md">
    <span className="text-[10px] font-mono text-granite tracking-wide whitespace-nowrap">{name}</span>
  </div>
</div>
```

### 5.13 Dividers

| Pattern | Class | Used in |
|---|---|---|
| Horizontal light | `border-t border-granite/10` | Card footer area, footer bottom bar |
| Horizontal on dark | `border-t border-fog/10` | Mobile nav items, mobile phone divider in WhatsApp section |
| Vertical text separator | `text-fog/20 \|` | Footer language toggle |

---

## 6. Navbar

```
fixed top-0 left-0 right-0 z-50
bg-fog border-b border-granite/30 text-granite
Height: h-16 md:h-20
```

Internal layout: `max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between`

**Desktop right controls (left to right):**
1. Language toggle pill: `rounded-full border border-granite/25 p-1 text-xs font-medium`
   - Active locale: `px-3 py-2 rounded-full  bg-granite text-fog`
   - Inactive: `px-3 rounded-full text-granite/60 hover:text-granite`
2. WhatsApp icon button: `w-10 h-10 rounded-full hover:opacity-80` with `style={{ backgroundColor: "#25D366" }}`
3. Book CTA: `btn-lg btn-amber min-w-[9rem]`

**Mobile drawer:**
```
fixed inset-0 z-50 bg-granite flex flex-col
```
- Nav links: `text-3xl font-serif py-3 border-b border-fog/10`
- Bottom row: `btn-amber` + WhatsApp circle + language toggle

---

## 7. Footer

```
bg-granite text-fog
pt-16 pb-24
```

Container: `max-w-7xl mx-auto px-4 md:px-6`

Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12`

**Column heading pattern:**
```
text-xs  uppercase tracking-widest text-fog/40 mb-5 font-sans
```

**Link pattern:**
```
text-sm text-fog/60 hover:text-fog transition-colors
```

**Link list spacing:** `space-y-3`

**Bottom bar:**
```
border-t border-fog/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3
```
- Copyright: `text-xs text-fog/40`
- Legal links: `text-xs text-fog/40 hover:text-fog/60`

---

## 8. Animation & Interaction

### 8.1 CSS Animations

**`animate-nudge-down`** — hero scroll indicator:
```css
@keyframes nudge-down {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
animation: nudge-down 1.6s ease-in-out infinite;
```

**`animate-ping`** — region map waypoint pulse: standard Tailwind animate-ping on a `border border-fog/40` ring.

**Default link transition:** `transition-colors duration-200` on all `a` elements.

### 8.2 Card Hover State

Every card (TourCard, JournalCard) shares the same hover shell:
```
hover:border-granite/40
hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)]
hover:-translate-y-1
transition-all duration-300 ease-out
```

Card CTA button (child of `group` parent):
```
group-hover:bg-forest group-hover:text-fog
```

Arrow nudge on hover:
```
transition-transform group-hover:translate-x-0.5
```

### 8.3 Button Transitions

All buttons: `transition-colors` (duration from Tailwind default 150ms).
Social icon links: `hover:opacity-80 transition-opacity`.

### 8.4 Framer Motion

Not yet implemented in any homepage component. Phase 6 in the build order. Do not add Framer Motion until Phase 6.

---

## 9. Image Treatment

### 9.1 Hero

```tsx
<section className="relative min-h-screen flex flex-col justify-center">
  <Image src="..." alt="..." fill className="object-cover" priority sizes="100vw" />
  {/* Content sits above via relative z-10 */}
</section>
```

No gradient overlay in hero — content legibility via `drop-shadow` on text.

### 9.2 Tour Card Image

```
h-56           /* fixed height */
relative overflow-hidden shrink-0
```
Image: `fill + object-cover`. Gradient: `absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-granite/55`.

### 9.3 Journal Card Image

```
h-48           /* shorter than tour card */
relative overflow-hidden
```
Image: `fill + object-cover transition-transform duration-500`. No gradient overlay.

### 9.4 Region Teaser Split Image

```
relative min-h-[400px] lg:min-h-0     /* mobile / desktop */
mx-6 mb-4 overflow-hidden             /* mobile: margin + clipping */
lg:mx-0 lg:mb-0                       /* desktop: edge-to-edge */
```
Image: `fill + object-cover sizes="(max-width: 1024px) 100vw, 50vw"`.

---

## 10. Section Backgrounds — Homepage Order

The homepage alternates backgrounds to create visual rhythm without explicit dividers:

| Order | Section | Background class |
|---|---|---|
| 1 | HeroSection | Full-screen image (no bg class) |
| 2 | TrustStrip | `bg-moss/10` |
| 3 | FeaturedTours | `bg-fog` |
| 4 | RegionTeaser | `bg-moss/10` |
| 5 | HowItWorks | `bg-granite` (only dark section) |
| 6 | Testimonials | `bg-moss/10` |
| 7 | WhatsAppCTA | `bg-white` |
| 8 | JournalTeaser | `bg-fog` |
| 9 | Footer | `bg-granite` |

Pattern: fog ↔ moss/10 ↔ white (light variants), with a single `bg-granite` dark section at position 5.

---

## 11. Page-Level Layout Template

```tsx
{/* Layout wrapper provides: fixed Navbar + Footer */}

<HeroSection />          {/* min-h-screen, accounts for navbar via pt-20 on content */}
<TrustStrip />           {/* py-6 md:py-8 */}
<FeaturedTours />        {/* py-20 */}
<RegionTeaser />         {/* grid-driven height, min-h-[640px] */}
<HowItWorks />           {/* py-24 */}
<Testimonials />         {/* py-20 */}
<WhatsAppCTA />          {/* py-20 */}
<JournalTeaser />        {/* py-20 */}
{/* Footer rendered by layout */}
```

No vertical gaps between sections — background color changes provide visual separation. All sections are full-width `<section>` elements; content is constrained by `max-w-7xl mx-auto px-4 md:px-6` inside.

### Standard section template:

```tsx
<section className="py-20 bg-{color}">
  <div className="max-w-7xl mx-auto px-4 md:px-6">

    {/* Section header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
      <div>
        <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-{color} mb-3">
          {eyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
          {heading}
        </h2>
      </div>
      <div className="hidden md:block">
        <Link href="..." className="btn-lg btn-granite-ghost">{cta} →</Link>
      </div>
    </div>

    {/* Section content */}
    ...

    {/* Mobile CTA (repeat of desktop CTA, full-width) */}
    <div className="mt-8 md:hidden">
      <Link href="..." className="btn-lg btn-granite-ghost w-full">{cta} →</Link>
    </div>

  </div>
</section>
```

---

## 12. Key Conventions

1. **Font for headings:** Always `font-serif` (Instrument Serif) for display/section headings. Always `font-stack` (Stack) for card titles, UI labels, body text.
2. **Heading line-height:** Display headings use `leading-[0.8]` — very tight, intentional. Sub-headings use `leading-snug`.
3. **Eyebrow `mb-3`:** The margin between eyebrow label and section heading is always `mb-3` on the eyebrow — never on the heading itself.
4. **Section heading `mb-16`:** The heading block always has `mb-16` before content starts.
5. **Arrow character:** CTAs use the literal `→` character (not an SVG icon), preceded by `&nbsp;`.
6. **Full-card links:** Cards use `<Link className="absolute inset-0 z-10" />` inside a `relative` parent — interactive child elements (badge, CTA button) must be `z-20` or higher and handle `pointer-events` carefully.
7. **No border-radius on cards:** TourCard and JournalCard have zero border-radius (`overflow-hidden` clips the content). Only TestimonialCard uses `rounded-lg`.
8. **Ghost buttons on dark backgrounds:** Use `btn-ghost` (white outline) on `bg-granite` sections. Use `btn-granite-ghost` on `bg-fog`/`bg-white` sections.
9. **Mobile-first CTAs:** Every section with a desktop-positioned CTA must have a `md:hidden` duplicate below the content that is `w-full`.
10. **Tracking on eyebrows:** `tracking-wide md:tracking-wide` (same value at both sizes — the `md:` is present for structural consistency, not a change).
