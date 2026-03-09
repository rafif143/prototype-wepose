// Validation constants
export const VALIDATION_RULES = {
  PASSPORT: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 9,
    PATTERN: /^[A-Z0-9]{6,9}$/i,
  },
  ID_NUMBER: {
    LENGTH: 16,
    PATTERN: /^\d{16}$/,
  },
  PHONE: {
    PATTERN: /^(\+62|62|0)[0-9]{9,12}$/,
  },
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} wajib diisi`,
  INVALID_FORMAT: (field: string) => `Format ${field} tidak valid`,
  PASSPORT_INVALID: 'Format no. paspor tidak valid',
  ID_NUMBER_INVALID: 'No. KTP harus 16 digit',
  PHONE_INVALID: 'Format no. telepon tidak valid',
  DATE_RANGE_INVALID: 'Tanggal kembali harus setelah tanggal berangkat',
} as const;
