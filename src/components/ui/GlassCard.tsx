import type { ReactNode } from 'react';
import './glass-card.css';

export function GlassCard({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <article className={`glass-card ${className}`} style={style}>{children}</article>;
}
