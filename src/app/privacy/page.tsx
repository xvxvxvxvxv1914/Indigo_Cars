'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';

export default function PrivacyPage() {
  const { t } = useLang();
  const p = t.privacy;

  return (
    <main className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-primary-400 hover:text-primary-300 text-sm mb-8 inline-block">← {p.back}</Link>

        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h1>
        <p className="text-dark-300 text-sm mb-10">{p.updated}</p>

        <div className="space-y-8 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s1title}</h2>
            <p>{p.s1text} <a href="mailto:info@indigocars.eu" className="text-primary-400 hover:underline">info@indigocars.eu</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s2title}</h2>
            <ul className="list-disc list-inside space-y-1">
              {p.s2items.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s3title}</h2>
            <p>{p.s3intro}</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {p.s3items.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s4title}</h2>
            <p>{p.s4text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s5title}</h2>
            <p>{p.s5text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s6title}</h2>
            <p>{p.s6text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s7title}</h2>
            <p>{p.s7intro}</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {p.s7items.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
            <p className="mt-3">{p.s7outro} <a href="mailto:info@indigocars.eu" className="text-primary-400 hover:underline">info@indigocars.eu</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.s8title}</h2>
            <p>{p.s8text}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
