"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { UserPlusIcon, DocumentArrowUpIcon, CreditCardIcon, SignalIcon } from "@heroicons/react/24/outline"

export default function HowItWorksSection() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  }

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const steps = [
    {
      icon: UserPlusIcon,
      num: 1,
      title: "Daftar & Cari Visa",
      desc: "Temukan dari 100+ tipe visa ke 35+ negara tujuan"
    },
    {
      icon: DocumentArrowUpIcon,
      num: 2,
      title: "Isi Data & Upload Dokumen",
      desc: "Lengkapi form & simpan dokumen ke vault aman Wepose"
    },
    {
      icon: CreditCardIcon,
      num: 3,
      title: "Bayar & Konfirmasi",
      desc: "Bayar via metode favoritmu. Invoice otomatis terkirim"
    },
    {
      icon: SignalIcon,
      num: 4,
      title: "Pantau Status Real-time",
      desc: "Lacak progres visamu kapanpun lewat portal tamu"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-100/50 text-orange font-poppins font-semibold text-xs mb-4 uppercase"
          >
            Cara Kerja
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-semibold text-[28px] text-navy"
          >
            Visa Approved dalam 4 Langkah Mudah
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[24px] left-[12.5%] right-[12.5%] h-[2px] border-t-2 border-dashed border-orange/30 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemAnim} className="relative z-10">
              <div className="bg-white rounded-[16px] p-6 text-center shadow-md h-full flex flex-col items-center group hover:-translate-y-1 transition-transform duration-300">
                {/* Number Circle */}
                <div className="w-[48px] h-[48px] rounded-full bg-orange text-white font-poppins font-bold text-xl flex items-center justify-center -mt-[48px] mb-6 shadow-md border-4 border-white">
                  {step.num}
                </div>
                
                {/* Icon */}
                <div className="mb-4 text-orange p-3 bg-orange-50 rounded-2xl group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                
                {/* Text */}
                <h3 className="font-poppins font-bold text-[16px] text-navy mb-2">
                  {step.title}
                </h3>
                <p className="font-dm-sans text-[14px] text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
