"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "Apakah Wepose resmi dan terdaftar?",
      a: "Ya, Wepose beroperasi sejak 2019 dan telah melayani 10.000+ pelanggan dari seluruh Indonesia."
    },
    {
      q: "Berapa lama proses pengajuan visa?",
      a: "Tergantung negara tujuan, rata-rata 5–30 hari kerja. Estimasi akurat ditampilkan di setiap halaman visa."
    },
    {
      q: "Apakah dokumen saya aman di Wepose?",
      a: "Semua dokumen dienkripsi end-to-end dan hanya bisa diakses oleh kamu sendiri."
    },
    {
      q: "Bagaimana jika visa saya ditolak?",
      a: "Tim konsultan kami akan membantu analisis & pengajuan ulang dengan persiapan lebih matang."
    },
    {
      q: "Metode pembayaran apa saja yang tersedia?",
      a: "Transfer bank, virtual account, e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit via Midtrans."
    },
    {
      q: "Apakah ada jaminan uang kembali?",
      a: "Ya, kami memberikan garansi refund jika gagal akibat kesalahan di pihak Wepose."
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-navy/5 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 max-w-[900px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange text-white font-poppins font-semibold text-xs mb-4 uppercase shadow-md"
          >
            FAQ
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-bold text-[32px] text-navy mb-3"
          >
            Pertanyaan yang Sering Ditanyakan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="font-dm-sans text-base text-gray-600 max-w-2xl mx-auto"
          >
            Punya pertanyaan? Kami punya jawabannya. Jika tidak menemukan yang kamu cari, hubungi tim kami.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08 }}
                className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-orange shadow-lg' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center text-left p-6 focus:outline-none group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-poppins font-bold text-sm transition-colors ${
                      isOpen ? 'bg-orange text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`font-poppins font-semibold text-[17px] transition-colors ${isOpen ? 'text-orange' : 'text-navy group-hover:text-orange'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-orange text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange'
                    }`}
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[72px]">
                        <p className="font-dm-sans text-[15px] text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center bg-white rounded-2xl p-8 shadow-md border border-gray-100"
        >
          <p className="font-poppins font-semibold text-lg text-navy mb-2">
            Masih ada pertanyaan?
          </p>
          <p className="font-dm-sans text-sm text-gray-600 mb-6">
            Tim customer support kami siap membantu kamu 24/7
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-all duration-200 hover:shadow-cta-hover hover:-translate-y-0.5">
            Hubungi Kami via WhatsApp →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
