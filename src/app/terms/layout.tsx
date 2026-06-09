import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Общи условия — Indigo Cars',
  description: 'Общи условия за ползване на услугите на Indigo Cars за внос на автомобили от търгове в САЩ и Канада.',
  alternates: { canonical: '/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
