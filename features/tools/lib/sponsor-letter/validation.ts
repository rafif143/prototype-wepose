import { SponsorFormData, TemplateType } from './types';
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '@/shared/constants/validation';

export interface ValidationError {
  field: keyof SponsorFormData;
  message: string;
}

// Validation helper functions
const validateRequired = (value: string | undefined, field: string): string | null => {
  if (!value?.trim()) {
    return VALIDATION_MESSAGES.REQUIRED(field);
  }
  return null;
};

const validatePassport = (value: string): string | null => {
  if (!value.trim()) {
    return VALIDATION_MESSAGES.REQUIRED('No. paspor');
  }
  if (!VALIDATION_RULES.PASSPORT.PATTERN.test(value)) {
    return VALIDATION_MESSAGES.PASSPORT_INVALID;
  }
  return null;
};

const validateIdNumber = (value: string | undefined): string | null => {
  if (!value?.trim()) {
    return VALIDATION_MESSAGES.REQUIRED('No. KTP');
  }
  if (!VALIDATION_RULES.ID_NUMBER.PATTERN.test(value)) {
    return VALIDATION_MESSAGES.ID_NUMBER_INVALID;
  }
  return null;
};

const validatePhone = (value: string | undefined): string | null => {
  if (!value?.trim()) {
    return VALIDATION_MESSAGES.REQUIRED('No. telepon');
  }
  const cleanPhone = value.replace(/[\s-]/g, '');
  if (!VALIDATION_RULES.PHONE.PATTERN.test(cleanPhone)) {
    return VALIDATION_MESSAGES.PHONE_INVALID;
  }
  return null;
};

const validateDateRange = (departureDate: string, returnDate: string): string | null => {
  if (!departureDate || !returnDate) return null;
  
  const departure = new Date(departureDate);
  const returnD = new Date(returnDate);
  
  if (returnD <= departure) {
    return VALIDATION_MESSAGES.DATE_RANGE_INVALID;
  }
  return null;
};

// Main validation function
export function validateSponsorForm(
  formData: SponsorFormData,
  template: TemplateType
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Helper to add error
  const addError = (field: keyof SponsorFormData, message: string | null) => {
    if (message) {
      errors.push({ field, message });
    }
  };

  // Common fields validation
  addError('applicantName', validateRequired(formData.applicantName, 'Nama lengkap'));
  addError('passportNumber', validatePassport(formData.passportNumber));
  addError('birthDate', validateRequired(formData.birthDate, 'Tanggal lahir'));
  addError('destinationCountry', validateRequired(formData.destinationCountry, 'Negara tujuan'));
  addError('destinationCity', validateRequired(formData.destinationCity, 'Kota tujuan'));
  addError('departureDate', validateRequired(formData.departureDate, 'Tanggal berangkat'));
  addError('returnDate', validateRequired(formData.returnDate, 'Tanggal kembali'));

  // Validate date range
  const dateRangeError = validateDateRange(formData.departureDate, formData.returnDate);
  addError('returnDate', dateRangeError);

  // Template-specific validation
  if (template === 'keluarga') {
    addError('sponsorName', validateRequired(formData.sponsorName, 'Nama sponsor'));
    addError('sponsorIdNumber', validateIdNumber(formData.sponsorIdNumber));
    addError('sponsorAddress', validateRequired(formData.sponsorAddress, 'Alamat sponsor'));
    addError('sponsorPhone', validatePhone(formData.sponsorPhone));
    addError('relationship', validateRequired(formData.relationship, 'Hubungan'));
  }

  if (template === 'perusahaan') {
    addError('companyName', validateRequired(formData.companyName, 'Nama perusahaan'));
    addError('position', validateRequired(formData.position, 'Jabatan karyawan'));
    addError('letterNumber', validateRequired(formData.letterNumber, 'No. surat'));
    addError('signerName', validateRequired(formData.signerName, 'Nama penandatangan'));
    addError('signerPosition', validateRequired(formData.signerPosition, 'Jabatan penandatangan'));
  }

  if (template === 'pribadi') {
    addError('occupation', validateRequired(formData.occupation, 'Pekerjaan'));
    addError('monthlyIncome', validateRequired(formData.monthlyIncome, 'Penghasilan per bulan'));
  }

  return errors;
}

export function hasValidationErrors(
  formData: SponsorFormData,
  template: TemplateType
): boolean {
  return validateSponsorForm(formData, template).length > 0;
}
