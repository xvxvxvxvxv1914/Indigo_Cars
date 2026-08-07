# Indigo Cars — Пълен одит на сайта

**Дата:** 2026-08-07
**Обхват:** целият код (55 файла), live проверки срещу `indigocars.eu`, build/typecheck/lint/npm audit
**Предишен одит:** 2026-06-09 (архивиран най-долу — точки #1–9)
**Проверено срещу:** commit `b8a629f` (main == origin/main)

Легенда: 🔴 блокер · 🟠 важно · 🟡 дребно
`[ME]` = мога да го оправя сам · `[INPUT]` = трябва информация/решение от теб или клиента

---

## 📊 Обобщение

| Категория | 🔴 | 🟠 | 🟡 |
|---|---|---|---|
| Контакти и доверие | 4 | 2 | — |
| Маркетинг / конверсии | 2 | 3 | — |
| Производителност / инфра | 3 | 3 | 2 |
| Сигурност | 1 | 3 | 2 |
| SEO | — | 4 | 3 |
| Достъпност (a11y) | — | 3 | 4 |
| Код и поддръжка | — | 2 | 7 |

**Какво работи добре:** локалните маршрути `/bg /ru /en /ro` са коректни (hreflang, canonical, `<html lang>`, per-page metadata, sitemap с alternates); и 4-те превода са пълни (269 ключа всеки, гарантирано от TypeScript); typecheck и lint минават чисто; билдът е зелен; code-splitting с `dynamic()` е добър; email injection е затворен; `.env.local` не е в git.

---

## 🔴 P0 — блокери за реална употреба

### [ ] 1. Няма телефонен номер никъде на сайта `[INPUT]`
Показва се буквално `—`. Клиент не може да се обади — това е основният канал за такъв бизнес.
- `src/components/Navbar.tsx:152` (десктоп) и `:248` (мобилно меню)
- `src/components/Contact.tsx:69` — `value: '—', href: '#'`
- `src/components/Footer.tsx:87`
- **Нужно:** реален номер → после `tel:` линкове навсякъде.

### [ ] 2. B2B страницата показва измислени контакти `[INPUT]`
Това е публично видимо и активно вреди на доверието.
- `src/legacy-pages/B2B.tsx:340` — `href="tel:+35989123456"` (само 8 цифри, невалиден номер)
- `src/legacy-pages/B2B.tsx:346` — показва `+359 89 123 4567` — **различен от href-а**
- `src/legacy-pages/B2B.tsx:349,355` — `b2b@indigocars.bg` — **грешен домейн**, сайтът е `.eu`

### [ ] 3. WhatsApp бутонът изобщо не съществува на сайта `[ME]` + `[INPUT]`
`src/components/WhatsAppButton.tsx` е написан, но **не е импортнат никъде** — grep потвърждава 0 употреби. Тоест сайтът няма WhatsApp CTA, а за руско/българска аудитория това е основен канал.
- Освен това номерът вътре е плейсхолдър: `WhatsAppButton.tsx:11` → `359XXXXXXXXX`
- **Действие:** вземи номер → добави в `GlobalChrome.tsx` (за да излиза на всички страници).

### [ ] 4. Нула анализи и tracking — платената реклама ще е сляпа `[ME]`
Grep за `gtag|dataLayer|googletagmanager|analytics|fbq|pixel` в целия `src/` → **0 съвпадения**.
- Няма GA4, няма GTM, няма Meta Pixel, няма Vercel Analytics
- Няма conversion event при успешно изпращане на формата (`Contact.tsx:56`)
- **Следствие:** не може да се измери цена на лийд, не може да се оптимизира кампания, Google/Meta нямат сигнал за обучение на алгоритъма.
- **Минимум:** GA4 + conversion event на form submit + Vercel Analytics. Gate-нато зад cookie consent (виж #19).

### [ ] 5. Формата за контакт няма никаква защита от спам `[ME]`
`src/app/api/contact/route.ts` — POST endpoint без:
- rate limiting (по IP или изобщо)
- honeypot поле
- CAPTCHA / Turnstile
- валидация на дължина на полетата (може да се вкара 10 MB съобщение)
- валидация на формат на имейл/телефон (проверява се само `!name || !phone`)

**Следствие:** бот може да напълни `contact_inquiries` и да изчерпи Resend квотата за минути. Това е директно свързано с плана за платена реклама — spam ботовете намират форми бързо.

### [ ] 6. Фалшиви отзиви и измислени статистики `[INPUT]` — правен риск
- `src/locales/*.json:83-86` — 4 отзива с измислени имена/градове + **снимки на реални непознати хора от Pexels** като аватари
- `Testimonials.tsx:29,39` — „4.9" рейтинг и „1500+ доволни клиенти"
- `Hero.tsx:25,150` — „2000+ доставени"
- `WhyUs.tsx:22-27` — 2000+, 10+, 1500+, 30%
- **Вътрешно противоречие:** hero казва 2000+, testimonials казва 1500+ — на една и съща страница
- **Риск:** ЗЗП / Директива 2005/29/ЕО за нелоялни търговски практики. Фалшивите отзиви са изрично забранени (Omnibus директива). КЗП може да глоби.
- **Решение:** или реални отзиви с съгласие, или махане на секцията, или ясно означаване „примерни".

---

## 🔴 P0 — производителност и инфраструктура

### [ ] 7. Нула CDN кеширане — всяка заявка удря origin-а `[ME]`
Проверено live, два последователни hit-а:
```
https://indigocars.eu/bg          → X-Vercel-Cache: MISS, Cache-Control: private, no-cache, no-store
https://indigocars.eu/bg/privacy  → X-Vercel-Cache: MISS, no-store
https://indigocars.eu/bg/b2b      → X-Vercel-Cache: MISS, no-store
```
Билдът маркира тези страници като `● SSG`, но live се сервират динамично при всяко посещение.
- **Вероятна причина (за проверка):** `await headers()` в `src/app/layout.tsx:48` прави цялото дърво динамично. Ползва се само за да прочете `x-locale` от middleware — а locale-ът вече е наличен като route параметър в `[lang]/layout.tsx`.
- **Ефект:** по-лош TTFB → по-лош LCP → по-нисък ranking и по-скъп Quality Score в Google Ads; плюс всяка заявка е функция-инвокация (сметка при Vercel).
- **Фикс:** махни `headers()` от root layout, премести `<html lang>` в `[lang]/layout.tsx` (или generateStaticParams-базиран подход).

### [ ] 8. logo.png е 615 KB за лого, което се показва 28px високо `[ME]`
- `public/logo.png` — **1078×250 px, 614.9 KB**, вмъкнато като суров `<img>` в `Navbar.tsx:122` с `className="h-7"` (28px)
- Сервира се с `Cache-Control: public, max-age=0, must-revalidate` → браузърът го ревалидира при всяка навигация
- `src/app/icon.png` — 512×512, 121.8 KB
- **Фикс:** WebP/AVIF на 2× от реалния размер (~56px височина) → под 10 KB, плюс `next/image` или явни cache headers в `next.config.js`.
- Бонус: `layout.tsx:63` prelоad-ва hero-image.webp, но Vercel добавя и preload на logo.png — тоест 630 KB се дърпат преди всичко останало.

### [ ] 9. Липсват всички security headers `[ME]`
Проверено live — има само `Strict-Transport-Security` (по подразбиране от Vercel). Липсват:
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options` / `frame-ancestors` (сайтът може да се embed-не в iframe → clickjacking)
- `Referrer-Policy`
- `Permissions-Policy`
- Плюс: `X-Powered-By: Next.js` изтича версията на framework-а → `poweredByHeader: false`
- **Фикс:** `headers()` блок в `next.config.js` (той в момента съдържа само 5 реда).

---

## 🟠 P1 — важни

### [ ] 10. 6 уязвимости в зависимостите, 5 от тях high `[ME]`
`npm audit --omit=dev`:
| Пакет | Текущ | Проблем |
|---|---|---|
| `next` | 15.5.19 | 5 advisories (SSRF в rewrites, DoS в Image API, разкриване на Server Function endpoints, cache confusion) → 15.5.23 |
| `postcss` | 8.4.47 | XSS + path traversal през sourceMappingURL → 8.5.26 |
| `sharp` | 0.34.5 | libvips CVE-2026-33327/33328/35590/35591 → 0.35.3 (breaking) |
| `ws` | 8.x | uninitialized memory disclosure, DoS |

Освен това силно изостанали: `lucide-react` 0.344 → 1.30, `@supabase/supabase-js` 2.57 → 2.112, `tailwindcss` 3.4 → 4.3, `react` 18 → 19, `next` 15 → 16.
**Действие:** `npm audit fix` (непробивните) веднага; sharp/major upgrade-и — на отделен branch през preview.

### [ ] 11. Вътрешни DB грешки изтичат към клиента `[ME]`
`src/app/api/contact/route.ts:37` — `return NextResponse.json({ error: dbError.message }, { status: 500 })`.
Supabase съобщенията разкриват имена на таблици/колони/констрейнти. Върни генерично съобщение, логвай детайла сървърно.

### [ ] 12. Три различни имейл идентичности `[INPUT]`
- Сайтът показва: `info@indigocars.eu`
- Заявките отиват на: `indigocars@atomicmail.io` (`route.ts:78`)
- Пращат се **от**: `leads@thestormwatcher.com` (`route.ts:77`) — чужд домейн
- **Следствие:** висок шанс писмата да падат в спам (SPF/DKIM на чужд домейн); клиентът получава лийдове на адрес, който не е брандиран.
- **Решение:** верифицирай `indigocars.eu` в Resend → изпращай от `noreply@indigocars.eu`, получавай на реалната кутия.

### [ ] 13. B2B страницата няма преводи — румънците виждат английски `[ME]`
`src/legacy-pages/B2B.tsx` — **0 употреби на `t.*`**. Вместо това 24 inline тернара `lang === 'BG' ? ... : lang === 'RU' ? ... : 'English'`.
- `lang === 'RO'` се среща **0 пъти** → `/ro/b2b` има румънско `<title>` (от `b2b/layout.tsx`) и **английско тяло**
- Езиково несъответствие title↔body е негативен SEO сигнал
- Съдържанието не е достъпно за преводач (не е в `locales/*.json`)
- **Фикс:** изнеси текстовете в `locales/*.json` под ключ `b2b`.

### [ ] 14. Footer навигацията е счупена `[ME]`
- `Footer.tsx:6` — `sectionHrefs = ['#how-it-works', '#how-it-works', '#how-it-works', '#how-it-works', '#how-it-works']` → **всичките 5 линка „Услуги" водят на едно и също място**
- `Footer.tsx:43` — Facebook / Instagram / YouTube иконки с `href="#"` → водят наникъде. Или сложи реални профили, или ги махни (мъртви соц. иконки вредят на доверието).

### [ ] 15. Всичките 4 езика се изтеглят от всеки посетител `[ME]`
`src/context/LangContext.tsx:6-9` — статичен import на `bg.json`, `en.json`, `ru.json`, `ro.json` в client компонент → и четирите (~96 KB суров JSON) влизат в клиентския бъндъл, макар че на `/bg` трябва само един.
First Load JS на началната страница е 145 kB. **Фикс:** подавай преводите като prop от server layout-а по `lang`.

### [ ] 16. Няма страници за отделни оферти — нулева SEO стойност от инвентара `[ME]`
`HotOffers.tsx` показва максимум 5 оферти (`.limit(5)`), само на началната страница, без detail страница, без URL, без структурирани данни.
- Няма `/bg/oferti/[slug]` → Google не индексира нито една кола
- Няма `Product` / `Vehicle` / `Offer` schema.org
- Няма как да се сподели линк към конкретна оферта
- **Това е най-голямата пропусната SEO възможност на сайта** — long-tail заявки от типа „Ford Mustang GT внос от САЩ цена" не могат да ви намерят.

### [ ] 17. Калкулаторът работи с твърдо кодирани курсове и измислена база за „спестяване" `[INPUT]`
`src/components/Calculator.tsx`:
- `:9` — `USD_TO_EUR = 0.92` — твърдо кодиран, курсът се движи; остарял курс = грешна оферта
- `:10` — `EUR_TO_BGN = 1.956` — **провери дали изобщо е още релевантно** предвид приемането на еврото в България; ако да, показвай го като информативно, не като основна валута
- `:43` — `bgMarketPrice = priceEUR * 1.55`, а от него се смята „спестявате €X" — тоест **спестяването е изчислено от измислен коефициент 55% надценка**. Това е рекламно твърдение без основа.
- `:36` — акциз €150/€180 според гориво — потвърди дали е реален за БГ внос
- **Фикс:** курс от API (или ръчно поле с дата „курс към DD.MM"), и или премахни „спестяването", или го подпри с реални пазарни данни + дисклеймър.

### [ ] 18. Cookie банерът е декоративен `[ME]`
`src/components/CookieConsent.tsx` — записва `cookie_consent` в localStorage и... нищо повече.
- „Отказ" не изключва нищо (няма какво да изключи — няма tracking)
- Няма как потребителят да промени избора си после (няма линк във footer-а)
- Няма разделяне по категории (необходими / аналитични / маркетингови)
- **Важно:** щом добавиш GA4 (#4), банерът трябва да започне реално да гейтва скриптовете, иначе е GDPR нарушение.
- Отделно: сайтът зарежда **външни ресурси преди съгласие** — Pexels, Unsplash, jsDelivr (виж #29). Това само по себе си е предаване на IP към трети страни.

### [ ] 19. Фунията губи данни между калкулатора и формата `[ME]`
Потребител прави изчисление (кола за $20 000, дизел, общо €X) → кликва CTA → попада на форма, в която трябва да въведе всичко наново. Данните от калкулатора не се пренасят.
- **Фикс:** CTA-то на калкулатора да попълва `car` / `budget` / `message` полетата предварително. Ниска цена, директен ефект върху конверсията.

---

## 🟠 P1 — SEO

### [ ] 20. Няма LocalBusiness / AutoDealer JSON-LD `[INPUT: чака телефон + адрес]`
Има само `Organization` (`layout.tsx:33`). За локални търсения („внос на коли от САЩ София") трябва `AutoDealer` или `LocalBusiness` с `telephone`, `address`, `openingHoursSpecification`, `geo`.

### [ ] 21. `sitemap.lastmod` е времето на билда, не на съдържанието `[ME]`
`src/app/sitemap.ts:20` — `lastModified: new Date()` → всички 16 URL-а получават идентична дата (live в момента: 2026-06-30). Google игнорира ненадеждни `lastmod`. Сложи реални дати per-страница.

### [ ] 22. Няма верификация в Google Search Console / Bing `[INPUT]`
Без нея не виждаш impressions, позиции, индексационни грешки, Core Web Vitals от реални потребители.

### [ ] 23. Няма custom 404 страница `[ME]`
`/de` връща голия Next 404 — без бранд, без навигация, без език. Всеки счупен линк или стар URL губи потребителя. Липсва `src/app/not-found.tsx`.

### [ ] 24. FAQ schema се рендерира само клиентски `[ME]`
`FAQ.tsx:29` — JSON-LD вътре в `dynamic()`-зареден client компонент. Работи, но е по-слаб сигнал. (Забележка: Google ограничи FAQ rich results от 2023 — ефектът така или иначе е малък.)

---

## 🟠 P1 — достъпност (a11y)

### [ ] 25. Полетата на формата нямат връзка етикет↔поле `[ME]`
`Contact.tsx:163-195` — `<label>` без `htmlFor`, `<input>` без `id`, и не са вложени. Screen reader не чете етикета. Същото в `AdminLogin.tsx:67,82`.
Липсват и `autoComplete="name" | "tel" | "email"` → по-лош мобилен UX за всички.

### [ ] 26. Фокусът е невидим в тъмна тема `[ME]`
`focus:outline-none` без заместващ ring:
- `Contact.tsx:66`, `Admin.tsx:168`, `AdminLogin.tsx:75,90`
Светлата тема има override (`globals.css:336`), тъмната — не. Навигация с клавиатура е невъзможна за виждане.

### [ ] 27. Мобилното меню няма клавиатурно/ARIA поведение `[ME]`
`Navbar.tsx:222-254` — липсват `aria-expanded`, `aria-controls`, focus trap, затваряне с Escape, заключване на скрола на body. Менюто остава в DOM с `max-h-0` → focus може да влезе в невидими линкове.

---

## 🟡 P2 — дребни и чистене

### [ ] 28. Тъмна тема проблясва при потребители със светла тема `[ME]`
`ThemeContext.tsx:16` — `useState<Theme>('dark')` винаги, а localStorage се чете чак в `useEffect`. Блокиращият скрипт (`layout.tsx:56`) оправя CSS, но не и React state-а.
- `Hero.tsx:242` избира **цял различен компонент** според `theme` → потребител със светла тема вижда тъмния Hero за момент, после подмяна
- Освен това `prefers-color-scheme` не се уважава изобщо — default е винаги dark

### [ ] 29. Runtime зависимости от външни домейни `[ME]`
- `RouteMap.tsx:10` — `cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json` (~1 MB) — картата спира да работи ако jsDelivr е недостъпен
- `WhyUs.tsx:77` — Pexels фон 1920px
- `Contact.tsx:125` — Pexels снимка
- `HotOffers.tsx:25-29` — 5 Unsplash снимки за демо офертите
- `locales/*.json:83-86` — 4 Pexels аватара
- **Фикс:** свали ги локално (плюс решава GDPR въпроса от #18).

### [ ] 30. Демо офертите се показват като истински `[INPUT]`
`HotOffers.tsx:24-30` — когато няма активни оферти в базата, сайтът показва 5 измислени коли (Mustang, Challenger, Camaro, Tesla, Wrangler) с конкретни цени и локации, включително **CARFAX ✓ значка**. Посетителят няма как да разбере, че не са реални.

### [ ] 31. Мъртъв код с разминаваща се палитра `[ME]`
`src/lib/useColors.ts` — 48 реда, **0 употреби** (grep потвърждава). При това цветовете вътре не съвпадат с `globals.css`:
| | useColors.ts | globals.css |
|---|---|---|
| light `main` | `#FAF5FD` | `#F5F0FF` |
| light `border` | `#E8D9F0` | `#E7E4F0` |
| light `t2` | `#5a3a70` | `#2d0a5a` |
| light `t3` | `#9CA3AF` | `#5a3a8a` |
Изтрий файла — иначе някой ще го използва и ще внесе грешни цветове.

### [ ] 32. Hero.tsx дублира ~110 реда `[ME]`
`HeroLight` и `HeroDark` са почти идентични — разликата е само в overlay градиентите и цветовете на текста. Всяка промяна в hero трябва да се направи два пъти (и се пропуска). Обедини в един компонент с theme-aware CSS променливи.

### [ ] 33. `globals.css` разчита на крехки `!important` хакове `[ME]`
`globals.css:296-359` — ~60 реда override-и, включително селектори по inline стил:
```css
[data-theme="light"] [style*="var(--bg-card)"] { ... }
[data-theme="light"] [style*="linear-gradient(135deg, #691EB9"] * { color: white !important; }
```
Работят, но се чупят при всяко разместване на inline стил. Дългосрочно: премини изцяло на CSS променливи вместо inline цветове.

### [ ] 34. ESLint не проверява Next-специфичните правила `[ME]`
Билдът предупреждава: `⚠ The Next.js plugin was not detected in your ESLint configuration`.
Затова никой не е хванал суровите `<img>` тагове (#8), липсващите `alt`, `no-html-link-for-pages`. Плюс `next lint` е deprecated и изчезва в Next 16.
Също: `MODULE_TYPELESS_PACKAGE_JSON` warning → добави `"type": "module"` в package.json.

### [ ] 35. Админ панелът оставя сираци в storage `[ME]`
`Admin.tsx:82` — `handleDelete` трие реда от `hot_offers`, но **не трие снимките** от bucket `offer-images`. С времето bucket-ът се пълни с неизползвани файлове (и се плаща за тях).
Също: `Admin.tsx:41` — сесията се проверява само веднъж при mount; няма `onAuthStateChange` абонамент.

### [ ] 36. Чистене в проекта `[ME]`
- `react-router-dom` и `react-router` са **extraneous** в `node_modules` (остатък от Vite-ерата) → `npm prune`
- `.gitignore:10` — `dist` / `dist-ssr` са остатък от Vite
- `.gitignore:14` — `next-env.d.ts` е игнориран, а Next препоръчва да се комитва
- `.env.example` не описва `RESEND_API_KEY` (единствената тайна извън Supabase)
- `Admin.tsx:5` — `import { Image } from 'lucide-react'` засенчва глобалния `Image`

### [ ] 37. Дребни UI/UX
- `FAQ.tsx:83` — `max-h-96` реже отговори над 384px
- `HotOffers.tsx:150-153` — skeleton-ите са с твърд цвят `#2e1858` → в светла тема са тъмнолилави ленти на бяло
- `HotOffers.tsx:179` — при счупена снимка `display:none` оставя празна кутия вместо fallback
- `Partners.tsx:33` — marquee-то под `prefers-reduced-motion` не спира плавно, а скача в края (глобалният reset прави duration 0.01ms)
- `HotOffers.tsx` показва цени с `$`, а формата пита за бюджет в `€` — непоследователна валута
- Езиковите бутони (`Navbar.tsx:157,206`) нямат `aria-pressed`/`aria-current`
- Калкулаторният слайдър (`Calculator.tsx:115`) е `opacity-0` без `aria-label` / `aria-valuetext` — фокусът е невидим
- `Navbar.tsx:65` и `BottomNav.tsx:22` ползват `window.location.href` за навигация → пълно презареждане вместо client-side преход

### [ ] 38. Правни / съдържателни липси `[INPUT]`
- Privacy страницата не съдържа **идентификация на администратора на данни** (фирма, ЕИК, седалище) — изискване по чл. 13 GDPR
- Няма посочен надзорен орган (КЗЛД) и право на жалба
- Няма Cookie Policy като отделен документ
- `Partners.tsx:5-10` — Copart / IAAI / Manheim / ADESA са представени като „партньори"; ако няма реални договори, това е подвеждащо и е използване на чужди марки
- Липсва адрес на фирмата (`t.contact.address` — провери дали е реален)

---

## ✅ Какво работи добре (не пипай)

- **Locale маршрути** — `/bg /ru /en /ro` с коректен `<html lang>`, canonical, hreflang (вкл. `x-default`), per-page metadata, sitemap с `xhtml:link` alternates. Проверено live за 4 езика.
- **Пълнота на преводите** — точно 269 leaf ключа във всеки от `bg/ru/en/ro`, гарантирано compile-time от `Record<Lang, Translations>`. (Разликата в размера на файловете е само защото кирилицата е 2 байта/символ.)
- **Email HTML injection е затворен** — `escapeHtml()` в `route.ts:9` покрива всички полета.
- **Билд здраве** — `tsc --noEmit` чист, ESLint 0 грешки, `next build` минава за 27s, 25 статични страници.
- **Code splitting** — `dynamic()` за 8 компонента под fold-а с placeholder височини (няма CLS).
- **RouteMap е преведена** на 4 езика през ISO-код мапинг (`RouteMap.tsx:19`) — добър модел.
- **`.env.local` не е в git**, само `.env.example` е трекнат.
- **reduced-motion** е уважен глобално (`globals.css:275`).
- **Admin auth gate** работи + Supabase RLS hardening от 2026-06-10 (blast radius = само офертите).

---

## 📋 Предложен ред на работа

**Спринт 1 — „сайтът да може да приема клиенти" (блокери)**
1. #1 телефон, #2 B2B контакти, #3 WhatsApp — *чака вход от клиента*
2. #12 имейл идентичности — *чака решение*
3. #6 фалшиви отзиви/статистики — *чака решение: реални, махнати или означени*

**Спринт 2 — „да не горим бюджет" (преди първата платена реклама)**
4. #4 GA4 + conversion event + #18 реален cookie gating
5. #5 spam защита на формата (honeypot + rate limit + Turnstile)
6. #7 CDN кеширане, #8 логото 615 KB → под 10 KB
7. #9 security headers, #10 `npm audit fix`, #11 DB грешки

**Спринт 3 — SEO растеж**
8. #16 страници за отделни оферти + Product schema ← **най-голямата възможност**
9. #13 B2B преводи, #20 LocalBusiness JSON-LD, #22 Search Console, #23 404 страница
10. #14 footer линкове, #21 sitemap дати

**Спринт 4 — качество**
11. #25–27 a11y (етикети, фокус, мобилно меню)
12. #19 калкулатор → форма, #17 курсове
13. #15 бъндъл, #28–37 чистене

**Чака решение в Supabase dashboard (от юнския одит):**
- Изключи публичния signup (Authentication → Sign In/Providers)
- Създай 1 admin акаунт → после ограничи политиките на `hot_offers` + storage само до този имейл
- По избор: `revoke execute on function public.rls_auto_enable() from public, anon, authenticated;`

---

## 📦 Архив — одит 2026-06-09 (затворени точки)

| # | Точка | Статус |
|---|---|---|
| 1 | Телефон плейсхолдър | ⏳ още отворена → виж #1 |
| 2 | WhatsApp номер | ⏳ още отворена → виж #3 (и бутонът изобщо не се рендерира) |
| 3 | Email идентичности | ⏳ още отворена → виж #12 |
| 4 | RouteMap преводи (39 държави × 4 езика) | ✅ готово |
| 5 | SEO metadata + canonical + hreflang | ✅ готово (locale routes, merge `be98a48`) |
| 6 | Email HTML injection | ✅ готово (`escapeHtml`) |
| 7 | Admin auth + branding | ✅ код готов; dashboard действия остават |
| 8 | Мъртъв код `src/index.css` | ✅ изтрит (но `useColors.ts` е нов мъртъв код → #31) |
| 9 | Hero alt текст в преводите | ✅ готово |

**Stable rollback tags:** `stable-pre-mobile-fixes`, `stable-post-audit`, `stable-pre-locale-routes`
