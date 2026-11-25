import React, { useEffect, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

const SECTIONS = [
  { id: 'top', num: '00', label: 'Hero' },
  { id: 'about', num: '01', label: 'DNA' },
  { id: 'flagship', num: '02', label: 'Flagship' },
  { id: 'vault', num: '03', label: 'Vault' },
  { id: 'architecture', num: '04', label: 'Sandbox' },
  { id: 'journey', num: '05', label: 'Journey' },
  { id: 'contact', num: '06', label: 'Contact' },
];

export const SectionRail: React.FC = () => {
  const [active, setActive] = useState('top');
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setPercent(docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0);

      let current = 'top';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) {
          current = s.id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      aria-label="Section telemetry navigation"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-2 xl:flex print:hidden"
    >
      <div className="mb-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[10px] font-semibold text-accent backdrop-blur-md">
        {String(percent).padStart(2, '0')}%
      </div>
      {SECTIONS.map((s) => {
        const isCurrent = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => soundEngine.playClick()}
            className="group flex items-center gap-2 py-0.5"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-all ${
                isCurrent
                  ? 'translate-x-0 font-bold text-accent opacity-100'
                  : 'translate-x-1 text-[var(--text-muted)] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {s.num} {s.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                isCurrent
                  ? 'h-5 w-1.5 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.9)]'
                  : 'h-2 w-1.5 bg-[var(--border-strong)] group-hover:h-3.5 group-hover:bg-accent/70'
              }`}
            />
          </a>
        );
      })}
    </aside>
  );
};

