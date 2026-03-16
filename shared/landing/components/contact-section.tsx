"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline"

export default function ContactSection() {
  const offices = [
    {
      name: "Jakarta",
      city: "Jakarta Barat",
      address: "Jl. Daan Mogot samping Foxlite Hotel KM 1, No 1, RT.11/RW.4, Jelambar, Kec. Grogol petamburan",
      phone: "+62 21 2922 1234",
      email: "jakarta@weposetravel.com",
      hours: "Sen-Jum: 09:00 - 17:00",
      whatsapp: "6221292212234",
      mapUrl: "https://maps.google.com/?q=Jakarta+Office+WePose"
    },
    {
      name: "Surabaya", 
      city: "Jawa Timur",
      address: "Jl. KH Abdul Wahab Siamin Surabaya No.Kav 9-10, Dukuh Pakis, Kec. Dukuhpakis",
      phone: "+62 31 5555 6789",
      email: "surabaya@weposetravel.com", 
      hours: "Sen-Jum: 09:00 - 17:00",
      whatsapp: "6231555556789",
      mapUrl: "https://maps.google.com/?q=Surabaya+Office+WePose"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header - Left Aligned */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-3"
            >
              <BuildingOfficeIcon className="w-6 h-6 text-orange" />
              <span className="font-dm-sans text-sm text-orange font-semibold uppercase tracking-wide">
                Hubungi Kami
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
            >
              Siap Membantu Perjalanan Anda
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="font-dm-sans text-base text-gray-600 max-w-lg"
            >
              Tim konsultan berpengalaman kami siap membantu proses visa Anda dengan layanan profesional dan terpercaya
            </motion.p>
          </div>
          
          {/* Right side CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="mt-4 lg:mt-0"
          >
            <button className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
              Lihat Semua Kontak
              <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
            </button>
          </motion.div>
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-8">
            <h3 className="font-poppins font-bold text-2xl text-navy mb-2">
              Lokasi Kantor Kami
            </h3>
            <p className="font-dm-sans text-gray-600">
              Kunjungi kantor terdekat untuk konsultasi langsung
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offices.map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-navy to-navy/90 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPinIcon className="w-6 h-6 text-orange" />
                    <h3 className="font-poppins font-bold text-xl">
                      Kantor {office.name}
                    </h3>
                  </div>
                  <p className="font-dm-sans text-navy-light opacity-90">
                    {office.city}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-4">
                    <MapPinIcon className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-dm-sans text-sm text-gray-700 leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-orange" />
                      <div>
                        <p className="font-dm-sans text-xs text-gray-500 uppercase tracking-wide">
                          Telepon
                        </p>
                        <a 
                          href={`tel:${office.phone}`}
                          className="font-dm-sans text-sm text-navy font-semibold hover:text-orange transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-3">
                      <ClockIcon className="w-5 h-5 text-orange" />
                      <div>
                        <p className="font-dm-sans text-xs text-gray-500 uppercase tracking-wide">
                          Jam Buka
                        </p>
                        <p className="font-dm-sans text-sm text-navy font-semibold">
                          {office.hours}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 mb-6">
                    <EnvelopeIcon className="w-5 h-5 text-orange" />
                    <div>
                      <p className="font-dm-sans text-xs text-gray-500 uppercase tracking-wide">
                        Email
                      </p>
                      <a 
                        href={`mailto:${office.email}`}
                        className="font-dm-sans text-sm text-navy font-semibold hover:text-orange transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${office.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white font-poppins font-semibold text-sm py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 flex-1 bg-gray-100 hover:bg-gray-200 text-navy font-poppins font-semibold text-sm py-3 rounded-xl transition-all duration-200"
                    >
                      <MapPinIcon className="w-4 h-4" />
                      Lihat Map
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}