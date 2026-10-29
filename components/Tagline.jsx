'use client';
import { useEffect, useState } from 'react';

// Rotating line after the name, in the spirit of chriswelch.co. Advances on a
// timer or on click; holds still for people who prefer reduced motion.
export default function Tagline({ lines }) {
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
      <span key={i} className={`tagline-line tagline-c${i % 6}`} aria-hidden="true">
        {(() => {
          let n = 0;
          const total = lines[i].replace(/ /g, '').length;
          return lines[i].split(' ').map((word, w) => (
            <span key={w}>
              {w > 0 && ' '}
              <span className="tagline-word">
                {[...word].map((ch) => {
                  const pct = Math.round((n / Math.max(total - 1, 1)) * 100);
                  return (
                    <span
                      key={n}
                      className="tagline-char"
                      style={{ animationDelay: `${n++ * 18}ms`, color: `color-mix(in oklab, var(--g2) ${pct}%, var(--g1))` }}
                    >{ch}</span>
                  );
                })}
              </span>
            </span>
          ));
        })()}
      </span>
      <span className="sr-only">{lines[i]}</span>
    </button>
  );
}
