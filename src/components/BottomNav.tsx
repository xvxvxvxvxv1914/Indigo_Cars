'use client';

import { Home, Car, Building2, MessageCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLang } from '../context/LangContext';

export default function BottomNav() {
  const { t } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Home,         label: t.nav.home,    href: '#hero',     type: 'scroll' },
    { icon: Car,          label: t.nav.offers,  href: '#offers',   type: 'scroll' },
    { icon: Building2,    label: 'B2B',          href: '/b2b',      type: 'route'  },
    { icon: MessageCircle,label: t.nav.contact, href: '#contact',  type: 'scroll' },
    { icon: Shield,       label: t.nav.whyUs,   href: '#why-us',   type: 'scroll' },
  ];

  const handleScroll = (href: string) => {
    if (pathname !== '/') {
      router.push('/' + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: 'var(--bg-nav)',
        borderTop: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map(({ icon: Icon, label, href, type }) => {
          const isB2B = type === 'route';
          const isActive = isB2B && pathname === '/b2b';
          const itemStyle = { color: isActive ? '#691EB9' : 'rgba(213,198,224,0.8)' };

          if (isB2B) {
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl transition-all active:scale-95 min-w-0"
                style={itemStyle}
              >
                <Icon size={19} />
                <span className="text-[10px] font-medium truncate w-full text-center leading-tight">{label}</span>
              </Link>
            );
          }

          return (
            <a key={href} href={href}
              onClick={(e) => { e.preventDefault(); handleScroll(href); }}
              className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl transition-all active:scale-95 min-w-0"
              style={itemStyle}
            >
              <Icon size={19} />
              <span className="text-[10px] font-medium truncate w-full text-center leading-tight">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
