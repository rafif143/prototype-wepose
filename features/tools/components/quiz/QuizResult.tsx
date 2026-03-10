'use client';

import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { VisaRecommendation } from '@/features/tools/lib/quiz/recommendation';
import { staggerChildren, staggerItem } from '@/shared/utils/animations';

interface QuizResultProps {
  recommendation: VisaRecommendation;
  onRestart: () => void;
  onApply: () => void;
  onSave: () => void;
}

export function QuizResult({
  recommendation,
  onRestart,
  onApply,
  onSave,
}: QuizResultProps) {
  const { visaName, country, flag, approvalLevel, approvalPercentage, tips, requiredDocuments } =
    recommendation;

  // Determine meter color based on approval level
  const meterColor =
    approvalLevel === 'TINGGI'
      ? 'from-success-green to-success-green'
      : approvalLevel === 'SEDANG'
      ? 'from-warning-amber to-warning-amber'
      : 'from-error-red to-error-red';

  const badgeColor =
    approvalLevel === 'TINGGI'
      ? 'bg-success-green/10 text-success-green border-success-green/20'
      : approvalLevel === 'SEDANG'
      ? 'bg-warning-amber/10 text-warning-amber border-warning-amber/20'
      : 'bg-error-red/10 text-error-red border-error-red/20';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-16 py-16 px-6">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="max-w-3xl mx-auto space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orange to-orange-dark rounded-full flex items-center justify-center">
              <IdentificationIcon className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <p className="text-sm font-dm-sans text-orange uppercase tracking-wide mb-3 font-medium">
            Rekomendasi untuk Kamu
          </p>
          <h2 className="text-4xl font-poppins font-bold text-navy mb-3">{visaName}</h2>
          <p className="text-xl font-dm-sans text-gray-600">
            {flag} {country} · Tourist Visa
          </p>
        </motion.div>

        {/* Approval Meter */}
        <motion.div
          variants={staggerItem}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
        >
          <p className="text-sm font-dm-sans text-gray-500 mb-4 font-medium">Peluang Approval</p>
          <div className="relative">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${meterColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${approvalPercentage}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-poppins font-bold text-navy">{approvalPercentage}%</span>
              <span className={`px-4 py-2 rounded-full text-sm font-poppins font-bold border ${badgeColor}`}>
                {approvalLevel}
              </span>
            </div>
          </div>
          <p className="text-sm font-dm-sans text-gray-500 mt-4">
            Berdasarkan profil dan dokumen yang kamu miliki
          </p>
        </motion.div>

        {/* Tips */}
        <motion.div
          variants={staggerItem}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <LightBulbIcon className="w-6 h-6 text-orange" />
            </div>
            <h3 className="text-xl font-poppins font-bold text-navy">Tips untuk Kamu</h3>
          </div>
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <ChevronRightIcon className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                <p className="text-base font-dm-sans text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Required Documents */}
        <motion.div
          variants={staggerItem}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-orange" />
            </div>
            <h3 className="text-xl font-poppins font-bold text-navy">
              Dokumen yang Kamu Butuhkan
            </h3>
          </div>
          <div className="space-y-3">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                <p className="text-base font-dm-sans text-gray-700">{doc}</p>
              </div>
            ))}
          </div>
          <button className="text-base font-dm-sans text-orange hover:text-orange-dark transition-colors mt-4 font-medium">
            Lihat daftar lengkap →
          </button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={staggerItem} className="space-y-4">
          <button
            onClick={onApply}
            className="w-full bg-gradient-to-r from-orange to-orange-dark text-white font-poppins font-bold text-lg py-4 px-8 rounded-2xl hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-1 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span>Apply Visa {country} Sekarang</span>
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onSave}
            className="w-full border-2 border-navy text-navy font-poppins font-bold text-lg py-4 px-8 rounded-2xl hover:bg-navy hover:text-white active:scale-[0.97] transition-all duration-200"
          >
            Simpan Hasil ke Akun
          </button>
        </motion.div>

        {/* Restart Button */}
        <motion.div variants={staggerItem} className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-sm font-dm-sans text-gray-500 hover:text-navy transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span>Ulangi Quiz</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
