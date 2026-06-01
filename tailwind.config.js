/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: '#818cf8',
          500: '#4f46e5',
          600: '#4338ca',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#a0a0b8',
          400: '#a0a0b8',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        navy: {
          50: '#f0f0ff',
          100: '#e0e0f8',
          200: '#c0c0ef',
          300: '#9090d8',
          400: '#6060b8',
          500: '#403f90',
          600: '#302e70',
          700: '#252350',
          800: '#1a1830',
          900: '#12102a',
          950: '#0a0a1a',
        },
        border: {
          DEFAULT: '#2a2850',
          subtle: '#1e1c40',
          strong: '#3d3a6e',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.35)',
        'glow-sm': '0 0 15px rgba(99, 102, 241, 0.25)',
        'glow-lg': '0 0 60px rgba(99, 102, 241, 0.4)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'scroll-x': 'scrollX 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
