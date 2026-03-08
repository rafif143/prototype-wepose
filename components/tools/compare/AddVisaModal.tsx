'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/tools/shared/Modal';
import { VisaData } from '@/lib/tools/compare/types';
import { useDebounce } from '@/hooks/useDebounce';

interface AddVisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVisa: (visaId: string) => void;
  excludeIds: string[];
  availableVisas: VisaData[];
}

export function AddVisaModal({
  isOpen,
  onClose,
  onSelectVisa,
  excludeIds,
  availableVisas,
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
  const filteredVisas = availableVisas.filter(
    (visa) =>
      !excludeIds.includes(visa.id) &&
      visa.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleSelect = (visaId: string) => {
    onSelectVisa(visaId);
    onClose();
    setSearchQuery('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[480px] p-6">
      <div className="space-y-4">
        {/* Header */}
        <h3 className="text-[18px] font-poppins font-semibold text-navy pr-8">Cari Visa</h3>

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
        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {filteredVisas.length > 0 ? (
            filteredVisas.map((visa) => (
              <div
                key={visa.id}
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
                  Pilih
                </button>
              </div>
            ))
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <DocumentMagnifyingGlassIcon className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-[14px] font-dm-sans text-gray-500">Visa tidak ditemukan</p>
              <p className="text-[13px] font-dm-sans text-gray-400 mt-1">
                Coba kata kunci lain
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
