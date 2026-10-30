'use client';
import { useState } from 'react';

// The archive's two paths: Discovery for newcomers, Archive Mode for researchers.
// Same artwork, different framing.
const MODES = {
  discovery: {
    nav: ['Overview', 'Journey', 'Motifs', 'Exhibition Plan'],
    eyebrow: 'Discovery · Motifs',
    title: 'Home Return Way',
    body: 'Hwang returned to roads, oxen and villages for six decades. The Discovery path groups his work by these motifs, with the history a newcomer needs to read them.',
    meta: null,
  },
  archive: {
    nav: ['Biography', 'Works', 'Bibliography', 'Exhibitions', 'Timeline'],
    eyebrow: 'Works · Record',
    title: 'Home Return Way',
    body: null,
    meta: [['Artist', 'Hwang Yoo-Yup (1916–2010)'], ['Year', '1979'], ['Medium', 'Oil on canvas'], ['Collection', 'Private collection']],
  },
};

export default function ArchiveDemo() {
  const [mode, setMode] = useState('discovery');
  const m = MODES[mode];
  return (
    <div className="demo demo-archive">
      <div className="demo-bar">
        <span>Try it · the archive’s two paths</span>
        <div className="archive-toggle" role="group" aria-label="Archive view">
          {['discovery', 'archive'].map((k) => (
            <button key={k} type="button" aria-pressed={mode === k} onClick={() => setMode(k)}>
              {k === 'discovery' ? 'Discovery' : 'Archive Mode'}
            </button>
          ))}
        </div>
      </div>
      <div className="archive-screen" key={mode}>
        <nav className="archive-nav" aria-label={`${mode} navigation (example)`}>
          {m.nav.map((n, i) => <span key={n} style={{ animationDelay: `${i * 60}ms` }}>{n}</span>)}
        </nav>
        <p className="archive-eyebrow">{m.eyebrow}</p>
        <h4 className="archive-title">{m.title}</h4>
        {m.body && <p className="archive-body">{m.body}</p>}
        {m.meta && (
          <dl className="archive-meta">
            {m.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        )}
      </div>
      <p className="demo-foot">A newcomer starts with the story; a scholar goes straight to the record. One toggle, on every page.</p>
    </div>
  );
}
