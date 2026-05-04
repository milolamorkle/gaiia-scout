export const tokens = {
  // ISP Brand (loaded dynamically in real app — hardcoded in prototype)
  ispPrimary: '#0EA5E9',        // Uplink Internet blue
  ispPrimaryDark: '#0284C7',
  ispPrimaryLight: '#E0F2FE',

  // Neutrals
  bg: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgTertiary: '#F1F5F9',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Status
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',

  // Typography scale
  fontXS: '11px',
  fontSM: '13px',
  fontBase: '15px',
  fontMD: '17px',
  fontLG: '20px',
  fontXL: '24px',
  font2XL: '28px',

  // Spacing (use these as px values in inline styles or Tailwind arbitrary values)
  space4: '4px',
  space8: '8px',
  space12: '12px',
  space16: '16px',
  space20: '20px',
  space24: '24px',
  space32: '32px',
  space48: '48px',
} as const
