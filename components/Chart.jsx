// Inline SVG charts rendered at build time from data in content/fxdata.js.
// Styled with the page's CSS variables so they match the surrounding type and colour.
// Two kinds: 'range' (floating monthly high–low bars) and 'line' (a daily series).

const W = 800;

function niceTicks(min, max, n = 4) {
  const span = max - min; const raw = span / n; const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((s) => s * mag).find((s) => span / s <= n) || mag * 10;
  const lo = Math.floor(min / step) * step; const hi = Math.ceil(max / step) * step;
  const ticks = []; for (let t = lo; t <= hi + 1e-9; t += step) ticks.push(Math.round(t));
  return { lo, hi, ticks };
}

const fmt = (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 });

function RangeChart({ data }) {
  const H = 380, padL = 64, padR = 16, padT = 34, padB = 44;
  const { lo, hi, ticks } = niceTicks(Math.min(...data.map((d) => d.lo)), Math.max(...data.map((d) => d.hi)));
  const y = (v) => padT + (hi - v) / (hi - lo) * (H - padT - padB);
  const slot = (W - padL - padR) / data.length; const bw = Math.min(34, slot * 0.56);
  const avg = data.reduce((s, d) => s + d.pct, 0) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={`Monthly high to low USD/KRW range; average ${avg.toFixed(1)} percent`}>
      {ticks.map((t) => (
        <g key={t}><line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="chart-grid" /><text x={padL - 10} y={y(t) + 4} textAnchor="end" className="chart-tick">{fmt(t)}</text></g>
      ))}
      {data.map((d, i) => {
        const x = padL + slot * i + (slot - bw) / 2;
        return (
          <g key={d.m}>
            <rect x={x} y={y(d.hi)} width={bw} height={Math.max(2, y(d.lo) - y(d.hi))} rx="3" className="chart-bar" />
            <text x={x + bw / 2} y={y(d.hi) - 8} textAnchor="middle" className="chart-val">{d.pct.toFixed(1)}%</text>
            <text x={x + bw / 2} y={H - padB + 20} textAnchor="middle" className={i % 2 ? 'chart-tick chart-m-alt' : 'chart-tick'}>{d.m}</text>
          </g>
        );
      })}
      <text x={W - padR} y={H - 4} textAnchor="end" className="chart-note">Bar: month’s low to high · label: range as % of the low · average {avg.toFixed(1)}%</text>
    </svg>
  );
}

function LineChart({ data, readings = [] }) {
  const H = 380, padL = 64, padR = 90, padT = 28, padB = 100;
  const vals = data.map((d) => d[1]);
  const { lo, hi, ticks } = niceTicks(Math.min(...vals), Math.max(...vals));
  const t = (iso) => Date.parse(iso.length === 10 ? iso + 'T12:00:00Z' : iso + ':00Z');
  const t0 = t(data[0][0]), t1 = t(data[data.length - 1][0]);
  const x = (iso) => padL + ((t(iso) - t0) / (t1 - t0)) * (W - padL - padR);
  const plotB = H - padB; const y = (v) => padT + (hi - v) / (hi - lo) * (plotB - padT);
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(d[0]).toFixed(1)},${y(d[1]).toFixed(1)}`).join(' ');
  const first = data[0], last = data[data.length - 1];
  const chg = ((last[1] / first[1] - 1) * 100).toFixed(1);
  const seen = new Set();
  const monthStarts = data.filter(([d]) => { const m = d.slice(0, 7); if (seen.has(m)) return false; seen.add(m); return true; });
  const lastIsStart = monthStarts.some(([d]) => d === last[0]);
  const label = (iso) => new Date(iso.slice(0, 10) + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const counts = readings.reduce((c, r) => { c[r[1]] = (c[r[1]] || 0) + 1; return c; }, {});
  const stripY = plotB + 44, stripH = 22;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={`USD/KRW reference rate from ${label(first[0])} to ${label(last[0])}, a change of ${chg} percent${readings.length ? `, with ${readings.length} widget readings beneath, ${counts.low || 0} of them labelled low` : ''}`}>
      {ticks.map((tk) => (
        <g key={tk}><line x1={padL} x2={W - padR} y1={y(tk)} y2={y(tk)} className="chart-grid" /><text x={padL - 10} y={y(tk) + 4} textAnchor="end" className="chart-tick">{fmt(tk)}</text></g>
      ))}
      {monthStarts.map(([d]) => <text key={d} x={x(d)} y={plotB + 18} textAnchor={d === first[0] ? 'start' : 'middle'} className="chart-tick">{label(d)}</text>)}
      {!lastIsStart && <text x={x(last[0])} y={plotB + 18} textAnchor="end" className="chart-tick">{label(last[0])}</text>}
      <path d={path} className="chart-line" />
      <circle cx={x(first[0])} cy={y(first[1])} r="4" className="chart-dot" />
      <circle cx={x(last[0])} cy={y(last[1])} r="4" className="chart-dot" />
      <text x={x(first[0]) + 8} y={y(first[1]) - 10} className="chart-val">{fmt(first[1])}</text>
      <text x={x(last[0]) + 10} y={y(last[1]) + 4} className="chart-val">{fmt(last[1])}</text>
      <text x={x(last[0]) + 10} y={y(last[1]) + 22} className="chart-note">{chg}%</text>
      {readings.length > 0 && (
        <g>
          <text x={padL} y={stripY - 8} className="chart-tick">Widget readings · {readings.length} logged · {counts.low || 0} low · {counts.mid || 0} mid · {counts.high || 0} high</text>
          {readings.map((r, i) => (
            <line key={i} x1={x(r[0])} x2={x(r[0])} y1={stripY} y2={stripY + stripH} className={`chart-read chart-read-${r[1]}`} />
          ))}
        </g>
      )}
    </svg>
  );
}

export default function Chart({ kind, data, readings, caption }) {
  return (
    <figure className="figure chart" data-reveal>
      <div className="chart-frame">{kind === 'range' ? <RangeChart data={data} /> : <LineChart data={data} readings={readings} />}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
