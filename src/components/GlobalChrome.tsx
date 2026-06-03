'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -600, y: -600 });
  const target = useRef({ x: -600, y: -600 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });
    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x - 250}px, ${pos.current.y - 250}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{ zIndex: 0, background: 'radial-gradient(circle, rgba(105,30,185,0.04) 0%, transparent 65%)', filter: 'blur(40px)' }}
    />
  );
}

function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          if (barRef.current) barRef.current.style.width = `${pct}%`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none" style={{ height: '3px' }}>
      <div ref={barRef} style={{ height: '100%', width: '0%', background: 'linear-gradient(to right, #691EB9, #E7E4F0, #4a158a)', transition: 'width 0.05s linear' }} />
    </div>
  );
}

function NavDots() {
  const { t } = useLang();
  const { theme } = useTheme();
  const light = theme === 'light';
  const [active, setActive] = useState('hero');

  const sections = useMemo(() => [
    { id: 'hero',         label: t.nav.home },
    { id: 'how-it-works', label: t.nav.howItWorks },
    { id: 'offers',       label: t.nav.offers },
    { id: 'why-us',       label: t.nav.whyUs },
    { id: 'testimonials', label: t.nav.testimonials },
    { id: 'faq',          label: t.nav.faq },
    { id: 'calculator',   label: t.calculator.label },
    { id: 'contact',      label: t.nav.contact },
  ], [t]);

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      let closest = sections[0].id;
      let closestDist = Infinity;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < closestDist) { closestDist = dist; closest = id; }
      }
      setActive(closest);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 flex-col gap-3.5 z-50">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center justify-end"
          aria-label={label}
        >
          <span
            className="absolute right-5 px-2.5 py-1 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap translate-x-1 group-hover:translate-x-0"
            style={{
              background: light ? '#ffffff' : '#201545',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              boxShadow: light ? '0 2px 12px rgba(105,30,185,0.12)' : '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            {label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width:      active === id ? '10px' : '6px',
              height:     active === id ? '10px' : '6px',
              background: active === id ? '#691EB9' : 'transparent',
              border:     `2px solid ${active === id ? '#691EB9' : 'rgba(105,30,185,0.35)'}`,
              boxShadow:  active === id ? '0 0 8px rgba(105,30,185,0.55)' : 'none',
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default function GlobalChrome() {
  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
      <NavDots />
    </>
  );
}
