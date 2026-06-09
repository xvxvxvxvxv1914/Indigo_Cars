import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['bg', 'ro', 'en', 'ru'];
const DEFAULT_LOCALE = 'bg';

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;

  const accept = req.headers.get('accept-language');
  if (accept) {
    const preferred = accept.split(',').map((s) => s.split(';')[0].trim().toLowerCase());
    for (const p of preferred) {
      const base = p.split('-')[0];
      if (LOCALES.includes(base)) return base;
    }
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];

  // Already has a locale prefix → just expose it to the root layout via a header
  if (LOCALES.includes(first)) {
    const headers = new Headers(req.headers);
    headers.set('x-locale', first);
    return NextResponse.next({ request: { headers } });
  }

  // No locale prefix → redirect to the localized URL (temporary: locale may vary per visitor)
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclude API, Next internals, admin (BG-only), the OG image route, and any file with an extension
  matcher: ['/((?!api|_next|admin|opengraph-image|.*\\..*).*)'],
};
