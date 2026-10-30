'use client';
import { useEffect, useState } from 'react';

// ReconLayer's rules on its synthetic test set: compare internal vs broker, ignore
// differences under the $50,000 tolerance, and split the rest into value breaks and
// population breaks (one side missing). Net of value breaks: +$327,500.
const TOL = 50000;
const ROWS = [
  ['SWP-10620', 'IRS', 3551000, 3905000],
  ['SWP-10517', 'IRS', -845900, -845000],
  ['CDS-20881', 'CDS', 402900, 512400],
  ['SWP-11001', 'IRS', null, 288400],
  ['FXF-33120', 'FX Fwd', 233050, 233050],
  ['CDS-20955', 'CDS', -246200, -318700],
  ['SWO-41120', 'Swaption', 175300, null],
  ['SWP-10733', 'IRS', 654100, 667300],
  ['SWO-41007', 'Swaption', 1203700, 1140200],
];

const fmt = (n) => (n == null ? '—' : (n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString('en-US'));
const signed = (n) => (n > 0 ? '+' : n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString('en-US');

function classify([id, product, internal, broker]) {
  if (internal == null || broker == null) return { id, product, internal, broker, group: 'population', note: internal == null ? 'Only in broker file' : 'Only in internal book' };
  const diff = broker - internal;
  return { id, product, internal, broker, diff, group: Math.abs(diff) < TOL ? 'tolerance' : 'value' };
}

const GROUPS = [
  ['population', 'Population breaks', 'One side is missing. Pinned first: there’s no difference to rank.'],
  ['value', 'Value breaks', 'Both sides present, difference above $50,000.'],
  ['tolerance', 'Within tolerance', 'Filtered out as noise.'],
];

export default function ReconDemo() {
  const [done, setDone] = useState(false);
  const [net, setNet] = useState(0);
  const rows = ROWS.map(classify);
  const total = rows.filter((r) => r.group === 'value').reduce((s, r) => s + r.diff, 0);

  useEffect(() => {
    if (!done) { setNet(0); return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setNet(total); return; }
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / 900);
      setNet(Math.round(total * (1 - Math.pow(1 - k, 3)) / 100) * 100);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done, total]);

  return (
    <div className="demo demo-recon">
      <div className="demo-bar">
        <span>Try it · ReconLayer’s rules on the test data</span>
        <span className="demo-pill">Tolerance $50,000</span>
      </div>

      {!done ? (
        <>
          <table className="recon-table">
            <thead><tr><th>Trade</th><th>Product</th><th>Internal book</th><th>Broker file</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}><td>{r.id}</td><td>{r.product}</td><td>{fmt(r.internal)}</td><td>{fmt(r.broker)}</td></tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="demo-btn" onClick={() => setDone(true)}>Reconcile</button>
        </>
      ) : (
        <>
          <div className="recon-summary">
            <div><strong aria-live="polite">{signed(net)}</strong><span>Net dispute</span></div>
            <div><strong>{rows.filter((r) => r.group === 'value').length}</strong><span>Value breaks</span></div>
            <div><strong>{rows.filter((r) => r.group === 'population').length}</strong><span>Population breaks</span></div>
          </div>
          {GROUPS.map(([key, title, help], gi) => (
            <div key={key} className={`recon-group recon-${key}`} style={{ animationDelay: `${gi * 140}ms` }}>
              <h4>{title}<small>{help}</small></h4>
              <ul>
                {rows.filter((r) => r.group === key).map((r, i) => (
                  <li key={r.id} style={{ animationDelay: `${gi * 140 + i * 70 + 80}ms` }}>
                    <span className="recon-id">{r.id}</span>
                    <span className="recon-product">{r.product}</span>
                    <span className="recon-val">{r.group === 'population' ? r.note : signed(r.diff)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="demo-foot">The AI only starts after this step, to draft the counterparty email for the analyst to review. It never changes a classification.</p>
          <button type="button" className="demo-link" onClick={() => setDone(false)}>Reset</button>
        </>
      )}
    </div>
  );
}
