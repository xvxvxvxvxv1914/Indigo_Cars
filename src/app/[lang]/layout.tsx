import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LangProvider } from '@/context/LangContext';
import { SLUG_TO_LANG, SUPPORTED_SLUGS } from '@/lib/i18n';
import GlobalChrome from '@/components/GlobalChrome';

const META: Record<string, { title: string; description: string; ogLocale: string }> = {
  bg: {
    title: 'Indigo Cars — Вносител на автомобили от САЩ и Канада',
    description: 'Поръчков внос на автомобили от търгове в САЩ и Канада. Доставка до България и Европа. Пълно документално обслужване — вие само получавате колата.',
    ogLocale: 'bg_BG',
  },
  ru: {
    title: 'Indigo Cars — Импорт автомобилей из США и Канады',
    description: 'Заказной импорт автомобилей с аукционов США и Канады. Доставка в Болгарию и Европу. Полное документальное сопровождение — вы только получаете автомобиль.',
    ogLocale: 'ru_RU',
  },
  en: {
    title: 'Indigo Cars — Car Import from the USA & Canada',
    description: 'Custom car import from auctions in the USA and Canada. Delivery to Bulgaria and Europe. Full documentation handling — you just receive the car.',
    ogLocale: 'en_US',
  },
  ro: {
    title: 'Indigo Cars — Import auto din SUA și Canada',
    description: 'Import auto la comandă de la licitații din SUA și Canada. Livrare în Bulgaria și Europa. Servicii complete de documentație — tu doar primești mașina.',
    ogLocale: 'ro_RO',
  },
};

const HREFLANG: Record<string, string> = { bg: '/bg', ru: '/ru', en: '/en', ro: '/ro' };

export function generateStaticParams() {
  return SUPPORTED_SLUGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = META[lang] ?? META.bg;
  return {
    title: { default: meta.title, template: '%s — Indigo Cars' },
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...HREFLANG, 'x-default': '/bg' },
    },
    openGraph: {
      type: 'website',
      locale: meta.ogLocale,
      url: `https://indigocars.eu/${lang}`,
      siteName: 'Indigo Cars',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: slug } = await params;
  const lang = SLUG_TO_LANG[slug];
  if (!lang) notFound();
  return (
    <LangProvider lang={lang}>
      <GlobalChrome />
      {children}
    </LangProvider>
  );
}
