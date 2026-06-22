import { forwardRef, type ReactNode, type CSSProperties, type MouseEventHandler } from 'react';
import './glass-card.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseMove?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
}

export const GlassCard = forwardRef<HTMLElement, GlassCardProps>(function GlassCard(
  { children, className = '', style, onMouseMove, onMouseLeave },
  ref,
) {
  return (
    <article
      ref={ref}
      className={`glass-card ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </article>
  );
});
