import { GlassCard } from '@/components/ui/GlassCard';
import type { Award } from '@/data/types';
import './sections.css';

export function Awards({ awards }: { awards: Award[] }) {
  return (
    <section id="awards" className="section container" aria-labelledby="awards-h">
      <div className="section-head"><div className="kicker">// awards</div><h2 id="awards-h">Awards & Honors</h2></div>
      <div className="card-grid">
        {awards.map((a) => (
          <GlassCard key={a.id}>
            <div className="meta">{a.category} · {a.date}</div>
            <h3 style={{ fontSize: '1.05rem', margin: '0.3rem 0' }}>{a.title}</h3>
            <div className="meta">{a.organization}</div>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.88rem', marginTop: '0.5rem' }}>{a.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
