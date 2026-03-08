"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { CalendarIcon, ArrowRightIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export default function BlogListClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 10

  const articles = [
    {
      slug: "jasa-visa-australia",
      category: "TIPS VISA AUSTRALIA",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Jasa Visa Australia",
      excerpt: "Mengurus visa Australia bisa menjadi proses yang cukup kompleks karena banyaknya persyaratan dan dokumen yang harus dipenuhi. Menggunakan jasa visa dapat membantu mempercepat proses pengurusan serta meminimalkan risiko penolakan.",
      date: "5 MAR 2025",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=600&auto=format&fit=crop",
      readTime: "5 min"
    },
    {
      slug: "visa-schengen-jerman-kunjungan",
      category: "TIPS VISA JERMAN",
      categoryColor: "bg-orange-100 text-orange-700",
      title: "Visa Schengen Jerman Kunjungan",
      excerpt: "Visa Schengen Jerman Visit Family or Friends adalah visa kunjungan singkat yang memungkinkan WNI berkunjung keluarga atau teman. Tinggal maksimal 90 hari dalam periode 180 hari.",
      date: "5 MAR 2025",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop",
      readTime: "7 min"
    },
    {
      slug: "proses-visa-jerman-berapa-lama",
      category: "TIPS VISA JERMAN",
      categoryColor: "bg-orange-100 text-orange-700",
      title: "Proses Visa Jerman Berapa Lama?",
      excerpt: "Berapa lama proses visa Jerman Schengen? Waktu pemrosesan visa biasanya berkisar 10-15 hari kerja untuk visa kunjungan singkat, namun bisa lebih lama tergantung jenis visa, kelengkapan dokumen, dan volume aplikasi.",
      date: "5 MAR 2025",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "tips-visa-korea-selatan",
      category: "TIPS VISA KOREA",
      categoryColor: "bg-purple-100 text-purple-700",
      title: "Tips Visa Korea Selatan",
      excerpt: "Mengajukan visa Korea Selatan memerlukan persiapan dokumen yang lengkap dan akurat. Artikel ini memberikan tips praktis untuk meningkatkan peluang approval visa Korea.",
      date: "4 MAR 2025",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=600&auto=format&fit=crop",
      readTime: "8 min"
    },
    {
      slug: "panduan-visa-jepang-tourist",
      category: "TIPS VISA JEPANG",
      categoryColor: "bg-red-100 text-red-700",
      title: "Panduan Visa Jepang Tourist",
      excerpt: "Visa turis Jepang adalah salah satu visa yang paling banyak diajukan oleh WNI. Proses pengurusannya relatif cepat dengan tingkat approval yang tinggi jika dokumen lengkap.",
      date: "3 MAR 2025",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "cara-apply-visa-schengen",
      category: "TIPS VISA SCHENGEN",
      categoryColor: "bg-green-100 text-green-700",
      title: "Cara Apply Visa Schengen",
      excerpt: "Visa Schengen memungkinkan Anda mengunjungi 27 negara Eropa dengan satu visa. Proses aplikasinya memerlukan persiapan yang matang dan dokumen yang lengkap.",
      date: "2 MAR 2025",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
      readTime: "10 min"
    },
    {
      slug: "visa-amerika-serikat-tourist",
      category: "TIPS VISA AMERIKA",
      categoryColor: "bg-indigo-100 text-indigo-700",
      title: "Visa Amerika Serikat untuk Turis",
      excerpt: "Panduan lengkap mengajukan visa turis Amerika Serikat (B1/B2). Pelajari persyaratan dokumen, proses interview, dan tips agar visa disetujui.",
      date: "1 MAR 2025",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=600&auto=format&fit=crop",
      readTime: "9 min"
    },
    {
      slug: "visa-inggris-uk-panduan",
      category: "TIPS VISA UK",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Panduan Visa Inggris (UK)",
      excerpt: "Cara mengajukan visa Inggris untuk berbagai tujuan: turis, studi, atau kerja. Lengkap dengan persyaratan dan estimasi biaya.",
      date: "28 FEB 2025",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
      readTime: "8 min"
    },
    {
      slug: "visa-singapura-gratis",
      category: "TIPS VISA SINGAPURA",
      categoryColor: "bg-red-100 text-red-700",
      title: "Visa Singapura: Gratis atau Berbayar?",
      excerpt: "Informasi lengkap tentang visa Singapura untuk WNI. Kapan perlu visa, kapan bebas visa, dan bagaimana cara mengurusnya.",
      date: "27 FEB 2025",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop",
      readTime: "5 min"
    },
    {
      slug: "visa-thailand-on-arrival",
      category: "TIPS VISA THAILAND",
      categoryColor: "bg-yellow-100 text-yellow-700",
      title: "Visa Thailand: On Arrival vs E-Visa",
      excerpt: "Perbedaan visa on arrival dan e-visa Thailand. Mana yang lebih mudah dan cepat untuk perjalanan Anda?",
      date: "26 FEB 2025",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "visa-kanada-tourist-guide",
      category: "TIPS VISA KANADA",
      categoryColor: "bg-red-100 text-red-700",
      title: "Visa Kanada untuk Turis",
      excerpt: "Panduan lengkap mengurus visa turis Kanada. Dari persyaratan dokumen hingga tips interview yang efektif.",
      date: "25 FEB 2025",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop",
      readTime: "7 min"
    },
    {
      slug: "visa-prancis-schengen",
      category: "TIPS VISA PRANCIS",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Visa Prancis: Panduan Schengen",
      excerpt: "Cara mengajukan visa Schengen melalui kedutaan Prancis. Tips dan trik agar aplikasi visa Anda disetujui.",
      date: "24 FEB 2025",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
      readTime: "8 min"
    },
    {
      slug: "visa-malaysia-requirements",
      category: "TIPS VISA MALAYSIA",
      categoryColor: "bg-yellow-100 text-yellow-700",
      title: "Persyaratan Visa Malaysia",
      excerpt: "Informasi lengkap persyaratan visa Malaysia untuk WNI. Dokumen apa saja yang perlu disiapkan?",
      date: "23 FEB 2025",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=600&auto=format&fit=crop",
      readTime: "5 min"
    },
    {
      slug: "visa-china-tourist-business",
      category: "TIPS VISA CHINA",
      categoryColor: "bg-red-100 text-red-700",
      title: "Visa China: Turis vs Bisnis",
      excerpt: "Perbedaan visa turis dan bisnis China. Mana yang sesuai dengan kebutuhan perjalanan Anda?",
      date: "22 FEB 2025",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600&auto=format&fit=crop",
      readTime: "7 min"
    },
    {
      slug: "visa-italia-schengen-tips",
      category: "TIPS VISA ITALIA",
      categoryColor: "bg-green-100 text-green-700",
      title: "Tips Visa Italia Schengen",
      excerpt: "Panduan praktis mengajukan visa Schengen Italia. Dari dokumen hingga interview di kedutaan.",
      date: "21 FEB 2025",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "visa-belanda-netherlands",
      category: "TIPS VISA BELANDA",
      categoryColor: "bg-orange-100 text-orange-700",
      title: "Visa Belanda (Netherlands)",
      excerpt: "Cara mengurus visa Belanda untuk berbagai keperluan. Lengkap dengan estimasi waktu proses.",
      date: "20 FEB 2025",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=600&auto=format&fit=crop",
      readTime: "7 min"
    },
    {
      slug: "visa-spanyol-spain-guide",
      category: "TIPS VISA SPANYOL",
      categoryColor: "bg-yellow-100 text-yellow-700",
      title: "Panduan Visa Spanyol",
      excerpt: "Informasi lengkap visa Spanyol untuk WNI. Dari persyaratan hingga tips agar visa disetujui.",
      date: "19 FEB 2025",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=600&auto=format&fit=crop",
      readTime: "8 min"
    },
    {
      slug: "visa-swiss-switzerland",
      category: "TIPS VISA SWISS",
      categoryColor: "bg-red-100 text-red-700",
      title: "Visa Swiss (Switzerland)",
      excerpt: "Panduan mengajukan visa Swiss Schengen. Persyaratan dokumen dan proses aplikasi yang perlu diketahui.",
      date: "18 FEB 2025",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    },
    {
      slug: "visa-turki-turkey-evisa",
      category: "TIPS VISA TURKI",
      categoryColor: "bg-red-100 text-red-700",
      title: "Visa Turki: E-Visa Online",
      excerpt: "Cara mudah mengurus e-visa Turki secara online. Proses cepat dan praktis untuk perjalanan Anda.",
      date: "17 FEB 2025",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop",
      readTime: "5 min"
    },
    {
      slug: "visa-dubai-uae-requirements",
      category: "TIPS VISA UAE",
      categoryColor: "bg-blue-100 text-blue-700",
      title: "Visa Dubai (UAE): Persyaratan",
      excerpt: "Informasi lengkap persyaratan visa Dubai dan UAE. Dokumen apa saja yang perlu disiapkan untuk perjalanan Anda?",
      date: "16 FEB 2025",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min"
    }
  ]

  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-navy to-navy-mid">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-poppins font-bold text-[36px] md:text-[48px] text-white leading-tight mb-4">
              Blog Travel & Visa
            </h1>
            <p className="font-poppins font-semibold text-[20px] md:text-[24px] text-orange mb-4">
              Eksplorasi Dunia Tanpa Batas
            </p>
            <p className="font-dm-sans text-[16px] md:text-[18px] text-gray-300 max-w-3xl mx-auto mb-8">
              Temukan panduan visa mendalam, tips perjalanan cerdas, dan berita terbaru imigrasi untuk perjalanan internasional Anda.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari artikel visa, negara, atau tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-navy placeholder-gray-400 font-dm-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-orange shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-[1280px]">
          {/* Results Count */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <p className="font-dm-sans text-gray-600">
                Ditemukan <span className="font-semibold text-navy">{filteredArticles.length}</span> artikel
                {searchQuery && ` untuk "${searchQuery}"`}
              </p>
            </motion.div>
          )}

          {filteredArticles.length > 0 ? (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentArticles.map((article, idx) => (
              <motion.article
                key={`${currentPage}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * idx, ease: "easeOut" }}
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
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="font-poppins text-[20px] text-gray-600 mb-2">
                Tidak ada artikel ditemukan
              </p>
              <p className="font-dm-sans text-gray-500">
                Coba kata kunci lain atau hapus filter pencarian
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredArticles.length > articlesPerPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex justify-center items-center gap-2"
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-dm-sans font-medium text-sm transition-all ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-navy hover:bg-orange hover:text-white hover:border-orange'
                }`}
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-full font-dm-sans font-medium text-sm transition-all ${
                      currentPage === pageNumber
                        ? 'bg-orange text-white'
                        : 'bg-white border border-gray-200 text-navy hover:bg-orange hover:text-white hover:border-orange'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-dm-sans font-medium text-sm transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-navy hover:bg-orange hover:text-white hover:border-orange'
                }`}
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
