export const colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',
  secondary: '#059669',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
};

export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatRooms(rooms: number): string {
  if (rooms === 0) return 'Студия';
  if (rooms === 1) return '1-комн.';
  if (rooms === 2) return '2-комн.';
  if (rooms === 3) return '3-комн.';
  return `${rooms}+ комн.`;
}
