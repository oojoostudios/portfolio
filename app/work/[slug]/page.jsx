import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import Figure from '@/components/Figure';
import Todo from '@/components/Todo';

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
    <section className="cs-section">
      <p className="eyebrow">{s.eyebrow}</p>
      <h2>{s.heading}</h2>

      {s.kind === 'text' && s.body.map((b, i) => <p key={i}>{b}</p>)}
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
            <li key={d.title} className={d.highlight ? 'decision hl' : 'decision'}>
              <h3><span className="num">{String(i + 1).padStart(2, '0')}</span>{d.title}</h3>
              <dl>
                {d.considered && <><dt>Considered</dt><dd>{d.considered}</dd></>}
                <dt>Chose</dt><dd>{d.chose}</dd>
                <dt>Why</dt><dd>{d.why}</dd>
              </dl>
              {d.figure && <Figure {...d.figure} />}
            </li>
          ))}
        </ol>
      )}

      {s.kind === 'testing' && (
        <>
          <p>{s.intro}</p>
          {s.introTodo && <Todo>{s.introTodo}</Todo>}
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
        </>
      )}

      {s.figure && <Figure {...s.figure} />}
      {s.todo && <Todo>{s.todo}</Todo>}
    </section>
  );
}

export default async function CaseStudy({ params }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const { tldr } = p;

  return (
    <article className="cs">
      <header className="cs-head">
        <p className="eyebrow">{p.status}</p>
        <h1>{p.title}</h1>
        <p className="lede">{p.tagline}</p>
        <dl className="meta">
          {p.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="links">
          {p.links.map((l) => (
            <span key={l.label}>
              <a className="btn" href={l.href}>{l.label} ↗</a>
              {l.note && <span className="link-note">{l.note}</span>}
              {l.todo && <Todo inline>{l.todo}</Todo>}
            </span>
          ))}
        </div>
      </header>

      <Figure {...p.hero} />

      <section className="tldr" aria-label="Summary">
        <div><h2>Problem</h2><p>{tldr.problem}</p></div>
        <div><h2>Decision</h2><p>{tldr.decision}</p></div>
        <div><h2>Rejected</h2><p>{tldr.rejected}</p></div>
        <div>
          <h2>Result</h2>
          <ul>{tldr.result.map((r, i) => <li key={i}>{typeof r === 'string' ? r : <Todo inline>{r.todo}</Todo>}</li>)}</ul>
        </div>
      </section>

      {p.context && <p className="context">{p.context}</p>}

      {p.sections.map((s) => <Section key={s.heading} s={s} />)}

      <nav className="next" aria-label="Next case study">
        <Link href={`/work/${next.slug}/`}>Next: {next.title} →</Link>
      </nav>
    </article>
  );
}
