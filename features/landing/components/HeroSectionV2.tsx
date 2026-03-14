"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ScaleIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  SparklesIcon,
  GiftIcon,
  ClockIcon
} from "@heroicons/react/24/outline"
import { WorldMap } from "@/shared/ui/WorldMap"

export default function HeroSectionV2() {
  const [activeTab, setActiveTab] = useState("visa")
  const [toCountry, setToCountry] = useState("")
  const [applicantCount, setApplicantCount] = useState(1)
  const [departureDate, setDepartureDate] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const dateRef = useRef<HTMLDivElement>(null)

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const tabs = [
    { id: "visa", label: "Visa", icon: DocumentTextIcon },
    { id: "quiz", label: "Quiz Kelayakan", icon: ClipboardDocumentListIcon },
    { id: "compare", label: "Bandingkan Visa", icon: ScaleIcon },
    { id: "sponsor", label: "Surat Sponsor", icon: DocumentDuplicateIcon },
  ]

  const mapDots = [
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 48.8, lng: 2.3, label: "Paris" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 35.6, lng: 139.7, label: "Tokyo" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 37.5, lng: 127.0, label: "Seoul" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 51.5, lng: -0.1, label: "London" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 40.7, lng: -74.0, label: "New York" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: -33.8, lng: 151.2, label: "Sydney" } },
  ];

  return (
    <section className="relative min-h-screen bg-navy flex items-center justify-center pt-20 pb-16 overflow-hidden">
      
      {/* Background Map - Same as original */}
      <div className="absolute inset-0 opacity-30">
        <WorldMap dots={mapDots} lineColor="#F97316" loop={false} />
      </div>

      <div className="container mx-auto px-4 max-w-[1200px] z-10 relative">
        
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-poppins font-bold text-[42px] md:text-[56px] text-white leading-tight mb-4">
            Solusi visa terpercaya untuk
            <br />
            <span className="text-orange">jelajahi dunia</span>
          </h1>
          <p className="font-dm-sans text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
            Urus visa ke 35+ negara dengan mudah, cepat, dan aman bersama tim profesional 
            <span className="inline-flex items-center mx-1">
              <span>WEP</span>
              <img 
                src="/wepose-logo-mini.svg" 
                alt="Wepose Logo" 
                className="w-3 h-3 mx-0.5"
              />
              <span>SE</span>
            </span>
          </p>
        </motion.div>

        {/* Service Tabs - Seamless with background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab Navigation - Floating style */}
          <div className="flex mb-6 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-dm-sans font-medium text-sm rounded-full transition-all ${
                    activeTab === tab.id
                      ? "text-white font-bold bg-white/20 shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Search Form - Completely seamless */}
          <div className="">
            {activeTab === "visa" && (
              <div className="space-y-4">
                {/* Visa Type Pills */}
                <div className="flex gap-2 mb-4">
                  <button className="bg-orange text-white px-4 py-2 rounded-full text-sm font-dm-sans font-medium">
                    Tourist Visa
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-full text-sm font-dm-sans font-medium border border-white/20 hover:bg-white/20 transition-all">
                    Business Visa
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-full text-sm font-dm-sans font-medium border border-white/20 hover:bg-white/20 transition-all">
                    Student Visa
                  </button>
                </div>

                {/* Country Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* From Country */}
                  <div className="relative">
                    <input
                      type="text"
                      value="Indonesia"
                      className="w-full px-4 py-4 bg-white/15 backdrop-blur-sm border-0 rounded-xl font-dm-sans text-white placeholder-white/50 focus:ring-2 focus:ring-orange/50 focus:bg-white/25 transition-all text-lg"
                      placeholder="Negara asal"
                      readOnly
                    />
                  </div>

                  {/* To Country */}
                  <div className="relative">
                    <input
                      type="text"
                      value={toCountry}
                      onChange={(e) => setToCountry(e.target.value)}
                      className="w-full px-4 py-4 pl-12 bg-white/15 backdrop-blur-sm border-0 rounded-xl font-dm-sans text-white placeholder-white/50 focus:ring-2 focus:ring-orange/50 focus:bg-white/25 transition-all text-lg"
                      placeholder="Negara tujuan visa..."
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-5 w-5 h-5 text-white/50" />
                  </div>
                </div>

                {/* Applicant Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Applicant Counter */}
                  <div className="relative">
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <UserGroupIcon className="w-5 h-5 text-white/60" />
                          <div className="text-left">
                            <div className="text-white font-dm-sans text-sm">
                              {applicantCount} {applicantCount === 1 ? 'Pemohon' : 'Pemohon'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setApplicantCount(Math.max(1, applicantCount - 1))}
                            disabled={applicantCount <= 1}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              applicantCount <= 1 
                                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setApplicantCount(Math.min(10, applicantCount + 1))}
                            disabled={applicantCount >= 10}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              applicantCount >= 10 
                                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Departure Date */}
                  <div className="relative" ref={dateRef}>
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="w-full bg-white/15 backdrop-blur-sm rounded-xl p-4 border-0 hover:bg-white/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CalendarDaysIcon className="w-5 h-5 text-white/60" />
                          <div className="text-left">
                            <div className="text-white font-dm-sans text-sm">
                              {departureDate ? new Date(departureDate).toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              }) : 'Tanggal Keberangkatan'}
                            </div>
                          </div>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 text-white/60 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    {/* Date Picker */}
                    {showDatePicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 p-4 z-10">
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => {
                            setDepartureDate(e.target.value)
                            setShowDatePicker(false)
                          }}
                          className="w-full bg-white/20 backdrop-blur-sm border-0 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-orange/50 focus:bg-white/30 transition-all"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Button - Full width, prominent */}
                <div className="">
                  <button className="w-full bg-orange hover:bg-orange-600 text-white font-poppins font-bold py-5 px-8 rounded-xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                    <PaperAirplaneIcon className="w-6 h-6" />
                    Cari Visa Sekarang
                  </button>
                </div>
              </div>
            )}

            {/* Other tabs content - also seamless */}
            {activeTab === "quiz" && (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="font-poppins font-bold text-2xl text-white mb-4">Quiz Kelayakan Visa</h3>
                <p className="font-dm-sans text-white/80 mb-8 text-lg">Cek kelayakan visa kamu dengan quiz interaktif</p>
                <button className="bg-orange hover:bg-orange-600 text-white font-poppins font-semibold py-4 px-10 rounded-xl transition-all hover:shadow-lg">
                  Mulai Quiz
                </button>
              </div>
            )}

            {activeTab === "compare" && (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="font-poppins font-bold text-2xl text-white mb-4">Bandingkan Visa</h3>
                <p className="font-dm-sans text-white/80 mb-8 text-lg">Bandingkan persyaratan dan biaya visa antar negara</p>
                <button className="bg-orange hover:bg-orange-600 text-white font-poppins font-semibold py-4 px-10 rounded-xl transition-all hover:shadow-lg">
                  Mulai Bandingkan
                </button>
              </div>
            )}

            {activeTab === "sponsor" && (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="font-poppins font-bold text-2xl text-white mb-4">Generator Surat Sponsor</h3>
                <p className="font-dm-sans text-white/80 mb-8 text-lg">Buat surat sponsor profesional dalam hitungan menit</p>
                <button className="bg-orange hover:bg-orange-600 text-white font-poppins font-semibold py-4 px-10 rounded-xl transition-all hover:shadow-lg">
                  Buat Surat
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Promo Banner - Integrated with different color theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-navy-mid via-navy to-navy-dark py-4 relative overflow-hidden rounded-2xl max-w-4xl mx-auto mt-8 border border-orange/20"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
            <div className="flex items-center justify-between">
              
              {/* Left Content */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center border border-orange/30">
                    <GiftIcon className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-white text-lg">
                      Promo Spesial Visa
                    </h3>
                    <p className="font-dm-sans text-gray-300 text-sm">
                      Diskon hingga 25% untuk visa Schengen & Jepang
                    </p>
                  </div>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-gray-300">
                  <ClockIcon className="w-4 h-4 text-orange" />
                  <span className="font-dm-sans text-sm">Berlaku sampai 31 Maret</span>
                </div>
                <button className="bg-orange hover:bg-orange-600 text-white font-poppins font-semibold py-2 px-6 rounded-full transition-all hover:scale-105 shadow-lg border border-orange-400">
                  Klaim Sekarang
                </button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}