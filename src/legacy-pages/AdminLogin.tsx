import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      window.location.href = '/admin';
    }
  }

  const inputStyle = { background: 'rgba(10,10,26,0.7)', border: '1px solid #2e1858' };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0F1A33' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,0,43,0.08)' }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-glow" style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 14L2 17H20L19 14H3Z" fill="white" />
                <path d="M5 14L6.5 9H15.5L17 14H5Z" fill="white" opacity="0.7" />
                <circle cx="7" cy="17.5" r="1.5" fill="white" />
                <circle cx="15" cy="17.5" r="1.5" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl text-white tracking-wider">AUTO</span>
              <span className="font-display text-xl text-primary-400 tracking-wider">IMPORT</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Администраторски вход</h1>
          <p className="text-dark-300 text-sm mt-2">Достъп само за оторизирани потребители</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl p-8 space-y-5"
          style={{ background: '#19113a', border: '1px solid #2e1858' }}
        >
          {error && (
            <div className="flex gap-3 rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">
              Email адрес
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-white placeholder-[#9070a8] focus:outline-none transition-colors text-sm"
              style={inputStyle}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">
              Парола
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-white placeholder-[#9070a8] focus:outline-none transition-colors text-sm"
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-60 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)' }}
          >
            <Lock size={16} />
            {loading ? 'Влизане...' : 'Влез в Админ панела'}
          </button>

          <p className="text-[#403f90] text-xs text-center">
            Нужен е администраторски акаунт за достъп.
          </p>
        </form>

        <p className="text-center mt-6">
          <a href="/" className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
            ← Обратно към сайта
          </a>
        </p>
      </div>
    </div>
  );
}
