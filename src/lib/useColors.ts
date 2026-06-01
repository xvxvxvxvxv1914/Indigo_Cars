import { useTheme } from '../context/ThemeContext';

export function useColors() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return {
    // Backgrounds
    main:      dark ? '#0a0a1a'              : '#F5F3FF',
    alt:       dark ? '#0e0d20'              : '#FFFFFF',
    card:      dark ? '#12102a'              : '#FFFFFF',
    cardHover: dark ? '#1a1830'              : '#F5F3FF',
    navBg:     dark ? 'rgba(10,9,26,0.97)'  : 'rgba(255,255,255,0.97)',
    input:     dark ? 'rgba(26,24,48,0.6)'  : 'rgba(245,243,255,0.8)',
    statCard:  dark ? 'rgba(26,24,48,0.8)'  : 'rgba(255,255,255,0.95)',

    // Borders
    border:    dark ? '#2a2850'              : '#E4DCFF',
    borderPurple: dark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.15)',

    // Text
    t1:        dark ? '#ffffff'              : '#1A1A2E',
    t2:        dark ? '#a0a0b8'              : '#5B5880',
    t3:        dark ? '#6060b8'              : '#9CA3AF',
    placeholder: dark ? '#6060b8'            : '#A89ED0',

    // Gradients (keep dark for both themes in hero — overlaid on image)
    heroFrom:  dark ? 'rgba(10,10,26,0.97)' : 'rgba(15,10,40,0.75)',
    heroMid:   dark ? 'rgba(10,10,26,0.82)' : 'rgba(15,10,40,0.55)',
    heroLight: dark ? 'rgba(10,10,26,0.35)' : 'rgba(15,10,40,0.15)',
    heroBot:   dark ? 'rgba(10,10,26,0.90)' : 'rgba(15,10,40,0.70)',

    // Section bg gradients
    sectionGrad: dark
      ? 'linear-gradient(to bottom, #0a0a1a, rgba(18,16,42,0.8), #0a0a1a)'
      : 'linear-gradient(to bottom, #F5F3FF, rgba(237,233,254,0.4), #F5F3FF)',

    // Shadows
    shadow:    dark ? 'none' : '0 2px 16px rgba(124,58,237,0.08), 0 1px 4px rgba(0,0,0,0.04)',
    shadowHover: dark ? 'none' : '0 8px 32px rgba(124,58,237,0.15)',

    // Special: dark sections stay dark for contrast in both themes
    darkSection: '#1a1035',
    darkSectionBorder: 'rgba(124,58,237,0.25)',

    isDark: dark,
  };
}
