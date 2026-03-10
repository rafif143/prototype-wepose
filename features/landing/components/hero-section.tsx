"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { WorldMap } from "@/shared/ui/WorldMap"

const StatCounter = ({ end, duration = 1.2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return; // Only animate once
    
    let animationFrame: number;
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setHasAnimated(true);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, hasAnimated]);

  return <>{count}</>
}

export default function HeroSection() {
  const mapDots = [
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 48.8, lng: 2.3, label: "Paris" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 35.6, lng: 139.7, label: "Tokyo" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 37.5, lng: 127.0, label: "Seoul" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 51.5, lng: -0.1, label: "London" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 40.7, lng: -74.0, label: "New York" } },
    { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: -33.8, lng: 151.2, label: "Sydney" } },
  ];

  return (
    <section className="relative min-h-screen bg-navy flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Map - Lazy loaded */}
      <div className="absolute inset-0 opacity-30">
        <WorldMap dots={mapDots} lineColor="#F97316" loop={false} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-[1280px] z-10 relative flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/10 border border-orange/30 text-orange font-poppins font-semibold text-[12px] mb-6"
        >
          <span>✈️</span> Platform Visa #1 di Indonesia
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-poppins font-bold text-[36px] md:text-[56px] text-white leading-tight mb-4">
            Apply Visa Jadi Effortless
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="font-dm-sans text-[15px] md:text-[18px] text-gray-300">
            Urus visa ke 35+ negara bersama tim profesional Wepose.<br />
            Cepat, aman, transparan.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl bg-white rounded-[10px] shadow-md p-2 flex items-center mb-8 focus-within:border-orange focus-within:ring focus-within:ring-orange/20 border border-transparent transition-all"
        >
          <div className="pl-3 pr-2 text-gray-400">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Mau visa ke mana? Cth: Jepang, Prancis, Korea..."
            className="flex-1 bg-transparent border-none outline-none font-dm-sans text-gray-800 placeholder-gray-400 text-[15px] md:text-base py-2"
          />
          <button className="bg-orange hover:bg-orange-dark text-white rounded-full px-6 py-2.5 font-poppins font-semibold text-sm transition-colors shadow-sm ml-2 shrink-0">
            Cari Visa
          </button>
        </motion.div>

        {/* Quick Category Chips */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.5 }
            }
          }}
          className="flex flex-wrap justify-center gap-2 max-w-3xl"
        >
          {["🇪🇺 Schengen", "🇯🇵 Jepang", "🇰🇷 Korea", "🇦🇺 Australia", "🇺🇸 Amerika", "🌍 Eropa", "🕌 Timur Tengah", "➕ Lihat Semua"].map((chip) => (
            <motion.button
              key={chip}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0, duration: 0.4 } }
              }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 border border-white/20 text-white rounded-full py-2 px-4 font-dm-sans text-sm transition-colors"
            >
              {chip}
            </motion.button>
          ))}
        </motion.div>

      </div>
      
      {/* Stats Bar - Moved below hero content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 bg-orange py-6 z-20"
      >
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
            {[
              { num: 35, suffix: "+", label: "Negara" },
              { num: 100, suffix: "+", label: "Tipe Visa" },
              { num: 10000, suffix: "+", label: "Pelanggan Puas" },
              { num: 5, suffix: "+", label: "Tahun Pengalaman" },
            ].map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <div className="flex flex-col items-center">
                  <div className="font-poppins font-bold text-[44px] md:text-[56px] text-white flex items-center leading-none">
                    <StatCounter end={stat.num} />{stat.suffix}
                  </div>
                  <div className="font-dm-sans font-normal text-[12px] md:text-[13px] text-white/90 mt-1">{stat.label}</div>
                </div>
                {idx < 3 && <div className="hidden md:block w-[1px] h-16 bg-white/30"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}