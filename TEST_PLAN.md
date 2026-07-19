# Test Plan — nullstellensatz Jekyll glassmorphism blog (PR #2)

Site running locally at http://127.0.0.1:4000 via `bundle exec jekyll serve`.
No auth/backend. All testing through the browser (Chrome), one continuous recording.

## Evidence from code (grounding)
- `_layouts/home.html`: hero-title, `.intro.glass-card`, "Writing" section + post_list.
- `_includes/nav.html` + `_data/home.yml`: nav = Home(/), Writing(/blog/), About(/about/).
- `_includes/post_list.html`: post cards with date, title, excerpt, tags.
- `_posts/2026-07-18-combinatorial-nullstellensatz.md`: heavy MathJax ($...$, $$...$$).
- `_includes/math.html`: MathJax 3 CDN, inline `$..$` + display `$$..$$`.
- `_includes/toggle_theme_js.html` + `_includes/toggle_theme_button.html`: `.theme-toggle` toggles `data-theme` on `<html>`, persists to localStorage.
- `_layouts/default.html`: `.bg-decor` blobs + theme toggle button.

## Test Cases

### T1 — Home page renders (light)
Go to `/`. PASS if: hero title "nullstellensatz" visible; tagline/description present; intro glass card with welcome text; "Writing" section heading + "All posts →" link; two post cards ("Hello, and the plan", "The Combinatorial Nullstellensatz, from scratch") with dates + tags. Background blobs visible. Screenshot.
FAIL if: raw `{{ }}`/`{% %}` Liquid artifacts, missing cards, or no glass styling.

### T2 — Nav links work
Click nav "Writing" → lands on `/blog/`. Click "About" → `/about/`. Click brand/Home → `/`. PASS if each destination loads correct content and URL. Active-link styling on current page.

### T3 — /blog/ lists both posts + open a post
On `/blog/`, PASS if both post cards listed. Click "The Combinatorial Nullstellensatz" card → opens `/blog/combinatorial-nullstellensatz/`.

### T4 — Post page: MathJax + glass + meta (the key one)
On the Combinatorial Nullstellensatz post. PASS if:
- Math is TYPESET (rendered symbols, e.g. `A + B = {a+b ...}`, summ/prod, binomial) — NOT raw `$...$` text. Zoom to confirm rendered glyphs.
- `.post-content.glass-card` frosted surface present.
- Date and reading time shown in header.
- Tags rendered (polynomial-method, combinatorics, nullstellensatz).
- Back "← Home"/blog link present.
Screenshot with math region zoomed.
FAIL if any `$` / `\prod` / `\binom` appears as literal text.

### T5 — Theme toggle light ↔ dark
Click the bottom-right circular glass theme button. PASS if: `<html data-theme>` flips to `dark`, whole page palette changes to dark, glass/frost + blobs still look correct; click again returns to light. Screenshot home in dark. Verify via visible palette change (not just attribute).

### T6 — About page
Visit `/about/`. PASS if About content renders (pi625, GitHub, MathJax mention), glass page surface, no Liquid artifacts.

### T7 — Console clean (cross-cutting)
Check browser console across pages. PASS if no JS errors (404s for optional favicon acceptable but noted). MathJax loads without error.

## Out of scope
Extensive responsive/mobile, RSS XML content deep-dive (only smoke: /feed.xml returns 200 — already confirmed), SEO tags.
