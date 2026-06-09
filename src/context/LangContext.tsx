'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Lang, LANG_SLUGS, SLUG_TO_LANG } from '@/lib/i18n';
import bg from '@/locales/bg.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ro from '@/locales/ro.json';

export type { Lang };
export type Translations = typeof bg;

// All locale files must match the shape of bg.json — TypeScript will error at build time if a key is missing
const translations: Record<Lang, Translations> = { BG: bg, EN: en, RU: ru, RO: ro };

const LangContext = createContext<{
  lang: Lang;
  slug: string;
  setLang: (l: Lang) => void;
  t: Translations;
}>({
  lang: 'BG',
  slug: 'bg',
  setLang: () => {},
  t: bg,
});

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (l: Lang) => {
    const newSlug = LANG_SLUGS[l];
    const segments = pathname.split('/');
    // segments[0] === '' (leading slash); segments[1] is the current locale slug
    if (segments[1] && SLUG_TO_LANG[segments[1]]) {
      segments[1] = newSlug;
    } else {
      segments.splice(1, 0, newSlug);
    }
    const newPath = segments.join('/') || `/${newSlug}`;
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${newSlug}; path=/; max-age=31536000; samesite=lax`;
    }
    router.push(newPath);
  };

  return (
    <LangContext.Provider value={{ lang, slug: LANG_SLUGS[lang], setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
