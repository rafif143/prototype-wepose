"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { 
  ShieldCheckIcon, 
  BuildingOffice2Icon, 
  TicketIcon, 
  MapIcon,
  ArrowRightIcon,
  CheckIcon
} from "@heroicons/react/24/outline"

export default function ExtraServicesSection() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const services = [
    {
      title: "Asuransi Perjalanan",
      description: "Cakupan asuransi perjalanan yang lengkap untuk memberikan ketenangan selama perjalanan internasional Anda.",
      icon: ShieldCheckIcon,
      iconBg: "bg-orange-50",
      iconColor: "text-orange",
      features: [
        "Proses Cepat",
        "Sertifikasi Resmi",
        "Semua jenis dokumen"
      ],
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Pemesanan Hotel",
      description: "Pilihan hotel terbaik dengan harga kompetitif untuk kenyamanan istirahat Anda di seluruh dunia.",
      icon: BuildingOffice2Icon,
      iconBg: "bg-orange-50",
      iconColor: "text-orange",
      features: [
        "Harga Terbaik",
        "Konfirmasi Instan",
        "Ribuan Pilihan Hotel"
      ],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Pemesanan Tiket Pesawat",
      description: "Layanan pemesanan tiket penerbangan domestik dan internasional dengan rute terlengkap.",
      icon: TicketIcon,
      iconBg: "bg-orange-50",
      iconColor: "text-orange",
      features: [
        "Rute Terlengkap",
        "Harga Transparan",
        "Support 24/7"
      ],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Paket Tour Wisata",
      description: "Jelajahi destinasi impian dengan paket tour yang dirancang khusus untuk pengalaman tak terlupakan.",
      icon: MapIcon,
      iconBg: "bg-orange-50",
      iconColor: "text-orange",
      features: [
        "Guide Profesional",
        "Itinerary Fleksibel",
        "All-In Service"
      ],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop"
    }
  ]

  return (
    <section id="extra-services" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
          >
            Layanan Ekstra
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                variants={itemAnim}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="bg-white rounded-[16px] shadow-md hover:shadow-xl overflow-hidden cursor-pointer flex flex-col border border-gray-100 transition-shadow duration-300"
              >
                {/* Image Header */}
                <div className="relative h-[160px] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 ${service.iconBg} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-poppins font-semibold text-[16px] text-navy mb-2 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="font-dm-sans text-[13px] text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-5">
                    {service.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-orange flex-shrink-0" />
                        <span className="font-dm-sans text-[12px] text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="mt-auto w-full bg-orange text-white font-poppins font-semibold text-[13px] py-2.5 px-4 rounded-full hover:bg-orange-dark transition-all duration-200 flex items-center justify-center gap-2 group">
                    Dapatkan Info
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
