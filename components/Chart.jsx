// Charts rendered at build time from data in content/fxdata.js.
// Headline, subtitle, legend and source are HTML so they stay crisp and responsive;
// only the marks and axis labels are SVG. The viewBox width matches the column width
// (720) so SVG type renders close to its nominal size on desktop.

const W = 720;
const fmt = (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 });

function ticksFor(min, max, n = 3) {
  const span = max - min; const raw = span / n; const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((s) => s * mag).find((s) => span / s <= n) || mag * 10;
  const lo = Math.floor(min / step) * step; const hi = Math.ceil(max / step) * step;
  const ticks = []; for (let t = lo; t <= hi + 1e-9; t += step) ticks.push(Math.round(t));
  return { lo, hi, ticks };
}

function RangeChart({ data }) {
  const H = 300, padL = 4, padR = 4, padT = 30, padB = 28;
  const { lo, hi, ticks } = ticksFor(Math.min(...data.map((d) => d.lo)), Math.max(...data.map((d) => d.hi)));
  const y = (v) => padT + (hi - v) / (hi - lo) * (H - padT - padB);
  const slot = (W - padL - padR) / data.length; const bw = Math.min(30, slot * 0.5);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="Monthly high-to-low range of the USD/KRW reference rate, one bar per month">
      {ticks.map((t) => (
        <g key={t}><line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="chart-grid" /><text x={padL} y={y(t) - 5} className="chart-tick">{fmt(t)}</text></g>
      ))}
      {data.map((d, i) => {
        const x = padL + slot * i + (slot - bw) / 2;
        return (
          <g key={d.m}>
            <rect x={x} y={y(d.hi)} width={bw} height={Math.max(2, y(d.lo) - y(d.hi))} className="chart-bar" />
            <text x={x + bw / 2} y={y(d.hi) - 7} textAnchor="middle" className="chart-val">{d.pct.toFixed(1)}%</text>
            <text x={i === 0 ? padL : i === data.length - 1 ? W - padR : x + bw / 2} y={H - 8} textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'} className={i % 2 ? 'chart-tick chart-m-alt' : 'chart-tick'}>{d.m}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ data, readings = [] }) {
  const hasStrip = readings.length > 0;
  const H = hasStrip ? 336 : 260, padL = 4, padR = 64, padT = 24, padB = hasStrip ? 102 : 30;
  const vals = data.map((d) => d[1]);
  const { lo, hi, ticks } = ticksFor(Math.min(...vals), Math.max(...vals));
  const t = (iso) => Date.parse(iso.length === 10 ? iso + 'T12:00:00Z' : iso + ':00Z');
  const t0 = t(data[0][0]), t1 = t(data[data.length - 1][0]);
  const x = (iso) => padL + ((t(iso) - t0) / (t1 - t0)) * (W - padL - padR);
  const plotB = H - padB; const y = (v) => padT + (hi - v) / (hi - lo) * (plotB - padT);
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(d[0]).toFixed(1)},${y(d[1]).toFixed(1)}`).join(' ');
  const first = data[0], last = data[data.length - 1];
  const seen = new Set();
  const monthStarts = data.filter(([d]) => { const m = d.slice(0, 7); if (seen.has(m)) return false; seen.add(m); return true; });
  const label = (iso) => new Date(iso.slice(0, 10) + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const stripY = plotB + 56, stripH = 26;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={`USD/KRW reference rate from ${label(first[0])} to ${label(last[0])}${hasStrip ? `, with ${readings.length} widget readings marked by date beneath` : ''}`}>
      {ticks.map((tk) => (
        <g key={tk}><line x1={padL} x2={W - padR} y1={y(tk)} y2={y(tk)} className="chart-grid" /><text x={padL} y={y(tk) - 5} className="chart-tick">{fmt(tk)}</text></g>
      ))}
      {monthStarts.map(([d]) => <text key={d} x={x(d)} y={plotB + 18} textAnchor={d === first[0] ? 'start' : 'middle'} className="chart-tick">{new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}</text>)}
      <path d={path} className="chart-line" />
      <circle cx={x(first[0])} cy={y(first[1])} r="3.5" className="chart-dot" />
      <circle cx={x(last[0])} cy={y(last[1])} r="3.5" className="chart-dot" />
      <text x={x(first[0]) + 8} y={y(first[1]) - 9} className="chart-val">{fmt(first[1])}</text>
      <text x={x(last[0]) + 9} y={y(last[1]) + 4} className="chart-val">{fmt(last[1])}</text>
      {hasStrip && (
        <g>
          <line x1={padL} x2={W - padR} y1={stripY - 14} y2={stripY - 14} className="chart-grid" />
          <text x={padL} y={stripY - 6} className="chart-tick">Widget readings, by date</text>
          {readings.map((r, i) => <line key={i} x1={x(r[0])} x2={x(r[0])} y1={stripY} y2={stripY + stripH} className={`chart-read chart-read-${r[1]}`} />)}
        </g>
      )}
    </svg>
  );
}

export default function Chart({ kind, data, readings, title, subtitle, caption }) {
  const counts = (readings || []).reduce((c, r) => { c[r[1]] = (c[r[1]] || 0) + 1; return c; }, {});
  return (
    <figure className="figure chart" data-reveal>
      {(title || subtitle) && (
        <div className="chart-head">
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {kind === 'range' ? <RangeChart data={data} /> : <LineChart data={data} readings={readings} />}
      {readings && readings.length > 0 && (
        <p className="chart-legend" aria-hidden="true">
          <span><i className="chart-read-low" /> Low · {counts.low || 0}</span>
          <span><i className="chart-read-mid" /> Mid · {counts.mid || 0}</span>
          <span><i className="chart-read-high" /> High · {counts.high || 0}</span>
        </p>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
