import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Award, Users, Clock, TrendingDown, Globe } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

function onTiltMove(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transition = 'transform 0.08s ease';
  el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
}
function onTiltLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transition = 'transform 0.5s ease';
  e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
}

const statsMeta = [
  { value: 2000, suffix: '+', icon: CheckCircle },
  { value: 10,   suffix: '+', icon: Award },
  { value: 1500, suffix: '+', icon: Users },
  { value: 30,   suffix: '%', icon: TrendingDown },
];

const reasonIcons = [Globe, Clock, CheckCircle, Award];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function WhyUs() {
  const { t } = useLang();
  const { theme } = useTheme();
  const light = theme === 'light';
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
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
    <section id="why-us" className="py-24 relative overflow-hidden scroll-mt-16" ref={sectionRef}
      style={{ background: 'var(--bg-alt)' }}>
      {!light && (
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
            alt="Cars"
            className="w-full h-full object-cover object-center"
            loading="lazy" decoding="async"
            style={{ opacity: 0.08 }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(10,10,26,0.95)' }} />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {statsMeta.map(({ value, suffix, icon: Icon }, i) => (
            <div
              key={i}
              className="animate-on-scroll gradient-border-card text-center backdrop-blur rounded-2xl p-6"
              style={{ willChange: 'transform' }}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <Icon size={28} className="text-primary-400 mx-auto mb-3" />
              <div className="font-display text-4xl md:text-5xl text-gradient-stats mb-2">
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div className="text-dark-300 text-sm">{t.whyUs.stats[i].label}</div>
            </div>
          ))}
        </div>

        {/* Why Us content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <p className="section-label">{t.whyUs.label}</p>
            <h2 className="section-title mb-8">
              {t.whyUs.title}{' '}
              <span className="text-gradient section-title-accent">{t.whyUs.titleAccent}</span>
            </h2>
            <p className="section-subtitle mb-8">{t.whyUs.sub}</p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary inline-block"
            >
              {t.whyUs.cta}
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {t.whyUs.reasons.map((reason, i) => {
              const Icon = reasonIcons[i];
              return (
                <div
                  key={i}
                  className="animate-on-scroll gradient-border-card rounded-xl p-6"
                  style={{ willChange: 'transform' }}
                  onMouseMove={onTiltMove}
                  onMouseLeave={onTiltLeave}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(99,102,241,0.15)' }}>
                    <Icon size={20} className="text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
