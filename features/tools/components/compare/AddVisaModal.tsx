'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/features/tools/components/shared/Modal';
import { VisaData } from '@/features/tools/lib/compare/types';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface AddVisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVisa: (visaId: string) => void;
  excludeIds: string[];
  availableVisas: VisaData[];
  selectedCount?: number;
}

export function AddVisaModal({
  isOpen,
  onClose,
  onSelectVisa,
  excludeIds,
  availableVisas,
  selectedCount = 0,
}: AddVisaModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter visas based on debounced search query and exclude already selected
  const filteredVisas = availableVisas
    .filter(
      (visa) =>
        !excludeIds.includes(visa.id) &&
        visa.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by price (extract number from price string)
      const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
      const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
      return priceA - priceB;
    });

  const handleSelect = (visaId: string) => {
    onSelectVisa(visaId);
    setSearchQuery('');
    // Don't close modal, let user continue selecting
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[480px] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between pr-12">
          <div className="flex-1">
            <h3 className="text-[18px] font-poppins font-semibold text-navy leading-tight">
              Pilih Visa untuk Dibandingkan
            </h3>
          </div>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 ml-4 flex-shrink-0">
              <div className="w-2 h-2 bg-orange rounded-full"></div>
              <span className="text-xs font-dm-sans font-medium text-orange whitespace-nowrap">
                {selectedCount} terpilih
              </span>
            </div>
          )}
        </div>

        {/* Selected Visas Section */}
        {excludeIds.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-poppins font-semibold text-navy">
                Visa Terpilih ({excludeIds.length})
              </h4>
            </div>
            
            <div className="space-y-2">
              {availableVisas
                .filter(visa => excludeIds.includes(visa.id))
                .map((visa, index) => (
                  <div key={visa.id} className="flex items-center gap-3 bg-white rounded-lg p-2">
                    <span className="text-lg">{visa.flag}</span>
                    <div className="flex-1">
                      <p className="text-xs font-dm-sans font-medium text-navy">{visa.name}</p>
                      <p className="text-xs font-dm-sans text-gray-500">{visa.price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-dm-sans text-green-600 font-medium">#{index + 1}</span>
                    </div>
                  </div>
                ))}
            </div>
            
            {excludeIds.length >= 2 && (
              <p className="text-xs font-dm-sans text-gray-600 text-center">
                Kamu sudah bisa compare atau tambah 1 visa lagi
              </p>
            )}
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama negara atau visa..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-[15px] focus:border-orange focus:ring-4 focus:ring-orange/15 outline-none transition-all"
          />
        </div>

        {/* Results */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="max-h-[400px] overflow-y-auto space-y-2"
        >
          {filteredVisas.length > 0 ? (
            filteredVisas.map((visa) => (
              <motion.div
                key={visa.id}
                variants={{
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-[24px]">{visa.flag}</span>
                  <div className="flex-1">
                    <p className="text-[14px] font-dm-sans font-medium text-navy">
                      {visa.name}
                    </p>
                    <p className="text-[13px] font-dm-sans text-gray-500">{visa.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSelect(visa.id)}
                  className="bg-orange text-white font-poppins font-semibold text-[13px] py-2 px-4 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] active:scale-[0.97] transition-all duration-200"
                >
                  {excludeIds.length === 0 ? 'Pilih' : 
                   excludeIds.length === 1 ? 'Bandingkan' : 
                   'Tambah'}
                </button>
              </motion.div>
            ))
          ) : (
            // Empty State
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <DocumentMagnifyingGlassIcon className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-[14px] font-dm-sans text-gray-500">Visa tidak ditemukan</p>
              <p className="text-[13px] font-dm-sans text-gray-400 mt-1">
                Coba kata kunci lain
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Modal>
  );
}
