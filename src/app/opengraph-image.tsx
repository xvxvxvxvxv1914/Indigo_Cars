import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Indigo Cars — Вносител на автомобили от САЩ и Канада';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #0a1628 0%, #0F1A33 50%, #14103d 100%)',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative slashes — top right (brand identity) */}
        <div style={{ position: 'absolute', top: '-60px', right: '100px', width: '22px', height: '420px', background: 'linear-gradient(180deg, #3a22c4 0%, #e0316b 100%)', transform: 'rotate(20deg)', opacity: 0.8, display: 'flex' }} />
        <div style={{ position: 'absolute', top: '-60px', right: '140px', width: '14px', height: '380px', background: 'linear-gradient(180deg, #691EB9 0%, #c0206e 100%)', transform: 'rotate(20deg)', opacity: 0.5, display: 'flex' }} />
        <div style={{ position: 'absolute', top: '-60px', right: '168px', width: '9px', height: '340px', background: 'linear-gradient(180deg, #4a158a 0%, #691EB9 100%)', transform: 'rotate(20deg)', opacity: 0.3, display: 'flex' }} />

        {/* Glow */}
        <div style={{ position: 'absolute', bottom: '-120px', right: '180px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,30,185,0.12) 0%, transparent 70%)', display: 'flex' }} />

        {/* Logo text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '44px' }}>
          {/* Slash mark */}
          <div style={{ display: 'flex', gap: '6px', marginRight: '4px' }}>
            <div style={{ width: '10px', height: '52px', background: 'linear-gradient(180deg, #3a22c4 0%, #c0206e 100%)', transform: 'skewX(-15deg)', display: 'flex' }} />
            <div style={{ width: '16px', height: '52px', background: 'linear-gradient(180deg, #691EB9 0%, #e0316b 100%)', transform: 'skewX(-15deg)', display: 'flex' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '42px', fontWeight: 900, color: '#ffffff', letterSpacing: '6px', display: 'flex' }}>INDIGO</span>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#9b8fc0', letterSpacing: '10px', display: 'flex' }}>CARS</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: '58px', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '24px', maxWidth: '820px', display: 'flex', flexWrap: 'wrap' }}>
          Твоята кола от търга&nbsp;
          <span style={{ color: '#9b5de5', display: 'flex' }}>директно до теб</span>
        </div>

        {/* Subline */}
        <div style={{ fontSize: '26px', color: '#7a6fa0', marginBottom: '52px', maxWidth: '680px', display: 'flex' }}>
          Поръчков внос от САЩ и Канада · Доставка до България и Европа
        </div>

        {/* URL badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(105,30,185,0.2)', border: '1px solid rgba(105,30,185,0.45)', borderRadius: '50px', padding: '10px 26px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#691EB9', display: 'flex' }} />
          <span style={{ color: '#c4b5fd', fontSize: '22px', display: 'flex' }}>indigocars.eu</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
