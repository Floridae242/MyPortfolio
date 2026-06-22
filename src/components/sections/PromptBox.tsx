import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './prompt-box.css';

const PHRASES = [
  'Turning requirements into roadmaps...',
  'Aligning stakeholders & scope...',
  'Shipping outcomes, not just features...',
];
const STACK = ['React', 'TypeScript', 'Node', 'Supabase', 'Figma', 'SQL', 'Agile'];

export function PromptBox() {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? PHRASES[0] : '');
  const [printed, setPrinted] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) { setText(PHRASES[0]); return; }
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: number;
    const tick = () => {
      const current = PHRASES[phrase];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) { deleting = true; timer = window.setTimeout(tick, 1600); return; }
        timer = window.setTimeout(tick, 55);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) { deleting = false; phrase = (phrase + 1) % PHRASES.length; timer = window.setTimeout(tick, 320); return; }
        timer = window.setTimeout(tick, 26);
      }
    };
    timer = window.setTimeout(tick, 450);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const ping = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section container" aria-label="Terminal prompt">
      <div className="prompt-box">
        <div className="pb-inner">
          <div className="pb-bar">
            <span className="pb-dot" style={{ background: '#ff5f56' }} />
            <span className="pb-dot" style={{ background: '#ffbd2e' }} />
            <span className="pb-dot" style={{ background: '#27c93f' }} />
            <span className="pb-title">naruephon — zsh</span>
          </div>
          <div className="pb-body">
            <div className="pb-line">
              <span className="pb-prompt">tle@portfolio</span>
              <span className="pb-sep">:~$</span>{' '}
              <span className="pb-text">{text}</span>
              <span className="pb-caret" aria-hidden="true">▋</span>
            </div>
            {printed && <div className="pb-print">{printed}</div>}
            <div className="pb-actions">
              <a className="pb-btn" href="/resume.pdf" target="_blank" rel="noreferrer">[ Execute Resume ]</a>
              <button
                type="button"
                className="pb-btn"
                onClick={() => setPrinted(printed ? null : `→ stack: ${STACK.join(' · ')}`)}
              >
                [ Print Tech Stack ]
              </button>
              <button type="button" className="pb-btn" onClick={ping}>[ Ping Me ]</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
