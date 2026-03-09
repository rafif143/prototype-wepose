import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const selectVariants = cva(
  "w-full px-4 py-2.5 rounded-lg border font-dm-sans text-[15px] transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-white",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20",
        error: "border-error-red focus:border-error-red focus:ring-2 focus:ring-error-red/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  error?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, error, label, required, helperText, id, children, ...props }, ref) => {
    const selectId = id || `select-${React.useId()}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[14px] font-dm-sans font-medium text-navy mb-1.5"
          >
            {label}
            {required && <span className="text-error-red ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(selectVariants({ variant: error ? "error" : variant, className }))}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        >
          {children}
        </select>
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

Select.displayName = "Select";

export { Select, selectVariants };
