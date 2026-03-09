"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import type { VisaData } from "@/features/visa/lib/data";

interface FaqTabProps {
  visa: VisaData;
}

export function FaqTab({ visa }: FaqTabProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq" className="space-y-6">
      <h3 className="font-poppins font-semibold text-2xl text-navy mb-6">Pertanyaan Seputar Visa Ini</h3>

      <div className="space-y-3">
        {visa.faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-poppins font-medium text-base text-navy pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="font-dm-sans text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Link */}
      <div className="text-center pt-4">
        <button className="inline-flex items-center gap-2 font-dm-sans font-medium text-base text-orange hover:text-orange-dark transition-colors">
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span>Masih ada pertanyaan? Chat dengan konsultan kami →</span>
        </button>
      </div>
    </div>
  );
}
