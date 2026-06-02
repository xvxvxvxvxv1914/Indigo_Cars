import { useLang } from '../context/LangContext';

const partners = [
  { name: 'Copart',  logo: 'COPART',  color: '#0066cc' },
  { name: 'IAAI',    logo: 'IAAI',    color: '#e63946' },
  { name: 'Manheim', logo: 'MANHEIM', color: '#2d6a4f' },
  { name: 'ADESA',   logo: 'ADESA',   color: '#e76f51' },
];

const track = [...partners, ...partners, ...partners, ...partners];

export default function Partners() {
  const { t } = useLang();

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
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--bg-main), transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, var(--bg-main), transparent)' }} />
        <div className="flex gap-6 w-max animate-scroll-x group-hover:[animation-play-state:paused]" style={{ animationDuration: '28s' }}>
          {track.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-2xl px-10 py-5 min-w-[160px] font-display text-2xl tracking-widest flex-shrink-0 transition-transform hover:scale-105"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', backgroundColor: p.color + '18', color: p.color }}
            >
              {p.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
