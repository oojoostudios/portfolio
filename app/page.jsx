import Link from 'next/link';
import { projects } from '@/content/projects';
import Figure from '@/components/Figure';

// Full-screen project panels. On wide screens each panel is sticky, so the next
// one slides up over it like a chapter; on phones they simply stack.
function Panel({ p, n }) {
  return (
    <section className="panel" style={{ '--p': p.color }} aria-labelledby={`panel-${p.slug}`}>
      <div className="panel-inner">
        <div className="panel-text">
          <p className="panel-kicker" data-reveal>
            <span>{String(n).padStart(2, '0')}</span>
            {p.tags.join(' · ')} · {p.year}
          </p>
          <h2 id={`panel-${p.slug}`} className="panel-title" data-reveal data-delay="80">{p.title}</h2>
          <p className="panel-summary" data-reveal data-delay="160">{p.cardSummary}</p>
          <p className="panel-proof" data-reveal data-delay="240">{p.proof}</p>
          <Link href={`/work/${p.slug}/`} className="panel-cta" data-reveal data-delay="320">
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </div>
        {/* Decorative duplicate of the text link; the image carries no unique information. */}
        <Link href={`/work/${p.slug}/`} className="panel-media" tabIndex={-1} aria-hidden="true">
          <Figure {...p.hero} caption={null} alt="" parallax="0.06" cover={p.title} />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const words = 'Product designer for complex financial workflows.'.split(' ');
  return (
    <>
      <section className="hero">
        <h1 aria-label="Product designer for complex financial workflows.">
          {words.map((w, i) => (
            <span key={i}>
              <span className="hero-word" aria-hidden="true" style={{ animationDelay: `${120 + i * 70}ms` }}>{w}</span>{' '}
            </span>
          ))}
        </h1>
        <p className="lede" data-reveal data-delay="500">
          After 15 years in institutional finance, I now design and build tools for complex workflows, from reconciliation
          and FX decisions to AI-assisted operations. I test prototypes with users and representative datasets.
        </p>
        <nav className="hero-project-index" aria-label="Projects" data-reveal data-delay="650">
          {projects.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}/`} style={{ '--p': p.color }}>
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="index-title">{p.title} <span className="index-arrow" aria-hidden="true">→</span></span>
              <span className="index-desc">{p.indexDesc}</span>
            </Link>
          ))}
        </nav>
      </section>
      <div id="work" className="panels">
        {projects.map((p, i) => <Panel key={p.slug} p={p} n={i + 1} />)}
      </div>
    </>
  );
}
