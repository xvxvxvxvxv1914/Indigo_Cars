import { useEffect, useRef, useState } from 'react';
import { MapPin, Anchor, Truck, ArrowRight, Clock } from 'lucide-react';
import { useLang } from '../context/LangContext';

const stopIcons = [MapPin, Anchor, Truck];

function AnimatedRouteLine({ visible }: { visible: boolean }) {
  const pathD = 'M 80 40 C 180 10, 300 70, 400 40 C 500 10, 620 70, 720 40';
  return (
    <svg
      viewBox="0 0 800 80"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-[calc(50%+32px)] w-full pointer-events-none"
      style={{ zIndex: 2, height: '80px' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8" />
        </linearGradient>
        <filter id="routeGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path
        d={pathD}
        stroke="url(#routeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#routeGlow)"
        strokeDasharray="800"
        strokeDashoffset={visible ? '0' : '800'}
        style={{ transition: visible ? 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
      />
      {visible && (
        <circle r="5" fill="#a78bfa" filter="url(#routeGlow)">
          <animateMotion dur="3s" repeatCount="indefinite" path={pathD} />
        </circle>
      )}
    </svg>
  );
}

export default function RouteMap() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
            setLineVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative" ref={sectionRef} style={{ background: '#0e0d20' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0a0a1a, rgba(18,16,42,0.7), #0a0a1a)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.15), transparent)' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(79,70,229,0.06)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">{t.routeMap.label}</p>
          <h2 className="section-title mb-8">
            {t.routeMap.title}{' '}
            <span className="text-gradient section-title-accent">{t.routeMap.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.routeMap.sub}</p>
        </div>

        <div className="animate-on-scroll relative flex flex-col md:flex-row items-center justify-center gap-0 mb-16">
          <AnimatedRouteLine visible={lineVisible} />
          {t.routeMap.stops.map((stop, idx) => {
            const Icon = stopIcons[idx];
            return (
              <div key={idx} className="flex flex-col md:flex-row items-center" style={{ zIndex: 3 }}>
                <div className="flex flex-col items-center text-center w-52">
                  <div className="text-4xl mb-3">{stop.flag}</div>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-glow-sm" style={{ background: '#1a1830', border: '2px solid #3d3a6e' }}>
                    <Icon size={28} className="text-primary-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{stop.city}</h3>
                  <p className="text-dark-300 text-sm">{stop.sub}</p>
                </div>
                {idx < t.routeMap.stops.length - 1 && (
                  <div className="flex flex-col md:flex-row items-center gap-2 px-4 py-6 md:py-0" style={{ zIndex: 3 }}>
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
                          {t.routeMap.durations[idx]}
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

        <div className="animate-on-scroll grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.routeMap.timeline.map((step, idx) => (
            <div key={idx} className="animate-on-scroll card-hover rounded-xl p-4 text-center" style={{ background: '#12102a', border: '1px solid #2a2850' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}>
                {idx + 1}
              </div>
              <div className="text-lg font-bold text-gradient-stats mb-1">{step.days}</div>
              <div className="text-xs text-dark-300">{step.label}</div>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll mt-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl px-8 py-4" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <Clock size={20} className="text-primary-400" />
            <span className="text-white font-semibold">
              {t.routeMap.total}{' '}
              <span className="text-gradient font-bold">{t.routeMap.totalDays}</span>{' '}
              {t.routeMap.totalSuffix}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
