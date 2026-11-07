# Asset list

Every slot below is already wired into the case-study pages. A figure renders the moment its file
exists at the path shown; until then the page skips it. Captions and alt text are already written
and shown here so the asset matches what the page will say under it. Nothing in any asset may be
invented: no made-up numbers, quotes, screens or data. Where a slot asks for synthetic data, the
asset must say so inside the image.

Accepted formats: `.webp` or `.png` for stills, `.mp4` (plus optional `.webm`) for clips.
Export stills at 2x: 1600×900 or larger for landscape, 1200 wide or larger for tall crops.
Send raw `.mov` screen recordings as they come out of QuickTime; I trim, scale and compress.

Priority: the three clips and the figures marked **first** carry the most weight for a reviewer.
Everything else can come later.

---

## Screen recordings (3)

Desktop browser window about 1600×1000, bookmarks bar hidden, slow deliberate actions, 8 to 15
seconds, no audio. Start and end on a similar frame so the loop seam is soft.

### fxpress/02-live-widget  **first**
`public/images/fxpress/02-live-widget.mp4`
- **Where:** FXpress, Proof beat, replaces the static hero crop position above the iframe.
- **Show:** the live widget at fxpress.netlify.app centred on its tinted background. Change the
  amount, switch the currency once, let Fexi's sentence and the range label update, hover
  Save Target Rate. Do not click Send Now.
- **Must be true:** the real deployed widget with live rates. No staged data.

### reconlayer/03-run  **first**
`public/images/reconlayer/03-run.mp4`
- **Where:** ReconLayer, Proof beat, above the Loom embed.
- **Show:** the Google Sheets workbook with the add-on sidebar open. Click Reconcile, let the sidebar
  fill with the value breaks and population breaks, click Draft dispute email, let the draft appear.
  Stop there. No send-like action exists and none should be implied.
- **Must be true:** the real add-on on the synthetic workbook. The sidebar's "MTA" label and the
  $50,000 threshold are fine; the page text explains them.

### hwang-yoo-yup/02-archive-toggle  **first**
`public/images/hwang-yoo-yup/02-archive-toggle.mp4`
- **Where:** Hwang Yoo-Yup, Proof beat, above the Framer embed.
- **Show:** the live site at hwangyooyup.framer.website. Scroll the Discovery homepage a little, click
  Archive Mode, land on the structured record, pause on it.
- **Must be true:** the live site as visitors see it.

---

## FXpress stills (6)

### fxpress/01-rate-range-chart  **first**
`public/images/fxpress/01-rate-range-chart.webp` · 1600×900
- **Where:** Context beat, after the paragraph about the day mattering.
- **What it is:** a bar or range chart of monthly high and low USD/KRW reference rates, one bar per
  month, September 2025 to September 2026. Source: Frankfurter (ECB reference rates), with the
  date-stamped monthly highs and lows you pulled for the 3.7% figure.
- **Caption on page:** "Monthly high-to-low USD/KRW reference-rate ranges, Sep 2025 to Sep 2026.
  Reference rates, not executable transfer quotes."
- **Avoid:** smoothing, projections, any arrow or trend line implying direction.

### fxpress/02-advice-before-after
`public/images/fxpress/02-advice-before-after.webp` · landscape, two phones side by side
- **Where:** Decision 01, "Describe the rate instead of advising".
- **What it is:** left, the earlier high-fidelity Figma concept where the assistant recommended when
  to send; right, the live widget's neutral rate sentence. Same amount and currency in both if possible.
- **Caption on page:** "The assistant shifted from suggesting decisions to explaining recent
  exchange-rate context. Left: earlier high-fidelity concept. Right: live widget."
- **Avoid:** retouching either screen. The left one should look like the concept actually looked.

### fxpress/03-fexi-states
`public/images/fxpress/03-fexi-states.webp` · landscape grid of cards
- **Where:** Decision 04, "Keep the interpretation in code".
- **What it is:** one card per Fexi state, each with the condition that triggers it and the exact
  sentence the assistant is allowed to say. Source: the FexiCard component set in Figma
  (node 5628:12733). Confirm against the shipped code which states exist; show only those.
- **Caption on page:** "Fexi's states and what each is allowed to say. The assessment is computed in
  code; the assistant only phrases it."

### fxpress/00-earlier-prototype  ✓ already in place

### fxpress/04-buttons-before-after
`public/images/fxpress/04-buttons-before-after.webp` · landscape, two crops
- **Where:** Testing beat, after the What worked / What broke columns.
- **What it is:** tight crops of the action area only. Left: equal-weight Send Now and Set Trigger
  for Best Rate buttons with the bare "1,380" threshold field. Right: the shipped filled primary
  button, outlined Save Target Rate, and the threshold labelled KRW per USD with its help text.
- **Caption on page:** "Testing exposed ambiguous button priority and a threshold with no currency.
  The revised hierarchy and labels addressed both; the revision has not been re-tested with users."

### fxpress/05-range-reading-charts
`public/images/fxpress/05-range-reading-charts.webp` · 1600×900, two charts stacked and aligned on the same time axis
- **Where:** Limits beat.
- **What it is:** top, the USD/KRW reference rate July to September 2026. Bottom, the widget's
  range label per reading over the same period, showing "low" for 68 of 75 readings. Source: your
  production logs and the same reference-rate data.
- **Caption on page:** "Observed rate direction versus the widget's rolling range labels, Jul to
  Sep 2026. This informed the next design hypothesis; a trend indicator has not shipped."
- **Avoid:** adding the trend indicator that hasn't shipped.

---

## ReconLayer stills (5)

### reconlayer/01-manual-workbook
`public/images/reconlayer/01-manual-workbook.webp` · landscape
- **Where:** Context beat.
- **What it is:** a spreadsheet built from synthetic records showing how this is done by hand:
  VLOOKUP formulas visible in the formula bar or a column, #N/A cells where a record is missing, and
  hand-typed DISPUTE flags. Label inside the image: ILLUSTRATIVE WORKBOOK · SYNTHETIC DATA.
- **Caption on page:** "Illustrative manual reconciliation sheet, built from synthetic records,
  showing why lookups, unmatched records and hand-entered flags need repeated analyst checks."

### reconlayer/03-break-rows
`public/images/reconlayer/03-break-rows.webp` · landscape, two cards
- **Where:** Decision 02, "Make missing records visible before ranking differences".
- **What it is:** two exception cards from the real sidebar: a value break (both sides have a figure,
  they differ) beside a population break (trade in the broker file only). Synthetic values.
- **Caption on page:** "A missing-record exception needs a different label and review path from a
  valuation difference. Example trade values are synthetic."

### reconlayer/02-ai-boundary-diagram  **first**
`public/images/reconlayer/02-ai-boundary-diagram.webp` · 1600×900
- **Where:** Decision 03, "Keep reconciliation rules separate from AI-generated writing".
- **What it is:** a five-stage flow: internal and broker files → reconciliation rules → reviewable
  exceptions → AI-generated draft → analyst review. The first three sit in a band labelled
  deterministic; only the draft sits in a band labelled AI; analyst review sits outside the tool.
- **Caption on page:** "The model can propose wording but cannot change a reconciliation
  classification or send a dispute."
- **Avoid:** a Send step. The product has none.

### reconlayer/04-sidebar-worklist  **first**
`public/images/reconlayer/04-sidebar-worklist.webp` · tall crop, 1200 wide or more
- **Where:** Proof beat, directly after the paragraph that gives the result.
- **What it is:** a clean capture of the real sidebar after a run: the $327,500 net value dispute,
  four value-break rows, two population-break rows with the missing side stated, and the Draft
  dispute email button. Must match the numbers in the page text.
- **Caption on page:** "Reconciled synthetic trade records grouped for review. The net value
  discrepancy is shown separately from unmatched records."

### reconlayer/05-email-draft
`public/images/reconlayer/05-email-draft.webp` · landscape
- **Where:** Proof beat, after the Loom embed.
- **What it is:** a real email the version-3 prompt generated: subject line, break ID with internal
  and broker figures, request for confirmation. Three small annotations: fixed data fields, no
  invented causes, human sign-off outside the tool.
- **Caption on page:** "An AI-assisted dispute draft generated from classified synthetic breaks. The
  analyst remains responsible for verifying and sending it."
- **Avoid:** editing the generated text. If the output has a flaw, that is the honest asset.

---

## Hwang Yoo-Yup stills (4)

### hwang-yoo-yup/01-painting
`public/images/hwang-yoo-yup/01-painting.webp` · as the reproduction allows
- **Where:** Context beat.
- **What it is:** Hwang Yoo-Yup, Home Return Way, 1979, oil on canvas. Authorized reproduction only.
  Confirm title, year, medium, dimensions and credit line with the estate before use.
- **Caption on page:** "Hwang Yoo-Yup · Home Return Way, 1979 · oil on canvas · private collection."

### hwang-yoo-yup/02-navigation  **first**
`public/images/hwang-yoo-yup/02-navigation.webp` · landscape, two captures stacked
- **Where:** Decision 01, "One site with two paths".
- **What it is:** the same page captured twice from the live site: Discovery nav showing Overview,
  Journey, Motifs, Exhibition Plan; Archive Mode nav showing Biography, Works, Bibliography,
  Exhibitions, Timeline.
- **Caption on page:** "The same site offers narrative discovery and structured archive navigation
  without duplicating content."

### hwang-yoo-yup/03-artwork-page
`public/images/hwang-yoo-yup/03-artwork-page.webp` · landscape
- **Where:** Decision 03, "Everything about a work on one page".
- **What it is:** a live artwork page with three callouts: the artwork image, the structured metadata
  block, the expandable historical-context section.
- **Caption on page:** "Art-first presentation with structured metadata and optional historical
  context, preserving both research paths."

### hwang-yoo-yup/04-palette-type
`public/images/hwang-yoo-yup/04-palette-type.webp` · landscape
- **Where:** Decision 04, "A quiet visual system".
- **What it is:** the site's palette swatches with hex values (burgundy, off-white, earth tones taken
  from the paintings) and a Korean and English heading pair set at equal size and weight.
- **Caption on page:** "A restrained visual language informed by the paintings, using bilingual type
  with equivalent hierarchy."

---

## Checklist (updated 7 Nov)

Built in the site itself, no asset needed any more: the rate-range chart, the Jul to Sep rate chart,
the AI boundary diagram. Dropped as low-information: fxpress/04-buttons-before-after,
reconlayer/03-break-rows, hwang-yoo-yup/04-palette-type.

| # | File | Status |
|---|---|---|
| 1 | fxpress/02-live-widget.mp4 | placed |
| 2 | reconlayer/03-run.mp4 | placed |
| 3 | hwang-yoo-yup/02-archive-toggle.mp4 | placed, re-recorded with the Archive Mode click |
| 4 | fxpress/02-advice-before-after | placed |
| 5 | fxpress/03-fexi-states | placed, re-tiled 4×2 |
| 6 | reconlayer/01-manual-workbook | placed, cropped to the grid |
| 7 | reconlayer/04-sidebar-worklist | placed, split into two columns |
| 8 | reconlayer/05-email-draft | placed at 2x, split into two columns |
| 9 | hwang-yoo-yup/01-painting | placed; confirm credit line with the estate |
| 10 | hwang-yoo-yup/02-navigation | placed |
| 11 | hwang-yoo-yup/03-artwork-page | placed |
| 12 | hwang-yoo-yup/04-exhibition-plan | placed, a frame from the first recording |
| 13 | FXpress event log (CSV) | received; drives the readings strip under the rate chart |

`npm run build` prints which of these are still missing.
