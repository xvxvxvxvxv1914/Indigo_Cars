'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, LogOut, Eye, EyeOff, X, Save, Image } from 'lucide-react';
import { supabase, HotOffer } from '../lib/supabase';

type FormState = Omit<HotOffer, 'id' | 'created_at'>;

const emptyForm: FormState = {
  title: '',
  price: 0,
  location: '',
  condition: 'Good',
  images: [],
  copart_url: '',
  active: true,
  carfax_verified: false,
  description: null,
  year: null,
  mileage: null,
  vin: null,
};

export default function Admin() {
  const [session, setSession] = useState<{ user: { email?: string } } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [offers, setOffers] = useState<HotOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!session) {
          router.push('/admin/login');
        } else {
          setSession(session);
          setAuthLoading(false);
          fetchOffers();
        }
      })
      .catch(() => router.push('/admin/login'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchOffers() {
    setLoading(true);
    const { data } = await supabase
      .from('hot_offers')
      .select('*')
      .order('created_at', { ascending: false });
    setOffers((data as HotOffer[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError('');
    try {
      const { error } = editId
        ? await supabase.from('hot_offers').update({ ...form }).eq('id', editId)
        : await supabase.from('hot_offers').insert([form]);
      if (error) throw error;
      resetForm();
      fetchOffers();
    } catch {
      setSaveError('Грешка при запазване. Опитайте отново.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('hot_offers').delete().eq('id', id);
    if (!error) {
      setDeleteId(null);
      fetchOffers();
    }
  }

  async function toggleActive(offer: HotOffer) {
    await supabase.from('hot_offers').update({ active: !offer.active }).eq('id', offer.id);
    fetchOffers();
  }

  function handleEdit(offer: HotOffer) {
    setForm({
      title: offer.title,
      price: offer.price,
      location: offer.location,
      condition: offer.condition,
      images: offer.images || [],
      copart_url: offer.copart_url || '',
      active: offer.active,
      carfax_verified: offer.carfax_verified ?? false,
      description: offer.description,
      year: offer.year,
      mileage: offer.mileage,
      vin: offer.vin,
    });
    setEditId(offer.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditId(null);
    setImageUrl('');
    setShowForm(false);
  }

  function addImage() {
    if (!imageUrl.trim()) return;
    setForm((f) => ({ ...f, images: [...(f.images || []), imageUrl.trim()] }));
    setImageUrl('');
  }

  function removeImage(idx: number) {
    setForm((f) => ({ ...f, images: (f.images || []).filter((_, i) => i !== idx) }));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F1A33' }}>
        <div className="w-10 h-10 border-2 border-[#2e1858] border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  const inputCls = 'w-full rounded-lg px-4 py-3 text-white placeholder-[#9070a8] focus:outline-none transition-colors text-sm';
  const inputStyle = { background: 'rgba(10,10,26,0.6)', border: '1px solid #2e1858' };

  return (
    <div className="min-h-screen pt-4 pb-12" style={{ background: '#0F1A33' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 py-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)' }}>
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                  <path d="M3 14L2 17H20L19 14H3Z" fill="white" />
                  <path d="M5 14L6.5 9H15.5L17 14H5Z" fill="white" opacity="0.7" />
                  <circle cx="7" cy="17.5" r="1.5" fill="white" />
                  <circle cx="15" cy="17.5" r="1.5" fill="white" />
                </svg>
              </div>
              <span className="font-display text-xl text-white tracking-wider">AutoImport Admin</span>
            </div>
            <p className="text-dark-300 text-sm">{session?.user?.email}</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="btn-outline text-sm py-2 px-4">
              ← Сайт
            </a>
            <button
              onClick={() => { setShowForm(true); resetForm(); }}
              className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
            >
              <Plus size={16} />
              Ново предложение
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-dark-300 hover:text-white transition-colors rounded-lg px-4 py-2"
              style={{ border: '1px solid #2e1858' }}
            >
              <LogOut size={16} />
              Изход
            </button>
          </div>
        </div>

        {/* Form panel */}
        {showForm && (
          <div className="rounded-2xl p-6 mb-8" style={{ background: '#19113a', border: '1px solid #2e1858' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editId ? 'Редактирай предложение' : 'Ново предложение'}
              </h2>
              <button onClick={resetForm} className="text-dark-300 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">Заглавие *</label>
                <input
                  type="text"
                  required
                  placeholder="напр. BMW X5 2020 Sport"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">Цена (USD) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  placeholder="25000"
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">Локация *</label>
                <input
                  type="text"
                  required
                  placeholder="Miami, Florida"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">Състояние</label>
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className={inputCls + ' cursor-pointer'}
                  style={inputStyle}
                >
                  <option value="Excellent" style={{ background: '#19113a' }}>Excellent</option>
                  <option value="Good" style={{ background: '#19113a' }}>Good</option>
                  <option value="Fair" style={{ background: '#19113a' }}>Fair</option>
                  <option value="Salvage" style={{ background: '#19113a' }}>Salvage</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">Copart URL</label>
                <input
                  type="url"
                  placeholder="https://copart.com/lot/..."
                  value={form.copart_url || ''}
                  onChange={(e) => setForm({ ...form, copart_url: e.target.value })}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              {/* Images */}
              <div className="md:col-span-2">
                <label className="block text-dark-300 text-xs uppercase tracking-wider mb-1.5">
                  Снимки (URL адреси)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                    className={inputCls + ' flex-1'}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="flex items-center gap-1 text-white px-4 py-3 rounded-lg transition-colors text-sm hover:opacity-90"
                    style={{ background: '#201545', border: '1px solid rgba(105,30,185,0.3)' }}
                  >
                    <Image size={14} />
                    Добави
                  </button>
                </div>
                {/* Image previews */}
                {form.images && form.images.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt=""
                          className="w-20 h-16 object-cover rounded-lg"
                          style={{ border: '1px solid #2e1858' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    className="w-10 h-5 rounded-full transition-colors relative cursor-pointer"
                    style={{ background: form.active ? 'linear-gradient(135deg, #691EB9 0%, #4a158a 100%)' : '#2e1858' }}
                    onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm text-white font-medium">Активно (показва се на сайта)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    className="w-10 h-5 rounded-full transition-colors relative cursor-pointer"
                    style={{ background: form.carfax_verified ? '#e8252a' : '#2e1858' }}
                    onClick={() => setForm((f) => ({ ...f, carfax_verified: !f.carfax_verified }))}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.carfax_verified ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: form.carfax_verified ? '#e8252a' : '#D5C6E0' }}>
                    CARFAX проверен
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.price}
                className="btn-primary flex items-center gap-2 disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? 'Запазване...' : editId ? 'Обнови' : 'Създай'}
              </button>
              <button onClick={resetForm} className="btn-outline">
                Отмени
              </button>
            </div>
            {saveError && (
              <p className="text-red-400 text-sm mt-3">{saveError}</p>
            )}
          </div>
        )}

        {/* Offers table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#19113a', border: '1px solid #2e1858' }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #2e1858' }}>
            <h2 className="font-bold text-white">
              Предложения{' '}
              <span className="text-dark-300 font-normal text-sm ml-1">({offers.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-16 flex justify-center">
              <div className="w-8 h-8 border-2 border-dark-700 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : offers.length === 0 ? (
            <div className="py-16 text-center text-dark-300">
              Няма предложения. Добавете ново.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #2e1858' }}>
                    {['Снимка', 'Автомобил', 'Цена', 'Локация', 'Състояние', 'Статус', 'Действия'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-dark-300 uppercase tracking-wider font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer) => (
                    <tr
                      key={offer.id}
                      className="transition-colors hover:bg-white/2"
                      style={{ borderBottom: '1px solid #2e1858' }}
                    >
                      <td className="px-4 py-3">
                        <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#0F1A33' }}>
                          {offer.images?.[0] ? (
                            <img src={offer.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ color: '#2e1858' }}>
                              <Image size={14} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white font-medium text-sm">{offer.title}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-primary-300 font-bold">${offer.price.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-dark-300 text-sm">{offer.location}</span>                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full text-dark-300" style={{ background: 'rgba(42,40,80,0.6)', border: '1px solid #2e1858' }}>
                          {offer.condition}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(offer)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                            offer.active
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : 'bg-red-500/15 text-red-400 border-red-500/30'
                          }`}
                        >
                          {offer.active ? <Eye size={12} /> : <EyeOff size={12} />}
                          {offer.active ? 'Активно' : 'Скрито'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(offer)}
                            className="w-8 h-8 bg-primary-600/15 hover:bg-primary-600/30 border border-primary-600/25 rounded-lg flex items-center justify-center transition-all"
                            title="Редактирай"
                          >
                            <Edit2 size={13} className="text-primary-400" />
                          </button>
                          <button
                            onClick={() => setDeleteId(offer.id)}
                            className="w-8 h-8 bg-red-500/15 hover:bg-red-500/30 border border-red-500/25 rounded-lg flex items-center justify-center transition-all"
                            title="Изтрий"
                          >
                            <Trash2 size={13} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
        {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl p-6 max-w-sm w-full shadow-xl" style={{ background: '#19113a', border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 className="text-xl font-bold text-white mb-2">Изтриване</h3>
            <p className="text-dark-300 text-sm mb-6">              Сигурни ли сте, че искате да изтриете това предложение? Действието не може да бъде отменено.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                Изтрий
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 btn-outline py-2.5"
              >
                Отмени
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}