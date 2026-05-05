@AGENTS.md

## Current Status

- **Phase 3 complete.** Foundation, core pages, and supporting pages are built and deployed on Vercel.

---

## Design — Do Not Touch

Before building anything new, read existing components and match their patterns exactly.

- Do NOT change colours, typography, spacing, shadows, border-radius, or layout unless explicitly asked
- Do NOT introduce new Tailwind classes that aren't already used in the codebase for existing elements. Only add new classes if class doesn't exists, or when not redundant.
- Do NOT "improve" or "clean up" styling you weren't asked to touch
- When in doubt: copy the pattern from the nearest existing component

---

## How to Build New Things

1. Find the most similar existing page or component
2. Read it fully before writing a single line
3. Match its structure, naming conventions, and styling approach
4. Only then write the new code

---

## What's Left to Build (Phases 4–6)

- **Phase 4:** Sanity CMS setup + schema + migrate seed data + blog pages + conditions banner
- **Phase 5:** FareHarbor widget integration, structured data, metadata, sitemap, OG images, analytics
- **Phase 6:** Framer Motion animations, Mapbox, loading skeletons, EN translations, performance pass

Do not jump ahead. Confirm the current task before starting.

---

## Tech Constraints

- Next.js App Router — no Pages Router patterns
- Tailwind CSS v4 — check existing usage before adding utilities
- `next-intl` for all user-facing strings — nothing hardcoded in EN or PT only
- TypeScript strict mode — no `any`, no skipping types
- Images via `next/image` only — no raw `<img>` tags

---

## Never Do These

- Never run `npm install` for a package without confirming with the user first
- Never delete or overwrite files you weren't explicitly asked to change
- Never modify `globals.css` or the design token variables without explicit instruction
- Never change the Navbar, Footer, or Layout wrapper unless that is the stated task
- Never push to git — leave commits to the user