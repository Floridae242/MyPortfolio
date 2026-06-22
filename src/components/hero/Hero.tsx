import { TerminalIntro } from './TerminalIntro';
import { BackendGraph } from './BackendGraph';
import { MagneticButton } from '@/components/ui/MagneticButton';
import './hero.css';

export function Hero() {
  const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="hero" aria-label="Introduction">
      <div className="split">
        <div>
          <TerminalIntro />
          <div className="ctas">
            <MagneticButton onClick={go('projects')}>Projects →</MagneticButton>
            <MagneticButton variant="ghost" onClick={go('contact')}>Contact</MagneticButton>
          </div>
        </div>
        <div className="graph-col" style={{ display: 'grid', placeItems: 'center' }}>
          <BackendGraph />
        </div>
      </div>
    </section>
  );
}
