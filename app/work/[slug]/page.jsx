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

function Section({ s }) {
  return (
    <section className={`cs-section cs-${s.kind}`}>
      <p className="cs-label"><span>{s.eyebrow}</span></p>
      <div className="cs-body">
      <h2 data-reveal>{s.heading}</h2>

      {s.kind === 'text' && s.body.map((b, i) => <p key={i} data-reveal data-delay={60 + i * 60}>{b}</p>)}
      {s.kind === 'embed' && <p data-reveal>{s.intro}</p>}
      {s.quote && s.kind === 'text' && <Quote q={s.quote} />}

      {s.kind === 'principles' && (
        <ol className="principles">
          {s.items.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}
        </ol>
      )}

      {s.kind === 'options' && (
        <table className="options">
          <thead><tr><th scope="col">Option</th><th scope="col">Verdict</th><th scope="col">Why</th></tr></thead>
          <tbody>
            {s.items.map(([opt, verdict, why]) => (
              <tr key={opt} className={verdict === 'Chosen' ? 'chosen' : undefined}>
                <th scope="row">{opt}</th><td>{verdict}</td><td>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {s.kind === 'iterations' && (
        <>
          <ol className="iterations">
            {s.items.map((it) => (
              <li key={it.label}>
                <h3>{it.label}</h3>
                <pre><code>{it.text}</code></pre>
                <p>{it.outcome}</p>
              </li>
            ))}
          </ol>
          {s.after && <ul>{s.after.map((a) => <li key={a}>{a}</li>)}</ul>}
        </>
      )}

      {s.kind === 'decisions' && (
        <ol className="decisions">
          {s.items.map((d, i) => (
            <li key={d.title} className={d.highlight ? 'decision hl' : 'decision'} data-reveal>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{d.title}</h3>
                {d.considered && <p className="instead"><span>Instead of</span> {d.considered}</p>}
                <p className="chose">{d.chose}</p>
                <p className="why">{d.why}</p>
              </div>
              {d.figure && <Figure {...d.figure} />}
            </li>
          ))}
        </ol>
      )}

      {s.kind === 'testing' && (
        <>
          <p>{s.intro}</p>
          <div className="testing">
            {s.worked && (
              <div><h3>What worked</h3><ul>{s.worked.map((w) => <li key={w}>{w}</li>)}</ul></div>
            )}
            <div><h3>What broke</h3><ul>{s.broke.map((w) => <li key={w}>{w}</li>)}</ul></div>
          </div>
          {s.quote && <Quote q={s.quote} />}
          {s.changes && (
            <><h3>What I changed before launch</h3><ul>{s.changes.map((c) => <li key={c}>{c}</li>)}</ul></>
          )}
          {typeof s.after === 'string' && <p>{s.after}</p>}
        </>
      )}
      </div>
      {s.figure && <div className="cs-wide"><Figure {...s.figure} /></div>}
      {s.figure2 && <div className="cs-wide"><Figure {...s.figure2} /></div>}
      {s.kind === 'embed' && <div className="cs-wide" data-reveal data-delay="100"><LiveEmbed {...s.embed} /></div>}
    </section>
  );
}

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
  const { tldr } = p;

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

      {!p.beats && p.stats && (
        <dl className="stats" aria-label="Key figures">
          {p.stats.map(([n, label], i) => <div key={label} data-reveal data-delay={i * 90}><dt>{label}</dt><dd>{n}</dd></div>)}
        </dl>
      )}

      {!p.beats && tldr && (
      <section className="tldr" aria-label="Case study at a glance">
        <div data-reveal><h2>Problem</h2><p>{tldr.problem}</p></div>
        <div data-reveal data-delay="90"><h2>Decision</h2><p>{tldr.decision}</p></div>
        <div data-reveal data-delay="180">
          <h2>Evidence</h2>
          <ul>{(tldr.result || []).slice(0, 2).map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      </section>
      )}

      {p.context && <p className="context">{p.context}</p>}

      {p.beats
        ? p.beats.map((bt, i) => <Beat key={bt.label} beat={bt} n={i + 1} />)
        : p.sections.map((s) => <Section key={s.heading} s={s} />)}

      <nav className="next" aria-label="Next case study">
        <Link href={`/work/${next.slug}/`}>Next: {next.title} →</Link>
      </nav>
    </article>
  );
}
