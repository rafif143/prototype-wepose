import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/shared/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  label,
  className,
}: QuantityStepperProps) {
  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    onChange(Math.min(Math.max(newValue, min), max));
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="block text-[14px] font-dm-sans font-medium text-navy">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange text-orange hover:bg-orange hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-orange"
          aria-label="Decrease quantity"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-16 text-center font-poppins font-bold text-2xl text-navy border-none focus:outline-none"
        />
        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange text-orange hover:bg-orange hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-orange"
          aria-label="Increase quantity"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
