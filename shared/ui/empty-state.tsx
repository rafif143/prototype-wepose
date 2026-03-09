import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {icon && <div className="mb-4 text-gray-300">{icon}</div>}
      <h3 className="font-poppins font-semibold text-lg text-navy mb-2">{title}</h3>
      {description && (
        <p className="font-dm-sans text-sm text-gray-500 max-w-md mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-orange text-white font-poppins font-semibold text-sm rounded-full hover:bg-orange-dark transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
