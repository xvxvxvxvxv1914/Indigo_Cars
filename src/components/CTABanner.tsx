import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function CTABanner() {
  const { t } = useLang();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #1a0533 0%, #19113a 45%, #0f0a2a 100%)',
        borderTop: '1px solid rgba(105,30,185,0.25)',
        borderBottom: '1px solid rgba(105,30,185,0.25)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-primary-400" />
              <span className="text-primary-400 font-semibold text-sm uppercase tracking-[0.2em]">
                {t.ctaBanner.badge}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {t.ctaBanner.title}
            </h2>
            <p className="mt-3 text-[#a0a0c8] text-base max-w-xl">{t.ctaBanner.sub}</p>
          </div>

          <a
            href="#contact"
            onClick={scrollToContact}
            className="flex-shrink-0 inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-white whitespace-nowrap active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)',
              boxShadow: '0 4px 20px rgba(105,30,185,0.4)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 0 0 1px rgba(105,30,185,0.5), 0 8px 30px rgba(105,30,185,0.55)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 4px 20px rgba(105,30,185,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            {t.ctaBanner.cta}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
