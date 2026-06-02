import { useEffect } from 'react';
import {
  Globe, Car, Ship, FileText, Shield, Users,
  Search, CheckCircle, Phone, Mail, MapPin,
  Package, MessageCircle, Gavel, Truck, Building2
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const STATS = [
  { value: '3',     suffix: '',  icon: Globe,   label: { BG: 'Държави на доставка', EN: 'Delivery Countries', RU: 'Страны доставки' }, sub: { BG: '🇺🇸 САЩ · 🇨🇦 Канада · 🇰🇷 Корея', EN: '🇺🇸 USA · 🇨🇦 Canada · 🇰🇷 Korea', RU: '🇺🇸 США · 🇨🇦 Канада · 🇰🇷 Корея' } },
  { value: '1500',  suffix: '+', icon: Car,     label: { BG: 'Доставени автомобила', EN: 'Cars Delivered', RU: 'Доставлено авто' }, sub: null },
  { value: '300',   suffix: '+', icon: Users,   label: { BG: 'Бизнес партньори', EN: 'Business Partners', RU: 'Бизнес-партнёров' }, sub: null },
  { value: '100',   suffix: '%', icon: Shield,  label: { BG: 'Прозрачност и контрол', EN: 'Transparency', RU: 'Прозрачность' }, sub: null },
];

const SERVICES = [
  { icon: Search,    label: { BG: 'Изкупуване на автомобили', EN: 'Car Sourcing', RU: 'Выкуп автомобилей' },         desc: { BG: 'Наддаваме на търгове в САЩ, Канада и Корея от ваше име.', EN: 'We bid at auctions in the USA, Canada and Korea on your behalf.', RU: 'Участвуем в торгах в США, Канаде и Корее от вашего имени.' } },
  { icon: Ship,      label: { BG: 'Морска логистика', EN: 'Ocean Logistics', RU: 'Морская логистика' },              desc: { BG: 'Организираме транспорт до Ротердам и оттам до вас.', EN: 'We arrange transport to Rotterdam and onward to you.', RU: 'Организуем транспортировку до Роттердама и далее.' } },
  { icon: FileText,  label: { BG: 'Митническо оформяне', EN: 'Customs Clearance', RU: 'Таможенное оформление' },    desc: { BG: 'Пълно документално обслужване при вноса в ЕС.', EN: 'Full documentation and EU import clearance.', RU: 'Полное документальное сопровождение при импорте в ЕС.' } },
  { icon: Package,   label: { BG: 'Таможена очистка', EN: 'Customs Release', RU: 'Таможенная очистка' },            desc: { BG: 'Бърза и безпроблемна процедура на границата.', EN: 'Fast and smooth border clearance procedure.', RU: 'Быстрая и беспроблемная процедура на границе.' } },
  { icon: Users,     label: { BG: 'Консултация при подбор', EN: 'Selection Consulting', RU: 'Консультации' },       desc: { BG: 'Помагаме ви да намерите точния автомобил за вашия бизнес.', EN: 'We help you find the right vehicle for your business.', RU: 'Помогаем найти подходящий автомобиль для вашего бизнеса.' } },
];

const STEPS = [
  { icon: MessageCircle, label: { BG: 'Запитване', EN: 'Inquiry', RU: 'Запрос' },           desc: { BG: 'Споделете изискванията и предпочитанията си.', EN: 'Share your requirements and preferences.', RU: 'Поделитесь требованиями и предпочтениями.' } },
  { icon: Search,        label: { BG: 'Подбор и оферта', EN: 'Selection & Quote', RU: 'Подбор и оффер' }, desc: { BG: 'Намираме най-добрите опции и предоставяме оферта.', EN: 'We find the best options and provide a quote.', RU: 'Находим лучшие варианты и предоставляем оффер.' } },
  { icon: Gavel,         label: { BG: 'Изкупуване', EN: 'Purchase', RU: 'Выкуп' },          desc: { BG: 'Изкупуваме автомобила на най-добра цена.', EN: 'We purchase the vehicle at the best price.', RU: 'Выкупаем автомобиль по лучшей цене.' } },
  { icon: Ship,          label: { BG: 'Доставка', EN: 'Shipping', RU: 'Доставка' },          desc: { BG: 'Транспортираме автомобила до България.', EN: 'We transport the vehicle to Bulgaria.', RU: 'Транспортируем автомобиль в Болгарию.' } },
  { icon: Truck,         label: { BG: 'Митница и доставка', EN: 'Customs & Delivery', RU: 'Таможня и доставка' }, desc: { BG: 'Митническо оформяне и доставка до вас.', EN: 'Customs clearance and final delivery.', RU: 'Таможенное оформление и доставка до вас.' } },
];

const REASONS = [
  { BG: 'Достъп до хиляди автомобили всеки ден', EN: 'Access to thousands of cars every day', RU: 'Доступ к тысячам авто ежедневно' },
  { BG: 'Прозрачен процес и пълно съдействие', EN: 'Transparent process and full support', RU: 'Прозрачный процесс и полное содействие' },
  { BG: 'Най-добри цени без скрити такси', EN: 'Best prices with no hidden fees', RU: 'Лучшие цены без скрытых комиссий' },
  { BG: 'Доставка до всяка точка в България', EN: 'Delivery anywhere in Bulgaria', RU: 'Доставка в любую точку Болгарии' },
];

export default function B2B() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const light = theme === 'light';

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-observe]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const tr = (obj: Record<string, string>) => obj[lang] ?? obj.BG;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Navbar darkBg />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '75vh' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
            alt="B2B логистика"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000E38]/[0.92] via-[#000E38]/[0.75] to-[#000E38]/[0.25]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000E38]/80 via-transparent to-transparent" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, transparent, #691EB9, #4a158a, transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow — same style as main hero */}
            <div className="hero-stagger flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
              <div className="h-px w-10" style={{ background: 'linear-gradient(to right, #691EB9, #4a158a)' }} />
              <span className="text-primary-400 font-semibold text-xs uppercase tracking-[0.25em]">
                {lang === 'BG' ? 'B2B Партньорство' : lang === 'RU' ? 'B2B Партнёрство' : 'B2B Partnership'}
              </span>
            </div>

            <h1 className="hero-stagger font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-5" style={{ animationDelay: '0.18s', color: 'white' }}>
              {lang === 'BG' ? <>Комплексни решения<br /><span className="text-gradient">за вашия бизнес</span></> :
               lang === 'RU' ? <>Комплексные решения<br /><span className="text-gradient">для вашего бизнеса</span></> :
               <>Complex solutions<br /><span className="text-gradient">for your business</span></>}
            </h1>

            <p className="hero-stagger text-base md:text-lg leading-relaxed mb-8" style={{ animationDelay: '0.32s', color: 'rgba(213,198,224,0.9)' }}>
              {lang === 'BG'
                ? 'INDIGO CARS предлага пълна гама услуги за бизнес партньори – от изкупуване на автомобили в САЩ, Канада и Корея до доставка и митническо оформяне в България.'
                : lang === 'RU'
                ? 'INDIGO CARS предлагает полный спектр услуг для бизнес-партнёров – от выкупа авто в США, Канаде и Корее до доставки и таможенного оформления в Болгарии.'
                : 'INDIGO CARS offers a full range of services for business partners – from sourcing vehicles in the USA, Canada and Korea to delivery and customs clearance in Bulgaria.'}
            </p>

            <div className="hero-stagger flex flex-col sm:flex-row gap-4 mb-8" style={{ animationDelay: '0.46s' }}>
              <button onClick={() => scrollTo('b2b-contact')} className="btn-primary text-center text-base">
                {lang === 'BG' ? 'Свържете се с нас' : lang === 'RU' ? 'Связаться с нами' : 'Contact Us'}
              </button>
              <button
                onClick={() => scrollTo('b2b-how')}
                className="font-semibold px-6 py-3 rounded-lg transition-all duration-300 active:scale-95 text-base border-2 hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.45)', color: 'white' }}
              >
                {lang === 'BG' ? 'Как работим' : lang === 'RU' ? 'Как мы работаем' : 'How We Work'}
              </button>
            </div>

            {/* Trust badges — same style as main hero */}
            <div className="hero-stagger flex flex-wrap gap-3" style={{ animationDelay: '0.60s' }}>
              {[
                { label: '🇺🇸 🇨🇦 🇰🇷' },
                { icon: Car,    label2: { BG: '1500+ доставени', EN: '1500+ delivered', RU: '1500+ доставлено' } },
                { icon: Shield, label2: { BG: '100% прозрачност', EN: '100% transparent', RU: '100% прозрачно' } },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(105,30,185,0.35)' }}>
                  {'label' in item
                    ? <span className="text-base leading-none tracking-wide">{item.label}</span>
                    : <>
                        {'icon' in item && item.icon && <item.icon size={13} className="text-primary-400" />}
                        <span className="text-xs font-medium" style={{ color: 'white' }}>{item.label2 ? tr(item.label2) : ''}</span>
                      </>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section data-observe className="py-12 relative" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(({ value, suffix, icon: Icon, label, sub }, i) => (
              <div key={i} className="animate-on-scroll gradient-border-card text-center backdrop-blur rounded-2xl p-4 sm:p-6">
                <Icon size={24} className="text-primary-400 mx-auto mb-2 sm:mb-3" />
                <div className="font-display text-2xl md:text-3xl lg:text-4xl text-gradient-stats mb-1 sm:mb-2">
                  {value}{suffix}
                </div>
                <div className="text-dark-300 text-xs sm:text-sm">{tr(label)}</div>
                {sub && <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{tr(sub)}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section data-observe className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-main)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
            <p className="section-label">
              {lang === 'BG' ? 'Услуги' : lang === 'RU' ? 'Услуги' : 'Services'}
            </p>
            <h2 className="section-title mb-4">
              {lang === 'BG' ? 'Нашите услуги' : lang === 'RU' ? 'Наши услуги' : 'Our Services'}{' '}
              <span className="text-gradient section-title-accent">
                {lang === 'BG' ? 'за B2B' : lang === 'RU' ? 'для B2B' : 'for B2B'}
              </span>
            </h2>
            <p className="section-subtitle">
              {lang === 'BG' ? 'Пълен пакет от решения за бизнес партньори — от търга до вашия склад.'
               : lang === 'RU' ? 'Полный пакет решений для бизнес-партнёров — от аукциона до вашего склада.'
               : 'A complete package of solutions for business partners — from the auction to your warehouse.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, label, desc }, i) => (
              <div key={i} className="animate-on-scroll gradient-border-card card-hover rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(105,30,185,0.15)' }}>
                  <Icon size={22} className="text-primary-400" />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{tr(label)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tr(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section id="b2b-how" data-observe className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-alt)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.25), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.15), transparent)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
            <p className="section-label">
              {lang === 'BG' ? 'Процесът' : lang === 'RU' ? 'Процесс' : 'Process'}
            </p>
            <h2 className="section-title mb-4">
              {lang === 'BG' ? 'Как работим с' : lang === 'RU' ? 'Как мы работаем с' : 'How we work with'}{' '}
              <span className="text-gradient section-title-accent">
                {lang === 'BG' ? 'B2B партньори' : lang === 'RU' ? 'B2B партнёрами' : 'B2B partners'}
              </span>
            </h2>
            <p className="section-subtitle">
              {lang === 'BG' ? 'Прозрачен и опростен процес — ние поемаме всичко сложното.'
               : lang === 'RU' ? 'Прозрачный и упрощённый процесс — мы берём на себя всё сложное.'
               : 'Transparent and simplified process — we handle all the complexity.'}
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden md:block relative">
            <div className="absolute" style={{ top: '3.25rem', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.5) 10%, rgba(105,30,185,0.5) 90%, transparent)' }} />
            <div className="grid grid-cols-5 gap-2">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="animate-on-scroll flex flex-col items-center text-center">
                    <div className="font-display text-xs font-bold mb-2 tracking-widest" style={{ color: 'rgba(105,30,185,0.7)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="relative z-10 rounded-full flex items-center justify-center mb-5 transition-all duration-300 hover:scale-110"
                      style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', boxShadow: '0 0 0 4px rgba(105,30,185,0.15), 0 0 20px rgba(105,30,185,0.25)' }}>
                      <Icon size={24} style={{ color: 'white' }} />
                    </div>
                    <h3 className="font-bold text-sm mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>{tr(step.label)}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tr(step.desc)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative">
            <div className="absolute top-0 bottom-0" style={{ left: '1.375rem', width: '2px', background: 'linear-gradient(to bottom, rgba(105,30,185,0.6), rgba(105,30,185,0.1))' }} />
            <div className="space-y-8">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="animate-on-scroll flex items-start gap-5 relative">
                    <div className="flex-shrink-0 rounded-full flex items-center justify-center relative z-10"
                      style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', boxShadow: '0 0 0 4px rgba(105,30,185,0.15)' }}>
                      <Icon size={22} style={{ color: 'white' }} />
                    </div>
                    <div className="pt-2">
                      <div className="font-display text-xs font-bold tracking-widest mb-1" style={{ color: 'rgba(105,30,185,0.7)' }}>{String(idx + 1).padStart(2, '0')}</div>
                      <div className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{tr(step.label)}</div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tr(step.desc)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INDIGO CARS ── */}
      <section data-observe className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-main)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <p className="section-label">
                {lang === 'BG' ? 'Защо ние' : lang === 'RU' ? 'Почему мы' : 'Why us'}
              </p>
              <h2 className="section-title mb-6">
                {lang === 'BG' ? 'Защо да изберете' : lang === 'RU' ? 'Почему выбирают' : 'Why choose'}{' '}
                <span className="text-gradient section-title-accent">Indigo Cars?</span>
              </h2>
              <p className="section-subtitle mb-8">
                {lang === 'BG' ? 'Работим с дилъри, автокъщи и корпоративни клиенти в цяла Европа.'
                 : lang === 'RU' ? 'Работаем с дилерами, автосалонами и корпоративными клиентами по всей Европе.'
                 : 'We work with dealers, showrooms and corporate clients across Europe.'}
              </p>
              <div className="space-y-4 mb-8">
                {REASONS.map((reason, i) => (
                  <div key={i} className="animate-on-scroll flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #691EB9, #4a158a)' }}>
                      <CheckCircle size={13} style={{ color: 'white' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{tr(reason)}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('b2b-contact')} className="btn-primary">
                {lang === 'BG' ? 'Станете партньор' : lang === 'RU' ? 'Стать партнёром' : 'Become a Partner'}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Building2, title: { BG: 'За дилъри', EN: 'For Dealers', RU: 'Для дилеров' }, desc: { BG: 'Изкупуваме партиди от 1 до 50+ автомобила на месец.', EN: 'We source 1 to 50+ vehicles per month.', RU: 'Выкупаем партии от 1 до 50+ авто в месяц.' } },
                { icon: Shield,    title: { BG: 'Гарантирани цени', EN: 'Guaranteed Prices', RU: 'Гарантированные цены' }, desc: { BG: 'Без скрити комисионни — само договорената цена.', EN: 'No hidden commissions — only the agreed price.', RU: 'Без скрытых комиссий — только оговорённая цена.' } },
                { icon: Globe,     title: { BG: '🇺🇸 🇨🇦 🇰🇷  Три държави', EN: '🇺🇸 🇨🇦 🇰🇷  Three Countries', RU: '🇺🇸 🇨🇦 🇰🇷  Три страны' }, desc: { BG: 'Изкупуваме от търгове в САЩ, Канада и Корея.', EN: 'We source from auctions in the USA, Canada and Korea.', RU: 'Выкупаем с аукционов в США, Канаде и Корее.' } },
                { icon: Car,       title: { BG: 'Всякакви марки', EN: 'All Brands', RU: 'Все марки' }, desc: { BG: 'Ford, BMW, Mercedes, Tesla, Jeep и много други.', EN: 'Ford, BMW, Mercedes, Tesla, Jeep and many more.', RU: 'Ford, BMW, Mercedes, Tesla, Jeep и многие другие.' } },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="animate-on-scroll gradient-border-card rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(105,30,185,0.15)' }}>
                    <Icon size={20} className="text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{tr(title)}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tr(desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="b2b-contact" data-observe className="py-12 pb-24 md:pb-12 relative" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #691EB9 0%, #000E38 100%)' }}>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none hidden md:block" style={{ background: 'rgba(105,30,185,0.3)' }} />
            <div className="relative z-10 max-w-xl">
              <p className="text-primary-300 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
                {lang === 'BG' ? 'Свържете се' : lang === 'RU' ? 'Свяжитесь' : 'Get in touch'}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight" style={{ color: 'white' }}>
                {lang === 'BG' ? 'Готови да работим заедно?' : lang === 'RU' ? 'Готовы работать вместе?' : 'Ready to work together?'}
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(231,228,240,0.8)' }}>
                {lang === 'BG' ? 'Свържете се с нас и нека развием вашия бизнес заедно.'
                  : lang === 'RU' ? 'Свяжитесь с нами и давайте развивать бизнес вместе.'
                  : "Contact us and let's grow your business together."}
              </p>
              <div className="flex flex-col gap-4">
                <a href="tel:+35989123456" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Phone size={16} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(231,228,240,0.6)' }}>{lang === 'BG' ? 'Телефон' : lang === 'RU' ? 'Телефон' : 'Phone'}</div>
                    <div className="text-sm font-semibold" style={{ color: 'white' }}>+359 89 123 4567</div>
                  </div>
                </a>
                <a href="mailto:b2b@indigocars.bg" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Mail size={16} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(231,228,240,0.6)' }}>{lang === 'BG' ? 'Имейл' : lang === 'RU' ? 'Почта' : 'Email'}</div>
                    <div className="text-sm font-semibold" style={{ color: 'white' }}>b2b@indigocars.bg</div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <MapPin size={16} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(231,228,240,0.6)' }}>{lang === 'BG' ? 'Адрес' : lang === 'RU' ? 'Адрес' : 'Address'}</div>
                    <div className="text-sm font-semibold" style={{ color: 'white' }}>
                      {lang === 'BG' ? 'гр. София, България' : lang === 'RU' ? 'г. София, Болгария' : 'Sofia, Bulgaria'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
}
