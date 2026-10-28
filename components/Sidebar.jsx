import Link from 'next/link';
import Tagline from './Tagline';
import { projects } from '@/content/projects';

export default function Sidebar() {
  const work = projects.filter((p) => p.group === 'work');
  const studio = projects.filter((p) => p.group === 'studio');
  return (
    <header className="sidebar">
      <div className="brand">
        <Link href="/">Lorraine Kim</Link> <Tagline />
      </div>
      <nav aria-label="Primary">
        <p className="nav-label">Work</p>
        <ul>
          {work.map((p) => (
            <li key={p.slug}><Link href={`/work/${p.slug}/`}>{p.title}</Link></li>
          ))}
        </ul>
        <p className="nav-label">Studio</p>
        <ul>
          {studio.map((p) => (
            <li key={p.slug}><Link href={`/work/${p.slug}/`}>Hwang Yoo-Yup</Link></li>
          ))}
        </ul>
        <p className="nav-label">About</p>
        <ul>
          <li><Link href="/about/">About me</Link></li>
          <li><a href="mailto:lorraine.kim@gmail.com">Email</a></li>
          <li><a href="/resume-lorraine-kim.pdf">Resume</a></li>
          <li><a href="https://www.linkedin.com/in/lorrkim" rel="noopener">LinkedIn</a></li>
        </ul>
      </nav>
      <p className="availability"><span className="dot" aria-hidden="true" />Open to full-time &amp; contract · Bay Area / NYC</p>
    </header>
  );
}
