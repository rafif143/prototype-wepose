import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantClasses = {
  default: 'bg-orange',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-dm-sans text-sm text-gray-600">Progress</span>
          <span className="font-poppins font-semibold text-sm text-navy">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
  className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  completedSteps = [],
  className,
}: StepProgressProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => {
        const isCompleted = completedSteps.includes(step);
        const isCurrent = step === currentStep;
        const isPast = step < currentStep;

        return (
          <React.Fragment key={step}>
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full font-poppins font-semibold text-sm transition-all duration-200',
                (isCompleted || isPast) && 'bg-orange text-white',
                isCurrent && !isCompleted && 'bg-orange-100 text-orange border-2 border-orange',
                !isCurrent && !isCompleted && !isPast && 'bg-gray-100 text-gray-400'
              )}
            >
              {step}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 rounded-full transition-all duration-200',
                  isPast ? 'bg-orange' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
