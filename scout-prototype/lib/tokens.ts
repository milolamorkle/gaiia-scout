export const tokens = {
  // Gaiia Brand
  gaiiaPrimary: "#D8E3D7",

  // ISP Brand (loaded dynamically in real app — hardcoded in prototype)
  ispPrimary: "#5B21B6", // IQ Fiber purple — update this hex if iqfiber.com shows a different value
  ispPrimaryDark: "#4C1D95",
  ispPrimaryLight: "#EDE9FE",

  // Neutrals
  bg: "#FFFFFF",
  bgSecondary: "#F8FAFC",
  bgTertiary: "#F1F5F9",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",

  // Text
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  textInverse: "#FFFFFF",

  // Status
  success: "#22C55E",
  successLight: "#DCFCE7",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  error: "#EF4444",
  errorLight: "#FEE2E2",

  // Typography scale
  fontXS: "11px",
  fontSM: "13px",
  fontBase: "15px",
  fontMD: "17px",
  fontLG: "20px",
  fontXL: "24px",
  font2XL: "28px",

  // Spacing (use these as px values in inline styles or Tailwind arbitrary values)
  space4: "4px",
  space8: "8px",
  space12: "12px",
  space16: "16px",
  space20: "20px",
  space24: "24px",
  space32: "32px",
  space48: "48px",
} as const;
