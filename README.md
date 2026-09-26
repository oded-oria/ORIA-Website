# ORIA LEFKADA website

Static site for the villa, served by GitHub Pages at <https://www.orialefkada.gr>.
**Anything pushed to `main` is live within about a minute.** No build step, no dependencies.

```
index.html            the one-page site
accessibility.html    accessibility statement (linked from the footer and the Accessibility panel)
css/styles.css        all styles; colour/typography tokens at the top
js/main.js            mobile menu, accessibility options, gallery photo viewer
fonts/                self-hosted Playfair Display + Inter (SIL Open Font License)
images/               optimised photos (<name>-<width>.jpg/.webp, <name>-full.jpg)
tools/                process_images.py — crops/resizes original photos into images/
docs/                 accessibility audit report; EU funding posters (espa-poster-en/el.pdf)
```

## The design

"Earth Luxe": the colours are sampled from photographs of the villa itself, so the site is built from
the same materials as the house — limestone and sand grounds, espresso and taupe text, a walnut
contact band, **one** accent (iroko timber `#8F5A2E`) and **one** metal (brass, used only on dark
surfaces). Playfair Display for headings, Inter for everything else.

Every token is defined at the top of `css/styles.css` with its computed contrast ratio. When adding
anything, reuse those tokens rather than introducing a new colour — and note the rules baked into
them: `--brass` is never text on a light background, and `--rule` and `--placeholder` are never text.

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
2. **Better photos.** The current photos came through WhatsApp (compressed, mostly portrait). When the
   originals arrive, put them in `images/`, edit the table in `tools/process_images.py`, run it, and
   update the `alt`, `width` and `height` attributes in `index.html`. Raw originals are not committed.

## EU funding banner — don't move it

The white strip at the top of the home page (`<aside class="funding-strip">`) is a condition of the
villa's grant (ESPA 2021-2027, programme "Competitiveness 2021-2027"). The programme's rules require it
on the home page and **visible without scrolling on any device**, and the consultant requires each banner
to open its poster: `images/espa-banner-en.*` → `docs/espa-poster-en.pdf`, `images/espa-banner-el.*` →
`docs/espa-poster-el.pdf`. Getting this wrong can cost up to 3% of the grant. If the consultant sends new
posters, keep the same file names (and update the file sizes in the banners' `alt` text).

## Adding Greek later

Copy `index.html` and `accessibility.html` into an `el/` folder, translate the text, set
`<html lang="el">`, fix the relative paths (`../css/…`), and add
`<link rel="alternate" hreflang="el" …>` / `hreflang="en"` pairs plus a language link in the header of
both versions. The body font (Inter) already ships its Greek subset; the heading font has no Greek
glyphs and falls back to Georgia automatically.
