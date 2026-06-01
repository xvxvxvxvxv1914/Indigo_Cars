import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function FAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenIndex(null);
  }, [t]);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" className="py-24 relative scroll-mt-16" style={{ background: '#0a0a1a' }} ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.2), transparent)' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="section-label">{t.faq.label}</p>
          <h2 className="section-title mb-8">
            {t.faq.title}{' '}
            <span className="text-gradient section-title-accent">{t.faq.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.faq.sub}</p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, index) => (
            <div
              key={index}
              className="animate-on-scroll rounded-xl overflow-hidden transition-all"
              style={{
                background: '#12102a',
                border: `1px solid ${openIndex === index ? 'rgba(124,58,237,0.4)' : '#2a2850'}`,
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-primary-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-dark-300 px-6 pb-5 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
