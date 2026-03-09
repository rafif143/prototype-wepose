'use client';

import { SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';
import { FormInput } from '@/shared/ui/form';

interface TravelSectionProps {
  formData: SponsorFormData;
  onUpdateField: (field: keyof SponsorFormData, value: string) => void;
}

export function TravelSection({ formData, onUpdateField }: TravelSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
        ✈️ Detail Perjalanan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Negara Tujuan"
          required
          value={formData.destinationCountry}
          onChange={(e) => onUpdateField('destinationCountry', e.target.value)}
          placeholder="Contoh: Jepang"
        />
        
        <FormInput
          label="Kota Tujuan"
          required
          value={formData.destinationCity}
          onChange={(e) => onUpdateField('destinationCity', e.target.value)}
          placeholder="Contoh: Tokyo"
        />
        
        <FormInput
          label="Tanggal Berangkat"
          required
          type="date"
          value={formData.departureDate}
          onChange={(e) => onUpdateField('departureDate', e.target.value)}
        />
        
        <FormInput
          label="Tanggal Kembali"
          required
          type="date"
          value={formData.returnDate}
          onChange={(e) => onUpdateField('returnDate', e.target.value)}
        />
      </div>
    </div>
  );
}
