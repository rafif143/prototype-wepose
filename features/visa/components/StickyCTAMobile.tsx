"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { VisaData } from "@/lib/visa-data";

interface StickyCTAMobileProps {
  visa: VisaData;
}

export function StickyCTAMobile({ visa }: StickyCTAMobileProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show when scrolled past hero (approx 400px)
    setIsVisible(latest > 400);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.10)]"
          style={{
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
            paddingTop: '12px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-poppins font-semibold text-sm text-navy truncate">{visa.name}</p>
              <p className="font-poppins font-bold text-lg text-orange">{visa.priceDisplay}</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-colors whitespace-nowrap">
              <span>Mulai Apply</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
