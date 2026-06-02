# Миграция Indigo Cars: React + Vite → Next.js (App Router)

> Документ-план. Цел: пълна миграция **без фатални грешки**, изпълнена на **отделен git клон**,
> на фази, всяка от които завършва в работещо състояние. `main` остава непокътнат до края.

**Дата на изготвяне:** 2026-06-02
**Текущ стек:** React 18 + Vite 5 + TypeScript + Tailwind 3 + React Router 6 + Supabase + lucide-react + react-simple-maps
**Целеви стек:** Next.js (App Router) + TypeScript + Tailwind 3 + Supabase
**Хостинг:** Vercel (вече има `.vercel/` — идеален за Next.js)
**Стратегия:** Big-bang на нов клон `feat/nextjs`, изпълнен в 6 фази.
**Стабилен tag:** `v1.0-vite-stable` (main, commit `4fe4ffc`) — Vite версията е запазена, винаги може да се върнеш с `git checkout v1.0-vite-stable`

---

## ПРОГРЕС

| Фаза | Описание | Статус |
|---|---|---|
| 1 | Скеле — Next.js + Tailwind | ✅ завършено |
| 2 | Инфраструктура — contexts + lib + env | ✅ завършено (env и supabase направени в Фаза 1) |
| 3 | Layout + навигация + рутиране | ✅ завършено |
| 4 | Секции (всички компоненти) | ✅ завършено |
| 5 | SEO / images / metadata | ⬜ не започнато |
| 6 | Почистване, build, деплой | ⬜ не започнато |

> Последна актуализация: 2026-06-02

---

## 0. Защо Next.js (накратко) и какво НЕ печелим автоматично

Печелим: SSR/SSG за HTML съдържанието → реален текст в HTML-а за Google (сега Vite дава празен `<div id="root">`), `next/image` оптимизация, `metadata` API за SEO/OG, по-добри Core Web Vitals.

**Важно реалистично очакване:** почти всички 16 компонента са **интерактивни** (`useState`/`useEffect`/scroll listeners), значи ще са **Client Components** (`'use client'`). SEO ползата идва главно от това, че Next.js рендира техния HTML на сървъра преди да ги „хидратира". Текстът в Hero, FAQ, секциите и т.н. ще е в HTML-а — това е печалбата. Не очаквай магия отвъд това.

---

## 1. Карта на текущия проект (какво местим)

### Файлове за пренос (`src/`)
```
src/App.tsx                  → разпада се: app/layout.tsx + app/page.tsx + client wrappers
src/main.tsx                 → изтрива се (Next.js има свой entry)
src/index.css                → app/globals.css (БЕЗ промени по съдържание)
src/vite-env.d.ts            → изтрива се

src/context/LangContext.tsx  → context/LangContext.tsx  (+ 'use client')
src/context/ThemeContext.tsx → context/ThemeContext.tsx (+ 'use client', ВНИМАНИЕ — виж §4.1)

src/lib/supabase.ts          → lib/supabase.ts (смяна на import.meta.env → process.env)
src/lib/useColors.ts         → lib/useColors.ts ('use client' ако ползва hooks)
src/lib/useMagnetic.ts       → lib/useMagnetic.ts ('use client')

src/components/*.tsx (16)    → components/*.tsx  (почти всички + 'use client')
src/pages/Admin.tsx          → app/admin/page.tsx (client)
src/pages/AdminLogin.tsx     → app/admin/login/page.tsx (client)
src/pages/B2B.tsx            → app/b2b/page.tsx (client, lazy → dynamic)
```

### Рутиране (сегашно → целево)
| Сега (React Router) | Next.js (App Router) |
|---|---|
| `/` (HomePage) | `app/page.tsx` |
| `/b2b` | `app/b2b/page.tsx` |
| `/admin` | `app/admin/page.tsx` |
| `/admin/login` | `app/admin/login/page.tsx` |

### Статични ресурси (`public/` — остава както е)
- `hero-image.webp`, `hero-image.png`, `logo.png` → стоят в `public/`, референции `/hero-image.webp` работят 1:1.

---

## 2. 🔴 КРИТИЧНИ КАПАНИ (тук стават „фаталните грешки")

Прочети това ПРЕДИ да започнеш. Всяка точка по-долу е честа причина за счупена миграция.

### 2.1 — `localStorage` в инициализатора на ThemeContext → hydration error
[ThemeContext.tsx](src/context/ThemeContext.tsx) прави:
```ts
const [theme, setTheme] = useState<Theme>(() => localStorage.getItem('theme') || 'dark');
```
На сървъра `localStorage` **не съществува** → crash при SSR. Дори да го защитим, сървърът ще рендира `dark`, а клиентът може да е `light` → **hydration mismatch** (мигаща тема, React warning).
**Решение:** blocking inline `<script>` в `<head>` (в `layout.tsx`), който чете `localStorage` и слага `data-theme` на `<html>` ПРЕДИ React да тръгне. Контекстът инициализира с `'dark'` и синхронизира в `useEffect`. → детайли в §4.1.

### 2.2 — `import.meta.env` не работи в Next.js
[lib/supabase.ts](src/lib/supabase.ts) ползва `import.meta.env.VITE_SUPABASE_URL`.
**Решение:** `process.env.NEXT_PUBLIC_SUPABASE_URL`. Преименуване на env променливите от `VITE_` → `NEXT_PUBLIC_`. → §4.2.

### 2.3 — `react-router-dom` не съществува в Next.js
`Link to=` → `Link href=`; `useNavigate()` → `useRouter()` от `next/navigation`; `useLocation()` → `usePathname()`. Засегнати: [Navbar.tsx](src/components/Navbar.tsx), [BottomNav.tsx](src/components/BottomNav.tsx), [App.tsx](src/App.tsx). → §4.3.

### 2.4 — `react-simple-maps` чупи се при SSR
[RouteMap.tsx](src/components/RouteMap.tsx) ползва SVG карта, която достъпва browser API.
**Решение:** `dynamic(() => import('../components/RouteMap'), { ssr: false })`. Вече е `lazy()`, значи и сега не е критичен за първоначалния рендер. → §4.4.

### 2.5 — Компоненти, които пипат `window`/`document` директно
15 файла ползват `window`/`document`/`localStorage`. В Client Component това е ОК **само вътре в `useEffect`/event handlers** (изпълнява се на клиента), но НЕ в тялото на компонента. Текущият код вече ползва `useEffect` за тези неща — добре. Внимавай само за `Navbar` ред 22: `useState(() => typeof window !== 'undefined' && ...)` — това е безопасно заради `typeof window` проверката.

### 2.6 — Всеки файл с hook/event = `'use client'`
В App Router компонентите по подразбиране са Server Components. Всичко с `useState`/`useEffect`/`useRef`/`onClick`/`createContext` ИЗИСКВА `'use client'` най-горе. Забравиш ли го → build грешка „You're importing a component that needs useState…".

### 2.7 — `<head>` от index.html → `metadata` API
Целият SEO/OG блок от [index.html](index.html) се пренаписва като `export const metadata` в `app/layout.tsx`. Шрифтовете (Google Fonts) → `next/font` (препоръчано) или `<link>` в layout. → §4.5 и Фаза 5.

---

## 3. Подготовка (преди фазите)

```bash
# 1. Гарантирай чист main
git status                       # трябва: clean
git checkout -b feat/nextjs      # работим тук докрай

# 2. Резервно копие на текущия build (по желание)
# dist/ вече е в .gitignore — нищо не пипаме
```
Целият проект е малък (~25 source файла). Очаквано време: 1 фокусирана сесия за фази 1–4, +1 за 5–6 и тестване.

---

## 4. ТЕХНИЧЕСКИ РЕШЕНИЯ на капаните (референция за фазите)

### 4.1 Тема без hydration mismatch
В `app/layout.tsx`, вътре в `<head>` (или най-горе в `<body>`), blocking скрипт:
```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
  }}
/>
```
В `ThemeContext.tsx`:
- `'use client'` най-горе.
- `useState<Theme>('dark')` (БЕЗ четене на localStorage в инициализатора).
- В `useEffect` (mount): прочети `localStorage.getItem('theme')` и `setTheme`.
- Във втори `useEffect([theme])`: `setAttribute` + `localStorage.setItem`.

### 4.2 Env променливи
- `.env`, `.env.example`: `VITE_SUPABASE_URL` → `NEXT_PUBLIC_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `lib/supabase.ts`: `process.env.NEXT_PUBLIC_SUPABASE_URL!` и `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!`.
- **Vercel:** добави новите имена в Project Settings → Environment Variables (старите `VITE_` могат да се изтрият след merge).
- Изтрий `src/vite-env.d.ts`.

### 4.3 Рутиране (точни замени)
```
// React Router                          // Next.js
import { Link } from 'react-router-dom'  → import Link from 'next/link'
<Link to="/b2b">                         → <Link href="/b2b">
import { useNavigate } '...'             → import { useRouter } from 'next/navigation'
const navigate = useNavigate();          → const router = useRouter();
navigate('/b2b')                         → router.push('/b2b')
import { useLocation } '...'             → import { usePathname } from 'next/navigation'
const location = useLocation();          → const pathname = usePathname();
location.pathname                        → pathname
```
**Хеш-навигация (`/#offers`):** логиката в `handleNavClick`/`handleScroll` (Navbar, BottomNav) сравнява `location.pathname !== '/'`. С Next.js: `pathname !== '/'` → `router.push('/#offers')`, иначе `scrollIntoView`. Тествай че от `/b2b` бутоните водят коректно към `/#section`.

### 4.4 react-simple-maps
```tsx
// app/page.tsx (или клиентски wrapper)
import dynamic from 'next/dynamic';
const RouteMap = dynamic(() => import('../components/RouteMap'), {
  ssr: false,
  loading: () => <div className="py-12" />,
});
```

### 4.5 Шрифтове
Опция А (препоръчана) — `next/font/google` в `layout.tsx`:
```tsx
import { Inter, Manrope } from 'next/font/google';
const inter = Inter({ subsets: ['latin','cyrillic'], weight: ['300','400','500','600','700','800','900'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin','cyrillic'], weight: ['500','600','700','800'], variable: '--font-manrope' });
// <html className={`${inter.variable} ${manrope.variable}`}>
```
После в `tailwind.config.js`/`globals.css` мапни `font-family` към тези CSS променливи. Subset `cyrillic` е важен — сайтът е на български.
Опция Б — копирай `<link>` таговете в `layout.tsx` (по-просто, по-малко оптимално).

---

## 5. ФАЗИ НА ИЗПЪЛНЕНИЕ

> Всяка фаза завършва с проверка. НЕ продължавай към следваща, ако текущата не минава.

### Фаза 1 — Скеле (Next.js инсталация + конфигурация)
**Цел:** работещ празен Next.js проект в същата папка.

1. Инсталирай Next.js зависимости (без да трием Vite още):
   ```bash
   npm install next@latest
   # react/react-dom вече са 18.3 — съвместими
   ```
2. Създай `next.config.js`:
   ```js
   /** @type {import('next').NextConfig} */
   module.exports = {
     images: { formats: ['image/webp'] }, // локални images в public/ не искат domains
     reactStrictMode: true,
   };
   ```
3. Обнови `package.json` scripts:
   ```json
   "dev": "next dev",
   "build": "next build",
   "start": "next start",
   "lint": "next lint"
   ```
4. Обнови `tsconfig.json` за Next (Next автоматично го дописва при първи `next dev`; добави `"jsx": "preserve"`, `plugins: [{name:'next'}]`, paths ако ползваш). Изтрий `tsconfig.app.json` / `tsconfig.node.json` (Vite-специфични) — по желание.
5. Създай минимални `app/layout.tsx` + `app/page.tsx` (само `<h1>OK</h1>`).
6. Премести `src/index.css` → `app/globals.css`, импортирай го в `layout.tsx`.
7. `tailwind.config.js`: обнови `content` да сочи към `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`, `./context/**/*.{ts,tsx}`.
8. `postcss.config.js` остава (Tailwind 3 работи 1:1).

**✅ Проверка Фаза 1:** `npm run dev` → `localhost:3000` показва „OK" със стиловете. `npm run build` минава.

---

### Фаза 2 — Инфраструктура (contexts + lib + env)
**Цел:** providers и Supabase работят под Next.

1. Премести `context/` и `lib/` от `src/` в корена (или остави `src/`, но обнови tsconfig paths — препоръчам корен за чистота).
2. Добави `'use client'` в `LangContext.tsx`, `ThemeContext.tsx`, `useMagnetic.ts`, `useColors.ts`.
3. Преработи `ThemeContext.tsx` по §4.1.
4. Преработи `lib/supabase.ts` по §4.2. Преименувай env в `.env` / `.env.example`.
5. Изтрий `src/vite-env.d.ts`, `src/main.tsx`.

**✅ Проверка Фаза 2:** `npm run build` минава (още няма UI, но импортите трябва да резолват).

---

### Фаза 3 — Layout + навигация + рутиране
**Цел:** скелетът на сайта с работещи линкове и тема.

1. `app/layout.tsx`:
   - `export const metadata` от SEO блока на [index.html](index.html) (виж Фаза 5 за пълния списък — тук сложи поне title/description).
   - `<html lang="bg">` + theme скрипт (§4.1) + шрифтове (§4.5).
   - Wrap children в `<ThemeProvider><LangProvider>…`.
   - Глобалните overlay-и (`ScrollProgressBar`, `CursorGlow`, `NavDots` от App.tsx) → изнеси в отделен Client Component `components/GlobalChrome.tsx` с `'use client'`, рендирай го в layout.
2. Премести `components/` от `src/` в корена.
3. Поправи рутирането (§4.3) в `Navbar.tsx` и `BottomNav.tsx`. Добави `'use client'` навсякъде, където има hooks/handlers.
4. Създай страниците-обвивки:
   - `app/page.tsx` (HomePage съдържанието — секциите идват във Фаза 4; засега Navbar+Footer+BottomNav).
   - `app/b2b/page.tsx`, `app/admin/page.tsx`, `app/admin/login/page.tsx`.

**✅ Проверка Фаза 3:** Navbar/Footer/BottomNav се рендират; превключването тема работи без flash/warning; линкът към `/b2b` сменя route; `/admin/login` се отваря.

---

### Фаза 4 — Секции (съдържанието)
**Цел:** пълната начална страница.

1. Сглоби `app/page.tsx` с реда от стария HomePage:
   `Hero → HowItWorks → HotOffers → Partners → WhyUs → RouteMap(dynamic) → Testimonials → FAQ → Calculator → Contact`.
2. `RouteMap` през `dynamic(..., { ssr:false })` (§4.4).
3. `B2B` → беше `lazy()`; сега е собствена route `app/b2b/page.tsx` — директен импорт (Next code-split-ва по route автоматично).
4. Добави `'use client'` на всеки компонент с hooks (на практика всички 16).
5. Хеш-скролът при mount (старо `HomePage` useEffect за `window.location.hash`) → пренеси в малък client useEffect в `app/page.tsx` или `GlobalChrome`.

**✅ Проверка Фаза 4:** цялата начална страница изглежда 1:1 като Vite версията. Сравни визуално с `npm run preview` на стария build. Провери и трите теми/езика, scroll dots, magnetic ефекти.

---

### Фаза 5 — SEO / images / metadata
**Цел:** реалната печалба от Next.js.

1. **Metadata** в `app/layout.tsx` (от [index.html](index.html)):
   ```ts
   export const metadata: Metadata = {
     metadataBase: new URL('https://autoimport.bg'),
     title: 'AutoImport BG - Вносител на автомобили от САЩ и Канада',
     description: '...', // от index.html
     openGraph: { type:'website', locale:'bg_BG', url:'https://autoimport.bg',
       title:'...', description:'...', images:['/og-image.jpg'] },
     twitter: { card:'summary_large_image', title:'...', description:'...', images:['/og-image.jpg'] },
   };
   ```
   ⚠️ OG image сега сочи към Pexels URL — препоръчвам да го заместиш с локален `/public/og-image.jpg` (1200×630).
2. **`next/image`** за `hero-image.webp` и `logo.png`:
   - Замени `<img src="/hero-image.webp">` → `<Image src="/hero-image.webp" width=... height=... priority>` (priority за hero).
   - `logo.png` (629KB!) — компресирай и ползвай `<Image>`; задай `width/height`.
   - Внимавай за layout: `next/image` иска явни размери или `fill` + relative parent.
3. **`favicon`**: смени `vite.svg` → сложи `app/icon.png` или `app/favicon.ico` (Next auto-detect).
4. **`app/sitemap.ts`** и **`app/robots.ts`** (Next генерира `/sitemap.xml`, `/robots.txt`):
   ```ts
   // app/sitemap.ts
   export default function sitemap() {
     return [{ url:'https://autoimport.bg', priority:1 }, { url:'https://autoimport.bg/b2b', priority:0.8 }];
   }
   ```
5. Премахни SEO блока от стария `index.html` (файлът ще се изтрие във Фаза 6).

**✅ Проверка Фаза 5:** „View Source" на `/` показва реален текст + правилен `<title>`/OG в HTML-а (не празен div). `/sitemap.xml` зарежда. Lighthouse SEO + Performance.

---

### Фаза 6 — Почистване, build, деплой
**Цел:** премахване на Vite, финален тест, merge.

1. Изтрий Vite артефактите:
   ```
   vite.config.ts, index.html, src/main.tsx, src/vite-env.d.ts,
   tsconfig.app.json, tsconfig.node.json, dist/
   ```
2. От `package.json` devDependencies премахни: `vite`, `@vitejs/plugin-react`. (Запази Tailwind/PostCSS/eslint/typescript/sharp.)
3. Обнови `eslint.config.js` → `next lint` (Next ползва `eslint-config-next`); инсталирай `eslint-config-next`.
4. Обнови `.gitignore`: добави `.next/`, `next-env.d.ts` (последното се commit-ва обикновено — провери конвенцията).
5. Обнови `README.md` с новите команди.
6. Финален:
   ```bash
   rm -rf node_modules .next && npm install && npm run build && npm run start
   ```
   Тествай на `localhost:3000`: всички routes, теми, езици, Supabase (Admin login + hot offers), форми (Contact/Calculator), мобилен изглед (BottomNav).
7. **Vercel:** увери се че новите `NEXT_PUBLIC_*` env са добавени. Next.js се авто-разпознава (без Build Command override).

**✅ Проверка Фаза 6:** production build минава, всичко работи, Lighthouse е по-добър от Vite версията.

```bash
git add -A && git commit -m "Migrate from Vite to Next.js (App Router)"
# отвори PR feat/nextjs → main, прегледай diff, merge след преглед
```

---

## 6. Чеклист на риска (бърза справка)
- [ ] ThemeContext: премахнат `localStorage` от useState инициализатор (§2.1, §4.1)
- [ ] Theme blocking script в layout
- [ ] `import.meta.env` → `process.env.NEXT_PUBLIC_*` (§2.2)
- [ ] Env преименувани в `.env`, `.env.example`, **Vercel**
- [ ] Всички `react-router-dom` импорти заменени (§2.3, §4.3)
- [ ] Хеш-навигация от не-главни routes тествана
- [ ] `RouteMap` с `dynamic({ssr:false})` (§2.4)
- [ ] `'use client'` на всеки интерактивен файл (§2.6)
- [ ] OG image → локален файл (не Pexels)
- [ ] `next/image` за hero + logo, logo.png компресиран
- [ ] favicon сменен от vite.svg
- [ ] Vite файлове и зависимости изтрити (Фаза 6)

## 7. План за връщане (rollback)
Всичко е на `feat/nextjs`. При проблем:
```bash
git checkout main      # незабавно връщане към работещата Vite версия
git branch -D feat/nextjs   # (само ако решиш да зарежеш)
```
`main` не се пипа до успешен merge — нулев риск за продукцията.
