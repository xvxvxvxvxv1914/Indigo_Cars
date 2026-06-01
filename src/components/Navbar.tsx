import { useState, useEffect } from 'react';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useMagnetic } from '../lib/useMagnetic';
import { useTheme } from '../context/ThemeContext';

const sectionIds = [
  { key: 'home', href: '#hero' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'offers', href: '#offers' },
  { key: 'whyUs', href: '#why-us' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const magCta = useMagnetic(0.3);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLabels: Record<string, string> = {
    home: t.nav.home, howItWorks: t.nav.howItWorks, offers: t.nav.offers,
    whyUs: t.nav.whyUs, testimonials: t.nav.testimonials, faq: t.nav.faq, contact: t.nav.contact,
  };

  const navBg = scrolled
    ? isLight
      ? 'shadow-lg shadow-purple-100/50 border-b'
      : 'shadow-2xl shadow-black/50 border-b'
    : '';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      style={{
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        borderColor: scrolled ? 'var(--border)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }} className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M3 14L2 17H20L19 14H3Z" fill="white" />
                <path d="M5 14L6.5 9H15.5L17 14H5Z" fill="white" opacity="0.7" />
                <circle cx="7" cy="17.5" r="1.5" fill="white" />
                <circle cx="15" cy="17.5" r="1.5" fill="white" />
                <path d="M8 9L9 5H13L14 9H8Z" fill="white" opacity="0.5" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-wider" style={{ color: isLight && !scrolled ? 'white' : 'var(--text-primary)' }}>AUTO</span>
              <span className="font-display text-lg text-primary-400 tracking-wider">IMPORT</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {sectionIds.map(({ key, href }) => (
              <li key={href}>
                <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {navLabels[key]}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <Phone size={14} className="text-primary-500" />
              <span>—</span>
            </a>

            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              {(['BG', 'EN', 'RU'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded text-xs font-bold transition-all"
                  style={lang === l
                    ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white' }
                    : { color: 'var(--text-secondary)' }}
                >{l}</button>
              ))}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:shadow-glow-sm"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <a ref={magCta.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={magCta.onMouseMove} onMouseLeave={magCta.onMouseLeave}
              href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary text-sm py-2 px-4"
              style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease', display: 'inline-block' }}
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              {(['BG', 'EN', 'RU'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="px-2 py-0.5 rounded text-xs font-bold transition-all"
                  style={lang === l
                    ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white' }
                    : { color: 'var(--text-secondary)' }}
                >{l}</button>
              ))}
            </div>
            <button onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="p-2 transition-colors" style={{ color: 'var(--text-primary)' }}
              onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4" style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          <ul className="space-y-1 mb-4">
            {sectionIds.map(({ key, href }) => (
              <li key={href}>
                <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="block px-4 py-2.5 rounded-lg transition-all text-sm hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {navLabels[key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 px-4 py-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Phone size={14} className="text-primary-500" />
            <span>—</span>
          </div>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="block btn-primary text-center text-sm mt-3">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
