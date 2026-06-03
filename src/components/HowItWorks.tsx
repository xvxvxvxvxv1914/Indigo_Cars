'use client';

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
    <section id="how-it-works" className="py-12 md:py-20 relative scroll-mt-16" ref={sectionRef}
      style={{ background: 'var(--bg-main)' }}>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl px-5 py-10 sm:px-8 md:px-12 md:py-14" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
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
              top: '3.25rem',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.5) 10%, rgba(105,30,185,0.5) 90%, transparent)',
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
                    style={{ color: 'rgba(105,30,185,0.7)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Circle */}
                  <div
                    className="relative z-10 w-13 h-13 rounded-full flex items-center justify-center mb-5 transition-all duration-300 hover:scale-110"
                    style={{
                      width: 52, height: 52,
                      background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)',
                      boxShadow: '0 0 0 4px rgba(105,30,185,0.15), 0 0 20px rgba(105,30,185,0.25)',
                    }}
                  >
                    <Icon size={24} style={{ color: 'white' }} />
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
              background: 'linear-gradient(to bottom, rgba(105,30,185,0.6), rgba(105,30,185,0.1))',
            }}
          />

          <div className="space-y-8">
            {t.howItWorks.steps.map((step, idx) => {
              const Icon = stepIcons[idx];
              return (
                <div key={idx} className="animate-on-scroll flex items-start gap-5 relative">
                  {/* Circle on rail */}
                  <div
                    className="flex-shrink-0 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      width: 52, height: 52,
                      background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)',
                      boxShadow: '0 0 0 4px rgba(105,30,185,0.15)',
                    }}
                  >
                    <Icon size={24} style={{ color: 'white' }} />
                  </div>

                  {/* Content */}
                  <div className="pt-2 pb-2">
                    <div
                      className="font-display text-xs font-bold tracking-widest mb-1"
                      style={{ color: 'rgba(105,30,185,0.7)' }}
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
      </div>
    </section>
  );
}