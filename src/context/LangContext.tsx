'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import bg from '@/locales/bg.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ro from '@/locales/ro.json';

export type Lang = 'BG' | 'RO' | 'EN' | 'RU';

const translations = { BG: bg, EN: en, RU: ru, RO: ro };

const SUPPORTED_LANGS = Object.keys(translations) as Lang[];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof bg;
}>({
  lang: 'BG',
  setLang: () => {},
  t: bg,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') as Lang;
      if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    }
    return 'BG';
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
