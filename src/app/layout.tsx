import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import { LangProvider } from '../context/LangContext';
import GlobalChrome from '../components/GlobalChrome';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
  metadataBase: new URL('https://autoimport.bg'),
  title: 'AutoImport BG - Вносител на автомобили от САЩ и Канада',
  description: 'Специализирани в внос на автомобили от американски и канадски търгове. Доставка до България и Европа през Ротердам. Пълно документално обслужване.',
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://autoimport.bg',
    title: 'AutoImport BG - Вносител на автомобили от САЩ и Канада',
    description: 'Купуваме директно от търговете в САЩ и Канада. Транспортираме до България и цяла Европа. Пълно документално обслужване — вие само получавате колата.',
    images: [{ url: '/hero-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoImport BG - Вносител на автомобили от САЩ и Канада',
    description: 'Купуваме директно от търговете в САЩ и Канада. Транспортираме до България и цяла Европа.',
    images: ['/hero-image.webp'],
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
