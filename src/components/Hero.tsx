import { useEffect, useRef } from 'react';
import { ChevronDown, Shield, Truck, FileText } from 'lucide-react';
import { useLang } from '../context/LangContext';

function ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const PARTICLE_COUNT = 70;
    const MAX_DIST = 160;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
    };

    let particles: Particle[] = [];

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.18;
            const grad = ctx!.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            grad.addColorStop(0, `rgba(124,58,237,${alpha})`);
            grad.addColorStop(1, `rgba(79,70,229,${alpha})`);
            ctx!.beginPath();
            ctx!.strokeStyle = grad;
            ctx!.lineWidth = 0.8;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, 'rgba(167,139,250,0.6)');
        glow.addColorStop(1, 'rgba(79,70,229,0)');
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(167,139,250,0.7)';
        ctx!.fill();
      }
    }

    function update() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }
    }

    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }

    init();
    loop();

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export default function Hero() {
  const { t, lang } = useLang();

  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const badgeLabels = lang === 'BG'
    ? ['Лицензирани', 'Доставка в срок', 'Пълна документация']
    : ['Licensed', 'On-time Delivery', 'Full Documentation'];

  const statItems = [
    { value: '2000+', label: t.stats.delivered },
    { value: '45–60', label: t.stats.delivery },
    { value: '100%', label: t.stats.transparent },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.png"
          alt="Purple cars in a row"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/[0.97] via-[#0a0a1a]/[0.82] to-[#0a0a1a]/[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/90 via-transparent to-[#0a0a1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/60 via-transparent to-transparent" />
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(124,58,237,0.1)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-[100px]" style={{ background: 'rgba(79,70,229,0.08)' }} />
        <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full blur-[80px]" style={{ background: 'rgba(167,139,250,0.06)' }} />
      </div>

      {/* Animated particle mesh */}
      <ParticleMesh />

      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.5), rgba(79,70,229,0.5), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }} />
            <span className="text-primary-400 font-semibold text-xs uppercase tracking-[0.25em]">
              {t.hero.label}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-none mb-6 tracking-wide">
            {t.hero.h1a}{' '}
            <span className="text-gradient">{t.hero.h1b}</span>
            <br />
            {t.hero.h1c}{' '}
            <span className="text-gradient">{t.hero.h1d}</span>
          </h1>

          <p className="text-dark-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button onClick={() => scroll('#contact')} className="btn-primary text-center text-base">
              {t.hero.cta}
            </button>
            <button onClick={() => scroll('#how-it-works')} className="btn-outline text-center text-base">
              {t.hero.secondary}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {badgeLabels.map((label, i) => {
              const Icon = [Shield, Truck, FileText][i];
              return (
                <div
                  key={label}
                  className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 transition-all hover:border-primary-500/50"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2850' }}
                >
                  <Icon size={14} className="text-primary-400" />
                  <span className="text-xs text-white font-medium">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats — floating right on desktop */}
        <div className="absolute bottom-12 right-6 lg:right-16 hidden md:flex flex-col gap-3">
          {statItems.map((s) => (
            <div
              key={s.label}
              className="text-right backdrop-blur rounded-xl px-5 py-3 min-w-[150px] transition-all hover:scale-105"
              style={{ background: 'rgba(26,24,48,0.8)', border: '1px solid #2a2850' }}
            >
              <div className="text-2xl font-bold text-gradient-stats">{s.value}</div>
              <div className="text-xs text-dark-300 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scroll('#how-it-works')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-dark-300 hover:text-primary-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">{t.hero.scrollMore}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
