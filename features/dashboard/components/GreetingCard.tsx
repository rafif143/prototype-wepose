"use client";

import { motion } from "framer-motion";

export function GreetingCard() {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const profileCompletion = 75; // Mock data
  const userName = "Rafif"; // Mock data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-navy mb-2">
            Halo, {userName}! 👋
          </h1>
          <p className="font-dm-sans text-gray-600 text-base">
            {currentDate}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="font-dm-sans text-sm text-gray-600">
            Kelengkapan Profil
          </span>
          <div className="flex items-center gap-3">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profileCompletion}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-orange h-2 rounded-full"
              />
            </div>
            <span className="font-poppins font-semibold text-sm text-orange">
              {profileCompletion}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}