"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  BuildingOffice2Icon,
  CheckBadgeIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const embassyRegistrations = [
  {
    name: "KVAC",
    fullName: "Korea Visa Application Center",
    country: "Korea Selatan",
    description: "Partner resmi untuk aplikasi visa Korea",
    icon: "🇰🇷"
  },
  {
    name: "VFS Global",
    fullName: "VFS Global Services",
    country: "Schengen Countries",
    description: "Partner resmi untuk visa Schengen Eropa",
    icon: "🇪🇺"
  },
  {
    name: "JVAC",
    fullName: "Japan Visa Application Center",
    country: "Jepang",
    description: "Partner resmi untuk aplikasi visa Jepang",
    icon: "🇯🇵"
  },
  {
    name: "AVAC",
    fullName: "Australia Visa Application Center",
    country: "Australia",
    description: "Partner resmi untuk aplikasi visa Australia",
    icon: "🇦🇺"
  }
];

export default function EmbassyRegistrationSection() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <ShieldCheckIcon className="w-6 h-6 text-orange" />
            <span className="font-dm-sans text-sm text-orange font-semibold uppercase tracking-wide">
              Terdaftar Resmi
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="font-poppins font-bold text-[28px] md:text-[36px] text-navy mb-4"
          >
            Partner Resmi Kedutaan
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="font-dm-sans text-base text-gray-600 max-w-2xl mx-auto"
          >
            WePose terdaftar resmi sebagai partner dari berbagai pusat aplikasi visa kedutaan internasional, 
            menjamin keamanan dan kredibilitas layanan kami
          </motion.p>
        </div>

        {/* Embassy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {embassyRegistrations.map((embassy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange/20 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Embassy Icon & Name */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{embassy.icon}</div>
                <h3 className="font-poppins font-bold text-lg text-navy mb-1">
                  {embassy.name}
                </h3>
                <p className="font-dm-sans text-xs text-gray-500 uppercase tracking-wide">
                  {embassy.country}
                </p>
              </div>

              {/* Description */}
              <div className="text-center mb-4">
                <p className="font-dm-sans text-sm text-gray-600 leading-relaxed">
                  {embassy.description}
                </p>
              </div>

              {/* Verification Badge */}
              <div className="flex items-center justify-center gap-2 bg-green-50 rounded-lg py-2 px-3">
                <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                <span className="font-dm-sans text-xs text-green-700 font-semibold">
                  Verified Partner
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mb-3">
                <ShieldCheckIcon className="w-6 h-6 text-orange" />
              </div>
              <h4 className="font-poppins font-bold text-lg text-navy mb-2">
                Keamanan Terjamin
              </h4>
              <p className="font-dm-sans text-sm text-gray-600">
                Data dan dokumen Anda diproses dengan standar keamanan kedutaan
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mb-3">
                <BuildingOffice2Icon className="w-6 h-6 text-orange" />
              </div>
              <h4 className="font-poppins font-bold text-lg text-navy mb-2">
                Akses Langsung
              </h4>
              <p className="font-dm-sans text-sm text-gray-600">
                Proses aplikasi langsung ke sistem kedutaan tanpa perantara
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mb-3">
                <GlobeAltIcon className="w-6 h-6 text-orange" />
              </div>
              <h4 className="font-poppins font-bold text-lg text-navy mb-2">
                Jaringan Global
              </h4>
              <p className="font-dm-sans text-sm text-gray-600">
                Terhubung dengan pusat visa di berbagai negara tujuan
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}