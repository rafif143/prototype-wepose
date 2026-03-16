"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { ArrowRightIcon as ArrowRightOutline } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function TestimonialsSectionV2() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "Business Traveler",
      avatar: "/avatars/sarah.jpg",
      rating: 5,
      text: "Proses visa Schengen jadi sangat mudah dengan Wepose. Tim support sangat responsif dan membantu dari awal sampai visa approved. Highly recommended!",
      country: "🇫🇷 Prancis"
    },
    {
      name: "Ahmad Rizki",
      role: "Student",
      avatar: "/avatars/ahmad.jpg", 
      rating: 5,
      text: "Visa student ke Jepang yang biasanya ribet, jadi simple banget. Dokumen requirements jelas, proses cepat, dan harga transparan. Thank you Wepose!",
      country: "🇯🇵 Jepang"
    },
    {
      name: "Maya Sari",
      role: "Tourist",
      avatar: "/avatars/maya.jpg",
      rating: 5,
      text: "First time apply visa Australia, sempat worry karena banyak requirements. Tapi dengan guidance dari Wepose, semua jadi lancar dan visa approved dalam 2 minggu!",
      country: "🇦🇺 Australia"
    }
  ]

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="w-full overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1280px]">
          {/* Header - Left Aligned */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
              >
                Apa Kata Klien Kami
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="font-poppins font-semibold text-[24px] mb-4"
              >
                Tentang <span className="text-orange">WEP🌐SE</span>
              </motion.h3>
              
              {/* Google Rating */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <span className="font-dm-sans text-sm text-gray-600">
                  4.9/5 dari 1,200+ review
                </span>
              </motion.div>
            </div>
            
            {/* Right side CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="hidden md:block"
            >
              <Link href="/testimonials" className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-poppins font-semibold text-[15px] transition-colors">
                Lihat Semua Review
                <ArrowRightOutline className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </motion.div>
          </div>

          {/* Testimonial Slider */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white p-8 md:p-12 shadow-lg border border-gray-100"
                >
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Avatar & Info */}
                    <div className="text-center md:text-left">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange to-orange-dark mx-auto md:mx-0 mb-4 overflow-hidden flex items-center justify-center">
                        <span className="text-white font-poppins font-bold text-xl">
                          {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h4 className="font-poppins font-bold text-lg text-navy mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="font-dm-sans text-sm text-gray-500 mb-2">
                        {testimonials[currentIndex].role}
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-dm-sans text-sm text-orange font-semibold">
                        {testimonials[currentIndex].country}
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <div className="md:col-span-2">
                      <blockquote className="font-dm-sans text-lg leading-relaxed text-gray-700 italic">
                        "{testimonials[currentIndex].text}"
                      </blockquote>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-orange' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-12 text-center md:hidden"
          >
            <Link href="/testimonials" className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-poppins font-semibold text-[15px] hover:bg-orange-dark transition-all duration-200">
              Lihat Semua Review
              <ArrowRightOutline className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}