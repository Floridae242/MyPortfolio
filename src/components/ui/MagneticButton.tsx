import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './magnetic-button.css';

export function MagneticButton({ children, onClick, variant = 'solid' }: { children: ReactNode; onClick?: () => void; variant?: 'solid' | 'ghost' }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  }
  function reset() { if (ref.current) ref.current.style.transform = ''; }

  return (
    <button ref={ref} className={`magnetic-btn ${variant === 'ghost' ? 'ghost' : ''}`} onClick={onClick} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </button>
  );
}
