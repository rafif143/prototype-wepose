'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { TemplateType, Language, SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';
import { LetterPreview } from './LetterPreview';

interface MobilePreviewAccordionProps {
  template: TemplateType;
  language: Language;
  formData: SponsorFormData;
}

export function MobilePreviewAccordion({
  template,
  language,
  formData,
}: MobilePreviewAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-orange transition-all duration-200"
      >
        <span className="text-[15px] font-poppins font-semibold text-navy">
          📄 Lihat Preview Surat
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <LetterPreview
                template={template}
                language={language}
                formData={formData}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
