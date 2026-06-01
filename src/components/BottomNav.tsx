import { Home, Car, Info, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function BottomNav() {
  const { t, lang } = useLang();

  const navItems = [
    { icon: Home, label: t.nav.home, href: '#hero' },
    { icon: Car, label: t.nav.offers, href: '#offers' },
    { icon: Info, label: t.nav.whyUs, href: '#why-us' },
    { icon: MessageCircle, label: t.nav.contact, href: '#contact' },
    { icon: Phone, label: lang === 'BG' ? 'Обади се' : lang === 'RU' ? 'Звонок' : 'Call', href: '#contact' },
  ];

  const handleClick = (href: string) => {
    if (href.startsWith('tel') || href === '#') return;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: 'rgba(10,10,26,0.97)',
        borderTop: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              if (!href.startsWith('tel') && href !== '#') {
                e.preventDefault();
                handleClick(href);
              }
            }}
            className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl text-dark-300 hover:text-primary-400 transition-all active:scale-95 min-w-0"
          >
            <Icon size={19} />
            <span className="text-[10px] font-medium truncate w-full text-center leading-tight">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
