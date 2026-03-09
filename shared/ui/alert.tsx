import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/shared/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-xl border p-4 flex items-start gap-3',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 border-gray-200 text-gray-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const icons = {
  default: InformationCircleIcon,
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const iconColors = {
  default: 'text-gray-600',
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, showIcon = true, children, ...props }, ref) => {
    const Icon = icons[variant || 'default'];

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {showIcon && (
          <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColors[variant || 'default'])} />
        )}
        <div className="flex-1">
          {title && (
            <h5 className="font-poppins font-semibold text-sm mb-1">{title}</h5>
          )}
          <div className="font-dm-sans text-sm">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert, alertVariants };
