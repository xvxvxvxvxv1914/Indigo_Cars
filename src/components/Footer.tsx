'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLang } from '../context/LangContext';

const sectionHrefs = ['#how-it-works', '#how-it-works', '#how-it-works', '#how-it-works', '#how-it-works'];
const infoHrefs = ['#how-it-works', '#offers', '#why-us', '#testimonials', '#faq'];

export default function Footer() {
  const { t } = useLang();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = '/' + href;
  };

  return (
    <footer style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 14L2 17H20L19 14H3Z" fill="white"/>
                  <path d="M5 14L6.5 9H15.5L17 14H5Z" fill="white" opacity="0.7"/>
                  <circle cx="7" cy="17.5" r="1.5" fill="white"/>
                  <circle cx="15" cy="17.5" r="1.5" fill="white"/>
                  <path d="M8 9L9 5H13L14 9H8Z" fill="white" opacity="0.5"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl text-white tracking-wider">INDIGO</span>
                <span className="font-display text-xl text-primary-400 tracking-wider">CARS</span>
              </div>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">{t.footer.description}</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-300 hover:text-primary-400 transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.services}</h4>
            <ul className="space-y-2">
              {t.footer.serviceLinks.map((label, i) => (
                <li key={i}>
                  <a href={sectionHrefs[i]} onClick={(e) => { e.preventDefault(); handleNav(sectionHrefs[i]); }} className="text-dark-300 hover:text-primary-400 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.info}</h4>
            <ul className="space-y-2">
              {t.footer.infoLinks.map((label, i) => (
                <li key={i}>
                  <a href={infoHrefs[i]} onClick={(e) => { e.preventDefault(); handleNav(infoHrefs[i]); }} className="text-dark-300 hover:text-primary-400 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.contacts}</h4>
            <div className="space-y-3">
              {[
                { icon: Phone, value: '—', href: '#' },
                { icon: Mail, value: 'info@indigocars.eu', href: 'mailto:info@indigocars.eu' },
                { icon: MapPin, value: t.contact.address, href: '#' },
              ].map(({ icon: Icon, value, href }) => (
                <a key={value} href={href} className="flex items-start gap-3 text-dark-300 hover:text-white transition-colors">
                  <Icon size={15} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24 md:pb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ color: '#403f90' }}>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex gap-4 text-xs" style={{ color: '#403f90' }}>
            <a href="/privacy" className="hover:text-dark-300 transition-colors">{t.footer.privacy}</a>
            <a href="/terms" className="hover:text-dark-300 transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}