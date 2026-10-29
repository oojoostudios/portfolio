import Link from 'next/link';
import Tagline from './Tagline';

// Top bar after chriswelch.co: name and rotating line on the left, nav on the right.
export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <Link href="/" className="brand-home" aria-label="Lorraine Kim, home">
          <img src="/images/logo.png" alt="" className="logo" width="32" height="32" />
          <span>Lorraine Kim</span>
        </Link>{' '}
        <Tagline />
      </div>
      <nav aria-label="Primary">
        <Link href="/">Work</Link>
        <Link href="/about/">About</Link>
        <a href="/resume-lorraine-kim.pdf">Resume</a>
        <a href="mailto:lorraine.kim@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
