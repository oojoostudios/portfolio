// Embeds the candidate's real, live work (not a re-creation). The iframe loads only when
// scrolled near. The open link is the reliable path: an external site can refuse embedding
// or block it on some mobile browsers, so the embed is always secondary to the link.
export default function LiveEmbed({ src, title, kind = 'site', ratio, href, hrefLabel }) {
  const label = hrefLabel || 'Open in a new tab';
  return (
    <div className={`embed embed-${kind}`}>
      <div className="embed-bar">
        <span className="embed-dot" aria-hidden="true" />
        <span className="embed-url">{href ? new URL(href).host : title}</span>
        {href && <a href={href} target="_blank" rel="noopener">{label} ↗</a>}
      </div>
      <div className="embed-frame" style={ratio ? { aspectRatio: ratio } : undefined}>
        <iframe src={src} title={title} loading="lazy" allow="fullscreen; clipboard-write" referrerPolicy="strict-origin-when-cross-origin" />
      </div>
      {href && (
        <p className="embed-fallback">
          If the interactive preview doesn’t load, <a href={href} target="_blank" rel="noopener">open the live project</a>.
        </p>
      )}
    </div>
  );
}
