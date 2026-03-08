"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/outline"
import Navbar from "@/components/layout/Navbar"

interface BlogPost {
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string
  readTime: string
  content: React.ReactNode
}

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="relative pt-12 pb-8 bg-gradient-to-b from-navy to-navy-mid">
          <div className="container mx-auto px-4 max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <Link 
                href="/#blog"
                className="inline-flex items-center gap-2 text-orange hover:text-orange-dark transition-colors mb-6 font-dm-sans text-sm"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Kembali ke Blog
              </Link>

              {/* Category Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange/20 border border-orange/30 text-orange font-poppins font-semibold text-xs mb-4">
                {post.category}
              </div>

              {/* Title */}
              <h1 className="font-poppins font-bold text-[32px] md:text-[48px] text-white leading-tight mb-6 max-w-4xl">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span className="font-dm-sans">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="font-dm-sans">{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <span className="font-dm-sans">{post.readTime} baca</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      {/* Featured Image */}
      <section className="relative -mt-8">
        <div className="container mx-auto px-4 max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full h-[400px] md:h-[500px] rounded-[20px] overflow-hidden shadow-2xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-[900px]">
          <div className="grid md:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-8"
            >
              <div className="prose prose-lg max-w-none blog-content">
                {post.content}
              </div>

              {/* CTA Box */}
              <div className="mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[20px] border border-orange/20">
                <h3 className="font-poppins font-bold text-[20px] md:text-[24px] text-navy mb-3">
                  Butuh Bantuan Mengurus Visa?
                </h3>
                <p className="font-dm-sans text-[15px] text-gray-700 mb-6">
                  Tim Wepose Travel siap membantu proses pengajuan visa Anda dengan layanan profesional. Konsultasi gratis!
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white rounded-full px-8 py-3.5 font-poppins font-semibold text-[15px] transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Hubungi Kami Sekarang
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-4"
            >
              {/* Share Box */}
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 rounded-[16px] p-6">
                  <h4 className="font-poppins font-semibold text-[16px] text-navy mb-4 flex items-center gap-2">
                    <ShareIcon className="w-5 h-5" />
                    Bagikan Artikel
                  </h4>
                  <div className="flex flex-col gap-3">
                    <button className="flex items-center gap-3 bg-white hover:bg-gray-100 border border-gray-200 rounded-[10px] px-4 py-3 transition-colors text-left">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <span className="font-dm-sans text-sm text-gray-700">WhatsApp</span>
                    </button>
                    <button className="flex items-center gap-3 bg-white hover:bg-gray-100 border border-gray-200 rounded-[10px] px-4 py-3 transition-colors text-left">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <span className="font-dm-sans text-sm text-gray-700">Facebook</span>
                    </button>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-gray-50 rounded-[16px] p-6">
                  <h4 className="font-poppins font-semibold text-[16px] text-navy mb-4">
                    Artikel Terkait
                  </h4>
                  <div className="space-y-4">
                    <Link href="/blog/visa-jepang-wisata" className="block group">
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-[10px] overflow-hidden shrink-0">
                          <Image
                            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=80"
                            alt="Visa Jepang"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h5 className="font-poppins font-semibold text-[13px] text-navy group-hover:text-orange transition-colors line-clamp-2 mb-1">
                            Panduan Lengkap Visa Jepang untuk Wisata
                          </h5>
                          <p className="font-dm-sans text-[11px] text-gray-500">10 Jan 2024</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.aside>

          </div>
        </div>
      </section>
      </main>
    </>
  )
}
