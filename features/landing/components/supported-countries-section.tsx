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
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"
import { GlobeWithCountries } from "../ui/globe"
import CountriesModal from "./CountriesModal"

export default function SupportedCountriesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    { icon: MapIcon, label: "Visa Turis" },
    { icon: BriefcaseIcon, label: "Visa Pekerja" },
    { icon: AcademicCapIcon, label: "Visa Pelajar" },
    { icon: PlusCircleIcon, label: "Add-ons visa" },
    { icon: WrenchScrewdriverIcon, label: "Layanan lainnya" },
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

  const displayedCountries = allCountries.slice(0, 18)

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24 md:px-12 md:py-32">

      {/* Subtle background grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft gradient top-left glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #ff6b2b 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2">

          {/* ── LEFT CONTENT ── */}
          <div className="z-10 flex flex-col gap-8 lg:pr-16">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="font-dm-sans text-[12px] font-semibold uppercase tracking-widest text-orange-600">
                Global Coverage
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <h2 className="font-poppins font-bold leading-[1.15] text-[34px] md:text-[44px] text-navy">
                Mendukung{" "}
                <span
                  className="relative inline-block text-orange"
                  style={{ WebkitTextStroke: "0px" }}
                >
                  300+ tipe visa
                  {/* Underline accent */}
                  <svg
                    aria-hidden
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5 Q50 0 100 4 Q150 8 200 3"
                      stroke="#ff6b2b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
              <p className="mt-4 font-dm-sans text-[15px] leading-relaxed text-gray-500 max-w-lg">
                Kami telah mendukung 300+ jenis visa ke{" "}
                <strong className="text-gray-700 font-semibold">90+ negara</strong> di
                seluruh dunia — SPUN adalah platform visa online{" "}
                <strong className="text-gray-700 font-semibold">paling lengkap</strong>{" "}
                di Asia Tenggara.
              </p>
            </motion.div>

            {/* Category Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat, idx) => {
                const Icon = cat.icon
                return (
                  <button
                    key={idx}
                    className="group flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 font-dm-sans text-[12.5px] font-medium text-gray-600 transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 hover:shadow-sm"
                  >
                    <Icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                    {cat.label}
                  </button>
                )
              })}
            </motion.div>

            {/* Country Chips */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-3"
            >
              <p className="font-dm-sans text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Negara Tersedia
              </p>
              <div className="flex flex-wrap gap-2">
                {displayedCountries.map((country, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.008 * idx, duration: 0.25 }}
                    whileHover={{ scale: 1.06, y: -1 }}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 shadow-sm transition-all duration-200 hover:border-orange-300 hover:shadow-md"
                  >
                    <span className="text-[13px]">{country.flag}</span>
                    <span className="font-dm-sans text-[11.5px] text-gray-700">
                      {country.name}
                    </span>
                  </motion.div>
                ))}

                {/* View all inline chip */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 }}
                  whileHover={{ scale: 1.06, y: -1 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 font-dm-sans text-[11.5px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange hover:shadow-md"
                >
                  +{allCountries.length - displayedCountries.length} lainnya
                  <ArrowRightIcon className="h-3 w-3" />
                </motion.button>
              </div>
            </motion.div>

            {/* Divider + CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
                  <CheckBadgeIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-poppins text-[14px] font-bold text-navy">
                    Approval rate 99%
                  </p>
                  <p className="font-dm-sans text-[11px] text-gray-400">
                    Berhasil diproses & disetujui
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 font-dm-sans text-[13px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg"
              >
                Lihat Semua Negara
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT — Globe zoomed-in, centered ── */}
          <div className="relative hidden h-[640px] w-full overflow-hidden lg:block">

            {/* Soft left fade to blend into text column */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: "linear-gradient(to right, white 0%, transparent 30%)" }}
            />
            {/* Soft top + bottom fade */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to bottom, white 0%, transparent 18%), linear-gradient(to top, white 0%, transparent 18%)",
              }}
            />

            {/* Globe — 135% size, offset top-left so it centers visually */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute"
              style={{
                top: "-17.5%",
                left: "-17.5%",
                width: "135%",
                height: "135%",
              }}
            >
              <GlobeWithCountries className="h-full w-full" />
            </motion.div>
          </div>

        </div>
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