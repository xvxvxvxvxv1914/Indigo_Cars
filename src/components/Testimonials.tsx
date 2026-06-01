import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLang } from '../context/LangContext';

const testimonials = [
  {
    name: 'Мартин Георгиев',
    location: 'София',
    rating: 5,
    car: 'Ford Mustang GT 2019',
    text: 'Невероятна услуга! Поръчах Mustang от Copart и целият процес мина гладко. Получих колата за точно 7 седмици. Спестих над 8000 лв спрямо цените в България. Горещо препоръчвам!',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Ивелина Стоянова',
    location: 'Варна',
    rating: 5,
    car: 'BMW X5 2021',
    text: 'Много доволна от работата им. Намериха ми точно BMWто, което исках. Документите бяха наред, митницата мина без проблеми. Сега шофирам мечтата си!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Стефан Николов',
    location: 'Пловдив',
    rating: 5,
    car: 'Tesla Model 3 2022',
    text: 'Внесоха ми Tesla Model 3 от Канада. Цялото обслужване беше на ниво. Проследявах контейнера онлайн. Никакви скрити такси, точно каквото уговорихме.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Деян Петров',
    location: 'Бургас',
    rating: 5,
    car: 'Chevrolet Camaro 2020',
    text: 'Три пъти съм ползвал услугите им — всеки път перфектно. Последно внесоха Camaro SS. Екипът е много компетентен и отзивчив. Само добри думи!',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
];

export default function Testimonials() {
  const { t } = useLang();
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-24 relative scroll-mt-16" style={{ background: 'var(--bg-alt)' }} ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.15), transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 animate-on-scroll">
          <p className="section-label">{t.testimonials.label}</p>
          <h2 className="section-title mb-8">
            {t.testimonials.title}{' '}
            <span className="text-gradient section-title-accent">{t.testimonials.titleAccent}</span>
          </h2>
        </div>

        {/* Aggregate stats */}
        <div className="animate-on-scroll flex justify-center gap-10 mb-12">
          <div className="text-center">
            <div className="font-display text-5xl text-gradient-stats mb-1">4.9</div>
            <div className="flex gap-0.5 justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-dark-300 text-xs uppercase tracking-wider">{t.testimonials.avgRating}</div>
          </div>
          <div className="w-px" style={{ background: 'var(--border)' }} />
          <div className="text-center">
            <div className="font-display text-5xl text-gradient-stats mb-1">1500+</div>
            <div className="h-[15px] mb-1" />
            <div className="text-dark-300 text-xs uppercase tracking-wider">{t.testimonials.happyClients}</div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="animate-on-scroll gradient-border-card rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Background quote */}
              <Quote
                size={64}
                className="absolute -top-2 -right-2 pointer-events-none"
                style={{ color: 'rgba(124,58,237,0.07)' }}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-dark-300 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Gradient ring avatar */}
                <div
                  className="flex-shrink-0 rounded-full p-0.5"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa, #4f46e5)' }}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover block"
                  />
                </div>

                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm leading-tight">{item.name}</div>
                  <div className="text-dark-300 text-xs">{item.location}</div>
                </div>

                {/* Car badge */}
                <span
                  className="ml-auto flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium truncate max-w-[120px]"
                  style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa' }}
                >
                  {item.car}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
