'use client';

import { motion } from 'framer-motion';
import { Language } from '@/lib/tools/sponsor-letter/types';

interface LanguageToggleProps {
  language: Language;
  onToggle: (language: Language) => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center bg-white/10 rounded-button p-1 gap-1">
      <button
        onClick={() => onToggle('id')}
        className={`relative px-4 py-2 rounded-button text-[14px] font-dm-sans font-medium transition-all duration-200 ${
          language === 'id'
            ? 'text-white'
            : 'text-white/70 hover:text-white/90'
        }`}
      >
        {language === 'id' && (
          <motion.div
            layoutId="language-bg"
            className="absolute inset-0 bg-orange rounded-button"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          🇮🇩 Indonesia
        </span>
      </button>

      <button
        onClick={() => onToggle('en')}
        className={`relative px-4 py-2 rounded-button text-[14px] font-dm-sans font-medium transition-all duration-200 ${
          language === 'en'
            ? 'text-white'
            : 'text-white/70 hover:text-white/90'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="language-bg"
            className="absolute inset-0 bg-orange rounded-button"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          🇬🇧 English
        </span>
      </button>
    </div>
  );
}
