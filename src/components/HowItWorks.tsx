import { useEffect, useRef } from 'react';
import { MessageCircle, Search, Gavel, Ship, FileCheck } from 'lucide-react';
import { useLang } from '../context/LangContext';

const stepIcons = [MessageCircle, Search, Gavel, Ship, FileCheck];

export default function HowItWorks() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
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
    <section id="how-it-works" className="py-12 relative scroll-mt-16" ref={sectionRef}
      style={{ background: 'var(--bg-alt)' }}>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.15), transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
          <p className="section-label">{t.howItWorks.label}</p>
          <h2 className="section-title mb-8">
            {t.howItWorks.title}{' '}
            <span className="text-gradient section-title-accent">{t.howItWorks.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.howItWorks.sub}</p>
        </div>

        {/* ── Desktop timeline ── */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div
            className="absolute"
            style={{
              top: '2.75rem',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5) 10%, rgba(99,102,241,0.5) 90%, transparent)',
            }}
          />

          <div className="grid grid-cols-5 gap-2">
            {t.howItWorks.steps.map((step, idx) => {
              const Icon = stepIcons[idx];
              return (
                <div key={idx} className="animate-on-scroll flex flex-col items-center text-center">
                  {/* Number */}
                  <div
                    className="font-display text-xs font-bold mb-2 tracking-widest"
                    style={{ color: 'rgba(99,102,241,0.7)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Circle */}
                  <div
                    className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 0 0 4px rgba(99,102,241,0.15), 0 0 20px rgba(99,102,241,0.25)',
                    }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3
                    className="font-bold text-sm mb-2 leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile timeline ── */}
        <div className="md:hidden relative">
          {/* Vertical rail */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '1.375rem',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(99,102,241,0.1))',
            }}
          />

          <div className="space-y-8">
            {t.howItWorks.steps.map((step, idx) => {
              const Icon = stepIcons[idx];
              return (
                <div key={idx} className="animate-on-scroll flex items-start gap-5 relative">
                  {/* Circle on rail */}
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 0 0 4px rgba(99,102,241,0.15)',
                    }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="pt-2 pb-2">
                    <div
                      className="font-display text-xs font-bold tracking-widest mb-1"
                      style={{ color: 'rgba(99,102,241,0.7)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3
                      className="font-bold text-base mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {step.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
