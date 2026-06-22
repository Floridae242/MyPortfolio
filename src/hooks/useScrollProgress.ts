import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useScrollReveal(selector = '.section') {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return; // sections are visible by default; no-op under reduced motion
    let cleanup = () => {};
    import('@/lib/animation').then(({ loadGsap }) =>
      loadGsap().then(({ gsap }) => {
        const els = gsap.utils.toArray<HTMLElement>(selector);
        const tweens = els.map((el) =>
          gsap.from(el, {
            opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }),
        );
        cleanup = () => { tweens.forEach((t) => t.scrollTrigger?.kill()); };
      }),
    ).catch(() => {}); // swallow import/gsap errors in jsdom (progressive enhancement)
    return () => cleanup();
  }, [reduced, selector]);
}
