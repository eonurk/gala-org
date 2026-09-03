'use client';

import { useEffect } from 'react';

/**
 * Sayfadaki [data-reveal] bloklarını görünür olduklarında açar.
 * Tek gözlemci; her bölüm kendi gecikmesini --rd ile taşır.
 */
export function RevealRoot() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (const n of nodes) n.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, []);

  return null;
}
