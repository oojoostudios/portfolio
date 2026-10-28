import Link from 'next/link';
import { projects } from '@/content/projects';
import Figure from '@/components/Figure';

function Card({ p }) {
  return (
    <Link href={`/work/${p.slug}/`} className="card">
      <Figure {...p.hero} caption={null} />
      <div className="card-body">
        <div className="card-top">
          <h3>{p.title}</h3>
          <span className="pill">{p.status}</span>
        </div>
        <p className="card-tag">{p.tagline}</p>
        <p>{p.cardSummary}</p>
        <p className="card-meta">{p.meta.find(([k]) => k === 'Domain')[1]}</p>
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
          I spent fifteen years in institutional finance, in buy-side trading operations and supporting asset managers on
          Bloomberg’s order management system. Now I research, design and build tools for that kind of work, and I prototype
          in code so I can test with real data.
        </p>
      </section>
      <section aria-labelledby="work-h">
        <h2 id="work-h" className="section-label">Selected work</h2>
        <div className="cards">
          {projects.filter((p) => p.group === 'work').map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </section>
      <section aria-labelledby="studio-h">
        <h2 id="studio-h" className="section-label">Studio · client work</h2>
        <div className="cards">
          {projects.filter((p) => p.group === 'studio').map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </section>
    </>
  );
}
