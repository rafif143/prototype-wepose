"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, Variants } from "framer-motion"
import { 
  ShieldCheckIcon, 
  BuildingOffice2Icon, 
  TicketIcon, 
  MapIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon
} from "@heroicons/react/24/outline"

export default function ExtraServicesSectionV2() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  }

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  // Auto-cycle logic
  const startAutoCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      if (!isUserInteracting) {
        setActiveIndex(prev => (prev + 1) % services.length)
      }
    }, 2000) // Every 2 seconds
  }

  const handleUserClick = (index: number) => {
    setActiveIndex(index)
    setIsUserInteracting(true)
    
    // Clear existing timers
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    
    // Resume auto-cycle after 5 seconds of user reading time
    timeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
      startAutoCycle()
    }, 5000)
  }

  // Initialize auto-cycle on mount
  useEffect(() => {
    startAutoCycle()
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Restart auto-cycle when user interaction ends
  useEffect(() => {
    if (!isUserInteracting) {
      startAutoCycle()
    }
  }, [isUserInteracting])

  const services = [
    {
      title: "Asuransi Perjalanan",
      subtitle: "Perlindungan Menyeluruh",
      description: "Cakupan asuransi perjalanan yang lengkap untuk memberikan ketenangan selama perjalanan internasional Anda dengan berbagai pilihan paket sesuai kebutuhan.",
      icon: ShieldCheckIcon,
      gradient: "from-navy to-navy-mid",
      features: ["Proses Cepat", "Sertifikasi Resmi", "Semua jenis dokumen", "Coverage Worldwide"],
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop",
      price: "Mulai dari Rp 150.000"
    },
    {
      title: "Pemesanan Hotel",
      subtitle: "Kenyamanan Terjamin",
      description: "Pilihan hotel terbaik dengan harga kompetitif untuk kenyamanan istirahat Anda di seluruh dunia. Dari budget hingga luxury hotel tersedia.",
      icon: BuildingOffice2Icon,
      gradient: "from-orange to-orange-dark",
      features: ["Harga Terbaik", "Konfirmasi Instan", "Ribuan Pilihan Hotel", "Free Cancellation"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
      price: "Diskon hingga 40%"
    },
    {
      title: "Pemesanan Tiket",
      subtitle: "Terbang Mudah",
      description: "Layanan pemesanan tiket penerbangan domestik dan internasional dengan rute terlengkap dan harga terbaik dari berbagai maskapai terpercaya.",
      icon: TicketIcon,
      gradient: "from-navy-mid to-navy-dark",
      features: ["Rute Terlengkap", "Harga Transparan", "Support 24/7", "Flexible Booking"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
      price: "Cashback hingga 5%"
    },
    {
      title: "Paket Tour Wisata",
      subtitle: "Petualangan Tak Terlupakan",
      description: "Jelajahi destinasi impian dengan paket tour yang dirancang khusus untuk pengalaman tak terlupakan bersama guide profesional dan itinerary fleksibel.",
      icon: MapIcon,
      gradient: "from-orange-dark to-navy",
      features: ["Guide Profesional", "Itinerary Fleksibel", "All-In Service", "Group & Private"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
      price: "Paket mulai Rp 2.5jt"
    }
  ]

  return (
    <section id="extra-services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header - Left Aligned */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-3"
            >
              <SparklesIcon className="w-6 h-6 text-orange" />
              <span className="font-dm-sans text-sm text-orange font-semibold uppercase tracking-wide">
                Layanan Tambahan
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
            >
              Lengkapi Perjalanan Anda
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="font-dm-sans text-base text-gray-600 max-w-lg"
            >
              Dapatkan pengalaman perjalanan yang sempurna dengan layanan ekstra kami
            </motion.p>
          </div>
          
          {/* Right side CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block"
          >
            <button className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
              Lihat Semua Layanan
              <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
            </button>
          </motion.div>
        </div>

        {/* Expandable Cards Layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4 h-[400px]"
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            const isActive = idx === activeIndex
            
            return (
              <motion.div
                key={idx}
                variants={itemAnim}
                onClick={() => handleUserClick(idx)}
                animate={{
                  flex: isActive ? 3 : 1,
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smoother animation
                }}
                className="group relative overflow-hidden rounded-[24px] cursor-pointer"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-85`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Icon */}
                    <motion.div 
                      animate={{
                        width: isActive ? 56 : 48,
                        height: isActive ? 56 : 48,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors"
                    >
                      <Icon className={`${isActive ? 'w-7 h-7' : 'w-6 h-6'} text-white transition-all duration-600`} />
                    </motion.div>

                    {/* Title - Always Visible */}
                    <motion.div 
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                      }}
                      transition={{ 
                        duration: 0.3, 
                        ease: "easeOut",
                        delay: isActive ? 0.4 : 0 // Delay when expanding, immediate when collapsing
                      }}
                      className="mb-3"
                    >
                      <h3 className="font-poppins font-bold text-white text-[18px] mb-1">
                        {service.title}
                      </h3>
                      <p className="font-dm-sans text-white text-[14px]">
                        {service.subtitle}
                      </p>
                    </motion.div>

                    {/* Expanded Content - Smooth reveal */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? 'auto' : 0,
                        marginBottom: isActive ? 16 : 0,
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        delay: isActive ? 0.6 : 0 // Muncul setelah card 100% expand (0.8s) + jeda
                      }}
                      className="overflow-hidden"
                    >
                      {/* Description - Delayed reveal */}
                      <motion.p 
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 10,
                        }}
                        transition={{ 
                          duration: 0.3, 
                          ease: "easeOut",
                          delay: isActive ? 0.8 : 0 // Description muncul paling akhir
                        }}
                        className="font-dm-sans text-[14px] text-white mb-4 leading-relaxed"
                      >
                        {service.description}
                      </motion.p>

                      {/* Features */}
                      <div className="space-y-2 mb-3">
                        {service.features.map((feature, featureIdx) => (
                          <motion.div 
                            key={featureIdx} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0,
                              x: isActive ? 0 : -10
                            }}
                            transition={{ 
                              duration: 0.3, 
                              delay: isActive ? 1.4 + (featureIdx * 0.1) : 0 // Features muncul setelah description
                            }}
                            className="flex items-center gap-2"
                          >
                            <CheckIcon className="w-4 h-4 text-white flex-shrink-0" />
                            <span className="font-dm-sans text-[13px] text-white">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Price */}
                      <motion.div 
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 10
                        }}
                        transition={{ 
                          duration: 0.3, 
                          delay: isActive ? 1.8 : 0 // Price muncul paling akhir
                        }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3"
                      >
                        <span className="font-poppins font-semibold text-white text-[14px]">
                          {service.price}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-6">
                    {/* CTA Button */}
                    <motion.button
                      animate={{
                        width: isActive ? 60 : 60,
                        height: isActive ? 48 : 40,
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="bg-white/20 backdrop-blur-sm text-white font-poppins font-semibold rounded-full hover:bg-white/30 transition-colors duration-200 flex items-center justify-center border border-white/20"
                    >
                      <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Active Indicator */}
                <motion.div
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 origin-left"
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center lg:hidden"
        >
          <button className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200">
            Lihat Semua Layanan
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}