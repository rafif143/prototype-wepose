'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CompareTable } from '@/features/tools/components/compare/CompareTable';
import { AddVisaModal } from '@/features/tools/components/compare/AddVisaModal';
import { RecommendBanner } from '@/features/tools/components/compare/RecommendBanner';
import { useCompareState } from '@/features/tools/hooks/useCompareState';
import { sampleVisaData, VisaData } from '@/features/tools/lib/compare/types';

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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-navy-mid py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[32px] font-poppins font-bold text-white mb-2">Bandingkan Visa</h1>
          <p className="text-[16px] font-dm-sans text-gray-300">
            Pilih 2–3 visa untuk melihat perbandingan detail
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Add Visa Cards (if slots available) */}
        {visasToCompare.length < 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visasToCompare.map((visa) => (
              <div key={visa.id} className="h-20" /> // Placeholder for existing visas
            ))}
            {Array.from({ length: 3 - visasToCompare.length }).map((_, index) => (
              <button
                key={`empty-${index}`}
                onClick={openAddModal}
                className="h-20 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center gap-2 hover:border-orange/40 hover:bg-orange/5 transition-all duration-200"
              >
                <PlusCircleIcon className="w-6 h-6 text-white/40" />
                <span className="text-[14px] font-dm-sans text-white/40">Tambah Visa</span>
              </button>
            ))}
          </div>
        )}

        {/* Comparison Table */}
        {visasToCompare.length >= 2 ? (
          <>
            <CompareTable
              visas={visasToCompare}
              onRemoveVisa={handleRemoveVisa}
              onApplyVisa={handleApplyVisa}
            />

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
          </>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <p className="text-[16px] font-dm-sans text-gray-500 mb-4">
              Pilih minimal 2 visa untuk mulai membandingkan
            </p>
            <button
              onClick={openAddModal}
              className="bg-orange text-white font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              Tambah Visa
            </button>
          </div>
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
  );
}
