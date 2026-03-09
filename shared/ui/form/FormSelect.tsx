'use client';

import { SelectHTMLAttributes } from 'react';
import { INPUT_CLASSES, LABEL_CLASSES } from '@/shared/constants/ui';
import { cn } from '@/shared/lib/utils';

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string;
  error?: string | null;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  containerClassName?: string;
}

export function FormSelect({
  label,
  error,
  required = false,
  options,
  placeholder = 'Pilih...',
  id,
  containerClassName,
  ...props
}: FormSelectProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={containerClassName}>
      <label htmlFor={selectId} className={LABEL_CLASSES.BASE}>
        {label} {required && <span className="text-error-red">*</span>}
      </label>
      <select
        id={selectId}
        className={cn(
          INPUT_CLASSES.BASE,
          error ? INPUT_CLASSES.ERROR : INPUT_CLASSES.DEFAULT
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-[13px] text-error-red">
          {error}
        </p>
      )}
    </div>
  );
}
