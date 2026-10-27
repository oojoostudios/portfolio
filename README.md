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
