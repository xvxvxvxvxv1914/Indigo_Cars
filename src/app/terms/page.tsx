import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Общи условия — Indigo Cars',
  description: 'Общи условия за ползване на услугите на Indigo Cars.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-primary-400 hover:text-primary-300 text-sm mb-8 inline-block">← Назад</Link>

        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Общи условия</h1>
        <p className="text-dark-300 text-sm mb-10">Последно обновена: юни 2026</p>

        <div className="space-y-8 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>1. Общи положения</h2>
            <p>
              Настоящите Общи условия уреждат отношенията между Indigo Cars (indigocars.eu) и клиентите,
              използващи услугите ни по внос на автомобили от САЩ и Канада.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>2. Услуги</h2>
            <p>Indigo Cars предоставя следните услуги:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Търсене и подбор на автомобили от американски търгове (Copart, IAAI, Manheim)</li>
              <li>Участие в наддаване от името на клиента</li>
              <li>Организация на морски транспорт до Европа</li>
              <li>Митническо оформяне и документация</li>
              <li>Доставка до крайния получател</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>3. Сключване на договор</h2>
            <p>
              Договорът се счита за сключен след писмено потвърждение от страна на Indigo Cars и заплащане на
              договорения депозит. Запитването чрез контактната форма или телефон не представлява обвързващ договор.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>4. Цени и плащане</h2>
            <p>
              Всички цени са ориентировъчни до издаването на официална оферта. Крайната цена включва цената
              на аукциона, транспорт, митнически такси и такса за услугата. Плащането се извършва по договорен
              начин и в сроковете, посочени в договора.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>5. Срокове за доставка</h2>
            <p>
              Посочените срокове (45–60 дни) са ориентировъчни и могат да варират поради обстоятелства извън
              нашия контрол (метеорологични условия, митнически закъснения, претоварване на пристанища).
              Indigo Cars не носи отговорност за закъснения, причинени от трети страни.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>6. Отговорност</h2>
            <p>
              Indigo Cars носи отговорност за автомобила от момента на покупката до предаването на клиента.
              Не носим отговорност за скрити дефекти на автомобила, описани в документите на търга (Title, VIN история).
              Препоръчваме предварителна проверка на историята на автомобила.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>7. Отказ и анулиране</h2>
            <p>
              При отказ след спечелен търг клиентът дължи заплащане на аукционната такса и всички направени
              разходи до момента на отказа. Условията за анулиране се уреждат индивидуално в договора.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>8. Приложимо право</h2>
            <p>
              Настоящите Общи условия се уреждат от законодателството на Република България.
              Споровете се решават по взаимно съгласие, а при невъзможност — пред компетентния съд в гр. София.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>9. Контакт</h2>
            <p>
              За въпроси: <a href="mailto:info@indigocars.eu" className="text-primary-400 hover:underline">info@indigocars.eu</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
