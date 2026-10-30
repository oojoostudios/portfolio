import fs from 'node:fs';
import path from 'node:path';

// Media lives at public/images/<file>.<ext>. A video (.mp4/.webm) plays as a silent loop;
// an image shows as-is; if neither exists the frame shows the shot brief and filename.
const EXTS = ['mp4', 'webm', 'png', 'jpg', 'jpeg', 'webp', 'gif'];

function findMedia(file) {
  if (!file) return null;
  for (const ext of EXTS) {
    const rel = `images/${file}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return { src: `/${rel}`, video: ext === 'mp4' || ext === 'webm' };
  }
  return null;
}

export default function Figure({ caption, src, alt, brief, file, parallax }) {
  const media = src ? { src, video: /\.(mp4|webm)$/.test(src) } : findMedia(file);
  const label = alt || caption || brief || '';
  return (
    <figure className="figure" data-reveal>
      <div className="figure-frame">
        <div className="figure-drift" data-parallax={parallax || undefined}>
          {media?.video ? (
            <video src={media.src} autoPlay muted loop playsInline preload="metadata" aria-label={label} />
          ) : media ? (
            <img src={media.src} alt={label} loading="lazy" />
          ) : (
            <div className="figure-ph">
              <span className="figure-ph-label">Image needed</span>
              {brief && <span className="figure-ph-brief">{brief}</span>}
              {file && <code className="figure-ph-file">public/images/{file}.png or .mp4</code>}
            </div>
          )}
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
