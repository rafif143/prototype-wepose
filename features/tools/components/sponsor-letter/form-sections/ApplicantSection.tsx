'use client';

import { SponsorFormData, TemplateType } from '@/features/tools/lib/sponsor-letter/types';
import { FormInput } from '@/shared/ui/form';

interface ApplicantSectionProps {
  formData: SponsorFormData;
  template: TemplateType;
  onUpdateField: (field: keyof SponsorFormData, value: string) => void;
  getFieldError: (field: keyof SponsorFormData) => string | null;
  handleBlur: (field: keyof SponsorFormData) => void;
}

export function ApplicantSection({
  formData,
  template,
  onUpdateField,
  getFieldError,
  handleBlur,
}: ApplicantSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
        📋 Data Pemohon
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nama Lengkap"
          required
          value={formData.applicantName}
          onChange={(e) => onUpdateField('applicantName', e.target.value)}
          onBlur={() => handleBlur('applicantName')}
          placeholder="Contoh: Budi Santoso"
          error={getFieldError('applicantName')}
        />
        
        <FormInput
          label="No. Paspor"
          required
          value={formData.passportNumber}
          onChange={(e) => onUpdateField('passportNumber', e.target.value)}
          placeholder="Contoh: A1234567"
        />
        
        <FormInput
          label="Tanggal Lahir"
          required
          type="date"
          value={formData.birthDate}
          onChange={(e) => onUpdateField('birthDate', e.target.value)}
        />
        
        {template === 'pribadi' && (
          <>
            <FormInput
              label="Pekerjaan"
              required
              value={formData.occupation || ''}
              onChange={(e) => onUpdateField('occupation', e.target.value)}
              placeholder="Contoh: Software Engineer"
            />
            <FormInput
              label="Penghasilan per Bulan"
              required
              value={formData.monthlyIncome || ''}
              onChange={(e) => onUpdateField('monthlyIncome', e.target.value)}
              placeholder="Contoh: Rp 15.000.000"
            />
          </>
        )}
      </div>
    </div>
  );
}
