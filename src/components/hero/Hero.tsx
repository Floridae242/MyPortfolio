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
          <div className="hero-rise" style={{ ['--d' as string]: '0ms' } as React.CSSProperties}>
            <TerminalIntro />
          </div>
          <div className="ctas hero-rise" style={{ ['--d' as string]: '520ms' } as React.CSSProperties}>
            <MagneticButton onClick={go('projects')}>Projects →</MagneticButton>
            <MagneticButton variant="ghost" onClick={go('contact')}>Contact</MagneticButton>
          </div>
        </div>
        <div className="graph-col hero-rise" style={{ display: 'grid', placeItems: 'center', ['--d' as string]: '260ms' } as React.CSSProperties}>
          <BackendGraph />
        </div>
      </div>
    </section>
  );
}
