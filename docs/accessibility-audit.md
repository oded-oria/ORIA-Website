# Accessibility audit — www.orialefkada.gr

| | |
|---|---|
| **Date** | 19 September 2026 |
| **Standard** | WCAG 2.1 level AA (WCAG 2.2 AA rules also run) |
| **Scope** | `index.html`, `accessibility.html` |
| **Type** | Self-assessment: automated testing + manual checks (see "Not covered" below) |
| **Result** | No failures found |

## 1. Automated testing

Tool: **axe-core 4.10.2**, rule sets `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`,
run in Chrome at 1920 px wide with all lazy-loaded images forced to load.

| Page / state | Violations | Needs review | Rules passed |
|---|---|---|---|
| Home — default | 0 | 0 | 43 |
| Home — Accessibility options panel open | 0 | 0 | 43 |
| Home — "High contrast" option on | 0 | 0 | 43 |
| Home — photo viewer (dialog) open | 0 | 0 | 18 |
| Accessibility statement | 0 | 0 | 38 |

## 2. Manual checks

| Check | WCAG | Result |
|---|---|---|
| All images have accurate text alternatives; icons hidden from assistive tech | 1.1.1 | Pass |
| One `h1` per page, headings in order, landmarks: header / nav / main / footer | 1.3.1, 2.4.6 | Pass |
| DOM order matches visual order (tab order: skip link → logo → menu → accessibility → content) | 1.3.2, 2.4.3 | Pass |
| Colour contrast — every text pair computed, lowest is 6.5:1 (required 4.5:1); control borders 15:1 (required 3:1) | 1.4.3, 1.4.11 | Pass |
| No text placed over photographs | 1.4.3 | Pass |
| Text-only enlargement to 200% at 1280 px: nothing clipped, no horizontal scroll | 1.4.4 | Pass |
| Reflow at 320 px and 390 px, also with "Larger text" on: no horizontal scroll | 1.4.10 | Pass |
| Links in running text are underlined (not colour alone) | 1.4.1 | Pass |
| Everything operable by keyboard; no keyboard trap; Escape closes menu, panel and photo viewer and returns focus | 2.1.1, 2.1.2 | Pass |
| "Skip to main content" link is the first focusable element | 2.4.1 | Pass |
| Descriptive page titles; link purpose clear from link text ("View larger photo: …") | 2.4.2, 2.4.4 | Pass |
| Visible 3 px focus outline on every interactive element, 8.5:1 against the page | 2.4.7 | Pass |
| Sticky header cannot hide the focused element (scroll-padding tracks real header height) | 2.4.11 | Pass |
| All pointer targets ≥ 44 × 44 CSS px (required 24 × 24) | 2.5.8 | Pass |
| Animation limited to short hover/opacity transitions; disabled under `prefers-reduced-motion` and by the "Stop animations" option; nothing flashes or auto-plays | 2.2.2, 2.3.1 | Pass |
| `lang="en"` on pages; Greek registration label marked `lang="el"` | 3.1.1, 3.1.2 | Pass |
| Navigation identical and in the same order on both pages | 3.2.3 | Pass |
| Menu and panel buttons expose `aria-expanded`/`aria-controls`; option buttons expose `aria-pressed`; photo viewer is a native modal `<dialog>` with an accessible name and a polite live region for "Image n of 11" | 4.1.2, 4.1.3 | Pass |
| Works without JavaScript: menu stays open, gallery tiles link to the full photos | — | Pass |
| No cookies, tracking, third-party scripts, fonts or embeds | — | Confirmed |

## 3. Not covered by this assessment

- **No testing with a real screen reader** (NVDA, JAWS, VoiceOver, TalkBack) or by users with disabilities.
  The markup follows the patterns those tools rely on, but a short NVDA + VoiceOver pass is recommended
  before the programme's audit.
- Windows High Contrast / forced-colours mode was provided for in the CSS but not visually verified.
- Content accuracy (whether the marketing text matches the property) is outside the scope of WCAG.

## 4. How to re-run

1. Serve the folder locally: `python -m http.server 8137` and open <http://127.0.0.1:8137/>.
2. Run axe (browser extension "axe DevTools", or Lighthouse → Accessibility) on both pages, and again with
   the Accessibility panel open, with "High contrast" on, and with a gallery photo open.
3. Tab through each page from the address bar: every stop must be visible and in a sensible order.
4. Narrow the window to 320 px and zoom text to 200%: no sideways scrolling, nothing cut off.
