"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, ClockIcon, CalendarDaysIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import type { VisaData } from "@/lib/visa-data";

interface OrderSummaryProps {
  visa: VisaData;
}

export function OrderSummary({ visa }: OrderSummaryProps) {
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

  const toggleAddon = (addonId: number) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = visa.addons.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    return visa.priceBase + addonsTotal;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="hidden lg:block sticky top-32">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{visa.flag}</span>
          <h3 className="font-poppins font-semibold text-base text-navy">{visa.name}</h3>
        </div>

        {/* Base Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="font-poppins font-bold text-2xl text-orange">{visa.priceDisplay}</span>
            <span className="font-dm-sans text-sm text-gray-400">/orang</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        {/* Estimasi */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm font-dm-sans text-gray-500">
            <ClockIcon className="w-4 h-4" />
            <span>{visa.processDays}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-dm-sans text-gray-500">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>{visa.stayDuration} tinggal</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        {/* Add-ons */}
        <div className="mb-4">
          <h4 className="font-poppins font-semibold text-sm text-navy mb-3">Layanan Tambahan</h4>
          <div className="space-y-2">
            {visa.addons.slice(0, 3).map((addon) => (
              <label
                key={addon.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                  className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange focus:ring-offset-0"
                />
                <span className="flex-1 font-dm-sans text-sm text-gray-700 group-hover:text-navy transition-colors">
                  {addon.name}
                </span>
                <span className="font-dm-sans text-sm text-gray-500">
                  +{formatPrice(addon.price)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        {/* Total */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="font-poppins font-bold text-lg text-navy">Total:</span>
            <motion.span
              key={calculateTotal()}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-poppins font-bold text-lg text-navy"
            >
              {formatPrice(calculateTotal())}
            </motion.span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-all duration-200 hover:shadow-cta-hover hover:-translate-y-0.5">
          <span>Mulai Apply</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Trust Signal */}
        <p className="flex items-center justify-center gap-1.5 text-center text-xs font-dm-sans text-gray-400 mt-4">
          <LockClosedIcon className="w-3.5 h-3.5" />
          <span>Pembayaran aman · SSL Encrypted</span>
        </p>
      </div>
    </div>
  );
}
