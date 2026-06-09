import type { Metadata } from 'next';

const T: Record<string, { title: string; description: string }> = {
  bg: { title: 'Политика за поверителност', description: 'Политика за поверителност и защита на личните данни на Indigo Cars съгласно Регламент (ЕС) 2016/679 (GDPR).' },
  ru: { title: 'Политика конфиденциальности', description: 'Политика конфиденциальности и защиты персональных данных Indigo Cars в соответствии с Регламентом (ЕС) 2016/679 (GDPR).' },
  en: { title: 'Privacy Policy', description: 'Privacy policy and personal data protection of Indigo Cars in accordance with Regulation (EU) 2016/679 (GDPR).' },
  ro: { title: 'Politica de Confidențialitate', description: 'Politica de confidențialitate și protecția datelor personale ale Indigo Cars conform Regulamentului (UE) 2016/679 (GDPR).' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = T[lang] ?? T.bg;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { bg: '/bg/privacy', ru: '/ru/privacy', en: '/en/privacy', ro: '/ro/privacy', 'x-default': '/bg/privacy' },
    },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
