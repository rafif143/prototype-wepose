'use client';

import { SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';

interface FormInputProps {
  id: keyof SponsorFormData;
  label: string;
  type?: 'text' | 'date' | 'tel' | 'email';
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  error?: string | null;
  required?: boolean;
}

export function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = true,
}: FormInputProps) {
  const inputClass = `w-full px-4 py-2.5 rounded-input border text-[15px] font-dm-sans transition-all duration-200 focus:outline-none ${
    error
      ? 'border-error-red focus:border-error-red focus:ring-2 focus:ring-error-red/20'
      : 'border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20'
  }`;

  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-dm-sans font-medium text-navy mb-1.5">
        {label} {required && <span className="text-error-red">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClass}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[13px] text-error-red">
          {error}
        </p>
      )}
    </div>
  );
}
