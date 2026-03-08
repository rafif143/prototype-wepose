"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheckIcon, UsersIcon, DocumentTextIcon, BoltIcon } from "@heroicons/react/24/outline"

export default function AboutSection() {
  const stats = [
    { num: "5+", label: "Tahun Pengalaman" },
    { num: "10K+", label: "Pelanggan Puas" },
    { num: "35+", label: "Negara Terjangkau" },
    { num: "100+", label: "Type Visa" },
  ]

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Legal & Berlisensi",
      description: "Agen visa yang terdaftar secara resmi dan berlisensi, serta sepenuhnya mematuhi peraturan imigrasi."
    },
    {
      icon: UsersIcon,
      title: "Tim Ahli",
      description: "Konsultan visa berpengalaman dengan pengetahuan mendalam tentang persyaratan imigrasi di lebih dari 30 negara."
    },
    {
      icon: DocumentTextIcon,
      title: "Dokumentasi Lengkap",
      description: "Kami menangani semua dokumen dan administrasi, memastikan semuanya akurat dan lengkap."
    },
    {
      icon: BoltIcon,
      title: "Proses Cepat",
      description: "Prosedur yang efisien untuk memastikan visa Anda diproses secepat mungkin tanpa hambatan."
    }
  ]

  return (
    <section id="about" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-navy mb-6">
              TENTANG WEP<span className="text-orange">O</span>SE
            </h2>
            <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-8">
              WePose adalah agen visa terpercaya di Jakarta dan Surabaya, membantu ribuan traveller mendapatkan visa approved dengan proses effortless, 3 kali pengecekan, dan layanan profesional.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="text-left"
                >
                  <div className="font-poppins font-bold text-[32px] md:text-[40px] text-navy leading-none mb-1">
                    {stat.num}
                  </div>
                  <div className="font-dm-sans text-[13px] md:text-[14px] text-gray-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-gray-50 rounded-[16px] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="font-dm-sans text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
