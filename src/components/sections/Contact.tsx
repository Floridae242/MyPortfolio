import { MagneticButton } from '@/components/ui/MagneticButton';
import './sections.css';

export function Contact() {
  return (
    <section id="contact" className="section container" aria-labelledby="contact-h">
      <div className="section-head"><div className="kicker">// contact</div><h2 id="contact-h">Get in touch</h2></div>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <a href="mailto:naruephonyotmao@gmail.com"><MagneticButton>Email →</MagneticButton></a>
        <a href="https://github.com/Floridae242" target="_blank" rel="noreferrer"><MagneticButton variant="ghost">GitHub</MagneticButton></a>
      </div>
    </section>
  );
}
