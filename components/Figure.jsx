import fs from 'node:fs';
import path from 'node:path';

// Media lives at public/images/<file>.<ext>. A video (.mp4/.webm) plays as a silent
// loop with its caption as the textual equivalent; an image shows as-is. A figure whose
// file is missing is not rendered at all: the build's media check reports it instead.
// `brief` is an internal production note and is never rendered.
const EXTS = ['mp4', 'webm', 'png', 'jpg', 'jpeg', 'webp', 'gif'];

export function findMedia(file) {
  if (!file) return null;
  for (const ext of EXTS) {
    const rel = `images/${file}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return { src: `/${rel}`, video: ext === 'mp4' || ext === 'webm' };
  }
  return null;
}

export default function Figure({ caption, alt, file, parallax, cover, priority = false }) {
  const media = findMedia(file);
  if (!media) {
    if (!cover) return null;
    // A project with no cover yet gets a title card rather than an empty frame.
    return (
      <figure className="figure" data-reveal>
        <div className="figure-frame"><div className="figure-cover" aria-hidden="true"><span>{cover}</span></div></div>
      </figure>
    );
  }
  const description = alt || caption || '';
  return (
    <figure className="figure" data-reveal>
      <div className="figure-frame">
        <div className="figure-drift" data-parallax={parallax || undefined}>
          {media.video ? (
            <video src={media.src} autoPlay muted loop playsInline preload="metadata" aria-label={description} />
          ) : (
            <img
              src={media.src}
              alt={description}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              decoding="async"
            />
          )}
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
