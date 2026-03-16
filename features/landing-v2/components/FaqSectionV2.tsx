"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDownIcon, 
  ArrowRightIcon,
  QuestionMarkCircleIcon 
} from "@heroicons/react/24/outline"

export default function FaqSectionV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "Apakah Wepose resmi dan terdaftar?",
      a: "Ya, Wepose beroperasi sejak 2019 dan telah melayani 10.000+ pelanggan dari seluruh Indonesia dengan layanan visa profesional dan terpercaya."
    },
    {
      q: "Berapa lama proses pengajuan visa?",
      a: "Waktu proses bervariasi tergantung negara tujuan, rata-rata 5–30 hari kerja. Estimasi waktu yang akurat ditampilkan di setiap halaman visa untuk membantu perencanaan perjalanan Anda."
    },
    {
      q: "Apakah dokumen saya aman di Wepose?",
      a: "Keamanan data adalah prioritas utama kami. Semua dokumen dienkripsi end-to-end dan disimpan dengan standar keamanan tinggi. Hanya Anda dan tim konsultan yang berwenang yang dapat mengakses dokumen Anda."
    },
    {
      q: "Bagaimana jika visa saya ditolak?",
      a: "Tim konsultan berpengalaman kami akan membantu menganalisis penyebab penolakan dan mempersiapkan pengajuan ulang dengan strategi yang lebih matang untuk meningkatkan peluang approval."
    },
    {
      q: "Metode pembayaran apa saja yang tersedia?",
      a: "Kami menerima berbagai metode pembayaran: transfer bank, virtual account, e-wallet (GoPay, OVO, Dana, ShopeePay), dan kartu kredit/debit melalui gateway pembayaran Midtrans yang aman."
    },
    {
      q: "Apakah ada jaminan uang kembali?",
      a: "Ya, kami memberikan garansi refund 100% jika visa ditolak akibat kesalahan atau kelalaian dari pihak Wepose. Syarat dan ketentuan berlaku sesuai dengan kebijakan refund kami."
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header - Left Aligned */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-3"
            >
              <QuestionMarkCircleIcon className="w-6 h-6 text-orange" />
              <span className="font-dm-sans text-sm text-orange font-semibold uppercase tracking-wide">
                FAQ
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
            >
              Pertanyaan yang Sering Ditanyakan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="font-dm-sans text-base text-gray-600 max-w-lg"
            >
              Temukan jawaban untuk pertanyaan umum seputar layanan visa kami
            </motion.p>
          </div>
          
          {/* Right side CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="mt-4 lg:mt-0"
          >
            <button className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
              Lihat Semua FAQ
              <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FAQ List */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05 }}
                    className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                      isOpen 
                        ? 'border-orange shadow-lg shadow-orange/10' 
                        : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <button 
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-poppins font-bold text-sm transition-all duration-300 ${
                          isOpen 
                            ? 'bg-orange text-white scale-110' 
                            : 'bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange'
                        }`}>
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <span className={`font-poppins font-semibold text-[16px] md:text-[17px] transition-colors leading-tight ${
                          isOpen ? 'text-orange' : 'text-navy group-hover:text-orange'
                        }`}>
                          {faq.q}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? 'bg-orange text-white' 
                            : 'bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange'
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
                            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-orange">
                              <p className="font-dm-sans text-[15px] text-gray-700 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-orange to-orange-dark rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg">
                      Masih Ada Pertanyaan?
                    </h3>
                    <p className="font-dm-sans text-sm text-orange-light opacity-90">
                      Tim kami siap membantu
                    </p>
                  </div>
                </div>
                <p className="font-dm-sans text-sm mb-4 opacity-90">
                  Konsultasi gratis dengan konsultan visa berpengalaman kami
                </p>
                <button className="w-full bg-white text-orange font-poppins font-semibold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Chat WhatsApp Sekarang
                </button>
              </motion.div>

              {/* Popular Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="font-poppins font-bold text-lg text-navy mb-4">
                  Topik Populer
                </h3>
                <div className="space-y-3">
                  {[
                    "Persyaratan Visa Schengen",
                    "Dokumen Visa Jepang",
                    "Biaya Visa Australia",
                    "Waktu Proses Visa Korea"
                  ].map((topic, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left p-3 bg-white rounded-xl hover:bg-orange-50 hover:text-orange transition-all duration-200 border border-gray-100 hover:border-orange-200"
                    >
                      <span className="font-dm-sans text-sm text-gray-700 hover:text-orange">
                        {topic}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}