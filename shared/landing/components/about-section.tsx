"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const features = [
    {
      title: "Lacak pengajuan aplikasi visa Anda",
      description: "Upload dokumen & data diri online dengan formulir yang sudah dibuat simpel untuk Anda, kami akan membantu menyusun dokumen Anda. Gunakan kembali berkas yang sudah disetujui sebelumnya untuk menghemat lebih banyak waktu.",
      image: "/images/1.png"
    },
    {
      title: "Langkah terpandu untuk Anda",
      description: "Sistem kami akan memandu Anda step-by-step dalam proses pengajuan visa. Tidak perlu bingung lagi dengan persyaratan yang rumit.",
      image: "/images/2.png"
    },
    {
      title: "Smart upload & autofill",
      description: "Upload dokumen & data diri online dengan formulir yang sudah dibuat simpel untuk Anda, kami akan membantu menyusun dokumen Anda. Gunakan kembali berkas yang sudah disetujui sebelumnya untuk menghemat lebih banyak waktu.",
      image: "/images/3.png"
    },
    {
      title: "Smart verification & remarks",
      description: "Tim ahli kami akan melakukan verifikasi otomatis dan memberikan catatan jika ada dokumen yang perlu diperbaiki atau dilengkapi.",
      image: "/images/3.png"
    }
  ]

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [features.length])

  const toggleAccordion = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section id="about" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-[1280px]">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
          >
            Jelajahi Dashboard Anda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-dm-sans text-base text-gray-600 max-w-2xl mx-auto"
          >
            Platform lengkap untuk mengelola pengajuan visa Anda dengan mudah
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`border rounded-[16px] overflow-hidden transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-orange bg-white shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className={`font-poppins font-semibold text-[15px] md:text-[16px] transition-colors ${
                    activeIndex === index ? 'text-orange' : 'text-navy'
                  }`}>
                    {feature.title}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeIndex === index ? 'rotate-180 text-orange' : 'text-gray-400'
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="font-dm-sans text-[14px] text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Progress Indicator */}
            <div className="flex gap-2 pt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'bg-orange flex-1' : 'bg-gray-300 w-8'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={features[activeIndex].image}
                  alt={features[activeIndex].title}
                  fill
                  className="object-cover"
                />
                
                {/* Image Caption - Label Style */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-orange/30">
                    <h3 className="font-poppins font-bold text-[18px] md:text-[20px] text-navy mb-2">
                      {features[activeIndex].title}
                    </h3>
                    <p className="font-dm-sans text-[13px] md:text-[14px] text-gray-600 line-clamp-2">
                      {features[activeIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
