import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

const REVEAL_SAFETY_MS = 2500;

/**
 * Reveal-on-scroll via IntersectionObserver (progressive enhancement).
 *
 * Content is fully visible by default — the `.reveal-init` hidden state is added
 * by JS only when motion is enabled, and IntersectionObserver uses live element
 * positions, so it works even when section content loads asynchronously. A safety
 * timeout guarantees nothing can ever stay permanently hidden.
 */
export function useScrollReveal(selector = '.section') {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return; // leave content visible; no animation
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    els.forEach((el) => el.classList.add('reveal-init'));
    const reveal = (el: Element) => el.classList.add('reveal-in');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));

    // Safety net: never leave content hidden even if the observer misbehaves.
    const safety = window.setTimeout(() => els.forEach(reveal), REVEAL_SAFETY_MS);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [reduced, selector]);
}
