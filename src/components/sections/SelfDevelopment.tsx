import { GlassCard } from '@/components/ui/GlassCard';
import type { SelfDev } from '@/data/types';
import './sections.css';

export function SelfDevelopment({ items }: { items: SelfDev[] }) {
  return (
    <section id="self-development" className="section container" aria-labelledby="sd-h">
      <div className="section-head"><div className="kicker">// growth</div><h2 id="sd-h">Self-Development</h2></div>
      <div className="card-grid">
        {items.map((s) => (
          <GlassCard key={s.id}>
            <div className="meta">{s.type} · {s.date}</div>
            <h3 style={{ fontSize: '1.02rem', margin: '0.3rem 0' }}>{s.title}</h3>
            <div className="meta">{s.institution}</div>
            {s.credentialUrl && <a href={s.credentialUrl} target="_blank" rel="noreferrer" className="meta" style={{ color: 'var(--color-accent)' }}>credential →</a>}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
