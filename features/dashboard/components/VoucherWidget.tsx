"use client";

import { motion } from "framer-motion";
import { Ticket, Clock } from "lucide-react";
import Link from "next/link";

export function VoucherWidget() {
  const activeVouchers = 3; // Mock data
  const nearestExpiry = "3 hari"; // Mock data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl shadow-md p-6 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Ticket className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-poppins font-bold text-lg">Voucher Aktif</h2>
        </div>

        <div className="mb-6">
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-poppins font-bold text-3xl"
          >
            {activeVouchers}
          </motion.p>
          <p className="font-dm-sans text-white/90 text-sm mt-1">
            Voucher tersedia
          </p>
        </div>

        <div className="bg-white/20 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-white/80" />
            <span className="font-dm-sans text-xs text-white/80">Segera berakhir</span>
          </div>
          <p className="font-poppins font-semibold text-sm">
            1 voucher expired dalam {nearestExpiry}
          </p>
        </div>

        <Link 
          href="/dashboard/wallet"
          className="block w-full bg-white/20 hover:bg-white/30 text-center font-poppins font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          Lihat Semua Voucher
        </Link>
      </div>
    </motion.div>
  );
}