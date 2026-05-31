// Auction partner data extracted from Auctions.tsx
const partners = [
  { name: 'Copart',   logo: 'COPART',  color: '#0066cc' },
  { name: 'IAAI',     logo: 'IAAI',    color: '#e63946' },
  { name: 'Manheim',  logo: 'MANHEIM', color: '#2d6a4f' },
  { name: 'ADESA',    logo: 'ADESA',   color: '#e76f51' },
];

// Duplicate list so the track is 2× wide and the -50% translateX loop is seamless
const track = [...partners, ...partners, ...partners, ...partners];

export default function Partners() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: '#0a0a1a', borderTop: '1px solid #2a2850', borderBottom: '1px solid #2a2850' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="section-label">Доверени партньори</p>
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Директен достъп до{' '}
          <span className="text-gradient">водещите търгове</span>
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative group overflow-hidden">
        {/* Edge fade — left */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #0a0a1a, transparent)' }}
        />
        {/* Edge fade — right */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #0a0a1a, transparent)' }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-6 w-max animate-scroll-x group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '28s' }}
        >
          {track.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-2xl px-10 py-5 min-w-[160px] font-display text-2xl tracking-widest flex-shrink-0 transition-transform hover:scale-105"
              style={{
                background: '#12102a',
                border: '1px solid #2a2850',
                backgroundColor: p.color + '18',
                color: p.color,
              }}
            >
              {p.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
