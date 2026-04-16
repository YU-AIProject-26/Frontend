export interface AppTheme {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    foreground: string;
    card: string;
    border: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    accentForeground: string;
  };
  shadows: {
    ctaButton: string;
  };
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    foreground: '#111827',
    card: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#2563EB',
    primaryForeground: '#FFFFFF',
    secondary: '#F3F4F6',
    accent: '#2563EB',
    accentForeground: '#FFFFFF',
  },
  shadows: {
    ctaButton: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#0A0A0A',
    foreground: '#F9FAFB',
    card: '#141414',
    border: '#262626',
    primary: '#3B82F6',
    primaryForeground: '#FFFFFF',
    secondary: '#1F2937',
    accent: '#3B82F6',
    accentForeground: '#FFFFFF',
  },
  shadows: {
    ctaButton: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
};