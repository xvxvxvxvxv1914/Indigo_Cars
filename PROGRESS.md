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

### Секции (компоненти)
| Компонент | Статус | Бележки |
|---|---|---|
| `Navbar` | ✅ | Sticky, transparent→blur на скрол, BG/EN switcher, мобилно меню |
| `Hero` | ✅ | Parallax снимка, particle mesh, stagger entrance, magnetic бутони, статистики floating вдясно |
| `HowItWorks` | ✅ | 5 стъпки в редица, connector линии |
| `HotOffers` | ✅ | Supabase данни; skeleton loading + "Очаквайте скоро" placeholder при празна БД |
| `Partners` | ✅ | Безкраен marquee — Copart / IAAI / Manheim / ADESA с fade на краищата |
| `WhyUs` | ✅ | 4 анимирани брояча + 4 reason карти; твърдо BG текст |
| `RouteMap` | ✅ | САЩ→Ротердам→България; SVG анимирана линия с движеща се точка (desktop) |
| `Testimonials` | ✅ | Carousel, автовъртене 6s, dot навигация; твърдо BG текст |
| `FAQ` | ✅ | Accordion; твърдо BG текст |
| `Contact` | ✅ | Форма → Supabase `contact_inquiries`; error state ако DB недостъпен |
| `Footer` | ✅ | 4 колони; твърдо BG текст |
| `BottomNav` | ✅ | Мобилна навигация (скрита на desktop) |
| `WhatsAppButton` | ✅ | Fixed, пулсиращи рингове, `wa.me/359888000000` |

> **Неизползвани компоненти:** `Services.tsx`, `Auctions.tsx` — съдържат добро съдържание (услуги + търгове), могат да се вкарат като секции по-късно

### Анимации и UX
- **Cursor glow** — лилаво blob следва мишката с lerp (много субтилно, opacity 0.04)
- **Parallax hero** — фоновата снимка се движи на 0.28× скоростта на скрола
- **3D card tilt** — WhyUs и HotOffers карти се накланят 8° на hover
- **Shimmer текст** — gradient accent думи имат движещ се отблясък (4s loop)
- **Scroll progress bar** — 3px лилава лента горе показва прогреса в страницата
- **Hero entrance stagger** — елементите влизат с 5 стъпки забавяне при зареждане
- **Magnetic бутони** — Hero CTA и Navbar CTA леко следват курсора (±8px)
- **SVG маршрутна линия** — чертае се при scroll-in, точка пътува по линията
- **Confetti + popIn** — success анимация на формата
- **`prefers-reduced-motion`** — всички анимации се изключват при системна настройка
- **`scroll-mt-16`** — всички секции имат отстояние от navbar при anchor навигация
- **Секционни разделители** — тънки лилави линии горе/долу на редуващи се секции

---

## Предстои (дизайн)

- [ ] Реални контакти (телефон, имейл, адрес, WhatsApp номер) навсякъде
- [ ] Favicon (сега е default Vite)
- [ ] OG мета тагове за социални мрежи (og:image, og:title)
- [ ] Включване на `Services.tsx` и/или `Auctions.tsx` като секции
- [ ] 404 страница

## Предстои (функционалност)

- [ ] Реален Supabase проект — credentials в `.env`
- [ ] Създаване на таблица `contact_inquiries` в Supabase (колони: name, phone, email, car, budget, message, created_at)
- [ ] RLS политики — само authenticated може да чете, анонимен може да insert
- [ ] `HotOffers` — добавяне на реални оферти от Admin панела (`/admin`)
- [ ] i18n — довършване на EN превод (WhyUs, RouteMap, Testimonials, FAQ, Contact, Footer са твърдо BG)

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
