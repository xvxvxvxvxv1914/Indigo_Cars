import { useEffect, useRef } from 'react';
import { Gavel, Ship, FileCheck, Car, Search, Wrench } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Търсене и избор',
    description:
      'Намираме точно автомобила, който търсите — по марка, модел, година и бюджет. Проверяваме историята и техническото състояние преди наддаване.',
    highlight: false,
  },
  {
    icon: Gavel,
    title: 'Участие в търг',
    description:
      'Наддаваме от ваше име на водещите американски търгове — Copart, IAAI, Manheim. Пълна прозрачност с реални снимки и доклади.',
    highlight: true,
  },
  {
    icon: Ship,
    title: 'Морски транспорт',
    description:
      'Организираме транспорта от американска пристанище до Ротердам. Проследявайте контейнера си в реално време с нашата система.',
    highlight: false,
  },
  {
    icon: FileCheck,
    title: 'Митническо оформяне',
    description:
      'Обработваме всички митнически документи за внос в ЕС — сертификати, акцизи, COC документи. Без изненади, без скрити такси.',
    highlight: false,
  },
  {
    icon: Car,
    title: 'Доставка до вкъщи',
    description:
      'Доставяме директно до вашия адрес в България или желана страна в Европа. Финалният транспорт е включен в нашата услуга.',
    highlight: false,
  },
  {
    icon: Wrench,
    title: 'Техническа помощ',
    description:
      'Партньорски сервизи за оглед и ремонт. Помагаме с регистрация и технически преглед (КАТ) след получаване на автомобила.',
    highlight: false,
  },
];

export default function Services() {
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
    <section id="services" className="py-24 bg-navy-900/50 relative" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-primary-600/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">Нашите услуги</p>
          <h2 className="section-title mb-4">
            Всичко от{' '}
            <span className="text-gradient">търга до вашия гараж</span>
          </h2>
          <p className="section-subtitle">
            Предлагаме пълен пакет от услуги — от намиране на идеалния автомобил до неговата
            доставка и регистрация в България.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`animate-on-scroll card-hover rounded-2xl p-8 border transition-all duration-300 ${
                  service.highlight
                    ? 'bg-primary-600/15 border-primary-500/50 relative overflow-hidden'
                    : 'bg-navy-800/40 border-primary-600/20 hover:border-primary-500/40'
                }`}
              >
                {service.highlight && (
                  <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Популярна
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    service.highlight
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-600/20 text-primary-300'
                  }`}
                >
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-dark-300 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom image strip */}
        <div className="mt-16 rounded-2xl overflow-hidden relative h-64 animate-on-scroll">
          <img
            src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop"
            alt="Car transport ship"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 to-navy-950/40 flex items-center px-12">
            <div className="max-w-md">
              <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-2">
                Ротердам — Европейският хъб
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">
                Транзит за цяла Европа
              </h3>
              <p className="text-dark-300 text-sm">
                Пристанище Ротердам е входът ни за разпределение на автомобили до всяка точка в
                Европа — България, Румъния, Германия, Франция и още.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
