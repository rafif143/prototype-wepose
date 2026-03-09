'use client';

import { motion } from 'framer-motion';
import { templates, TemplateType } from '@/features/tools/lib/sponsor-letter/types';
import { staggerContainer, fadeInUp } from '@/shared/utils/animations';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType | null;
  onSelectTemplate: (template: TemplateType) => void;
  onNext: () => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}: TemplateSelectorProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <h1 className="text-h1 text-navy mb-3">Pilih Template Surat Sponsor</h1>
          <p className="text-body-lg text-gray-500">
            Pilih jenis surat sponsor yang sesuai dengan kebutuhan perjalanan Anda
          </p>
        </motion.div>

        {/* Template Cards */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <motion.button
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-card border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-orange bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange/50'
                }`}
              >
                {/* Popular Badge */}
                {template.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-info-purple text-white text-[11px] font-poppins font-bold px-3 py-1 rounded-badge">
                      ⭐ Paling Populer
                    </span>
                  </div>
                )}

                {/* Template Preview */}
                <div
                  className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: template.previewColor }}
                >
                  <div className="space-y-2 w-full px-4">
                    {/* Simulated letter lines */}
                    <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto" />
                    <div className="h-2 bg-gray-300 rounded w-full" />
                    <div className="h-2 bg-gray-300 rounded w-5/6 mx-auto" />
                    <div className="h-2 bg-gray-300 rounded w-4/5 mx-auto" />
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{template.icon}</span>
                    <h3 className="text-h4 text-navy">{template.name}</h3>
                  </div>
                  <p className="text-caption text-gray-500">{template.description}</p>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-orange rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Next Button */}
        <motion.div variants={fadeInUp} className="flex justify-center pt-4">
          <button
            onClick={onNext}
            disabled={!selectedTemplate}
            className={`px-8 py-3 rounded-button font-poppins font-semibold text-[15px] transition-all duration-200 ${
              selectedTemplate
                ? 'bg-orange text-white hover:bg-orange-dark hover:shadow-cta-hover'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Lanjut ke Review & Edit →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
