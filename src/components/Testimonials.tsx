import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

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
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

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

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative" style={{ background: '#0e0d20' }} ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.15), transparent)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 animate-on-scroll">
          <p className="section-label">Отзиви</p>
          <h2 className="section-title mb-8">
            Какво казват{' '}
            <span className="text-gradient section-title-accent">нашите клиенти</span>
          </h2>
        </div>

        {/* Rating summary */}
        <div className="flex justify-center gap-8 mb-12 animate-on-scroll">
          <div className="text-center">
            <div className="font-display text-6xl text-gradient-stats mb-2">4.9</div>
            <div className="flex gap-1 justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-primary-500 fill-primary-500" />
              ))}
            </div>
            <div className="text-dark-300 text-sm">Средна оценка</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="font-display text-6xl text-gradient-stats mb-2">1500+</div>
            <div className="text-dark-300 text-sm mt-4">Доволни клиенти</div>
          </div>
        </div>

        {/* Testimonial carousel */}
        <div className="relative max-w-3xl mx-auto animate-on-scroll">
          <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden" style={{ background: '#12102a', border: '1px solid #2a2850' }}>
            <Quote size={48} className="absolute top-6 right-6" style={{ color: 'rgba(124,58,237,0.1)' }} />

            <div className="flex items-center gap-4 mb-6">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover"
                style={{ border: '2px solid rgba(124,58,237,0.5)' }}
              />
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-dark-300 text-sm">{t.location}</div>
                <div className="text-primary-400 text-xs mt-0.5">{t.car}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-primary-500 fill-primary-500" />
                ))}
              </div>
            </div>

            <p className="text-dark-300 text-lg leading-relaxed italic">"{t.text}"</p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#7c3aed'; (e.currentTarget as HTMLButtonElement).style.color = '#a78bfa'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '1.5rem' : '0.5rem',
                    height: '0.5rem',
                    background: i === current ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#7c3aed'; (e.currentTarget as HTMLButtonElement).style.color = '#a78bfa'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
