'use client';
import { useEffect, useState } from 'react';

// Rotating line after the name, in the spirit of chriswelch.co. Advances on a
// timer or on click; holds still for people who prefer reduced motion.
const lines = [
  'is a product designer in the Bay Area',
  'spent eleven years in hedge fund trading operations',
  'hosts GoStop Club, a Korean card-game night',
  'makes art about family, culture and history',
  'spends weekends gallery hopping',
  'is very good at Where’s Waldo',
];

export default function Tagline() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % lines.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <button
      type="button"
      className="tagline"
      onClick={() => setI((n) => (n + 1) % lines.length)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Show another fact about Lorraine"
    >
      <span key={i} className="tagline-line">{lines[i]}</span>
    </button>
  );
}
