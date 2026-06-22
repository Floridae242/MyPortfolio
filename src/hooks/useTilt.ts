import { useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Subtle 3D tilt-toward-cursor + scale, for cards. Reduced-motion safe.
 * Returns a ref to attach to the tilting element plus mouse handlers.
 */
export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rotateX = (0.5 - py) * maxDeg * 2;
    const rotateY = (px - 0.5) * maxDeg * 2;
    ref.current.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = '';
  }

  return { ref, onMove, reset };
}
