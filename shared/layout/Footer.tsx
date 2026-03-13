"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 border-t border-navy-mid/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Col 1 - Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center">
                <span className="font-poppins font-bold text-2xl text-white">WEP</span>
                <img 
                  src="/wepose-logo-mini.svg" 
                  alt="Wepose Logo" 
                  className="w-6 h-6 mx-0.5"
                />
                <span className="font-poppins font-bold text-2xl text-orange">SE</span>
              </div>
            </Link>
            <p className="text-gray-400 font-dm-sans text-sm mb-6">
              Platform visa terpercaya untuk traveler Indonesia
            </p>
          </div>

          {/* Col 2 - Services */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Layanan</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/visa" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Katalog Visa</Link></li>
              <li><Link href="/tools/quiz" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Quiz Kelayakan</Link></li>
              <li><Link href="/tools/compare" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Bandingkan Visa</Link></li>
              <li><Link href="/tools/sponsor-letter" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Surat Sponsor</Link></li>
              <li><Link href="/blog" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Blog & Panduan</Link></li>
            </ul>
          </div>

          {/* Col 3 - Contact & Legal */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Kontak & Info</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/contact" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Hubungi Kami</Link></li>
              <li className="text-gray-400 font-dm-sans text-sm">WhatsApp: +62 812-3456-7890</li>
              <li className="text-gray-400 font-dm-sans text-sm">Email: halo@wepose.id</li>
              <li className="text-gray-400 font-dm-sans text-sm">Jam: Sen–Jum 09.00–18.00 WIB</li>
              <li><Link href="/tos" className="text-gray-400 font-dm-sans text-sm hover:text-orange transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-gray-500 font-dm-sans text-sm">
            <span>© 2026 WEP</span>
            <img 
              src="/wepose-logo-mini.svg" 
              alt="Wepose Logo" 
              className="w-3 h-3 mx-0.5"
            />
            <span>SE. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth" className="text-gray-500 font-dm-sans text-sm hover:text-orange transition-colors">Login</Link>
            <span className="text-gray-700">·</span>
            <Link href="/dashboard" className="text-gray-500 font-dm-sans text-sm hover:text-orange transition-colors">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
