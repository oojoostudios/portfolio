import Link from 'next/link';
import { projects } from '@/content/projects';
import Figure from '@/components/Figure';

// Homepage as a cover: one lead story at full grid width, then the other projects as a
// contents list. The lead is chosen by slug; the rest follow in content order.
const LEAD = 'reconlayer';

const Cta = ({ href }) => (
  <p className="cover-cta"><Link href={href}><span className="ul">Read the case study</span> <span aria-hidden="true">→</span></Link></p>
);

function Lead({ p, n }) {
  const href = `/work/${p.slug}/`;
  return (
    <section id="work" className="cover" style={{ '--p': p.color }} aria-labelledby={`cover-${p.slug}`}>
      <p className="cs-kicker"><span className="cs-num" aria-hidden="true">{String(n).padStart(2, '0')}</span>{p.tags.join(' · ')} · {p.year}</p>
      <h2 id={`cover-${p.slug}`} className="cover-title"><Link href={href}>{p.title}</Link></h2>
      <p className="cover-summary">{p.cardSummary}</p>
      <Cta href={href} />
      {/* Decorative duplicate of the title link; the image carries no unique information. */}
      <Link href={href} className="cover-media" tabIndex={-1} aria-hidden="true">
        <Figure file={p.hero.file} alt="" caption={null} crop="16 / 9" mount={!!p.hero.mount} priority />
      </Link>
      <p className="cover-proof">{p.proof}</p>
    </section>
  );
}

function Entry({ p, n }) {
  const href = `/work/${p.slug}/`;
  const img = p.card || p.hero; // a project may supply a tighter crop for the contents card
  return (
    <article className="entry" style={{ '--p': p.color }} aria-labelledby={`entry-${p.slug}`}>
      <Link href={href} className="entry-media" tabIndex={-1} aria-hidden="true">
        <Figure file={img.file} alt="" caption={null} crop="16 / 10" mount={!!img.mount} />
      </Link>
      <p className="cs-kicker"><span className="cs-num" aria-hidden="true">{String(n).padStart(2, '0')}</span>{p.tags.join(' · ')} · {p.year}</p>
      <h2 id={`entry-${p.slug}`} className="entry-title"><Link href={href}>{p.title}</Link></h2>
      <p className="entry-desc">{p.indexDesc}</p>
      <Cta href={href} />
    </article>
  );
}

export default function Home() {
  const words = 'Product designer for complex financial workflows.'.split(' ');
  const lead = projects.find((p) => p.slug === LEAD) || projects[0];
  const rest = projects.filter((p) => p !== lead);
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
        <p className="lede">
          After 15 years in institutional finance, I now design and build tools for complex workflows, from reconciliation
          and FX decisions to AI-assisted operations. I test prototypes with users and representative datasets.
        </p>
      </section>
      <Lead p={lead} n={1} />
      <section className="contents" aria-label="More work">
        {rest.map((p, i) => <Entry key={p.slug} p={p} n={i + 2} />)}
      </section>
    </>
  );
}
