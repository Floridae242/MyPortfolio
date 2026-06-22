import './sections.css';

export function About() {
  return (
    <section id="about" className="section container" aria-labelledby="about-h">
      <div className="section-head"><div className="kicker">// about</div><h2 id="about-h">About</h2></div>
      <p style={{ maxWidth: '62ch', color: 'var(--color-text-dim)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        I'm Naruephon Yotmao (Tle) — a Digital Industry student at CAMT, Chiang Mai University,
        aiming for <strong style={{ color: 'var(--color-text)' }}>Business Analyst</strong> and{' '}
        <strong style={{ color: 'var(--color-text)' }}>Project Manager</strong> roles.
      </p>
      <p style={{ maxWidth: '62ch', color: 'var(--color-text-dim)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '1rem' }}>
        I work at the seam between people and software: running requirements interviews, turning messy
        stakeholder needs into clear specs and KPIs, and steering projects from idea to go-live. Because I
        can also design and build, nothing gets lost in translation between business and engineering — and
        I measure success in outcomes, not features.
      </p>
      <p className="meta" style={{ marginTop: '1.25rem', color: 'var(--color-accent)' }}>
        Open to: Business Analyst / Project Manager roles, internships &amp; co-ops.
      </p>
    </section>
  );
}
