# nullstellensatz

A minimalist, glassmorphism-styled **Jekyll** blog for math exposition — built as an
entry for the [Summer of Math Exposition](https://some.3b1b.co/).

## Features

- Self-contained Jekyll theme (no remote theme dependency).
- **Blog**: dated posts in `_posts/`, a `/blog/` index, tags, and reading-time.
- **Glassmorphism** UI: frosted glass nav, cards, and post surfaces over an animated
  gradient/blob background, with light + dark themes (auto-detecting, with a toggle).
- Math via **MathJax**, syntax highlighting via **Rouge**.
- SEO tags, RSS feed, and a sitemap out of the box.

## Local preview

```bash
# install dependencies (Ruby 3.x + Bundler)
bundle install

# serve locally with live reload
bundle exec jekyll serve --livereload
# → http://127.0.0.1:4000
```

## Writing a post

Add a file to `_posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "My post title"
date: 2026-07-20
tags: [polynomial-method, combinatorics]
excerpt: "One-sentence summary shown on cards and in search results."
---

Your content, with $inline$ and $$display$$ math.
```

## Structure

| Path            | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `_config.yml`   | Site + `theme_config` toggles                       |
| `_data/home.yml`| Navbar and footer links                             |
| `_layouts/`     | `default`, `home`, `blog`, `post`, `page`           |
| `_includes/`    | nav, head, theme toggle, post list, math, etc.      |
| `_sass/`        | `moonwalk` (theme + glass), `list`, `syntax`        |
| `_posts/`       | Blog posts                                          |

## Publishing

A GitHub Actions workflow (`.github/workflows/pages.yml`) builds the site with the
repo's own Jekyll version and deploys to GitHub Pages. Enable it under
**Settings → Pages → Build and deployment → GitHub Actions**.

## Credits

Styling evolved from the [Moonwalk](https://github.com/abhinavs/moonwalk) Jekyll theme.
