# Test Report — nullstellensatz Jekyll glassmorphism blog (PR #2)

**Branch:** `devin/1784426225-jekyll-glassmorphism-blog`
**How tested:** Ran the site locally (`bundle exec jekyll serve` at http://127.0.0.1:4000) and exercised the golden paths end-to-end in Chrome, plus DOM/source inspection to confirm findings.

## Summary
The site works well overall — home page, navigation, blog index, post pages, MathJax typesetting, glassmorphism, and the light/dark theme toggle all function. **One real bug found:** in the Combinatorial Nullstellensatz post, an inline math expression containing pipe characters is parsed by kramdown as a GFM Markdown table, so it renders as a bordered table with literal `$` signs instead of typeset math.

## Results

| # | Test | Result |
|---|------|--------|
| T1 | Home renders (hero, intro glass card, Writing section, 2 post cards) | PASS |
| T2 | Nav links (Home / Writing / About) | PASS |
| T3 | /blog/ lists both posts, clicking opens post | PASS |
| T4 | Post: MathJax typeset, glass surface, date, reading time, tags | PASS (with 1 math bug — see below) |
| T5 | Theme toggle light ↔ dark, glass + blobs both modes | PASS |
| T6 | About page | PASS |
| T7 | No console errors / no Liquid artifacts | PASS |

---

## T1 — Home page (light)
Hero title "nullstellensatz", tagline, description, intro glass card, "Writing" section with "All posts →", and both post cards (with dates + tags) all present. No Liquid artifacts.

![Home light](https://app.devin.ai/attachments/1453990f-ed43-4e9c-a820-dabb5c96b78e/ss_b025cd12.png)

## T5 — Theme toggle (dark)
Clicking the bottom-right circular glass button flips `<html data-theme>` to `dark` (verified via DOM). The whole palette changes to dark navy/purple, frosted glass cards and gradient blobs remain correct. Clicking again returns to light. Bidirectional.

![Home dark](https://app.devin.ai/attachments/616ffa70-b036-418e-a3dd-a7c5a3eeeb5b/ss_97f47b7e.png)

## T2 / T3 — Navigation & blog index
`/blog/` lists both posts; nav links land on correct URLs (`/`, `/blog/`, `/about/`) with active-link styling.

| /blog/ (Writing) | /about/ |
|---|---|
| ![blog](https://app.devin.ai/attachments/baf18608-995a-4ad7-bd6c-f82d1205f5f6/ss_7c9fce9b.png) | ![about](https://app.devin.ai/attachments/556e7d5c-5067-48fc-baa4-3a11f70e2ee0/ss_364a9f3b.png) |

## T4 — Post page: MathJax + glass + meta
The Combinatorial Nullstellensatz post opens with a frosted glass article surface, header showing date + "640 words, 4 min read", and 3 tags. Most math is correctly typeset by MathJax (rendered as `<mjx-container>`/`<math>`, not raw `$...$`). Dark mode also renders math correctly on the glass surface.

| Typeset math (light) | Post in dark mode |
|---|---|
| ![math light](https://app.devin.ai/attachments/3dfb58b3-24ce-47c1-88dd-a6690f061905/ss_zoom_e8f1e9de.png) | ![math dark](https://app.devin.ai/attachments/9aeeffad-9c69-410e-a29e-98a95e7ca156/ss_706b2730.png) |

### 🔴 BUG — Inline math with pipes parsed as a Markdown table
In the "Cauchy–Davenport, for free" section, the source line (`_posts/2026-07-18-combinatorial-nullstellensatz.md:72`):

```
Assume it fails. Pick a set $C \supseteq A + B$ with $|C| = |A| + |B| - 2$ and study
```

is rendered as a **bordered table** with **literal `$` characters** visible, because kramdown's GFM input mode interprets the `|` (absolute-value bars) inside the inline math as table-column delimiters. The generated `_site` HTML contains exactly one `<table>` element from this line. The `$...$` delimiters are not consumed, so MathJax never typesets it.

![Table bug zoom](https://app.devin.ai/attachments/cb2d671f-7ddf-40bd-93ca-60d13daa3cd2/ss_zoom_0879591d.png)

Full-section context:

![Table bug in context](https://app.devin.ai/attachments/99ef6571-0ebe-433b-9c5b-bf6f6ed36335/ss_24864ef4.png)

**Suggested fixes (for the author, not applied):**
- Convert the inline `|...|` bars to `\lvert ... \rvert` inside the math, e.g. `$\lvert C\rvert = \lvert A\rvert + \lvert B\rvert - 2$`, so no literal `|` remains in the text; **or**
- Use display math / a form that doesn't put bare `|` in a table-eligible line; **or**
- Disable GFM table parsing (this is a config-level tradeoff).

Note: other lines with `|A + B|` inside `$$...$$` display blocks render fine — the issue is specifically the *inline* `$...$` with pipes on a paragraph line.

## T7 — Console / artifacts
Browser console was empty (no JS errors) on home, /blog/, post, and about pages, in both light and dark themes. No `{{ }}` / `{% %}` Liquid artifacts anywhere. MathJax CDN loaded without error.

---

## Artifacts
- Recording: `/home/ubuntu/screencasts/rec-828236ae-38e6-4dbd-bcf1-fba3b8f8ac53/rec-828236ae-38e6-4dbd-bcf1-fba3b8f8ac53-edited.mp4`
- This report: `/home/ubuntu/repos/nullstellensatz/test-report.md`
