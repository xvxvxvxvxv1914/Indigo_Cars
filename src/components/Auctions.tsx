'use client';

import { useEffect, useRef } from 'react';

const auctions = [
  {
    name: 'Copart',
    country: 'САЩ / Канада',
    description:
      'Най-голямата онлайн платформа за застрахователни и употребявани автомобили. Над 150 000 лота седмично.',
    logo: 'COPART',
    color: '#0066cc',
    link: '#',
  },
  {
    name: 'IAAI',
    country: 'САЩ / Канада',
    description:
      'Insurance Auto Auctions — водеща платформа за застрахователни автомобили с хиляди локации в Северна Америка.',
    logo: 'IAAI',
    color: '#e63946',
    link: '#',
  },
  {
    name: 'Manheim',
    country: 'САЩ',
    description:
      'Световният лидер в дилърски търгове. Premиум използвани автомобили от флоти и дилъри.',
    logo: 'MANHEIM',
    color: '#2d6a4f',
    link: '#',
  },
  {
    name: 'ADESA',
    country: 'САЩ / Канада',
    description:
      'Голяма мрежа от дилърски търгове с качествени употребявани автомобили на конкурентни цени.',
    logo: 'ADESA',
    color: '#e76f51',
    link: '#',
  },
];

const routePoints = [
  { city: 'Ню Йорк', flag: '🇺🇸', role: 'Търг / Склад' },
  { city: 'Лос Анджелис', flag: '🇺🇸', role: 'Търг / Пристанище' },
  { city: 'Ротердам', flag: '🇳🇱', role: 'ЕС Хъб' },
  { city: 'София', flag: '🇧🇬', role: 'Крайна дестинация' },
];

export default function Auctions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="auctions" className="py-24 bg-navy-900/50 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">Нашите партньори</p>
          <h2 className="section-title mb-4">
            Директен достъп до{' '}
            <span className="text-gradient">водещите търгове</span>
          </h2>
          <p className="section-subtitle">
            Имаме лицензиран акаунт за дилъри на всички основни американски и канадски търгове,
            което ни дава достъп до хиляди автомобили на отлични цени.
          </p>
        </div>

        {/* Auction Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {auctions.map((auction) => (
            <div
              key={auction.name}
              className="animate-on-scroll card-hover bg-navy-800/40 border border-primary-600/25 hover:border-primary-500/40 rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Logo placeholder */}
              <div
                className="w-full h-16 rounded-xl flex items-center justify-center font-display text-2xl tracking-widest"
                style={{ backgroundColor: auction.color + '20', color: auction.color }}
              >
                {auction.logo}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-white">{auction.name}</h3>
                  <span className="text-xs text-dark-400">{auction.country}</span>
                </div>
                <p className="text-dark-300 text-sm leading-relaxed">{auction.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Route Visualization */}
        <div className="animate-on-scroll bg-navy-800/40 border border-primary-600/25 rounded-2xl p-8">
          <p className="text-center section-label mb-8">Маршрутът на вашия автомобил</p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {routePoints.map((point, index) => (
              <div key={point.city} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">{point.flag}</div>
                  <div className="font-semibold text-white text-sm">{point.city}</div>
                  <div className="text-xs text-primary-500 mt-1">{point.role}</div>
                </div>
                {index < routePoints.length - 1 && (
                  <div className="hidden sm:flex items-center gap-1 text-dark-500">
                    <div className="w-8 h-px bg-primary-600/40" />
                    <div className="w-2 h-2 border-r-2 border-t-2 border-primary-600/40 rotate-45 -ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Средно транзитно време', value: '6-8 седмици' },
              { label: 'Тарифен диапазон', value: 'от €1500' },
              { label: 'Контейнерен тип', value: 'RoRo / Container' },
              { label: 'Застраховка', value: 'Включена' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-lg font-bold text-gradient">{item.value}</div>
                <div className="text-xs text-dark-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}