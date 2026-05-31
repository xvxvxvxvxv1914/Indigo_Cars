import { useEffect, useRef } from 'react';
import { MessageCircle, Search, Gavel, Ship, FileCheck } from 'lucide-react';
import { useLang } from '../context/LangContext';

const stepsData = [
  {
    icon: MessageCircle,
    labelBG: 'Запитване',
    labelEN: 'Inquiry',
    descBG: 'Споделяте изискванията и предпочитанията си.',
    descEN: 'Share your requirements and preferences.',
    step: '01',
  },
  {
    icon: Search,
    labelBG: 'Подбор и оферта',
    labelEN: 'Selection & Quote',
    descBG: 'Намираме най-добрите опции и ви предоставяме оферта.',
    descEN: 'We find the best options and provide a quote.',
    step: '02',
  },
  {
    icon: Gavel,
    labelBG: 'Изкупуване',
    labelEN: 'Purchase',
    descBG: 'Изкупуваме автомобила на най-добра цена.',
    descEN: 'We purchase the car at the best price.',
    step: '03',
  },
  {
    icon: Ship,
    labelBG: 'Доставка',
    labelEN: 'Shipping',
    descBG: 'Транспортираме автомобила до България.',
    descEN: 'We transport the car to Bulgaria.',
    step: '04',
  },
  {
    icon: FileCheck,
    labelBG: 'Митница и доставка',
    labelEN: 'Customs & Delivery',
    descBG: 'Митническо оформяне и доставка до вас.',
    descEN: 'Customs clearance and delivery to you.',
    step: '05',
  },
];

export default function HowItWorks() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
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
    <section id="how-it-works" className="py-24 relative scroll-mt-16" ref={sectionRef} style={{ background: '#0e0d20' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#12102a]/60 to-[#0a0a1a]" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.15), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">{t.howItWorks.label}</p>
          <h2 className="section-title mb-8">
            {t.howItWorks.title}{' '}
            <span className="text-gradient section-title-accent">{t.howItWorks.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.howItWorks.sub}</p>
        </div>

        {/* Horizontal steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
          {stepsData.map((step, idx) => {
            const Icon = step.icon;
            const label = lang === 'BG' ? step.labelBG : step.labelEN;
            const desc = lang === 'BG' ? step.descBG : step.descEN;
            return (
              <div key={step.step} className="animate-on-scroll flex flex-col items-center text-center relative">
                {/* Connector line */}
                {idx < stepsData.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-primary-600/50 to-primary-600/10 z-0" />
                )}

                {/* Step number badge */}
                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-glow-sm transition-all hover:scale-105 duration-300" style={{ background: '#1a1830', border: '2px solid #3d3a6e' }}>
                    <Icon size={26} className="text-primary-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}>
                    {idx + 1}
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm mb-1">{label}</h3>
                <p className="text-dark-300 text-xs leading-relaxed max-w-[140px]">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
