'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function CookieConsent() {
  const { t } = useLang();
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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] px-4 py-4 md:py-3"
      style={{
        background: 'var(--bg-nav)',
        borderTop: '1px solid var(--border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Cookie size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
          <p className="text-dark-300 text-xs leading-relaxed">
            {t.cookieConsent.text}
            <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
              {t.cookieConsent.privacyLink}
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
          <button
            onClick={() => handle(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
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
