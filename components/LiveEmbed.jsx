// Embeds the candidate's real, live work (not a re-creation). Loads only when scrolled near,
// so the live product isn't called for visitors who never reach this section.
export default function LiveEmbed({ src, title, kind = 'site', ratio, href, hrefLabel }) {
  return (
    <div className={`embed embed-${kind}`}>
      <div className="embed-bar">
        <span className="embed-dot" aria-hidden="true" />
        <span className="embed-url">{href ? new URL(href).host : title}</span>
        {href && <a href={href} target="_blank" rel="noopener">{hrefLabel || 'Open in a new tab'} ↗</a>}
      </div>
      <div className="embed-frame" style={ratio ? { aspectRatio: ratio } : undefined}>
        <iframe src={src} title={title} loading="lazy" allow="fullscreen; clipboard-write" referrerPolicy="strict-origin-when-cross-origin" />
      </div>
    </div>
  );
}
