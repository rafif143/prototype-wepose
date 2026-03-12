"use client";

import { motion } from "framer-motion";
import { Plus, History, Wallet } from "lucide-react";
import Link from "next/link";

export function SaldoWidget() {
  const saldo = 2500000; // Mock data
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-orange rounded-2xl shadow-md p-6 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-poppins font-bold text-lg">Saldo Anda</h2>
        </div>

        <div className="mb-6">
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-poppins font-bold text-2xl md:text-3xl"
          >
            {formatCurrency(saldo)}
          </motion.p>
          <p className="font-dm-sans text-white/80 text-sm mt-1">
            Tersedia untuk transaksi
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-white text-orange font-poppins font-semibold text-sm py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Top Up
          </button>
          <Link 
            href="/dashboard/wallet"
            className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
          >
            <History className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}