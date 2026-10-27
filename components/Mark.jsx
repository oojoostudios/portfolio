'use client';
import { useEffect, useRef } from 'react';

// Placeholder for the upper-left animated mark: a small dot grid that leans
// toward the cursor. Replace once the reference animation is confirmed.
export default function Mark() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const size = 44, n = 5, gap = size / n;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mx = -1e3, my = -1e3, t = 0, raf;

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = getComputedStyle(canvas).color;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const x = gap * (i + 0.5), y = gap * (j + 0.5);
        const d = Math.hypot(mx - x, my - y);
        const pull = Math.max(0, 1 - d / 240);
        const wave = reduce ? 0 : Math.sin(t / 40 + i * 0.7 + j * 0.5) * 0.35;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + pull * 2.2 + wave, 0, Math.PI * 2);
        ctx.fill();
      }
      t++;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', onMove);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, []);

  return <canvas ref={ref} className="mark" style={{ width: 44, height: 44 }} aria-hidden="true" />;
}
