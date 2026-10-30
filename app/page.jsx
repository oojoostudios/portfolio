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
          <dl className="panel-stats" data-reveal data-delay="240">
            {p.stats.slice(0, 2).map(([num, label]) => (
              <div key={label}><dd data-count>{num}</dd><dt>{label}</dt></div>
            ))}
          </dl>
          <Link href={`/work/${p.slug}/`} className="panel-cta" data-reveal data-delay="320">
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link href={`/work/${p.slug}/`} className="panel-media" tabIndex={-1} aria-hidden="true">
          <Figure {...p.hero} caption={null} parallax="0.06" />
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
          Fifteen years in institutional finance, now designing and building tools for that work. I prototype in code to test
          with real data.
        </p>
        <a href="#work" className="hero-scroll" data-reveal data-delay="700">
          Three projects <span aria-hidden="true">↓</span>
        </a>
      </section>
      <div id="work" className="panels">
        {projects.map((p, i) => <Panel key={p.slug} p={p} n={i + 1} />)}
      </div>
    </>
  );
}
