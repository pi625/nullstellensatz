# Test Report — nullstellensatz (PR #2) — Re-test after math-bug fix

**Branch:** `devin/1784426225-jekyll-glassmorphism-blog` · **Commit:** `8c70c8f` ("Fix inline math rendering: escape absolute-value bars, drop GFM parser")
**How tested:** Killed the old server, `rm -rf _site .jekyll-cache`, rebuilt fresh with `bundle exec jekyll serve`, then verified in Chrome. Focus: the previously-reported inline-math table bug + regression smoke test.

## Result: FIX VERIFIED — no regressions

| # | Check | Result |
|---|-------|--------|
| 1 | Cauchy–Davenport equation `$|C| = |A| + |B| - 2$` renders as typeset math (no table, no literal `$`) | PASS |
| 1b | Whole post free of broken equations / stray `<table>` | PASS (0 `<table>` in generated HTML) |
| 2 | Regression: home, /blog/, theme toggle | PASS |
| — | Console clean across pages/themes | PASS |

---

## The fix (before → after)

Previously, the source line `...with $|C| = |A| + |B| - 2$ and study` was mis-parsed by kramdown's GFM mode as a table. Now it renders as a normal paragraph with typeset inline math.

| 🔴 Before (bug) | 🟢 After (fixed) |
|---|---|
| ![before](https://app.devin.ai/attachments/a6ea907c-58e8-45d7-b07d-88576a79a903/ss_zoom_0879591d.png) | ![after](https://app.devin.ai/attachments/dead3c45-99cc-4098-b012-8e7a0209d3e6/ss_zoom_1d77c2bb.png) |

The fixed section reads as a single flowing paragraph — "Assume it fails. Pick a set $C ⊇ A + B$ with $|C| = |A| + |B| − 2$ and study" — followed by the display equation, with the binomial coefficient and exponents (`x^{|A|-1} y^{|B|-1}`, `\binom{|A|+|B|-2}{|A|-1}`) all typeset correctly.

![Fixed section in context](https://app.devin.ai/attachments/c78bf593-2c18-48e5-9793-d7ef39118f77/ss_62289557.png)

**Verification details:**
- Source now uses `\lvert ... \rvert` throughout the post (lines 49, 61, 72, 76, 77, …) and `_config.yml` no longer sets `input: GFM`.
- Generated `_site` HTML: `grep -c '<table'` on the post = **0**; a repo-wide scan of `_site/**/*.html` = **0** files with `<table>`.
- Browser DOM: the expression appears as `<mjx-container>`/`<math>` (typeset by MathJax), not a `<table>` and not literal `$`.

## Regression smoke test

| Home (light) | /blog/ index |
|---|---|
| ![home](https://app.devin.ai/attachments/03879582-a634-4418-abfc-94ed0073d63f/ss_32213bac.png) | ![blog](https://app.devin.ai/attachments/a0e6a5bf-3a3d-4748-a9f8-58019daef0dd/ss_f83ffeb8.png) |

- Home page: hero, intro glass card, "Writing" section with both post cards + tags — intact.
- /blog/ index: both posts listed with dates, tags, footer — intact.
- Theme toggle: dark→light→dark flips correctly, glassmorphism + blobs correct.
- Browser console: empty (no JS errors) on all pages, both themes.

---

## Artifacts
- Recording: `/home/ubuntu/screencasts/rec-caa88775-b2f3-4ea8-a458-8ac7eb28ff42/rec-caa88775-b2f3-4ea8-a458-8ac7eb28ff42-edited.mp4`
- This report: `/home/ubuntu/repos/nullstellensatz/test-report.md`
