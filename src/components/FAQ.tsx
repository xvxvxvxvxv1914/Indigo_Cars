import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function FAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpenIndex(null); }, [t]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-12 relative scroll-mt-16" style={{ background: 'var(--bg-main)' }} ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(129,32,198,0.2), transparent)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-on-scroll">
          <p className="section-label">{t.faq.label}</p>
          <h2 className="section-title mb-8">
            {t.faq.title}{' '}
            <span className="text-gradient section-title-accent">{t.faq.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.faq.sub}</p>
        </div>

        <div className="space-y-2">
          {t.faq.items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="animate-on-scroll rounded-xl overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${isOpen ? 'rgba(129,32,198,0.4)' : 'var(--border)'}`,
                  boxShadow: isOpen ? 'inset 3px 0 0 #8120C6' : 'inset 3px 0 0 transparent',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  onClick={() => toggle(i)}
                >
                  {/* Number badge */}
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-display"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, #8120C6 0%, #5020a0 100%)'
                        : 'rgba(129,32,198,0.12)',
                      color: isOpen ? '#fff' : '#c4a0f0',
                      transition: 'background 0.3s ease, color 0.3s ease',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="font-semibold text-white flex-1 text-sm md:text-base leading-snug">
                    {faq.q}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-primary-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <p
                    className="text-dark-300 leading-relaxed text-sm pb-5 pr-5"
                    style={{ paddingLeft: 'calc(1.25rem + 2rem + 1rem)' }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
