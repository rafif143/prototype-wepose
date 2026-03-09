'use client';

import { InputHTMLAttributes } from 'react';
import { INPUT_CLASSES, LABEL_CLASSES } from '@/shared/constants/ui';
import { cn } from '@/shared/lib/utils';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string | null;
  required?: boolean;
  containerClassName?: string;
}

export function FormInput({
  label,
  error,
  required = false,
  id,
  containerClassName,
  ...props
}: FormInputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={containerClassName}>
      <label htmlFor={inputId} className={LABEL_CLASSES.BASE}>
        {label} {required && <span className="text-error-red">*</span>}
      </label>
      <input
        id={inputId}
        className={cn(
          INPUT_CLASSES.BASE,
          error ? INPUT_CLASSES.ERROR : INPUT_CLASSES.DEFAULT
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-[13px] text-error-red">
          {error}
        </p>
      )}
    </div>
  );
}
