"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Bars3Icon, GlobeAltIcon, GlobeEuropeAfricaIcon, MapIcon, BuildingOffice2Icon, AcademicCapIcon, BriefcaseIcon, UserGroupIcon, HomeModernIcon, FireIcon, BoltIcon, TagIcon, SparklesIcon, LightBulbIcon, ScaleIcon } from "@heroicons/react/24/outline"

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { scrollY } = useScroll()
  const navBackground = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.8)"] // white to transparent white
  )
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 1px 3px 0 rgba(0, 0, 0, 0.1)", "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"]
  )

  const megaMenuRef = useRef<HTMLDivElement>(null)

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const navHeight = 64 // navbar height
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Close mega menu on click outside or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false)
      }
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMegaMenuOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center backdrop-blur-md"
        style={{ 
          background: navBackground,
          boxShadow: navShadow 
        }}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-[1280px] w-full flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-poppins font-bold text-[22px] tracking-tight text-navy">WE</span>
            <span className="font-poppins font-bold text-[22px] tracking-tight text-orange">POSE</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 h-full">
            <Link href="/" className="font-dm-sans font-medium text-[15px] text-orange hover:text-orange-dark transition-colors duration-150 relative group">
              Home
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"></span>
            </Link>
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="font-dm-sans font-medium text-[15px] text-orange hover:text-orange-dark transition-colors duration-150 relative group cursor-pointer"
            >
              About
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"></span>
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className="font-dm-sans font-medium text-[15px] text-gray-500 hover:text-orange transition-colors duration-150 relative group cursor-pointer"
            >
              Cara Kerja
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            
            {/* Visa Solutions - Simple Link */}
            <a 
              href="#popular-visa" 
              onClick={(e) => handleSmoothScroll(e, '#popular-visa')}
              className="font-dm-sans font-medium text-[15px] text-gray-500 hover:text-orange transition-colors duration-150 relative group cursor-pointer"
            >
              Visa Solutions
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            
            {/* Tools with Mega Menu - 3 Columns */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              ref={megaMenuRef}
            >
              <button 
                className={`font-dm-sans font-medium text-[15px] transition-colors duration-150 h-full flex items-center border-b-2 border-transparent relative
                  ${isMegaMenuOpen ? 'text-orange border-orange' : 'text-gray-500 hover:text-orange'}
                `}
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              >
                Tools
              </button>

              {/* Mega Menu Desktop - Tools with 3 Columns */}
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-[64px] left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-b-[12px] shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="p-6 grid grid-cols-3 gap-8">
                      {/* Col 1 - Berdasarkan Region */}
                      <div>
                        <h4 className="font-poppins font-semibold text-[11px] uppercase text-gray-400 mb-2">Berdasarkan Region</h4>
                        <ul className="flex flex-col gap-1">
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <GlobeEuropeAfricaIcon className="w-4 h-4" />
                              Schengen / Eropa
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <MapIcon className="w-4 h-4" />
                              Asia Timur
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <MapIcon className="w-4 h-4" />
                              Asia Tenggara
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <GlobeAltIcon className="w-4 h-4" />
                              Amerika
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <BuildingOffice2Icon className="w-4 h-4" />
                              Timur Tengah
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <MapIcon className="w-4 h-4" />
                              Australia & Pasifik
                            </Link>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Col 2 - Berdasarkan Tujuan */}
                      <div>
                        <h4 className="font-poppins font-semibold text-[11px] uppercase text-gray-400 mb-2">Berdasarkan Tujuan</h4>
                        <ul className="flex flex-col gap-1">
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <GlobeAltIcon className="w-4 h-4" />
                              Wisata
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <BriefcaseIcon className="w-4 h-4" />
                              Bisnis
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <AcademicCapIcon className="w-4 h-4" />
                              Studi
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <BriefcaseIcon className="w-4 h-4" />
                              Kerja
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <UserGroupIcon className="w-4 h-4" />
                              Keluarga
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <HomeModernIcon className="w-4 h-4" />
                              Tinggal
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Col 3 - Featured */}
                      <div>
                        <h4 className="font-poppins font-semibold text-[11px] uppercase text-gray-400 mb-2">Featured</h4>
                        <ul className="flex flex-col gap-1">
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <FireIcon className="w-4 h-4" />
                              Trending Visa
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <BoltIcon className="w-4 h-4" />
                              Proses Tercepat
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <TagIcon className="w-4 h-4" />
                              Promo Aktif
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <SparklesIcon className="w-4 h-4" />
                              Visa Terbaru
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <LightBulbIcon className="w-4 h-4" />
                              Quiz Kelayakan
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <ScaleIcon className="w-4 h-4" />
                              Bandingkan Visa
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="#extra-services" 
              onClick={(e) => handleSmoothScroll(e, '#extra-services')}
              className="font-dm-sans font-medium text-[15px] text-gray-500 hover:text-orange transition-colors duration-150 relative group cursor-pointer"
            >
              Services
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a 
              href="#promo" 
              onClick={(e) => handleSmoothScroll(e, '#promo')}
              className="font-dm-sans font-medium text-[15px] text-gray-500 hover:text-orange transition-colors duration-150 relative group cursor-pointer"
            >
              Promo
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a 
              href="#blog" 
              onClick={(e) => handleSmoothScroll(e, '#blog')}
              className="font-dm-sans font-medium text-[15px] text-gray-500 hover:text-orange transition-colors duration-150 relative group cursor-pointer"
            >
              Blog
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="font-dm-sans font-medium text-[15px] text-gray-500 hover:text-orange transition-colors duration-150 relative group cursor-pointer"
            >
              Contact
              <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-1 text-navy hover:text-orange transition-colors font-dm-sans text-sm">
              <GlobeAltIcon className="w-4 h-4" />
              ID
            </button>
            <Link href="#" className="px-5 py-2 rounded-full border border-navy text-navy font-dm-sans font-medium text-sm hover:bg-navy/5 transition-colors">
              Masuk
            </Link>
            <Link href="#" className="px-5 py-2 rounded-full bg-orange text-white font-dm-sans font-medium text-sm hover:bg-orange-dark hover:shadow-cta-hover hover:-translate-y-[2px] transition-all duration-200">
              Daftar
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden text-navy"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer menu placeholder (basic implementation) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[60] bg-navy-mid flex flex-col p-6 h-screen overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center">
                <span className="font-poppins font-bold text-2xl text-white">WE</span>
                <span className="font-poppins font-bold text-2xl text-orange">POSE</span>
              </Link>
              <button 
                className="text-white text-2xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-white text-lg font-dm-sans">
              <Link href="#">Visa</Link>
              <Link href="#">Tools</Link>
              <Link href="#">Promo</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Tentang Kami</Link>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <Link href="#" className="w-full text-center py-3 rounded-full border border-white text-white font-dm-sans font-medium">
                Masuk
              </Link>
              <Link href="#" className="w-full text-center py-3 rounded-full bg-orange text-white font-dm-sans font-medium hover:bg-orange-dark">
                Daftar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
