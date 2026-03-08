# Requirements Document

## Introduction

WEPOSE adalah platform visa Indonesia yang modern dan profesional. Landing page ini dirancang untuk memberikan pengalaman yang lebih warm, guided, local, visual, dan trustworthy dibanding kompetitor. Landing page harus terasa conversational dalam bahasa Indonesia dengan animasi yang smooth dan purposeful menggunakan Framer Motion.

## Glossary

- **Landing_Page**: Halaman utama WEPOSE yang menampilkan informasi platform visa dan mengajak pengguna untuk mendaftar atau mencari visa
- **Navbar**: Komponen navigasi sticky di bagian atas halaman dengan logo, menu links, dan tombol aksi
- **Mega_Menu**: Panel dropdown yang muncul saat hover/klik menu "Visa" dengan 3 kolom kategori visa
- **Hero_Section**: Section pertama dengan headline, search bar, dan WorldMap sebagai background
- **WorldMap**: Komponen peta dunia interaktif dengan dots dan lines menunjukkan rute dari Jakarta ke destinasi populer
- **Visa_Card**: Komponen card yang menampilkan informasi visa (negara, durasi, harga, add-ons)
- **FAQ_Accordion**: Komponen accordion untuk menampilkan pertanyaan dan jawaban yang dapat dibuka/tutup
- **Animation_System**: Sistem animasi menggunakan Framer Motion dengan prinsip subtle dan purposeful
- **Mobile_Drawer**: Panel navigasi full-screen yang muncul dari kiri pada tampilan mobile
- **Trust_Signal**: Elemen visual yang menunjukkan kredibilitas (SSL, rating, sertifikasi)
- **CTA_Button**: Call-to-action button untuk mendorong pengguna melakukan aksi tertentu
- **Stats_Counter**: Komponen yang menampilkan angka statistik dengan animasi count-up
- **Search_Bar**: Input field untuk mencari visa berdasarkan negara tujuan
- **Quick_Category_Chip**: Tombol pill kecil untuk akses cepat ke kategori visa populer
- **Viewport**: Area tampilan browser yang terlihat oleh pengguna


## Requirements

### Requirement 1: Navbar Navigation

**User Story:** Sebagai pengunjung, saya ingin melihat navigasi yang jelas dan sticky, sehingga saya dapat mengakses menu kapan saja saat scroll.

#### Acceptance Criteria

1. THE Navbar SHALL memiliki tinggi 64px dan posisi sticky di top dengan z-index 50
2. THE Navbar SHALL menggunakan background navy-mid (#1E3A5F)
3. WHEN pengguna scroll melewati 80px, THE Navbar SHALL menampilkan shadow-md dengan transition smooth
4. THE Navbar SHALL menampilkan logo "WEPOSE" dengan "WE" berwarna putih dan "POSE" berwarna oranye menggunakan Poppins Bold
5. THE Navbar SHALL menampilkan 5 nav links di center: "Visa", "Tools", "Promo", "Blog", "Tentang Kami" dengan DM Sans Medium warna putih
6. WHEN pengguna hover nav link, THE Navbar SHALL mengubah warna text menjadi oranye dengan transition 150ms
7. WHEN nav link aktif, THE Navbar SHALL menampilkan text oranye dengan underline oranye 2px
8. THE Navbar SHALL menampilkan 3 tombol di kanan: "🌐 ID" (ghost small), "Masuk" (ghost white pill border), "Daftar" (solid orange pill)
9. WHEN viewport width kurang dari 768px, THE Navbar SHALL menampilkan hamburger icon (Heroicons Bars3Icon 24px putih) menggantikan nav links
10. WHEN hamburger icon diklik, THE Navbar SHALL menampilkan Mobile_Drawer dengan animasi slide-down menggunakan AnimatePresence

### Requirement 2: Mega Menu Dropdown

**User Story:** Sebagai pengunjung, saya ingin melihat kategori visa yang terorganisir dengan baik, sehingga saya dapat menemukan visa yang sesuai dengan kebutuhan saya.

#### Acceptance Criteria

1. WHEN pengguna hover atau klik menu "Visa" pada desktop, THE Mega_Menu SHALL muncul di bawah Navbar
2. THE Mega_Menu SHALL memiliki background putih dengan border-radius 0 0 12px 12px dan shadow-lg
3. THE Mega_Menu SHALL memiliki lebar 720px dan muncul dengan animasi opacity 0→1 dan y -8→0 dalam 150ms ease-out
4. THE Mega_Menu SHALL menampilkan 3 kolom: "Berdasarkan Region", "Berdasarkan Tujuan", dan "Featured"
5. THE Mega_Menu SHALL menampilkan 6 item di kolom Region: Schengen/Eropa, Asia Timur, Asia Tenggara, Amerika, Timur Tengah, Australia & Pasifik
6. THE Mega_Menu SHALL menampilkan 6 item di kolom Tujuan: Wisata, Bisnis, Studi, Kerja, Keluarga, Tinggal
7. THE Mega_Menu SHALL menampilkan 6 item di kolom Featured: Trending Visa, Proses Tercepat, Promo Aktif, Visa Terbaru, Quiz Kelayakan, Bandingkan Visa
8. WHEN pengguna hover item di Mega_Menu, THE item SHALL menampilkan background orange-50, text oranye, border-radius 8px dengan transition 100ms
9. WHEN pengguna klik di luar Mega_Menu atau tekan Escape, THE Mega_Menu SHALL menutup dengan animasi reverse
10. WHEN viewport width kurang dari 768px, THE Mega_Menu SHALL ditampilkan sebagai accordion dalam Mobile_Drawer

### Requirement 3: Hero Section dengan WorldMap

**User Story:** Sebagai pengunjung, saya ingin melihat hero section yang menarik dengan visualisasi peta dunia, sehingga saya langsung memahami bahwa WEPOSE melayani visa ke berbagai negara.

#### Acceptance Criteria

1. THE Hero_Section SHALL memiliki tinggi minimum full viewport (min-h-screen) dengan background navy (#0F1F3D)
2. THE Hero_Section SHALL menampilkan WorldMap component sebagai absolute background dengan lineColor oranye (#F97316) dan opacity 30-40%
3. THE WorldMap SHALL menampilkan 6 dots dengan rute dari Jakarta ke: Paris, Tokyo, Seoul, London, New York, Sydney
4. THE Hero_Section SHALL menampilkan badge "✈️ Platform Visa #1 di Indonesia" dengan background orange-100/10, border orange/30, text oranye, Poppins SemiBold 12px
5. THE Hero_Section SHALL menampilkan headline "Apply Visa Jadi Effortless" dengan Poppins Bold 56px (desktop) atau 36px (mobile) warna putih
6. THE Hero_Section SHALL menampilkan sub-headline "Urus visa ke 35+ negara bersama tim profesional Wepose. Cepat, aman, transparan." dengan DM Sans Regular 18px (desktop) atau 15px (mobile) warna gray-300
7. THE Hero_Section SHALL menampilkan Search_Bar dengan max-width 2xl, background putih, border-radius 10px, shadow-md
8. THE Search_Bar SHALL menampilkan Heroicons MagnifyingGlassIcon 20px gray-400 di kiri dan placeholder "Mau visa ke mana? Cth: Jepang, Prancis, Korea..."
9. WHEN Search_Bar mendapat focus, THE Search_Bar SHALL menampilkan border oranye dengan ring rgba(249,115,22,0.2)
10. THE Hero_Section SHALL menampilkan 8 Quick_Category_Chip: Schengen, Jepang, Korea, Australia, Amerika, Eropa, Timur Tengah, Lihat Semua
11. WHEN pengguna hover Quick_Category_Chip, THE chip SHALL mengubah background menjadi white/20 dengan transition 150ms
12. THE Hero_Section SHALL menampilkan stats bar dengan 4 item: "35+ Negara", "100+ Tipe Visa", "10.000+ Pelanggan Puas", "5+ Tahun Pengalaman"
13. WHEN Hero_Section mount, THE Hero_Section SHALL menampilkan konten dengan stagger animation: badge (delay 0.1s), headline (0.2s), sub-headline (0.3s), search bar (0.4s), chips (0.5s+)
14. WHEN stats bar masuk viewport, THE Stats_Counter SHALL menampilkan animasi count-up dari 0 ke nilai target dalam 1200ms ease-out


### Requirement 4: Cara Kerja Section

**User Story:** Sebagai pengunjung, saya ingin memahami proses pengajuan visa dengan jelas, sehingga saya merasa yakin untuk menggunakan layanan WEPOSE.

#### Acceptance Criteria

1. THE Cara_Kerja_Section SHALL memiliki background gray-50 (#F9FAFB)
2. THE Cara_Kerja_Section SHALL menampilkan badge "CARA KERJA" uppercase oranye pill small
3. THE Cara_Kerja_Section SHALL menampilkan heading "Visa Approved dalam 4 Langkah Mudah" dengan Poppins SemiBold 28px navy centered
4. THE Cara_Kerja_Section SHALL menampilkan 4 step cards dalam grid: 4 kolom desktop, 2 kolom tablet, 1 kolom mobile
5. THE step card SHALL memiliki background putih, border-radius 16px, shadow-md, padding 24px, text-center
6. THE step card SHALL menampilkan lingkaran oranye 48px dengan angka putih Poppins Bold di tengah atas
7. THE step card 1 SHALL menampilkan Heroicons UserPlusIcon 32px oranye dengan judul "Daftar & Cari Visa" dan deskripsi "Temukan dari 100+ tipe visa ke 35+ negara tujuan"
8. THE step card 2 SHALL menampilkan Heroicons DocumentArrowUpIcon dengan judul "Isi Data & Upload Dokumen" dan deskripsi "Lengkapi form & simpan dokumen ke vault aman Wepose"
9. THE step card 3 SHALL menampilkan Heroicons CreditCardIcon dengan judul "Bayar & Konfirmasi" dan deskripsi "Bayar via metode favoritmu. Invoice otomatis terkirim"
10. THE step card 4 SHALL menampilkan Heroicons SignalIcon dengan judul "Pantau Status Real-time" dan deskripsi "Lacak progres visamu kapanpun lewat portal tamu"
11. WHEN viewport width lebih dari 1024px, THE Cara_Kerja_Section SHALL menampilkan garis dashed oranye horizontal antara step cards
12. WHEN Cara_Kerja_Section masuk viewport, THE step cards SHALL muncul dengan stagger animation delay 0.15s per card dengan opacity 0→1 dan y 24→0 dalam 0.5s ease-out

### Requirement 5: Visa Populer Section

**User Story:** Sebagai pengunjung, saya ingin melihat visa populer dengan informasi lengkap, sehingga saya dapat membandingkan dan memilih visa yang sesuai.

#### Acceptance Criteria

1. THE Visa_Populer_Section SHALL memiliki background putih
2. THE Visa_Populer_Section SHALL menampilkan badge "VISA POPULER" dan heading "Destinasi Favorit Pelanggan Wepose" navy centered
3. THE Visa_Populer_Section SHALL menampilkan 6 Visa_Card dalam grid: 3 kolom desktop, 2 kolom tablet, 1 kolom mobile dengan gap 24px
4. THE Visa_Card SHALL memiliki background putih, rounded-2xl (16px), shadow-md, overflow-hidden, cursor-pointer
5. THE Visa_Card SHALL menampilkan cover top height 140px dengan gradient unik per negara dan emoji bendera 40px centered
6. THE Visa_Card SHALL menampilkan badge tipe visa di pojok kanan atas cover (pill orange-100 text-orange text-xs)
7. THE Visa_Card SHALL menampilkan nama visa dengan Poppins SemiBold 15px navy
8. THE Visa_Card SHALL menampilkan durasi proses "⏱ X hari kerja" dan durasi tinggal "📅 X hari tinggal" dengan DM Sans 12px gray-500
9. THE Visa_Card SHALL menampilkan harga "Mulai dari Rp X.XXX.000" dengan Poppins SemiBold 14px oranye
10. THE Visa_Card SHALL menampilkan add-on badges dalam row dengan pill chips orange-100 text-orange text-xs
11. THE Visa_Card SHALL menampilkan footer dengan tombol "Bandingkan" (ghost dengan Heroicons ScaleIcon 14px) dan "Lihat Detail →" (orange pill sm)
12. THE Visa_Card 1 SHALL menampilkan France Schengen Tourist dengan durasi 15-20 hari kerja, 90 hari tinggal, harga Rp 1.850.000, gradient #0F1F3D→#1E3A5F
13. THE Visa_Card 2 SHALL menampilkan Jepang Tourist dengan durasi 7-10 hari kerja, 15 hari tinggal, harga Rp 950.000, gradient #DC2626→#991B1B
14. THE Visa_Card 3 SHALL menampilkan Korea Selatan Tourist dengan durasi 5-7 hari kerja, 30 hari tinggal, harga Rp 850.000, gradient #1D4ED8→#1E40AF
15. THE Visa_Card 4 SHALL menampilkan Australia Tourist dengan durasi 10-15 hari kerja, 3 bulan tinggal, harga Rp 1.250.000, gradient #15803D→#166534
16. THE Visa_Card 5 SHALL menampilkan Amerika B1/B2 dengan durasi 30-60 hari kerja, 6 bulan tinggal, harga Rp 3.500.000, gradient #7C3AED→#6D28D9
17. THE Visa_Card 6 SHALL menampilkan United Kingdom Standard dengan durasi 20-30 hari kerja, 6 bulan tinggal, harga Rp 2.100.000, gradient #B45309→#92400E
18. WHEN pengguna hover Visa_Card, THE card SHALL scale 1.02 dan menampilkan shadow-lg dengan transition 0.2s ease-out
19. THE Visa_Populer_Section SHALL menampilkan tombol centered "Lihat Semua 100+ Visa →" orange pill large dengan Heroicons ArrowRightIcon inline

### Requirement 6: Testimoni Section

**User Story:** Sebagai pengunjung, saya ingin membaca testimoni pelanggan yang puas, sehingga saya merasa yakin dengan kredibilitas WEPOSE.

#### Acceptance Criteria

1. THE Testimoni_Section SHALL memiliki background navy (#0F1F3D)
2. THE Testimoni_Section SHALL menampilkan badge oranye "ULASAN PELANGGAN" dan heading putih "Dipercaya 10.000+ Traveler Indonesia"
3. THE Testimoni_Section SHALL menampilkan rating "★★★★★ 5.0 dari 200+ ulasan Google" dengan stars oranye dan teks gray-300
4. THE Testimoni_Section SHALL menampilkan 3 review cards dengan background navy-mid (#1E3A5F), rounded-2xl, padding 24px
5. THE review card SHALL menampilkan avatar lingkaran 40px dengan background gradient unik dan inisial nama Poppins Bold putih
6. THE review card SHALL menampilkan nama dengan Poppins SemiBold 14px putih dan badge "✓ Google Review" hijau pill kecil
7. THE review card SHALL menampilkan 5 bintang solid oranye 14px
8. THE review card SHALL menampilkan review teks dengan DM Sans 14px gray-300 italic maksimal 3 baris
9. THE review card SHALL menampilkan tag destinasi dengan format "✈️ [Negara]" pill orange/20 border orange/30 text-orange text-xs
10. THE review card 1 SHALL menampilkan testimoni Rina S. tentang Visa Schengen: "Prosesnya gampang banget, tiap langkah ada panduan. Visa Schengen approved 17 hari, nggak nyangka secepat itu!"
11. THE review card 2 SHALL menampilkan testimoni Budi H. tentang Visa UK: "Fast response, ada update status tiap hari. Tim Wepose profesional, visa UK approved tanpa ribet!"
12. THE review card 3 SHALL menampilkan testimoni Sari D. tentang Visa Jepang: "Harga transparan, nggak ada biaya tersembunyi. Vault dokumen sangat membantu untuk apply visa berikutnya."
13. WHEN Testimoni_Section masuk viewport, THE review cards SHALL muncul dengan stagger animation fade-in dan y 20→0


### Requirement 7: Stats Section

**User Story:** Sebagai pengunjung, saya ingin melihat statistik kredibilitas WEPOSE, sehingga saya merasa yakin dengan pengalaman dan jangkauan layanan mereka.

#### Acceptance Criteria

1. THE Stats_Section SHALL memiliki background oranye (#F97316)
2. THE Stats_Section SHALL menampilkan 4 kolom statistik dengan layout responsive
3. THE stat item SHALL menampilkan angka dengan Poppins Bold 48px putih dan label dengan DM Sans 16px orange-100
4. THE stat item 1 SHALL menampilkan "35+" dengan label "Negara Tujuan"
5. THE stat item 2 SHALL menampilkan "100+" dengan label "Tipe Visa"
6. THE stat item 3 SHALL menampilkan "10.000+" dengan label "Pelanggan Puas"
7. THE stat item 4 SHALL menampilkan "5+" dengan label "Tahun Pengalaman"
8. WHEN Stats_Section masuk viewport, THE Stats_Counter SHALL menampilkan animasi count-up dari 0 ke nilai target dalam 1200ms ease-out

### Requirement 8: FAQ Section

**User Story:** Sebagai pengunjung, saya ingin menemukan jawaban atas pertanyaan umum, sehingga saya dapat memahami layanan WEPOSE tanpa harus menghubungi customer service.

#### Acceptance Criteria

1. THE FAQ_Section SHALL memiliki background gray-50 (#F9FAFB)
2. THE FAQ_Section SHALL menampilkan badge dan heading "Pertanyaan yang Sering Ditanyakan" navy centered
3. THE FAQ_Section SHALL menampilkan 6 FAQ items dalam layout max-width 2xl centered single column
4. THE FAQ_Accordion item SHALL memiliki border-bottom gray-200 dan padding-y 4
5. THE FAQ_Accordion question SHALL menggunakan Poppins Medium 16px navy dengan layout flex justify-between items-center
6. THE FAQ_Accordion SHALL menampilkan Heroicons ChevronDownIcon 20px gray-400 di kanan question
7. WHEN FAQ_Accordion item dibuka, THE ChevronDownIcon SHALL rotate 180 derajat dengan animasi smooth
8. WHEN FAQ_Accordion item dibuka, THE answer SHALL muncul dengan animasi height 0→auto dan opacity 0→1 menggunakan AnimatePresence
9. THE FAQ_Accordion answer SHALL menggunakan DM Sans 15px gray-600
10. THE FAQ item 1 SHALL menampilkan pertanyaan "Apakah Wepose resmi dan terdaftar?" dengan jawaban "Ya, Wepose beroperasi sejak 2019 dan telah melayani 10.000+ pelanggan dari seluruh Indonesia."
11. THE FAQ item 2 SHALL menampilkan pertanyaan "Berapa lama proses pengajuan visa?" dengan jawaban "Tergantung negara tujuan, rata-rata 5–30 hari kerja. Estimasi akurat ditampilkan di setiap halaman visa."
12. THE FAQ item 3 SHALL menampilkan pertanyaan "Apakah dokumen saya aman di Wepose?" dengan jawaban "Semua dokumen dienkripsi end-to-end dan hanya bisa diakses oleh kamu sendiri."
13. THE FAQ item 4 SHALL menampilkan pertanyaan "Bagaimana jika visa saya ditolak?" dengan jawaban "Tim konsultan kami akan membantu analisis & pengajuan ulang dengan persiapan lebih matang."
14. THE FAQ item 5 SHALL menampilkan pertanyaan "Metode pembayaran apa saja yang tersedia?" dengan jawaban "Transfer bank, virtual account, e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit via Midtrans."
15. THE FAQ item 6 SHALL menampilkan pertanyaan "Apakah ada jaminan uang kembali?" dengan jawaban "Ya, kami memberikan garansi refund jika gagal akibat kesalahan di pihak Wepose."

### Requirement 9: Final CTA Section

**User Story:** Sebagai pengunjung yang tertarik, saya ingin melihat ajakan yang jelas untuk memulai, sehingga saya dapat langsung mengambil tindakan.

#### Acceptance Criteria

1. THE Final_CTA_Section SHALL memiliki background gradient diagonal dari navy #0F1F3D ke #1E3A5F
2. THE Final_CTA_Section SHALL menampilkan heading "Siap Mulai Petualanganmu?" dengan Poppins Bold 40px putih centered
3. THE Final_CTA_Section SHALL menampilkan sub-heading "Bergabung dengan 10.000+ traveler yang sudah percaya Wepose." dengan DM Sans 18px gray-300
4. THE Final_CTA_Section SHALL menampilkan 2 CTA_Button dalam row: "Mulai Apply Sekarang →" (orange pill large dengan Heroicons PaperAirplaneIcon) dan "Konsultasi Gratis" (ghost white pill large dengan Heroicons ChatBubbleLeftRightIcon)
5. THE Final_CTA_Section SHALL menampilkan 3 Trust_Signal dalam row: "🔒 SSL Encrypted", "✅ Terdaftar Resmi", "⭐ 5.0 Google" dengan DM Sans 13px gray-400
6. WHEN Final_CTA_Section masuk viewport, THE konten SHALL muncul dengan animasi scale 0.95→1 dan opacity 0→1

### Requirement 10: Footer

**User Story:** Sebagai pengunjung, saya ingin menemukan informasi kontak dan link penting di footer, sehingga saya dapat mengakses informasi tambahan atau menghubungi WEPOSE.

#### Acceptance Criteria

1. THE Footer SHALL memiliki background navy (#0F1F3D) dengan padding-top 64px dan padding-bottom 32px
2. THE Footer SHALL menampilkan 4 kolom dalam layout responsive: 4 kolom desktop, 2 kolom tablet, 1 kolom mobile
3. THE Footer kolom 1 SHALL menampilkan logo WEPOSE, tagline "Platform visa terpercaya untuk traveler Indonesia" dengan DM Sans 14px gray-400, dan icon row untuk WhatsApp dan social media
4. THE Footer kolom 2 SHALL menampilkan heading "Layanan" dan links: Katalog Visa, Quiz Kelayakan, Bandingkan Visa, Generate Surat Sponsor
5. THE Footer kolom 3 SHALL menampilkan heading "Perusahaan" dan links: Tentang Kami, Blog, Promo, Karir, Kontak
6. THE Footer kolom 4 SHALL menampilkan heading "Kontak" dan informasi: WhatsApp 0812-xxxx-xxxx, Email halo@wepose.id, Jam operasional Sen-Jum 09.00-18.00 WIB
7. THE Footer link SHALL menggunakan DM Sans 14px gray-400
8. WHEN pengguna hover Footer link, THE link SHALL mengubah warna menjadi oranye dengan transition 150ms
9. THE Footer SHALL menampilkan bottom bar dengan border-top gray-800, layout flex justify-between
10. THE Footer bottom bar SHALL menampilkan "© 2026 Wepose" di kiri dan "Kebijakan Privasi · Syarat & Ketentuan" di kanan


### Requirement 11: Animation System

**User Story:** Sebagai pengunjung, saya ingin melihat animasi yang smooth dan purposeful, sehingga pengalaman browsing terasa modern tanpa mengganggu.

#### Acceptance Criteria

1. THE Animation_System SHALL menggunakan Framer Motion untuk semua animasi
2. THE Animation_System SHALL menggunakan useInView hook dengan parameter once: true dan margin: -80px untuk scroll animations
3. THE Animation_System SHALL menggunakan easing [0.25, 0.46, 0.45, 0.94] untuk animasi masuk dan "easeIn" untuk animasi keluar
4. WHEN section masuk viewport, THE Animation_System SHALL menampilkan animasi opacity 0→1 dan y 24→0 dalam 0.5s
5. WHEN stagger children animation digunakan, THE Animation_System SHALL menggunakan delay 0.1s per child
6. WHEN pengguna hover card, THE Animation_System SHALL menampilkan scale 1.02 dengan shadow dalam 0.2s
7. WHEN pengguna klik button, THE Animation_System SHALL menampilkan scale 0.97 dalam 0.1s
8. WHEN pengguna hover CTA_Button, THE Animation_System SHALL menampilkan y -2 dengan orange shadow dalam 0.2s
9. WHEN Mega_Menu dibuka, THE Animation_System SHALL menampilkan opacity 0→1 dan y -8→0 dalam 0.15s
10. WHEN FAQ_Accordion dibuka, THE Animation_System SHALL menampilkan height auto dengan opacity dalam 0.3s
11. WHEN ChevronIcon di FAQ_Accordion berubah state, THE Animation_System SHALL rotate 0→180 derajat dalam 0.3s
12. WHEN page initial load, THE Hero_Section konten SHALL muncul dengan stagger delays 0.1s hingga 0.5s
13. WHEN Stats_Counter masuk viewport, THE Animation_System SHALL menampilkan count-up dari 0 ke target dalam 1.2s
14. WHEN user prefers reduced motion, THE Animation_System SHALL menonaktifkan semua transform dan transition animations

### Requirement 12: Responsive Design

**User Story:** Sebagai pengunjung mobile, saya ingin landing page terlihat baik di semua ukuran layar, sehingga saya dapat mengakses informasi dengan nyaman dari perangkat apapun.

#### Acceptance Criteria

1. THE Landing_Page SHALL menggunakan mobile-first approach dengan breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
2. THE Landing_Page SHALL memiliki max content width 1280px centered
3. WHEN viewport width kurang dari 768px, THE Navbar SHALL menampilkan hamburger menu menggantikan nav links
4. WHEN viewport width kurang dari 768px, THE Hero_Section headline SHALL menggunakan font-size 36px
5. WHEN viewport width kurang dari 768px, THE Hero_Section sub-headline SHALL menggunakan font-size 15px
6. WHEN viewport width kurang dari 1024px, THE Cara_Kerja_Section SHALL menampilkan 2 kolom untuk step cards
7. WHEN viewport width kurang dari 640px, THE Cara_Kerja_Section SHALL menampilkan 1 kolom untuk step cards
8. WHEN viewport width kurang dari 1024px, THE Visa_Populer_Section SHALL menampilkan 2 kolom untuk Visa_Card
9. WHEN viewport width kurang dari 640px, THE Visa_Populer_Section SHALL menampilkan 1 kolom untuk Visa_Card
10. WHEN viewport width kurang dari 1024px, THE Footer SHALL menampilkan 2 kolom
11. WHEN viewport width kurang dari 640px, THE Footer SHALL menampilkan 1 kolom
12. WHEN viewport width kurang dari 768px, THE Mega_Menu SHALL ditampilkan sebagai full-screen accordion dalam Mobile_Drawer

### Requirement 13: Typography System

**User Story:** Sebagai pengunjung, saya ingin membaca konten dengan jelas dan nyaman, sehingga saya dapat memahami informasi dengan mudah.

#### Acceptance Criteria

1. THE Landing_Page SHALL menggunakan Google Fonts Poppins dengan weights: Bold, SemiBold, Medium
2. THE Landing_Page SHALL menggunakan Google Fonts DM Sans dengan weights: Regular, Medium
3. THE Landing_Page SHALL mengimport fonts via next/font/google
4. THE heading level 1 SHALL menggunakan Poppins Bold dengan ukuran 56px desktop dan 36px mobile
5. THE heading level 2 SHALL menggunakan Poppins SemiBold dengan ukuran 28px hingga 40px
6. THE body text SHALL menggunakan DM Sans Regular dengan ukuran 14px hingga 18px
7. THE button text SHALL menggunakan Poppins SemiBold
8. THE badge text SHALL menggunakan Poppins SemiBold dengan ukuran 11px hingga 12px uppercase
9. THE nav link text SHALL menggunakan DM Sans Medium
10. THE card title SHALL menggunakan Poppins SemiBold dengan ukuran 14px hingga 16px

### Requirement 14: Color System

**User Story:** Sebagai pengunjung, saya ingin melihat desain yang konsisten dan profesional, sehingga saya merasa WEPOSE adalah platform yang terpercaya.

#### Acceptance Criteria

1. THE Landing_Page SHALL menggunakan orange (#F97316) sebagai primary CTA color
2. THE Landing_Page SHALL menggunakan orange-dark (#EA6B0A) untuk hover state pada primary CTA
3. THE Landing_Page SHALL menggunakan orange-100 (#FFEDD5) untuk badge background
4. THE Landing_Page SHALL menggunakan orange-50 (#FFF7ED) untuk section background
5. THE Landing_Page SHALL menggunakan navy (#0F1F3D) untuk heading dan footer background
6. THE Landing_Page SHALL menggunakan navy-mid (#1E3A5F) untuk navbar dan sidebar background
7. THE Landing_Page SHALL menggunakan navy-light (#E8EDF5) untuk subtle background
8. THE Landing_Page SHALL menggunakan gray-800 (#1F2937) untuk dark text
9. THE Landing_Page SHALL menggunakan gray-500 (#6B7280) untuk secondary text
10. THE Landing_Page SHALL menggunakan gray-200 (#E5E7EB) untuk borders
11. THE Landing_Page SHALL menggunakan gray-50 (#F9FAFB) untuk light section background

### Requirement 15: Interaction States

**User Story:** Sebagai pengunjung, saya ingin mendapat feedback visual saat berinteraksi dengan elemen, sehingga saya tahu bahwa aksi saya berhasil.

#### Acceptance Criteria

1. WHEN pengguna hover CTA_Button, THE button SHALL menampilkan shadow 0 4px 16px rgba(249,115,22,0.25)
2. WHEN pengguna hover card, THE card SHALL menampilkan shadow 0 8px 24px rgba(0,0,0,0.12)
3. WHEN pengguna focus input field, THE input SHALL menampilkan border oranye dengan ring rgba(249,115,22,0.2)
4. WHEN pengguna hover nav link, THE link SHALL mengubah warna text menjadi oranye dengan transition 150ms
5. WHEN pengguna hover Mega_Menu item, THE item SHALL menampilkan background orange-50 dengan border-radius 8px
6. WHEN pengguna hover Quick_Category_Chip, THE chip SHALL mengubah background menjadi white/20
7. WHEN pengguna hover Footer link, THE link SHALL mengubah warna menjadi oranye
8. WHEN pengguna klik button, THE button SHALL menampilkan scale 0.97 feedback
9. WHEN nav link aktif, THE link SHALL menampilkan underline oranye 2px
10. WHEN FAQ_Accordion item dibuka, THE ChevronDownIcon SHALL rotate 180 derajat

---

## Notes

Semua requirements di atas mengikuti EARS patterns dan INCOSE quality rules untuk memastikan testability dan clarity. Setiap acceptance criteria dapat diverifikasi melalui visual testing, interaction testing, atau automated testing menggunakan tools seperti Playwright atau Cypress.

Landing page ini dirancang untuk memberikan pengalaman yang lebih warm, guided, local, visual, dan trustworthy dibanding kompetitor, dengan fokus pada animasi yang subtle dan purposeful menggunakan Framer Motion.
