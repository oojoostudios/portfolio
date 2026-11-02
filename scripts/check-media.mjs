// Build-time media check, run before every build (see package.json "prebuild").
// A missing project cover fails the build. Missing optional figures are listed as
// warnings; the site simply omits them until the files exist.
import fs from 'node:fs';
import path from 'node:path';
import { projects } from '../content/projects.js';

const EXTS = ['mp4', 'webm', 'png', 'jpg', 'jpeg', 'webp', 'gif'];
const exists = (file) => EXTS.some((ext) => fs.existsSync(path.join('public', 'images', `${file}.${ext}`)));

const missingRequired = [];
const missingOptional = [];
const present = [];

for (const p of projects) {
  (exists(p.hero?.file) ? present : missingRequired).push(`${p.slug}: ${p.hero?.file} (cover)`);
  const figs = [];
  for (const s of p.beats ? [] : p.sections || []) figs.push(s.figure, s.figure2, ...(s.items || []).map((d) => d?.figure));
  for (const bt of p.beats || []) for (const blk of bt.blocks) figs.push(blk.type === 'figure' ? blk : null, blk.figure);
  for (const fig of figs) if (fig?.file) (exists(fig.file) ? present : missingOptional).push(fig.file);
}

console.log(`Media check: ${present.length} present, ${missingOptional.length} optional missing, ${missingRequired.length} required missing.`);
if (missingOptional.length) {
  console.log('Optional figures not yet produced (omitted from the pages):');
  missingOptional.forEach((f) => console.log(`  - public/images/${f}.{webp,png,mp4}`));
}
if (missingRequired.length) {
  console.error('Required covers missing:');
  missingRequired.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
