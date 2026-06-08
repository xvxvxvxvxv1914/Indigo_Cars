import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import { LangProvider } from '../context/LangContext';
import GlobalChrome from '../components/GlobalChrome';
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
  title: 'Indigo Cars — Вносител на автомобили от САЩ и Канада',
  description: 'Поръчков внос на автомобили от търгове в САЩ и Канада. Доставка до България и Европа. Пълно документално обслужване — вие само получавате колата.',
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://indigocars.eu',
    siteName: 'Indigo Cars',
    title: 'Indigo Cars — Твоята кола от търга директно до теб',
    description: 'Купуваме директно от търговете в САЩ и Канада. Транспортираме до България и цяла Европа. Пълно документално обслужване — без главоболия, без скрити разходи.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indigo Cars — Твоята кола от търга директно до теб',
    description: 'Поръчков внос на автомобили от САЩ и Канада. Доставка до България и цяла Европа.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* Blocking theme script — prevents flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <link rel="preload" as="image" href="/hero-image.webp" />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <GlobalChrome />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
