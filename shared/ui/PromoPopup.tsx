"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, SparklesIcon, ClockIcon, TagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 1 second
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClaim = () => {
    // Handle claim promo logic
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[480px] pointer-events-auto"
            >
              {/* Close Button */}
          

              {/* Card */}
              <div className="relative bg-gradient-to-br from-orange via-orange-dark to-[#c2410c] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy/20 rounded-full blur-2xl pointer-events-none" />
                
                {/* Sparkle Icons */}
                <SparklesIcon className="absolute top-6 right-6 w-8 h-8 text-yellow-300 animate-pulse pointer-events-none" />
                <SparklesIcon className="absolute bottom-8 left-8 w-6 h-6 text-yellow-300 animate-pulse pointer-events-none" style={{ animationDelay: "0.5s" }} />

                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-navy rounded-full font-poppins font-bold text-sm mb-6 shadow-lg pointer-events-none"
                  >
                    <TagIcon className="w-4 h-4" />
                    PROMO SPESIAL
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-poppins font-bold text-4xl text-white mb-3 leading-tight"
                  >
                    Diskon 25%
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-dm-sans text-lg text-white/90 mb-6"
                  >
                    Untuk semua visa turis!
                  </motion.p>

                  {/* Promo Code */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl p-4 mb-6"
                  >
                    <p className="font-dm-sans text-xs text-white/80 mb-2">Gunakan kode promo:</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-poppins font-bold text-3xl text-white tracking-wider">
                        WEPOSE25
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("WEPOSE25");
                          alert("Kode promo berhasil disalin!");
                        }}
                        className="px-4 py-2 bg-white text-orange font-poppins font-semibold text-sm rounded-full hover:bg-gray-100 transition-colors"
                      >
                        Salin
                      </button>
                    </div>
                  </motion.div>

                  {/* Timer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-2 text-white/90 mb-6"
                  >
                    <ClockIcon className="w-5 h-5" />
                    <span className="font-dm-sans text-sm">
                      Berlaku hingga 31 Desember 2024
                    </span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={handleClaim}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 bg-white text-orange font-poppins font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-200"
                  >
                    Claim Promo Sekarang! 🎉
                  </motion.button>

                  {/* Terms */}
                  <p className="font-dm-sans text-xs text-white/60 mt-4">
                    *Syarat & ketentuan berlaku
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}