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
import { VisaData, comparisonCriteria } from '@/features/tools/lib/compare/types';
import { calculateHighlights } from '@/features/tools/lib/compare/highlighting';

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
        <thead>
          <tr>
            {/* Criteria Column Header */}
            <th className="bg-gradient-to-r from-orange-50 to-orange-100/50 w-[200px] md:w-[200px] sm:w-[140px] p-6 text-left border-b border-gray-200">
              <span className="text-sm font-poppins font-semibold text-navy">
                Kriteria Perbandingan
              </span>
            </th>

            {/* Visa Column Headers */}
            {visas.map((visa) => (
              <th
                key={visa.id}
                className="bg-gradient-to-br from-white to-gray-50 p-6 min-w-[200px] border-b border-gray-200"
              >
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={() => onRemoveVisa(visa.id)}
                    className="self-end w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all duration-200 flex items-center justify-center"
                    aria-label={`Remove ${visa.name}`}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    {visa.flag}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-poppins font-bold text-navy mb-1">
                      {visa.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-dm-sans">{visa.price}</p>
                  </div>
                  <button
                    onClick={() => onApplyVisa(visa.id)}
                    className="w-full bg-gradient-to-r from-orange to-orange-dark text-white font-poppins font-semibold text-sm py-3 px-4 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Apply Sekarang →
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
              <tr key={criterion.key} className={isEvenRow ? 'bg-white' : 'bg-gray-50/50'}>
                {/* Criteria Label */}
                <td className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-orange" />
                      </div>
                    )}
                    <span className="text-sm font-dm-sans font-medium text-navy">
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
                      className={`p-6 text-center relative border-b border-gray-100 ${
                        isBest
                          ? 'bg-success-green/10 border-success-green/20'
                          : isWorst
                          ? 'bg-error-red/10 border-error-red/20'
                          : ''
                      }`}
                    >
                      <span className="text-sm font-dm-sans font-medium text-navy">{value}</span>
                      {isBest && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-success-green rounded-full flex items-center justify-center">
                          <StarIcon className="w-3 h-3 text-white" />
                        </div>
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
