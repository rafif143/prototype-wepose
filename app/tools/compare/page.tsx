'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CompareTable } from '@/features/tools/components/compare/CompareTable';
import { AddVisaModal } from '@/features/tools/components/compare/AddVisaModal';
import { RecommendBanner } from '@/features/tools/components/compare/RecommendBanner';
import { useCompareState } from '@/features/tools/hooks/useCompareState';
import { sampleVisaData, VisaData } from '@/features/tools/lib/compare/types';
import Navbar from '@/shared/layout/Navbar';
import { motion } from 'framer-motion';

export default function ComparePage() {
  const router = useRouter();
  const { selectedVisas, showAddModal, addVisa, removeVisa, openAddModal, closeAddModal } =
    useCompareState();

  // For demo: assume user is logged in
  const [isLoggedIn] = useState(true);

  // Get visa data for selected visas
  const visasToCompare = sampleVisaData.filter((visa) => selectedVisas.includes(visa.id));

  const handleRemoveVisa = (visaId: string) => {
    removeVisa(visaId);
  };

  const handleApplyVisa = (visaId: string) => {
    console.log('Apply visa:', visaId);
    router.push('/');
  };

  const handleSelectVisa = (visaId: string) => {
    addVisa(visaId);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-16">
        {/* Background Pattern */}
        <div
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Header Section */}
        <div className="relative z-10 py-6 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <nav className="flex items-center justify-center gap-2 text-sm font-dm-sans">
                <a href="/" className="text-gray-500 hover:text-orange transition-colors">
                  Home
                </a>
                <span className="text-gray-300">›</span>
                <a href="/tools" className="text-gray-500 hover:text-orange transition-colors">
                  Tools
                </a>
                <span className="text-gray-300">›</span>
                <span className="text-navy font-medium">Bandingkan Visa</span>
              </nav>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange to-orange-dark rounded-2xl flex items-center justify-center shadow-xl shadow-orange/25">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl md:text-4xl font-poppins font-black text-navy mb-3 leading-tight"
              >
                Bandingkan
                <br />
                <span className="bg-gradient-to-r from-orange via-orange-dark to-orange bg-clip-text text-transparent">
                  Visa Terbaik
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-dm-sans"
              >
                Pilih 2-3 visa untuk melihat perbandingan detail harga, waktu proses, dan persyaratan
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
          {visasToCompare.length >= 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Comparison Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <CompareTable
                  visas={visasToCompare}
                  onRemoveVisa={handleRemoveVisa}
                  onApplyVisa={handleApplyVisa}
                />
              </div>

              {/* Add More Visa Button */}
              {visasToCompare.length < 3 && (
                <div className="text-center">
                  <button
                    onClick={openAddModal}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-navy font-poppins font-semibold hover:border-orange hover:bg-orange-50 transition-all duration-200"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    Tambah Visa Lain
                  </button>
                </div>
              )}

              {/* Recommendation Banner (only if logged in) */}
              {isLoggedIn && (
                <RecommendBanner
                  recommendedVisa={{
                    name: 'Japan Tourist',
                    flag: '🇯🇵',
                    reason: 'Proses tercepat & paling sesuai dengan profil karyawan kamu',
                  }}
                  onApply={() => handleApplyVisa('japan-tourist')}
                />
              )}
            </motion.div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-12 max-w-2xl mx-auto">
                {/* Empty State Icon */}
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-poppins font-bold text-navy mb-3">
                  Mulai Membandingkan Visa
                </h3>
                <p className="text-gray-600 font-dm-sans mb-8 leading-relaxed">
                  Pilih minimal 2 visa untuk melihat perbandingan detail harga, waktu proses, dan persyaratan dokumen
                </p>
                <button
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-orange to-orange-dark text-white font-poppins font-bold text-lg py-4 px-8 rounded-2xl hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-1 transition-all duration-200 flex items-center gap-3 mx-auto"
                >
                  <PlusCircleIcon className="w-6 h-6" />
                  Pilih Visa Pertama
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Add Visa Modal */}
        <AddVisaModal
          isOpen={showAddModal}
          onClose={closeAddModal}
          onSelectVisa={handleSelectVisa}
          excludeIds={selectedVisas}
          availableVisas={sampleVisaData}
        />
      </div>
    </>
  );
}
