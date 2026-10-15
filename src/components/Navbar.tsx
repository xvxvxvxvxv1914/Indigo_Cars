'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Sun, Moon, Building2, ChevronDown } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useMagnetic } from '../lib/useMagnetic';
import { useTheme } from '../context/ThemeContext';
import { SITE, telHref } from '../lib/site';

const LANGS = [
  { code: 'BG', name: 'Български' },
  { code: 'RO', name: 'Română' },
  { code: 'EN', name: 'English' },
  { code: 'RU', name: 'Русский' },
] as const;

const sectionIds = [
  { key: 'home',         href: '#hero',          hideAtLg: true  },
  { key: 'howItWorks',   href: '#how-it-works',  hideAtLg: false },
  { key: 'offers',       href: '#offers',         hideAtLg: false },
  { key: 'whyUs',        href: '#why-us',         hideAtLg: false },
  { key: 'testimonials', href: '#testimonials',   hideAtLg: true  },
  { key: 'faq',          href: '#faq',            hideAtLg: false },
  { key: 'contact',      href: '#contact',        hideAtLg: false },
] as const;

export default function Navbar({ darkBg = false }: { darkBg?: boolean }) {
  const { lang, setLang, t, slug } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const magCta = useMagnetic(0.3);
  const isLight = theme === 'light';
  const navRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // The closed menu is only collapsed visually — keep its links out of the tab order.
  useEffect(() => {
    menuRef.current?.toggleAttribute('inert', !mobileOpen);
  }, [mobileOpen]);

  // Esc closes the menu and the language list; a tap outside closes them too.
  useEffect(() => {
    if (!mobileOpen && !langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setLangOpen(false); }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (langOpen && !langRef.current?.contains(target)) setLangOpen(false);
      if (mobileOpen && !navRef.current?.contains(target)) setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [mobileOpen, langOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    const handleSectionScroll = () => {
      const ids = ['hero','how-it-works','offers','why-us','testimonials','faq','contact'];
      const center = window.innerHeight / 2;
      let closest = 'hero', closestDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < closestDist) { closestDist = dist; closest = id; }
      }
      setActiveSection(closest);
    };

    handleResize();
    handleScroll();
    handleSectionScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (pathname !== `/${slug}`) {
      window.location.href = `/${slug}` + href;
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLabels: Record<string, string> = {
    home: t.nav.home, howItWorks: t.nav.howItWorks, offers: t.nav.offers,
    whyUs: t.nav.whyUs, testimonials: t.nav.testimonials, faq: t.nav.faq, contact: t.nav.contact,
  };

  const scrolledDesktop = scrolled && isDesktop;

  const navBg = scrolledDesktop
    ? isLight
      ? 'shadow-lg shadow-purple-100/50 border-b'
      : 'shadow-2xl shadow-black/50 border-b'
    : !isDesktop
      ? 'border-b'
      : '';

  const onDarkNav = isDesktop || !isLight || darkBg;
  const navText    = onDarkNav ? 'rgba(255,255,255,0.92)' : 'var(--text-secondary)';
  const navTextHov = onDarkNav ? 'rgba(255,255,255,1)'    : 'var(--text-primary)';
  const navTextShadow = (isDesktop && !scrolledDesktop) ? '0 1px 6px rgba(0,0,0,0.6)' : 'none';
  const navCtrlBg  = onDarkNav ? 'rgba(255,255,255,0.12)' : 'var(--bg-card)';
  const navCtrlBdr = onDarkNav ? 'rgba(255,255,255,0.18)' : 'var(--border)';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      style={{
        background: scrolledDesktop
          ? 'var(--bg-nav)'
          : !isDesktop
            ? (isLight && !darkBg) ? 'rgba(255,255,255,0.80)' : 'rgba(15,26,51,0.85)'
            : 'linear-gradient(to bottom, rgba(0,8,30,0.55) 0%, transparent 100%)',
        borderColor: scrolledDesktop
          ? 'var(--border)'
          : !isDesktop
            ? (isLight && !darkBg) ? 'rgba(105,30,185,0.12)' : 'rgba(255,255,255,0.06)'
            : 'transparent',
        backdropFilter: (scrolledDesktop || !isDesktop) ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: (scrolledDesktop || !isDesktop) ? 'blur(16px)' : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }} className="flex items-center flex-shrink-0">
            <div
              className="rounded-xl transition-all duration-500"
              style={{
                padding: (theme === 'dark' || onDarkNav) ? '4px 10px' : '0px',
                background: (theme === 'dark' || onDarkNav) ? 'rgba(255,255,255,0.92)' : 'transparent',
              }}
            >
              <img src="/logo-nav.png" alt="Indigo Cars" width={121} height={28} className="h-6 min-[360px]:h-7 w-auto" />
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-0 text-[13px]">
            {sectionIds.map(({ key, href, hideAtLg }) => {
              const sectionId = href.replace('#', '');
              const isActive = pathname === `/${slug}` && activeSection === sectionId;
              return (
                <li key={href} className={hideAtLg ? 'hidden xl:block' : ''}>
                  <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className="relative px-2.5 xl:px-3 py-2 rounded-md font-medium transition-all duration-200 hover:bg-white/5 flex flex-col items-center whitespace-nowrap"
                    style={{ color: isActive ? navTextHov : navText, textShadow: navTextShadow }}
                    onMouseEnter={e => { e.currentTarget.style.color = navTextHov; e.currentTarget.style.textShadow = navTextShadow; }}
                    onMouseLeave={e => { e.currentTarget.style.color = isActive ? navTextHov : navText; e.currentTarget.style.textShadow = navTextShadow; }}
                  >
                    {navLabels[key]}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                      style={{ width: isActive ? '70%' : '0%', background: '#691EB9' }} />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3">
            {SITE.phone && (
              <a href={telHref(SITE.phone)} className="flex items-center gap-1.5 text-sm transition-colors whitespace-nowrap" style={{ color: navText }}>
                <Phone size={14} className="text-primary-500" />
                <span>{SITE.phone}</span>
              </a>
            )}

            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: navCtrlBg, border: `1px solid ${navCtrlBdr}` }}>
              {(['BG', 'RO', 'EN', 'RU'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded text-xs font-bold transition-all"
                  style={lang === l
                    ? { background: 'linear-gradient(135deg, #691EB9, #4a158a)', color: 'white' }
                    : { color: navText }}
                >{l}</button>
              ))}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:shadow-glow-sm"
              style={{ background: navCtrlBg, border: `1px solid ${navCtrlBdr}`, color: navText }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <Link href={`/${slug}/b2b`}
              className="relative flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-all"
              style={{
                color: 'white',
                border: `1px solid ${pathname === `/${slug}/b2b` ? '#691EB9' : 'rgba(255,255,255,0.45)'}`,
                background: pathname === `/${slug}/b2b`
                  ? 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)'
                  : 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                textShadow: navTextShadow,
              }}
            >
              <Building2 size={14} style={{ color: 'white' }} />
              B2B
            </Link>

            <a ref={magCta.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={magCta.onMouseMove} onMouseLeave={magCta.onMouseLeave}
              href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary text-sm py-2 px-4 whitespace-nowrap"
              style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease', display: 'inline-block' }}
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-1.5">
            {/* The full BG/RO/EN/RU row needs ~396px together with the logo, so below
                400px it collapses into one "BG ▾" button — otherwise the menu button
                was cut in half at 360px and pushed off-screen at 320px. */}
            <div className="hidden min-[400px]:flex items-center gap-1 rounded-lg p-1" style={{ background: navCtrlBg, border: `1px solid ${navCtrlBdr}` }}>
              {LANGS.map(({ code }) => (
                <button key={code} onClick={() => setLang(code)}
                  className="px-1.5 py-1 rounded text-xs font-bold transition-all"
                  style={lang === code
                    ? { background: 'linear-gradient(135deg, #691EB9, #4a158a)', color: 'white' }
                    : { color: navText }}
                >{code}</button>
              ))}
            </div>
            <div ref={langRef} className="relative min-[400px]:hidden">
              <button type="button"
                onClick={() => { setLangOpen((o) => !o); setMobileOpen(false); }}
                aria-haspopup="true" aria-expanded={langOpen}
                className="flex items-center gap-1 h-9 pl-2.5 pr-2 rounded-lg text-xs font-bold transition-colors"
                style={{ color: navText, background: navCtrlBg, border: `1px solid ${navCtrlBdr}` }}
              >
                {lang}
                <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <ul className="absolute right-0 top-full mt-2 min-w-[10.5rem] rounded-xl p-1.5 shadow-2xl"
                  style={{ background: 'var(--bg-nav)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  {LANGS.map(({ code, name }) => (
                    <li key={code}>
                      <button type="button"
                        onClick={() => { setLangOpen(false); if (code !== lang) setLang(code); }}
                        aria-current={lang === code ? 'true' : undefined}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors hover:bg-white/5"
                        style={lang === code
                          ? { background: 'linear-gradient(135deg, #691EB9, #4a158a)', color: 'white' }
                          : { color: 'rgba(255,255,255,0.85)' }}
                      >
                        <span className="font-bold w-6">{code}</span>
                        <span>{name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: navText, background: navCtrlBg, border: `1px solid ${navCtrlBdr}` }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="p-2 transition-colors" style={{ color: navTextHov }}
              onClick={() => { setMobileOpen(!mobileOpen); setLangOpen(false); }}
              aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — scrolls inside itself when it is taller than the screen
          (phone in landscape), otherwise the last items sat below the fold, unreachable. */}
      <div id="mobile-menu" ref={menuRef}
        className={`lg:hidden transition-all duration-300 ${mobileOpen
          ? 'max-h-[calc(100vh-3.5rem)] supports-[height:100dvh]:max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain opacity-100'
          : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        <div className="px-4 py-4" style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          <ul className="space-y-1 mb-4">
            {sectionIds.map(({ key, href }) => (
              <li key={href}>
                <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="block px-4 py-2.5 rounded-lg transition-all text-sm hover:bg-white/5"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {navLabels[key]}
                </a>
              </li>
            ))}
            {/* Between 768 and 1023px the bottom bar is hidden and the desktop B2B
                button not shown yet — this was the only way to reach /b2b there. */}
            <li>
              <Link href={`/${slug}/b2b`} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm hover:bg-white/5"
                style={{ color: pathname === `/${slug}/b2b` ? '#c4b5fd' : 'rgba(255,255,255,0.8)' }}
              >
                <Building2 size={14} aria-hidden="true" />
                B2B
              </Link>
            </li>
          </ul>
          {SITE.phone && (
            <a href={telHref(SITE.phone)} className="flex items-center gap-3 px-4 py-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <Phone size={14} className="text-primary-500" />
              <span>{SITE.phone}</span>
            </a>
          )}
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="block btn-primary text-center text-sm mt-3">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
