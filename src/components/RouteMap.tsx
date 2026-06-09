'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from 'react-simple-maps';
import { Ship, Clock, MousePointer } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../lib/useScrollReveal';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

type CountryData = {
  flag: string;
  name: string;
  city: string;
  days: string;
  coordinates: [number, number];
};

// ISO 3166-1 numeric → country info
const EU_DATA: Record<number, CountryData> = {
  8:   { flag: '🇦🇱', name: 'Албания',        city: 'Тирана',      days: '9–12 дни',  coordinates: [19.82, 41.33] },
  40:  { flag: '🇦🇹', name: 'Австрия',         city: 'Виена',       days: '4–6 дни',   coordinates: [16.37, 48.21] },
  56:  { flag: '🇧🇪', name: 'Белгия',          city: 'Брюксел',     days: '1–2 дни',   coordinates: [4.35,  50.85] },
  70:  { flag: '🇧🇦', name: 'Босна',           city: 'Сараево',     days: '8–10 дни',  coordinates: [18.42, 43.85] },
  100: { flag: '🇧🇬', name: 'България',        city: 'София',       days: '7–9 дни',   coordinates: [23.32, 42.70] },
  112: { flag: '🇧🇾', name: 'Беларус',         city: 'Минск',       days: '8–10 дни',  coordinates: [27.57, 53.90] },
  191: { flag: '🇭🇷', name: 'Хърватия',        city: 'Загреб',      days: '5–7 дни',   coordinates: [15.98, 45.81] },
  196: { flag: '🇨🇾', name: 'Кипър',           city: 'Никозия',     days: '10–14 дни', coordinates: [33.36, 35.17] },
  203: { flag: '🇨🇿', name: 'Чехия',           city: 'Прага',       days: '4–5 дни',   coordinates: [14.42, 50.09] },
  208: { flag: '🇩🇰', name: 'Дания',           city: 'Копенхаген',  days: '3–4 дни',   coordinates: [12.57, 55.68] },
  233: { flag: '🇪🇪', name: 'Естония',         city: 'Талин',       days: '5–7 дни',   coordinates: [24.74, 59.44] },
  246: { flag: '🇫🇮', name: 'Финландия',       city: 'Хелзинки',    days: '5–7 дни',   coordinates: [24.94, 60.17] },
  250: { flag: '🇫🇷', name: 'Франция',         city: 'Париж',       days: '3–4 дни',   coordinates: [2.35,  48.86] },
  276: { flag: '🇩🇪', name: 'Германия',        city: 'Берлин',      days: '3–5 дни',   coordinates: [13.40, 52.52] },
  300: { flag: '🇬🇷', name: 'Гърция',          city: 'Атина',       days: '8–10 дни',  coordinates: [23.73, 37.98] },
  348: { flag: '🇭🇺', name: 'Унгария',         city: 'Будапеща',    days: '5–7 дни',   coordinates: [19.04, 47.50] },
  352: { flag: '🇮🇸', name: 'Исландия',        city: 'Рейкявик',    days: '8–12 дни',  coordinates: [-21.9, 64.13] },
  372: { flag: '🇮🇪', name: 'Ирландия',        city: 'Дъблин',      days: '3–5 дни',   coordinates: [-6.27, 53.33] },
  380: { flag: '🇮🇹', name: 'Италия',          city: 'Рим',         days: '5–6 дни',   coordinates: [12.50, 41.90] },
  428: { flag: '🇱🇻', name: 'Латвия',          city: 'Рига',        days: '5–7 дни',   coordinates: [24.11, 56.95] },
  440: { flag: '🇱🇹', name: 'Литва',           city: 'Вилнюс',      days: '5–7 дни',   coordinates: [25.28, 54.69] },
  442: { flag: '🇱🇺', name: 'Люксембург',      city: 'Люксембург',   days: '1–2 дни',   coordinates: [6.13,  49.61] },
  470: { flag: '🇲🇹', name: 'Малта',           city: 'Валета',      days: '9–12 дни',  coordinates: [14.51, 35.90] },
  498: { flag: '🇲🇩', name: 'Молдова',         city: 'Кишинев',     days: '8–10 дни',  coordinates: [28.85, 47.00] },
  499: { flag: '🇲🇪', name: 'Черна гора',      city: 'Подгорица',   days: '8–10 дни',  coordinates: [19.26, 42.44] },
  528: { flag: '🇳🇱', name: 'Нидерландия',     city: 'Амстердам',   days: '0–1 дни',   coordinates: [4.90,  52.37] },
  578: { flag: '🇳🇴', name: 'Норвегия',        city: 'Осло',        days: '4–6 дни',   coordinates: [10.75, 59.91] },
  616: { flag: '🇵🇱', name: 'Полша',           city: 'Варшава',     days: '4–6 дни',   coordinates: [21.02, 52.23] },
  620: { flag: '🇵🇹', name: 'Португалия',      city: 'Лисабон',     days: '6–8 дни',   coordinates: [-9.14, 38.72] },
  642: { flag: '🇷🇴', name: 'Румъния',         city: 'Букурещ',     days: '6–8 дни',   coordinates: [26.10, 44.44] },
  688: { flag: '🇷🇸', name: 'Сърбия',          city: 'Белград',     days: '7–9 дни',   coordinates: [20.46, 44.80] },
  703: { flag: '🇸🇰', name: 'Словакия',        city: 'Братислава',  days: '5–6 дни',   coordinates: [17.10, 48.15] },
  705: { flag: '🇸🇮', name: 'Словения',        city: 'Любляна',     days: '4–6 дни',   coordinates: [14.51, 46.05] },
  724: { flag: '🇪🇸', name: 'Испания',         city: 'Мадрид',      days: '5–7 дни',   coordinates: [-3.70, 40.42] },
  752: { flag: '🇸🇪', name: 'Швеция',          city: 'Стокхолм',    days: '4–5 дни',   coordinates: [18.07, 59.33] },
  756: { flag: '🇨🇭', name: 'Швейцария',       city: 'Берн',        days: '3–5 дни',   coordinates: [7.45,  46.95] },
  804: { flag: '🇺🇦', name: 'Украйна',         city: 'Киев',        days: '8–11 дни',  coordinates: [30.52, 50.45] },
  807: { flag: '🇲🇰', name: 'С. Македония',    city: 'Скопие',      days: '8–11 дни',  coordinates: [21.43, 42.00] },
  826: { flag: '🇬🇧', name: 'Великобритания',  city: 'Лондон',      days: '2–3 дни',   coordinates: [-0.12, 51.51] },
};

const EU_ISO = new Set(Object.keys(EU_DATA).map(Number));
const ROTTERDAM: [number, number] = [4.5, 51.9];

export default function RouteMap() {
  const { t } = useLang();
  const { theme } = useTheme();
  const light = theme === 'light';
  const [activeIso, setActiveIso] = useState<number | null>(100);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([-12, 52]);
  const ref = useScrollReveal({ threshold: 0.12, stagger: 120, onReveal: () => setVisible(true) });

  const activeCountry = activeIso !== null ? EU_DATA[activeIso] : null;

  const geoFill   = light ? '#cdbcfb' : '#2a1d6f';
  const geoStroke = light ? '#691EB9' : '#7c5dd4';
  const geoActive = light ? '#3d1680' : '#691EB9';
  const mapBg     = light ? '#f0ecff' : '#0c0a22';
  const landFill   = light ? '#e6e0f7' : '#161232';
  const landStroke = light ? '#d4c9f2' : '#241a4d';

  const US_PORT: [number, number] = [-74.0, 40.7];
  const ATLANTIC: [number, number] = [-32, 47];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden" ref={ref} style={{ background: 'var(--bg-main)' }}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
          <p className="section-label">{t.routeMap.label}</p>
          <h2 className="section-title mb-4">
            {t.routeMap.title}{' '}
            <span className="text-gradient section-title-accent">{t.routeMap.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.routeMap.sub}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── LEFT: Origins + selected country ── */}
          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">

            {/* USA */}
            <div className="rounded-2xl p-5 transition-all duration-700" style={{
              background: light ? 'var(--bg-card)' : 'rgba(255,255,255,0.04)',
              border: light ? '1px solid var(--border-card)' : '1px solid rgba(105,30,185,0.2)',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)', transitionDelay: '0.1s',
            }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🇺🇸</span>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.routeMap.usaLabel}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>IAAI · Copart</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse block" />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.routeMap.usaCities}</p>
            </div>

            <div className="flex justify-center"><div className="w-px h-5" style={{ background: light ? 'rgba(105,30,185,0.4)' : 'rgba(105,30,185,0.25)' }} /></div>

            {/* Canada */}
            <div className="rounded-2xl p-5 transition-all duration-700" style={{
              background: light ? 'var(--bg-card)' : 'rgba(255,255,255,0.04)',
              border: light ? '1px solid var(--border-card)' : '1px solid rgba(105,30,185,0.2)',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)', transitionDelay: '0.22s',
            }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🇨🇦</span>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.routeMap.canadaLabel}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>ADESA · Manheim</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse block" />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.routeMap.canadaCities}</p>
            </div>

            <div className="flex justify-center"><div className="w-px h-5" style={{ background: light ? 'rgba(105,30,185,0.4)' : 'rgba(105,30,185,0.25)' }} /></div>

            {/* Shipping */}
            <div className="rounded-2xl p-4 text-center transition-all duration-700" style={{
              background: 'rgba(105,30,185,0.1)', border: '1px solid rgba(105,30,185,0.28)',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)', transitionDelay: '0.35s',
            }}>
              <Ship size={22} className="text-primary-400 mx-auto mb-2" />
              <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{t.routeMap.transatlantic}</div>
              <div className="font-bold text-gradient-stats text-xl mt-1">{t.routeMap.transatlanticDays}</div>
            </div>

            {/* → Rotterdam */}
            <div className="hidden lg:flex items-center gap-2 transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transitionDelay: '0.5s' }}>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(105,30,185,0.2), rgba(105,30,185,0.6))' }} />
              <span className="text-xs font-bold text-primary-400 tracking-wide">→ ROTTERDAM</span>
            </div>

            {/* Selected country info */}
            <div className="hidden lg:block rounded-xl overflow-hidden transition-all duration-500" style={{
              border: '1px solid rgba(105,30,185,0.28)',
              opacity: visible ? 1 : 0, transitionDelay: '0.6s',
            }}>
              {activeCountry ? (
                <div className="p-4" style={{ background: 'rgba(105,30,185,0.1)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{activeCountry.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{activeCountry.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{activeCountry.city}</div>
                    </div>
                  </div>
                  <div className="rounded-lg px-3 py-2 flex items-center justify-between" style={{ background: 'rgba(105,30,185,0.15)' }}>
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.routeMap.fromRotterdam}</div>
                      <div className="font-bold text-gradient-stats text-lg">{activeCountry.days}</div>
                    </div>
                    <Clock size={22} className="text-primary-400" />
                  </div>
                </div>
              ) : (
                <div className="p-5 text-center" style={{ background: 'rgba(105,30,185,0.06)' }}>
                  <MousePointer size={20} className="text-primary-400 mx-auto mb-2" />
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {t.routeMap.clickHint}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Interactive Europe map ── */}
          <div className="flex-1 min-w-0 w-full">
            <div id="routemap-map" className="relative overflow-hidden transition-all duration-700 rounded-2xl" style={{
              border: '1px solid rgba(105,30,185,0.18)',
              background: mapBg,
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(18px)', transitionDelay: '0.25s',
            }}>
              {/* Hint badge */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ background: 'rgba(105,30,185,0.2)', border: '1px solid rgba(105,30,185,0.35)', backdropFilter: 'blur(8px)' }}>
                <MousePointer size={11} className="text-primary-400" />
                <span className="text-xs font-medium text-primary-300">{t.routeMap.clickHintShort}</span>
              </div>

              {/* Zoom controls */}
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
                <button
                  onClick={() => setZoom(z => Math.min(z * 1.5, 12))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                  style={{ background: 'rgba(105,30,185,0.9)', border: '1px solid rgba(192,132,252,0.6)', color: 'white' }}
                >+</button>
                <button
                  onClick={() => setZoom(z => Math.max(z / 1.5, 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                  style={{ background: 'rgba(105,30,185,0.9)', border: '1px solid rgba(192,132,252,0.6)', color: 'white' }}
                >−</button>
                {zoom > 1 && (
                  <button
                    onClick={() => { setZoom(1); setCenter([-12, 52]); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
                    style={{ background: 'rgba(105,30,185,0.9)', border: '1px solid rgba(192,132,252,0.6)', color: 'white' }}
                    title="Reset"
                  >⊙</button>
                )}
              </div>

              <ComposableMap
                width={800}
                height={520}
                projection="geoAzimuthalEqualArea"
                projectionConfig={{ rotate: [-10, -52, 0], scale: 430 }}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                <ZoomableGroup
                  zoom={zoom}
                  center={center}
                  onMoveEnd={({ zoom: z, coordinates }) => {
                    setZoom(z);
                    setCenter(coordinates as [number, number]);
                  }}
                  minZoom={1}
                  maxZoom={12}
                >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const numId = Number(geo.id);
                      const isEU = EU_ISO.has(numId);

                      if (!isEU) {
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={landFill}
                            stroke={landStroke}
                            strokeWidth={0.35}
                            style={{
                              default: { outline: 'none', pointerEvents: 'none' },
                              hover:   { outline: 'none', fill: landFill },
                              pressed: { outline: 'none', fill: landFill },
                            }}
                          />
                        );
                      }

                      const isActive = numId === activeIso;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => { if (EU_DATA[numId]) setActiveIso(numId); }}
                          fill={isActive ? geoActive : geoFill}
                          stroke={geoStroke}
                          strokeWidth={0.8}
                          style={{
                            default: { outline: 'none' },
                            hover: {
                              outline: 'none',
                              fill: isActive ? geoActive : (light ? '#4a158a' : '#3730a3'),
                              cursor: 'pointer',
                            },
                            pressed: { outline: 'none', fill: geoActive },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Transatlantic ocean leg: USA → Rotterdam */}
                <Line
                  from={US_PORT}
                  to={ROTTERDAM}
                  stroke={light ? 'rgba(105,30,185,0.45)' : 'rgba(124,93,212,0.55)'}
                  strokeWidth={2 / zoom}
                  strokeDasharray={`${2 / zoom} ${5 / zoom}`}
                  strokeLinecap="round"
                />

                {/* US origin marker */}
                <Marker coordinates={US_PORT}>
                  <circle r={6 / zoom} fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth={1.5 / zoom} />
                  <circle r={2.5 / zoom} fill="#10b981" />
                  <text y={-10 / zoom} textAnchor="middle" fontSize={9 / zoom} fontWeight="700"
                    fill={light ? '#3d1680' : 'rgba(213,198,224,0.95)'} letterSpacing="0.4">
                    🇺🇸 {t.routeMap.usaLabel}
                  </text>
                </Marker>

                {/* Ship mid-crossing */}
                <Marker coordinates={ATLANTIC}>
                  <circle r={14 / zoom} fill="rgba(105,30,185,0.12)" stroke="rgba(124,93,212,0.4)" strokeWidth={1 / zoom}>
                    <animate attributeName="r" values={`${7/zoom};${17/zoom}`} dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <text y={5 / zoom} textAnchor="middle" fontSize={15 / zoom} style={{ pointerEvents: 'none', userSelect: 'none' }}>
                    🚢
                  </text>
                </Marker>

                {/* Route line: Rotterdam → active country capital */}
                {activeCountry && (
                  <Line
                    from={ROTTERDAM}
                    to={activeCountry.coordinates}
                    stroke="rgba(105,30,185,0.95)"
                    strokeWidth={2.5 / zoom}
                    strokeDasharray={`${7 / zoom} ${4 / zoom}`}
                    strokeLinecap="round"
                  />
                )}

                {/* Rotterdam hub */}
                <Marker coordinates={ROTTERDAM}>
                  <circle r={20 / zoom} fill="rgba(105,30,185,0.0)" stroke="rgba(105,30,185,0.5)" strokeWidth={1 / zoom}>
                    <animate attributeName="r" values={`${12/zoom};${30/zoom}`} dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r={11 / zoom} fill="rgba(105,30,185,0.35)" stroke="#691EB9" strokeWidth={2 / zoom} />
                  <circle r={5 / zoom} fill="#4a158a" />
                  <text y={21 / zoom} textAnchor="middle" fontSize={7 / zoom} fontWeight="700"
                    fill={light ? '#4a158a' : 'rgba(213,198,224,0.95)'} letterSpacing="0.5">
                    ROTTERDAM
                  </text>
                </Marker>

                {/* Active country capital marker */}
                {activeCountry && (
                  <Marker coordinates={activeCountry.coordinates}>
                    <circle r={16 / zoom} fill="rgba(105,30,185,0.15)" stroke="rgba(213,198,224,0.5)" strokeWidth={1 / zoom}>
                      <animate attributeName="r" values={`${8/zoom};${20/zoom}`} dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle r={8 / zoom} fill="#4a158a" stroke="#691EB9" strokeWidth={2 / zoom} />
                    <text y={-13 / zoom} textAnchor="middle" fontSize={14 / zoom} style={{ pointerEvents: 'none', userSelect: 'none' }}>
                      {activeCountry.flag}
                    </text>
                  </Marker>
                )}
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Mobile: selected country info */}
            <div className="mt-4 lg:hidden rounded-xl overflow-hidden transition-all duration-500" style={{
              border: '1px solid rgba(105,30,185,0.28)',
              opacity: visible ? 1 : 0, transitionDelay: '0.45s',
            }}>
              {activeCountry ? (
                <div className="px-5 py-4 flex items-center gap-4" style={{ background: 'rgba(105,30,185,0.1)' }}>
                  <span className="text-4xl">{activeCountry.flag}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{activeCountry.name} — {activeCountry.city}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{t.routeMap.fromRotterdam}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Clock size={15} className="text-primary-400" />
                    <span className="font-bold text-gradient-stats text-lg">{activeCountry.days}</span>
                  </div>
                </div>
              ) : (
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'rgba(105,30,185,0.06)' }}>
                  <MousePointer size={18} className="text-primary-400" />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {t.routeMap.clickHint}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline bottom */}
        {t.routeMap.timeline && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.routeMap.timeline.map((step: { days: string; label: string }, idx: number) => (
              <div key={idx} className="animate-on-scroll rounded-xl p-4 text-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-3"
                  style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)', color: 'white' }}>
                  {idx + 1}
                </div>
                <div className="text-lg font-bold text-gradient-stats mb-1">{step.days}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{step.label}</div>
              </div>
            ))}
          </div>
        )}


        <div className="animate-on-scroll mt-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl px-8 py-4"
            style={{ background: 'rgba(105,30,185,0.12)', border: '1px solid rgba(105,30,185,0.3)' }}>
            <Clock size={20} className="text-primary-400" />
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t.routeMap.total}{' '}
              <span className="text-gradient font-bold">{t.routeMap.totalDays}</span>{' '}
              {t.routeMap.totalSuffix}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}