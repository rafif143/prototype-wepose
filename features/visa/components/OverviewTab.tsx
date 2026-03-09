"use client";

import { motion } from "framer-motion";
import { ClockIcon, CalendarDaysIcon, GlobeAltIcon, ArrowPathIcon, PaperAirplaneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type { VisaData } from "@/features/visa/lib/data";
import Link from "next/link";

interface OverviewTabProps {
  visa: VisaData;
}

export function OverviewTab({ visa }: OverviewTabProps) {
  const stats = [
    { icon: ClockIcon, label: "Estimasi Proses", value: visa.processDays },
    { icon: CalendarDaysIcon, label: "Masa Tinggal", value: visa.stayDuration },
    { icon: GlobeAltIcon, label: "Area Berlaku", value: visa.area },
    { icon: ArrowPathIcon, label: "Validitas Visa", value: visa.validity },
  ];

  return (
    <div id="overview" className="space-y-12">
      {/* Description */}
      <div>
        <h3 className="font-poppins font-semibold text-xl text-navy mb-4">Tentang Visa Ini</h3>
        <div className="space-y-4">
          {visa.description.map((paragraph, index) => (
            <p key={index} className="font-dm-sans text-base text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-orange-50 rounded-xl p-4 flex items-start gap-3"
            >
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-orange" />
              </div>
              <div>
                <p className="font-dm-sans text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="font-poppins font-semibold text-base text-navy">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline */}
      <div>
        <h3 className="font-poppins font-semibold text-xl text-navy mb-6">Alur Proses</h3>
        <div className="relative">
          {visa.timeline.map((step, index) => {
            const isLast = index === visa.timeline.length - 1;
            const StatusIcon = step.status === 'completed' ? CheckCircleIcon : step.status === 'active' ? ArrowPathIcon : CheckCircleIcon;
            const iconColor = step.status === 'completed' ? 'text-green-500' : step.status === 'active' ? 'text-orange' : 'text-gray-300';
            const dotColor = step.status === 'completed' ? 'bg-green-500' : step.status === 'active' ? 'bg-orange' : 'bg-gray-300';
            const lineColor = step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300';

            return (
              <div key={index} className="relative flex gap-4 pb-8">
                {/* Dot + Line */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full ${dotColor} z-10`}
                    animate={step.status === 'active' ? {
                      scale: [1, 1.3, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: step.status === 'active' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  {!isLast && (
                    <div className={`w-0.5 h-full ${lineColor} mt-1`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 -mt-1">
                  <div className="flex items-start gap-2 mb-1">
                    <StatusIcon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
                    <h4 className="font-poppins font-semibold text-base text-navy">{step.title}</h4>
                  </div>
                  <p className="font-dm-sans text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add-ons Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-semibold text-xl text-navy">Layanan Tambahan</h3>
          <Link href="#addons" className="font-dm-sans text-sm text-orange hover:text-orange-dark transition-colors">
            Lihat Semua Add-on →
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {visa.addons.slice(0, 3).map((addon) => (
            <div
              key={addon.id}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-orange hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <span className="font-dm-sans text-sm text-navy">{addon.name}</span>
              <span className="font-poppins font-semibold text-sm text-orange">
                Rp {(addon.price / 1000).toFixed(0)}k
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-navy rounded-2xl p-8 text-center"
      >
        <h3 className="font-poppins font-bold text-2xl text-white mb-2">
          Siap Apply Visa France Schengen?
        </h3>
        <p className="font-dm-sans text-base text-gray-300 mb-6">
          Tim profesional Wepose siap membantu proses visamu
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-all duration-200 hover:shadow-cta-hover">
            <PaperAirplaneIcon className="w-5 h-5" />
            <span>Mulai Apply Sekarang</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white hover:bg-white/10 font-poppins font-semibold rounded-full transition-colors">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>Tanya Dulu via WhatsApp</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
