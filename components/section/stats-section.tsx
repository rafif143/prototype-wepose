"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const StatCounter = ({ end, duration = 1.2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>
}

export default function StatsSection() {
  const stats = [
    { num: 35, suffix: "+", label: "Negara" },
    { num: 100, suffix: "+", label: "Tipe Visa" },
    { num: 10000, suffix: "+", label: "Pelanggan Puas" },
    { num: 5, suffix: "+", label: "Tahun Pengalaman" },
  ]

  return (
    <section className="bg-[#FF6B00] py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/20"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center ${idx % 2 === 0 ? 'border-none lg:border-solid lg:border-white/20 lg:border-l-0' : 'border-l-0 lg:border-solid lg:border-l-[1px] lg:border-white/20'}`}>
              <div className="font-poppins font-bold text-[44px] md:text-[56px] text-white mb-2 tracking-tight leading-none">
                <StatCounter end={stat.num} />{stat.suffix}
              </div>
              <div className="font-dm-sans text-[12px] md:text-[13px] text-white/90 font-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
