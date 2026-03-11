"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  CheckBadgeIcon,
  ArrowRightIcon,
  MapIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"
import CountriesModal from "./CountriesModal"

export default function SupportedCountriesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    { icon: MapIcon, label: "Visa Turis", count: "120+" },
    { icon: BriefcaseIcon, label: "Visa Pekerja", count: "85+" },
    { icon: AcademicCapIcon, label: "Visa Pelajar", count: "65+" },
    { icon: PlusCircleIcon, label: "Add-ons visa", count: "30+" },
  ]

  const topDestinations = [
    { name: "Schengen", flag: "🇪🇺", count: "27 negara", popular: true },
    { name: "Amerika", flag: "🇺🇸", count: "B1/B2", popular: true },
    { name: "Jepang", flag: "🇯🇵", count: "Tourist", popular: true },
    { name: "Australia", flag: "🇦🇺", count: "ETA", popular: false },
    { name: "Inggris", flag: "🇬🇧", count: "Standard", popular: false },
    { name: "Kanada", flag: "🇨🇦", count: "eTA", popular: false },
    { name: "Korea", flag: "🇰🇷", count: "C-3", popular: false },
    { name: "Singapura", flag: "🇸🇬", count: "Tourist", popular: false },
  ]

  const allCountries = [
    { name: "Fiji", flag: "🇫🇯" },
    { name: "Kiribati", flag: "🇰🇮" },
    { name: "Kepulauan Marshall", flag: "🇲🇭" },
    { name: "Mikronesia", flag: "🇫🇲" },
    { name: "Nauru", flag: "🇳🇷" },
    { name: "Selandia Baru", flag: "🇳🇿" },
    { name: "Palau", flag: "🇵🇼" },
    { name: "India", flag: "🇮🇳" },
    { name: "Maladewa", flag: "🇲🇻" },
    { name: "Nepal", flag: "🇳🇵" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "Sri Lanka", flag: "🇱🇰" },
    { name: "Kazakhstan", flag: "🇰🇿" },
    { name: "Kirgistan", flag: "🇰🇬" },
    { name: "Irlandia", flag: "🇮🇪" },
    { name: "Italia", flag: "🇮🇹" },
    { name: "Latvia", flag: "🇱🇻" },
    { name: "Liechtenstein", flag: "🇱🇮" },
    { name: "Lithuania", flag: "🇱🇹" },
    { name: "Luksemburg", flag: "🇱🇺" },
    { name: "Malta", flag: "🇲🇹" },
    { name: "Monako", flag: "🇲🇨" },
    { name: "Republik Dominika", flag: "🇩🇴" },
    { name: "Grenada", flag: "🇬🇩" },
    { name: "Haiti", flag: "🇭🇹" },
    { name: "Jamaika", flag: "🇯🇲" },
    { name: "Saint Kitts dan Nevis", flag: "🇰🇳" },
    { name: "Saint Lucia", flag: "🇱🇨" },
    { name: "Uni Emirat Arab", flag: "🇦🇪" },
    { name: "Yaman", flag: "🇾🇪" },
    { name: "Aljazair", flag: "🇩🇿" },
    { name: "Angola", flag: "🇦🇴" },
    { name: "Benin", flag: "🇧🇯" },
    { name: "Botswana", flag: "🇧🇼" },
    { name: "Burkina Faso", flag: "🇧🇫" },
    { name: "Burundi", flag: "🇧🇮" },
    { name: "Kamerun", flag: "🇨🇲" },
    { name: "Tanjung Verde", flag: "🇨🇻" },
    { name: "Chad", flag: "🇹🇩" },
    { name: "Komoro", flag: "🇰🇲" },
    { name: "Kongo", flag: "🇨🇬" },
    { name: "Pantai Gading", flag: "🇨🇮" },
    { name: "Mesir", flag: "🇪🇬" },
    { name: "Guinea Khatulistiwa", flag: "🇬🇶" },
    { name: "Eritrea", flag: "🇪🇷" },
    { name: "Eswatini", flag: "🇸🇿" },
    { name: "Ethiopia", flag: "🇪🇹" },
    { name: "Gabon", flag: "🇬🇦" },
    { name: "Gambia", flag: "🇬🇲" },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "Guinea", flag: "🇬🇳" },
    { name: "Kenya", flag: "🇰🇪" },
    { name: "Lesotho", flag: "🇱🇸" },
    { name: "Liberia", flag: "🇱🇷" },
    { name: "Libya", flag: "🇱🇾" },
    { name: "Madagaskar", flag: "🇲🇬" },
    { name: "Malawi", flag: "🇲🇼" },
    { name: "Mali", flag: "🇲🇱" },
    { name: "Mauritania", flag: "🇲🇷" },
    { name: "Mauritius", flag: "🇲🇺" },
    { name: "Maroko", flag: "🇲🇦" },
    { name: "Mozambik", flag: "🇲🇿" },
    { name: "Namibia", flag: "🇳🇦" },
    { name: "Niger", flag: "🇳🇪" },
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "Rwanda", flag: "🇷🇼" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Seychelles", flag: "🇸🇨" },
    { name: "Sierra Leone", flag: "🇸🇱" },
    { name: "Somalia", flag: "🇸🇴" },
    { name: "Afrika Selatan", flag: "🇿🇦" },
    { name: "Sudan Selatan", flag: "🇸🇸" },
    { name: "Sudan", flag: "🇸🇩" },
    { name: "Tanzania", flag: "🇹🇿" },
    { name: "Togo", flag: "🇹🇬" },
    { name: "Tunisia", flag: "🇹🇳" },
    { name: "Uganda", flag: "🇺🇬" },
    { name: "Zambia", flag: "🇿🇲" },
    { name: "Zimbabwe", flag: "🇿🇼" },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white px-6 py-24 md:px-12 md:py-32">

      {/* Background Pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container mx-auto max-w-[1200px]">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-poppins font-bold leading-[1.15] text-[28px] md:text-[36px] text-navy mb-4"
          >
            Mendukung 300+ Tipe Visa
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-dm-sans text-[16px] leading-relaxed text-gray-600 max-w-2xl mx-auto"
          >
            Platform visa online paling lengkap di Asia Tenggara dengan dukungan 90+ negara dan approval rate 99%
          </motion.p>
        </div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-poppins font-semibold text-navy text-sm mb-1">{cat.label}</h3>
                  <p className="font-dm-sans text-2xl font-bold text-orange">{cat.count}</p>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Top Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-poppins font-bold text-2xl text-navy mb-6 text-center">
            Destinasi Populer
          </h3>
          
          {/* Scrolling Container - Row 1 (Left to Right) */}
          <div className="relative overflow-hidden mb-4">
            <div className="flex animate-marquee gap-3 hover:pause-marquee">
              {topDestinations.map((dest, idx) => (
                <div
                  key={`first-${idx}`}
                  className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex-shrink-0 w-48 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <p className="font-dm-sans font-semibold text-navy text-sm">{dest.name}</p>
                      <p className="font-dm-sans text-xs text-gray-500">{dest.count}</p>
                    </div>
                  </div>
                </div>
              ))}
              {topDestinations.map((dest, idx) => (
                <div
                  key={`second-${idx}`}
                  className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex-shrink-0 w-48 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <p className="font-dm-sans font-semibold text-navy text-sm">{dest.name}</p>
                      <p className="font-dm-sans text-xs text-gray-500">{dest.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling Container - Row 2 (Right to Left) */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee-reverse gap-3 hover:pause-marquee">
              {[...topDestinations].reverse().map((dest, idx) => (
                <div
                  key={`third-${idx}`}
                  className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex-shrink-0 w-48 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <p className="font-dm-sans font-semibold text-navy text-sm">{dest.name}</p>
                      <p className="font-dm-sans text-xs text-gray-500">{dest.count}</p>
                    </div>
                  </div>
                </div>
              ))}
              {[...topDestinations].reverse().map((dest, idx) => (
                <div
                  key={`fourth-${idx}`}
                  className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex-shrink-0 w-48 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <p className="font-dm-sans font-semibold text-navy text-sm">{dest.name}</p>
                      <p className="font-dm-sans text-xs text-gray-500">{dest.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <CheckBadgeIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-poppins text-lg font-bold text-navy">
                Approval Rate 99%
              </p>
              <p className="font-dm-sans text-sm text-gray-500">
                Berhasil diproses & disetujui
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-8 py-3 font-dm-sans text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5"
          >
            Lihat Semua {allCountries.length}+ Negara
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>

      {/* Countries Modal */}
      <CountriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countries={allCountries}
      />
    </section>
  )
}