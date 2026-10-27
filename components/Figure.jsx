// Swap `src` in once real assets arrive; until then it renders a labelled frame.
export default function Figure({ caption, src, alt }) {
  return (
    <figure className="figure">
      {src ? <img src={src} alt={alt || caption} /> : <div className="figure-ph" aria-hidden="true">Image pending</div>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
