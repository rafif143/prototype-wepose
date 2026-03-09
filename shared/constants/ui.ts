// UI constants for consistent styling
export const INPUT_CLASSES = {
  BASE: 'w-full px-4 py-2.5 rounded-input border text-[15px] font-dm-sans transition-all duration-200 focus:outline-none',
  DEFAULT: 'border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20',
  ERROR: 'border-error-red focus:border-error-red focus:ring-2 focus:ring-error-red/20',
} as const;

export const LABEL_CLASSES = {
  BASE: 'block text-[14px] font-dm-sans font-medium text-navy mb-1.5',
} as const;

export const BUTTON_CLASSES = {
  PRIMARY: 'bg-orange text-white font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200',
  SECONDARY: 'px-4 py-2 rounded-button border border-gray-200 text-[14px] font-dm-sans font-medium text-navy hover:border-orange hover:bg-orange-50 transition-all duration-200',
} as const;

export const GLOBE_CONFIG = {
  LABEL_MIN_DISTANCE: 45,
  ROTATION_SPEED: 0.003,
  ROTATION_SPEED_INTERACTIVE: 0.005,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
} as const;
