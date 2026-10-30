'use client';
import { useState } from 'react';

// A simplified version of FXpress's logic: code places today's rate in its 30-day range
// and writes the sentence; nothing here forecasts. Range: USD/KRW, July 2026.
const LOW = 1466.95;
const HIGH = 1552.78;
const SEND = 2000;

function reading(rate) {
  const pct = ((rate - LOW) / (HIGH - LOW)) * 100;
  const band = pct < 30 ? 'low' : pct > 70 ? 'high' : 'mid';
  const sentence = {
    low: 'Today, USD→KRW sits near the low end of its 30-day range, so a dollar buys fewer won than on most recent days.',
    mid: 'Today, USD→KRW sits in the middle of its 30-day range. Nothing unusual either way.',
    high: 'Today, USD→KRW sits near the high end of its 30-day range, so a dollar buys more won than on most recent days.',
  }[band];
  return { pct, band, sentence };
}

export default function FxRangeDemo() {
  const [rate, setRate] = useState(1509.4);
  const [showBug, setShowBug] = useState(false);
  const { pct, band, sentence } = reading(rate);
  const won = Math.round(rate * SEND).toLocaleString('en-US');

  return (
    <div className="demo demo-fx">
      <div className="demo-bar">
        <span>Try it · simplified FXpress logic</span>
        <span className="demo-pill">USD → KRW</span>
      </div>
      <label className="fx-label" htmlFor="fx-rate">Today’s rate <strong>{rate.toFixed(2)}</strong> KRW per USD</label>
      <input
        id="fx-rate" className="fx-slider" type="range" min={LOW} max={HIGH} step="0.01" value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
        aria-valuetext={`${rate.toFixed(2)} won per dollar, ${band} of the 30-day range`}
      />
      <div className="fx-range" aria-hidden="true">
        <div className="fx-zone fx-zone-low">Low</div>
        <div className="fx-zone fx-zone-mid">Mid</div>
        <div className="fx-zone fx-zone-high">High</div>
        <div className="fx-marker" style={{ left: `${pct}%` }} />
      </div>
      <div className="fx-ends" aria-hidden="true"><span>30-day low {LOW.toFixed(2)}</span><span>30-day high {HIGH.toFixed(2)}</span></div>

      <div className="fx-out">
        <div><span className="fx-out-label">Recipient gets for $2,000</span><strong>{won} KRW</strong><small>before your provider’s fee and markup</small></div>
        <p className={`fx-sentence fx-${band}`} aria-live="polite">
          <span className="fx-fexi" aria-hidden="true">Fexi</span>{sentence}
        </p>
        <p className="fx-note">Range position describes the past 30 days. It doesn’t predict tomorrow.</p>
      </div>

      {band === 'low' && (
        <div className="fx-bug">
          <button type="button" className="demo-link" onClick={() => setShowBug(!showBug)} aria-expanded={showBug}>
            {showBug ? 'Hide' : 'Show'} what Fexi said here in October 2026
          </button>
          {showBug && (
            <p><s>“You’re getting the most won for your dollar.”</s> At the low end a dollar buys the <em>fewest</em> won. Now the code writes the meaning and Fexi can only reword it.</p>
          )}
        </div>
      )}
    </div>
  );
}
