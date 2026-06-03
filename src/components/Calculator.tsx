'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, TrendingDown, Zap, Ship, Flag, Wrench } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../lib/useScrollReveal';

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
  const shipping = oceanFreight + insurance + rotterdamHandling;
  const duties = importDuty + excise + vat;
  const total = usTotal + shipping + duties + serviceFee;
  const bgMarketPrice = Math.round(priceEUR * 1.55);
  const savings = Math.max(0, bgMarketPrice - total);
  return { priceEUR, usTotal, shipping, duties, serviceFee, total, totalBGN: Math.round(total * EUR_TO_BGN), savings };
}

function AnimatedNumber({ value, prefix = '€' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf = useRef<number>(0);
  useEffect(() => {
    const from = prev.current, to = value;
    prev.current = value;
    if (from === to) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 500, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);
  return <>{prefix}{display.toLocaleString('de-DE')}</>;
}

const GROUP_LABELS: Record<string, string[]> = {
  BG: ['Разходи в САЩ', 'Транспорт и застраховка', 'Мито и данъци', 'Такса Indigo Cars'],
  EN: ['US costs', 'Shipping & insurance', 'Duties & taxes', 'Indigo Cars fee'],
  RU: ['Расходы в США', 'Транспорт и страховка', 'Пошлины и налоги', 'Услуга Indigo Cars'],
};

const GROUP_ICONS = [Flag, Ship, Zap, Wrench];
const GROUP_COLORS = ['#691EB9', '#3b82f6', '#0ea5e9', '#8b45d0'];

export default function Calculator({ embed = false }: { embed?: boolean }) {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const light = embed ? false : theme === 'light';
  const [priceUSD, setPriceUSD] = useState(15000);
  const [fuel, setFuel] = useState('petrol');
  const sectionRef = useScrollReveal({ threshold: 0.05, stagger: 80 });

  const r = calculate(priceUSD, fuel);
  const groupValues = [r.usTotal, r.shipping, r.duties, r.serviceFee];
  const groupLabels = GROUP_LABELS[lang] ?? GROUP_LABELS.BG;

  const sliderPct = ((priceUSD - 1000) / (60000 - 1000)) * 100;

  const cardBg     = embed ? 'rgba(255,255,255,0.08)' : light ? '#ffffff' : 'rgba(32,21,69,0.6)';
  const cardBorder = embed ? '1px solid rgba(255,255,255,0.12)' : light ? '1px solid #E7E4F0' : '1px solid #2e1858';
  const labelColor = embed ? 'rgba(231,228,240,0.65)' : light ? '#5a3a8a' : '#9070a8';
  const textColor  = embed ? 'rgba(255,255,255,0.95)' : light ? '#000E38' : '#ffffff';
  // Lighter "frosted" cards for the left input column so they stand out on the gradient block
  const inputCardBg     = embed ? 'rgba(255,255,255,0.08)' : light ? '#ffffff' : 'rgba(255,255,255,0.10)';
  const inputCardBorder = embed ? '1px solid rgba(255,255,255,0.12)' : light ? '1px solid #E7E4F0' : '1px solid rgba(255,255,255,0.18)';

  const calcGrid = (
    <div className="grid md:grid-cols-2 gap-5 items-stretch">

      {/* LEFT — inputs */}
      <div className="flex flex-col gap-4 animate-on-scroll">

        {/* Price slider card */}
        <div className="rounded-2xl p-5" style={{ background: inputCardBg, border: inputCardBorder }}>
          <div className="flex justify-between items-end mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>
              {t.calculator.priceLabel}
            </span>
            <span className="font-display text-2xl font-bold" style={{ color: '#c084fc' }}>
              ${priceUSD.toLocaleString('de-DE')}
            </span>
          </div>

          {/* Slider */}
          <div className="relative h-7 flex items-center mb-3">
            <div className="absolute left-0 right-0 h-1.5 rounded-full" style={{ background: embed ? 'rgba(255,255,255,0.15)' : light ? '#e2e8f0' : '#2e1858' }}>
              <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${sliderPct}%`, background: 'linear-gradient(to right, #691EB9, #c084fc)' }} />
            </div>
            <input type="range" min={1000} max={60000} step={500} value={priceUSD}
              onChange={(e) => setPriceUSD(Number(e.target.value))}
              className="calc-slider absolute inset-0 w-full h-full opacity-0 cursor-pointer" style={{ zIndex: 2 }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 pointer-events-none"
              style={{ left: `${sliderPct}%`, background: 'white', borderColor: '#691EB9', boxShadow: '0 0 0 3px rgba(105,30,185,0.25)' }} />
          </div>
          <div className="flex justify-between" style={{ color: labelColor, fontSize: '11px' }}>
            <span>$1k</span><span>$60k</span>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {[5000, 10000, 15000, 20000, 30000, 45000].map((p) => (
              <button key={p} onClick={() => setPriceUSD(p)}
                className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all"
                style={{
                  background: priceUSD === p ? '#691EB9' : embed ? 'rgba(255,255,255,0.07)' : light ? '#f5f0ff' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${priceUSD === p ? '#691EB9' : embed ? 'rgba(255,255,255,0.12)' : light ? '#E7E4F0' : '#2e1858'}`,
                  color: priceUSD === p ? 'white' : labelColor,
                }}>
                ${(p / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* Fuel selector */}
        <div className="rounded-2xl p-4" style={{ background: inputCardBg, border: inputCardBorder }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: labelColor }}>
            {t.calculator.fuelLabel}
          </p>
          <div className="flex rounded-xl p-1 gap-1" style={{ background: embed ? 'rgba(0,0,0,0.2)' : light ? '#f1f5f9' : 'rgba(255,255,255,0.04)' }}>
            {t.calculator.fuels.map(({ key, label }) => (
              <button key={key} onClick={() => setFuel(key)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: fuel === key ? (embed ? 'rgba(105,30,185,0.5)' : light ? 'white' : '#1e1c3a') : 'transparent',
                  color: fuel === key ? (embed ? 'white' : '#691EB9') : labelColor,
                  border: fuel === key ? `1px solid ${embed ? 'rgba(105,30,185,0.5)' : light ? '#e2e8f0' : 'rgba(105,30,185,0.2)'}` : '1px solid transparent',
                  boxShadow: fuel === key && light && !embed ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Savings badge */}
        {r.savings > 500 && (
          <div className="rounded-2xl p-4 flex items-center gap-3 animate-on-scroll"
            style={{ background: embed ? 'rgba(105,30,185,0.2)' : 'rgba(105,30,185,0.08)', border: '1px solid rgba(105,30,185,0.3)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(105,30,185,0.25)' }}>
              <TrendingDown size={15} style={{ color: '#c084fc' }} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: textColor }}>
                {t.calculator.savingsText}{' '}
                <span className="text-gradient font-bold">€{r.savings.toLocaleString('de-DE')}</span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: labelColor }}>{t.calculator.savingsSub}</div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — summary breakdown */}
      <div className="flex flex-col gap-3 animate-on-scroll">

        {/* 4 group rows */}
        <div className="rounded-2xl overflow-hidden flex-1" style={{ background: cardBg, border: cardBorder }}>
          {groupValues.map((val, i) => {
            const Icon = GROUP_ICONS[i];
            const color = GROUP_COLORS[i];
            const pct = Math.round((val / r.total) * 100);
            return (
              <div key={i} className="px-5 py-3.5" style={{ borderBottom: i < 3 ? `1px solid ${embed ? 'rgba(255,255,255,0.08)' : light ? '#E7E4F0' : '#2e1858'}` : undefined }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <span className="text-sm" style={{ color: textColor }}>{groupLabels[i]}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: textColor }}>
                    <AnimatedNumber value={val} />
                  </span>
                </div>
                {/* mini progress bar */}
                <div className="ml-9 h-1 rounded-full" style={{ background: embed ? 'rgba(255,255,255,0.08)' : light ? '#f0eafa' : 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `${color}99` }} />
                </div>
              </div>
            );
          })}

          {/* Total row */}
          <div className="px-5 py-4" style={{ background: 'rgba(105,30,185,0.15)', borderTop: '2px solid rgba(105,30,185,0.3)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm" style={{ color: textColor }}>{t.calculator.totalLabel}</span>
              <span className="font-display text-2xl font-bold" style={{ color: '#c084fc' }}>
                <AnimatedNumber value={r.total} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs leading-relaxed max-w-[60%]" style={{ color: labelColor }}>{t.calculator.disclaimer}</p>
              <span className="text-xs" style={{ color: labelColor }}>≈ <AnimatedNumber value={r.totalBGN} prefix="" /> лв.</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5 text-sm"
          style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', color: 'white' }}>
          {t.calculator.ctaButton}
          <ChevronRight size={16} />
        </a>
      </div>
    </div>
  );

  if (embed) {
    return <div ref={sectionRef}>{calcGrid}</div>;
  }

  return (
    <section id="calculator" className="py-12 md:py-20 relative scroll-mt-16 overflow-hidden" ref={sectionRef} style={{ background: 'var(--bg-main)' }}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #691EB9 0%, #000E38 100%)' }}>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(105,30,185,0.2)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,14,56,0.5)' }} />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8 animate-on-scroll">
              <p className="section-label" style={{ color: 'rgba(199,168,255,0.9)' }}>{t.calculator.label}</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3" style={{ color: 'white' }}>
                {t.calculator.title}{' '}
                <span className="text-gradient section-title-accent">{t.calculator.titleAccent}</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(231,228,240,0.75)' }}>{t.calculator.sub}</p>
            </div>
            {calcGrid}
          </div>
        </div>
      </div>
    </section>
  );
}
