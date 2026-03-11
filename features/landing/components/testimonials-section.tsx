"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { StarIcon } from "@heroicons/react/24/solid"

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Zahranjn 141",
      avatar: "https://ui-avatars.com/api/?name=Z+141&background=F97316&color=fff&size=80",
      review: "My visa application experience yesterday was very satisfying 😁😁 Thank you Nila, and the Wepose team for your help and patience. Always",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Milo694 Minnie",
      avatar: "https://ui-avatars.com/api/?name=M+694&background=F97316&color=fff&size=80",
      review: "Thank you WePose!!! When I first started processing the application, it was called Pose, but in the middle of the process, it suddenly changed",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Umi Muthioh Syahiroh",
      avatar: "https://ui-avatars.com/api/?name=U+M&background=F97316&color=fff&size=80",
      review: "I recently used Pose Travel to handle my Taiwan visa application, and I'm very satisfied with their service. They are informative, helpful, and truly",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "syahrul romadon",
      avatar: "https://ui-avatars.com/api/?name=S+R&background=7C3AED&color=fff&size=80",
      review: "reliable and fast visa service",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Ranis Sheraffica",
      avatar: "https://ui-avatars.com/api/?name=R+S&background=F97316&color=fff&size=80",
      review: "highly recommended visa service, thank you kak Zulia and Pose Travel 🙏🏻 I had a great experience",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Ahmad Fauzi",
      avatar: "https://ui-avatars.com/api/?name=A+F&background=16A34A&color=fff&size=80",
      review: "Proses visa Jepang saya sangat cepat dan mudah. Tim Wepose sangat responsif dan membantu. Highly recommended!",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Siti Nurhaliza",
      avatar: "https://ui-avatars.com/api/?name=S+N&background=DC2626&color=fff&size=80",
      review: "Pelayanan terbaik! Visa Schengen saya disetujui dalam waktu 2 minggu. Terima kasih Wepose team!",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Budi Santoso",
      avatar: "https://ui-avatars.com/api/?name=B+S&background=1D4ED8&color=fff&size=80",
      review: "Sangat profesional dan terpercaya. Visa Australia saya approved tanpa masalah. Thank you Wepose!",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Linda Wijaya",
      avatar: "https://ui-avatars.com/api/?name=L+W&background=F97316&color=fff&size=80",
      review: "Excellent service! Staff sangat helpful dan sabar menjawab semua pertanyaan saya. Visa Korea approved!",
      rating: 5,
      source: "Lihat di Google"
    },
    {
      name: "Rudi Hermawan",
      avatar: "https://ui-avatars.com/api/?name=R+H&background=7C3AED&color=fff&size=80",
      review: "Wepose is the best! Proses cepat, harga reasonable, dan hasil memuaskan. Pasti pakai lagi untuk visa berikutnya.",
      rating: 5,
      source: "Lihat di Google"
    }
  ]

  // Duplicate reviews for seamless loop
  const allReviews = [...reviews, ...reviews]

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="w-full overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1280px]">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
            >
              Apa Kata Klien Kami
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-poppins font-semibold text-[24px] mb-4"
            >
              Tentang <span className="text-orange">WEP🌐SE</span>
            </motion.h3>
            
            {/* Google Rating */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <Image 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                width={92}
                height={30}
                className="h-[30px] w-auto"
              />
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-orange fill-orange" />
                  ))}
                </div>
                <span className="font-dm-sans text-[13px] text-gray-600">5.0 Star Review</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Auto-scrolling Reviews - 2 Rows */}
        <div className="space-y-6">
          {/* First Row - Scroll Right */}
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1920]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear"
                }
              }}
              whileHover={{ animationPlayState: "paused" }}
              className="flex gap-6"
              style={{ width: "fit-content" }}
            >
              {allReviews.map((review, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="bg-white rounded-[16px] shadow-md hover:shadow-lg p-6 border border-gray-100 transition-shadow duration-300 w-[360px] flex-shrink-0"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-poppins font-semibold text-[14px] text-navy truncate">
                          {review.name}
                        </h4>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-3.5 h-3.5 text-orange fill-orange" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <a 
                      href="#"
                      className="text-[11px] text-blue-600 hover:underline font-dm-sans whitespace-nowrap ml-2"
                    >
                      {review.source}
                    </a>
                  </div>

                  {/* Review Text */}
                  <p className="font-dm-sans text-[13px] text-gray-700 leading-relaxed line-clamp-4">
                    "{review.review}"
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Scroll Left */}
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                x: [-1920, 0]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear"
                }
              }}
              whileHover={{ animationPlayState: "paused" }}
              className="flex gap-6"
              style={{ width: "fit-content" }}
            >
              {allReviews.map((review, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="bg-white rounded-[16px] shadow-md hover:shadow-lg p-6 border border-gray-100 transition-shadow duration-300 w-[360px] flex-shrink-0"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-poppins font-semibold text-[14px] text-navy truncate">
                          {review.name}
                        </h4>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-3.5 h-3.5 text-orange fill-orange" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <a 
                      href="#"
                      className="text-[11px] text-blue-600 hover:underline font-dm-sans whitespace-nowrap ml-2"
                    >
                      {review.source}
                    </a>
                  </div>

                  {/* Review Text */}
                  <p className="font-dm-sans text-[13px] text-gray-700 leading-relaxed line-clamp-4">
                    "{review.review}"
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
