---
name: testing-jekyll-site
description: How to run and test the nullstellensatz Jekyll static blog locally (glassmorphism theme, MathJax, light/dark toggle).
---

# Testing the nullstellensatz Jekyll site

## Run locally
- Ruby 3.0 + Bundler are installed. Gems are installed via `bundle install` (global bundle path configured).
- Add the gem bin to PATH: `export PATH="$HOME/.gem/ruby/3.0.0/bin:$PATH"`
- From repo root: `bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000`
- Site: http://127.0.0.1:4000 . If gems missing, run `bundle install` first.
- No backend, no auth, no secrets needed. Generated HTML lands in `_site/`.

## Key pages / selectors
- Home `/`, blog index `/blog/`, about `/about/`, RSS `/feed.xml`.
- Posts permalink pattern: `/blog/:title/` (e.g. `/blog/combinatorial-nullstellensatz/`).
- Theme toggle: bottom-right circular glass button (`.theme-toggle`); it flips `data-theme` on `<html>` and persists to `localStorage`. Verify via `document.documentElement.getAttribute('data-theme')`.
- Math: MathJax 3 CDN; typeset math appears as `<mjx-container>`/`<math>` in the DOM (not raw `$...$`).

## Known gotcha (kramdown GFM + inline math with pipes)
`_config.yml` uses `kramdown` with `input: GFM`. A **paragraph line** containing inline math with pipe chars, e.g. `... with $|C| = |A| + |B| - 2$ ...`, is mis-parsed as a GFM **table** — it renders as a bordered table with literal `$` visible instead of typeset math. When testing posts, inspect the generated `_site/.../index.html` for unexpected `<table>` elements. Display math `$$...$$` blocks with `|` render fine; the issue is inline `$...$` with bare pipes on a table-eligible line. Fix is authoring-side: use `\lvert ... \rvert` instead of `|`.

## Devin Secrets Needed
None.
