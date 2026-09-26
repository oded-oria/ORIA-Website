# Accessibility audit — www.orialefkada.gr

| | |
|---|---|
| **Date** | 24 September 2026 (re-run after adding the EU funding banner) |
| **Standard** | WCAG 2.1 level AA (WCAG 2.2 AA rules also run) |
| **Scope** | `index.html`, `accessibility.html` — the whole published website |
| **Design** | "Earth Luxe" (Playfair Display + Inter, self-hosted; earth-tone palette) |
| **Type** | Self-assessment: automated testing + manual checks (see "Not covered" below) |
| **Result** | No failures found |

## 1. Automated testing

Tool: **axe-core 4.10.2**, rule sets `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`,
run in Chrome at 1440 px wide with all lazy-loaded images forced to load.

| Page / state | Violations | Needs review | Rules passed |
|---|---|---|---|
| Home — default | 0 | 0 | 45 |
| Home — "High contrast" on | 0 | 0 | 45 |
| Home — "Larger text" on | 0 | 0 | 45 |
| Home — options panel open | 0 | 0 | 45 |
| Home — photo viewer open | 0 | 0 | 18 |
| Accessibility statement — default | 0 | 0 | 45 |
| Accessibility statement — "High contrast" on | 0 | 0 | 45 |
| Accessibility statement — "Larger text" on | 0 | 0 | 45 |
| Accessibility statement — options panel open | 0 | 0 | 45 |

Browser extensions inject their own markup into the page. Findings whose only targets were
extension elements (`#claude-static-*`, Grammarly, Speechify) were excluded — they are not part of
this website.

## 2. Colour contrast, measured as rendered

Rather than checking the palette in theory, every text element on both pages was walked in the
browser and its ratio computed against its actual composited background.

| Page | Text elements checked | Below requirement | Lowest ratio measured |
|---|---|---|---|
| Home | 54 | **0** | 5.08:1 (section numerals, 13 px) |
| Accessibility statement | 50 | **0** | 5.08:1 (section numerals, 13 px) |
| Either page, "High contrast" on | 50+ | **0** | 12.9:1 |

Requirement is 4.5:1 for body text and 3:1 for large text (≥ 24 px, or ≥ 18.66 px bold).

Non-text contrast (requirement 3:1): option-button borders 3.98:1, focus outlines 11.1–12.6:1,
dark-band borders 6.2–8.0:1. The decorative hairline `--rule` is 1.4:1 and is deliberately never
used as text and never as the only boundary of a control.

One combination in the palette — the accent `#8F5A2E` on the sand band — computes to exactly
4.50:1, which is too close to the limit to rely on. The design never renders it: the deeper
`#734621` (6.29:1) is used for accent text on sand. Worth keeping in mind when editing.

## 3. Manual checks

| Check | WCAG | Result |
|---|---|---|
| All images have accurate text alternatives; icons and ornaments hidden from assistive tech | 1.1.1 | Pass |
| One `h1` per page, headings in order, landmarks: header / nav / main / footer, plus a labelled `aside` for the EU funding banner on the home page | 1.3.1, 2.4.6 | Pass |
| DOM order matches visual order; no positive `tabindex` | 1.3.2, 2.4.3 | Pass |
| No text placed over a photograph (the one image label sits on a solid plaque) | 1.4.3 | Pass |
| Reflow at 320 px, both pages, no horizontal scrolling | 1.4.10 | Pass |
| Text enlarged to 200% at 1440 px, both pages, nothing clipped or overlapping | 1.4.4 | Pass |
| The site's own "Larger text" option (125%) at 320 px and 1440 px | 1.4.4 | Pass |
| Links in running text underlined, not colour alone | 1.4.1 | Pass |
| Everything operable by keyboard; Escape closes the menu, the options panel and the photo viewer, returning focus | 2.1.1, 2.1.2 | Pass |
| "Skip to main content" is the first focusable element; on the home page the two funding-banner links follow it, then the header | 2.4.1, 2.4.3 | Pass |
| Descriptive page titles; link purpose clear from link text | 2.4.2, 2.4.4 | Pass |
| Visible 3 px focus outline on every link, button and control | 2.4.7 | Pass |
| Sticky header cannot hide the focused element (scroll-padding tracks the real header height) | 2.4.11 | Pass |
| All pointer targets ≥ 44 × 44 CSS px, with no overlapping tap areas | 2.5.8 | Pass |
| Motion limited to short transitions; disabled under `prefers-reduced-motion` and by "Stop animations" | 2.2.2, 2.3.1 | Pass |
| `lang="en"`; the Greek registration label and the Greek funding-banner link marked `lang="el"` | 3.1.1, 3.1.2 | Pass |
| Navigation identical and in the same order on both pages | 3.2.3 | Pass |
| Disclosure buttons expose `aria-expanded`/`aria-controls`; option buttons expose `aria-pressed`; the photo viewer is a native modal `<dialog>` | 4.1.2 | Pass |
| Photo viewer announces "Image n of 11" through a live region | 4.1.3 | Pass |
| Works without JavaScript: menu stays open, gallery tiles link to the full photos | — | Pass |
| EU funding banners: each is a link whose text (the image's alt) gives the banner's wording, the destination, the language and the file type and size, e.g. "… Project poster in English (PDF, 700 KB)"; opens in the same tab | 1.1.1, 2.4.4 | Pass |
| Text inside the EU, ΕΣΠΑ and programme logos is exempt from contrast requirements (logotypes) | 1.4.3 | n/a |
| No cookies, tracking, analytics or third-party requests — fonts are self-hosted | — | Confirmed (0 external requests) |

## 4. Funding-programme requirement: banner visible without scrolling

Not a WCAG criterion, but a condition of the villa's ESPA 2021-2027 grant: the publicity banner must
be on the home page, visible on arrival without scrolling, on any device. Measured in Chrome at eight
screen sizes; in every case both banners were fully inside the first screen and nothing scrolled sideways.

| Screen | Banner strip ends at | Share of first screen | Layout |
|---|---|---|---|
| Desktop 1440 × 900 | 65 px | 7% | side by side |
| Laptop 1366 × 657 (browser toolbars subtracted) | 65 px | 10% | side by side |
| Small laptop 1024 × 640 | 65 px | 10% | side by side |
| Tablet 820 × 1180 | 113 px | 10% | stacked |
| Phone 390 × 844 | 105 px | 12% | stacked |
| Phone 360 × 640 | 105 px | 16% | stacked |
| Phone 320 × 568 | 105 px | 18% | stacked |
| Phone held sideways 844 × 390 | 61 px | 16% | side by side |

## 5. Defects found and fixed during this audit

1. **"Stop animations" did not stop smooth scrolling.** The rule matched only descendants of
   `<html>`, but `scroll-behavior` is declared on the root itself.
2. **"High contrast" did not recolour the call-to-action.** A property that is mid-transition
   ignores a new custom-property value and keeps its old colour, so the button stayed on the normal
   accent. `js/main.js` now applies an option change with transitions suppressed for one frame.
   This raised the lowest contrast in High contrast mode from 5.08:1 to 12.9:1.
3. **Overlapping tap targets** on the statement page: baseline-aligned rows left each 44 px link
   overflowing into its neighbour, so the email and phone links crowded each other.
4. **The photo viewer's count was announced silently.** The live region was written before the
   dialog was shown, so the first announcement landed in an unrendered region.
5. **The call-to-action could overflow a narrow screen** under heavy text enlargement, because its
   side padding could not shrink.
6. **The menu and options panel could run off short screens once the funding strip was added**
   (24 September). They sized themselves to "screen height minus header", which no longer held with a
   strip above the header: on a phone held sideways the options panel's bottom fell about 50 px below
   the screen. They now measure where the header actually ends when they open.

## 6. Not covered by this assessment

- **No testing with a real screen reader** (NVDA, JAWS, VoiceOver, TalkBack) and no testing with
  users with disabilities. The markup follows the patterns those tools rely on, but a short NVDA or
  VoiceOver pass is recommended before the programme's audit.
- Windows High Contrast / forced-colours mode is provided for in the CSS but was not visually verified.
- **The two publicity posters (PDF)** opened by the funding banner were produced by the funding
  programme and were not audited. The English poster has structure tags; the Greek one has none. Only
  their document title and language were set. The accessibility statement lists this and offers the
  text in another format on request.
- Content accuracy (whether the marketing text matches the property) is outside the scope of WCAG.

## 7. How to re-run

1. Serve the folder locally: `python -m http.server 8137` and open <http://127.0.0.1:8137/>.
2. Run axe on both pages (the "axe DevTools" extension, or Lighthouse → Accessibility), and again
   with the options panel open, with "High contrast" on, with "Larger text" on, and with a gallery
   photo open. Ignore findings that point only at browser-extension elements.
3. Tab through each page from the address bar: every stop must be visible and in a sensible order.
4. Narrow the window to 320 px, then separately set text to 200%: no sideways scrolling either way.
5. Toggle each accessibility option twice and confirm the page returns exactly to its previous state.
