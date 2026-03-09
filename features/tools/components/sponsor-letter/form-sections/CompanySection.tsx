'use client';

import { SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';
import { FormInput } from '@/shared/ui/form';

interface CompanySectionProps {
  formData: SponsorFormData;
  onUpdateField: (field: keyof SponsorFormData, value: string) => void;
}

export function CompanySection({ formData, onUpdateField }: CompanySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
        🏢 Data Perusahaan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nama Perusahaan"
          required
          value={formData.companyName || ''}
          onChange={(e) => onUpdateField('companyName', e.target.value)}
          placeholder="Contoh: PT Teknologi Indonesia"
        />
        
        <FormInput
          label="Jabatan Karyawan"
          required
          value={formData.position || ''}
          onChange={(e) => onUpdateField('position', e.target.value)}
          placeholder="Contoh: Senior Developer"
        />
        
        <FormInput
          label="No. Surat"
          required
          value={formData.letterNumber || ''}
          onChange={(e) => onUpdateField('letterNumber', e.target.value)}
          placeholder="Contoh: 001/HR/XII/2024"
        />
        
        <FormInput
          label="Nama Penandatangan"
          required
          value={formData.signerName || ''}
          onChange={(e) => onUpdateField('signerName', e.target.value)}
          placeholder="Contoh: Siti Nurhaliza"
        />
        
        <FormInput
          label="Jabatan Penandatangan"
          required
          value={formData.signerPosition || ''}
          onChange={(e) => onUpdateField('signerPosition', e.target.value)}
          placeholder="Contoh: HR Manager"
        />
      </div>
    </div>
  );
}
