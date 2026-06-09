import type { Metadata } from 'next';

const T: Record<string, { title: string; description: string }> = {
  bg: { title: 'Общи условия', description: 'Общи условия за ползване на услугите на Indigo Cars за внос на автомобили от търгове в САЩ и Канада.' },
  ru: { title: 'Условия использования', description: 'Условия использования услуг Indigo Cars по импорту автомобилей с аукционов США и Канады.' },
  en: { title: 'Terms & Conditions', description: 'Terms and conditions for using Indigo Cars car import services from US and Canadian auctions.' },
  ro: { title: 'Termeni și Condiții', description: 'Termeni și condiții pentru utilizarea serviciilor Indigo Cars de import auto de la licitații din SUA și Canada.' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = T[lang] ?? T.bg;
  return { title: t.title, description: t.description, alternates: { canonical: `/${lang}/terms` } };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
