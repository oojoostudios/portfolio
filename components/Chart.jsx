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

function LineChart({ data }) {
  const H = 320, padL = 64, padR = 90, padT = 28, padB = 40;
  const vals = data.map((d) => d[1]);
  const { lo, hi, ticks } = niceTicks(Math.min(...vals), Math.max(...vals));
  const x = (i) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const y = (v) => padT + (hi - v) / (hi - lo) * (H - padT - padB);
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d[1]).toFixed(1)}`).join(' ');
  const first = data[0], last = data[data.length - 1];
  const chg = ((last[1] / first[1] - 1) * 100).toFixed(1);
  // First trading day of each month, plus the last point unless it already starts a month.
  const seen = new Set();
  const monthStarts = data.map((d, i) => [d[0], i]).filter(([d]) => { const m = d.slice(0, 7); if (seen.has(m)) return false; seen.add(m); return true; });
  const lastIsStart = monthStarts.some(([, i]) => i === data.length - 1);
  const label = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label={`USD/KRW reference rate from ${label(first[0])} to ${label(last[0])}, a change of ${chg} percent`}>
      {ticks.map((t) => (
        <g key={t}><line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="chart-grid" /><text x={padL - 10} y={y(t) + 4} textAnchor="end" className="chart-tick">{fmt(t)}</text></g>
      ))}
      {monthStarts.map(([d, i]) => <text key={d} x={x(i)} y={H - padB + 20} textAnchor={i === 0 ? 'start' : 'middle'} className="chart-tick">{label(d)}</text>)}
      {!lastIsStart && <text x={x(data.length - 1)} y={H - padB + 20} textAnchor="end" className="chart-tick">{label(last[0])}</text>}
      <path d={path} className="chart-line" />
      <circle cx={x(0)} cy={y(first[1])} r="4" className="chart-dot" />
      <circle cx={x(data.length - 1)} cy={y(last[1])} r="4" className="chart-dot" />
      <text x={x(0) + 8} y={y(first[1]) - 10} className="chart-val">{fmt(first[1])}</text>
      <text x={x(data.length - 1) + 10} y={y(last[1]) + 4} className="chart-val">{fmt(last[1])}</text>
      <text x={x(data.length - 1) + 10} y={y(last[1]) + 22} className="chart-note">{chg}%</text>
    </svg>
  );
}

export default function Chart({ kind, data, caption }) {
  return (
    <figure className="figure chart" data-reveal>
      <div className="chart-frame">{kind === 'range' ? <RangeChart data={data} /> : <LineChart data={data} />}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
