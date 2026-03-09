"use client";

import { motion } from "framer-motion";
import { MagnifyingGlassIcon, GlobeAltIcon, BuildingOfficeIcon, MapPinIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { WorldMap } from "../ui/WorldMap";

const mapDots = [
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 48.8, lng: 2.3, label: "Paris" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 35.6, lng: 139.7, label: "Tokyo" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 37.5, lng: 127.0, label: "Seoul" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 51.5, lng: -0.1, label: "London" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 40.7, lng: -74.0, label: "New York" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: -33.8, lng: 151.2, label: "Sydney" } },
];

const quickCategories = [
  { icon: GlobeAltIcon, label: "Schengen" },
  { icon: MapPinIcon, label: "Jepang" },
  { icon: MapPinIcon, label: "Korea" },
  { icon: MapPinIcon, label: "Australia" },
  { icon: MapPinIcon, label: "Amerika" },
  { icon: GlobeAltIcon, label: "Eropa" },
  { icon: BuildingOfficeIcon, label: "Timur Tengah" },
  { icon: PlusIcon, label: "Lihat Semua" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange via-orange-dark to-[#c2410c] flex items-center justify-center overflow-hidden">
      {/* Navy Accent Blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-navy/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy/15 rounded-full blur-[100px]" />
      
      {/* WorldMap Background */}
      <div className="absolute inset-0 opacity-25">
        <WorldMap
          dots={mapDots}
          lineColor="#1E3A5F"
          showLabels={false}
          loop={true}
          animationDuration={3}
        />
      </div>
      
      {/* Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange-dark/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 border border-white/30 text-white font-poppins font-semibold text-sm backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4" />
            Platform Visa #1 di Indonesia
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg"
        >
          Apply Visa Jadi Effortless
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="font-dm-sans text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Urus visa ke 35+ negara bersama tim profesional Wepose.
          <br />
          Cepat, aman, transparan.
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <div className="pl-6 pr-3">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Mau visa ke mana? Cth: Jepang, Prancis, Korea..."
                className="flex-1 py-5 px-3 text-gray-800 placeholder:text-gray-400 focus:outline-none font-dm-sans text-base"
              />
              <button className="m-2 px-8 py-3.5 bg-navy hover:bg-navy-mid text-white font-poppins font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                Cari Visa
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Category Chips */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {quickCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.35)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-dm-sans transition-all duration-200 hover:border-white/50"
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-center gap-6 md:gap-8 lg:gap-12 text-center"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-md">35+</span>
            <span className="font-dm-sans text-xs md:text-sm text-white/80">Negara</span>
          </div>
          <div className="hidden md:block text-white/30 text-2xl">|</div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-md">100+</span>
            <span className="font-dm-sans text-xs md:text-sm text-white/80">Tipe Visa</span>
          </div>
          <div className="hidden md:block text-white/30 text-2xl">|</div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-md">10.000+</span>
            <span className="font-dm-sans text-xs md:text-sm text-white/80">Pelanggan Puas</span>
          </div>
          <div className="hidden md:block text-white/30 text-2xl">|</div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-md">5+</span>
            <span className="font-dm-sans text-xs md:text-sm text-white/80">Tahun Pengalaman</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
