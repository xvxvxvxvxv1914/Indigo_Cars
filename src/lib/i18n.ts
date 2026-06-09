// Locale config — plain module (no 'use client'), so it can be imported by both
// server components (layouts, generateStaticParams) and client components (LangContext).

export type Lang = 'BG' | 'RO' | 'EN' | 'RU';

// URL slug <-> Lang mapping (URLs use lowercase: /bg, /ru, /en, /ro)
export const LANG_SLUGS: Record<Lang, string> = { BG: 'bg', RO: 'ro', EN: 'en', RU: 'ru' };
export const SLUG_TO_LANG: Record<string, Lang> = { bg: 'BG', ro: 'RO', en: 'EN', ru: 'RU' };
export const SUPPORTED_SLUGS = Object.keys(SLUG_TO_LANG);
export const DEFAULT_SLUG = 'bg';
