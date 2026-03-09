import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/shared/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-base',
  lg: 'h-13 text-lg',
};

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  className,
  size = 'md',
}: SearchBarProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-10 rounded-lg border border-gray-200 font-dm-sans text-gray-800 placeholder-gray-400 focus:border-orange focus:ring-2 focus:ring-orange/20 focus:outline-none transition-all duration-200',
          sizeClasses[size]
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
          aria-label="Clear search"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
