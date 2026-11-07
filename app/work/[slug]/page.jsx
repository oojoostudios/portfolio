import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import Figure from '@/components/Figure';
import LiveEmbed from '@/components/LiveEmbed';
import Chart from '@/components/Chart';

// Process diagram: stages in a row, each tagged with the band it belongs to.
function Flow({ flow }) {
  // Consecutive stages in the same band share one bracket beneath the row.
  const groups = [];
  flow.stages.forEach((s, i) => {
    const g = groups[groups.length - 1];
    if (g && g.band === s.band) g.end = i + 1; else groups.push({ band: s.band, start: i + 1, end: i + 1 });
  });
  return (
    <figure className="figure flow" data-reveal>
      <div className="flow-grid" role="list" aria-label="Process stages">
        {flow.stages.map((s, i) => (
          <div key={s.label} className="flow-stage" data-band={s.band} role="listitem" style={{ gridColumn: i + 1, gridRow: 1 }}>
            <span className="flow-band">{flow.bands[s.band]}</span>
            <span className="flow-label">{s.label}</span>
            {i < flow.stages.length - 1 && <span className="flow-arrow" aria-hidden="true" />}
          </div>
        ))}
        {groups.map((g) => (
          <div key={g.band} className="flow-bracket" data-band={g.band} aria-hidden="true" style={{ gridColumn: `${g.start} / ${g.end + 1}` }}>{flow.bands[g.band]}</div>
        ))}
      </div>
      {flow.caption && <figcaption>{flow.caption}</figcaption>}
    </figure>
  );
}

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const p = getProject((await params).slug);
  return { title: `${p.title} — Lorraine Kim`, description: p.tagline };
}

const Quote = ({ q }) => (
  <blockquote className={q.size === 'display' ? 'quote quote-display' : 'quote'} data-reveal>
    <p>“{q.text}”</p>
    <cite>{q.who}</cite>
  </blockquote>
);

// Five-beat layout. Each beat is a label + heading + ordered blocks; one visual grammar throughout.
function Beat({ beat, n }) {
  return (
    <section className="cs-section beat" id={`beat-${n}`}>
      <p className="cs-label"><span className="cs-num" aria-hidden="true">{String(n).padStart(2, '0')}</span><span>{beat.label}</span></p>
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
    case 'figure': return <div className={`beat-wide fig-${blk.size || 'inline'}`}><Figure {...blk} /></div>;
    case 'chart': return <div className="beat-wide"><Chart {...blk} /></div>;
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
          {blk.flow && <Flow flow={blk.flow} />}
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
        <p className="cs-metaline" data-reveal data-delay="200">
          {p.meta.filter(([k]) => k !== 'Scope').map(([k, v]) => <span key={k}>{v.split(' · ')[0]}</span>)}
          {p.links.map((l) => (
            <span key={l.label}><a href={l.href} target="_blank" rel="noopener" title={l.note || undefined}><span className="ul">{l.label}</span> <span className="ext" aria-hidden="true">↗</span></a></span>
          ))}
        </p>
        {p.stage && <p className="cs-stageline" data-reveal data-delay="240">{p.stage}</p>}
      </header>

      <div className={`cs-hero hero-${p.hero.size || 'wide'}`}><Figure {...p.hero} size={p.hero.size || 'wide'} parallax={p.hero.size === 'bleed' ? '0.06' : undefined} cover={p.title} priority /></div>

      {p.glance && (
        <section className="standfirst" aria-label="Case study at a glance">
          <p data-reveal><strong>The problem</strong> {p.glance.problem}</p>
          <p data-reveal data-delay="90"><strong>What I made</strong> {p.glance.made}</p>
          <p data-reveal data-delay="180"><strong>What happened</strong> {p.glance.happened}</p>
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
