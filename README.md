# ORIA LEFKADA website

Static site for the villa, served by GitHub Pages at <https://www.orialefkada.gr>.
**Anything pushed to `main` is live within about a minute.** No build step, no dependencies.

```
index.html            the one-page site
accessibility.html    accessibility statement (linked from the footer and the Accessibility panel)
css/styles.css        all styles; colour/typography tokens at the top
js/main.js            mobile menu, accessibility options, gallery photo viewer
fonts/                self-hosted Cormorant Garamond + Inter (SIL Open Font License)
images/               optimised photos (<name>-<width>.jpg/.webp, <name>-full.jpg)
tools/                process_images.py — crops/resizes original photos into images/
docs/                 accessibility audit report
```

## Accessibility — please keep it that way

The site is built to **WCAG 2.1 AA** because the villa's funding programme requires it, and it is
checked by an auditor. When editing:

- Every `<img>` needs an accurate `alt`. Icons are `aria-hidden="true"`.
- Keep one `<h1>` per page and don't skip heading levels.
- Text/background contrast must stay ≥ 4.5:1 (the pairs in use are listed at the top of `css/styles.css`).
- Anything clickable must be a real `<a>` or `<button>` and keep its visible focus outline.
- Use `rem`/`em`, not `px`, for sizes, so text enlargement keeps working.
- No third-party scripts, fonts, embeds, analytics or cookies without checking the legal side first
  (they would require a cookie-consent banner under GDPR).
- After any change, re-run the checks in `docs/accessibility-audit.md`, and update the date in
  `accessibility.html`.

## Things still to fill in

1. **Registration number (legally required on the site).** In the footer of both `index.html` and
   `accessibility.html`, put the real ΜΗ.Τ.Ε. (or ΑΜΑ) number in the `<p class="legal-id" hidden>`
   line and delete the word `hidden`.
2. **Funding banner.** `index.html` has a commented-out `<aside class="funding">` block just above the
   footer. Add the banner image and PDF supplied by the programme consultant, uncomment it, and write the
   banner's wording into the `alt`.
3. **Better photos.** The current photos came through WhatsApp (compressed, mostly portrait). When the
   originals arrive, put them in `images/`, edit the table in `tools/process_images.py`, run it, and
   update the `alt`, `width` and `height` attributes in `index.html`. Raw originals are not committed.

## Adding Greek later

Copy `index.html` and `accessibility.html` into an `el/` folder, translate the text, set
`<html lang="el">`, fix the relative paths (`../css/…`), and add
`<link rel="alternate" hreflang="el" …>` / `hreflang="en"` pairs plus a language link in the header of
both versions. The body font (Inter) already ships its Greek subset; the heading font has no Greek
glyphs and falls back to Georgia automatically.
