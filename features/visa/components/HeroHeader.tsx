"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import type { VisaData } from "@/features/visa/lib/data";

interface HeroHeaderProps {
  visa: VisaData;
}

export function HeroHeader({ visa }: HeroHeaderProps) {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
      {/* Cover Background Image */}
      <div className="absolute inset-0">
        <Image
          src={visa.coverImage}
          alt={visa.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/20" />
      </div>

      {/* Breadcrumb - Top Left */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="absolute top-6 left-6 md:left-8 lg:left-12 flex items-center gap-2 text-sm font-dm-sans z-10"
      >
        <Link href="/" className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
          <HomeIcon className="w-4 h-4" />
          <span>Beranda</span>
        </Link>
        <span className="text-white/50">&gt;</span>
        <Link href="/visa" className="text-white/70 hover:text-white transition-colors">
          Visa
        </Link>
        <span className="text-white/50">&gt;</span>
        <span className="text-white font-medium">{visa.country}</span>
      </motion.nav>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-8 lg:px-12 pb-6 md:pb-8"
      >
        {/* Badge Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white font-poppins font-semibold text-xs uppercase">
            {visa.type}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange/20 backdrop-blur-sm border border-orange/40 text-orange font-poppins font-semibold text-xs">
            <ClockIcon className="w-3.5 h-3.5" />
            {visa.processDays}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-poppins font-semibold text-xs">
            <DocumentTextIcon className="w-3.5 h-3.5" />
            Visa Sticker
          </span>
        </div>

        {/* Visa Name */}
        <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight">
          {visa.name}
        </h1>

        {/* Flag + Country */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{visa.flag}</span>
          <span className="font-dm-sans font-medium text-base text-white/80">{visa.country}</span>
        </div>

        {/* Price */}
        <div>
          <p className="font-dm-sans text-sm text-white/60 mb-1">Mulai dari</p>
          <p className="font-poppins font-bold text-3xl md:text-4xl text-orange drop-shadow-lg">{visa.priceDisplay}</p>
        </div>
      </motion.div>
    </div>
  );
}
