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
          background: '#1f163b',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Brand slashes — top right (exact brand proportions) */}
        <div style={{
          position: 'absolute', top: '-40px', right: '60px',
          width: '140px', height: '520px',
          background: 'linear-gradient(180deg, #2d2d86 0%, #f0494f 100%)',
          transform: 'skewX(-12deg)',
          opacity: 0.9,
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', top: '-40px', right: '220px',
          width: '90px', height: '480px',
          background: 'linear-gradient(180deg, #2d2d86 0%, #c0304f 100%)',
          transform: 'skewX(-12deg)',
          opacity: 0.65,
          display: 'flex',
        }} />

        {/* Subtle glow bottom right */}
        <div style={{
          position: 'absolute', bottom: '-80px', right: '100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,73,79,0.08) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
          {/* Slash mark — brand icon */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              width: '14px', height: '58px',
              background: 'linear-gradient(180deg, #2d2d86 0%, #f0494f 100%)',
              transform: 'skewX(-12deg)',
              display: 'flex',
            }} />
            <div style={{
              width: '22px', height: '58px',
              background: 'linear-gradient(180deg, #2d2d86 0%, #f0494f 100%)',
              transform: 'skewX(-12deg)',
              display: 'flex',
            }} />
          </div>
          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            <span style={{ fontSize: '46px', fontWeight: 900, color: '#ffffff', letterSpacing: '4px', lineHeight: 1, display: 'flex' }}>INDIGO</span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#a89bc2', letterSpacing: '8px', lineHeight: 1, display: 'flex' }}>CARS</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '56px', fontWeight: 800, color: '#ffffff',
          lineHeight: 1.15, marginBottom: '20px', maxWidth: '780px',
          display: 'flex', flexWrap: 'wrap',
        }}>
          Твоята кола от търга&nbsp;
          <span style={{ color: '#f0494f', display: 'flex' }}>директно до теб</span>
        </div>

        {/* Subline */}
        <div style={{
          fontSize: '25px', color: '#7a6fa0',
          marginBottom: '52px', maxWidth: '660px', display: 'flex',
        }}>
          Поръчков внос от САЩ и Канада · Доставка до България и Европа
        </div>

        {/* URL badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(45,45,134,0.25)',
          border: '1px solid rgba(45,45,134,0.6)',
          borderRadius: '50px', padding: '10px 26px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f0494f', display: 'flex' }} />
          <span style={{ color: '#c4b5fd', fontSize: '22px', display: 'flex' }}>indigocars.eu</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
