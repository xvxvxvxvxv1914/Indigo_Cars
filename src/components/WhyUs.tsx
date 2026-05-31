import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Award, Users, Clock, TrendingDown, Globe } from 'lucide-react';

const stats = [
  { value: 2000, suffix: '+', label: 'Внесени автомобила', icon: CheckCircle },
  { value: 10, suffix: '+', label: 'Години на пазара', icon: Award },
  { value: 1500, suffix: '+', label: 'Доволни клиенти', icon: Users },
  { value: 30, suffix: '%', label: 'По-евтино от България', icon: TrendingDown },
];

const reasons = [
  {
    icon: Globe,
    title: 'Директен достъп до търгове',
    description:
      'Имаме дилърски акаунти на Copart, IAAI и Manheim. Закупуваме без посредници, което означава по-ниска цена за вас.',
  },
  {
    icon: Clock,
    title: 'Пълна прозрачност',
    description:
      'Следите всяка стъпка — от наддаването до доставката. Реални снимки, реални документи, никакви изненади.',
  },
  {
    icon: CheckCircle,
    title: 'Гарантирана доставка',
    description:
      'Имаме застраховка по целия маршрут. Поемаме отговорност за автомобила ви от момента на покупката.',
  },
  {
    icon: Award,
    title: 'Опитен екип',
    description:
      'Над 10 години опит в автомобилния внос. Познаваме всяка процедура, всеки документ, всяка митница.',
  },
];

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

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
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
    <section id="why-us" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
          alt="Cars"
          className="w-full h-full object-cover object-center opacity-8"
          style={{ opacity: 0.08 }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,26,0.95)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map(({ value, suffix, label, icon: Icon }) => (
            <div
              key={label}
              className="animate-on-scroll card-hover text-center backdrop-blur rounded-2xl p-6"
              style={{ background: '#12102a', border: '1px solid #2a2850' }}
            >
              <Icon size={28} className="text-primary-400 mx-auto mb-3" />
              <div className="font-display text-4xl md:text-5xl text-gradient-stats mb-2">
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div className="text-dark-300 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Why Us content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <p className="section-label">Защо да изберете нас</p>
            <h2 className="section-title mb-8">
              Не просто внос —{' '}
              <span className="text-gradient section-title-accent">пълно обслужване</span>
            </h2>
            <p className="section-subtitle mb-8">
              Занимаваме се изключително с внос на автомобили от Америка. Това е нашата специализация
              и нашата страст. Знаем всеки детайл от процеса и можем да ви спестим хиляди левове.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-block"
            >
              Разговор с експерт
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="animate-on-scroll card-hover rounded-xl p-6"
                  style={{ background: '#12102a', border: '1px solid #2a2850' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(124,58,237,0.15)' }}>
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
