import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2B — Внос на автомобили на едро за дилъри',
  description: 'B2B услуги за автокъщи и дилъри: внос на автомобили от търгове в САЩ и Канада на едро, с пълно документално обслужване и конкурентни цени.',
  alternates: { canonical: '/b2b' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://indigocars.eu/b2b',
    siteName: 'Indigo Cars',
    title: 'Indigo Cars B2B — Внос на автомобили на едро за дилъри',
    description: 'B2B услуги за автокъщи и дилъри: внос от търгове в САЩ и Канада на едро.',
  },
};

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
