import type { Metadata } from 'next';

const T: Record<string, { title: string; description: string }> = {
  bg: { title: 'B2B — Внос на автомобили на едро за дилъри', description: 'B2B услуги за автокъщи и дилъри: внос на автомобили от търгове в САЩ и Канада на едро, с пълно документално обслужване и конкурентни цени.' },
  ru: { title: 'B2B — Оптовый импорт автомобилей для дилеров', description: 'B2B услуги для автосалонов и дилеров: оптовый импорт автомобилей с аукционов США и Канады с полным документальным обслуживанием и конкурентными ценами.' },
  en: { title: 'B2B — Wholesale Car Import for Dealers', description: 'B2B services for car dealers: wholesale car import from US and Canadian auctions with full documentation handling and competitive prices.' },
  ro: { title: 'B2B — Import auto en-gros pentru dealeri', description: 'Servicii B2B pentru dealeri auto: import auto en-gros de la licitații din SUA și Canada cu servicii complete de documentație și prețuri competitive.' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = T[lang] ?? T.bg;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/b2b`,
      languages: { bg: '/bg/b2b', ru: '/ru/b2b', en: '/en/b2b', ro: '/ro/b2b', 'x-default': '/bg/b2b' },
    },
    openGraph: {
      title: `Indigo Cars ${t.title}`,
      description: t.description,
      url: `https://indigocars.eu/${lang}/b2b`,
    },
  };
}

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
