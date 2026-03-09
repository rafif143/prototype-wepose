'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { slideUp } from '@/shared/utils/animations';

interface VisaThumbnail {
  id: string;
  name: string;
  flag: string;
}

interface StickyCompareBarProps {
  selectedVisas: VisaThumbnail[];
  onRemove: (visaId: string) => void;
  onCompare: () => void;
}

export function StickyCompareBar({
  selectedVisas,
  onRemove,
  onCompare,
}: StickyCompareBarProps) {
  const canCompare = selectedVisas.length >= 2;

  if (selectedVisas.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed bottom-0 left-0 right-0 z-50 bg-navy shadow-[0_-4px_20px_rgba(0,0,0,0.3)] px-6 py-3 h-[72px]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Visa Thumbnails */}
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <AnimatePresence mode="popLayout">
              {selectedVisas.map((visa) => (
                <motion.div
                  key={visa.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 bg-navy-mid rounded-full pl-3 pr-2 py-2 min-w-fit"
                >
                  <span className="text-[20px]">{visa.flag}</span>
                  <span className="text-[12px] font-dm-sans text-white truncate max-w-[120px]">
                    {visa.name}
                  </span>
                  <button
                    onClick={() => onRemove(visa.id)}
                    className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label={`Remove ${visa.name}`}
                  >
                    <XMarkIcon className="w-3 h-3 text-white/60" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Center: Counter (hidden on mobile) */}
          <div className="hidden md:block text-[14px] font-dm-sans text-gray-400">
            {selectedVisas.length} visa dipilih
          </div>

          {/* Right: Compare Button */}
          <button
            onClick={onCompare}
            disabled={!canCompare}
            className={`font-poppins font-semibold text-[14px] py-2.5 px-6 rounded-full transition-all duration-200 whitespace-nowrap ${
              canCompare
                ? 'bg-orange text-white hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97]'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Bandingkan Sekarang →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
