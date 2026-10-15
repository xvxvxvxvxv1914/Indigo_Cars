'use client';

import { useEffect } from 'react';
import {
  Globe, Car, Ship, FileText, Shield, Users,
  Search, CheckCircle, Phone, Mail, MapPin,
  Package, MessageCircle, Gavel, Truck, Building2
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { SITE, telHref } from '../lib/site';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

// Only the language-neutral parts live here; every visible text comes from `t.b2b`
// in the locale files. The page used to keep its own BG/EN/RU copies, so Romanian
// fell through to Bulgarian in some places and to English in others — /ro/b2b ended
// up in three languages at once.
const STATS = [
  { value: '3',     icon: Globe },
  { value: '1500+', icon: Car },
  { value: '300+',  icon: Users },
  { value: '100%',  icon: Shield },
];
const SERVICE_ICONS = [Search, Ship, FileText, Package, Users];
const STEP_ICONS = [MessageCircle, Search, Gavel, Ship, Truck];
const CARD_ICONS = [Building2, Shield, Globe, Car];

const badgeStyle = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(105,30,185,0.35)' };

export default function B2B() {
  const { t } = useLang();
  const b = t.b2b;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-observe]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Navbar darkBg />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '75vh' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
            alt={b.heroAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000E38]/[0.92] via-[#000E38]/[0.75] to-[#000E38]/[0.25]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000E38]/80 via-transparent to-transparent" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, transparent, #691EB9, #4a158a, transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow — same style as main hero */}
            <div className="hero-stagger flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
              <div className="h-px w-10" style={{ background: 'linear-gradient(to right, #691EB9, #4a158a)' }} />
              <span className="text-primary-400 font-semibold text-xs uppercase tracking-[0.25em]">
                {b.eyebrow}
              </span>
            </div>

            <h1 className="hero-stagger font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-5" style={{ animationDelay: '0.18s', color: 'white' }}>
              {b.h1a}<br /><span className="text-gradient-hero">{b.h1b}</span>
            </h1>

            <p className="hero-stagger text-base md:text-lg leading-relaxed mb-8" style={{ animationDelay: '0.32s', color: 'rgba(213,198,224,0.9)' }}>
              {b.sub}
            </p>

            <div className="hero-stagger flex flex-col sm:flex-row gap-4 mb-8" style={{ animationDelay: '0.46s' }}>
              <button onClick={() => scrollTo('b2b-contact')} className="btn-primary text-center text-base">
                {b.ctaContact}
              </button>
              <button
                onClick={() => scrollTo('b2b-how')}
                className="font-semibold px-6 py-3 rounded-lg transition-all duration-300 active:scale-95 text-base border-2 hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.45)', color: 'white' }}
              >
                {b.ctaHow}
              </button>
            </div>

            {/* Trust badges — same style as main hero */}
            <div className="hero-stagger flex flex-wrap gap-3" style={{ animationDelay: '0.60s' }}>
              <div className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2" style={badgeStyle}>
                <span className="text-base leading-none tracking-wide">🇺🇸 🇨🇦 🇰🇷</span>
              </div>
              {[Car, Shield].map((Icon, i) => (
                <div key={i} className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2" style={badgeStyle}>
                  <Icon size={13} className="text-primary-400" />
                  <span className="text-xs font-medium" style={{ color: 'white' }}>{b.badges[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section data-observe className="py-12 relative" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(({ value, icon: Icon }, i) => (
              <div key={i} className="animate-on-scroll gradient-border-card text-center backdrop-blur rounded-2xl p-4 sm:p-6">
                <Icon size={24} className="text-primary-400 mx-auto mb-2 sm:mb-3" />
                <div className="font-display text-2xl md:text-3xl lg:text-4xl text-gradient-stats mb-1 sm:mb-2">
                  {value}
                </div>
                <div className="text-dark-300 text-xs sm:text-sm">{b.stats[i].label}</div>
                {b.stats[i].sub && <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{b.stats[i].sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section data-observe className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
            <p className="section-label">{b.servicesLabel}</p>
            <h2 className="section-title mb-4">
              {b.servicesTitle}{' '}
              <span className="text-gradient section-title-accent">{b.servicesTitleAccent}</span>
            </h2>
            <p className="section-subtitle">{b.servicesSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {b.services.map(({ label, desc }, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div key={i} className="animate-on-scroll gradient-border-card card-hover rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(105,30,185,0.15)' }}>
                    <Icon size={22} className="text-primary-400" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section id="b2b-how" data-observe className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-alt)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.25), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.15), transparent)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
            <p className="section-label">{b.processLabel}</p>
            <h2 className="section-title mb-4">
              {b.processTitle}{' '}
              <span className="text-gradient section-title-accent">{b.processTitleAccent}</span>
            </h2>
            <p className="section-subtitle">{b.processSub}</p>
          </div>

          {/* Desktop */}
          <div className="hidden md:block relative">
            <div className="absolute" style={{ top: '3.25rem', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.5) 10%, rgba(105,30,185,0.5) 90%, transparent)' }} />
            <div className="grid grid-cols-5 gap-2">
              {b.steps.map((step, idx) => {
                const Icon = STEP_ICONS[idx];
                return (
                  <div key={idx} className="animate-on-scroll flex flex-col items-center text-center">
                    <div className="font-display text-xs font-bold mb-2 tracking-widest" style={{ color: 'var(--num-accent)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="relative z-10 rounded-full flex items-center justify-center mb-5 transition-all duration-300 hover:scale-110"
                      style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', boxShadow: '0 0 0 4px rgba(105,30,185,0.15), 0 0 20px rgba(105,30,185,0.25)' }}>
                      <Icon size={24} style={{ color: 'white' }} />
                    </div>
                    <h3 className="font-bold text-sm mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>{step.label}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative">
            <div className="absolute top-0 bottom-0" style={{ left: '1.375rem', width: '2px', background: 'linear-gradient(to bottom, rgba(105,30,185,0.6), rgba(105,30,185,0.1))' }} />
            <div className="space-y-8">
              {b.steps.map((step, idx) => {
                const Icon = STEP_ICONS[idx];
                return (
                  <div key={idx} className="animate-on-scroll flex items-start gap-5 relative">
                    <div className="flex-shrink-0 rounded-full flex items-center justify-center relative z-10"
                      style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', boxShadow: '0 0 0 4px rgba(105,30,185,0.15)' }}>
                      <Icon size={22} style={{ color: 'white' }} />
                    </div>
                    <div className="pt-2">
                      <div className="font-display text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--num-accent)' }}>{String(idx + 1).padStart(2, '0')}</div>
                      <div className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{step.label}</div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INDIGO CARS ── */}
      <section data-observe className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-main)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <p className="section-label">{b.whyLabel}</p>
              <h2 className="section-title mb-6">
                {b.whyTitle}{' '}
                <span className="text-gradient section-title-accent">Indigo Cars?</span>
              </h2>
              <p className="section-subtitle mb-8">{b.whySub}</p>
              <div className="space-y-4 mb-8">
                {b.reasons.map((reason, i) => (
                  <div key={i} className="animate-on-scroll flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #691EB9, #4a158a)' }}>
                      <CheckCircle size={13} style={{ color: 'white' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{reason}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('b2b-contact')} className="btn-primary">
                {b.whyCta}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {b.cards.map(({ title, desc }, i) => {
                const Icon = CARD_ICONS[i];
                return (
                  <div key={i} className="animate-on-scroll gradient-border-card rounded-xl p-5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(105,30,185,0.15)' }}>
                      <Icon size={20} className="text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="b2b-contact" data-observe className="py-12 pb-24 md:pb-12 relative" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #691EB9 0%, #000E38 100%)' }}>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none hidden md:block" style={{ background: 'rgba(105,30,185,0.3)' }} />
            <div className="relative z-10 max-w-xl">
              <p className="text-primary-300 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
                {b.contactLabel}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight" style={{ color: 'white' }}>
                {b.contactTitle}
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(231,228,240,0.8)' }}>
                {b.contactSub}
              </p>
              <div className="flex flex-col gap-4">
                {SITE.phone && (
                  <a href={telHref(SITE.phone)} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105" style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <Phone size={16} style={{ color: 'white' }} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: 'rgba(231,228,240,0.6)' }}>{b.phoneLabel}</div>
                      <div className="text-sm font-semibold" style={{ color: 'white' }}>{SITE.phone}</div>
                    </div>
                  </a>
                )}
                <a href={`mailto:${SITE.b2bEmail || SITE.email}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Mail size={16} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(231,228,240,0.6)' }}>{b.emailLabel}</div>
                    <div className="text-sm font-semibold" style={{ color: 'white' }}>{SITE.b2bEmail || SITE.email}</div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <MapPin size={16} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(231,228,240,0.6)' }}>{b.addressLabel}</div>
                    <div className="text-sm font-semibold" style={{ color: 'white' }}>{b.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
}
