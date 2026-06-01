import { useEffect, useRef } from 'react';
import { ChevronDown, Shield, Truck, FileText, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useMagnetic } from '../lib/useMagnetic';
import { useTheme } from '../context/ThemeContext';

/* ── Particle mesh — dark theme only ── */
function ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    function resize() {
      W = canvas!.offsetWidth; H = canvas!.offsetHeight;
      canvas!.width = W; canvas!.height = H;
    }

    function init() {
      resize();
      const isMobile = W < 768;
      const COUNT = isMobile ? 30 : 70;
      const MAX = isMobile ? 100 : 160;
      (canvas as any).__MAX = MAX;
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }));
    }

    function draw() {
      const MAX = (canvas as any).__MAX ?? 160;
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX) {
            const alpha = (1 - d / MAX) * 0.18;
            const g = ctx!.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            g.addColorStop(0, `rgba(124,58,237,${alpha})`);
            g.addColorStop(1, `rgba(79,70,229,${alpha})`);
            ctx!.beginPath(); ctx!.strokeStyle = g; ctx!.lineWidth = 0.8;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
      for (const p of particles) {
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, 'rgba(167,139,250,0.6)');
        glow.addColorStop(1, 'rgba(79,70,229,0)');
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx!.fillStyle = glow; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(167,139,250,0.7)'; ctx!.fill();
      }
    }

    function update() {
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }
    }

    function loop() { update(); draw(); animId = requestAnimationFrame(loop); }
    init(); loop();
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />;
}

/* ── LIGHT HERO ── */
function HeroLight() {
  const { t, lang } = useLang();
  const magPrimary = useMagnetic();
  const magSecondary = useMagnetic();
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const badgeLabels = lang === 'BG'
    ? ['Лицензирани', 'Доставка в срок', 'Пълна документация']
    : lang === 'RU'
    ? ['Лицензированы', 'Доставка в срок', 'Полная документация']
    : ['Licensed', 'On-time Delivery', 'Full Documentation'];

  const stats = [
    { value: '2000+', label: t.stats.delivered },
    { value: '45–60', label: t.stats.delivery },
    { value: '100%', label: t.stats.transparent },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-white" style={{ minHeight: '100dvh' }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(79,70,229,0.06) 60%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, #c4b5fd 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, transparent, #7c3aed, #4f46e5, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 pb-16">

          {/* ── LEFT: Text content ── */}
          <div>
            {/* Eyebrow */}
            <div className="hero-stagger inline-flex items-center gap-2 mb-6 rounded-full px-4 py-1.5" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', animationDelay: '0.05s' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-600 font-semibold text-xs uppercase tracking-[0.2em]">{t.hero.label}</span>
            </div>

            {/* Heading */}
            <h1 className="hero-stagger font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 tracking-tight" style={{ animationDelay: '0.18s', color: '#1A1A2E' }}>
              {t.hero.h1a}{' '}
              <span className="text-gradient">{t.hero.h1b}</span>
              <br />
              {t.hero.h1c}{' '}
              <span className="text-gradient">{t.hero.h1d}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-stagger text-lg leading-relaxed mb-8 max-w-xl" style={{ animationDelay: '0.32s', color: '#5B5880' }}>
              {t.hero.sub}
            </p>

            {/* CTAs */}
            <div className="hero-stagger flex flex-col sm:flex-row gap-4 mb-10" style={{ animationDelay: '0.46s' }}>
              <button
                ref={magPrimary.ref as React.RefObject<HTMLButtonElement>}
                onMouseMove={magPrimary.onMouseMove} onMouseLeave={magPrimary.onMouseLeave}
                onClick={() => scroll('#contact')}
                className="btn-primary text-center text-base"
                style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease' }}
              >
                {t.hero.cta}
              </button>
              <button
                ref={magSecondary.ref as React.RefObject<HTMLButtonElement>}
                onMouseMove={magSecondary.onMouseMove} onMouseLeave={magSecondary.onMouseLeave}
                onClick={() => scroll('#how-it-works')}
                className="btn-outline text-center text-base"
                style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease' }}
              >
                {t.hero.secondary}
              </button>
            </div>

            {/* Trust badges */}
            <div className="hero-stagger flex flex-wrap gap-2" style={{ animationDelay: '0.60s' }}>
              {badgeLabels.map((label, i) => {
                const Icon = [Shield, Truck, FileText][i];
                return (
                  <div key={label} className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                    <Icon size={13} className="text-primary-500" />
                    <span className="text-xs font-medium" style={{ color: '#4c3d8f' }}>{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats — mobile only */}
            <div className="hero-stagger grid grid-cols-3 gap-3 mt-10 lg:hidden" style={{ animationDelay: '0.75s' }}>
              {stats.map((s) => (
                <div key={s.label} className="text-center rounded-2xl px-3 py-4" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}>
                  <div className="text-xl font-bold text-gradient-stats">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7B6FA8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image card ── */}
          <div className="hidden lg:block relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-3xl blur-3xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.15))', transform: 'scale(0.95) translateY(20px)' }} />

            {/* Image container */}
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 32px 80px rgba(124,58,237,0.2), 0 8px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(124,58,237,0.15)' }}>
              <img
                src="/hero-image.png"
                alt="Premium imported cars"
                className="w-full h-[520px] object-cover object-center"
                fetchPriority="high"
                decoding="async"
              />
              {/* Subtle indigo overlay at bottom */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(79,70,229,0.35) 0%, transparent 50%)' }} />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl px-4 py-3 min-w-[140px] backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.12)' }}>
                  <div className="text-xl font-bold text-gradient-stats">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7B6FA8' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Carfax/trust badge floating */}
            <div className="absolute -bottom-4 right-8 rounded-2xl px-5 py-3 backdrop-blur-md flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.12)' }}>
              <CheckCircle size={20} className="text-primary-500" />
              <div>
                <div className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>CARFAX Verified</div>
                <div className="text-xs" style={{ color: '#7B6FA8' }}>100% прозрачност</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scroll('#how-it-works')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-colors hover:text-primary-500"
        style={{ color: '#9CA3AF' }}
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">{t.hero.scrollMore}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}

/* ── DARK HERO (original) ── */
function HeroDark() {
  const { t, lang } = useLang();
  const bgRef = useRef<HTMLImageElement>(null);
  const magPrimary = useMagnetic();
  const magSecondary = useMagnetic();

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.12)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const badgeLabels = lang === 'BG'
    ? ['Лицензирани', 'Доставка в срок', 'Пълна документация']
    : lang === 'RU'
    ? ['Лицензированы', 'Доставка в срок', 'Полная документация']
    : ['Licensed', 'On-time Delivery', 'Full Documentation'];

  const statItems = [
    { value: '2000+', label: t.stats.delivered },
    { value: '45–60', label: t.stats.delivery },
    { value: '100%', label: t.stats.transparent },
  ];

  return (
    <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '100dvh' }}>
      <div className="absolute inset-0 z-0">
        <img ref={bgRef} src="/hero-image.png" alt="Purple cars in a row"
          className="w-full h-full object-cover object-center"
          fetchPriority="high" decoding="async"
          style={{ transform: 'scale(1.12)', willChange: 'transform' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/[0.97] via-[#0a0a1a]/[0.82] to-[#0a0a1a]/[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/90 via-transparent to-[#0a0a1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/60 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(124,58,237,0.1)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-[100px]" style={{ background: 'rgba(79,70,229,0.08)' }} />
      </div>

      <ParticleMesh />
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.5), rgba(79,70,229,0.5), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="max-w-3xl">
          <div className="hero-stagger flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }} />
            <span className="text-primary-400 font-semibold text-xs uppercase tracking-[0.25em]">{t.hero.label}</span>
          </div>

          <h1 className="hero-stagger font-display text-4xl sm:text-6xl md:text-8xl text-white leading-none mb-6 tracking-wide" style={{ animationDelay: '0.18s' }}>
            {t.hero.h1a}{' '}<span className="text-gradient">{t.hero.h1b}</span>
            <br />
            {t.hero.h1c}{' '}<span className="text-gradient">{t.hero.h1d}</span>
          </h1>

          <p className="hero-stagger text-dark-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl" style={{ animationDelay: '0.32s' }}>
            {t.hero.sub}
          </p>

          <div className="hero-stagger flex flex-col sm:flex-row gap-4 mb-12" style={{ animationDelay: '0.46s' }}>
            <button ref={magPrimary.ref as React.RefObject<HTMLButtonElement>}
              onMouseMove={magPrimary.onMouseMove} onMouseLeave={magPrimary.onMouseLeave}
              onClick={() => scroll('#contact')} className="btn-primary text-center text-base"
              style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease' }}>
              {t.hero.cta}
            </button>
            <button ref={magSecondary.ref as React.RefObject<HTMLButtonElement>}
              onMouseMove={magSecondary.onMouseMove} onMouseLeave={magSecondary.onMouseLeave}
              onClick={() => scroll('#how-it-works')} className="btn-outline text-center text-base"
              style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease' }}>
              {t.hero.secondary}
            </button>
          </div>

          <div className="hero-stagger flex flex-wrap gap-3" style={{ animationDelay: '0.60s' }}>
            {badgeLabels.map((label, i) => {
              const Icon = [Shield, Truck, FileText][i];
              return (
                <div key={label} className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <Icon size={14} className="text-primary-400" />
                  <span className="text-xs text-white font-medium">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-12 right-6 lg:right-16 hidden md:flex flex-col gap-3">
          {statItems.map((s) => (
            <div key={s.label} className="text-right backdrop-blur rounded-xl px-5 py-3 min-w-[150px] transition-all hover:scale-105" style={{ background: 'rgba(26,24,48,0.8)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <div className="text-2xl font-bold text-gradient-stats">{s.value}</div>
              <div className="text-xs text-dark-300 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => scroll('#how-it-works')}
        className="absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-dark-300 hover:text-primary-400 transition-colors"
        aria-label="Scroll down">
        <span className="text-xs uppercase tracking-widest">{t.hero.scrollMore}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}

/* ── MAIN EXPORT ── */
export default function Hero() {
  const { theme } = useTheme();
  return theme === 'light' ? <HeroLight /> : <HeroDark />;
}
