import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter, Manrope } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://indigocars.eu'),
  // Plain title for non-localized routes (admin). The [lang] layout sets its own title + template.
  title: 'Indigo Cars — Вносител на автомобили от САЩ и Канада',
  description: 'Поръчков внос на автомобили от търгове в САЩ и Канада. Доставка до България и Европа. Пълно документално обслужване — вие само получавате колата.',
  twitter: {
    card: 'summary_large_image',
    title: 'Indigo Cars — Твоята кола от търга директно до теб',
    description: 'Поръчков внос на автомобили от САЩ и Канада. Доставка до България и цяла Европа.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Indigo Cars',
  url: 'https://indigocars.eu',
  logo: 'https://indigocars.eu/logo.png',
  image: 'https://indigocars.eu/opengraph-image',
  description: 'Поръчков внос на автомобили от търгове в САЩ и Канада. Доставка до България и цяла Европа с пълно документално обслужване.',
  email: 'info@indigocars.eu',
  areaServed: ['BG', 'RO', 'EU'],
  knowsLanguage: ['bg', 'ru', 'en', 'ro'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Locale is set by middleware (x-locale header); admin / non-localized routes default to bg
  const locale = (await headers()).get('x-locale') || 'bg';

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* Blocking theme script — prevents flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="preload" as="image" href="/hero-image.webp" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
