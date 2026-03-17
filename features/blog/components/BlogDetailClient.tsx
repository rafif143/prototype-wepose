"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { BlogSidebar } from "./BlogSidebar"
import { RelatedVisaDestinations } from "./RelatedVisaDestinations"
import { RelatedPosts } from "./RelatedPosts"
import { Flag } from '@/shared/ui/Flag'

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

// Mock data untuk related content
const mockCategories = [
  { id: "1", name: "Tips Visa Jerman" },
  { id: "2", name: "Visa Australia" },
  { id: "3", name: "Visa Korea" },
]

const mockRelatedPosts = [
  {
    id: "1",
    slug: "proses-visa-jerman-berapa-lama",
    title: "PROSES VISA JERMAN BERAPA LAMA?",
    categoryId: "1",
    coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=200&q=80",
  },
]

const mockVisaDestinations = [
  {
    id: "1",
    negaraTujuan: "GERMANY",
    countryCode: "de",
    hargaDasar: "3250000",
    masaBerlaku: 5,
  },
]

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  // Transform post data untuk BlogSidebar
  const sidebarPost = {
    id: "1",
    title: post.title,
    categoryId: "1",
    views: 31,
    author: {
      name: post.author,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Dark Teal Background */}
      <div className="relative bg-[#0C3D4F] min-h-[600px] overflow-hidden">
        {/* Decorative Globe Background */}
        <div 
          className="absolute right-0 top-0 w-[600px] h-[600px] opacity-10"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='300' cy='300' r='250' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M 300 50 Q 450 300 300 550' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M 300 50 Q 150 300 300 550' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M 50 300 Q 300 150 550 300' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M 50 300 Q 300 450 550 300' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
        />

        <div className="container mx-auto max-w-[1200px] px-6 py-12 relative z-10">
          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 font-dm-sans text-[14px]"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            KEMBALI KE PANDUAN
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-[#FC8039] text-white text-[11px] font-black uppercase tracking-wider rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-poppins font-black text-white text-[36px] md:text-[48px] lg:text-[56px] leading-tight mb-8 max-w-[800px] uppercase">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-white/70 text-[13px] font-dm-sans mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FC8039] flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <span className="uppercase font-bold">BY {post.author.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="uppercase font-bold">{post.date.toUpperCase()}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full max-w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              <div className="font-dm-sans text-[16px] text-gray-700 leading-relaxed space-y-6">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-poppins font-semibold text-[#0C3D4F] text-[14px]">Tags:</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[12px] rounded-full hover:bg-[#FC8039] hover:text-white transition-colors cursor-pointer font-bold">
                  Visa Jerman
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[12px] rounded-full hover:bg-[#FC8039] hover:text-white transition-colors cursor-pointer font-bold">
                  Visa Schengen
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[12px] rounded-full hover:bg-[#FC8039] hover:text-white transition-colors cursor-pointer font-bold">
                  Kunjungan Keluarga
                </span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-gradient-to-r from-[#FC8039] to-orange-600 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl">
              <h3 className="font-poppins font-black text-[28px] mb-4">
                Ingin mengunjungi keluarga atau teman di Jerman tanpa ribet mengurus visa?
              </h3>
              <p className="font-dm-sans text-[15px] mb-6 text-white/95 leading-relaxed">
                Tim Wepose Travel siap membantu proses pengajuan visa Schengen Anda dengan layanan profesional.
              </p>
              <p className="font-dm-sans text-[15px] mb-8 text-white/95">
                Kunjungi kantor kami di <strong>Jakarta</strong> atau <strong>Surabaya</strong> atau hubungi tim kami untuk konsultasi gratis.
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-white text-[#FC8039] px-8 py-3.5 rounded-full font-poppins font-black text-[14px] hover:bg-slate-50 transition-all duration-200 shadow-lg uppercase tracking-wider"
              >
                Konsultasi Sekarang
              </Link>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="font-poppins font-black text-[32px] text-[#0C3D4F] mb-8 uppercase">
                FAQ – Visa Kunjungan Jerman
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#FC8039] pl-6 py-2">
                  <h3 className="font-poppins font-bold text-[18px] text-[#0C3D4F] mb-2">
                    1. Apa itu visa Schengen kunjungan keluarga Jerman?
                  </h3>
                  <p className="font-dm-sans text-[15px] text-gray-700 leading-relaxed">
                    Visa ini adalah visa short stay yang memungkinkan Anda mengunjungi keluarga atau teman di Jerman hingga 90 hari dalam periode 180 hari.
                  </p>
                </div>

                <div className="border-l-4 border-[#FC8039] pl-6 py-2">
                  <h3 className="font-poppins font-bold text-[18px] text-[#0C3D4F] mb-2">
                    2. Berapa lama masa tinggal visa kunjungan Jerman?
                  </h3>
                  <p className="font-dm-sans text-[15px] text-gray-700 leading-relaxed">
                    Durasi tinggal maksimal adalah 90 hari dalam periode 180 hari.
                  </p>
                </div>

                <div className="border-l-4 border-[#FC8039] pl-6 py-2">
                  <h3 className="font-poppins font-bold text-[18px] text-[#0C3D4F] mb-2">
                    3. Apakah perlu surat undangan untuk visa kunjungan?
                  </h3>
                  <p className="font-dm-sans text-[15px] text-gray-700 leading-relaxed">
                    Ya. Surat undangan dari keluarga atau teman yang tinggal di Jerman merupakan dokumen penting untuk visa ini.
                  </p>
                </div>

                <div className="border-l-4 border-[#FC8039] pl-6 py-2">
                  <h3 className="font-poppins font-bold text-[18px] text-[#0C3D4F] mb-2">
                    4. Berapa lama proses visa Schengen Jerman?
                  </h3>
                  <p className="font-dm-sans text-[15px] text-gray-700 leading-relaxed">
                    Proses visa biasanya memakan waktu sekitar 5 hingga 20 hari kerja.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-8">
              <BlogSidebar post={sidebarPost} categories={mockCategories} />
              <RelatedVisaDestinations destinations={mockVisaDestinations} />
              <RelatedPosts posts={mockRelatedPosts} categories={mockCategories} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
