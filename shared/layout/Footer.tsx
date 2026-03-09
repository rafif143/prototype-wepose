"use client"

import React from "react"
import Link from "next/link"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 border-t border-navy-mid/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-poppins font-bold text-2xl text-white">WE</span>
              <span className="font-poppins font-bold text-2xl text-orange">POSE</span>
            </Link>
            <p className="text-gray-400 font-dm-sans text-sm mb-6">
              Platform visa terpercaya untuk traveler Indonesia
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-navy-mid flex items-center justify-center text-white hover:bg-orange transition-colors">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Layanan</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Katalog Visa</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Quiz Kelayakan</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Bandingkan Visa</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Generate Surat Sponsor</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Promo</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Karir</Link></li>
              <li><Link href="#" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Kontak</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-400 font-dm-sans text-sm">WhatsApp: 0812-xxxx-xxxx</li>
              <li className="text-gray-400 font-dm-sans text-sm">Email: halo@wepose.id</li>
              <li className="text-gray-400 font-dm-sans text-sm">Jam: Sen–Jum 09.00–18.00 WIB</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 font-dm-sans text-sm">© 2026 Wepose</p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 font-dm-sans text-sm hover:text-orange transition-colors">Kebijakan Privasi</Link>
            <span className="text-gray-700">·</span>
            <Link href="#" className="text-gray-500 font-dm-sans text-sm hover:text-orange transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
