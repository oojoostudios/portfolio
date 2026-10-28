'use client';
import { useEffect, useState } from 'react';

// Rotating line after the name, in the spirit of chriswelch.co. Advances on a
// timer or on click; holds still for people who prefer reduced motion.
const lines = [
  'designs financial tools people can stand behind',
  'spent 15 years in buy-side trading operations',
  'prototypes in code and tests against real data',
  'keeps the AI out of the math',
  'built an archive for a Korean modernist painter',
  'is learning her mum’s Korean dishes',
  'hosts a Korean card-game night in the Bay Area',
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
