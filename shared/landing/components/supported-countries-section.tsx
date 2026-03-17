"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CheckBadgeIcon,
  ArrowRightIcon,
  MapIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"
import CountriesModal from "../../../features/landing/components/CountriesModal"

import { Flag, getCountryCode } from '@/shared/ui/Flag';

export default function SupportedCountriesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    { icon: MapIcon, label: "Visa Turis", count: "120+" },
    { icon: BriefcaseIcon, label: "Visa Pekerja", count: "85+" },
    { icon: AcademicCapIcon, label: "Visa Pelajar", count: "65+" },
    { icon: PlusCircleIcon, label: "Add-ons visa", count: "30+" },
  ]

  const topDestinations = [
    { name: "Schengen", countryCode: "eu", count: "27 negara", popular: true },
    { name: "Amerika", countryCode: "us", count: "B1/B2", popular: true },
    { name: "Jepang", countryCode: "jp", count: "Tourist", popular: true },
    { name: "Australia", countryCode: "au", count: "ETA", popular: false },
    { name: "Inggris", countryCode: "gb", count: "Standard", popular: false },
    { name: "Kanada", countryCode: "ca", count: "eTA", popular: false },
    { name: "Korea", countryCode: "kr", count: "C-3", popular: false },
    { name: "Singapura", countryCode: "sg", count: "Tourist", popular: false },
  ]

  const allCountries = [
    { name: "Fiji", countryCode: "fj" },
    { name: "Kiribati", countryCode: "ki" },
    { name: "Kepulauan Marshall", countryCode: "mh" },
    { name: "Mikronesia", countryCode: "fm" },
    { name: "Nauru", countryCode: "nr" },
    { name: "Selandia Baru", countryCode: "nz" },
    { name: "Palau", countryCode: "pw" },
    { name: "India", countryCode: "in" },
    { name: "Maladewa", countryCode: "mv" },
    { name: "Nepal", countryCode: "np" },
    { name: "Pakistan", countryCode: "pk" },
    { name: "Sri Lanka", countryCode: "lk" },
    { name: "Kazakhstan", countryCode: "kz" },
    { name: "Kirgistan", countryCode: "kg" },
    { name: "Irlandia", countryCode: "ie" },
    { name: "Italia", countryCode: "it" },
    { name: "Latvia", countryCode: "lv" },
    { name: "Liechtenstein", countryCode: "li" },
    { name: "Lithuania", countryCode: "lt" },
    { name: "Luksemburg", countryCode: "lu" },
    { name: "Malta", countryCode: "mt" },
    { name: "Monako", countryCode: "mc" },
    { name: "Republik Dominika", countryCode: "do" },
    { name: "Grenada", countryCode: "gd" },
    { name: "Haiti", countryCode: "ht" },
    { name: "Jamaika", countryCode: "jm" },
    { name: "Saint Kitts dan Nevis", countryCode: "kn" },
    { name: "Saint Lucia", countryCode: "lc" },
    { name: "Uni Emirat Arab", countryCode: "ae" },
    { name: "Yaman", countryCode: "ye" },
    { name: "Aljazair", countryCode: "dz" },
    { name: "Angola", countryCode: "ao" },
    { name: "Benin", countryCode: "bj" },
    { name: "Botswana", countryCode: "bw" },
    { name: "Burkina Faso", countryCode: "bf" },
    { name: "Burundi", countryCode: "bi" },
    { name: "Kamerun", countryCode: "cm" },
    { name: "Tanjung Verde", countryCode: "cv" },
    { name: "Chad", countryCode: "td" },
    { name: "Komoro", countryCode: "km" },
    { name: "Kongo", countryCode: "cg" },
    { name: "Pantai Gading", countryCode: "ci" },
    { name: "Mesir", countryCode: "eg" },
    { name: "Guinea Khatulistiwa", countryCode: "gq" },
    { name: "Eritrea", countryCode: "er" },
    { name: "Eswatini", countryCode: "sz" },
    { name: "Ethiopia", countryCode: "et" },
    { name: "Gabon", countryCode: "ga" },
    { name: "Gambia", countryCode: "gm" },
    { name: "Ghana", countryCode: "gh" },
    { name: "Guinea", countryCode: "gn" },
    { name: "Kenya", countryCode: "ke" },
    { name: "Lesotho", countryCode: "ls" },
    { name: "Liberia", countryCode: "lr" },
    { name: "Libya", countryCode: "ly" },
    { name: "Madagaskar", countryCode: "mg" },
    { name: "Malawi", countryCode: "mw" },
    { name: "Mali", countryCode: "ml" },
    { name: "Mauritania", countryCode: "mr" },
    { name: "Mauritius", countryCode: "mu" },
    { name: "Maroko", countryCode: "ma" },
    { name: "Mozambik", countryCode: "mz" },
    { name: "Namibia", countryCode: "na" },
    { name: "Niger", countryCode: "ne" },
    { name: "Nigeria", countryCode: "ng" },
    { name: "Rwanda", countryCode: "rw" },
    { name: "Senegal", countryCode: "sn" },
    { name: "Seychelles", countryCode: "sc" },
    { name: "Sierra Leone", countryCode: "sl" },
    { name: "Somalia", countryCode: "so" },
    { name: "Afrika Selatan", countryCode: "za" },
    { name: "Sudan Selatan", countryCode: "ss" },
    { name: "Sudan", countryCode: "sd" },
    { name: "Tanzania", countryCode: "tz" },
    { name: "Togo", countryCode: "tg" },
    { name: "Tunisia", countryCode: "tn" },
    { name: "Uganda", countryCode: "ug" },
    { name: "Zambia", countryCode: "zm" },
    { name: "Zimbabwe", countryCode: "zw" },
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
            Layanan visa online dengan dukungan 90+ negara dan berbagai tipe visa untuk kebutuhan perjalanan Anda
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
                    <Flag countryCode={dest.countryCode} size="lg" />
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
                    <Flag countryCode={dest.countryCode} size="lg" />
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
                    <Flag countryCode={dest.countryCode} size="lg" />
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
                    <Flag countryCode={dest.countryCode} size="lg" />
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
                Proses Terpercaya
              </p>
              <p className="font-dm-sans text-sm text-gray-500">
                Diproses dengan teliti & profesional
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