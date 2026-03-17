"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { Flag } from '@/shared/ui/Flag'

export default function VisaListClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [showPromoOnly, setShowPromoOnly] = useState(false)
  const visasPerPage = 12

  const visas = [
    {
      slug: "schengen-jerman",
      country: "Jerman",
      region: "Eropa",
      type: "Schengen",
      price: "Rp 1.500.000",
      originalPrice: null,
      duration: "7-14 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
      countryCode: "de",
      isPromo: false
    },
    {
      slug: "schengen-prancis",
      country: "Prancis",
      region: "Eropa",
      type: "Schengen",
      price: "Rp 1.350.000",
      originalPrice: "Rp 1.850.000",
      duration: "7-14 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
      countryCode: "fr",
      isPromo: true
    },
    {
      slug: "schengen-italia",
      country: "Italia",
      region: "Eropa",
      type: "Schengen",
      price: "Rp 1.500.000",
      originalPrice: null,
      duration: "7-14 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
      countryCode: "it",
      isPromo: false
    },
    {
      slug: "schengen-belanda",
      country: "Belanda",
      region: "Eropa",
      type: "Schengen",
      price: "Rp 1.500.000",
      originalPrice: null,
      duration: "7-14 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
      countryCode: "nl",
      isPromo: false
    },
    {
      slug: "schengen-spanyol",
      country: "Spanyol",
      region: "Eropa",
      type: "Schengen",
      price: "Rp 1.200.000",
      originalPrice: "Rp 1.500.000",
      duration: "7-14 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80",
      countryCode: "es",
      isPromo: true
    },
    {
      slug: "schengen-swiss",
      country: "Swiss",
      region: "Eropa",
      type: "Schengen",
      price: "Rp 1.500.000",
      originalPrice: null,
      duration: "7-14 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
      countryCode: "ch",
      isPromo: false
    },
    {
      slug: "uk-inggris",
      country: "Inggris (UK)",
      region: "Eropa",
      type: "Tourist",
      price: "Rp 2.000.000",
      originalPrice: null,
      duration: "15-21 hari",
      validity: "180 hari",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
      countryCode: "gb",
      isPromo: false
    },
    {
      slug: "jepang-tourist",
      country: "Jepang",
      region: "Asia Timur",
      type: "Tourist",
      price: "Rp 650.000",
      originalPrice: "Rp 950.000",
      duration: "5-7 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
      countryCode: "jp",
      isPromo: true
    },
    {
      slug: "korea-selatan",
      country: "Korea Selatan",
      region: "Asia Timur",
      type: "Tourist",
      price: "Rp 650.000",
      originalPrice: "Rp 850.000",
      duration: "5-7 hari",
      validity: "90 hari",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80",
      countryCode: "kr",
      isPromo: true
    },
    {
      slug: "china-tourist",
      country: "China",
      region: "Asia Timur",
      type: "Tourist",
      price: "Rp 900.000",
      originalPrice: null,
      duration: "7-10 hari",
      validity: "30 hari",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80",
      countryCode: "cn",
      isPromo: false
    },
    {
      slug: "singapura",
      country: "Singapura",
      region: "Asia Tenggara",
      type: "Tourist",
      price: "Rp 500.000",
      originalPrice: null,
      duration: "3-5 hari",
      validity: "30 hari",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
      countryCode: "sg",
      isPromo: false
    },
    {
      slug: "thailand",
      country: "Thailand",
      region: "Asia Tenggara",
      type: "Tourist",
      price: "Rp 450.000",
      originalPrice: "Rp 600.000",
      duration: "3-5 hari",
      validity: "60 hari",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
      countryCode: "th",
      isPromo: true
    },
    {
      slug: "malaysia",
      country: "Malaysia",
      region: "Asia Tenggara",
      type: "Tourist",
      price: "Rp 450.000",
      originalPrice: null,
      duration: "3-5 hari",
      validity: "30 hari",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
      countryCode: "my",
      isPromo: false
    },
    {
      slug: "amerika-serikat",
      country: "Amerika Serikat",
      region: "Amerika",
      type: "B1/B2",
      price: "Rp 3.000.000",
      originalPrice: null,
      duration: "30-60 hari",
      validity: "10 tahun",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
      countryCode: "us",
      isPromo: false
    },
    {
      slug: "kanada",
      country: "Kanada",
      region: "Amerika",
      type: "Tourist",
      price: "Rp 2.500.000",
      originalPrice: null,
      duration: "15-30 hari",
      validity: "180 hari",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
      countryCode: "ca",
      isPromo: false
    },
    {
      slug: "australia",
      country: "Australia",
      region: "Australia & Pasifik",
      type: "Tourist",
      price: "Rp 1.850.000",
      originalPrice: "Rp 2.200.000",
      duration: "10-15 hari",
      validity: "12 bulan",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
      countryCode: "au",
      isPromo: true
    },
    {
      slug: "dubai-uae",
      country: "Dubai (UAE)",
      region: "Timur Tengah",
      type: "Tourist",
      price: "Rp 1.200.000",
      originalPrice: null,
      duration: "3-5 hari",
      validity: "60 hari",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      countryCode: "ae",
      isPromo: false
    },
    {
      slug: "turki",
      country: "Turki",
      region: "Timur Tengah",
      type: "E-Visa",
      price: "Rp 800.000",
      originalPrice: null,
      duration: "1-3 hari",
      validity: "180 hari",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
      countryCode: "tr",
      isPromo: false
    }
  ]

  const regions = ["all", "Eropa", "Asia Timur", "Asia Tenggara", "Amerika", "Australia & Pasifik", "Timur Tengah"]

  // Filter visas
  const filteredVisas = visas.filter(visa => {
    const matchesSearch = visa.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visa.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === "all" || visa.region === selectedRegion
    const matchesPromo = !showPromoOnly || visa.isPromo
    return matchesSearch && matchesRegion && matchesPromo
  })

  // Pagination
  const totalPages = Math.ceil(filteredVisas.length / visasPerPage)
  const indexOfLastVisa = currentPage * visasPerPage
  const indexOfFirstVisa = indexOfLastVisa - visasPerPage
  const currentVisas = filteredVisas.slice(indexOfFirstVisa, indexOfLastVisa)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedRegion, showPromoOnly])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-navy to-navy-mid">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-poppins font-bold text-[36px] md:text-[48px] text-white leading-tight mb-4">
              Daftar Visa Lengkap
            </h1>
            <p className="font-poppins font-semibold text-[20px] md:text-[24px] text-orange mb-4">
              Urus Visa ke 35+ Negara
            </p>
            <p className="font-dm-sans text-[16px] md:text-[18px] text-gray-300 max-w-3xl mx-auto mb-8">
              Temukan visa yang Anda butuhkan dengan proses cepat, aman, dan terpercaya bersama WePose Travel.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari negara atau jenis visa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-navy placeholder-gray-400 font-dm-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-orange shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter by Region */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="flex flex-col gap-4">
            {/* Region Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-6 py-2.5 rounded-full font-dm-sans font-medium text-sm transition-all ${
                    selectedRegion === region
                      ? 'bg-orange text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {region === "all" ? "Semua Region" : region}
                </button>
              ))}
            </div>

            {/* Promo Filter */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowPromoOnly(!showPromoOnly)}
                className={`px-6 py-2.5 rounded-full font-dm-sans font-medium text-sm transition-all flex items-center gap-2 ${
                  showPromoOnly
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">🔥</span>
                Promo Spesial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visas Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-[1280px]">
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="font-dm-sans text-gray-600">
              Ditemukan <span className="font-semibold text-navy">{filteredVisas.length}</span> visa
              {searchQuery && ` untuk "${searchQuery}"`}
            </p>
          </motion.div>

          {filteredVisas.length > 0 ? (
            <motion.div
              key={`${currentPage}-${selectedRegion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {currentVisas.map((visa, idx) => (
                <motion.div
                  key={`${currentPage}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * idx, ease: "easeOut" }}
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="bg-white rounded-[16px] shadow-md hover:shadow-xl overflow-hidden cursor-pointer border border-gray-100 transition-shadow duration-300"
                >
                  <Link href={`/visa/${visa.slug}`} className="block">
                    {/* Image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <Image
                        src={visa.image}
                        alt={visa.country}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Flag */}
                      <div className="absolute top-4 left-4">
                        <Flag countryCode={visa.countryCode} size="lg" />
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-orange text-white text-[10px] font-poppins font-bold px-3 py-1.5 rounded-full uppercase">
                          {visa.type}
                        </span>
                      </div>

                      {/* Promo Badge */}
                      {visa.isPromo && (
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-red-500 text-white text-[10px] font-poppins font-bold px-3 py-1.5 rounded-full uppercase flex items-center gap-1">
                            <span>🔥</span>
                            PROMO
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-poppins font-bold text-[18px] text-navy mb-2">
                        {visa.country}
                      </h3>
                      <p className="font-dm-sans text-[12px] text-gray-500 mb-3">
                        {visa.region}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CurrencyDollarIcon className="w-4 h-4 text-orange" />
                          <div className="flex items-center gap-2">
                            <span className="font-dm-sans text-[13px] font-semibold text-orange">{visa.price}</span>
                            {visa.originalPrice && (
                              <span className="font-dm-sans text-[11px] text-gray-400 line-through">{visa.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <ClockIcon className="w-4 h-4 text-orange" />
                          <span className="font-dm-sans text-[13px]">Proses: {visa.duration}</span>
                        </div>
                      </div>

                      <button className="w-full bg-orange hover:bg-orange-dark text-white rounded-full py-2.5 font-poppins font-semibold text-[13px] transition-colors">
                        Lihat Detail
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="font-poppins text-[20px] text-gray-600 mb-2">
                Tidak ada visa ditemukan
              </p>
              <p className="font-dm-sans text-gray-500">
                Coba kata kunci lain atau pilih region berbeda
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredVisas.length > visasPerPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex justify-center items-center gap-2"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-dm-sans font-medium text-sm transition-all ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-navy hover:bg-orange hover:text-white hover:border-orange'
                }`}
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-full font-dm-sans font-medium text-sm transition-all ${
                      currentPage === pageNumber
                        ? 'bg-orange text-white'
                        : 'bg-white border border-gray-200 text-navy hover:bg-orange hover:text-white hover:border-orange'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-dm-sans font-medium text-sm transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-navy hover:bg-orange hover:text-white hover:border-orange'
                }`}
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
