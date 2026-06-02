/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#f5e8ff',
          100: '#e8c8ff',
          200: '#d49dff',
          300: '#ba6ef4',
          400: '#a040e0',
          500: '#8120C6',
          600: '#6a1aa8',
          700: '#4d0e8a',
          800: '#360870',
          900: '#0E002B',
        },
        accent: {
          400: '#a040e0',
          500: '#6a1aa8',
          600: '#4d0e8a',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#D5C6E0',
          400: '#D5C6E0',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        navy: {
          50:  '#f0f4fa',
          100: '#dce5f2',
          200: '#b3c4e2',
          300: '#849ec8',
          400: '#5578a8',
          500: '#2e5080',
          600: '#1e3860',
          700: '#162c4d',
          800: '#121e38',
          900: '#0e1729',
          950: '#0F1A33',
        },
        border: {
          DEFAULT: '#2e1858',
          subtle:  '#1e1040',
          strong:  '#4a2878',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      boxShadow: {
        glow:      '0 0 30px rgba(129, 32, 198, 0.35)',
        'glow-sm': '0 0 15px rgba(129, 32, 198, 0.25)',
        'glow-lg': '0 0 60px rgba(129, 32, 198, 0.4)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-right':'slideRight 0.6s ease-out forwards',
        'counter':    'counter 2s ease-out forwards',
        'scroll-x':   'scrollX 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scrollX: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
