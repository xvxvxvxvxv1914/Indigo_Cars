import { useTheme } from '../context/ThemeContext';

export function useColors() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return {
    // Backgrounds
    main:      dark ? '#0F1A33'              : '#FAF5FD',
    alt:       dark ? '#110e2d'              : '#FFFFFF',
    card:      dark ? '#19113a'              : '#FFFFFF',
    cardHover: dark ? '#201545'              : '#FAF5FD',
    navBg:     dark ? 'rgba(15,26,51,0.97)'  : 'rgba(14,0,43,0.97)',
    input:     dark ? 'rgba(32,21,69,0.6)'   : 'rgba(250,245,253,0.8)',
    statCard:  dark ? 'rgba(32,21,69,0.8)'   : 'rgba(255,255,255,0.95)',

    // Borders
    border:       dark ? '#2e1858'                   : '#E8D9F0',
    borderPurple: dark ? 'rgba(105,30,185,0.2)'      : 'rgba(105,30,185,0.15)',

    // Text
    t1:          dark ? '#ffffff'   : '#0F1A33',
    t2:          dark ? '#D5C6E0'   : '#5a3a70',
    t3:          dark ? '#9070a8'   : '#9CA3AF',
    placeholder: dark ? '#9070a8'   : '#D5C6E0',

    // Gradients (keep dark for both themes in hero — overlaid on image)
    heroFrom:  dark ? 'rgba(15,26,51,0.97)' : 'rgba(15,26,51,0.75)',
    heroMid:   dark ? 'rgba(15,26,51,0.82)' : 'rgba(15,26,51,0.55)',
    heroLight: dark ? 'rgba(15,26,51,0.35)' : 'rgba(15,26,51,0.15)',
    heroBot:   dark ? 'rgba(15,26,51,0.90)' : 'rgba(15,26,51,0.70)',

    // Section bg gradients
    sectionGrad: dark
      ? 'linear-gradient(to bottom, #0F1A33, rgba(25,17,58,0.8), #0F1A33)'
      : 'linear-gradient(to bottom, #FAF5FD, rgba(232,217,240,0.4), #FAF5FD)',

    // Shadows
    shadow:      dark ? 'none' : '0 2px 16px rgba(105,30,185,0.08), 0 1px 4px rgba(0,0,0,0.04)',
    shadowHover: dark ? 'none' : '0 8px 32px rgba(105,30,185,0.15)',

    // Special: dark sections stay dark for contrast in both themes
    darkSection:       '#19113a',
    darkSectionBorder: 'rgba(105,30,185,0.25)',

    isDark: dark,
  };
}
