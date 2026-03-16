"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  CheckBadgeIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline"
import { US, GB, JP, AU, CA, FR, DE, NL, SG, KR, EU, TH, MY, VN, KH } from 'country-flag-icons/react/3x2'

export default function SupportedCountriesSectionV2() {
  const stats = [
    { number: "300+", label: "Tipe Visa", icon: DocumentTextIcon },
    { number: "90+", label: "Negara", icon: GlobeAltIcon },
    { number: "50K+", label: "Visa Diproses", icon: CheckCircleIcon },
    { number: "99%", label: "Success Rate", icon: TrophyIcon },
  ]

  const featuredCountries = [
    { name: "Schengen", flag: EU, desc: "27 Negara Eropa" },
    { name: "Amerika", flag: US, desc: "B1/B2 Visa" },
    { name: "Jepang", flag: JP, desc: "Tourist & Business" },
    { name: "Australia", flag: AU, desc: "ETA & Visitor" },
    { name: "Inggris", flag: GB, desc: "Standard Visitor" },
    { name: "Kanada", flag: CA, desc: "eTA & Visitor" },
    { name: "Korea", flag: KR, desc: "K-ETA & Tourist" },
    { name: "Singapura", flag: SG, desc: "Tourist & Business" },
    { name: "Thailand", flag: TH, desc: "Tourist Visa" },
    { name: "Malaysia", flag: MY, desc: "eVisa & Tourist" },
    { name: "Vietnam", flag: VN, desc: "E-Visa & Tourist" },
    { name: "Prancis", flag: FR, desc: "Schengen Visa" },
    { name: "Jerman", flag: DE, desc: "Schengen Visa" },
    { name: "Belanda", flag: NL, desc: "Schengen Visa" },
    { name: "Kamboja", flag: KH, desc: "E-Visa & Tourist" },
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 max-w-[1280px] relative z-10">
        {/* Header - Left Aligned */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 px-8 md:px-16 lg:px-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-3"
            >
              <GlobeAltIcon className="w-6 h-6 text-orange" />
              <span className="font-dm-sans text-sm text-orange font-semibold uppercase tracking-wide">
                Global Coverage
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
            >
              Mendukung 300+ Tipe Visa
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="font-dm-sans text-base text-gray-600 max-w-lg"
            >
              Jangkauan global dengan dukungan visa ke 90+ negara untuk semua kebutuhan perjalanan Anda
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
              Lihat Semua Negara
              <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
            </button>
          </motion.div>
        </div>

        {/* Stats Grid - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 px-8 md:px-16 lg:px-24"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="text-center"
            >
              <div className="mb-3 flex justify-center">
                {React.createElement(stat.icon, { className: "w-8 h-8 text-orange" })}
              </div>
              <div className="font-poppins font-bold text-3xl text-navy mb-1">{stat.number}</div>
              <div className="font-dm-sans text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Countries - Marquee Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4 }}
          className="mb-16 px-8 md:px-16 lg:px-24"
        >
          <div className="mb-8">
            <h3 className="font-poppins font-bold text-2xl text-navy">
              Destinasi Populer
            </h3>
          </div>

          {/* Row 1 - Left to Right */}
          <div className="relative overflow-hidden mb-6">
            <div className="flex animate-marquee gap-6 hover:pause-marquee">
              {featuredCountries.slice(0, 8).map((country, idx) => (
                <div
                  key={`first-${idx}`}
                  className="bg-white rounded-xl p-4 border border-orange hover:border-orange transition-all duration-300 cursor-pointer flex-shrink-0 w-48 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      {React.createElement(country.flag, { className: "w-full h-full object-cover" })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-navy truncate">{country.name}</h4>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-gray-600 line-clamp-1">{country.desc}</p>
                </div>
              ))}
              {featuredCountries.slice(0, 8).map((country, idx) => (
                <div
                  key={`second-${idx}`}
                  className="bg-white rounded-xl p-4 border border-orange hover:border-orange transition-all duration-300 cursor-pointer flex-shrink-0 w-48 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      {React.createElement(country.flag, { className: "w-full h-full object-cover" })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-navy truncate">{country.name}</h4>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-gray-600 line-clamp-1">{country.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative overflow-hidden mb-6">
            <div className="flex animate-marquee-reverse gap-6 hover:pause-marquee">
              {featuredCountries.slice(7, 15).reverse().map((country, idx) => (
                <div
                  key={`third-${idx}`}
                  className="bg-white rounded-xl p-4 border border-orange hover:border-orange transition-all duration-300 cursor-pointer flex-shrink-0 w-48 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      {React.createElement(country.flag, { className: "w-full h-full object-cover" })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-navy truncate">{country.name}</h4>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-gray-600 line-clamp-1">{country.desc}</p>
                </div>
              ))}
              {featuredCountries.slice(7, 15).reverse().map((country, idx) => (
                <div
                  key={`fourth-${idx}`}
                  className="bg-white rounded-xl p-4 border border-orange hover:border-orange transition-all duration-300 cursor-pointer flex-shrink-0 w-48 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      {React.createElement(country.flag, { className: "w-full h-full object-cover" })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-navy truncate">{country.name}</h4>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-gray-600 line-clamp-1">{country.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Left to Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-6 hover:pause-marquee">
              {featuredCountries.slice(8, 15).map((country, idx) => (
                <div
                  key={`fifth-${idx}`}
                  className="bg-white rounded-xl p-4 border border-orange hover:border-orange transition-all duration-300 cursor-pointer flex-shrink-0 w-48 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      {React.createElement(country.flag, { className: "w-full h-full object-cover" })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-navy truncate">{country.name}</h4>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-gray-600 line-clamp-1">{country.desc}</p>
                </div>
              ))}
              {featuredCountries.slice(8, 15).map((country, idx) => (
                <div
                  key={`sixth-${idx}`}
                  className="bg-white rounded-xl p-4 border border-orange hover:border-orange transition-all duration-300 cursor-pointer flex-shrink-0 w-48 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      {React.createElement(country.flag, { className: "w-full h-full object-cover" })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-navy truncate">{country.name}</h4>
                    </div>
                  </div>
                  <p className="font-dm-sans text-xs text-gray-600 line-clamp-1">{country.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gray-50 rounded-2xl p-8 px-8 md:px-16 lg:px-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckBadgeIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-poppins text-lg font-bold text-navy">
                Proses Terpercaya & Aman
              </p>
              <p className="font-dm-sans text-sm text-gray-600">
                Diproses dengan teliti oleh tim profesional berpengalaman
              </p>
            </div>
          </div>

          <button className="group inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 font-poppins text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-orange-dark hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-1">
            Mulai Aplikasi Visa Sekarang
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Mobile CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center lg:hidden"
        >
          <button className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
            Lihat Semua 90+ Negara
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}