"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Flag } from '@/shared/ui/Flag'

interface Country {
  name: string
  countryCode: string
}

interface CountriesModalProps {
  isOpen: boolean
  onClose: () => void
  countries: Country[]
}

export default function CountriesModal({ isOpen, onClose, countries }: CountriesModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-navy to-navy-mid px-6 py-4 flex items-center justify-between border-b border-gray-200 z-10">
                <div>
                  <h2 className="font-poppins font-bold text-[24px] text-white">
                    Semua Negara yang Didukung
                  </h2>
                  <p className="font-dm-sans text-[14px] text-white/80 mt-1">
                    {countries.length} negara tersedia
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {countries.map((country, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: idx * 0.02,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-orange-50 hover:border-orange border border-gray-200 transition-all duration-200 cursor-pointer group"
                    >
                      <motion.div
                        className="w-6 h-6 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Flag countryCode={country.countryCode} size="sm" />
                      </motion.div>
                      <span className="font-dm-sans text-[13px] text-gray-700 group-hover:text-orange font-medium">
                        {country.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="font-dm-sans text-[13px] text-gray-600">
                    Visa online paling lengkap di Asia Tenggara
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-navy text-white rounded-full font-poppins font-semibold text-[14px] hover:bg-navy-mid transition-all duration-200"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
