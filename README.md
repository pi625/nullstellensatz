# nullstellensatz

This repository is being converted into a small Jekyll site using Pico.css for styling.

Local preview

```bash
# install dependencies
bundle install

# serve locally
bundle exec jekyll serve --livereload
```

Publish

- Enable GitHub Pages in the repository settings and serve from the `main` branch (root) or use GitHub Actions to build.

Notes

- Math is rendered with MathJax (already included in the layout).
- Existing interactive widget scripts are left in `js/` but are not included by default in the new layouts; add them per post if needed.
