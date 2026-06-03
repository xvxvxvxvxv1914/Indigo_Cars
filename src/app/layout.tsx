import type { Metadata } from 'next';
import { ThemeProvider } from '../context/ThemeContext';
import { LangProvider } from '../context/LangContext';
import GlobalChrome from '../components/GlobalChrome';
import './globals.css';

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
    <html lang="bg" suppressHydrationWarning>
      <head>
        {/* Blocking theme script — prevents flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@500;600;700;800&display=swap"
        />
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
