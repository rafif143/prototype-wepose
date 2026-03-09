import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const textareaVariants = cva(
  "w-full px-4 py-2.5 rounded-lg border font-dm-sans text-[15px] transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, label, required, helperText, id, ...props }, ref) => {
    const textareaId = id || `textarea-${React.useId()}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[14px] font-dm-sans font-medium text-navy mb-1.5"
          >
            {label}
            {required && <span className="text-error-red ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(textareaVariants({ variant: error ? "error" : variant, className }))}
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

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
