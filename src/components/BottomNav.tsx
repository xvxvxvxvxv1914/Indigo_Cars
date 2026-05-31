import { Home, Car, Info, MessageCircle, Phone } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Начало', href: '#hero' },
  { icon: Car, label: 'Предложения', href: '#offers' },
  { icon: Info, label: 'За нас', href: '#why-us' },
  { icon: MessageCircle, label: 'Контакти', href: '#contact' },
  { icon: Phone, label: 'Обади се', href: 'tel:+359888000000' },
];

export default function BottomNav() {
  const handleClick = (href: string) => {
    if (href.startsWith('tel')) return;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-md"
      style={{ background: 'rgba(10,10,26,0.97)', borderTop: '1px solid #2a2850' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => {
              if (!href.startsWith('tel')) {
                e.preventDefault();
                handleClick(href);
              }
            }}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-dark-300 hover:text-primary-400 transition-all active:scale-95"
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
