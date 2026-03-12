"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MinusIcon, PlusIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import type { VisaData } from "@/features/visa/lib/data";

interface PricingTabProps {
  visa: VisaData;
}

export function PricingTab({ visa }: PricingTabProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

  const priceBreakdown = [
    { label: "Biaya Visa (Embassy Fee)", amount: 850000 },
    { label: "Biaya Layanan Wepose", amount: 350000 },
    { label: "Biaya Admin & Pengiriman", amount: 150000 },
    { label: "Pajak (PPN 11%)", amount: 148500 },
  ];

  const subtotal = priceBreakdown.reduce((sum, item) => sum + item.amount, 0);

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
    
    // Base price (subtotal) + addons, semua dikali quantity
    return (subtotal + addonsTotal) * quantity;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div id="pricing" className="space-y-8">
      <div>
        <h3 className="font-poppins font-semibold text-2xl text-navy mb-6">Hitung Total Biaya Visa</h3>

        {/* Combined Calculator & Breakdown */}
        <div className="bg-orange-50 rounded-2xl p-6 md:p-8">
          
          {/* Quantity Stepper */}
          <div className="mb-6">
            <label className="block font-dm-sans text-sm text-gray-700 mb-2">Jumlah Orang</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange text-orange hover:bg-orange hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <span className="font-poppins font-bold text-2xl text-navy min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange text-orange hover:bg-orange hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Add-ons Checklist */}
          <div className="mb-6">
            <label className="block font-dm-sans text-sm text-gray-700 mb-3">Layanan Tambahan</label>
            <div className="space-y-3">
              {visa.addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-orange cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange focus:ring-offset-0"
                    />
                    <span className="font-dm-sans text-sm text-navy">{addon.name}</span>
                  </div>
                  <span className="font-poppins font-semibold text-sm text-orange">
                    {formatPrice(addon.price)}/orang
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Breakdown Table */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden mb-6">
            <div className="bg-navy px-6 py-3">
              <div className="grid grid-cols-2 gap-4">
                <span className="font-poppins font-semibold text-sm text-white">Komponen Biaya</span>
                <span className="font-poppins font-semibold text-sm text-white text-right">Harga per Orang</span>
              </div>
            </div>
            <div>
              {priceBreakdown.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 gap-4 px-6 py-3 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <span className="font-dm-sans text-sm text-gray-700">{item.label}</span>
                  <span className="font-dm-sans text-sm text-gray-700 text-right">{formatPrice(item.amount)}</span>
                </div>
              ))}
              <div className="border-t-2 border-gray-200 px-6 py-3 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-poppins font-bold text-base text-navy">Subtotal per Orang</span>
                  <span className="font-poppins font-bold text-base text-navy text-right">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Display */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <p className="font-dm-sans text-sm text-gray-500 mb-2">Total untuk {quantity} orang</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={calculateTotal()}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="font-poppins font-bold text-4xl text-orange"
              >
                {formatPrice(calculateTotal())}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <button className="w-full px-8 py-4 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-all duration-200 hover:shadow-cta-hover">
            Apply Sekarang dengan Harga Ini →
          </button>
        </div>

        {/* Note */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex gap-3">
            <InformationCircleIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="font-dm-sans text-sm text-gray-500">
              Harga dapat berubah sewaktu-waktu mengikuti kebijakan kedutaan. Harga yang tertera sudah termasuk semua biaya resmi dan tidak ada biaya tersembunyi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
