import { useEffect, useRef, useState } from 'react';
import { MapPin, DollarSign, ExternalLink, MessageSquare } from 'lucide-react';
import { supabase, HotOffer } from '../lib/supabase';
import { useLang } from '../context/LangContext';

export default function HotOffers() {
  const { t, lang } = useLang();
  const [offers, setOffers] = useState<HotOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOffers();
  }, []);

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  async function fetchOffers() {
    try {
      const { data, error } = await supabase
        .from('hot_offers')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      setOffers(data || []);
    } finally {
      setLoading(false);
    }
  }

  const conditionColor = (c: string) => {
    const lower = c.toLowerCase();
    if (lower === 'excellent') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (lower === 'good') return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    if (lower === 'fair') return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <section id="offers" className="py-24 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#12102a]/30 to-[#0a0a1a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">{t.offers.label}</p>
          <h2 className="section-title mb-8">
            {t.offers.title}{' '}
            <span className="text-gradient section-title-accent">{t.offers.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.offers.sub}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-2 border-dark-700 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-16 text-dark-400">{t.offers.noOffers}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="animate-on-scroll card-hover rounded-2xl overflow-hidden flex flex-col group"
                style={{ background: '#12102a', border: '1px solid #2a2850' }}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden" style={{ background: '#0a0a1a' }}>
                  {offer.images?.length > 0 ? (
                    <img
                      src={offer.images[0]}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 22 22" fill="none" className="opacity-20">
                        <path d="M3 14L2 17H20L19 14H3Z" fill="white" />
                        <path d="M5 14L6.5 9H15.5L17 14H5Z" fill="white" opacity="0.7" />
                        <circle cx="7" cy="17.5" r="1.5" fill="white" />
                        <circle cx="15" cy="17.5" r="1.5" fill="white" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12102a]/60 to-transparent" />
                  {/* Condition badge */}
                  <div className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full border font-medium ${conditionColor(offer.condition)}`}>
                    {offer.condition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">
                    {offer.title}
                  </h3>

                  <div className="flex items-center gap-1 text-dark-300 text-xs">
                    <MapPin size={11} className="text-primary-500 flex-shrink-0" />
                    <span className="truncate">{offer.location}</span>
                  </div>

                  <div className="flex items-center gap-1 mt-auto">
                    <DollarSign size={16} className="text-primary-400" />
                    <span className="text-lg font-bold text-white">
                      {offer.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 flex items-center justify-center gap-1 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all hover:shadow-glow-sm hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
                    >
                      <MessageSquare size={12} />
                      {t.offers.inquire}
                    </button>
                    {offer.copart_url && (
                      <a
                        href={offer.copart_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                        style={{ background: '#1a1830', border: '1px solid #2a2850' }}
                        title="View on Copart"
                      >
                        <ExternalLink size={13} className="text-dark-300" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
