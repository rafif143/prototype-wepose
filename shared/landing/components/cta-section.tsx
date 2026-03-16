"use client"

import React from "react"
import { motion } from "framer-motion"
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, LockClosedIcon, CheckBadgeIcon, StarIcon } from "@heroicons/react/24/outline"

export default function CtaSection() {
  return (
    <section className="py-24 bg-navy overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-[1280px] relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-poppins font-bold text-[36px] md:text-[40px] text-white mb-4 leading-tight">
            Siap Mulai Petualanganmu?
          </h2>
          <p className="font-dm-sans text-[18px] text-gray-300 mb-10">
            Bergabung dengan 10.000+ traveler yang sudah percaya <span className="inline-flex items-center">
              <span>WEP</span>
              <img 
                src="/wepose-logo-mini.svg" 
                alt="Wepose Logo" 
                className="w-3 h-3 mx-0.5"
              />
              <span>SE</span>
            </span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-orange text-white font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover hover:-translate-y-0.5 transition-all duration-200">
              <PaperAirplaneIcon className="w-5 h-5 -rotate-45 -mt-1" />
              Mulai Apply Sekarang →
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-poppins font-semibold text-[15px] hover:bg-white/20 transition-all duration-200">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Konsultasi Gratis
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-12 font-dm-sans text-[13px] text-gray-400">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <LockClosedIcon className="w-4 h-4" />
              <span>SSL Encrypted</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckBadgeIcon className="w-4 h-4" />
              <span>Terdaftar Resmi</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>5.0 Google</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
