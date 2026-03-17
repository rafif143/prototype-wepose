"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Flag } from "@/shared/ui/Flag";

const embassyRegistrations = [
  {
    name: "KVAC",
    country: "Korea Selatan",
    countryCode: "KR",
    description: "Partner resmi aplikasi visa Korea",
  },
  {
    name: "VFS Global",
    country: "Schengen",
    countryCode: "EU",
    description: "Partner visa Schengen Eropa",
  },
  {
    name: "JVAC",
    country: "Jepang",
    countryCode: "JP",
    description: "Partner aplikasi visa Jepang",
  },
  {
    name: "AVAC",
    country: "Australia",
    countryCode: "AU",
    description: "Partner aplikasi visa Australia",
  },
];

export default function EmbassyRegistrationSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheckIcon className="w-5 h-5 text-orange" />
            <span className="text-xs font-semibold text-orange uppercase tracking-wider">
              Official Partner
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Partner Kedutaan Resmi
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Terdaftar langsung dengan pusat aplikasi visa internasional untuk
            memastikan proses aman, cepat, dan terpercaya.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {embassyRegistrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Flag Bulat */}
              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border group-hover:scale-105 transition">
                  <Flag
                    countryCode={item.countryCode}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-navy text-center mb-1">
                {item.name}
              </h3>

              <p className="text-xs text-gray-400 uppercase tracking-wide text-center mb-3">
                {item.country}
              </p>

              {/* Desc */}
              <p className="text-sm text-gray-600 text-center mb-5">
                {item.description}
              </p>

              {/* Badge */}
              <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-medium">
                <CheckBadgeIcon className="w-4 h-4" />
                Verified Partner
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}