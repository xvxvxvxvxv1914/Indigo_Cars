'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function CookieConsent() {
  const { t, slug } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const handle = (accepted: boolean) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  // The banner is a dark surface in BOTH themes (--bg-nav is navy in light mode too),
  // so its colours are fixed rather than theme variables: with .text-dark-300 and
  // --text-secondary the light theme turned the text and the "decline" button dark
  // purple on navy (1.1:1) — only "accept" stayed visible.
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] px-4 py-4 md:py-3"
      style={{
        background: 'var(--bg-nav)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Cookie size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#c4b5fd' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(231,228,240,0.85)' }}>
            {t.cookieConsent.text}
            <a href={`/${slug}/privacy`} className="underline underline-offset-2 transition-colors hover:text-white" style={{ color: '#c4b5fd' }}>
              {t.cookieConsent.privacyLink}
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
          <button
            onClick={() => handle(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            <X size={12} />
            {t.cookieConsent.decline}
          </button>
          <button
            onClick={() => handle(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #691EB9, #4a158a)', color: 'white' }}
          >
            <Check size={12} />
            {t.cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
