import { useState, useEffect, useRef } from 'react';
import { DollarSign, Ship, FileText, Wrench, Shield, ChevronRight, TrendingDown, Truck, Anchor, Receipt, Zap, Percent, ChevronDown } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

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
  return { priceEUR, auctionFee, inlandTransport, oceanFreight, insurance, rotterdamHandling, importDuty, excise, vat, serviceFee, total, totalBGN: Math.round(total * EUR_TO_BGN), savings };
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

const ROW_ICONS = [DollarSign, FileText, Truck, Ship, Shield, Anchor, Receipt, Zap, Percent, Wrench];

const GROUPS = [
  { flag: '🇺🇸', rows: [0, 1, 2], color: '#691EB9' },
  { flag: '🚢',  rows: [3, 4, 5], color: '#3b82f6' },
  { flag: '🇧🇬', rows: [6, 7, 8], color: '#0ea5e9' },
  { flag: '⭐',  rows: [9],       color: '#8b45d0' },
];

const GROUP_LABELS: Record<string, string[]> = {
  BG: ['В САЩ', 'Превоз', 'Митница и данъци', 'Такса Indigo Cars'],
  EN: ['In the US', 'Shipping', 'Duties & Taxes', 'Indigo Cars Fee'],
  RU: ['В США', 'Доставка', 'Пошлины и налоги', 'Стоимость услуг'],
};

export default function Calculator() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const light = theme === 'light';
  const [priceUSD, setPriceUSD] = useState(15000);
  const [fuel, setFuel] = useState('petrol');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const r = calculate(priceUSD, fuel);
  const values = [r.priceEUR, r.auctionFee, r.inlandTransport, r.oceanFreight, r.insurance, r.rotterdamHandling, r.importDuty, r.excise, r.vat, r.serviceFee];

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

  const sliderPct = ((priceUSD - 1000) / (60000 - 1000)) * 100;
  const groupLabels = GROUP_LABELS[lang] ?? GROUP_LABELS.BG;

  return (
    <section id="calculator" className="py-12 relative scroll-mt-16 overflow-hidden" ref={sectionRef} style={{ background: 'var(--bg-alt)' }}>
      {!light && <div className="absolute inset-0" style={{ background: 'var(--section-grad)' }} />}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.3), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(105,30,185,0.15), transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(105,30,185,0.05)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
          <p className="section-label">{t.calculator.label}</p>
          <h2 className="section-title mb-6">
            {t.calculator.title}{' '}
            <span className="text-gradient section-title-accent">{t.calculator.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.calculator.sub}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: inputs */}
          <div className="animate-on-scroll space-y-5">
            {/* Price slider */}
            <div className="rounded-2xl p-6 space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    {t.calculator.priceLabel}
                  </span>
                  <span className="font-display text-2xl" style={{ background: 'linear-gradient(135deg, #E7E4F0, #8b45d0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ${priceUSD.toLocaleString('de-DE')}
                  </span>
                </div>
                <div className="relative h-8 flex items-center">
                  <div className="absolute left-0 right-0 h-1.5 rounded-full" style={{ background: light ? '#e2e8f0' : '#2e1858' }}>
                    <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${sliderPct}%`, background: 'linear-gradient(to right, #691EB9, #E7E4F0)' }} />
                  </div>
                  <input
                    type="range" min={1000} max={60000} step={500} value={priceUSD}
                    onChange={(e) => setPriceUSD(Number(e.target.value))}
                    className="calc-slider absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    style={{ zIndex: 2 }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 pointer-events-none"
                    style={{ left: `${sliderPct}%`, background: 'white', borderColor: '#691EB9', boxShadow: '0 0 0 3px rgba(105,30,185,0.2)' }}
                  />
                </div>
                <div className="flex justify-between mt-1.5" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                  <span>$1k</span><span>$60k</span>
                </div>
              </div>

              {/* Quick presets */}
              <div className="flex flex-wrap gap-1.5">
                {[5000, 10000, 15000, 20000, 30000, 45000].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriceUSD(p)}
                    className="text-xs px-3 py-1 rounded-md font-medium transition-all"
                    style={{
                      background: priceUSD === p ? '#691EB9' : 'transparent',
                      border: `1px solid ${priceUSD === p ? '#691EB9' : 'var(--border)'}`,
                      color: priceUSD === p ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    ${(p / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel — segmented control */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
                {t.calculator.fuelLabel}
              </p>
              <div className="flex rounded-xl p-1 gap-1" style={{ background: light ? '#f1f5f9' : 'rgba(255,255,255,0.04)' }}>
                {t.calculator.fuels.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFuel(key)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: fuel === key ? (light ? 'white' : '#1e1c3a') : 'transparent',
                      color: fuel === key ? '#691EB9' : 'var(--text-secondary)',
                      boxShadow: fuel === key ? (light ? '0 1px 4px rgba(0,0,0,0.08)' : 'none') : 'none',
                      border: fuel === key ? `1px solid ${light ? '#e2e8f0' : 'rgba(105,30,185,0.2)'}` : '1px solid transparent',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Savings badge */}
            {r.savings > 500 && (
              <div className="animate-on-scroll rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(105,30,185,0.08)', border: '1px solid rgba(105,30,185,0.2)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(105,30,185,0.15)' }}>
                  <TrendingDown size={16} style={{ color: '#8b45d0' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t.calculator.savingsText}{' '}
                    <span className="text-gradient font-bold">€{r.savings.toLocaleString('de-DE')}</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{t.calculator.savingsSub}</div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: grouped breakdown */}
          <div className="animate-on-scroll">
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>

              {GROUPS.map((group, gi) => {
                const groupSubtotal = group.rows.reduce((sum, i) => sum + values[i], 0);

                return (
                  <div key={gi}>
                    {/* Group header */}
                    <div
                      className="px-4 py-2 flex items-center justify-between"
                      style={{
                        background: light ? `${group.color}0a` : `${group.color}12`,
                        borderTop: gi > 0 ? `1px solid var(--border)` : undefined,
                        borderBottom: `1px solid var(--border)`,
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs leading-none">{group.flag}</span>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: group.color }}>
                          {groupLabels[gi]}
                        </span>
                      </div>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: group.color }}>
                        <AnimatedNumber value={groupSubtotal} />
                      </span>
                    </div>

                    {/* Rows */}
                    {group.rows.map((rowIdx, ri) => {
                      const Icon = ROW_ICONS[rowIdx];
                      const val = values[rowIdx];
                      const info = t.calculator.rows[rowIdx].info;
                      const isExpanded = expandedRow === rowIdx;
                      const isLastInGroup = ri === group.rows.length - 1;

                      return (
                        <div
                          key={rowIdx}
                          style={{ borderBottom: isLastInGroup ? undefined : `1px solid var(--border)` }}
                        >
                          <button
                            className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors"
                            style={{ background: isExpanded ? (light ? `${group.color}06` : `${group.color}0a`) : 'transparent' }}
                            onClick={() => setExpandedRow(isExpanded ? null : rowIdx)}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                style={{ background: `${group.color}18` }}
                              >
                                <Icon size={12} style={{ color: group.color }} />
                              </div>
                              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                                {t.calculator.rows[rowIdx].label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                                <AnimatedNumber value={val} />
                              </span>
                              {info && (
                                <ChevronDown
                                  size={13}
                                  className="transition-transform duration-200"
                                  style={{
                                    color: 'var(--text-secondary)',
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                  }}
                                />
                              )}
                            </div>
                          </button>

                          {/* Expandable info */}
                          {info && (
                            <div
                              className="overflow-hidden transition-all duration-200"
                              style={{ maxHeight: isExpanded ? '60px' : '0px' }}
                            >
                              <p className="px-4 pb-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', paddingLeft: '46px' }}>
                                {info}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Total */}
              <div className="px-4 py-4" style={{ background: 'rgba(105,30,185,0.07)', borderTop: '2px solid rgba(105,30,185,0.18)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.calculator.totalLabel}</span>
                  <span className="font-display text-2xl" style={{ background: 'linear-gradient(135deg, #E7E4F0, #8b45d0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    <AnimatedNumber value={r.total} />
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>≈ <AnimatedNumber value={r.totalBGN} prefix="" /> лв.</span>
                </div>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.calculator.disclaimer}</p>
              </div>

              {/* CTA */}
              <div className="px-4 pb-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5 text-sm"
                  style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', color: 'white' }}
                >
                  {t.calculator.ctaButton}
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
