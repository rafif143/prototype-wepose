'use client';

import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import {
  BanknotesIcon,
  CalendarDaysIcon,
  ClockIcon,
  BoltIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  DocumentArrowDownIcon,
  UserGroupIcon,
  XMarkIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { VisaData, comparisonCriteria } from '@/lib/tools/compare/types';
import { calculateHighlights } from '@/lib/tools/compare/highlighting';

interface CompareTableProps {
  visas: VisaData[];
  onRemoveVisa: (visaId: string) => void;
  onApplyVisa: (visaId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BanknotesIcon,
  CalendarDaysIcon,
  ClockIcon,
  BoltIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  DocumentArrowDownIcon,
  UserGroupIcon,
};

export function CompareTableComponent({ visas, onRemoveVisa, onApplyVisa }: CompareTableProps) {
  const highlights = useMemo(() => {
    return {
      price: calculateHighlights(visas, 'price'),
      processTime: calculateHighlights(visas, 'processTime'),
    };
  }, [visas]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header Row */}
        <thead className="sticky top-16 z-10">
          <tr>
            {/* Criteria Column Header */}
            <th className="bg-gray-50 w-[200px] md:w-[200px] sm:w-[140px] p-4 text-left">
              <span className="text-[13px] font-dm-sans font-medium text-gray-500">
                Kriteria
              </span>
            </th>

            {/* Visa Column Headers */}
            {visas.map((visa) => (
              <th
                key={visa.id}
                className="bg-gradient-to-b from-navy-mid to-white p-4 min-w-[200px]"
              >
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => onRemoveVisa(visa.id)}
                    className="self-end text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={`Remove ${visa.name}`}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <span className="text-[32px]">{visa.flag}</span>
                  <span className="text-[15px] font-poppins font-semibold text-navy text-center">
                    {visa.name}
                  </span>
                  <button
                    onClick={() => onApplyVisa(visa.id)}
                    className="w-full bg-orange text-white font-poppins font-semibold text-[13px] py-2 px-4 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] active:scale-[0.97] transition-all duration-200"
                  >
                    Apply Visa Ini →
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Comparison Rows */}
        <tbody>
          {comparisonCriteria.map((criterion, rowIndex) => {
            const Icon = iconMap[criterion.icon];
            const isEvenRow = rowIndex % 2 === 0;
            const rowHighlights =
              criterion.key === 'price'
                ? highlights.price
                : criterion.key === 'processTime'
                ? highlights.processTime
                : { bestIndices: [], worstIndices: [] };

            return (
              <tr key={criterion.key} className={isEvenRow ? 'bg-white' : 'bg-gray-50'}>
                {/* Criteria Label */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 text-gray-400" />}
                    <span className="text-[13px] font-dm-sans text-gray-500">
                      {criterion.label}
                    </span>
                  </div>
                </td>

                {/* Visa Values */}
                {visas.map((visa, colIndex) => {
                  const value = visa[criterion.key];
                  const isBest = rowHighlights.bestIndices.includes(colIndex);
                  const isWorst = rowHighlights.worstIndices.includes(colIndex);

                  return (
                    <motion.td
                      key={`${visa.id}-${criterion.key}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`p-4 text-center relative ${
                        isBest
                          ? 'bg-[#DCFCE7]'
                          : isWorst
                          ? 'bg-[#FEE2E2]'
                          : ''
                      }`}
                    >
                      <span className="text-[14px] font-dm-sans text-navy">{value}</span>
                      {isBest && (
                        <StarIcon className="w-3 h-3 text-success-green absolute top-2 right-2" />
                      )}
                    </motion.td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const CompareTable = memo(CompareTableComponent);
