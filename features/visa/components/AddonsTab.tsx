"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentTextIcon, BuildingOffice2Icon, StarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type { VisaData } from "@/features/visa/lib/data";

interface AddonsTabProps {
  visa: VisaData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DocumentTextIcon,
  BuildingOffice2Icon,
  StarIcon,
  ShieldCheckIcon,
};

export function AddonsTab({ visa }: AddonsTabProps) {
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

  const toggleAddon = (addonId: number) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeColor = (badge?: string) => {
    if (badge === 'WAJIB SCHENGEN') return 'bg-red-100 text-red-700 border-red-200';
    if (badge === 'POPULER') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div id="addons" className="space-y-6">
      <div>
        <h3 className="font-poppins font-semibold text-2xl text-navy mb-2">Lengkapi Perjalananmu</h3>
        <p className="font-dm-sans text-base text-gray-500 mb-8">
          Layanan tambahan untuk memperkuat aplikasi visa kamu
        </p>
      </div>

      {/* Grid Add-ons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visa.addons.map((addon) => {
          const Icon = iconMap[addon.icon] || DocumentTextIcon;
          const isSelected = selectedAddons.includes(addon.id);
          
          return (
            <motion.div
              key={addon.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-orange" />
                </div>
                {addon.badge && (
                  <span className={`px-3 py-1 text-xs font-poppins font-semibold rounded-full border ${getBadgeColor(addon.badge)}`}>
                    {addon.badge}
                  </span>
                )}
              </div>

              {/* Name */}
              <h4 className="font-poppins font-semibold text-lg text-navy mb-2">{addon.name}</h4>

              {/* Description */}
              <p className="font-dm-sans text-sm text-gray-600 mb-4 line-clamp-2">{addon.description}</p>

              {/* Price */}
              <p className="font-poppins font-semibold text-base text-orange mb-4">
                Mulai dari {formatPrice(addon.price)}
              </p>

              {/* Button */}
              <AnimatePresence mode="wait">
                {isSelected ? (
                  <motion.button
                    key="added"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => toggleAddon(addon.id)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-green-500 text-white font-poppins font-semibold rounded-full transition-colors"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Ditambahkan</span>
                  </motion.button>
                ) : (
                  <motion.button
                    key="add"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => toggleAddon(addon.id)}
                    className="w-full px-6 py-2.5 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-colors"
                  >
                    + Tambah ke Order
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Bottom Bar (if addons selected) */}
      <AnimatePresence>
        {selectedAddons.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4"
          >
            <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-poppins font-semibold text-base text-navy">
                  {selectedAddons.length} add-on dipilih
                </span>
                <span className="text-gray-400">·</span>
                <span className="font-poppins font-semibold text-base text-orange">
                  Total tambahan: {formatPrice(
                    selectedAddons.reduce((sum, id) => {
                      const addon = visa.addons.find(a => a.id === id);
                      return sum + (addon?.price || 0);
                    }, 0)
                  )}
                </span>
              </div>
              <button className="px-8 py-3 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-colors whitespace-nowrap">
                Lanjut ke Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
