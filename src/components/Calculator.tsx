import { useState, useEffect, useRef } from 'react';
import { DollarSign, Ship, FileText, Wrench, Shield, ChevronRight, TrendingDown } from 'lucide-react';

const USD_TO_EUR = 0.92;
const EUR_TO_BGN = 1.956;

function getAuctionFee(price: number): number {
  if (price <= 99) return 25;
  if (price <= 499) return 75;
  if (price <= 999) return 100;
  if (price <= 1999) return 150;
  if (price <= 3999) return 200;
  if (price <= 5999) return 250;
  if (price <= 7999) return 275;
  if (price <= 9999) return 300;
  if (price <= 11999) return 325;
  if (price <= 13999) return 350;
  if (price <= 15999) return 375;
  return Math.round(price * 0.034);
}

function calculate(priceUSD: number, fuel: string) {
  const priceEUR = Math.round(priceUSD * USD_TO_EUR);
  const auctionFee = Math.round(getAuctionFee(priceUSD) * USD_TO_EUR);
  const inlandTransport = Math.round(300 * USD_TO_EUR);
  const oceanFreight = 1300;
  const insurance = Math.round(priceEUR * 0.015);
  const rotterdamHandling = 350;
  const usTotal = priceEUR + auctionFee + inlandTransport;
  const importDuty = Math.round((usTotal + oceanFreight) * 0.065);
  const excise = fuel === 'electric' ? 0 : fuel === 'diesel' ? 180 : 150;
  const vatBase = usTotal + oceanFreight + insurance + rotterdamHandling + importDuty + excise;
  const vat = Math.round(vatBase * 0.20);
  const serviceFee = 900;
  const total = usTotal + oceanFreight + insurance + rotterdamHandling + importDuty + excise + vat + serviceFee;
  const bgMarketPrice = Math.round(priceEUR * 1.55);
  const savings = Math.max(0, bgMarketPrice - total);

  return {
    priceEUR,
    auctionFee,
    inlandTransport,
    oceanFreight,
    insurance,
    rotterdamHandling,
    importDuty,
    excise,
    vat,
    serviceFee,
    total,
    totalBGN: Math.round(total * EUR_TO_BGN),
    savings,
  };
}

function AnimatedNumber({ value, prefix = '€' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf = useRef<number>(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;
    const start = performance.now();
    const duration = 500;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <>{prefix}{display.toLocaleString('de-DE')}</>;
}

const ROW_COLORS = [
  '#7c3aed', '#4f46e5', '#3b82f6', '#0ea5e9',
  '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e879f9',
];

export default function Calculator() {
  const [priceUSD, setPriceUSD] = useState(15000);
  const [fuel, setFuel] = useState('petrol');
  const sectionRef = useRef<HTMLDivElement>(null);

  const r = calculate(priceUSD, fuel);

  const rows = [
    { icon: DollarSign, label: 'Цена на автомобила',       value: r.priceEUR,           info: 'Конвертирана от USD по текущ курс' },
    { icon: FileText,   label: 'Аукционна такса',          value: r.auctionFee,          info: 'Стандартна такса на Copart/IAAI' },
    { icon: Wrench,     label: 'Транспорт в САЩ',          value: r.inlandTransport,     info: 'От аукциона до пристанището' },
    { icon: Ship,       label: 'Океански превоз',          value: r.oceanFreight,        info: 'САЩ → Ротердам, 20–30 дни' },
    { icon: Shield,     label: 'Застраховка',              value: r.insurance,           info: '~1.5% от стойността на колата' },
    { icon: FileText,   label: 'Ротердам обработка',       value: r.rotterdamHandling,   info: 'Пристанищни такси, EU документи' },
    { icon: FileText,   label: 'Митническа такса (6.5%)',  value: r.importDuty,          info: 'EU тарифа за внос от САЩ' },
    { icon: FileText,   label: 'Акциз',                    value: r.excise,              info: 'Зависи от вида гориво' },
    { icon: FileText,   label: 'ДДС (20%)',                value: r.vat,                 info: 'Върху цялата данъчна основа' },
    { icon: Wrench,     label: 'Такса за услугата',        value: r.serviceFee,          info: 'Организация, документи, доставка' },
  ];

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pct = ((priceUSD - 1000) / (60000 - 1000)) * 100;

  return (
    <section id="calculator" className="py-24 relative scroll-mt-16" ref={sectionRef} style={{ background: '#0e0d20' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0a0a1a, rgba(18,16,42,0.8), #0a0a1a)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.3), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.15), transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(124,58,237,0.05)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
          <p className="section-label">Калкулатор</p>
          <h2 className="section-title mb-6">
            Изчисли <span className="text-gradient section-title-accent">всички разходи</span>
          </h2>
          <p className="section-subtitle">
            Приблизителна сметка за внос от САЩ до вашия гараж в България.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: inputs ── */}
          <div className="animate-on-scroll space-y-8">

            {/* Price slider */}
            <div className="rounded-2xl p-6 space-y-5" style={{ background: '#12102a', border: '1px solid #2a2850' }}>
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-dark-300 text-sm font-medium uppercase tracking-wider">Цена на аукцион (USD)</span>
                  <span className="font-display text-3xl" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ${priceUSD.toLocaleString('de-DE')}
                  </span>
                </div>

                {/* Custom slider */}
                <div className="relative h-2 rounded-full mb-2" style={{ background: '#2a2850' }}>
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${pct}%`, background: 'linear-gradient(to right, #7c3aed, #a78bfa)' }}
                  />
                  <input
                    type="range"
                    min={1000}
                    max={60000}
                    step={500}
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(Number(e.target.value))}
                    className="calc-slider absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    style={{ zIndex: 2 }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 shadow-lg pointer-events-none transition-all"
                    style={{ left: `${pct}%`, background: 'white', borderColor: '#7c3aed', boxShadow: '0 0 0 4px rgba(124,58,237,0.2)' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-dark-300 mt-2">
                  <span>$1,000</span>
                  <span>$60,000</span>
                </div>
              </div>

              {/* Quick price buttons */}
              <div className="flex flex-wrap gap-2">
                {[5000, 10000, 15000, 20000, 30000, 45000].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriceUSD(p)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                    style={{
                      background: priceUSD === p ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(124,58,237,0.08)',
                      border: `1px solid ${priceUSD === p ? 'transparent' : '#2a2850'}`,
                      color: priceUSD === p ? 'white' : '#a0a0b8',
                    }}
                  >
                    ${(p / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel type */}
            <div className="rounded-2xl p-6" style={{ background: '#12102a', border: '1px solid #2a2850' }}>
              <p className="text-dark-300 text-sm font-medium uppercase tracking-wider mb-4">Вид гориво</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'petrol', label: 'Бензин', emoji: '⛽' },
                  { key: 'diesel', label: 'Дизел',  emoji: '🛢' },
                  { key: 'electric', label: 'Ел.',  emoji: '⚡' },
                ].map(({ key, label, emoji }) => (
                  <button
                    key={key}
                    onClick={() => setFuel(key)}
                    className="flex flex-col items-center gap-1.5 py-4 rounded-xl font-medium text-sm transition-all"
                    style={{
                      background: fuel === key ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${fuel === key ? 'rgba(124,58,237,0.5)' : '#2a2850'}`,
                      color: fuel === key ? '#a78bfa' : '#a0a0b8',
                    }}
                  >
                    <span className="text-2xl">{emoji}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Savings badge */}
            {r.savings > 500 && (
              <div className="animate-on-scroll rounded-2xl p-5 flex items-center gap-4" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,58,237,0.2)' }}>
                  <TrendingDown size={20} className="text-primary-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    Спестявате приблизително{' '}
                    <span className="text-gradient font-bold">
                      €{r.savings.toLocaleString('de-DE')}
                    </span>
                  </div>
                  <div className="text-dark-300 text-xs mt-0.5">спрямо покупка от български дилър</div>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: breakdown ── */}
          <div className="animate-on-scroll">
            <div className="rounded-2xl overflow-hidden" style={{ background: '#12102a', border: '1px solid #2a2850' }}>

              {/* Rows */}
              <div className="divide-y" style={{ borderColor: '#1e1c40' }}>
                {rows.map(({ label, value, info }, i) => (
                  <div key={label} className="flex items-center justify-between px-5 py-3 group">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ROW_COLORS[i % ROW_COLORS.length] }} />
                      <span className="text-dark-300 text-sm">{label}</span>
                      {info && (
                        <span className="hidden group-hover:block text-xs text-dark-300/60 italic ml-1">— {info}</span>
                      )}
                    </div>
                    <span className="text-white font-semibold text-sm tabular-nums">
                      <AnimatedNumber value={value} />
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="px-5 py-5" style={{ background: 'rgba(124,58,237,0.08)', borderTop: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-base">Общо (прибл.)</span>
                  <span className="font-display text-3xl" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    <AnimatedNumber value={r.total} />
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="text-dark-300 text-sm">
                    ≈ <AnimatedNumber value={r.totalBGN} prefix="" /> лв.
                  </span>
                </div>
                <p className="text-dark-300 text-xs mt-3 leading-relaxed" style={{ color: '#6060b8' }}>
                  * Приблизителна сметка. Точната цена зависи от модела, годината и текущите курсове.
                </p>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
                >
                  Поискай точна оферта
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
