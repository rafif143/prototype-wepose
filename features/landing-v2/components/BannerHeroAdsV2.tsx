"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BoltIcon, MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const promoSlides = [
  {
    id: 1,
    title: "Visa Jepang",
    location: "Tokyo & Kyoto",
    originalPrice: "Rp 1.200.000",
    promoPrice: "850rb",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop", 
    baseColor: "bg-[#0f1115]", 
    accentColor: "from-red-600/40"
  },
  {
    id: 2,
    title: "Schengen",
    location: "Europe Gateway",
    originalPrice: "Rp 2.500.000",
    promoPrice: "1.8jt",
    discount: "26% OFF",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    baseColor: "bg-[#0d1117]",
    accentColor: "from-blue-600/40"
  },
  {
    id: 3,
    title: "Korea Visa",
    location: "Seoul & Busan",
    originalPrice: "Rp 1.100.000",
    promoPrice: "750rb",
    discount: "32% OFF",
    image: "https://images.unsplash.com/photo-1538669715519-5e3e6060c6f5?q=80&w=800&auto=format&fit=crop",
    baseColor: "bg-[#12121f]",
    accentColor: "from-purple-600/40"
  }
];

export default function BannerHeroAdsExtremePrice() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 8000); // Changed from 5000 to 8000 (8 seconds)
    return () => clearInterval(timer);
  }, []);

  const slide = promoSlides[currentSlide];

  return (
    <div className="absolute bottom-12 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 xl:px-16">
        
        {/* Main Wrapper - Responsive Height and Max Width */}
        <div className={`relative h-[70px] md:h-[85px] lg:h-[100px] xl:h-[110px] max-w-6xl mx-auto ${slide.baseColor} rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-colors duration-700`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="relative w-full h-full flex items-center"
            >
              {/* IMAGE SECTION with Masking */}
              <div 
                className="absolute inset-y-0 left-0 w-[70%] h-full z-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%',
                  maskImage: 'linear-gradient(to right, black 40%, transparent 95%)',
                  WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 95%)',
                }}
              />
              <div className={`absolute inset-y-0 left-0 w-1/2 h-full z-0 bg-gradient-to-r ${slide.accentColor} to-transparent opacity-60`} />

              {/* CONTENT LAYER */}
              <div className="relative z-10 w-full h-full flex items-center px-4 md:px-6 lg:px-8 xl:px-10">
                
                {/* 1. INFO AREA */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] lg:text-xs font-black bg-red-600 text-white px-2 py-0.5 lg:px-3 lg:py-1 rounded-md flex items-center gap-1 shadow-lg shadow-red-600/20">
                      <BoltIcon className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-300" /> HOT DEAL
                    </span>
                  </div>
                  <h3 className="text-white font-black text-lg md:text-2xl lg:text-3xl xl:text-4xl leading-none tracking-tight drop-shadow-xl">
                    {slide.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5 text-white/50">
                    <MapPinIcon className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    <span className="text-[9px] md:text-[10px] lg:text-xs font-medium uppercase tracking-widest">{slide.location}</span>
                  </div>
                </div>

                {/* 2. PRICE AREA */}
                <div className="flex items-center gap-4 md:gap-8 lg:gap-10 xl:gap-12 ml-auto">
                  <div className="text-right flex flex-col justify-center">
                    
                    {/* ORIGINAL PRICE & DISCOUNT BADGE */}
                    <div className="flex items-center justify-end gap-2 mb-[-1px] md:mb-0">
                      <span className="bg-white/10 text-red-400 px-1.5 py-0.5 lg:px-2 lg:py-0.5 rounded-md text-[9px] md:text-[10px] lg:text-xs font-black italic border border-red-500/20">
                        {slide.discount}
                      </span>
                      <span className="text-[10px] md:text-sm lg:text-base xl:text-lg text-white/40 line-through font-bold decoration-red-500/50">
                        {slide.originalPrice}
                      </span>
                    </div>

                    {/* PROMO PRICE (BIG & BOLD) */}
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-[10px] md:text-xs lg:text-sm font-bold text-yellow-500 mb-0.5">Rp</span>
                      <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-yellow-400 leading-none tracking-tighter drop-shadow-[0_4px_10px_rgba(250,204,21,0.3)]">
                        {slide.promoPrice}
                      </span>
                    </div>
                  </div>

                  {/* CTA BUTTON */}
                  <button className="group relative hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white rounded-2xl hover:bg-yellow-400 transition-all duration-300 shadow-xl overflow-hidden active:scale-90">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#0f1115] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* DOTS */}
          <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:gap-2 z-20">
            {promoSlides.map((_, i) => (
              <div key={i} className={`h-1 lg:h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 lg:w-8 bg-white/80' : 'w-1.5 lg:w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}