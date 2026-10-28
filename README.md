# lorrainekim.com

Static Next.js site (`output: 'export'`), deployed on Vercel.

- Content: `content/projects.js` (all case-study text) and `app/about/page.jsx`
- Images: put files in `public/images/` and add `src: '/images/…'` to the matching `figure`
- Placeholders: anything still needed renders as an amber `TODO` box — search `todo` in `content/`
- Animated mark (top left): `components/Mark.jsx` — placeholder until the reference is confirmed

## Run locally
npm install && npm run dev

## Deploy
Import the GitHub repo at vercel.com/new (framework: Next.js, no settings to change).
Point lorrainekim.com at Vercel under Project → Settings → Domains when ready.

## Adding images
Each image spot has a fixed filename, shown in its placeholder. Save the file as
`public/images/<project>/<name>.png` (or .jpg / .webp / .gif) and redeploy; the
placeholder is replaced automatically. Aim for ~2400px wide, under 500 KB.

| File | What goes there |
|---|---|
| fxpress/hero | Live widget screenshot in a phone frame |
| fxpress/01-rate-range-chart | USD/KRW monthly high–low bar chart |
| fxpress/02-advice-before-after | Early hi-fi that advised vs live description |
| fxpress/03-fexi-states | Fexi state sheet (Figma FexiCard set, node 5628:12733), annotated |
| fxpress/04-buttons-before-after | Button hierarchy + threshold field, before/after testing |
| fxpress/05-range-reading-charts | USD/KRW falling Jul–Sep + range pinned to "low" |
| reconlayer/hero | Sidebar open in Sheets: +$327,500, 4 value + 2 population breaks |
| reconlayer/01-manual-workbook | The "before" spreadsheet (VLOOKUPs, #N/A, DISPUTE) |
| reconlayer/02-ai-boundary-diagram | Two files → Rules → Breaks → AI draft → Human |
| reconlayer/03-break-rows | Annotated population-break row vs value-break row |
| reconlayer/04-sidebar-worklist | Close-up of the grouped worklist |
| reconlayer/05-email-draft | One generated dispute email |
| hwang-yoo-yup/hero | Archive home page with the Discovery / Archive toggle |
| hwang-yoo-yup/01-painting | Home Return Way, 1979 |
| hwang-yoo-yup/02-navigation | Discovery nav vs Archive Mode nav |
| hwang-yoo-yup/03-artwork-page | Annotated artwork page |
| hwang-yoo-yup/04-palette-type | Palette and type board |
