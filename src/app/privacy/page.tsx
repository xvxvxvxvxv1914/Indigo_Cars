import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика за поверителност — Indigo Cars',
  description: 'Политика за поверителност и защита на личните данни на Indigo Cars.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-primary-400 hover:text-primary-300 text-sm mb-8 inline-block">← Назад</Link>

        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Политика за поверителност</h1>
        <p className="text-dark-300 text-sm mb-10">Последно обновена: юни 2026</p>

        <div className="space-y-8 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>1. Администратор на данни</h2>
            <p>
              Indigo Cars (indigocars.eu) е администратор на лични данни по смисъла на Регламент (ЕС) 2016/679 (GDPR).
              За контакт: <a href="mailto:info@indigocars.eu" className="text-primary-400 hover:underline">info@indigocars.eu</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>2. Какви данни събираме</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Имена и телефонен номер (от контактната форма)</li>
              <li>Имейл адрес (по желание)</li>
              <li>Информация за желания автомобил и бюджет</li>
              <li>IP адрес и технически данни при посещение на сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>3. Цел на обработката</h2>
            <p>Данните се използват единствено за:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Отговор на вашето запитване и предоставяне на оферта</li>
              <li>Комуникация в процеса на автомобилен внос</li>
              <li>Подобряване на услугите ни</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>4. Правно основание</h2>
            <p>Обработваме данни на основание чл. 6, ал. 1, б. „а" от GDPR (съгласие) и чл. 6, ал. 1, б. „б" (изпълнение на договор/преддоговорни отношения).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>5. Срок на съхранение</h2>
            <p>Данните се съхраняват не повече от 2 години от последния контакт, освен ако законодателството не изисква по-дълъг срок.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>6. Споделяне с трети страни</h2>
            <p>Не продаваме и не споделяме личните ви данни с трети страни за маркетингови цели. Данните могат да бъдат предоставяни на доставчици на услуги (напр. хостинг, имейл) при условие, че те спазват GDPR.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>7. Вашите права</h2>
            <p>Имате право на:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Достъп до личните си данни</li>
              <li>Коригиране на неточни данни</li>
              <li>Изтриване („право да бъдеш забравен")</li>
              <li>Ограничаване на обработването</li>
              <li>Преносимост на данните</li>
              <li>Оттегляне на съгласието по всяко време</li>
            </ul>
            <p className="mt-3">За упражняване на правата си пишете на <a href="mailto:info@indigocars.eu" className="text-primary-400 hover:underline">info@indigocars.eu</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>8. Жалби</h2>
            <p>Имате право да подадете жалба до Комисията за защита на личните данни (КЗЛД), www.cpdp.bg.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
