import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика за поверителност — Indigo Cars',
  description: 'Политика за поверителност и защита на личните данни на Indigo Cars съгласно Регламент (ЕС) 2016/679 (GDPR).',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
