'use client';

import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

// A single brand colour per partner could not clear 4.5:1 on both themes —
// Manheim sat at 2.70:1 on the dark background, ADESA at 2.77:1 on the light one.
const partners = [
  { name: 'Copart',  logo: 'COPART',  dark: '#5aa9f5', light: '#0b5cad' },
  { name: 'IAAI',    logo: 'IAAI',    dark: '#ff8a8f', light: '#b4232c' },
  { name: 'Manheim', logo: 'MANHEIM', dark: '#5fd3a0', light: '#1d5c43' },
  { name: 'ADESA',   logo: 'ADESA',   dark: '#ffa07a', light: '#a8431f' },
];

const track = [...partners, ...partners, ...partners, ...partners];

export default function Partners() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="section-label">{t.partners.label}</p>
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {t.partners.title}{' '}
          <span className="text-gradient">{t.partners.titleAccent}</span>
        </h2>
      </div>

      <div className="relative group overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 sm:w-40 z-10" style={{ background: 'linear-gradient(to right, var(--bg-main) 0%, var(--bg-main) 35%, transparent 100%)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 sm:w-40 z-10" style={{ background: 'linear-gradient(to left, var(--bg-main) 0%, var(--bg-main) 35%, transparent 100%)' }} />
        <div className="flex gap-6 w-max animate-scroll-x group-hover:[animation-play-state:paused]" style={{ animationDuration: '28s' }}>
          {track.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-2xl px-10 py-5 min-w-[160px] font-display text-2xl tracking-widest flex-shrink-0 transition-transform hover:scale-105"
              style={{ border: '1px solid var(--border)', backgroundColor: (isLight ? p.light : p.dark) + '1f', color: isLight ? p.light : p.dark }}
            >
              {p.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}