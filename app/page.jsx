import Link from 'next/link';
import { projects } from '@/content/projects';
import Figure from '@/components/Figure';

function Card({ p, n }) {
  return (
    <Link href={`/work/${p.slug}/`} className="card">
      <Figure {...p.hero} caption={null} />
      <div className="card-body">
        <p className="card-kicker">
          <span className="card-num">{String(n).padStart(2, '0')}</span>
          {p.tags.join(' · ')}
          <span className="card-year">{p.year}</span>
        </p>
        <h3>{p.title}</h3>
        <p>{p.cardSummary}</p>
        <p className="card-proof">{p.proof}</p>
        <p className="card-cta">Read case study →</p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Product designer for complex financial workflows.</h1>
        <p className="lede">
          Fifteen years in institutional finance, now designing and building tools for that work. I prototype in code to test
          with real data.
        </p>
      </section>
      <section aria-labelledby="work-h">
        <h2 id="work-h" className="section-label">Selected work</h2>
        <div className="cards">
          {projects.filter((p) => p.group === 'work').map((p) => <Card key={p.slug} p={p} n={projects.indexOf(p) + 1} />)}
        </div>
      </section>
      <section aria-labelledby="studio-h">
        <h2 id="studio-h" className="section-label">Studio · client work</h2>
        <div className="cards">
          {projects.filter((p) => p.group === 'studio').map((p) => <Card key={p.slug} p={p} n={projects.indexOf(p) + 1} />)}
        </div>
      </section>
    </>
  );
}
