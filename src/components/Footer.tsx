'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { SITE, telHref } from '../lib/site';

const sectionHrefs = ['#how-it-works', '#how-it-works', '#how-it-works', '#how-it-works', '#how-it-works'];
const infoHrefs = ['#how-it-works', '#offers', '#why-us', '#testimonials', '#faq'];

export default function Footer() {
  const { t, slug } = useLang();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = `/${slug}` + href;
  };

  return (
    <footer style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Same brandbook wordmark as the navbar — the footer stays dark in
                both themes, so it gets the same light plate the navbar uses. */}
            <div className="mb-4">
              <div className="inline-block rounded-xl" style={{ padding: '5px 11px', background: 'rgba(255,255,255,0.92)' }}>
                <img src="/logo.png" alt="Indigo Cars" className="h-7 w-auto" />
              </div>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">{t.footer.description}</p>
            {/* Rendered only for profiles the client has actually given us —
                these used to be three dead href="#" links. */}
            <div className="flex gap-3">
              {([
                { Icon: Facebook, url: SITE.social.facebook, name: 'Facebook' },
                { Icon: Instagram, url: SITE.social.instagram, name: 'Instagram' },
                { Icon: Youtube, url: SITE.social.youtube, name: 'YouTube' },
              ] as const).filter(x => x.url).map(({ Icon, url, name }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
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
              {([
                SITE.phone ? { icon: Phone, value: SITE.phone, href: telHref(SITE.phone) } : null,
                { icon: Mail, value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: MapPin, value: t.contact.address, href: SITE.mapsUrl || null },
              ].filter(Boolean) as { icon: typeof Phone; value: string; href: string | null }[])
                .map(({ icon: Icon, value, href }) => {
                  const Wrapper = href ? 'a' : 'div';
                  return (
                    <Wrapper key={value} {...(href ? { href } : {})} className={`flex items-start gap-3 text-dark-300 transition-colors${href ? ' hover:text-white' : ''}`}>
                      <Icon size={15} className="text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{value}</span>
                    </Wrapper>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24 md:pb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href={`/${slug}/privacy`} className="hover:text-dark-300 transition-colors">{t.footer.privacy}</a>
            <a href={`/${slug}/terms`} className="hover:text-dark-300 transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}