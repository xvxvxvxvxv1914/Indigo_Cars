import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Какви автомобили можете да внесете?',
    a: 'Внасяме всякакви автомобили — нови, употребявани, с малки щети или тотални отписвания от застрахователи. Специализирани сме в американски марки, но внасяме японски, европейски и всякакви други марки достъпни на американските търгове.',
  },
  {
    q: 'Колко струва вносът на автомобил?',
    a: 'Разходите зависят от цената на автомобила, вида транспорт и митническите такси. Обикновено транспортните и митническите разходи варират между €1500 и €3500. Ние ви даваме пълна калкулация предварително без скрити такси.',
  },
  {
    q: 'Колко дълго трае процесът?',
    a: 'Обикновено от момента на покупка до получаване на автомобила са нужни 6-8 седмици. Товарна кораб до Ротердам — 3-4 седмици, митническо оформяне — 1-2 седмици, транспорт до България — 3-5 дни.',
  },
  {
    q: 'Мога ли да следя доставката?',
    a: 'Да, предоставяме ви проследяващ номер на контейнера. Ще ви информираме на всяка ключова стъпка — покупка, натоварване, отплаване, пристигане в Ротердам, митница, доставка до вас.',
  },
  {
    q: 'Какви документи ще получа?',
    a: 'Получавате американски Title (собственически документ), Bill of Lading (морски товарителница), CMR, митнически декларации и COC сертификат за регистрация в ЕС. Всичко необходимо за регистрация в КАТ.',
  },
  {
    q: 'Внасяте ли коли с щети?',
    a: 'Да, специализираме се именно в коли с щети от Copart и IAAI. Много от тях имат козметични или леки повреди и са изключително изгодни. При желание можем да организираме ремонт след пристигане.',
  },
  {
    q: 'Работите ли с Европейски клиенти, не само България?',
    a: 'Да, внасяме автомобили за клиенти из цяла Европа. Ротердам е нашата централна точка и оттам разпределяме за Румъния, Германия, Австрия, Франция и всяка друга страна в ЕС.',
  },
  {
    q: 'Как да започна?',
    a: 'Свържете се с нас по телефон или чрез формата за контакт. Ще ви проведем безплатна консултация, ще обсъдим какво търсите и ще ви дадем точна оферта без ангажимент.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
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
    <section id="faq" className="py-24 relative" style={{ background: '#0a0a1a' }} ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.2), transparent)' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="section-label">Въпроси и отговори</p>
          <h2 className="section-title mb-8">
            Често задавани{' '}
            <span className="text-gradient section-title-accent">въпроси</span>
          </h2>
          <p className="section-subtitle">
            Намерете отговор на най-честите въпроси. Не намирате отговор? Свържете се с нас.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="animate-on-scroll rounded-xl overflow-hidden transition-all"
              style={{
                background: '#12102a',
                border: `1px solid ${openIndex === index ? 'rgba(124,58,237,0.4)' : '#2a2850'}`,
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-primary-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-dark-300 px-6 pb-5 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
