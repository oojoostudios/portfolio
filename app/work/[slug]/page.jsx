import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import Figure from '@/components/Figure';
import LiveEmbed from '@/components/LiveEmbed';

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const p = getProject((await params).slug);
  return { title: `${p.title} — Lorraine Kim`, description: p.tagline };
}

const Quote = ({ q }) => (
  <blockquote className="quote">
    <p>“{q.text}”</p>
    <cite>{q.who}</cite>
  </blockquote>
);

// Five-beat layout. Each beat is a label + heading + ordered blocks; one visual grammar throughout.
function Beat({ beat, n }) {
  return (
    <section className="cs-section beat" id={`beat-${n}`}>
      <p className="cs-label"><span>{beat.label}</span></p>
      <div className="cs-body">
        <h2 data-reveal>{beat.heading}</h2>
        {beat.blocks.map((blk, i) => <Block key={i} blk={blk} index={beat.blocks.filter((x, j) => x.type === 'decision' && j <= i).length} />)}
      </div>
    </section>
  );
}

function Block({ blk, index }) {
  switch (blk.type) {
    case 'p': return <p data-reveal>{blk.text}</p>;
    case 'quote': return <Quote q={blk} />;
    case 'figure': return <div className="beat-wide"><Figure {...blk} /></div>;
    case 'embed': return <div className="beat-wide" data-reveal><LiveEmbed {...blk} /></div>;
    case 'list': return (
      <div data-reveal><h3 className="beat-h3">{blk.title}</h3><ul className="beat-list">{blk.items.map((t) => <li key={t}>{t}</li>)}</ul></div>
    );
    case 'cols': return (
      <div className="testing" data-reveal>
        <div><h3 className="beat-h3">What worked</h3><ul className="beat-list">{blk.worked.map((t) => <li key={t}>{t}</li>)}</ul></div>
        <div><h3 className="beat-h3">What broke</h3><ul className="beat-list">{blk.broke.map((t) => <li key={t}>{t}</li>)}</ul></div>
      </div>
    );
    case 'decision': return (
      <div className={blk.highlight ? 'bd bd-hl' : 'bd'} data-reveal>
        <span className="bd-num" aria-hidden="true">{String(index).padStart(2, '0')}</span>
        <div className="bd-body">
          <h3>{blk.title}</h3>
          <p className="bd-chose">{blk.chose}</p>
          {blk.instead && <p className="bd-instead"><span>Instead of</span> {blk.instead}</p>}
          <p className="bd-why">{blk.why}</p>
          {blk.compare && (
            <div className="compare">
              <h4>{blk.compare.heading}</h4>
              <div className="compare-grid">
                {blk.compare.items.map((c) => (
                  <div key={c.label} className="compare-item">
                    <span className="compare-label">{c.label}</span>
                    <p className="compare-text">“{c.text}”</p>
                    <p className="compare-note">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {blk.figure && <Figure {...blk.figure} />}
        </div>
      </div>
    );
    default: return null;
  }
}

export default async function CaseStudy({ params }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="cs" style={{ '--p': p.color }}>
      <div className="progress" aria-hidden="true"><span /></div>
      <header className="cs-head">
        <p className="cs-kicker" data-reveal>{p.tags ? p.tags.join(' · ') : p.status} · {p.year}</p>
        <h1 className="cs-title">{p.title}</h1>
        <p className="lede" data-reveal data-delay="150">{p.tagline}</p>
        {p.stage && <p className="cs-stage" data-reveal data-delay="200">{p.stage}</p>}
        <dl className="meta">
          {p.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="links">
          {p.links.map((l) => (
            <span key={l.label}>
              <a className="btn" href={l.href} target="_blank" rel="noopener">{l.label} ↗</a>
              {l.note && <span className="link-note">{l.note}</span>}
            </span>
          ))}
        </div>
      </header>

      <div className="cs-hero"><Figure {...p.hero} parallax="0.05" cover={p.title} priority /></div>

      {p.glance && (
        <section className="tldr glance" aria-label="Case study at a glance">
          <div data-reveal><h2>Problem</h2><p>{p.glance.problem}</p></div>
          <div data-reveal data-delay="90"><h2>What I made</h2><p>{p.glance.made}</p></div>
          <div data-reveal data-delay="180"><h2>What happened</h2><p>{p.glance.happened}</p></div>
        </section>
      )}



      {p.context && <p className="context">{p.context}</p>}

      {p.beats.map((bt, i) => <Beat key={bt.label} beat={bt} n={i + 1} />)}

      <nav className="next" aria-label="Next case study">
        <Link href={`/work/${next.slug}/`}>Next: {next.title} →</Link>
      </nav>
    </article>
  );
}
