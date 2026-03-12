"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon, CheckCircleIcon, ClockIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function TrackVisaSection() {
  const [trackingCode, setTrackingCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleTrack = () => {
    if (trackingCode.trim()) {
      router.push('/auth');
    }
  };

  const handleTrackDirectly = () => {
    setShowModal(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  return (
    <>
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
          <div className="text-center max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-navy mb-3">
                Track Visa Anda
              </h2>
              <p className="font-dm-sans text-gray-600 text-lg">
                Pantau status pengajuan visa secara real-time
              </p>
            </motion.div>

            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Masukkan kode tracking visa"
                  className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-xl font-dm-sans text-base placeholder-gray-400 focus:border-orange focus:outline-none transition-colors"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleTrack}
                  disabled={!trackingCode.trim()}
                  className="w-full bg-orange hover:bg-orange-dark text-white font-poppins font-semibold text-base py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Track Sekarang
                </button>

                <button
                  onClick={handleTrackDirectly}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-poppins font-medium text-base py-4 rounded-xl transition-colors border border-gray-200"
                >
                  Track Directly (Demo)
                </button>
              </div>

              <p className="font-dm-sans text-sm text-gray-500 mt-4">
                Belum punya akun? <span className="text-orange font-medium cursor-pointer hover:underline" onClick={() => router.push('/auth')}>Daftar di sini</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracking Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-orange to-orange-dark px-6 py-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-white mb-2">
                  Visa Tracking Found!
                </h3>
                <p className="font-dm-sans text-white/90 text-sm">
                  Kode: WP2024001234
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Status Timeline */}
                <div className="space-y-4">
                  {[
                    { status: 'completed', title: 'Dokumen Diterima', date: '15 Jan 2024', desc: 'Semua dokumen telah diterima dan diverifikasi' },
                    { status: 'completed', title: 'Proses di Kedutaan', date: '18 Jan 2024', desc: 'Dokumen sedang diproses di kedutaan' },
                    { status: 'active', title: 'Interview Scheduled', date: '22 Jan 2024', desc: 'Wawancara dijadwalkan pada tanggal ini' },
                    { status: 'pending', title: 'Visa Ready', date: 'Pending', desc: 'Menunggu hasil wawancara' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                        step.status === 'completed' ? 'bg-orange' :
                        step.status === 'active' ? 'bg-orange animate-pulse' :
                        'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-poppins font-semibold text-sm text-navy">{step.title}</h4>
                          <span className="font-dm-sans text-xs text-gray-500">{step.date}</span>
                        </div>
                        <p className="font-dm-sans text-xs text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Steps */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-poppins font-semibold text-sm text-navy mb-1">Next Steps</h4>
                      <p className="font-dm-sans text-xs text-gray-600">
                        Harap datang ke kedutaan pada tanggal 22 Jan 2024 pukul 10:00 WIB untuk wawancara. Bawa dokumen asli dan fotokopi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-orange hover:bg-orange-dark text-white font-poppins font-semibold text-sm py-3 rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}