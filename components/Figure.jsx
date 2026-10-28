import fs from 'node:fs';
import path from 'node:path';

// Images live at public/images/<file>.<ext>. If the file exists at build time
// it's shown; otherwise the frame shows the shot brief and the filename to use.
const EXTS = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

function findImage(file) {
  if (!file) return null;
  for (const ext of EXTS) {
    const rel = `images/${file}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return `/${rel}`;
  }
  return null;
}

export default function Figure({ caption, src, alt, brief, file }) {
  const image = src || findImage(file);
  return (
    <figure className="figure">
      {image ? (
        <img src={image} alt={alt || caption || brief || ''} loading="lazy" />
      ) : (
        <div className="figure-ph">
          <span className="figure-ph-label">Image needed</span>
          {brief && <span className="figure-ph-brief">{brief}</span>}
          {file && <code className="figure-ph-file">public/images/{file}.png</code>}
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
