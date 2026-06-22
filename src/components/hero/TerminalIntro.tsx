import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './terminal.css';

const LINES = ['whoami', 'Naruephon Yotmao', 'Full-Stack Developer · CAMT, CMU'];

export function TerminalIntro() {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (reduced) { setShown(LINES.length); return; }
    setShown(0);
    let i = 0;
    const id = setInterval(() => { i += 1; setShown(i); if (i >= LINES.length) clearInterval(id); }, 700);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="terminal">
      <div className="bar">
        <span className="dot" style={{ background: '#ff5f56' }} />
        <span className="dot" style={{ background: '#ffbd2e' }} />
        <span className="dot" style={{ background: '#27c93f' }} />
        <span className="muted" style={{ marginLeft: 'auto', fontSize: 11 }}>~/naruephon</span>
      </div>
      <div className="body">
        <div><span className="prompt">$</span> {LINES[0]}</div>
        {shown >= 2 && <div className="name">Naruephon Yotmao<span className="caret">▋</span></div>}
        {shown >= 3 && <div className="muted">Full-Stack Developer · CAMT, CMU</div>}
      </div>
    </div>
  );
}
