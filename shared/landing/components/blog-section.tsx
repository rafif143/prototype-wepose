"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { CalendarIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

export default function BlogSection() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const articles = [
    {
      slug: "jasa-visa-australia",
      category: "TIPS VISA AUSTRALIA",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Jasa Visa Australia",
      excerpt: "Mengurus visa Australia bisa menjadi proses yang cukup kompleks karena banyaknya persyaratan dan dokumen yang harus dipenuhi. Menggunakan jasa visa dapat membantu mempercepat proses pengurusan serta meminimalkan risiko penolakan. Artikel ini menjelaskan jenis visa Australia untuk WNI, proses pengurusan visa langkah demi langkah, serta tips memilih agen visa terpercaya agar pengajuan visa Anda berjalan lebih mudah dan lancar.",
      date: "5 MAR 2025",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=600&auto=format&fit=crop",
      readTime: "5 min"
    },
    {
      slug: "visa-schengen-jerman-kunjungan",
      category: "TIPS VISA JERMAN",
      categoryColor: "bg-orange-100 text-orange-700",
      title: "Visa Schengen Jerman Kunjungan",
      excerpt: "Visa Schengen Jerman Visit Family or Friends adalah visa kunjungan singkat yang memungkinkan WNI berkunjung keluarga atau teman. Tinggal maksimal 90 hari dalam periode 180 hari. Artikel ini menjelaskan syarat visa kunjungan Jerman, dokumen yang diperlukan, estimasi proses pengurusan, serta tips agar aplikasi visa Schengen Anda disetujui tanpa hambatan.",
      date: "5 MAR 2025",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop",
      readTime: "7 min"
    },
    {
      slug: "proses-visa-jerman-berapa-lama",
      category: "TIPS VISA JERMAN",
      categoryColor: "bg-orange-100 text-orange-700",
      title: "Proses Visa Jerman Berapa Lama?",
      excerpt: "Berapa lama proses visa Jerman Schengen? Waktu pemrosesan visa biasanya berkisar 10-15 hari kerja untuk visa kunjungan singkat, namun bisa lebih lama tergantung jenis visa, kelengkapan dokumen, dan volume aplikasi. Artikel ini menjelaskan estimasi proses dan faktor yang memengaruhi pengurusan visa Jerman, faktor yang memengaruhi prosesnya, serta tips penting agar aplikasi visa Anda diproses lebih cepat dan lancar.",
      date: "5 MAR 2025",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "tips-visa-korea-selatan",
      category: "TIPS VISA KOREA",
      categoryColor: "bg-purple-100 text-purple-700",
      title: "Tips Visa Korea Selatan",
      excerpt: "Mengajukan visa Korea Selatan memerlukan persiapan dokumen yang lengkap dan akurat. Artikel ini memberikan tips praktis untuk meningkatkan peluang approval visa Korea, mulai dari persyaratan dokumen, cara mengisi formulir aplikasi, hingga persiapan wawancara di kedutaan. Pelajari juga kesalahan umum yang harus dihindari agar proses pengajuan visa Anda berjalan lancar.",
      date: "4 MAR 2025",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=600&auto=format&fit=crop",
      readTime: "8 min"
    },
    {
      slug: "panduan-visa-jepang-tourist",
      category: "TIPS VISA JEPANG",
      categoryColor: "bg-red-100 text-red-700",
      title: "Panduan Visa Jepang Tourist",
      excerpt: "Visa turis Jepang adalah salah satu visa yang paling banyak diajukan oleh WNI. Proses pengurusannya relatif cepat dengan tingkat approval yang tinggi jika dokumen lengkap. Artikel ini menjelaskan persyaratan lengkap visa turis Jepang, cara mengajukan, estimasi biaya, serta tips agar aplikasi visa Anda disetujui dengan cepat dan mudah.",
      date: "3 MAR 2025",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "cara-apply-visa-schengen",
      category: "TIPS VISA SCHENGEN",
      categoryColor: "bg-green-100 text-green-700",
      title: "Cara Apply Visa Schengen",
      excerpt: "Visa Schengen memungkinkan Anda mengunjungi 27 negara Eropa dengan satu visa. Proses aplikasinya memerlukan persiapan yang matang dan dokumen yang lengkap. Artikel ini memberikan panduan lengkap cara apply visa Schengen, mulai dari menentukan negara tujuan utama, menyiapkan dokumen, booking appointment, hingga tips menghadapi interview di kedutaan.",
      date: "2 MAR 2025",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
      readTime: "10 min"
    }
  ]

  return (
    <section id="blog" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-poppins font-semibold text-[28px] md:text-[36px] text-navy mb-2"
          >
            Tips & Panduan <span className="text-orange">Visa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-dm-sans text-base text-gray-600"
          >
            Informasi imigrasi terbaru dan tips perjalanan dari spesialis kami.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {articles.map((article, idx) => (
            <motion.article
              key={idx}
              variants={itemAnim}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="bg-white rounded-[16px] shadow-md hover:shadow-xl overflow-hidden cursor-pointer flex flex-col border border-gray-100 transition-shadow duration-300"
            >
              <Link href={`/blog/${article.slug}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${article.categoryColor} text-[10px] font-poppins font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon className="w-4 h-4 text-orange" />
                    <span className="font-dm-sans text-[11px] text-orange font-medium uppercase tracking-wide">
                      {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-semibold text-[18px] text-navy mb-3 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="font-dm-sans text-[13px] text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="font-dm-sans text-[12px] text-gray-500">
                      {article.readTime} read
                    </span>
                    <button className="flex items-center gap-1.5 text-navy hover:text-orange transition-colors font-poppins font-semibold text-[13px] group">
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200"
          >
            Lihat Semua Artikel
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
