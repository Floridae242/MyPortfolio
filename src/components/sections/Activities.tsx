import { GlassCard } from '@/components/ui/GlassCard';
import type { Activity } from '@/data/types';
import './sections.css';

export function Activities({ activities }: { activities: Activity[] }) {
  return (
    <section id="activities" className="section container" aria-labelledby="act-h">
      <div className="section-head"><div className="kicker">// activities</div><h2 id="act-h">Activities</h2></div>
      <div className="card-grid">
        {activities.map((a) => (
          <GlassCard key={a.id}>
            <div className="meta">{a.role} · {a.period}</div>
            <h3 style={{ fontSize: '1.05rem', margin: '0.3rem 0' }}>{a.activityName}</h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.88rem' }}>{a.description}</p>
            <div style={{ marginTop: '0.5rem' }}>{a.softSkills.map((s) => <span key={s} className="skill-tag">{s}</span>)}</div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
