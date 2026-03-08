// Form validation utilities for WEPOSE Premium Tools

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validate required field
export function validateRequired(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'Field ini wajib diisi' };
  }
  return { isValid: true };
}

// Validate passport number (8-9 characters alphanumeric)
export function validatePassportNumber(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Nomor paspor wajib diisi' };
  }
  if (!/^[A-Z0-9]{8,9}$/i.test(value)) {
    return { isValid: false, error: 'Format tidak valid. Contoh: A1234567' };
  }
  return { isValid: true };
}

// Validate date (must be valid date)
export function validateDate(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Tanggal wajib diisi' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Format tanggal tidak valid' };
  }
  return { isValid: true };
}

// Validate date range (departure must be before return)
export function validateDateRange(
  departureDate: string,
  returnDate: string
): ValidationResult {
  const departure = new Date(departureDate);
  const returnD = new Date(returnDate);
  
  if (departure >= returnD) {
    return {
      isValid: false,
      error: 'Tanggal kepulangan harus setelah tanggal keberangkatan',
    };
  }
  return { isValid: true };
}

// Validate phone number (10-15 digits)
export function validatePhoneNumber(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Nomor telepon wajib diisi' };
  }
  if (!/^[0-9]{10,15}$/.test(value.replace(/[\s-]/g, ''))) {
    return { isValid: false, error: 'Format tidak valid. Contoh: 081234567890' };
  }
  return { isValid: true };
}

// Validate ID number (16 digits for KTP)
export function validateIdNumber(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Nomor KTP wajib diisi' };
  }
  if (!/^[0-9]{16}$/.test(value)) {
    return { isValid: false, error: 'Nomor KTP harus 16 digit' };
  }
  return { isValid: true };
}

// Sanitize input (basic XSS prevention)
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
