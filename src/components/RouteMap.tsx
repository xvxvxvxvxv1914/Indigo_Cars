import { useEffect, useRef } from 'react';
import { MapPin, Anchor, Truck, ArrowRight, Clock } from 'lucide-react';

const routeStops = [
  { icon: MapPin, city: 'США', sub: 'Copart / IAAI', flag: '🇺🇸' },
  { icon: Anchor, city: 'Ротердам', sub: 'EU Hub', flag: '🇳🇱' },
  { icon: Truck, city: 'България', sub: 'Доставка до вас', flag: '🇧🇬' },
];

const timelineSteps = [
  { label: 'Подготовка', days: '7–10 дни' },
  { label: 'Морски транспорт', days: '20–30 дни' },
  { label: 'Митница', days: '5–10 дни' },
  { label: 'Последна доставка', days: '3–5 дни' },
];

export default function RouteMap() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative" ref={sectionRef}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0a0a1a, #12102a40, #0a0a1a)' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(79,70,229,0.06)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">Маршрут / Route</p>
          <h2 className="section-title mb-8">
            От търга до{' '}
            <span className="text-gradient section-title-accent">вашия гараж</span>
          </h2>
          <p className="section-subtitle">
            Осигуряваме пълен транспортен коридор от американски пристанища до всяка точка в
            България и Европа.
          </p>
        </div>

        {/* Route stops */}
        <div className="animate-on-scroll flex flex-col md:flex-row items-center justify-center gap-0 mb-16">
          {routeStops.map((stop, idx) => {
            const Icon = stop.icon;
            return (
              <div key={stop.city} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center w-52">
                  <div className="text-4xl mb-3">{stop.flag}</div>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-glow-sm" style={{ background: '#1a1830', border: '2px solid #3d3a6e' }}>
                    <Icon size={28} className="text-primary-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{stop.city}</h3>
                  <p className="text-dark-300 text-sm">{stop.sub}</p>
                </div>

                {idx < routeStops.length - 1 && (
                  <div className="flex flex-col md:flex-row items-center gap-2 px-4 py-6 md:py-0">
                    <div className="hidden md:block">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-3 h-0.5" style={{ background: 'rgba(124,58,237,0.4)' }} />
                        ))}
                        <ArrowRight size={16} className="text-primary-500 -ml-1" />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-dark-300 flex items-center gap-1">
                          <Clock size={10} />
                          {idx === 0 ? '20–30 дни' : '7–14 дни'}
                        </span>
                      </div>
                    </div>
                    <div className="md:hidden flex flex-col items-center gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-0.5 h-3" style={{ background: 'rgba(124,58,237,0.4)' }} />
                      ))}
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: 'rgba(124,58,237,0.7)' }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline breakdown */}
        <div className="animate-on-scroll grid grid-cols-2 md:grid-cols-4 gap-4">
          {timelineSteps.map((step, idx) => (
            <div
              key={step.label}
              className="animate-on-scroll card-hover rounded-xl p-4 text-center"
              style={{ background: '#12102a', border: '1px solid #2a2850' }}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}>
                {idx + 1}
              </div>
              <div className="text-lg font-bold text-gradient-stats mb-1">{step.days}</div>
              <div className="text-xs text-dark-300">{step.label}</div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="animate-on-scroll mt-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl px-8 py-4" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <Clock size={20} className="text-primary-400" />
            <span className="text-white font-semibold">
              Общо: <span className="text-gradient font-bold">45–60 дни</span> от поръчка до доставка
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
