'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TemplateType, Language, SponsorFormData } from '@/lib/tools/sponsor-letter/types';
import { getLetterBody } from '@/lib/tools/sponsor-letter/content';
import { useEffect, useState } from 'react';

interface LetterPreviewProps {
  template: TemplateType;
  language: Language;
  formData: SponsorFormData;
}

function LetterPreviewComponent({ template, language, formData }: LetterPreviewProps) {
  const [key, setKey] = useState(0);
  const { title, body } = getLetterBody(template, language, formData);

  // Trigger fade animation when content changes
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [formData, language]);

  // Helper to highlight empty fields
  const highlightEmptyFields = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span
            key={index}
            className="bg-warning-amber/20 text-warning-amber px-1 rounded"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
        {/* Preview Header */}
        <div className="bg-navy-light px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error-red" />
            <div className="w-3 h-3 rounded-full bg-warning-amber" />
            <div className="w-3 h-3 rounded-full bg-success-green" />
            <span className="ml-2 text-[13px] font-dm-sans text-gray-500">
              Preview Surat
            </span>
          </div>
        </div>

        {/* A4 Preview Container */}
        <div className="p-6 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white shadow-lg mx-auto"
              style={{
                aspectRatio: '0.707', // A4 ratio
                maxWidth: '100%',
                padding: '48px 40px',
              }}
            >
              {/* Letter Title */}
              <h2 className="text-center text-[16px] font-poppins font-bold text-navy mb-8 underline">
                {title}
              </h2>

              {/* Letter Body */}
              <div className="text-[13px] font-dm-sans text-gray-800 leading-relaxed whitespace-pre-line">
                {highlightEmptyFields(body)}
              </div>

              {/* Signature Space (for perusahaan template) */}
              {template === 'perusahaan' && (
                <div className="mt-12 text-right">
                  <div className="inline-block text-left">
                    <div className="text-[13px] font-dm-sans text-gray-800">
                      {formData.signerName ? (
                        <span>{formData.signerName}</span>
                      ) : (
                        <span className="bg-warning-amber/20 text-warning-amber px-1 rounded">
                          [Nama Penandatangan]
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] font-dm-sans text-gray-800 mt-1">
                      {formData.signerPosition ? (
                        <span>{formData.signerPosition}</span>
                      ) : (
                        <span className="bg-warning-amber/20 text-warning-amber px-1 rounded">
                          [Jabatan]
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Signature Space (for keluarga and pribadi) */}
              {template !== 'perusahaan' && (
                <div className="mt-12 text-right">
                  <div className="inline-block text-left">
                    <div className="text-[13px] font-dm-sans text-gray-800 mb-16">
                      {language === 'id' ? 'Hormat saya,' : 'Sincerely,'}
                    </div>
                    <div className="text-[13px] font-dm-sans text-gray-800">
                      {template === 'keluarga' ? (
                        formData.sponsorName ? (
                          <span>{formData.sponsorName}</span>
                        ) : (
                          <span className="bg-warning-amber/20 text-warning-amber px-1 rounded">
                            [Nama Sponsor]
                          </span>
                        )
                      ) : formData.applicantName ? (
                        <span>{formData.applicantName}</span>
                      ) : (
                        <span className="bg-warning-amber/20 text-warning-amber px-1 rounded">
                          [Nama Lengkap]
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty Fields Notice */}
        <div className="px-4 py-3 bg-orange-50 border-t border-orange-100">
          <p className="text-[12px] font-dm-sans text-gray-600 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-warning-amber/20 rounded" />
            Field yang masih kosong akan ditandai dengan warna kuning
          </p>
        </div>
      </div>
    </div>
  );
}

export const LetterPreview = memo(LetterPreviewComponent);
