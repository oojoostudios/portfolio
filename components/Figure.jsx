// Until a real image is added (`src`), the frame shows a shot brief: what to
// export from Figma for this spot.
export default function Figure({ caption, src, alt, brief }) {
  return (
    <figure className="figure">
      {src ? (
        <img src={src} alt={alt || caption} />
      ) : (
        <div className="figure-ph">
          <span className="figure-ph-label">Image needed</span>
          {brief && <span className="figure-ph-brief">{brief}</span>}
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
