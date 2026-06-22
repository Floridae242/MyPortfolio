import { GlassCard } from '@/components/ui/GlassCard';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { fetchMediumPosts } from '@/lib/medium';
import './sections.css';

const MEDIUM_URL = 'https://medium.com/@naruephonyotmao';

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function Journal() {
  const { data: posts, loading } = useSupabaseData(fetchMediumPosts, []);

  // Hide the section entirely if the feed is empty or unreachable.
  if (!loading && posts.length === 0) return null;

  return (
    <section id="journal" className="section container" aria-labelledby="journal-h">
      <div className="section-head">
        <div className="kicker">// journal</div>
        <h2 id="journal-h">Writing</h2>
      </div>
      <div className="card-grid">
        {posts.slice(0, 4).map((p) => (
          <GlassCard key={p.link}>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', height: '100%' }}
            >
              <div className="meta">{fmtDate(p.pubDate)}</div>
              <h3 style={{ fontSize: '1.02rem', margin: '0.2rem 0' }}>{p.title}</h3>
              <p style={{ color: 'var(--color-text-dim)', fontSize: '0.88rem' }}>{p.excerpt}</p>
            </a>
          </GlassCard>
        ))}
      </div>
      <a
        href={MEDIUM_URL}
        target="_blank"
        rel="noreferrer"
        className="meta"
        style={{ color: 'var(--color-accent)', display: 'inline-block', marginTop: '1.25rem' }}
      >
        Read all on Medium →
      </a>
    </section>
  );
}
