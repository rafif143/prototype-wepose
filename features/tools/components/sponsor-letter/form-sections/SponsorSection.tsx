'use client';

import { SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';
import { FormInput, FormSelect } from '@/shared/ui/form';

interface SponsorSectionProps {
  formData: SponsorFormData;
  onUpdateField: (field: keyof SponsorFormData, value: string) => void;
}

const RELATIONSHIP_OPTIONS = [
  { value: 'Anak', label: 'Anak' },
  { value: 'Suami/Istri', label: 'Suami/Istri' },
  { value: 'Orang Tua', label: 'Orang Tua' },
];

export function SponsorSection({ formData, onUpdateField }: SponsorSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
        👨‍👩‍👧 Data Sponsor
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nama Sponsor"
          required
          value={formData.sponsorName || ''}
          onChange={(e) => onUpdateField('sponsorName', e.target.value)}
          placeholder="Contoh: Ahmad Wijaya"
        />
        
        <FormInput
          label="No. KTP Sponsor"
          required
          value={formData.sponsorIdNumber || ''}
          onChange={(e) => onUpdateField('sponsorIdNumber', e.target.value)}
          placeholder="Contoh: 3201234567890001"
        />
        
        <FormInput
          label="Alamat Sponsor"
          required
          containerClassName="md:col-span-2"
          value={formData.sponsorAddress || ''}
          onChange={(e) => onUpdateField('sponsorAddress', e.target.value)}
          placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
        />
        
        <FormInput
          label="No. Telepon Sponsor"
          required
          type="tel"
          value={formData.sponsorPhone || ''}
          onChange={(e) => onUpdateField('sponsorPhone', e.target.value)}
          placeholder="Contoh: +62 812-3456-7890"
        />
        
        <FormSelect
          label="Hubungan"
          required
          value={formData.relationship || ''}
          onChange={(e) => onUpdateField('relationship', e.target.value)}
          options={RELATIONSHIP_OPTIONS}
          placeholder="Pilih hubungan"
        />
      </div>
    </div>
  );
}
