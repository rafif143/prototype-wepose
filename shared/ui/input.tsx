import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
  "w-full px-4 py-2.5 rounded-lg border font-dm-sans text-[15px] transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20",
        error: "border-error-red focus:border-error-red focus:ring-2 focus:ring-error-red/20",
        success: "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, error, label, required, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[14px] font-dm-sans font-medium text-navy mb-1.5"
          >
            {label}
            {required && <span className="text-error-red ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(inputVariants({ variant: error ? "error" : variant, className }))}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-[13px] text-error-red">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-[13px] text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
