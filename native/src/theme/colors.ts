// iOS-inspired color system for React Native
export const colors = {
  light: {
    background: '#FAFAFA',
    foreground: '#1A1A1A',
    primary: '#007AFF',
    primaryForeground: '#FFFFFF',
    secondary: '#F5F5F5',
    secondaryForeground: '#333333',
    muted: '#F0F0F0',
    mutedForeground: '#757575',
    accent: '#007AFF',
    accentForeground: '#FFFFFF',
    destructive: '#FF3B30',
    destructiveForeground: '#FFFFFF',
    border: '#E5E5E5',
    input: '#E5E5E5',
    card: '#FFFFFF',
    cardForeground: '#1A1A1A',
  },
  dark: {
    background: '#1A1A1A',
    foreground: '#FAFAFA',
    primary: '#007AFF',
    primaryForeground: '#FFFFFF',
    secondary: '#242424',
    secondaryForeground: '#E5E5E5',
    muted: '#242424',
    mutedForeground: '#999999',
    accent: '#007AFF',
    accentForeground: '#FFFFFF',
    destructive: '#FF3B30',
    destructiveForeground: '#FFFFFF',
    border: '#333333',
    input: '#333333',
    card: '#1F1F1F',
    cardForeground: '#FAFAFA',
  },
};

export const cardGradients = {
  blue: ['#3B82F6', '#2563EB', '#1D4ED8'],
  purple: ['#A855F7', '#9333EA', '#7E22CE'],
  teal: ['#14B8A6', '#0D9488', '#0F766E'],
  orange: ['#F97316', '#EA580C', '#C2410C'],
  pink: ['#EC4899', '#DB2777', '#BE185D'],
  green: ['#22C55E', '#16A34A', '#15803D'],
  red: ['#EF4444', '#DC2626', '#B91C1C'],
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  xlarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 48,
    elevation: 16,
  },
};

