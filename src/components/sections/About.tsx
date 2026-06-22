import './sections.css';

export function About() {
  return (
    <section id="about" className="section container" aria-labelledby="about-h">
      <div className="section-head"><div className="kicker">// about</div><h2 id="about-h">About</h2></div>
      <p style={{ maxWidth: '60ch', color: 'var(--color-text-dim)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        Full-stack developer and Digital Industry student at CAMT, Chiang Mai University. I build systems,
        fix problems, and turn data into decisions — across web, IoT, and civic tech.
      </p>
    </section>
  );
}
