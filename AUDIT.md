# Indigo Cars — Пълен одит на сайта

**Дата:** 2026-06-09
**Извършен от:** Claude (Opus) — четене на целия код, ред по ред
**Stable rollback tags:** `stable-pre-mobile-fixes`, `stable-post-audit`, `stable-pre-locale-routes`

Легенда:
- 🔴 Критично · 🟠 Важно · 🟡 Дребно/чистене
- `[ME]` = мога да го оправя сам · `[INPUT]` = трябва реална информация от клиента/теб

---

## 📊 ТЕКУЩ СТАТУС (2026-06-09) — всичко свършено е в PRODUCTION

**✅ Завършено и live на `indigocars.eu`:**
- Calculator контраст (dark mode) · мобилни fixes (navbar/RouteMap zoom/footer/lazy-load)
- Audit #4 (RouteMap преведена на 4 езика) · #5 (SEO metadata) · #6 (email injection) · #7 (admin auth + branding) · #8 (изтрит index.css) · #9 (hero alt)
- SEO: Organization JSON-LD + title template
- **Locale routes `/bg` `/ru` `/en` `/ro`** — merge `be98a48`, проверено live (rollback: `git revert -m 1 be98a48`)
- RLS проверен: lead-овете защитени; чака само dashboard действие

**⏳ Остава (чака клиента/потребителя):**
- 🔴 Реален телефон (#1) + `tel:` линкове · WhatsApp номер (#2) · email рутинг (#3) · B2B hardcode `+35989123456`/`b2b@indigocars.bg`
- 🟠 Supabase dashboard: изключи signup + създай 1 admin юзър; по избор revoke `rls_auto_enable`
- 🟠 LocalBusiness JSON-LD (чака телефон)
- 🟡 next/image · Google Search Console верификация · sitemap реални дати
- 📋 Одобрение на руския текст → `ru.json` master за BG/EN/RO

(Детайлите по точките #1–9 са по-долу; #4–9 вече са ✅.)

---

## 🔴 Критични — блокират реалната употреба от клиент

### [ ] 1. Телефонът е placeholder „—" навсякъде `[INPUT]`
Няма реален номер, няма `tel:` линк. Клиент не може да се обади.
- `src/components/Navbar.tsx:152` (десктоп) и `:248` (мобилно меню)
- `src/components/Contact.tsx:69` — `value: '—', href: '#'`
- `src/components/Footer.tsx:87`
- **Нужно:** реален телефонен номер. После: добавяне на `tel:` линкове навсякъде.

### [ ] 2. WhatsApp бутонът води наникъде `[INPUT]`
- `src/components/WhatsAppButton.tsx:11` — номерът е буквално `359XXXXXXXXX`
- **Нужно:** реален WhatsApp номер.

### [ ] 3. Бъркотия с email идентичности `[INPUT]`
- `src/app/api/contact/route.ts:68-69`
- Сайтът показва: `info@indigocars.eu`
- Заявките **отиват** на: `indigocars@atomicmail.io`
- Пращат се **от**: `leads@thestormwatcher.com` (чужд домейн → риск от спам)
- **Нужно:** решение коя е реалната пощенска кутия и дали да се верифицира `indigocars.eu` в Resend, за да съвпадат изпращач и бранд.

---

## 🟠 Важни

### [x] 4. ✅ ГОТОВО — Картата вече е преведена (39 държави/градове в 4 езика)
- `src/components/RouteMap.tsx:21-61` — `EU_DATA` има hardcode-нати `name`/`city`/`days` на български.
- Руски/английски/румънски клиент вижда „България / София" на български.
- **План:** изнасяне на имената в преводните JSON файлове или мапване по ISO код към `t.*`.

### [x] 5. ✅ ГОТОВО (частично) — SEO
- Добавен canonical URL в root metadata + `ru_RU` в OG alternateLocale.
- Добавени per-page metadata layout-и за `/b2b`, `/privacy`, `/terms`.
- **Бележка за hreflang:** сайтът е single-URL с client-side смяна на език (без `/en`, `/ru` route-ове). Истински `hreflang` изисква отделни URL-и за всеки език — затова НЕ е добавен (би бил некоректен). Ако в бъдеще се направят per-locale route-ове, тогава hreflang става приложим.

### [x] 6. ✅ ГОТОВО — Email HTML injection `[ME]`
- `src/app/api/contact/route.ts:51-53` — полетата от формата (`name`, `message`, ...) се вкарват сурово в HTML без escape.
- Зложелател може да инжектира HTML/линкове в нотификационното писмо.
- **План:** escape на всички user-input стойности преди вкарване в HTML.

### [~] 7. Admin auth — проверено на код ниво `[INPUT остава]`
- `Admin.tsx:40-53` — има client-side gate: `supabase.auth.getSession()` → redirect към `/admin/login` ако няма сесия. Логинът ползва `signInWithPassword`. ✅
- Поправен и стар branding бъг: admin login показваше „AUTO/IMPORT" → сега „INDIGO/CARS".
- **ОСТАВА за проверка в Supabase dashboard:** RLS политиките на таблица `hot_offers` и storage bucket `offer-images`. Anon ключът е публичен, така че реалната защита на write/delete зависи от RLS — трябва да е ограничено само за authenticated роля.

---

## 🟡 Дребни / чистене

### [x] 8. ✅ ГОТОВО (коригирано) — Мъртъв код
- `src/index.css` — изтрит (беше наистина orphan, никой не го import-ваше).
- **КОРЕКЦИЯ:** `src/legacy-pages/` НЕ е мъртъв код — `B2B.tsx`, `Admin.tsx`, `AdminLogin.tsx` се ползват активно от route-овете `/b2b`, `/admin`, `/admin/login`. ОСТАВА.

### [x] 9. ✅ ГОТОВО — Hero alt текст
- Изнесен в преводите (`t.hero.imageAlt`), вече е на езика на потребителя в двата варианта.

---

## ✅ Какво работи добре (да не се пипа)

- Формата записва в Supabase (`contact_inquiries`) коректно.
- Билдът е чист; добро code-splitting с `dynamic()` imports (`src/app/page.tsx`).
- Мобилният layout е стабилен след фикса от 2026-06-09 (commit `14f7bba`).
- `robots.ts` + `sitemap.ts` + `opengraph-image.tsx` присъстват.
- Преводите са структурно подсигурени с TypeScript (`Record<Lang, Translations>`).
- Light/dark теми: повечето компоненти ползват CSS променливи коректно (inline-color бъговете в RouteMap zoom и Footer вече са оправени).

---

## Вече оправено днес (2026-06-09)

- ✅ Calculator контраст в dark mode (commit `76832ca`)
- ✅ Navbar mobile лента + по-голям touch target на езиковите бутони (commit `14f7bba`)
- ✅ RouteMap zoom бутони — четими в dark mode (commit `14f7bba`)
- ✅ Footer долна лента — четим контраст (commit `14f7bba`)
- ✅ Contact снимка — lazy-load (commit `14f7bba`)

---

## Предложен ред на работа

1. Събиране на реалните контакти от клиента → #1, #2, #3 (най-спешно, видимо за клиента).
2. #4 Превод на картата (особено важно за руските клиенти).
3. #6 Email injection (бърз security фикс).
4. #5 SEO/hreflang.
5. #8, #9 чистене.
6. #7 проверка на admin auth.
