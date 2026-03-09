'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { TemplateType, Language, SponsorFormData } from '@/features/tools/lib/sponsor-letter/types';
import { templates } from '@/features/tools/lib/sponsor-letter/types';
import { downloadPDF } from '@/features/tools/lib/sponsor-letter/pdf-generator';

interface GenerateStepProps {
  template: TemplateType;
  language: Language;
  formData: SponsorFormData;
  isGenerating: boolean;
  pdfUrl: string | null;
  error?: string | null;
  onGenerate: () => void;
  onRetry?: () => void;
  onBack: () => void;
  onReset: () => void;
}

export function GenerateStep({
  template,
  language,
  formData,
  isGenerating,
  pdfUrl,
  error,
  onGenerate,
  onRetry,
  onBack,
  onReset,
}: GenerateStepProps) {
  const templateConfig = templates.find((t) => t.id === template);

  // Error State
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-6 py-12"
      >
        <div className="bg-white rounded-card border border-error-red shadow-card p-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-error-red/10 rounded-full flex items-center justify-center">
              <XMarkIcon className="w-8 h-8 text-error-red" />
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-h2 text-navy mb-2">Terjadi Kesalahan</h2>
          <p className="text-body text-gray-500 mb-8">{error}</p>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-button border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200"
            >
              ← Kembali
            </button>
            <button
              onClick={onRetry || onGenerate}
              className="px-6 py-3 rounded-button bg-orange text-white font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Before Generate State
  if (!isGenerating && !pdfUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-6 py-12"
      >
        <div className="bg-white rounded-card border border-gray-200 shadow-card p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
              <DocumentTextIcon className="w-8 h-8 text-orange" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-h2 text-navy text-center mb-2">
            Siap Generate Surat Sponsor?
          </h2>
          <p className="text-body text-gray-500 text-center mb-8">
            Pastikan semua data sudah benar sebelum generate PDF
          </p>

          {/* Summary Box */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-500">Template:</span>
              <span className="font-dm-sans font-medium text-navy">
                {templateConfig?.icon} {templateConfig?.name}
              </span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-500">Bahasa:</span>
              <span className="font-dm-sans font-medium text-navy">
                {language === 'id' ? '🇮🇩 Indonesia' : '🇬🇧 English'}
              </span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-500">Pemohon:</span>
              <span className="font-dm-sans font-medium text-navy">
                {formData.applicantName || '-'}
              </span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-500">Tujuan:</span>
              <span className="font-dm-sans font-medium text-navy">
                {formData.destinationCity || '-'}, {formData.destinationCountry || '-'}
              </span>
            </div>
          </div>

          {/* Trust Note */}
          <div className="bg-success-green/10 border border-success-green/20 rounded-lg p-4 mb-6">
            <p className="text-[13px] font-dm-sans text-gray-700 text-center">
              🔒 Data Anda aman dan tidak akan disimpan di server kami
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 rounded-button border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200"
            >
              ← Kembali & Edit
            </button>
            <button
              onClick={onGenerate}
              className="flex-1 px-6 py-3 rounded-button bg-orange text-white font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200"
            >
              Generate PDF →
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Loading State
  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto px-6 py-12"
      >
        <div className="bg-white rounded-card border border-gray-200 shadow-card p-12 text-center">
          {/* Bouncing Document Icon */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
              <DocumentTextIcon className="w-10 h-10 text-orange" />
            </div>
          </motion.div>

          {/* Loading Text */}
          <h2 className="text-h2 text-navy mb-2">Sedang Generate PDF...</h2>
          <p className="text-body text-gray-500 mb-8">
            Mohon tunggu sebentar, kami sedang membuat surat sponsor Anda
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Success State
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto px-6 py-12"
    >
      <div className="bg-white rounded-card border border-gray-200 shadow-card p-8">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-12 h-12 text-success-green" />
          </div>
        </motion.div>

        {/* Success Message */}
        <h2 className="text-h2 text-navy text-center mb-2">
          Surat Sponsor Berhasil Dibuat! 🎉
        </h2>
        <p className="text-body text-gray-500 text-center mb-8">
          PDF surat sponsor Anda sudah siap untuk diunduh
        </p>

        {/* PDF Preview */}
        <div className="relative mb-8 rounded-lg overflow-hidden border border-gray-200">
          <div className="aspect-[0.707] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <DocumentTextIcon className="w-24 h-24 text-gray-300" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
            <div className="text-white">
              <p className="text-[14px] font-dm-sans font-medium">
                {templateConfig?.name}
              </p>
              <p className="text-[12px] text-white/80">
                {language === 'id' ? 'Bahasa Indonesia' : 'English'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button 
            onClick={() => pdfUrl && downloadPDF(pdfUrl, `surat-sponsor-${template}.pdf`)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-button bg-orange text-white font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200">
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-button border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200">
            <BookmarkIcon className="w-5 h-5" />
            Simpan ke Vault
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-button border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200">
            <ShareIcon className="w-5 h-5" />
            Share WhatsApp
          </button>
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-button border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Generate Lagi
          </button>
        </div>
      </div>
    </motion.div>
  );
}
