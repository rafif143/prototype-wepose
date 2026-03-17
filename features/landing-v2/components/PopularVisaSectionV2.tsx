"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { ScaleIcon, ArrowRightIcon, ClockIcon, CalendarDaysIcon, XMarkIcon, CheckIcon, BanknotesIcon, BoltIcon, DocumentIcon, BuildingOfficeIcon, DocumentArrowDownIcon, UserGroupIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { Flag } from '@/shared/ui/Flag';

// Helper component for comparison rows
function ComparisonRow({ 
  label, 
  icon, 
  values, 
  highlightBest = false, 
  highlightWorst = false,
  compareType 
}: { 
  label: string
  icon: React.ReactNode
  values: string[]
  highlightBest?: boolean
  highlightWorst?: boolean
  compareType?: 'price' | 'time'
}) {
  let bestIndices: number[] = []
  let worstIndices: number[] = []

  if (highlightBest || highlightWorst) {
    if (compareType === 'price') {
      const prices = values.map(v => parseInt(v.replace(/[^0-9]/g, '')))
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      bestIndices = prices.map((p, i) => p === minPrice ? i : -1).filter(i => i !== -1)
      worstIndices = prices.map((p, i) => p === maxPrice ? i : -1).filter(i => i !== -1)
    } else if (compareType === 'time') {
      const times = values.map(v => {
        const match = v.match(/(\d+)/)
        return match ? parseInt(match[1]) : 0
      })
      const minTime = Math.min(...times)
      const maxTime = Math.max(...times)
      bestIndices = times.map((t, i) => t === minTime ? i : -1).filter(i => i !== -1)
      worstIndices = times.map((t, i) => t === maxTime ? i : -1).filter(i => i !== -1)
    }
  }

  return (
    <tr className="bg-gray-50">
      <td className="px-3 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-[11px] font-dm-sans text-gray-600">
            {label}
          </span>
        </div>
      </td>
      {values.map((value, index) => {
        const isBest = bestIndices.includes(index)
        const isWorst = worstIndices.includes(index)
        
        return (
          <motion.td
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * index }}
            className={`px-3 py-2.5 text-center border-b border-gray-100 relative ${
              isBest
                ? 'bg-[#DCFCE7]'
                : isWorst
                ? 'bg-[#FEE2E2]'
                : ''
            }`}
          >
            <span className="text-[12px] font-dm-sans text-navy font-medium">{value}</span>
            {isBest && (
              <StarIcon className="w-2.5 h-2.5 text-green-600 absolute top-1.5 right-1.5" />
            )}
          </motion.td>
        )
      })}
    </tr>
  )
}

export default function PopularVisaSectionV2() {
  const router = useRouter()
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [selectedVisa, setSelectedVisa] = useState<any>(null)
  const [compareWith, setCompareWith] = useState<string[]>([])
  const promoScrollRef = useRef<HTMLDivElement>(null)
  
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const visas = [
    {
      country: "France Schengen",
      countryName: "Prancis",
      type: "Tourist",
      slug: "france-schengen-tourist",
      countryCode: "fr",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop",
      time: "15-20 hari",
      stay: "90 hari tinggal",
      price: "Rp 1.850.000",
      gradient: "from-[#0F1F3D] to-[#1E3A5F]",
      badges: ["Multiple Entry", "Fast Track"]
    },
    {
      country: "Jepang",
      countryName: "Jepang",
      type: "Tourist",
      slug: "japan-tourist",
      countryCode: "jp",
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
      time: "7-10 hari",
      stay: "15 hari tinggal",
      price: "Rp 950.000",
      gradient: "from-[#DC2626] to-[#991B1B]",
      badges: ["Single Entry", "E-Visa Optional"]
    },
    {
      country: "Korea Selatan",
      countryName: "Korea Selatan",
      type: "Tourist",
      slug: "korea-tourist",
      countryCode: "kr",
      coverImage: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=400&auto=format&fit=crop",
      time: "5-7 hari",
      stay: "30 hari tinggal",
      price: "Rp 850.000",
      gradient: "from-[#1D4ED8] to-[#1E40AF]",
      badges: ["Single Entry", "Promo"]
    },
    {
      country: "Australia",
      countryName: "Australia",
      type: "Tourist",
      slug: "australia-tourist",
      countryCode: "au",
      coverImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=400&auto=format&fit=crop",
      time: "10-15 hari",
      stay: "3 bulan tinggal",
      price: "Rp 1.250.000",
      gradient: "from-[#15803D] to-[#166534]",
      badges: ["E-Visa", "Multiple Entry"]
    },
    {
      country: "Amerika",
      countryName: "Amerika Serikat",
      type: "B1/B2",
      slug: "usa-b1-b2",
      countryCode: "us",
      coverImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=400&auto=format&fit=crop",
      time: "30-60 hari",
      stay: "6 bulan tinggal",
      price: "Rp 3.500.000",
      gradient: "from-[#7C3AED] to-[#6D28D9]",
      badges: ["10 Tahun", "Wawancara"]
    },
    {
      country: "United Kingdom",
      countryName: "Inggris",
      type: "Standard",
      slug: "uk-standard",
      countryCode: "gb",
      coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&auto=format&fit=crop",
      time: "20-30 hari",
      stay: "6 bulan tinggal",
      price: "Rp 2.100.000",
      gradient: "from-[#B45309] to-[#92400E]",
      badges: ["Multiple Entry", "Biometric"]
    }
  ]

  const handleCompareClick = (e: React.MouseEvent, visa: any) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedVisa(visa)
    setCompareWith([])
    setShowCompareModal(true)
  }

  const toggleCompareVisa = (visaSlug: string) => {
    setCompareWith(prev => 
      prev.includes(visaSlug) 
        ? prev.filter(slug => slug !== visaSlug)
        : prev.length < 2 
          ? [...prev, visaSlug]
          : prev
    )
  }

  const [showComparisonTable, setShowComparisonTable] = useState(false)
  const [comparedVisas, setComparedVisas] = useState<any[]>([])

  const handleStartComparison = () => {
    if (compareWith.length > 0 && selectedVisa) {
      // Get the selected visas for comparison
      const selectedVisasForComparison = [
        selectedVisa,
        ...visas.filter(v => compareWith.includes(v.slug))
      ]
      setComparedVisas(selectedVisasForComparison)
      setShowCompareModal(false)
      setShowComparisonTable(true)
    }
  }

  const handleCloseComparison = () => {
    setShowComparisonTable(false)
    setComparedVisas([])
    setCompareWith([])
  }

  const handleRemoveFromComparison = (slug: string) => {
    const updated = comparedVisas.filter(v => v.slug !== slug)
    if (updated.length < 2) {
      // If less than 2 visas, close the comparison
      handleCloseComparison()
    } else {
      setComparedVisas(updated)
    }
  }

  // Carousel navigation functions
  const scrollPromoLeft = () => {
    if (promoScrollRef.current) {
      promoScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollPromoRight = () => {
    if (promoScrollRef.current) {
      promoScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section id="popular-visa" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header - Left Aligned */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
            >
              Destinasi Favorit Pelanggan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="font-dm-sans text-base text-gray-600"
            >
              Temukan visa yang sesuai dengan kebutuhanmu
            </motion.p>
          </div>
          
          {/* Right side CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="hidden md:block"
          >
            <Link href="/visa" className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
              Lihat Semua
              <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visas.map((visa, idx) => {
            return (
              <motion.div
                key={idx}
                variants={itemAnim}
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                className="bg-white rounded-[20px] shadow-md hover:shadow-xl overflow-hidden cursor-pointer flex flex-col border border-gray-100 group"
              >
                <Link href={`/visa/${visa.slug}`} className="flex flex-col h-full">
                  {/* Cover Top with Bigger Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={visa.coverImage}
                      alt={visa.country}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Type Badge */}
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-navy text-[12px] font-poppins font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {visa.type}
                    </span>
                    
                    {/* Flag Circle with SVG - Bigger */}
                    <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-3 border-white">
                      <Flag countryCode={visa.countryCode} className="w-full h-full object-cover" />
                    </div>

                    {/* Country Name Overlay */}
                    <div className="absolute bottom-4 right-4">
                      <h3 className="font-poppins font-bold text-[18px] text-white drop-shadow-lg">
                        {visa.countryName}
                      </h3>
                    </div>
                  </div>

                {/* Body - More Compact */}
                <div className="p-5 flex-1 flex flex-col bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-poppins font-semibold text-[16px] text-navy">
                      Visa {visa.type}
                    </h4>
                    <div className="font-poppins font-bold text-[16px] text-orange">
                      {visa.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 font-dm-sans text-[13px] text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{visa.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{visa.stay}</span>
                    </div>
                  </div>

                  {/* Add-on badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {visa.badges.map(badge => (
                      <span key={badge} className="bg-orange-50 text-orange-dark text-[11px] font-dm-sans font-medium px-2.5 py-1 rounded-full border border-orange-100">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Footer Card */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <button 
                      onClick={(e) => handleCompareClick(e, visa)}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-orange transition-colors font-dm-sans text-[13px] font-medium cursor-pointer"
                    >
                      <ScaleIcon className="w-4 h-4" />
                      Bandingkan
                    </button>
                    <span className="bg-orange text-white text-[13px] font-poppins font-semibold px-5 py-2 rounded-full hover:bg-orange-dark transition-colors cursor-pointer shadow-sm">
                      Lihat Detail →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center md:hidden"
        >
          <Link href="/visa" className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200">
            Lihat Semua 100+ Visa
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </motion.div>

        {/* Promo Header - Left Aligned with Navigation */}
        <div className="flex items-end justify-between mb-8 mt-16">
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-poppins font-semibold text-[24px] md:text-[28px] text-navy mb-2"
            >
              Promo Visa Murah
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="font-dm-sans text-base text-gray-600"
            >
              Hemat hingga 40% untuk visa pilihan terbaik
            </motion.p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-2"
            >
              <button
                onClick={scrollPromoLeft}
                className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-orange hover:bg-orange-50 flex items-center justify-center transition-all duration-200 group"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600 group-hover:text-orange" />
              </button>
              <button
                onClick={scrollPromoRight}
                className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-orange hover:bg-orange-50 flex items-center justify-center transition-all duration-200 group"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:text-orange" />
              </button>
            </motion.div>

            {/* Right side CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <Link href="/visa" className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
                Lihat Semua Promo
                <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Promo Carousel Container */}
        <div className="relative">
          {/* Scrollable Container */}
          <div 
            ref={promoScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              {
                country: "Thailand",
                countryName: "Thailand",
                type: "Tourist",
                slug: "thailand-tourist",
                countryCode: "th",
                coverImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=400&auto=format&fit=crop",
                time: "3-5 hari",
                stay: "30 hari tinggal",
                originalPrice: "Rp 750.000",
                price: "Rp 450.000",
                discount: "40%",
                badges: ["Visa on Arrival", "Promo"]
              },
              {
                country: "Malaysia",
                countryName: "Malaysia", 
                type: "Tourist",
                slug: "malaysia-tourist",
                countryCode: "my",
                coverImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400&auto=format&fit=crop",
                time: "1-2 hari",
                stay: "30 hari tinggal",
                originalPrice: "Rp 500.000",
                price: "Rp 350.000",
                discount: "30%",
                badges: ["E-Visa", "Same Day"]
              },
              {
                country: "Singapura",
                countryName: "Singapura",
                type: "Tourist",
                slug: "singapore-tourist", 
                countryCode: "sg",
                coverImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=400&auto=format&fit=crop",
                time: "2-3 hari",
                stay: "30 hari tinggal",
                originalPrice: "Rp 650.000",
                price: "Rp 450.000",
                discount: "31%",
                badges: ["E-Visa", "Multiple Entry"]
              },
              {
                country: "Vietnam",
                countryName: "Vietnam",
                type: "Tourist",
                slug: "vietnam-tourist",
                countryCode: "vn",
                coverImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=400&auto=format&fit=crop",
                time: "3-5 hari",
                stay: "30 hari tinggal", 
                originalPrice: "Rp 800.000",
                price: "Rp 550.000",
                discount: "31%",
                badges: ["E-Visa", "Promo Spesial"]
              },
              {
                country: "Cambodia",
                countryName: "Kamboja",
                type: "Tourist",
                slug: "cambodia-tourist",
                countryCode: "kh",
                coverImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=400&auto=format&fit=crop",
                time: "2-4 hari",
                stay: "30 hari tinggal",
                originalPrice: "Rp 600.000",
                price: "Rp 400.000",
                discount: "33%",
                badges: ["E-Visa", "Fast Process"]
              },
              {
                country: "Laos",
                countryName: "Laos",
                type: "Tourist",
                slug: "laos-tourist",
                countryCode: "la",
                coverImage: "https://images.unsplash.com/photo-1570366583862-f91883984fde?q=80&w=400&auto=format&fit=crop",
                time: "3-5 hari",
                stay: "30 hari tinggal",
                originalPrice: "Rp 700.000",
                price: "Rp 480.000",
                discount: "31%",
                badges: ["Visa on Arrival", "Budget Friendly"]
              }
            ].map((visa, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1 * idx, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="bg-white rounded-[20px] shadow-md hover:shadow-xl overflow-hidden cursor-pointer flex flex-col border border-orange-100 relative ring-1 ring-orange-100 group flex-shrink-0 w-[280px]"
                >
                  <Link href={`/visa/${visa.slug}`} className="flex flex-col h-full">
                    {/* Promo Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[11px] font-poppins font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                      HEMAT {visa.discount}
                    </div>

                    {/* Cover Top with Bigger Image */}
                    <div className="relative h-[160px] overflow-hidden">
                      <Image
                        src={visa.coverImage}
                        alt={visa.country}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Type Badge */}
                      <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-navy text-[11px] font-poppins font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {visa.type}
                      </span>
                      
                      {/* Flag Circle - Bigger */}
                      <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-2 border-white">
                        <Flag countryCode={visa.countryCode} className="w-full h-full object-cover" />
                      </div>

                      {/* Country Name Overlay */}
                      <div className="absolute bottom-3 right-3">
                        <h3 className="font-poppins font-bold text-[16px] text-white drop-shadow-lg">
                          {visa.countryName}
                        </h3>
                      </div>
                    </div>

                    {/* Body - More Compact */}
                    <div className="p-4 flex-1 flex flex-col bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-poppins font-semibold text-[15px] text-navy">
                          Visa {visa.type}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-3 font-dm-sans text-[12px] text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3.5 h-3.5" />
                          <span>{visa.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDaysIcon className="w-3.5 h-3.5" />
                          <span>{visa.stay}</span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-dm-sans text-[11px] text-gray-400 line-through">
                            {visa.originalPrice}
                          </span>
                          <span className="bg-red-100 text-red-600 text-[10px] font-poppins font-bold px-2 py-0.5 rounded-full">
                            -{visa.discount}
                          </span>
                        </div>
                        <div className="font-poppins font-bold text-[16px] text-orange">
                          {visa.price}
                        </div>
                      </div>

                      {/* Add-on badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {visa.badges.map(badge => (
                          <span key={badge} className="bg-orange-50 text-orange-dark text-[10px] font-dm-sans font-medium px-2 py-0.5 rounded-full border border-orange-100">
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Footer Card */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                        <button 
                          onClick={(e) => handleCompareClick(e, visa)}
                          className="flex items-center gap-1 text-gray-500 hover:text-orange transition-colors font-dm-sans text-[12px] font-medium cursor-pointer"
                        >
                          <ScaleIcon className="w-3.5 h-3.5" />
                          Bandingkan
                        </button>
                        <span className="bg-orange text-white text-[12px] font-poppins font-semibold px-4 py-1.5 rounded-full hover:bg-orange-dark transition-colors cursor-pointer shadow-sm">
                          Ambil Promo →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile CTA for Promo */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center md:hidden"
        >
          <Link href="/visa" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-full font-poppins font-semibold text-[15px] hover:bg-navy-dark hover:shadow-lg transition-all duration-200">
            Lihat Semua Promo Visa
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </motion.div>

        {/* Compare Selection Modal */}
        <AnimatePresence>
          {showCompareModal && selectedVisa && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCompareModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCompareModal(false)}
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-[24px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-navy to-navy-mid p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <button
                        onClick={() => setShowCompareModal(false)}
                        className="absolute top-0 right-0 text-white/60 hover:text-white transition-colors"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20">
                          <Flag countryCode={selectedVisa.countryCode} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-poppins font-bold text-xl text-white">
                            Bandingkan Visa {selectedVisa.country}
                          </h3>
                          <p className="font-dm-sans text-sm text-white/70">
                            Pilih 1-2 visa lain untuk dibandingkan
                          </p>
                        </div>
                      </div>
                      
                      {/* Selected Count */}
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                        <ScaleIcon className="w-4 h-4 text-orange" />
                        <span className="font-dm-sans text-sm text-white">
                          {compareWith.length} / 2 visa dipilih
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 max-h-[50vh] overflow-y-auto">
                    <div className="grid grid-cols-1 gap-3">
                      {visas
                        .filter(v => v.slug !== selectedVisa.slug)
                        .map((visa) => {
                          const isSelected = compareWith.includes(visa.slug)
                          const isDisabled = !isSelected && compareWith.length >= 2

                          return (
                            <motion.button
                              key={visa.slug}
                              onClick={() => !isDisabled && toggleCompareVisa(visa.slug)}
                              disabled={isDisabled}
                              whileHover={!isDisabled ? { scale: 1.02 } : {}}
                              whileTap={!isDisabled ? { scale: 0.98 } : {}}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                isSelected
                                  ? 'border-orange bg-orange-50'
                                  : isDisabled
                                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                  : 'border-gray-200 hover:border-orange/50 hover:bg-orange-50/30'
                              }`}
                            >
                              {/* Checkbox */}
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'border-orange bg-orange'
                                  : 'border-gray-300'
                              }`}>
                                {isSelected && <CheckIcon className="w-4 h-4 text-white stroke-[3]" />}
                              </div>

                              {/* Flag */}
                              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                                <Flag countryCode={visa.countryCode} className="w-full h-full object-cover" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 text-left">
                                <h4 className="font-poppins font-semibold text-[15px] text-navy">
                                  {visa.country}
                                </h4>
                                <div className="flex items-center gap-2 text-[12px] text-gray-500 font-dm-sans mt-0.5">
                                  <span>{visa.time}</span>
                                  <span>•</span>
                                  <span className="text-orange font-semibold">{visa.price}</span>
                                </div>
                              </div>
                            </motion.button>
                          )
                        })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowCompareModal(false)}
                        className="flex-1 px-6 py-3 rounded-full border-2 border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-gray-300 hover:bg-white transition-all duration-200"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleStartComparison}
                        disabled={compareWith.length === 0}
                        className={`flex-1 px-6 py-3 rounded-full font-poppins font-semibold text-[15px] transition-all duration-200 ${
                          compareWith.length > 0
                            ? 'bg-orange text-white hover:bg-orange-dark hover:shadow-cta-hover'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Bandingkan Sekarang ({compareWith.length + 1})
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Comparison Table Modal */}
        <AnimatePresence>
          {showComparisonTable && comparedVisas.length >= 2 && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseComparison}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />

              {/* Compact Modal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={handleCloseComparison}
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-[20px] shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
                >
                  {/* Compact Header */}
                  <div className="bg-gradient-to-r from-navy to-navy-mid px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <ScaleIcon className="w-5 h-5 text-orange" />
                      <h2 className="font-poppins font-bold text-lg text-white">
                        Perbandingan Visa
                      </h2>
                      <span className="bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-dm-sans text-white">
                        {comparedVisas.length} visa
                      </span>
                    </div>
                    <button
                      onClick={handleCloseComparison}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Comparison Table */}
                  <div className="flex-1 overflow-auto p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        {/* Header Row */}
                        <thead className="sticky top-0 z-10 bg-white">
                          <tr>
                            {/* Criteria Column Header */}
                            <th className="bg-gray-50 w-[140px] px-3 py-2 text-left border-b border-gray-200">
                              <span className="text-[11px] font-dm-sans font-semibold text-gray-600 uppercase tracking-wide">
                                Kriteria
                              </span>
                            </th>

                            {/* Visa Column Headers */}
                            {comparedVisas.map((visa) => {
                              return (
                                <th
                                  key={visa.slug}
                                  className="bg-gradient-to-b from-navy/5 to-white px-3 py-3 min-w-[180px] border-b border-gray-200"
                                >
                                  <div className="flex flex-col items-center gap-2">
                                    <button
                                      onClick={() => handleRemoveFromComparison(visa.slug)}
                                      className="self-end text-gray-400 hover:text-gray-600 transition-colors -mt-1"
                                      aria-label={`Remove ${visa.country}`}
                                    >
                                      <XMarkIcon className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                      <Flag countryCode={visa.countryCode} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[13px] font-poppins font-semibold text-navy text-center leading-tight">
                                      {visa.country}
                                    </span>
                                    <Link
                                      href={`/visa/${visa.slug}`}
                                      className="w-full bg-orange text-white font-poppins font-semibold text-[11px] py-1.5 px-3 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] active:scale-[0.97] transition-all duration-200"
                                    >
                                      Lihat Detail →
                                    </Link>
                                  </div>
                                </th>
                              )
                            })}
                          </tr>
                        </thead>

                        {/* Comparison Rows */}
                        <tbody>
                          {/* Price */}
                          <ComparisonRow
                            label="Harga"
                            icon={<BanknotesIcon className="w-3.5 h-3.5 text-gray-400" />}
                            values={comparedVisas.map(v => v.price)}
                            highlightBest
                            highlightWorst
                            compareType="price"
                          />

                          {/* Processing Time */}
                          <ComparisonRow
                            label="Waktu Proses"
                            icon={<ClockIcon className="w-3.5 h-3.5 text-gray-400" />}
                            values={comparedVisas.map(v => v.time)}
                            highlightBest
                            highlightWorst
                            compareType="time"
                          />

                          {/* Stay Duration */}
                          <ComparisonRow
                            label="Durasi Tinggal"
                            icon={<CalendarDaysIcon className="w-3.5 h-3.5 text-gray-400" />}
                            values={comparedVisas.map(v => v.stay)}
                          />

                          {/* Visa Type */}
                          <ComparisonRow
                            label="Jenis Visa"
                            icon={<DocumentIcon className="w-3.5 h-3.5 text-gray-400" />}
                            values={comparedVisas.map(v => v.type)}
                          />

                          {/* Badges */}
                          <tr className="bg-white">
                            <td className="px-3 py-2.5 border-b border-gray-100">
                              <div className="flex items-center gap-1.5">
                                <BoltIcon className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-[11px] font-dm-sans text-gray-600">
                                  Keunggulan
                                </span>
                              </div>
                            </td>
                            {comparedVisas.map((visa) => (
                              <td key={visa.slug} className="px-3 py-2.5 border-b border-gray-100">
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {visa.badges.map((badge: string) => (
                                    <span key={badge} className="bg-orange-50 text-orange-dark text-[9px] font-dm-sans px-1.5 py-0.5 rounded-full border border-orange-100">
                                      {badge}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}