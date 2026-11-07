import fs from 'node:fs';
import path from 'node:path';

// Media lives at public/images/<file>.<ext>. A video (.mp4/.webm) plays as a silent
// loop with its caption as the textual equivalent; an image shows as-is. A figure whose
// file is missing is not rendered at all: the build's media check reports it instead.
// `brief` is an internal production note and is never rendered.
const EXTS = ['mp4', 'webm', 'png', 'jpg', 'jpeg', 'webp', 'gif'];

// Reads intrinsic size from the file header so the page can reserve space before the
// image loads (no layout shift). Covers PNG, JPEG, GIF and WebP (VP8, VP8L, VP8X).
function imageSize(abs) {
  try {
    const fd = fs.openSync(abs, 'r'); const buf = Buffer.alloc(64 * 1024);
    const n = fs.readSync(fd, buf, 0, buf.length, 0); fs.closeSync(fd); const b = buf.subarray(0, n);
    if (b.toString('ascii', 1, 4) === 'PNG') return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    if (b.toString('ascii', 0, 3) === 'GIF') return { w: b.readUInt16LE(6), h: b.readUInt16LE(8) };
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const type = b.toString('ascii', 12, 16);
      if (type === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
      if (type === 'VP8L') { const x = b.readUInt32LE(21); return { w: 1 + (x & 0x3fff), h: 1 + ((x >> 14) & 0x3fff) }; }
      if (type === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        if (b[i] !== 0xff) break; const marker = b[i + 1]; const len = b.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        i += 2 + len;
      }
    }
  } catch {}
  return null;
}

export function findMedia(file) {
  if (!file) return null;
  for (const ext of EXTS) {
    const rel = `images/${file}.${ext}`;
    const abs = path.join(process.cwd(), 'public', rel);
    if (fs.existsSync(abs)) {
      const video = ext === 'mp4' || ext === 'webm';
      return { src: `/${rel}`, video, size: video ? null : imageSize(abs) };
    }
  }
  return null;
}

// `size`: inline (body column, default), wide (across both columns), bleed (viewport width).
// `crop`: an aspect ratio such as '2 / 1' that the frame enforces with object-fit: cover.
export default function Figure({ caption, alt, file, parallax, cover, priority = false, mount = false, size = 'inline', crop }) {
  const media = findMedia(file);
  const cls = ['figure', mount ? 'mount' : '', `size-${size}`, crop ? 'cropped' : ''].filter(Boolean).join(' ');
  const frameStyle = crop ? { aspectRatio: crop } : undefined;
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
    <figure className={cls} data-reveal>
      <div className="figure-frame" style={frameStyle}>
        <div className="figure-drift" data-parallax={parallax || undefined}>
          {media.video ? (
            <video src={media.src} autoPlay muted loop playsInline preload="metadata" aria-label={description} />
          ) : (
            <img
              src={media.src}
              alt={description}
              width={media.size?.w}
              height={media.size?.h}
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
