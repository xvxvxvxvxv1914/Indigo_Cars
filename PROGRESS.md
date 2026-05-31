# Indigo Cars — Прогрес

## Стек
React 18 + TypeScript + Vite + Tailwind CSS + Supabase + React Router v6

## Дизайн система
- **Цветове:** лилав градиент `#7c3aed → #4f46e5`, тъмен navy фон `#0a0a1a / #12102a / #0e0d20`
- **Бордер:** `#2a2850`
- **Шрифтове:** Bebas Neue (заглавия) + Inter (тяло)
- **Карти:** `background: #12102a, border: 1px solid #2a2850, border-radius: 2xl`

---

## Направено

### Инфраструктура
- Hero снимка в `public/hero-image.png` (лилави Audi/Mercedes нощем)
- `.env` с placeholder Supabase credentials — приложението не крашва без реален DB
- `.env.example` — шаблон за реален проект
- Vercel deployment — работи, commit-ите трябва да са с автор `Nikolay Dobrev <50406120+xvxvxvxvxv1914@users.noreply.github.com>`

### Секции (компоненти)
| Компонент | Статус | Бележки |
|---|---|---|
| `Navbar` | ✅ | Sticky, transparent→blur на скрол, BG/EN switcher, мобилно меню |
| `Hero` | ✅ | Parallax снимка, particle mesh, stagger entrance, magnetic бутони, статистики floating вдясно |
| `HowItWorks` | ✅ | 5 стъпки в редица, connector линии |
| `HotOffers` | ✅ | Supabase данни; skeleton loading + "Очаквайте скоро" placeholder; Carfax бейдж |
| `Partners` | ✅ | Безкраен marquee — Copart / IAAI / Manheim / ADESA с fade на краищата |
| `WhyUs` | ✅ | 4 анимирани брояча + 4 reason карти; твърдо BG текст |
| `RouteMap` | ✅ | САЩ→Ротердам→България; SVG анимирана линия с движеща се точка (desktop) |
| `Testimonials` | ✅ | Carousel, автовъртене 6s, dot навигация; твърдо BG текст |
| `FAQ` | ✅ | Accordion; твърдо BG текст |
| `Calculator` | ✅ | Интерактивен калкулатор с пълна разбивка на разходите (виж по-долу) |
| `Contact` | ✅ | Форма → Supabase `contact_inquiries`; error state ако DB недостъпен |
| `Footer` | ✅ | 4 колони; твърдо BG текст |
| `BottomNav` | ✅ | Мобилна навигация (скрита на desktop) |
| `WhatsAppButton` | ✅ | Fixed, пулсиращи рингове, `wa.me/359888000000` |

> **Неизползвани компоненти:** `Services.tsx`, `Auctions.tsx` — съдържат добро съдържание, могат да се вкарат по-късно

### Калкулатор (Calculator.tsx)
- Слайдер $1,000–$60,000 с лилав gradient track + quick buttons ($5k/$10k/…/$45k)
- Избор на вид гориво (Бензин / Дизел / Ел.) — влияе на акциза
- Пълна разбивка: цена + аукционна такса + транспорт US + океански превоз + застраховка + Ротердам + митница 6.5% + акциз + ДДС 20% + такса услуга
- Анимирани числа при промяна на слайдера (requestAnimationFrame cubic ease)
- Badge „Спестявате ~€X vs. БГ дилър" (показва се динамично)
- Резултат в EUR + BGN
- CTA → скролира към контакт формата

### Carfax бейдж
- `carfax_verified: boolean` поле в HotOffer типа
- Червен щит + "CARFAX ✓" бейдж долу вляво на снимката на офертата
- Toggle в Admin панела (/admin) за маркиране на верифицирани коли
- При свързване на реален Supabase: добави колона `carfax_verified boolean default false` към `hot_offers`

### Анимации и UX
- **Cursor glow** — лилаво blob следва мишката с lerp (opacity 0.04, много субтилно)
- **Parallax hero** — фоновата снимка се движи на 0.28× скоростта на скрола
- **3D card tilt** — WhyUs (8°) и HotOffers (7°) карти се накланят на hover
- **Shimmer текст** — gradient accent думи имат движещ се отблясък (4s loop)
- **Scroll progress bar** — 3px лилава лента горе показва прогреса в страницата
- **Hero entrance stagger** — 5 елемента влизат с нарастващо забавяне при зареждане
- **Magnetic бутони** — Hero CTA и Navbar CTA леко следват курсора (±8px)
- **SVG маршрутна линия** — чертае се при scroll-in, точка пътува по линията
- **Confetti + popIn** — success анимация на формата
- **Partner marquee** — Copart/IAAI/Manheim/ADESA безкрайно се движат
- **`prefers-reduced-motion`** — всички анимации се изключват при системна настройка
- **`scroll-mt-16`** — всички секции имат отстояние от navbar при anchor навигация
- **Секционни разделители** — тънки лилави линии горе/долу на редуващи се секции

### Vercel / Deploy
- **Проблем с BLOCKED:** commit-ите с автор `ugu / ytfyt@abv.bg` се блокират от Vercel
- **Решение:** всеки commit трябва да е с `--author="Nikolay Dobrev <50406120+xvxvxvxvxv1914@users.noreply.github.com>"`
- **Постоянно решение:** `git config --global user.email "50406120+xvxvxvxvxv1914@users.noreply.github.com"` и `git config --global user.name "Nikolay Dobrev"`
- Placeholder env vars са зададени на Vercel (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

---

## Предстои (дизайн)

- [ ] Реални контакти (телефон, имейл, адрес, WhatsApp номер) навсякъде
- [ ] Favicon (сега е default Vite)
- [ ] OG мета тагове за социални мрежи (og:image, og:title)
- [ ] Включване на `Services.tsx` и/или `Auctions.tsx` като секции
- [ ] 404 страница
- [ ] Секция „За нас" с реален екип/собственик
- [ ] Реални отзиви (не Pexels снимки)
- [ ] Видео или галерия от вече внесени коли

## Предстои (функционалност)

- [ ] Реален Supabase проект — credentials в `.env`
- [ ] Създаване на таблица `contact_inquiries` (name, phone, email, car, budget, message, created_at)
- [ ] Добавяне на колона `carfax_verified boolean default false` към `hot_offers`
- [ ] RLS политики — само authenticated може да чете, анонимен може да insert
- [ ] `HotOffers` — добавяне на реални оферти от Admin панела (`/admin`)
- [ ] i18n — довършване на EN превод (WhyUs, RouteMap, Testimonials, FAQ, Contact, Footer са твърдо BG)
- [ ] Carfax PDF качване в Supabase Storage + download бутон на офертата

---

## Git история (основни commit-и)

| Hash | Описание |
|---|---|
| `35aa40c` | Initial repo |
| `adbc2f6` | Hero снимка + Supabase crash fix |
| `d25b48a` | Визуален дизайн (placeholder карти, контраст, разделители) |
| `358722d` | Анимации v1 (cursor, parallax, tilt, shimmer) |
| `da2a2eb` | Анимации v2 (scroll bar, magnetic, marquee, SVG линия, stagger, WhatsApp, confetti) |
| `d7ea090` | UX (scroll-mt, реална форма, по-нежни ефекти) |
| `29d0af0` | Carfax бейдж на картите + Admin toggle |
| `0bf434d` | Калкулатор за разходи по внос |
