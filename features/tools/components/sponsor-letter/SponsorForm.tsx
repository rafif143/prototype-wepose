'use client';

import { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { TemplateType, SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';
import { validateSponsorForm, ValidationError } from '@/features/tools/lib/sponsor-letter/validation';
import { BUTTON_CLASSES } from '@/shared/constants/ui';
import {
  ApplicantSection,
  SponsorSection,
  CompanySection,
  TravelSection,
} from './form-sections';

interface SponsorFormProps {
  template: TemplateType;
  formData: SponsorFormData;
  onUpdateField: (field: keyof SponsorFormData, value: string) => void;
}

export function SponsorForm({ template, formData, onUpdateField }: SponsorFormProps) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<keyof SponsorFormData>>(new Set());

  useEffect(() => {
    const validationErrors = validateSponsorForm(formData, template);
    setErrors(validationErrors);
  }, [formData, template]);

  const handleBlur = (field: keyof SponsorFormData) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  };

  const getFieldError = (field: keyof SponsorFormData): string | null => {
    if (!touchedFields.has(field)) return null;
    return errors.find((error) => error.field === field)?.message || null;
  };

  return (
    <div className="space-y-8">
      {/* Ambil dari Profil Button */}
      <button className={`flex items-center gap-2 ${BUTTON_CLASSES.SECONDARY}`}>
        <UserIcon className="w-4 h-4" />
        Ambil dari Profil
      </button>

      {/* Data Pemohon Section */}
      <ApplicantSection
        formData={formData}
        template={template}
        onUpdateField={onUpdateField}
        getFieldError={getFieldError}
        handleBlur={handleBlur}
      />

      {/* Data Sponsor/Company Section */}
      {template === 'keluarga' && (
        <SponsorSection formData={formData} onUpdateField={onUpdateField} />
      )}
      
      {template === 'perusahaan' && (
        <CompanySection formData={formData} onUpdateField={onUpdateField} />
      )}

      {/* Detail Perjalanan Section */}
      <TravelSection formData={formData} onUpdateField={onUpdateField} />
    </div>
  );
}
