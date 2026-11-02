'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// One observer for the whole site. Server-rendered markup opts in with data attributes:
//   data-reveal          fades and rises in when scrolled into view (data-delay="120" to stagger)
//   data-parallax="0.08" drifts slightly against the scroll
// Everything is skipped for visitors who prefer reduced motion.
export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('motion-off');
      return;
    }
    root.classList.add('motion-on');

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.style.transitionDelay = `${el.dataset.delay || 0}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });

    const els = document.querySelectorAll('[data-reveal]');
    els.forEach((el) => io.observe(el));

    const drifters = [...document.querySelectorAll('[data-parallax]')];
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        // Drift is a desktop flourish: small (±30px), and off below 900px wide.
        const wide = window.innerWidth >= 900;
        drifters.forEach((el) => {
          if (!wide) { el.style.transform = ''; return; }
          const r = el.getBoundingClientRect();
          const raw = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
          const offset = Math.max(-30, Math.min(30, raw));
          el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0) scale(1.06)`;
        });
        // Anything still waiting when the page bottom is reached is revealed, so elements
        // in the last few pixels of a page can never stay hidden.
        if (window.scrollY + vh >= root.scrollHeight - 4) {
          document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
            el.classList.add('is-in'); io.unobserve(el);
          });
        }
        const bar = document.querySelector('.progress span');
        if (bar) {
          const max = root.scrollHeight - vh;
          bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [path]);

  return null;
}
