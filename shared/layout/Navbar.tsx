"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Bars3Icon, GlobeAltIcon, GlobeEuropeAfricaIcon, MapIcon, BuildingOffice2Icon, AcademicCapIcon, BriefcaseIcon, UserGroupIcon, HomeModernIcon, FireIcon, BoltIcon, TagIcon, SparklesIcon, LightBulbIcon, ScaleIcon } from "@heroicons/react/24/outline"

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  
  const { scrollY } = useScroll()
  const navBackground = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.8)"]
  )
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 1px 3px 0 rgba(0, 0, 0, 0.1)", "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"]
  )

  const megaMenuRef = useRef<HTMLDivElement>(null)

  // Track active section based on scroll position
  useEffect(() => {
    if (pathname !== '/') return; // Only track on home page

    const sections = [
      { id: 'home', element: document.querySelector('main') },
      { id: 'about', element: document.getElementById('about') },
      { id: 'how-it-works', element: document.getElementById('how-it-works') },
      { id: 'popular-visa', element: document.getElementById('popular-visa') },
      { id: 'extra-services', element: document.getElementById('extra-services') },
      { id: 'contact', element: document.getElementById('contact') },
    ].filter(section => section.element !== null);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'home';
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      if (section.element) {
        observer.observe(section.element);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.element) {
          observer.unobserve(section.element);
        }
      });
    };
  }, [pathname]);

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    
    if (pathname === '/') {
      const target = document.querySelector(targetId)
      if (target) {
        const navHeight = 64
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      window.location.href = `/${targetId}`
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

  // Helper to check if link is active
  const isActive = (sectionId: string) => {
    if (pathname !== '/') return false;
    return activeSection === sectionId;
  };

  // Helper for link classes
  const getLinkClasses = (sectionId: string) => {
    const baseClasses = "font-dm-sans font-medium text-[15px] transition-colors duration-150 relative group cursor-pointer";
    const activeClasses = isActive(sectionId) ? "text-orange" : "text-gray-500 hover:text-orange";
    return `${baseClasses} ${activeClasses}`;
  };

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
            <Link href="/" className={getLinkClasses('home')}>
              Home
              {isActive('home') && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isActive('home') && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </Link>
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className={getLinkClasses('about')}
            >
              About
              {isActive('about') && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isActive('about') && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className={getLinkClasses('how-it-works')}
            >
              Cara Kerja
              {isActive('how-it-works') && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isActive('how-it-works') && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </a>
            
            {/* Visa Solutions - Simple Link */}
            <a 
              href="#popular-visa" 
              onClick={(e) => handleSmoothScroll(e, '#popular-visa')}
              className={getLinkClasses('popular-visa')}
            >
              Visa Solutions
              {isActive('popular-visa') && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isActive('popular-visa') && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
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
                            <Link href="/tools/sponsor-letter" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <FireIcon className="w-4 h-4" />
                              Sponsor Letter
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <BoltIcon className="w-4 h-4" />
                              Proses Tercepat
                            </Link>
                          </li>
                          <li>
                            <Link href="/tools/sponsor-letter" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <TagIcon className="w-4 h-4" />
                              Sponsor Letter
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
                              <SparklesIcon className="w-4 h-4" />
                              Visa Terbaru
                            </Link>
                          </li>
                          <li>
                            <Link href="/tools/quiz" className="flex items-center gap-2 px-3 py-2 rounded-lg font-dm-sans text-sm text-gray-800 hover:bg-orange-50 hover:text-orange transition-colors duration-100">
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
              className={getLinkClasses('extra-services')}
            >
              Services
              {isActive('extra-services') && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isActive('extra-services') && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </a>
            <Link 
              href="/blog"
              className={`font-dm-sans font-medium text-[15px] transition-colors duration-150 relative group cursor-pointer ${pathname === '/blog' ? 'text-orange' : 'text-gray-500 hover:text-orange'}`}
            >
              Blog
              {pathname === '/blog' && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"></span>
              )}
              {pathname !== '/blog' && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
            </Link>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className={getLinkClasses('contact')}
            >
              Contact
              {isActive('contact') && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isActive('contact') && (
                <span className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              )}
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
