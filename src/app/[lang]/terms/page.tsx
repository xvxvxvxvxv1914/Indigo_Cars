'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';

export default function TermsPage() {
  const { t, slug } = useLang();
  const tr = t.terms;

  return (
    <main className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href={`/${slug}`} className="text-primary-400 hover:text-primary-300 text-sm mb-8 inline-block">← {tr.back}</Link>

        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{tr.title}</h1>
        <p className="text-dark-300 text-sm mb-10">{tr.updated}</p>

        <div className="space-y-8 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s1title}</h2>
            <p>{tr.s1text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s2title}</h2>
            <p>{tr.s2intro}</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {tr.s2items.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s3title}</h2>
            <p>{tr.s3text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s4title}</h2>
            <p>{tr.s4text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s5title}</h2>
            <p>{tr.s5text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s6title}</h2>
            <p>{tr.s6text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s7title}</h2>
            <p>{tr.s7text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s8title}</h2>
            <p>{tr.s8text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{tr.s9title}</h2>
            <p>{tr.s9intro} <a href="mailto:info@indigocars.eu" className="text-primary-400 hover:underline">info@indigocars.eu</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
