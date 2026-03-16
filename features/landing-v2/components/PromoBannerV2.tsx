"use client"

import React from "react"
import { motion } from "framer-motion"
import { SparklesIcon, GiftIcon, ClockIcon } from "@heroicons/react/24/outline"

export default function PromoBannerV2() {
  return (
    <section className="bg-gradient-to-r from-orange via-orange-500 to-orange-600 py-4 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          
          {/* Left Content */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <GiftIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-white text-lg">
                  Promo Spesial Visa
                </h3>
                <p className="font-dm-sans text-white/90 text-sm">
                  Diskon hingga 25% untuk visa Schengen & Jepang
                </p>
              </div>
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-white">
              <ClockIcon className="w-4 h-4" />
              <span className="font-dm-sans text-sm">Berlaku sampai 31 Maret</span>
            </div>
            <button className="bg-white hover:bg-gray-100 text-orange font-poppins font-semibold py-2 px-6 rounded-full transition-all hover:scale-105 shadow-lg">
              Klaim Sekarang
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  )
}