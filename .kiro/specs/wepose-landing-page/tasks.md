# Implementation Plan: WEPOSE Landing Page

## Overview

Implementasi landing page WEPOSE menggunakan Next.js 14 (App Router), TypeScript, Tailwind CSS, dan Framer Motion. Landing page ini akan dibangun secara incremental dengan fokus pada komponen reusable, animasi yang smooth, dan responsive design yang optimal di semua device sizes.

## Tasks

- [ ] 1. Setup project structure dan dependencies
  - Initialize Next.js 14 project dengan App Router dan TypeScript
  - Install dependencies: tailwindcss, framer-motion, heroicons, dotted-map
  - Configure Tailwind CSS dengan custom colors (orange, navy, gray tokens)
  - Setup Google Fonts (Poppins dan DM Sans) via next/font/google
  - Create folder structure: components/{layout,sections,ui}, lib/, hooks/
  - _Requirements: 13.1, 13.2, 13.3, 14.1-14.11_

- [ ] 2. Create core UI components dan utilities
  - [ ] 2.1 Implement Button component dengan variants dan sizes
    - Create Button.tsx dengan props interface (variant, size, icon, iconPosition)
    - Implement 3 variants: solid (orange), ghost (transparent), outline (border)
    - Implement 3 sizes: sm, md, lg dengan responsive padding
    - Add Framer Motion hover effects (y: -2, shadow) dan tap effect (scale: 0.97)
    - _Requirements: 15.1, 15.8_
  
  - [ ] 2.2 Implement Badge component untuk section headers
    - Create Badge.tsx dengan props interface (variant, size, className)
    - Implement 3 variants: orange, green, blue dengan background/border/text colors
    - Use Poppins SemiBold uppercase dengan sizes 11px (sm) dan 12px (md)
    - _Requirements: 13.8_
  
  - [ ] 2.3 Create constants dan types files
    - Create lib/constants.ts dengan color tokens, animation configs, breakpoints
    - Create lib/types.ts dengan interfaces: Visa, NavLink, FAQ, Review, Step, Stat, MapDot
    - Export visa data, navigation links, FAQ data, review data, steps data, stats data
    - _Requirements: 14.1-14.11_
  
  - [ ] 2.4 Implement useCountUp custom hook
    - Create hooks/useCountUp.ts dengan parameters (target, duration)
    - Implement easing function untuk smooth count-up animation
    - Return current count value yang dapat digunakan di StatsCounter
    - _Requirements: 4.14, 7.8_

- [ ] 3. Implement WorldMap component
  - [ ] 3.1 Create WorldMap component dengan dotted-map library
    - Create ui/WorldMap.tsx dengan props interface (dots, lineColor, showLabels, animationDuration, loop)
    - Integrate dotted-map library untuk generate map SVG
    - Implement responsive SVG yang scale dengan container
    - Add dots di start dan end points dengan orange color
    - _Requirements: 3.2, 3.3_
  
  - [ ] 3.2 Add animated lines dengan Framer Motion
    - Implement SVG path animation dengan strokeDasharray dan strokeDashoffset
    - Use Framer Motion untuk animate path drawing dari Jakarta ke 6 destinasi
    - Add loop animation dengan animationDuration prop
    - Set line color orange (#F97316) dengan stroke width 2px
    - _Requirements: 3.2, 3.3, 11.1_

- [ ] 4. Build layout components (Navbar, Footer, Mobile)
  - [ ] 4.1 Implement Navbar component
    - Create layout/Navbar.tsx dengan state untuk isScrolled, isMegaMenuOpen, isMobileDrawerOpen
    - Implement scroll detection dengan useEffect dan window scroll listener
    - Add conditional shadow-md saat scroll melewati 80px dengan transition-shadow
    - Render logo "WEPOSE" dengan "WE" putih dan "POSE" oranye (Poppins Bold)
    - Render 5 nav links di center dengan DM Sans Medium
    - Add hover state (text-orange-500) dan active state (underline orange 2px)
    - Render 3 action buttons: language selector, "Masuk", "Daftar"
    - Add hamburger icon untuk mobile (< 768px) dengan Heroicons Bars3Icon
    - _Requirements: 1.1-1.9, 12.3_
  
  - [ ] 4.2 Implement MegaMenu component
    - Create layout/MegaMenu.tsx dengan props (isOpen, onClose)
    - Define columns data structure dengan 3 kolom: Region, Tujuan, Featured
    - Implement AnimatePresence dengan animation opacity 0→1 dan y -8→0 (150ms)
    - Add click outside detection dengan useRef dan useEffect
    - Add Escape key handler untuk close menu
    - Render 3 columns grid dengan hover state (bg-orange-50, text-orange-500, rounded-lg)
    - _Requirements: 2.1-2.9, 11.9_
  
  - [ ] 4.3 Implement MobileDrawer component
    - Create layout/MobileDrawer.tsx dengan props (isOpen, onClose)
    - Implement full-screen overlay dengan backdrop blur
    - Add slide-down animation dari top dengan Framer Motion (y: "-100%" → 0)
    - Render accordion untuk "Visa" menu items
    - Add close button dengan X icon di top right
    - Render action buttons di bottom
    - _Requirements: 1.10, 2.10, 12.3_
  
  - [ ] 4.4 Implement Footer component
    - Create layout/Footer.tsx dengan 4 kolom layout responsive
    - Kolom 1: Logo, tagline, social media icons
    - Kolom 2: "Layanan" links (Katalog Visa, Quiz, Bandingkan, Generate Surat)
    - Kolom 3: "Perusahaan" links (Tentang, Blog, Promo, Karir, Kontak)
    - Kolom 4: "Kontak" info (WhatsApp, Email, Jam operasional)
    - Add hover state untuk links (text-orange-500 transition 150ms)
    - Render bottom bar dengan copyright dan legal links
    - _Requirements: 10.1-10.10, 12.10, 12.11_

- [ ] 5. Checkpoint - Ensure layout components render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Build reusable card components
  - [ ] 6.1 Implement VisaCard component
    - Create ui/VisaCard.tsx dengan props interface (country, emoji, type, processDays, stayDuration, price, addOns, gradient, href)
    - Render cover dengan dynamic gradient background dan emoji flag (140px height)
    - Add badge untuk visa type di pojok kanan atas (pill orange-100)
    - Display duration info dengan icons (⏱ dan 📅)
    - Display price dengan "Mulai dari" prefix (Poppins SemiBold orange)
    - Render add-on badges dalam row (pill chips orange-100)
    - Add footer dengan "Bandingkan" dan "Lihat Detail" buttons
    - Implement hover effect: scale 1.02 dan shadow-lg dengan Framer Motion
    - _Requirements: 5.4-5.11, 5.18, 15.2_
  
  - [ ] 6.2 Implement StepCard component
    - Create ui/StepCard.tsx dengan props interface (number, icon, title, description)
    - Render circular number badge di top center (48px orange background, white text)
    - Display icon dengan orange color (32px)
    - Render title (Poppins SemiBold) dan description (DM Sans) centered
    - Add useInView hook dengan once: true dan margin: -80px
    - Implement scroll animation: opacity 0→1 dan y 24→0 (0.5s ease-out)
    - _Requirements: 4.5-4.10, 11.2, 11.4_
  
  - [ ] 6.3 Implement ReviewCard component
    - Create ui/ReviewCard.tsx dengan props interface (name, initials, avatarGradient, rating, text, destination, verified)
    - Render avatar lingkaran 40px dengan gradient background dan inisial (Poppins Bold putih)
    - Display nama (Poppins SemiBold putih) dan verified badge "✓ Google Review" (green pill)
    - Render 5 bintang solid orange (14px)
    - Display review text (DM Sans italic gray-300) maksimal 3 baris
    - Add destination tag dengan format "✈️ [Negara]" (pill orange/20 border orange/30)
    - _Requirements: 6.5-6.9_
  
  - [ ] 6.4 Implement StatsCounter component
    - Create ui/StatsCounter.tsx dengan props interface (end, suffix, label, duration, className)
    - Add useInView hook untuk trigger animation saat masuk viewport
    - Use useCountUp custom hook untuk animasi count dari 0 ke target
    - Render angka dengan Poppins Bold 48px putih dan label dengan DM Sans orange-100
    - _Requirements: 4.14, 7.8, 11.13_
  
  - [ ] 6.5 Implement FAQAccordion component
    - Create ui/FAQAccordion.tsx dengan props interface (question, answer, defaultOpen)
    - Add state untuk isOpen dengan useState
    - Render question dengan Poppins Medium 16px navy dan ChevronDownIcon
    - Implement click handler untuk toggle open/close
    - Add AnimatePresence untuk smooth height transition (0 → auto)
    - Rotate ChevronDownIcon 180 derajat saat open dengan animation 0.3s
    - Display answer dengan DM Sans 15px gray-600
    - _Requirements: 8.4-8.9, 11.10, 11.11, 15.10_

- [ ] 7. Implement Hero Section
  - [ ] 7.1 Create HeroSection component structure
    - Create sections/HeroSection.tsx dengan state untuk searchQuery
    - Setup container dengan min-h-screen dan background navy (#0F1F3D)
    - Add WorldMap component sebagai absolute background dengan opacity 30-40%
    - Configure WorldMap dengan 6 dots (Jakarta ke Paris, Tokyo, Seoul, London, New York, Sydney)
    - Set lineColor orange (#F97316) untuk WorldMap
    - _Requirements: 3.1-3.3, 12.4_
  
  - [ ] 7.2 Implement Hero content dengan stagger animation
    - Render badge "✈️ Platform Visa #1 di Indonesia" (orange-100/10 background)
    - Display headline "Apply Visa Jadi Effortless" (Poppins Bold 56px desktop, 36px mobile)
    - Display sub-headline dengan DM Sans Regular (18px desktop, 15px mobile, gray-300)
    - Implement stagger animation dengan delays: badge (0.1s), headline (0.2s), sub-headline (0.3s)
    - Use Framer Motion containerVariants dan itemVariants dengan easing [0.25, 0.46, 0.45, 0.94]
    - _Requirements: 3.4-3.6, 3.13, 11.12, 12.5_
  
  - [ ] 7.3 Add SearchBar dan Quick Category Chips
    - Render SearchBar dengan MagnifyingGlassIcon dan placeholder text
    - Add focus state dengan border orange dan ring rgba(249,115,22,0.2)
    - Display 8 Quick_Category_Chip: Schengen, Jepang, Korea, Australia, Amerika, Eropa, Timur Tengah, Lihat Semua
    - Add hover effect untuk chips (background white/20 transition 150ms)
    - Add stagger animation untuk search bar (0.4s) dan chips (0.5s+)
    - _Requirements: 3.7-3.11, 3.13, 15.3, 15.6_
  
  - [ ] 7.4 Add Stats Bar dengan counter animation
    - Render stats bar dengan 4 StatsCounter components
    - Display stats: "35+ Negara", "100+ Tipe Visa", "10.000+ Pelanggan Puas", "5+ Tahun Pengalaman"
    - Trigger count-up animation saat stats bar masuk viewport
    - Use duration 1200ms ease-out untuk count animation
    - _Requirements: 3.12, 3.14, 4.14_

- [ ] 8. Implement Cara Kerja Section
  - Create sections/CaraKerjaSection.tsx dengan background gray-50
  - Render badge "CARA KERJA" dan heading "Visa Approved dalam 4 Langkah Mudah"
  - Display 4 StepCard components dalam responsive grid (4 cols desktop, 2 tablet, 1 mobile)
  - Step 1: UserPlusIcon, "Daftar & Cari Visa", "Temukan dari 100+ tipe visa ke 35+ negara tujuan"
  - Step 2: DocumentArrowUpIcon, "Isi Data & Upload Dokumen", "Lengkapi form & simpan dokumen ke vault aman Wepose"
  - Step 3: CreditCardIcon, "Bayar & Konfirmasi", "Bayar via metode favoritmu. Invoice otomatis terkirim"
  - Step 4: SignalIcon, "Pantau Status Real-time", "Lacak progres visamu kapanpun lewat portal tamu"
  - Add garis dashed orange horizontal antara cards untuk desktop (> 1024px)
  - Implement stagger animation dengan delay 0.15s per card
  - _Requirements: 4.1-4.12, 12.6, 12.7_

- [ ] 9. Implement Visa Populer Section
  - [ ] 9.1 Create VisaPopulerSection component structure
    - Create sections/VisaPopulerSection.tsx dengan background putih
    - Render badge "VISA POPULER" dan heading "Destinasi Favorit Pelanggan Wepose"
    - Setup responsive grid: 3 cols desktop, 2 tablet, 1 mobile dengan gap 24px
    - _Requirements: 5.1, 5.2, 5.3, 12.8, 12.9_
  
  - [ ] 9.2 Render 6 VisaCard components dengan data
    - Card 1: France Schengen Tourist, 🇫🇷, 15-20 hari, 90 hari, Rp 1.850.000, gradient #0F1F3D→#1E3A5F
    - Card 2: Jepang Tourist, 🇯🇵, 7-10 hari, 15 hari, Rp 950.000, gradient #DC2626→#991B1B
    - Card 3: Korea Selatan Tourist, 🇰🇷, 5-7 hari, 30 hari, Rp 850.000, gradient #1D4ED8→#1E40AF
    - Card 4: Australia Tourist, 🇦🇺, 10-15 hari, 3 bulan, Rp 1.250.000, gradient #15803D→#166534
    - Card 5: Amerika B1/B2, 🇺🇸, 30-60 hari, 6 bulan, Rp 3.500.000, gradient #7C3AED→#6D28D9
    - Card 6: United Kingdom Standard, 🇬🇧, 20-30 hari, 6 bulan, Rp 2.100.000, gradient #B45309→#92400E
    - Add tombol "Lihat Semua 100+ Visa →" centered dengan ArrowRightIcon
    - _Requirements: 5.12-5.19_

- [ ] 10. Implement Testimoni Section
  - Create sections/TestimoniSection.tsx dengan background navy (#0F1F3D)
  - Render badge "ULASAN PELANGGAN" dan heading "Dipercaya 10.000+ Traveler Indonesia" (putih)
  - Display rating "★★★★★ 5.0 dari 200+ ulasan Google" dengan stars orange dan text gray-300
  - Render 3 ReviewCard components dengan background navy-mid (#1E3A5F)
  - Review 1: Rina S., Visa Schengen, "Prosesnya gampang banget, tiap langkah ada panduan. Visa Schengen approved 17 hari, nggak nyangka secepat itu!"
  - Review 2: Budi H., Visa UK, "Fast response, ada update status tiap hari. Tim Wepose profesional, visa UK approved tanpa ribet!"
  - Review 3: Sari D., Visa Jepang, "Harga transparan, nggak ada biaya tersembunyi. Vault dokumen sangat membantu untuk apply visa berikutnya."
  - Implement stagger animation fade-in dan y 20→0 saat masuk viewport
  - _Requirements: 6.1-6.13, 11.4_

- [ ] 11. Implement Stats Section
  - Create sections/StatsSection.tsx dengan background orange (#F97316)
  - Render 4 StatsCounter components dalam responsive layout
  - Stat 1: "35+" dengan label "Negara Tujuan"
  - Stat 2: "100+" dengan label "Tipe Visa"
  - Stat 3: "10.000+" dengan label "Pelanggan Puas"
  - Stat 4: "5+" dengan label "Tahun Pengalaman"
  - Trigger count-up animation dari 0 ke target saat masuk viewport (1200ms ease-out)
  - _Requirements: 7.1-7.8_

- [ ] 12. Implement FAQ Section
  - Create sections/FAQSection.tsx dengan background gray-50
  - Render badge dan heading "Pertanyaan yang Sering Ditanyakan" centered
  - Display 6 FAQAccordion components dalam single column (max-width 2xl)
  - FAQ 1: "Apakah Wepose resmi dan terdaftar?" - "Ya, Wepose beroperasi sejak 2019 dan telah melayani 10.000+ pelanggan dari seluruh Indonesia."
  - FAQ 2: "Berapa lama proses pengajuan visa?" - "Tergantung negara tujuan, rata-rata 5–30 hari kerja. Estimasi akurat ditampilkan di setiap halaman visa."
  - FAQ 3: "Apakah dokumen saya aman di Wepose?" - "Semua dokumen dienkripsi end-to-end dan hanya bisa diakses oleh kamu sendiri."
  - FAQ 4: "Bagaimana jika visa saya ditolak?" - "Tim konsultan kami akan membantu analisis & pengajuan ulang dengan persiapan lebih matang."
  - FAQ 5: "Metode pembayaran apa saja yang tersedia?" - "Transfer bank, virtual account, e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit via Midtrans."
  - FAQ 6: "Apakah ada jaminan uang kembali?" - "Ya, kami memberikan garansi refund jika gagal akibat kesalahan di pihak Wepose."
  - _Requirements: 8.1-8.15_

- [ ] 13. Implement Final CTA Section
  - Create sections/FinalCTASection.tsx dengan gradient background diagonal (navy #0F1F3D ke #1E3A5F)
  - Render heading "Siap Mulai Petualanganmu?" (Poppins Bold 40px putih centered)
  - Display sub-heading "Bergabung dengan 10.000+ traveler yang sudah percaya Wepose." (DM Sans 18px gray-300)
  - Render 2 CTA buttons: "Mulai Apply Sekarang →" (orange pill dengan PaperAirplaneIcon) dan "Konsultasi Gratis" (ghost white pill dengan ChatBubbleLeftRightIcon)
  - Display 3 Trust_Signal: "🔒 SSL Encrypted", "✅ Terdaftar Resmi", "⭐ 5.0 Google" (DM Sans 13px gray-400)
  - Implement animation scale 0.95→1 dan opacity 0→1 saat masuk viewport
  - _Requirements: 9.1-9.6, 11.4_

- [ ] 14. Checkpoint - Ensure all sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Wire all components together in main page
  - [ ] 15.1 Create app/page.tsx main landing page
    - Import all section components: HeroSection, CaraKerjaSection, VisaPopulerSection, TestimoniSection, StatsSection, FAQSection, FinalCTASection
    - Import layout components: Navbar, Footer
    - Compose all sections dalam proper order
    - _Requirements: All sections 1-10_
  
  - [ ] 15.2 Setup app/layout.tsx dengan fonts dan metadata
    - Import Google Fonts (Poppins dan DM Sans) via next/font/google
    - Configure font weights: Poppins (Bold, SemiBold, Medium), DM Sans (Regular, Medium)
    - Setup metadata: title, description, og:image
    - Apply fonts ke body dengan className
    - _Requirements: 13.1-13.3_
  
  - [ ] 15.3 Configure app/globals.css
    - Import Tailwind directives: @tailwind base, components, utilities
    - Add custom CSS untuk smooth scrolling
    - Add prefers-reduced-motion media query untuk accessibility
    - Configure custom scrollbar styling
    - _Requirements: 11.14_

- [ ] 16. Implement responsive behavior dan polish
  - [ ] 16.1 Test dan fix responsive breakpoints
    - Verify mobile layout (< 640px): 1 column grids, hamburger menu, smaller fonts
    - Verify tablet layout (640px - 1024px): 2 column grids, adjusted spacing
    - Verify desktop layout (> 1024px): full layout dengan mega menu, dashed lines
    - Fix any layout issues atau overflow problems
    - _Requirements: 12.1-12.12_
  
  - [ ] 16.2 Implement prefers-reduced-motion support
    - Add media query detection untuk prefers-reduced-motion
    - Disable transform dan transition animations saat reduced motion enabled
    - Keep essential animations (e.g., accordion expand) dengan reduced duration
    - _Requirements: 11.14_
  
  - [ ] 16.3 Add keyboard navigation support
    - Ensure all interactive elements focusable dengan Tab key
    - Add visible focus states dengan ring-2 ring-orange-500
    - Implement Escape key handler untuk close modals/menus
    - Test keyboard navigation flow untuk accessibility
    - _Requirements: 15.3, 15.9_
  
  - [ ] 16.4 Optimize performance
    - Add lazy loading untuk images dengan next/image
    - Implement dynamic imports untuk heavy components (WorldMap)
    - Add loading states untuk async operations
    - Verify Core Web Vitals (LCP, FID, CLS)
    - _Requirements: Design Goals - Performance_

- [ ] 17. Final checkpoint - Complete testing dan polish
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks ditata secara incremental: setup → core components → layout → sections → integration → polish
- Setiap task mereferensikan specific requirements untuk traceability
- Checkpoint tasks memastikan validasi di breakpoints penting
- Responsive design ditest di 3 breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Accessibility features termasuk keyboard navigation, focus states, dan reduced motion support
- Performance optimization dilakukan di akhir untuk memastikan fast loading
