'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../lib/useScrollReveal';

const CONFETTI_COLORS = ['#691EB9', '#E7E4F0', '#4a158a', '#25d366', '#f59e0b', '#ec4899'];

function ConfettiPiece({ idx }: { idx: number }) {
  const angle = (idx / 16) * 360;
  const dist = 60 + Math.random() * 60;
  const rad = (angle * Math.PI) / 180;
  const cx = Math.round(Math.cos(rad) * dist);
  const cy = Math.round(Math.sin(rad) * dist);
  const cr = Math.round(Math.random() * 360);
  const color = CONFETTI_COLORS[idx % CONFETTI_COLORS.length];
  return (
    <span
      className="confetti-piece"
      style={{ background: color, '--cx': `${cx}px`, '--cy': `${cy}px`, '--cr': `${cr}deg`, animationDelay: `${idx * 0.03}s` } as React.CSSProperties}
    />
  );
}

function ConfettiBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
      {Array.from({ length: 16 }).map((_, i) => <ConfettiPiece key={i} idx={i} />)}
    </div>
  );
}

export default function Contact() {
  const { t } = useLang();
  const { theme } = useTheme();
  const light = theme === 'light';
  const sectionRef = useScrollReveal({ threshold: 0.1, stagger: 120 });
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(t.contact.error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { background: 'var(--bg-input)', border: '1px solid var(--border)' };
  const inputClass = 'w-full rounded-lg px-4 py-3 placeholder-[#9070a8] focus:outline-none transition-colors text-sm';

  const contactItems = [
    { icon: Phone, label: t.contact.phoneLabel, value: '—', href: '#' },
    { icon: Mail, label: t.contact.emailLabel, value: 'info@indigocars.eu', href: 'mailto:info@indigocars.eu' },
    { icon: MapPin, label: t.contact.addressLabel, value: t.contact.address, href: '#' },
  ];

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden" ref={sectionRef} style={{ background: 'var(--bg-main)' }}>
      <div className="absolute inset-0 z-0">
        {!light && <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0F1A33, rgba(26,24,48,0.5), #0F1A33)' }} />}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(14,0,43,0.08)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
          <p className="section-label">{t.contact.label}</p>
          <h2 className="section-title mb-8">
            {t.contact.title}{' '}
            <span className="text-gradient section-title-accent">{t.contact.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{t.contact.sub}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div className="animate-on-scroll space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>{t.contact.infoTitle}</h3>
              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all" style={{ background: 'rgba(105,30,185,0.15)', border: '1px solid rgba(105,30,185,0.2)' }}>
                      <Icon size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <div className="text-dark-300 text-xs uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-white font-medium group-hover:text-primary-400 transition-colors">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <h4 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>{t.contact.hoursTitle}</h4>
              <div className="space-y-2 text-sm">
                {t.contact.hours.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-dark-300">{day}</span>
                    <span className={hours === t.contact.closedLabel ? 'text-dark-500' : 'text-white'}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-48">
              <img
                src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                alt="Car transport"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center px-6" style={{ background: 'linear-gradient(to right, rgba(14,0,43,0.82), transparent)' }}>
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#E7E4F0' }}>{t.contact.freeEval}</div>
                  <div className="font-bold" style={{ color: '#ffffff' }}>{t.contact.savings}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="animate-on-scroll">
            {submitted ? (
              <div className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <ConfettiBurst />
                <div className="relative z-10 mb-4">
                  <CheckCircle size={64} className="text-primary-500 mx-auto success-icon" style={{ filter: 'drop-shadow(0 0 16px rgba(105,30,185,0.6))' }} />
                </div>
                <h3 className="relative z-10 text-2xl font-bold text-white mb-3">{t.contact.sent}</h3>
                <p className="relative z-10 text-dark-300">{t.contact.sentSub}</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', car: '', budget: '', message: '' }); }}
                  className="relative z-10 mt-6 btn-outline text-sm py-2.5 px-6"
                >
                  {t.contact.newInquiry}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-5 sm:p-8 space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="text-xl font-bold text-white mb-2">{t.contact.formTitle}</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">{t.contact.name} *</label>
                    <input type="text" required placeholder={t.contact.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">{t.contact.phoneLabel} *</label>
                    <input type="tel" required placeholder={t.contact.phonePlaceholder} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">{t.contact.emailLabel}</label>
                  <input type="email" placeholder="ivan@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">{t.contact.car}</label>
                  <input type="text" placeholder={t.contact.carPlaceholder} value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">{t.contact.budget}</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass + ' cursor-pointer'} style={inputStyle}>
                    <option value="" style={{ background: 'var(--bg-card)' }}>{t.contact.budgetDefault}</option>
                    <option value="5000-10000" style={{ background: 'var(--bg-card)' }}>€5,000 — €10,000</option>
                    <option value="10000-20000" style={{ background: 'var(--bg-card)' }}>€10,000 — €20,000</option>
                    <option value="20000-35000" style={{ background: 'var(--bg-card)' }}>€20,000 — €35,000</option>
                    <option value="35000+" style={{ background: 'var(--bg-card)' }}>€35,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">{t.contact.message}</label>
                  <textarea rows={4} placeholder={t.contact.messagePlaceholder} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + ' resize-none'} style={inputStyle} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-primary-500 flex-shrink-0" />
                  <span className="text-dark-300 text-xs leading-relaxed">
                    {t.contact.gdprText}
                    <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
                      {t.contact.gdprLink}
                    </a>
                  </span>
                </label>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'var(--cta-grad)', color: 'var(--cta-text)' }}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(26,16,48,0.3)', borderTopColor: '#1A1030' }} />{t.contact.sending}</>
                  ) : (
                    <><Send size={18} />{t.contact.send}</>
                  )}
                </button>

                {error && (
                  <p className="text-red-400 text-xs text-center rounded-lg px-4 py-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>
                )}

                <p className="text-[#9070a8] text-xs text-center">{t.contact.footer}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
