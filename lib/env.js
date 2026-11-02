// True on the public site. Vercel sets VERCEL_ENV=production for the main branch;
// preview branches and local builds keep showing placeholders and TODOs for review.
export const isPublic = process.env.VERCEL_ENV === 'production' || process.env.PUBLIC_BUILD === '1';
