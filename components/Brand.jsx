'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Tagline from './Tagline';

// Home shows finance and UX lines, About shows personal ones, case studies show the name alone.
const HOME_LINES = [
  'knows where trades break between execution and settlement',
  'can tell a population break from a value break at a glance',
  'has reconciled futures, FX, swaps and JGBs on one platform',
  'will notice if your reconciliation is off by a cent',
  'makes sure the AI never does the math',
  'prototypes in code and tests with live exchange rates',
];

const ABOUT_LINES = [
  'hosts GoStop Club, a Korean card-game night',
  'makes art about family, culture and history',
  'is learning to cook Korean dishes from family recipes',
  'spends weekends gallery hopping',
  'is always looking for new music',
  'is very good at Where’s Waldo',
];

export default function Brand() {
  const path = usePathname() || '/';
  const lines = path === '/' ? HOME_LINES : path.startsWith('/about') ? ABOUT_LINES : null;
  return (
    <div className={lines ? 'brand' : 'brand brand--solo'}>
      {/* The logo repeats the name link, so it stays out of the tab order; the name is the home link. */}
      <Link href="/" className="brand-logo" tabIndex={-1} aria-hidden="true">
        <img src="/images/logo.png" alt="" className="logo" width="60" height="60" />
      </Link>
      <Link href="/" className="brand-home">Lorraine Kim</Link>
      {lines && <Tagline key={path} lines={lines} />}
    </div>
  );
}
