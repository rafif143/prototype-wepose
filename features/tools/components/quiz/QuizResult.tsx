'use client';

import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { VisaRecommendation } from '@/lib/tools/quiz/recommendation';
import { staggerChildren, staggerItem } from '@/utils/animations';

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
      ? 'from-green-500 to-green-600'
      : approvalLevel === 'SEDANG'
      ? 'from-amber-500 to-amber-600'
      : 'from-red-500 to-red-600';

  const badgeColor =
    approvalLevel === 'TINGGI'
      ? 'bg-green-100 text-green-700'
      : approvalLevel === 'SEDANG'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-mid to-navy py-16 px-6">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="text-[64px] mb-4"
          >
            🛂
          </motion.div>
          <p className="text-[13px] font-dm-sans text-orange uppercase tracking-wide mb-2">
            Rekomendasi untuk Kamu
          </p>
          <h2 className="text-[32px] font-poppins font-bold text-white mb-2">{visaName}</h2>
          <p className="text-[16px] font-dm-sans text-white/70">
            {flag} {country} · Tourist Visa
          </p>
        </motion.div>

        {/* Approval Meter */}
        <motion.div
          variants={staggerItem}
          className="bg-white/10 border border-white/15 rounded-2xl p-5"
        >
          <p className="text-[13px] font-dm-sans text-white/60 mb-3">Peluang Approval</p>
          <div className="relative">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${meterColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${approvalPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
            <div className="flex justify-end mt-2">
              <span className={`px-3 py-1 rounded-full text-[14px] font-poppins font-bold ${badgeColor}`}>
                {approvalLevel}
              </span>
            </div>
          </div>
          <p className="text-[12px] font-dm-sans text-white/50 mt-3">
            Berdasarkan profil dan dokumen yang kamu miliki
          </p>
        </motion.div>

        {/* Tips */}
        <motion.div
          variants={staggerItem}
          className="bg-white/8 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <LightBulbIcon className="w-5 h-5 text-orange" />
            <h3 className="text-[16px] font-poppins font-semibold text-white">Tips untuk Kamu</h3>
          </div>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <ChevronRightIcon className="w-3.5 h-3.5 text-orange flex-shrink-0 mt-0.5" />
                <p className="text-[14px] font-dm-sans text-white/80">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Required Documents */}
        <motion.div
          variants={staggerItem}
          className="bg-white/8 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <DocumentTextIcon className="w-5 h-5 text-orange" />
            <h3 className="text-[16px] font-poppins font-semibold text-white">
              Dokumen yang Kamu Butuhkan
            </h3>
          </div>
          <div className="space-y-2">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-white/40 flex-shrink-0 mt-0.5" />
                <p className="text-[14px] font-dm-sans text-white/80">{doc}</p>
              </div>
            ))}
          </div>
          <button className="text-[14px] font-dm-sans text-orange underline mt-3 hover:text-orange-dark transition-colors">
            Lihat daftar lengkap →
          </button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={staggerItem} className="space-y-3">
          <button
            onClick={onApply}
            className="w-full bg-orange text-white font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Apply Visa {country} Sekarang</span>
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onSave}
            className="w-full border-2 border-white text-white font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:bg-white/10 active:scale-[0.97] transition-all duration-200"
          >
            Simpan Hasil ke Akun
          </button>
        </motion.div>

        {/* Restart Button */}
        <motion.div variants={staggerItem} className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-[13px] font-dm-sans text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span>Ulangi Quiz</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
