'use client';

import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  ClockIcon, 
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-orange/10 to-orange/5 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-navy/10 to-navy/5 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center max-w-5xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm font-dm-sans">
            <a href="/" className="text-gray-500 hover:text-orange transition-colors">
              Home
            </a>
            <span className="text-gray-300">›</span>
            <a href="/tools" className="text-gray-500 hover:text-orange transition-colors">
              Tools
            </a>
            <span className="text-gray-300">›</span>
            <span className="text-navy font-medium">Quiz Kelayakan Visa</span>
          </nav>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange to-orange-dark rounded-2xl flex items-center justify-center shadow-xl shadow-orange/25">
              <LightBulbIcon className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl font-poppins font-black text-navy mb-4 leading-tight"
          >
            Quiz Kelayakan
            <br />
            <span className="bg-gradient-to-r from-orange via-orange-dark to-orange bg-clip-text text-transparent">
              Visa Impian
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-dm-sans mb-8"
          >
            Temukan visa yang paling cocok untuk profil dan tujuan perjalananmu dalam 
            <span className="font-semibold text-orange"> 8 pertanyaan singkat</span>
          </motion.p>
        </motion.div>

        {/* Features Grid - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto"
        >
          {/* Feature 1 */}
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClockIcon className="w-5 h-5 text-orange" />
              </div>
              <div>
                <h3 className="text-sm font-poppins font-bold text-navy">Cepat & Mudah</h3>
                <p className="text-gray-600 font-dm-sans text-xs">Hanya 3-5 menit</p>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-5 h-5 text-orange" />
              </div>
              <div>
                <h3 className="text-sm font-poppins font-bold text-navy">Akurat & Terpercaya</h3>
                <p className="text-gray-600 font-dm-sans text-xs">Data approval real</p>
              </div>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-orange" />
              </div>
              <div>
                <h3 className="text-sm font-poppins font-bold text-navy">Personal & Detail</h3>
                <p className="text-gray-600 font-dm-sans text-xs">Sesuai profilmu</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Benefits - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 mb-8 border border-orange-200 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-poppins font-bold text-navy mb-4 text-center">
            Yang Akan Kamu Dapatkan
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-dm-sans">Rekomendasi visa terbaik</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-dm-sans">Peluang approval akurat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-dm-sans">Tips personal khusus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-dm-sans">Checklist dokumen lengkap</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 rounded-2xl font-poppins font-bold text-lg bg-gradient-to-r from-orange via-orange-dark to-orange text-white shadow-2xl shadow-orange/30 overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-dark via-orange to-orange-dark"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3">
              Mulai Quiz Sekarang
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange/20 via-orange-dark/20 to-orange/20 blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}