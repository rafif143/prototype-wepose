"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline"

export default function ContactSection() {
  const offices = [
    {
      name: "KANTOR JAKARTA",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666!2d106.79!3d-6.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnNDguMCJTIDEwNsKwNDcnMjQuMCJF!5e0!3m2!1sen!2sid!4v1234567890",
      address: "Jl. Daan Mogot samping Foxlite Hotel KM 1, No 1, RT.11/RW.4, Jelambar, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470",
      phone: "+62 21 2922 1234",
      email: "jakarta@weposetravel.com",
      hours: "Sen-Jum: 09:00 - 17:00",
      whatsapp: "6221292212234"
    },
    {
      name: "KANTOR SURABAYA",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.666!2d112.73!3d-7.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMzYuMCJTIDExMsKwNDMnNDguMCJF!5e0!3m2!1sen!2sid!4v1234567890",
      address: "Jl. KH Abdul Wahab Siamin Surabaya No.Kav 9-10, Dukuh Pakis, Kec. Dukuhpakis, Surabaya, Jawa Timur 60225",
      phone: "+62 31 5555 6789",
      email: "surabaya@weposetravel.com",
      hours: "Sen-Jum: 09:00 - 17:00",
      whatsapp: "6231555556789"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-100/50 text-orange font-poppins font-semibold text-xs mb-4 uppercase tracking-wide"
          >
            Hubungi Kami
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-bold text-[32px] md:text-[40px] text-navy mb-4 leading-tight uppercase tracking-wide"
          >
            Kunjungi Kantor Kami atau Hubungi Kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="font-dm-sans text-[15px] text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Tim konsultan kami siap membantu pengajuan visa Anda agar lebih mudah dan efisien. Hubungi kami melalui kanal berikut.
          </motion.p>
        </div>

        {/* Offices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {offices.map((office, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[16px] shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Google Map */}
              <div className="relative h-[180px] bg-gray-200">
                <iframe
                  src={office.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Office Name */}
                <div className="flex items-center gap-2 mb-4">
                  <MapPinIcon className="w-5 h-5 text-orange" />
                  <h3 className="font-poppins font-bold text-[16px] text-navy">
                    {office.name}
                  </h3>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-5">
                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-dm-sans text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                        ALAMAT
                      </p>
                      <p className="font-dm-sans text-[12px] text-gray-700 leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-2.5">
                    <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-dm-sans text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                        TELEPON
                      </p>
                      <a 
                        href={`tel:${office.phone}`}
                        className="font-dm-sans text-[13px] text-navy font-semibold hover:text-orange transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-2.5">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-dm-sans text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                        EMAIL
                      </p>
                      <a 
                        href={`mailto:${office.email}`}
                        className="font-dm-sans text-[13px] text-navy font-semibold hover:text-orange transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2.5">
                    <ClockIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-dm-sans text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                        JAM OPERASIONAL
                      </p>
                      <p className="font-dm-sans text-[13px] text-navy font-semibold">
                        {office.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${office.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-poppins font-semibold text-[13px] py-2.5 rounded-full transition-all duration-200 hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  CHAT WHATSAPP
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
