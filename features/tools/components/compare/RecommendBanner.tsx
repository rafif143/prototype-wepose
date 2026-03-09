'use client';

import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface RecommendBannerProps {
  recommendedVisa: {
    name: string;
    flag: string;
    reason: string;
  };
  onApply: () => void;
}

export function RecommendBanner({ recommendedVisa, onApply }: RecommendBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-orange-50 border-l-4 border-orange rounded-r-2xl p-5 flex items-center justify-between gap-4"
    >
      <div className="flex items-start gap-3 flex-1">
        <SparklesIcon className="w-6 h-6 text-orange flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[14px] font-dm-sans text-gray-600 mb-1">
            Berdasarkan profilmu, kami rekomendasikan:
          </p>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[20px]">{recommendedVisa.flag}</span>
            <h4 className="text-[18px] font-poppins font-bold text-navy">
              {recommendedVisa.name}
            </h4>
          </div>
          <p className="text-[13px] font-dm-sans text-gray-500 italic">
            {recommendedVisa.reason}
          </p>
        </div>
      </div>
      <button
        onClick={onApply}
        className="bg-orange text-white font-poppins font-semibold text-[14px] py-2.5 px-6 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
      >
        Apply Visa Ini →
      </button>
    </motion.div>
  );
}
