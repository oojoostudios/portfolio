import Link from 'next/link';
import Brand from './Brand';

// Top bar after chriswelch.co: name and rotating line on the left, nav on the right.
export default function Header() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Primary">
        <Link href="/">Work</Link>
        <Link href="/about/">About</Link>
        <a href="/resume-lorraine-kim.pdf">Resume</a>
        <a href="mailto:lorraine.kim@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
