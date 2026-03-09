import { SponsorFormData, TemplateType } from './types';

export interface ValidationError {
  field: keyof SponsorFormData;
  message: string;
}

export function validateSponsorForm(
  formData: SponsorFormData,
  template: TemplateType
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Common fields validation
  if (!formData.applicantName.trim()) {
    errors.push({ field: 'applicantName', message: 'Nama lengkap wajib diisi' });
  }

  if (!formData.passportNumber.trim()) {
    errors.push({ field: 'passportNumber', message: 'No. paspor wajib diisi' });
  } else if (!/^[A-Z0-9]{6,9}$/i.test(formData.passportNumber)) {
    errors.push({ field: 'passportNumber', message: 'Format no. paspor tidak valid' });
  }

  if (!formData.birthDate) {
    errors.push({ field: 'birthDate', message: 'Tanggal lahir wajib diisi' });
  }

  if (!formData.destinationCountry.trim()) {
    errors.push({ field: 'destinationCountry', message: 'Negara tujuan wajib diisi' });
  }

  if (!formData.destinationCity.trim()) {
    errors.push({ field: 'destinationCity', message: 'Kota tujuan wajib diisi' });
  }

  if (!formData.departureDate) {
    errors.push({ field: 'departureDate', message: 'Tanggal berangkat wajib diisi' });
  }

  if (!formData.returnDate) {
    errors.push({ field: 'returnDate', message: 'Tanggal kembali wajib diisi' });
  }

  // Validate date range
  if (formData.departureDate && formData.returnDate) {
    const departure = new Date(formData.departureDate);
    const returnDate = new Date(formData.returnDate);
    if (returnDate <= departure) {
      errors.push({ field: 'returnDate', message: 'Tanggal kembali harus setelah tanggal berangkat' });
    }
  }

  // Template-specific validation
  if (template === 'keluarga') {
    if (!formData.sponsorName?.trim()) {
      errors.push({ field: 'sponsorName', message: 'Nama sponsor wajib diisi' });
    }
    if (!formData.sponsorIdNumber?.trim()) {
      errors.push({ field: 'sponsorIdNumber', message: 'No. KTP sponsor wajib diisi' });
    } else if (!/^\d{16}$/.test(formData.sponsorIdNumber)) {
      errors.push({ field: 'sponsorIdNumber', message: 'No. KTP harus 16 digit' });
    }
    if (!formData.sponsorAddress?.trim()) {
      errors.push({ field: 'sponsorAddress', message: 'Alamat sponsor wajib diisi' });
    }
    if (!formData.sponsorPhone?.trim()) {
      errors.push({ field: 'sponsorPhone', message: 'No. telepon sponsor wajib diisi' });
    } else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.sponsorPhone.replace(/[\s-]/g, ''))) {
      errors.push({ field: 'sponsorPhone', message: 'Format no. telepon tidak valid' });
    }
    if (!formData.relationship) {
      errors.push({ field: 'relationship', message: 'Hubungan wajib dipilih' });
    }
  }

  if (template === 'perusahaan') {
    if (!formData.companyName?.trim()) {
      errors.push({ field: 'companyName', message: 'Nama perusahaan wajib diisi' });
    }
    if (!formData.position?.trim()) {
      errors.push({ field: 'position', message: 'Jabatan karyawan wajib diisi' });
    }
    if (!formData.letterNumber?.trim()) {
      errors.push({ field: 'letterNumber', message: 'No. surat wajib diisi' });
    }
    if (!formData.signerName?.trim()) {
      errors.push({ field: 'signerName', message: 'Nama penandatangan wajib diisi' });
    }
    if (!formData.signerPosition?.trim()) {
      errors.push({ field: 'signerPosition', message: 'Jabatan penandatangan wajib diisi' });
    }
  }

  if (template === 'pribadi') {
    if (!formData.occupation?.trim()) {
      errors.push({ field: 'occupation', message: 'Pekerjaan wajib diisi' });
    }
    if (!formData.monthlyIncome?.trim()) {
      errors.push({ field: 'monthlyIncome', message: 'Penghasilan per bulan wajib diisi' });
    }
  }

  return errors;
}

export function hasValidationErrors(
  formData: SponsorFormData,
  template: TemplateType
): boolean {
  return validateSponsorForm(formData, template).length > 0;
}
