'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown, Shield, Truck, FileText } from 'lucide-react';
import { useLang } from '../context/LangContext';

/* ── LIGHT HERO ── */
function HeroLight() {
  const { t, lang } = useLang();
  const bgRef = useRef<HTMLImageElement>(null);
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.12)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const badgeLabels = lang === 'BG'
    ? ['Лицензирани', 'Доставка в срок', 'Пълна документация']
    : lang === 'RU'
    ? ['Лицензированы', 'Доставка в срок', 'Полная документация']
    : ['Licensed', 'On-time Delivery', 'Full Documentation'];

  const stats = [
    { value: '2000+', label: t.stats.delivered },
    { value: '45–60', label: t.stats.delivery },
    { value: '100%', label: t.stats.transparent },
  ];

  return (
    <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="/hero-image.webp"
          alt="Indigo Cars — внос от САЩ"
          className="w-full h-full object-cover"
          style={{ objectPosition: '60% center', transform: 'scale(1.12)', willChange: 'transform' }}
          fetchPriority="high"
          decoding="sync"
        />
        {/* Light theme overlays — bright left, gentle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.94] via-white/[0.65] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/20" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(105,30,185,0.07)' }} />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: 'linear-gradient(to right, transparent, #691EB9, #4a158a, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-16 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-stagger flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, #691EB9, #4a158a)' }} />
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-[0.25em]">{t.hero.label}</span>
          </div>

          {/* Heading */}
          <h1 className="hero-stagger font-display text-3xl sm:text-5xl md:text-6xl leading-none mb-6 tracking-wide" style={{ animationDelay: '0.18s', color: '#1A1A2E' }}>
            {t.hero.h1a}{' '}
            <span className="text-gradient">{t.hero.h1b}</span>
            <br />
            {t.hero.h1c}{' '}
            <span className="text-gradient">{t.hero.h1d}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-stagger text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 max-w-2xl" style={{ animationDelay: '0.32s', color: '#3D3A5C' }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div className="hero-stagger flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12" style={{ animationDelay: '0.46s' }}>
            <button onClick={() => scroll('#contact')} className="btn-primary text-center text-base">
              {t.hero.cta}
            </button>
            <button onClick={() => scroll('#how-it-works')} className="btn-outline text-center text-base">
              {t.hero.secondary}
            </button>
          </div>

          {/* Trust badges */}
          <div className="hero-stagger flex flex-wrap gap-3" style={{ animationDelay: '0.60s' }}>
            {badgeLabels.map((label, i) => {
              const Icon = [Shield, Truck, FileText][i];
              return (
                <div key={label} className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(105,30,185,0.25)' }}>
                  <Icon size={14} className="text-primary-500" />
                  <span className="text-xs font-medium" style={{ color: '#3D3A5C' }}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Mobile stats strip — hidden on md+ (desktop shows floating cards) */}
          <div className="hero-stagger flex gap-3 mt-6 md:hidden" style={{ animationDelay: '0.72s' }}>
            {stats.map((s) => (
              <div key={s.label} className="flex-1 text-center rounded-xl px-2 py-3" style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(105,30,185,0.18)', boxShadow: '0 2px 12px rgba(105,30,185,0.08)' }}>
                <div className="text-lg font-bold text-gradient-stats leading-none">{s.value}</div>
                <div className="text-[10px] mt-0.5 leading-tight" style={{ color: '#5B5880' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards — bottom right, desktop only */}
        <div className="absolute bottom-12 right-6 lg:right-16 hidden md:flex flex-col gap-3">
          {stats.map((s) => (
            <div key={s.label} className="text-right backdrop-blur rounded-xl px-5 py-3 min-w-[150px] transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(105,30,185,0.2)', boxShadow: '0 4px 20px rgba(105,30,185,0.1)' }}>
              <div className="text-2xl font-bold text-gradient-stats">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: '#5B5880' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scroll('#how-it-works')}
        className="absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-colors hover:text-primary-500"
        style={{ color: '#7B6FA8' }}
        aria-label="Scroll down"
      >
        <span className="hidden sm:inline text-xs uppercase tracking-widest">{t.hero.scrollMore}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}

/* ── DARK HERO (original) ── */
function HeroDark() {
  const { t, lang } = useLang();
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.12)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const badgeLabels = lang === 'BG'
    ? ['Лицензирани', 'Доставка в срок', 'Пълна документация']
    : lang === 'RU'
    ? ['Лицензированы', 'Доставка в срок', 'Полная документация']
    : ['Licensed', 'On-time Delivery', 'Full Documentation'];

  const statItems = [
    { value: '2000+', label: t.stats.delivered },
    { value: '45–60', label: t.stats.delivery },
    { value: '100%', label: t.stats.transparent },
  ];

  return (
    <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '100dvh' }}>
      <div className="absolute inset-0 z-0">
        <img ref={bgRef} src="/hero-image.webp" alt="Indigo Cars — внос от САЩ"
          className="w-full h-full object-cover"
          fetchPriority="high" decoding="sync"
          style={{ objectPosition: '60% center', transform: 'scale(1.12)', willChange: 'transform' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A33]/[0.97] via-[#0F1A33]/[0.75] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A33]/90 via-transparent to-[#0F1A33]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A33]/60 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(105,30,185,0.1)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-[100px]" style={{ background: 'rgba(14,0,43,0.08)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.5), rgba(14,0,43,0.5), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-16 w-full">
        <div className="max-w-3xl">
          <div className="hero-stagger flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, #691EB9, #4a158a)' }} />
            <span className="text-primary-400 font-semibold text-xs uppercase tracking-[0.25em]">{t.hero.label}</span>
          </div>

          <h1 className="hero-stagger font-display text-3xl sm:text-5xl md:text-6xl text-white leading-none mb-6 tracking-wide" style={{ animationDelay: '0.18s' }}>
            {t.hero.h1a}{' '}<span className="text-gradient">{t.hero.h1b}</span>
            <br />
            {t.hero.h1c}{' '}<span className="text-gradient">{t.hero.h1d}</span>
          </h1>

          <p className="hero-stagger text-dark-300 text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 max-w-2xl" style={{ animationDelay: '0.32s' }}>
            {t.hero.sub}
          </p>

          <div className="hero-stagger flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12" style={{ animationDelay: '0.46s' }}>
            <button onClick={() => scroll('#contact')} className="btn-primary text-center text-base">
              {t.hero.cta}
            </button>
            <button onClick={() => scroll('#how-it-works')} className="btn-outline text-center text-base">
              {t.hero.secondary}
            </button>
          </div>

          <div className="hero-stagger flex flex-wrap gap-3" style={{ animationDelay: '0.60s' }}>
            {badgeLabels.map((label, i) => {
              const Icon = [Shield, Truck, FileText][i];
              return (
                <div key={label} className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(105,30,185,0.3)' }}>
                  <Icon size={14} className="text-primary-400" />
                  <span className="text-xs text-white font-medium">{label}</span>
                </div>
              );
            })}
          </div>

          {/* Mobile stats strip — hidden on md+ */}
          <div className="hero-stagger flex gap-3 mt-6 md:hidden" style={{ animationDelay: '0.72s' }}>
            {statItems.map((s) => (
              <div key={s.label} className="flex-1 text-center rounded-xl px-2 py-3" style={{ background: 'rgba(26,24,48,0.8)', border: '1px solid rgba(105,30,185,0.25)' }}>
                <div className="text-lg font-bold text-gradient-stats leading-none">{s.value}</div>
                <div className="text-[10px] text-dark-300 mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 right-6 lg:right-16 hidden md:flex flex-col gap-3">
          {statItems.map((s) => (
            <div key={s.label} className="text-right backdrop-blur rounded-xl px-5 py-3 min-w-[150px] transition-all hover:scale-105" style={{ background: 'rgba(26,24,48,0.8)', border: '1px solid rgba(105,30,185,0.25)' }}>
              <div className="text-2xl font-bold text-gradient-stats">{s.value}</div>
              <div className="text-xs text-dark-300 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => scroll('#how-it-works')}
        className="absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-dark-300 hover:text-primary-400 transition-colors"
        aria-label="Scroll down">
        <span className="hidden sm:inline text-xs uppercase tracking-widest">{t.hero.scrollMore}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}

/* ── MAIN EXPORT ──
   Both variants are always in the DOM so the LCP image is present in SSR HTML
   and the preload in layout.tsx hits it immediately — no JS hydration wait.
   CSS driven by the blocking theme script that sets data-theme before paint. */
export default function Hero() {
  return (
    <>
      <div data-hero="dark" className="hero-dark-wrap"><HeroDark /></div>
      <div data-hero="light" className="hero-light-wrap"><HeroLight /></div>
    </>
  );
}