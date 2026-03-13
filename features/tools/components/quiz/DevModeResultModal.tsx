'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  SparklesIcon,
  GlobeAltIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface DevModeResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DevModeResultModal({ isOpen, onClose }: DevModeResultModalProps) {
  // Mock recommendation data for dev mode
  const mockRecommendation = {
    visaName: "Japan Tourist Visa",
    country: "Jepang",
    flag: "🇯🇵",
    approvalLevel: "TINGGI",
    approvalPercentage: 92,
    processDays: "5-7 hari kerja",
    price: "Rp 650.000",
    tips: [
      "Pastikan paspor berlaku minimal 6 bulan",
      "Siapkan rekening koran dengan saldo minimal Rp 15 juta",
      "Buat itinerary perjalanan yang detail",
      "Booking hotel terlebih dahulu untuk bukti akomodasi"
    ],
    requiredDocuments: [
      "Paspor asli (berlaku min. 6 bulan)",
      "Foto 4x6 background putih (2 lembar)",
      "KTP asli dan fotokopi",
      "Rekening koran 3 bulan terakhir",
      "Slip gaji 3 bulan terakhir",
      "Surat keterangan kerja",
      "Tiket pesawat PP",
      "Booking hotel",
      "Itinerary perjalanan"
    ]
  };

  const meterColor = 'from-green-500 to-green-600';
  const badgeColor = 'bg-green-100 text-green-700 border-green-200';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-orange to-orange-dark p-6 text-white flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-dm-sans font-medium">
                      DEV MODE RESULT
                    </span>
                  </div>
                  <h2 className="text-2xl font-poppins font-bold">Rekomendasi Quiz</h2>
                  <p className="text-white/80 font-dm-sans">Hasil simulasi berdasarkan profil ideal</p>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6 pb-6">
                {/* Visa Recommendation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6"
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{mockRecommendation.flag}</div>
                    <h3 className="text-2xl font-poppins font-bold text-navy mb-2">
                      {mockRecommendation.visaName}
                    </h3>
                    <p className="text-gray-600 font-dm-sans">{mockRecommendation.country} Tourist Visa</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                      <CheckCircleIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-poppins font-bold text-navy">{mockRecommendation.approvalPercentage}%</div>
                      <div className="text-xs font-dm-sans text-gray-500">Approval Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                      <ClockIcon className="w-8 h-8 text-orange mx-auto mb-2" />
                      <div className="text-sm font-poppins font-bold text-navy">{mockRecommendation.processDays}</div>
                      <div className="text-xs font-dm-sans text-gray-500">Processing</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                      <CurrencyDollarIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-sm font-poppins font-bold text-navy">{mockRecommendation.price}</div>
                      <div className="text-xs font-dm-sans text-gray-500">Price</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                      <StarIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-sm font-poppins font-bold text-navy">{mockRecommendation.approvalLevel}</div>
                      <div className="text-xs font-dm-sans text-gray-500">Level</div>
                    </div>
                  </div>

                  {/* Approval Meter */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-dm-sans text-gray-600">Peluang Approval</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-bold border ${badgeColor}`}>
                        {mockRecommendation.approvalLevel}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${meterColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${mockRecommendation.approvalPercentage}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Tips Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-orange" />
                    </div>
                    <h4 className="text-lg font-poppins font-bold text-navy">Tips untuk Kamu</h4>
                  </div>
                  <div className="space-y-3">
                    {mockRecommendation.tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-orange rounded-full" />
                        </div>
                        <p className="text-sm font-dm-sans text-gray-700">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Documents Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-poppins font-bold text-navy">Dokumen yang Dibutuhkan</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockRecommendation.requiredDocuments.map((doc, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-dm-sans text-gray-700">{doc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="flex-1 bg-gradient-to-r from-orange to-orange-dark text-white font-poppins font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                    <GlobeAltIcon className="w-5 h-5" />
                    Apply Visa Jepang
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 border-2 border-navy text-navy font-poppins font-bold py-4 px-6 rounded-xl hover:bg-navy hover:text-white transition-all duration-200"
                  >
                    Tutup Preview
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}