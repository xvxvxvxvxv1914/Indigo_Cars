'use client';

import { MessageCircle } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function WhatsAppButton() {
  const { t } = useLang();
  const msg = encodeURIComponent(t.whatsapp.message);
  return (
    <a
      href={`https://wa.me/359XXXXXXXXX?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="fixed right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bottom-24 md:bottom-6"
      style={{ background: '#25d366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
    >
      {/* Pulse rings */}
      <span className="wa-ring" />
      <span className="wa-ring wa-ring-delay" />

      <MessageCircle size={26} fill="white" color="white" className="relative z-10" />
    </a>
  );
}