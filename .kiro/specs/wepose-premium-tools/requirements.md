# Requirements Document

## Introduction

WEPOSE Premium Tools adalah fitur premium yang menambahkan 3 tools interaktif ke platform WEPOSE: Quiz Kelayakan Visa, Visa Comparison Tool, dan Sponsor Letter Generator. Tools ini dirancang untuk memberikan nilai tambah kepada pengguna dengan pengalaman yang guided, visual, dan profesional. Semua tools menggunakan design system yang konsisten dengan landing page WEPOSE, dengan animasi smooth menggunakan Framer Motion dan desain mobile-first.

## Glossary

- **Premium_Tools**: Kumpulan 3 tools berbayar yang memberikan layanan tambahan kepada pengguna WEPOSE
- **Quiz_Kelayakan_Visa**: Tool interaktif berupa quiz 8 pertanyaan untuk menentukan rekomendasi visa yang sesuai dengan profil pengguna
- **Visa_Comparison_Tool**: Tool untuk membandingkan 2-3 visa secara side-by-side berdasarkan 8 kriteria
- **Sponsor_Letter_Generator**: Tool untuk membuat surat sponsor profesional dalam bahasa Indonesia atau Inggris dengan 3 template
- **Paywall**: Mekanisme pembatasan akses yang meminta pembayaran setelah 3 pertanyaan gratis di quiz atau sebelum generate PDF
- **Quiz_Screen**: Satu layar pertanyaan dalam quiz dengan pilihan jawaban
- **Progress_Bar**: Bar indikator progres di bagian atas quiz yang menunjukkan pertanyaan ke berapa dari total
- **Sticky_Compare_Bar**: Bar yang muncul di bagian bawah layar saat pengguna memilih visa untuk dibandingkan
- **Comparison_Table**: Tabel perbandingan visa dengan 8 kriteria dalam format side-by-side
- **Template_Selector**: Interface untuk memilih salah satu dari 3 template surat sponsor
- **Live_Preview**: Preview real-time dari surat sponsor yang update otomatis saat form diisi
- **Step_Wizard**: Interface multi-step dengan 3 tahap: pilih template, isi form & preview, generate PDF
- **Approval_Meter**: Visualisasi peluang approval visa dalam bentuk progress bar dengan kategori Tinggi/Sedang/Rendah
- **Mobile_Drawer**: Panel navigasi full-screen untuk mobile
- **WorldMap**: Komponen peta dunia interaktif dari landing page

## Requirements

### Requirement 1: Quiz Full-Screen Layout

**User Story:** Sebagai pengguna, saya ingin mengikuti quiz dalam mode full-screen tanpa distraksi, sehingga saya dapat fokus menjawab pertanyaan dengan baik.

#### Acceptance Criteria

1. THE Quiz_Kelayakan_Visa SHALL memiliki background gradient linear-gradient(135deg, #0F1F3D 0%, #1E3A5F 60%, #0F1F3D 100%) dengan min-height full viewport
2. THE Quiz_Kelayakan_Visa SHALL menampilkan subtle noise texture overlay dengan opacity 0.03
3. THE Quiz_Kelayakan_Visa SHALL menyembunyikan Navbar dan Footer selama quiz berlangsung
4. THE Progress_Bar SHALL memiliki posisi fixed top-0 dengan height 3px, background rgba(255,255,255,0.1), dan fill color orange #F97316
5. WHEN pengguna menjawab pertanyaan, THE Progress_Bar SHALL mengupdate width dengan animasi smooth menggunakan Framer Motion
6. THE Quiz_Kelayakan_Visa SHALL menampilkan nomor pertanyaan dengan format "X / 8" di posisi fixed top-4 right-6 menggunakan DM Sans 13px text-white/50
7. THE Quiz_Kelayakan_Visa SHALL menampilkan tombol kembali dengan Heroicons ArrowLeftIcon 20px di posisi fixed top-4 left-6
8. WHEN pengguna berada di pertanyaan pertama, THE tombol kembali SHALL disembunyikan
9. THE Quiz_Kelayakan_Visa SHALL menampilkan tombol close dengan Heroicons XMarkIcon 20px di posisi fixed top-4 right-16
10. WHEN tombol close diklik, THE Quiz_Kelayakan_Visa SHALL menampilkan modal konfirmasi exit menggunakan AnimatePresence

### Requirement 2: Quiz Question Structure

**User Story:** Sebagai pengguna, saya ingin melihat pertanyaan quiz yang jelas dengan pilihan jawaban yang mudah dipilih, sehingga saya dapat menjawab dengan cepat dan akurat.

#### Acceptance Criteria

1. THE Quiz_Screen SHALL memiliki max-width xl dengan padding horizontal 24px dan vertical 64px, centered dengan min-height full viewport
2. THE Quiz_Screen SHALL menampilkan kategori label di atas pertanyaan dengan background white/10, border white/20, text white/60, DM Sans 12px uppercase
3. THE Quiz_Screen SHALL menampilkan pertanyaan dengan Poppins Bold 28px desktop atau 22px mobile, text white, text-center, line-height 1.3
4. THE Quiz_Screen SHALL menampilkan 2-4 pilihan jawaban dalam grid layout
5. WHEN Quiz_Screen memiliki 4 pilihan, THE grid SHALL menggunakan 2 kolom
6. WHEN Quiz_Screen memiliki 2 pilihan, THE grid SHALL menggunakan 1 kolom
7. THE pilihan jawaban card SHALL memiliki min-height 120px desktop atau 96px mobile dengan background rgba(255,255,255,0.08) dan border rgba(255,255,255,0.15)
8. THE pilihan jawaban card SHALL menampilkan emoji 40px dan label Poppins Medium 15px putih dalam flex column center
9. WHEN pengguna hover pilihan jawaban, THE card SHALL menampilkan border orange/60, background rgba(249,115,22,0.1), dan scale 1.03
10. WHEN pilihan jawaban dipilih, THE card SHALL mengubah background menjadi orange #F97316, border orange, text white, dan scale 1.02
11. WHEN pilihan jawaban dipilih, THE Quiz_Screen SHALL menampilkan tombol "Lanjut →" dengan animasi fade-in dan y: 10→0
12. THE tombol "Lanjut →" SHALL menggunakan orange pill, Poppins SemiBold 15px, padding horizontal 32px dan vertical 12px

### Requirement 3: Quiz Question Transitions

**User Story:** Sebagai pengguna, saya ingin melihat transisi yang smooth antar pertanyaan, sehingga pengalaman quiz terasa natural dan tidak jarring.

#### Acceptance Criteria

1. WHEN pengguna klik tombol "Lanjut →", THE Quiz_Screen SHALL melakukan transisi ke pertanyaan berikutnya menggunakan AnimatePresence dengan mode "wait"
2. THE pertanyaan lama SHALL keluar dengan animasi x: 0→-60 dan opacity: 1→0 dalam 200ms ease-in
3. THE pertanyaan baru SHALL masuk dengan animasi x: 60→0 dan opacity: 0→1 dalam 250ms ease-out
4. WHEN pengguna klik tombol kembali, THE Quiz_Screen SHALL melakukan transisi reverse dengan x: 0→60 untuk exit dan x: -60→0 untuk enter
5. THE tombol "Lanjut →" SHALL menampilkan animasi whileTap scale 0.97
6. THE pilihan jawaban card SHALL menampilkan animasi whileTap scale 0.97
7. THE pilihan jawaban card SHALL menampilkan animasi whileHover scale 1.03 dengan transition 200ms ease-out

### Requirement 4: Quiz Data Structure

**User Story:** Sebagai pengguna, saya ingin menjawab 8 pertanyaan yang relevan tentang profil perjalanan saya, sehingga sistem dapat memberikan rekomendasi visa yang akurat.

#### Acceptance Criteria

1. THE Quiz_Kelayakan_Visa SHALL memiliki 8 pertanyaan dengan kategori: Tujuan Perjalanan, Destinasi, Profil Pemohon, Keuangan, Dokumen, Riwayat Visa, Waktu Keberangkatan, Durasi Perjalanan
2. THE pertanyaan 1 SHALL menanyakan tujuan perjalanan dengan 4 pilihan: Wisata & Liburan, Bisnis & Konferensi, Studi & Pendidikan, Kunjungan Keluarga
3. THE pertanyaan 2 SHALL menanyakan destinasi dengan 4 pilihan: Eropa/Schengen, Asia Timur, Amerika, Lainnya
4. THE pertanyaan 3 SHALL menanyakan pekerjaan dengan 4 pilihan: Karyawan Swasta/PNS, Wiraswasta/Freelancer, Pelajar/Mahasiswa, Ibu Rumah Tangga/Lainnya
5. THE pertanyaan 4 SHALL menanyakan saldo rekening dengan 4 pilihan: Di bawah Rp 10 juta, Rp 10-30 juta, Rp 30-100 juta, Di atas Rp 100 juta
6. THE pertanyaan 5 SHALL menanyakan status paspor dengan 4 pilihan: Sudah berlaku >1 tahun, Sudah tapi <6 bulan lagi, Belum punya paspor, Sedang dalam proses
7. THE pertanyaan 6 SHALL menanyakan riwayat visa dengan 3 pilihan: Pernah masih aktif, Pernah sudah expired, Belum pernah sama sekali
8. THE pertanyaan 7 SHALL menanyakan waktu keberangkatan dengan 4 pilihan: <2 minggu lagi, 1-3 bulan lagi, 3-6 bulan lagi, Belum pasti/planning
9. THE pertanyaan 8 SHALL menanyakan durasi perjalanan dengan 4 pilihan: 1-2 minggu, 3-4 minggu, 1-3 bulan, Lebih dari 3 bulan
10. THE setiap pilihan jawaban SHALL memiliki emoji icon dan label text yang deskriptif

### Requirement 5: Quiz Paywall Access Control

**User Story:** Sebagai pengguna, saya ingin mencoba 3 pertanyaan gratis sebelum membayar, sehingga saya dapat mengevaluasi nilai tool sebelum berkomitmen.

#### Acceptance Criteria

1. THE Quiz_Kelayakan_Visa SHALL memberikan akses gratis untuk pertanyaan 1, 2, dan 3
2. WHEN pengguna mencapai pertanyaan 4 dan belum memiliki akses premium, THE Quiz_Kelayakan_Visa SHALL menampilkan Paywall sebelum pertanyaan ditampilkan
3. WHEN pengguna memiliki order visa aktif, THE Quiz_Kelayakan_Visa SHALL memberikan akses penuh tanpa paywall
4. WHEN pengguna sudah membeli paket tools, THE Quiz_Kelayakan_Visa SHALL memberikan akses penuh tanpa paywall
5. THE Paywall SHALL memiliki background putih dengan rounded-2xl, shadow-lg, padding 32px, max-width md, centered
6. THE Paywall SHALL menampilkan Heroicons LockClosedIcon 48px dalam lingkaran background orange-100
7. THE Paywall SHALL menampilkan badge "PREMIUM TOOL" dengan background purple/10, border purple/30, text purple, Poppins SemiBold 11px
8. THE Paywall SHALL menampilkan heading "Lanjutkan untuk Hasil Lengkap" dengan Poppins Bold 22px navy
9. THE Paywall SHALL menampilkan harga "Rp 25.000" dengan Poppins Bold 32px orange dan "/sesi" dengan DM Sans 14px gray-400
10. THE Paywall SHALL menampilkan 3 nilai tambah dengan Heroicons CheckCircleIcon 16px green: rekomendasi visa dipersonalisasi, analisis peluang approval, checklist dokumen spesifik
11. THE Paywall SHALL menampilkan tombol "Buka Quiz Sekarang — Rp 25.000" orange pill full-width large
12. THE Paywall SHALL menampilkan tombol "Bundling dengan Order Visa (Gratis)" ghost navy pill full-width
13. WHEN Paywall muncul, THE overlay background SHALL fade-in dengan rgba(15,31,61,0.7) dan card SHALL animate scale 0.92→1 dengan opacity 0→1 dalam 300ms

### Requirement 6: Quiz Result Display

**User Story:** Sebagai pengguna yang menyelesaikan quiz, saya ingin melihat rekomendasi visa yang dipersonalisasi dengan peluang approval, sehingga saya dapat membuat keputusan yang informed.

#### Acceptance Criteria

1. WHEN pengguna menyelesaikan semua 8 pertanyaan, THE Quiz_Kelayakan_Visa SHALL menampilkan halaman hasil dengan transisi slide dari kanan
2. THE hasil page SHALL memiliki background navy gradient dengan max-width 2xl, padding horizontal 24px dan vertical 64px
3. THE hasil page SHALL menampilkan emoji paspor 🛂 dengan animasi bounce-in spring duration 400ms
4. THE hasil page SHALL menampilkan label "Rekomendasi untuk Kamu" dengan DM Sans 13px orange uppercase
5. THE hasil page SHALL menampilkan nama visa rekomendasi dengan Poppins Bold 32px putih dan emoji bendera
6. THE hasil page SHALL menampilkan Approval_Meter dalam card background white/10, border white/15, rounded-2xl, padding 20px
7. THE Approval_Meter SHALL menampilkan progress bar dengan height 12px, rounded-full, animasi width 0→X% dalam 800ms ease-out
8. WHEN peluang approval tinggi, THE Approval_Meter SHALL menggunakan green gradient
9. WHEN peluang approval sedang, THE Approval_Meter SHALL menggunakan amber gradient
10. WHEN peluang approval rendah, THE Approval_Meter SHALL menggunakan red gradient
11. THE Approval_Meter SHALL menampilkan badge "TINGGI", "SEDANG", atau "RENDAH" dengan Poppins Bold 14px di kanan progress bar
12. THE hasil page SHALL menampilkan 3 tips meningkatkan peluang dalam card background white/8, border white/10, rounded-2xl, padding 20px
13. THE setiap tip SHALL menggunakan Heroicons ChevronRightIcon 14px orange dan DM Sans 14px white/80
14. THE hasil page SHALL menampilkan checklist dokumen kunci dengan Heroicons DocumentTextIcon 20px orange dan checkbox hollow putih
15. THE hasil page SHALL menampilkan tombol "Apply Visa [Nama] Sekarang →" orange pill full-width large dengan Heroicons PaperAirplaneIcon
16. THE hasil page SHALL menampilkan tombol "Simpan Hasil ke Akun" ghost white pill full-width
17. THE hasil page SHALL menampilkan tombol "Ulangi Quiz" ghost dengan Heroicons ArrowPathIcon dan DM Sans 13px white/50
18. THE semua elemen hasil page SHALL muncul dengan stagger animation delay 0.1s per elemen menggunakan useInView

### Requirement 7: Sticky Compare Bar

**User Story:** Sebagai pengguna yang ingin membandingkan visa, saya ingin melihat bar yang sticky di bagian bawah layar, sehingga saya dapat mengakses perbandingan dari halaman manapun.

#### Acceptance Criteria

1. WHEN pengguna memilih visa untuk dibandingkan, THE Sticky_Compare_Bar SHALL muncul di posisi fixed bottom-0 dengan z-index 50
2. THE Sticky_Compare_Bar SHALL memiliki background navy #0F1F3D dengan box-shadow 0 -4px 20px rgba(0,0,0,0.3)
3. THE Sticky_Compare_Bar SHALL memiliki padding 12px 24px dengan height 72px
4. THE Sticky_Compare_Bar SHALL muncul dengan animasi y: 100→0 slide-up menggunakan AnimatePresence
5. THE Sticky_Compare_Bar SHALL menampilkan thumbnail visa yang dipilih dengan max 3 visa
6. THE setiap thumbnail visa SHALL memiliki lingkaran 44px background navy-mid, emoji bendera, nama visa truncate DM Sans 12px putih, dan tombol × untuk hapus
7. THE Sticky_Compare_Bar SHALL menampilkan counter "X visa dipilih" dengan DM Sans 14px gray-400 di tengah
8. THE Sticky_Compare_Bar SHALL menampilkan tombol "Bandingkan Sekarang →" orange pill medium di kanan
9. WHEN hanya 1 visa dipilih, THE tombol "Bandingkan Sekarang →" SHALL disabled dengan background gray dan cursor not-allowed
10. WHEN visa ditambah atau dihapus dari compare list, THE thumbnail SHALL animate dengan AnimatePresence
11. THE Sticky_Compare_Bar SHALL muncul di semua halaman WEPOSE saat ada visa yang dipilih untuk dibandingkan

### Requirement 8: Comparison Page Layout

**User Story:** Sebagai pengguna, saya ingin melihat halaman perbandingan visa yang jelas dengan Navbar, sehingga saya dapat navigasi ke halaman lain dengan mudah.

#### Acceptance Criteria

1. THE Visa_Comparison_Tool SHALL menampilkan Navbar sticky di bagian atas halaman
2. THE Visa_Comparison_Tool SHALL memiliki header section dengan background navy-mid dan padding 40px
3. THE header section SHALL menampilkan heading "Bandingkan Visa" dengan Poppins Bold 32px putih
4. THE header section SHALL menampilkan sub-heading "Pilih 2–3 visa untuk melihat perbandingan detail" dengan DM Sans 16px gray-300
5. WHEN slot visa masih kosong, THE Visa_Comparison_Tool SHALL menampilkan card dashed border-2 border-white/20 rounded-2xl dengan height 80px
6. THE card tambah visa SHALL menampilkan Heroicons PlusCircleIcon 24px white/40 dan text "Tambah Visa" DM Sans 14px white/40
7. WHEN card tambah visa diklik, THE Visa_Comparison_Tool SHALL menampilkan modal search visa
8. THE Visa_Comparison_Tool SHALL dapat diakses melalui 3 cara: checkbox di Visa Card katalog, tombol di detail visa, atau langsung ke /tools/compare

### Requirement 9: Comparison Table Structure

**User Story:** Sebagai pengguna, saya ingin melihat perbandingan visa dalam tabel yang terstruktur dengan 8 kriteria, sehingga saya dapat membuat keputusan berdasarkan data yang lengkap.

#### Acceptance Criteria

1. THE Comparison_Table SHALL memiliki overflow-x auto untuk mobile scroll horizontal
2. THE Comparison_Table SHALL memiliki header row sticky dengan position sticky top 64px
3. THE header row kolom 0 SHALL menampilkan label kriteria dengan background gray-50 dan width 200px desktop atau 140px mobile
4. THE header row kolom 1-3 SHALL menampilkan setiap visa dengan background navy-mid gradient ke putih
5. THE setiap kolom visa di header SHALL menampilkan emoji bendera 32px, nama visa Poppins SemiBold 15px navy, tombol × untuk hapus, dan tombol "Apply Visa Ini →" orange pill small full-width
6. THE Comparison_Table SHALL menampilkan 8 baris kriteria: Harga Mulai Dari, Durasi Tinggal, Masa Berlaku Visa, Waktu Proses, Jenis Visa, Perlu Appointment, Dokumen Fisik, Cocok Untuk
7. THE setiap baris kriteria SHALL menampilkan Heroicons icon 16px gray-400 dan label DM Sans 13px gray-500
8. THE baris ganjil SHALL memiliki background white dan baris genap SHALL memiliki background gray-50
9. THE nilai cell SHALL menggunakan DM Sans 14px navy, text-center, padding 16px
10. WHEN nilai adalah terbaik di row, THE cell SHALL memiliki background #DCFCE7 hijau muda dengan Heroicons StarIcon 12px green di pojok kanan atas
11. WHEN nilai adalah terburuk di row untuk kriteria harga atau waktu proses, THE cell SHALL memiliki background #FEE2E2 merah muda
12. THE highlight cells SHALL muncul dengan animasi opacity 0→1 delay 300ms saat tabel render

### Requirement 10: Comparison Recommendation Banner

**User Story:** Sebagai pengguna yang sudah login, saya ingin melihat rekomendasi personal berdasarkan profil saya, sehingga saya mendapat saran yang relevan.

#### Acceptance Criteria

1. WHEN pengguna sudah login, THE Visa_Comparison_Tool SHALL menampilkan banner rekomendasi di bawah Comparison_Table
2. THE banner rekomendasi SHALL memiliki background orange-50 dengan border-left-4 border-orange, rounded-right-2xl, padding 20px
3. THE banner rekomendasi SHALL menampilkan Heroicons SparklesIcon 24px orange
4. THE banner rekomendasi SHALL menampilkan text "Berdasarkan profilmu, kami rekomendasikan:" dengan DM Sans 14px gray-600
5. THE banner rekomendasi SHALL menampilkan nama visa dengan Poppins Bold 18px navy dan emoji bendera
6. THE banner rekomendasi SHALL menampilkan alasan singkat dengan DM Sans 13px gray-500 italic
7. THE banner rekomendasi SHALL menampilkan tombol "Apply Visa Ini →" orange pill medium
8. THE banner rekomendasi SHALL muncul dengan animasi opacity 0→1 dan y: 16→0 delay 500ms saat component mount
9. WHEN pengguna belum login, THE banner rekomendasi SHALL tidak ditampilkan

### Requirement 11: Add Visa Modal

**User Story:** Sebagai pengguna, saya ingin mencari dan menambah visa ke perbandingan dengan mudah, sehingga saya dapat membandingkan visa yang saya inginkan.

#### Acceptance Criteria

1. WHEN pengguna klik "Tambah Visa", THE modal search SHALL muncul centered dengan rounded-2xl, shadow-lg, width 480px desktop atau full mobile, background white
2. THE modal search SHALL menampilkan header "Cari Visa" dengan Poppins SemiBold 18px navy dan tombol close Heroicons XMarkIcon
3. THE modal search SHALL menampilkan search input dengan Heroicons MagnifyingGlassIcon 20px gray-400 dan placeholder "Cari nama negara atau visa..."
4. THE search input SHALL mendapat autofocus saat modal dibuka
5. THE modal search SHALL menampilkan hasil pencarian dalam list item dengan emoji bendera, nama visa, harga, dan tombol "Pilih" orange small pill
6. WHEN tidak ada hasil pencarian, THE modal search SHALL menampilkan Heroicons DocumentMagnifyingGlassIcon 40px gray-300 dan text "Visa tidak ditemukan" gray-500
7. THE modal search SHALL muncul dengan animasi scale 0.95→1 dan opacity 0→1 dalam 250ms ease-out menggunakan AnimatePresence
8. THE modal overlay SHALL fade-in dengan background rgba(0,0,0,0.5)
9. WHEN pengguna klik di luar modal atau tekan Escape, THE modal search SHALL menutup dengan animasi reverse

### Requirement 12: Sponsor Letter Page Layout

**User Story:** Sebagai pengguna, saya ingin membuat surat sponsor dengan interface yang guided, sehingga saya dapat menghasilkan surat profesional dengan mudah.

#### Acceptance Criteria

1. THE Sponsor_Letter_Generator SHALL menampilkan Navbar sticky di bagian atas halaman
2. THE Sponsor_Letter_Generator SHALL memiliki header section dengan background navy-mid dan padding 40px
3. THE header section SHALL menampilkan badge "PREMIUM TOOL" dengan background purple/10, border purple, text purple, Poppins SemiBold 11px
4. THE header section SHALL menampilkan heading "Generate Surat Sponsor" dengan Poppins Bold 32px putih
5. THE header section SHALL menampilkan sub-heading "Buat surat sponsor profesional dalam hitungan menit" dengan DM Sans 16px gray-300
6. THE header section SHALL menampilkan toggle bahasa di kanan atas dengan format "🇮🇩 Indonesia" / "🇬🇧 English"
7. WHEN bahasa dipilih, THE toggle SHALL menampilkan background orange dan text white
8. WHEN bahasa tidak dipilih, THE toggle SHALL menampilkan background white/10 dan text white/60
9. THE Sponsor_Letter_Generator SHALL menampilkan progress steps indicator dengan 3 step: Pilih Template, Review & Edit, Generate PDF
10. THE progress steps indicator SHALL sticky dengan position top 64px, background white, border-bottom gray-200
11. WHEN step selesai, THE indicator SHALL menampilkan background hijau lingkaran dengan Heroicons CheckIcon 14px putih dan text hijau
12. WHEN step aktif, THE indicator SHALL menampilkan background orange lingkaran dengan angka putih bold dan text orange bold
13. WHEN step belum dimulai, THE indicator SHALL menampilkan background gray-200 lingkaran dengan angka gray dan text gray-400
14. THE connector line antara step SHALL berwarna hijau jika step sebelumnya selesai dan gray jika belum

### Requirement 13: Template Selection Step

**User Story:** Sebagai pengguna, saya ingin memilih template surat sponsor yang sesuai dengan kebutuhan saya, sehingga surat yang dihasilkan relevan dengan situasi saya.

#### Acceptance Criteria

1. THE Template_Selector SHALL memiliki max-width 3xl, centered, padding 40px 16px
2. THE Template_Selector SHALL menampilkan heading "Pilih Jenis Surat Sponsor" dengan Poppins SemiBold 24px navy, centered
3. THE Template_Selector SHALL menampilkan 3 template cards dalam grid: 3 kolom desktop, 1 kolom mobile
4. THE template card SHALL memiliki background white, rounded-2xl, shadow-md, padding 24px, border-2 border-gray-200, cursor-pointer, min-height 280px
5. THE template card SHALL menampilkan preview thumbnail dengan background gray-50, border gray-200, rounded-lg, height 120px dengan simulasi garis teks
6. THE template card SHALL menampilkan nama template dengan Poppins SemiBold 17px navy
7. THE template card SHALL menampilkan deskripsi dengan DM Sans 13px gray-500, maksimal 2 baris
8. THE template "Sponsor Keluarga" SHALL memiliki tag "Paling Populer" dengan badge orange-100 text-orange pill kecil
9. THE template "Sponsor Keluarga" SHALL memiliki deskripsi "Untuk pemohon yang dibiayai oleh anggota keluarga (orang tua, suami/istri, anak)" dan icon 👨‍👩‍👧
10. THE template "Sponsor Perusahaan" SHALL memiliki deskripsi "Untuk perjalanan bisnis atau dinas yang dibiayai oleh perusahaan/instansi" dan icon 🏢
11. THE template "Sponsor Pribadi" SHALL memiliki deskripsi "Untuk pemohon yang membiayai perjalanan sendiri (self-sponsored)" dan icon 💼
12. WHEN pengguna hover template card, THE card SHALL scale 1.02 dengan shadow-lg dan border-gray-300 dalam 200ms ease-out
13. WHEN template card dipilih, THE card SHALL menampilkan border-2 border-orange, background orange-50, dan Heroicons CheckCircleIcon 20px orange di pojok kanan atas
14. THE tombol "Lanjut ke Review & Edit →" SHALL disabled dengan background gray dan cursor not-allowed jika belum ada template dipilih
15. WHEN template dipilih, THE tombol "Lanjut ke Review & Edit →" SHALL muncul dengan animasi fade-in menggunakan AnimatePresence

### Requirement 14: Sponsor Letter Paywall

**User Story:** Sebagai pengguna yang belum membeli paket, saya ingin melihat paywall sebelum step 2, sehingga saya memahami bahwa tool ini berbayar.

#### Acceptance Criteria

1. WHEN pengguna belum memiliki paket tools dan mencoba masuk ke step 2, THE Sponsor_Letter_Generator SHALL menampilkan paywall modal
2. THE paywall modal SHALL memiliki style yang sama dengan quiz paywall: background putih, rounded-2xl, shadow-lg, padding 32px, max-width md
3. THE paywall modal SHALL menampilkan Heroicons LockClosedIcon 48px dalam lingkaran background orange-100
4. THE paywall modal SHALL menampilkan badge "PREMIUM TOOL" dengan background purple/10, border purple/30, text purple
5. THE paywall modal SHALL menampilkan harga "Rp 15.000" dengan Poppins Bold 32px orange dan "/generate" dengan DM Sans 14px gray-400
6. THE paywall modal SHALL menampilkan tombol "Generate Surat Sekarang — Rp 15.000" orange pill full-width large
7. WHEN pengguna sudah memiliki paket tools, THE Sponsor_Letter_Generator SHALL langsung masuk ke step 2 tanpa paywall

### Requirement 15: Form and Live Preview Layout

**User Story:** Sebagai pengguna, saya ingin mengisi form dan melihat preview surat secara real-time, sehingga saya dapat memastikan data yang saya masukkan benar.

#### Acceptance Criteria

1. THE step 2 SHALL memiliki layout 2 kolom desktop: kiri 45% form, kanan 55% preview
2. WHEN viewport width kurang dari 768px, THE step 2 SHALL menampilkan 1 kolom dengan form di atas dan preview di bawah dalam accordion
3. THE form kolom SHALL menampilkan header "Isi Data Surat" dengan Poppins SemiBold 18px navy dan tombol "Ambil dari Profil" ghost orange dengan Heroicons UserIcon 16px
4. THE form SHALL dibagi menjadi 3 section: Data Pemohon, Data Sponsor, Detail Perjalanan
5. THE section header SHALL menggunakan Poppins SemiBold 14px navy dengan border-bottom gray-100, padding-bottom 8px, margin-bottom 16px
6. THE form input SHALL memiliki border gray-200, rounded-xl (10px), DM Sans 15px
7. WHEN form input mendapat focus, THE input SHALL menampilkan border-orange dengan ring rgba(249,115,22,0.15)
8. THE form label SHALL menggunakan DM Sans Medium 13px gray-700 dengan margin-bottom 4px
9. THE preview kolom SHALL menampilkan header "Preview Surat" dengan Poppins SemiBold 18px navy dan badge "Live Preview" pill green-100 text-green
10. THE Live_Preview container SHALL memiliki aspect ratio A4 (0.707), background white, border 1px solid gray-200, shadow-md, padding 32px
11. THE Live_Preview SHALL memiliki overflow-y auto dengan max-height 600px desktop
12. WHEN form field diubah, THE Live_Preview SHALL update text dengan animasi fade 150ms menggunakan AnimatePresence
13. WHEN form field kosong, THE Live_Preview SHALL menampilkan placeholder dengan background highlight kuning muda #FEF3C7 dan text "[Isi nama pemohon]"

### Requirement 16: Form Fields for Family Sponsor

**User Story:** Sebagai pengguna yang memilih template Sponsor Keluarga, saya ingin mengisi data yang relevan, sehingga surat yang dihasilkan akurat dan lengkap.

#### Acceptance Criteria

1. THE form untuk template "Sponsor Keluarga" SHALL memiliki section Data Pemohon dengan 4 field: Nama Lengkap, Nomor Paspor, Tanggal Lahir, Hubungan dengan Sponsor
2. THE field "Hubungan dengan Sponsor" SHALL menggunakan select input dengan pilihan: Anak, Suami/Istri, Orang Tua
3. THE form untuk template "Sponsor Keluarga" SHALL memiliki section Data Sponsor dengan 4 field: Nama Lengkap Sponsor, Nomor KTP Sponsor, Alamat Lengkap, Nomor Telepon
4. THE field "Alamat Lengkap" SHALL menggunakan textarea dengan min-height 80px
5. THE form untuk template "Sponsor Keluarga" SHALL memiliki section Detail Perjalanan dengan 4 field: Negara Tujuan, Tanggal Keberangkatan, Tanggal Kepulangan, Kota di Negara Tujuan
6. THE field "Tanggal Keberangkatan" dan "Tanggal Kepulangan" SHALL menggunakan date input

### Requirement 17: Form Fields for Company Sponsor

**User Story:** Sebagai pengguna yang memilih template Sponsor Perusahaan, saya ingin mengisi data perusahaan yang relevan, sehingga surat yang dihasilkan sesuai dengan konteks bisnis.

#### Acceptance Criteria

1. THE form untuk template "Sponsor Perusahaan" SHALL memiliki field tambahan: Nama Perusahaan, Jabatan, Nomor Surat, Nama HR/Penandatangan, Jabatan Penandatangan
2. THE form untuk template "Sponsor Perusahaan" SHALL memiliki semua field dari template Sponsor Keluarga kecuali "Hubungan dengan Sponsor"
3. THE field "Nama Perusahaan" SHALL menggunakan text input
4. THE field "Jabatan" SHALL menggunakan text input untuk jabatan pemohon
5. THE field "Nomor Surat" SHALL menggunakan text input untuk nomor surat resmi perusahaan
6. THE field "Nama HR/Penandatangan" SHALL menggunakan text input
7. THE field "Jabatan Penandatangan" SHALL menggunakan text input untuk jabatan yang menandatangani surat

### Requirement 18: Form Fields for Personal Sponsor

**User Story:** Sebagai pengguna yang memilih template Sponsor Pribadi, saya ingin mengisi data yang lebih sederhana, sehingga proses pembuatan surat lebih cepat.

#### Acceptance Criteria

1. THE form untuk template "Sponsor Pribadi" SHALL memiliki field yang lebih sederhana: Nama, Nomor Paspor, Pekerjaan, Penghasilan Bulanan
2. THE form untuk template "Sponsor Pribadi" SHALL memiliki section Detail Perjalanan dengan field: Negara Tujuan, Tanggal Keberangkatan, Tanggal Kepulangan, Kota di Negara Tujuan
3. THE field "Pekerjaan" SHALL menggunakan text input
4. THE field "Penghasilan Bulanan" SHALL menggunakan text input dengan format currency
5. THE form untuk template "Sponsor Pribadi" SHALL tidak memiliki section Data Sponsor terpisah karena pemohon adalah sponsor sendiri

### Requirement 19: Live Preview Content

**User Story:** Sebagai pengguna, saya ingin melihat preview surat yang akurat dengan format profesional, sehingga saya yakin surat yang dihasilkan sesuai standar.

#### Acceptance Criteria

1. THE Live_Preview SHALL menampilkan judul "SURAT PERNYATAAN SPONSOR" dengan Poppins Bold 14px navy, center, uppercase
2. THE Live_Preview SHALL menampilkan section "Yang bertanda tangan di bawah ini:" dengan data sponsor
3. THE Live_Preview SHALL menampilkan data sponsor dalam format: Nama, KTP, Alamat, Telepon dengan DM Sans 12px
4. THE Live_Preview SHALL menampilkan section "Dengan ini menyatakan bahwa saya bersedia menanggung biaya perjalanan untuk:" dengan data pemohon
5. THE Live_Preview SHALL menampilkan data pemohon dalam format: Nama, Paspor dengan DM Sans 12px
6. THE Live_Preview SHALL menampilkan paragraf isi surat sesuai template dan bahasa yang dipilih
7. THE Live_Preview SHALL menampilkan penutup "Demikian surat pernyataan ini dibuat dengan sebenarnya."
8. THE Live_Preview SHALL menampilkan lokasi dan tanggal hari ini dengan format "[Kota], [tanggal_hari_ini]"
9. THE Live_Preview SHALL menampilkan section tanda tangan dengan garis bawah dan nama sponsor
10. WHEN bahasa diubah dari Indonesia ke English atau sebaliknya, THE Live_Preview SHALL update seluruh konten dengan animasi fade 200ms menggunakan AnimatePresence

### Requirement 20: Mobile Preview Accordion

**User Story:** Sebagai pengguna mobile, saya ingin melihat preview surat tanpa mengganggu form, sehingga saya dapat beralih antara form dan preview dengan mudah.

#### Acceptance Criteria

1. WHEN viewport width kurang dari 768px, THE Live_Preview SHALL ditampilkan sebagai accordion di bawah form
2. THE accordion trigger SHALL menampilkan tombol "Lihat Preview Surat ▾" dengan DM Sans 14px navy
3. WHEN accordion trigger diklik, THE Live_Preview SHALL expand dengan animasi height transition menggunakan AnimatePresence
4. WHEN accordion dibuka, THE trigger icon SHALL rotate 180 derajat
5. THE accordion content SHALL menampilkan Live_Preview dengan style yang sama seperti desktop

### Requirement 21: Generate PDF Step - Before Generate

**User Story:** Sebagai pengguna yang sudah mengisi form, saya ingin mereview data sebelum generate PDF, sehingga saya dapat memastikan tidak ada kesalahan.

#### Acceptance Criteria

1. THE step 3 SHALL memiliki max-width xl, centered, padding 40px 16px
2. THE step 3 SHALL menampilkan card background white, rounded-2xl, shadow-md, padding 32px, text-center
3. THE card SHALL menampilkan Heroicons DocumentArrowDownIcon 64px dalam lingkaran background orange-100, centered
4. THE card SHALL menampilkan heading "Surat Siap Di-Generate!" dengan Poppins Bold 22px navy
5. THE card SHALL menampilkan sub-heading "Periksa sekali lagi sebelum generate. Setelah di-generate, surat akan tersimpan di Vault kamu." dengan DM Sans 14px gray-600
6. THE card SHALL menampilkan summary box dengan background gray-50, rounded-xl, padding 16px, text-left
7. THE summary box SHALL menampilkan 4 informasi: Template, Bahasa, Pemohon, Tujuan dengan DM Sans 13px gray-600 dan label gray-400
8. THE card SHALL menampilkan tombol "← Kembali & Edit" ghost dan "Generate PDF →" orange pill large
9. THE card SHALL menampilkan trust note "🔒 PDF dienkripsi & disimpan aman di vault kamu" dengan DM Sans 12px gray-400 centered

### Requirement 22: Generate PDF Step - Loading State

**User Story:** Sebagai pengguna yang sedang generate PDF, saya ingin melihat loading indicator yang jelas, sehingga saya tahu proses sedang berjalan.

#### Acceptance Criteria

1. WHEN pengguna klik "Generate PDF →", THE step 3 SHALL menampilkan loading state dengan animasi
2. THE loading state SHALL menampilkan Heroicons DocumentTextIcon 64px dengan animasi y: -10→10→-10 loop dan rotate: -3→3→-3 loop dalam 1500ms ease-in-out repeat
3. THE loading state SHALL menampilkan loading bar orange dengan progress 0→100% selama 2000ms sebagai simulasi
4. THE loading state SHALL menampilkan text "Sedang membuat surat sponsor..." dengan DM Sans 14px gray-600 dan dot animation
5. THE loading state SHALL memiliki blur overlay di belakang card
6. THE loading state SHALL transition dari state sebelumnya dengan AnimatePresence

### Requirement 23: Generate PDF Step - Success State

**User Story:** Sebagai pengguna yang berhasil generate PDF, saya ingin melihat preview dan dapat download atau simpan PDF, sehingga saya dapat menggunakan surat sponsor tersebut.

#### Acceptance Criteria

1. WHEN PDF berhasil di-generate, THE step 3 SHALL menampilkan success state dengan animasi scale 0.9→1 dan opacity 0→1 dalam 400ms ease-out
2. THE success state SHALL menampilkan Heroicons CheckCircleIcon 64px solid green dalam lingkaran background green-100 dengan animasi scale bounce 0→1.1→1 via spring
3. THE success state SHALL menampilkan heading "Surat Berhasil Dibuat! 🎉" dengan Poppins Bold 22px navy
4. THE success state SHALL menampilkan sub-heading dengan DM Sans 14px gray-600
5. THE success state SHALL menampilkan preview PDF dalam card background white, border gray-200, rounded-xl, shadow-sm, padding 16px, height 300px
6. THE preview PDF SHALL memiliki overlay gradient di bawah dengan linear-gradient(to bottom, transparent 60%, white 100%) dan text "Scroll untuk lihat semua ↓"
7. THE success state SHALL menampilkan tombol "Download PDF" orange pill large dengan Heroicons ArrowDownTrayIcon sebagai primary action
8. THE success state SHALL menampilkan tombol "Simpan ke Vault" ghost navy pill large dengan Heroicons FolderArrowDownIcon
9. THE success state SHALL menampilkan tombol "Bagikan via WhatsApp" ghost green pill large dengan Heroicons ShareIcon
10. THE success state SHALL menampilkan tombol "Generate Ulang" ghost gray text small dengan Heroicons ArrowPathIcon 14px di bawah tombol utama

### Requirement 24: Animation System for Premium Tools

**User Story:** Sebagai pengguna, saya ingin melihat animasi yang smooth dan purposeful di semua premium tools, sehingga pengalaman menggunakan tools terasa modern dan profesional.

#### Acceptance Criteria

1. THE Animation_System SHALL menggunakan Framer Motion untuk semua animasi di premium tools
2. THE Animation_System SHALL menggunakan useReducedMotion hook untuk mendeteksi preferensi pengguna
3. WHEN user prefers reduced motion, THE Animation_System SHALL menonaktifkan semua transform dan transition animations
4. THE quiz question transition SHALL menggunakan animasi x: ±60 dengan opacity dalam 200-250ms
5. THE quiz answer select SHALL menggunakan animasi scale 1.02 dengan transition 150ms
6. THE quiz "Lanjut" button SHALL muncul dengan animasi opacity 0→1 dan y: 10→0 dalam 200ms
7. THE paywall modal SHALL muncul dengan animasi scale 0.92→1 dan opacity 0→1 dalam 300ms
8. THE quiz result elements SHALL muncul dengan stagger animation delay 100ms per element
9. THE approval meter fill SHALL menggunakan animasi width 0→X% dalam 800ms ease-out
10. THE compare bar SHALL muncul dengan animasi y: 100→0 dalam 250ms ease-out
11. THE comparison table highlight cells SHALL muncul dengan animasi opacity 0→1 delay 300ms
12. THE recommendation banner SHALL muncul dengan animasi opacity 0→1 dan y: 16→0 delay 500ms
13. THE template card hover SHALL menggunakan animasi scale 1.02 dalam 200ms
14. THE form preview sync SHALL menggunakan animasi fade 150ms untuk perubahan text
15. THE language toggle SHALL menggunakan animasi fade 200ms untuk swap konten
16. THE generate loading SHALL menggunakan animasi document bounce loop dalam 1500ms
17. THE generate success SHALL menggunakan animasi scale 0.9→1 dalam 400ms spring

### Requirement 25: Responsive Design for Premium Tools

**User Story:** Sebagai pengguna mobile, saya ingin semua premium tools terlihat baik di semua ukuran layar, sehingga saya dapat menggunakan tools dari perangkat apapun.

#### Acceptance Criteria

1. THE Premium_Tools SHALL menggunakan mobile-first approach dengan breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
2. WHEN viewport width kurang dari 768px, THE quiz headline SHALL menggunakan font-size 22px
3. WHEN viewport width kurang dari 768px, THE quiz pilihan jawaban card SHALL memiliki min-height 96px
4. WHEN viewport width kurang dari 768px, THE Comparison_Table SHALL memiliki overflow-x auto untuk horizontal scroll
5. WHEN viewport width kurang dari 768px, THE Comparison_Table kolom label SHALL memiliki width 140px
6. WHEN viewport width kurang dari 768px, THE Sticky_Compare_Bar counter text SHALL disembunyikan
7. WHEN viewport width kurang dari 768px, THE Template_Selector grid SHALL menampilkan 1 kolom
8. WHEN viewport width kurang dari 768px, THE step 2 layout SHALL menampilkan 1 kolom dengan form di atas dan preview accordion di bawah
9. WHEN viewport width kurang dari 768px, THE modal search SHALL menggunakan full width
10. THE Premium_Tools SHALL memiliki max content width 1280px centered

### Requirement 26: Design System Consistency

**User Story:** Sebagai pengguna, saya ingin melihat desain yang konsisten antara premium tools dan landing page, sehingga pengalaman menggunakan WEPOSE terasa seamless.

#### Acceptance Criteria

1. THE Premium_Tools SHALL menggunakan color palette yang sama dengan landing page: navy #0F1F3D, navy-mid #1E3A5F, orange #F97316, orange-dark #EA6B0A
2. THE Premium_Tools SHALL menggunakan purple #7C3AED khusus untuk badge premium dan tools
3. THE Premium_Tools SHALL menggunakan Poppins font dengan weights Bold, SemiBold, Medium untuk headings dan buttons
4. THE Premium_Tools SHALL menggunakan DM Sans font dengan weights Regular, Medium untuk body text
5. THE Premium_Tools SHALL menggunakan border-radius 9999px untuk buttons, 16px untuk cards, 10px untuk inputs, 20px untuk modals
6. THE Premium_Tools SHALL menggunakan Heroicons dari @heroicons/react/24/outline dan /solid
7. THE Premium_Tools SHALL menggunakan shadow-md untuk cards, shadow-lg untuk modals dan hover states
8. THE Premium_Tools SHALL menggunakan transition duration 150ms untuk hover states, 200ms untuk animations, 300ms untuk modals
9. THE Premium_Tools SHALL menggunakan orange #F97316 untuk primary CTA buttons
10. THE Premium_Tools SHALL menggunakan ghost style untuk secondary buttons dengan border dan transparent background

### Requirement 27: Routing and Navigation

**User Story:** Sebagai pengguna, saya ingin mengakses premium tools melalui URL yang jelas, sehingga saya dapat bookmark atau share link tools dengan mudah.

#### Acceptance Criteria

1. THE Quiz_Kelayakan_Visa SHALL dapat diakses melalui route /tools/quiz
2. THE Visa_Comparison_Tool SHALL dapat diakses melalui route /tools/compare
3. THE Sponsor_Letter_Generator SHALL dapat diakses melalui route /tools/sponsor-letter
4. THE Quiz_Kelayakan_Visa SHALL menggunakan file app/tools/quiz/page.tsx
5. THE Visa_Comparison_Tool SHALL menggunakan file app/tools/compare/page.tsx
6. THE Sponsor_Letter_Generator SHALL menggunakan file app/tools/sponsor-letter/page.tsx
7. THE Premium_Tools routes SHALL menggunakan Next.js App Router
8. WHEN pengguna mengakses /tools/quiz, THE page SHALL load dengan quiz di pertanyaan pertama
9. WHEN pengguna mengakses /tools/compare tanpa visa dipilih, THE page SHALL menampilkan empty state dengan card tambah visa
10. WHEN pengguna mengakses /tools/sponsor-letter, THE page SHALL load di step 1 template selection

### Requirement 28: Interaction States for Premium Tools

**User Story:** Sebagai pengguna, saya ingin mendapat feedback visual saat berinteraksi dengan elemen di premium tools, sehingga saya tahu bahwa aksi saya berhasil.

#### Acceptance Criteria

1. WHEN pengguna hover quiz pilihan jawaban card, THE card SHALL menampilkan border orange/60, background rgba(249,115,22,0.1), dan scale 1.03
2. WHEN pengguna hover tombol "Lanjut →", THE button SHALL menampilkan shadow-orange dan y: -2
3. WHEN pengguna hover template card, THE card SHALL scale 1.02 dengan shadow-lg dan border-gray-300
4. WHEN pengguna hover comparison table row, THE row SHALL menampilkan background gray-100
5. WHEN pengguna focus form input, THE input SHALL menampilkan border-orange dengan ring rgba(249,115,22,0.15)
6. WHEN pengguna hover CTA button, THE button SHALL menampilkan shadow 0 4px 16px rgba(249,115,22,0.25)
7. WHEN pengguna klik button, THE button SHALL menampilkan scale 0.97 feedback dengan whileTap
8. WHEN pengguna hover visa thumbnail di compare bar, THE thumbnail SHALL menampilkan background navy-light
9. WHEN pengguna hover tombol × di compare bar, THE button SHALL menampilkan background red/10 dan text red
10. WHEN form field diubah, THE Live_Preview text yang berubah SHALL menampilkan subtle fade animation 150ms

### Requirement 29: Accessibility for Premium Tools

**User Story:** Sebagai pengguna dengan kebutuhan aksesibilitas, saya ingin premium tools dapat digunakan dengan keyboard dan screen reader, sehingga saya dapat mengakses semua fitur dengan mudah.

#### Acceptance Criteria

1. THE semua interactive elements SHALL dapat diakses dengan keyboard navigation menggunakan Tab dan Enter
2. THE quiz pilihan jawaban card SHALL dapat dipilih dengan keyboard Enter atau Space
3. THE modal close button SHALL dapat diakses dengan keyboard Escape
4. THE form inputs SHALL memiliki label yang jelas dan terhubung dengan for attribute
5. THE buttons SHALL memiliki aria-label yang deskriptif untuk screen readers
6. THE progress bar SHALL memiliki aria-valuenow, aria-valuemin, dan aria-valuemax attributes
7. THE disabled buttons SHALL memiliki aria-disabled="true" attribute
8. THE modal SHALL memiliki focus trap saat dibuka
9. WHEN modal dibuka, THE focus SHALL berpindah ke elemen pertama dalam modal
10. WHEN modal ditutup, THE focus SHALL kembali ke elemen yang membuka modal

### Requirement 30: State Management

**User Story:** Sebagai pengguna, saya ingin progress saya tersimpan saat menggunakan tools, sehingga saya tidak kehilangan data jika terjadi kesalahan atau refresh.

#### Acceptance Criteria

1. THE Quiz_Kelayakan_Visa SHALL menyimpan jawaban pengguna dalam state dengan tipe Record<number, string>
2. THE Quiz_Kelayakan_Visa SHALL menyimpan current question index dalam state
3. THE Quiz_Kelayakan_Visa SHALL menyimpan unlock status dalam state atau cookie
4. THE Visa_Comparison_Tool SHALL menyimpan list visa yang dipilih dalam state
5. THE Sticky_Compare_Bar SHALL sync dengan state visa yang dipilih di semua halaman
6. THE Sponsor_Letter_Generator SHALL menyimpan current step (1, 2, atau 3) dalam state
7. THE Sponsor_Letter_Generator SHALL menyimpan selected template dalam state
8. THE Sponsor_Letter_Generator SHALL menyimpan form data dalam state dengan tipe SponsorFormData
9. THE Sponsor_Letter_Generator SHALL menyimpan selected language (id atau en) dalam state
10. THE Sponsor_Letter_Generator SHALL menyimpan generated PDF URL dalam state setelah generate berhasil

### Requirement 31: Error Handling

**User Story:** Sebagai pengguna, saya ingin melihat pesan error yang jelas jika terjadi kesalahan, sehingga saya tahu apa yang harus dilakukan.

#### Acceptance Criteria

1. WHEN payment gagal di paywall, THE system SHALL menampilkan error message dengan DM Sans 14px red
2. WHEN form validation gagal, THE system SHALL menampilkan error message di bawah field yang error dengan DM Sans 12px red
3. WHEN PDF generation gagal, THE system SHALL menampilkan error state dengan Heroicons XCircleIcon red dan pesan error
4. WHEN search visa tidak menemukan hasil, THE modal SHALL menampilkan empty state dengan icon dan text "Visa tidak ditemukan"
5. WHEN network request gagal, THE system SHALL menampilkan toast notification dengan pesan error
6. THE error messages SHALL menggunakan bahasa Indonesia yang jelas dan actionable
7. THE error state SHALL menyediakan tombol "Coba Lagi" untuk retry action

### Requirement 32: Performance Optimization

**User Story:** Sebagai pengguna, saya ingin premium tools load dengan cepat dan responsive, sehingga saya dapat menggunakan tools tanpa delay.

#### Acceptance Criteria

1. THE Premium_Tools pages SHALL load dalam waktu kurang dari 2 detik pada koneksi 3G
2. THE Premium_Tools SHALL menggunakan Next.js dynamic import untuk code splitting
3. THE Premium_Tools SHALL menggunakan lazy loading untuk images dan heavy components
4. THE Live_Preview SHALL menggunakan debounce untuk update text saat form diubah
5. THE search input di modal SHALL menggunakan debounce 300ms untuk search query
6. THE Premium_Tools SHALL menggunakan React.memo untuk components yang tidak perlu re-render
7. THE animations SHALL menggunakan CSS transform dan opacity untuk hardware acceleration
8. THE Premium_Tools SHALL menggunakan Next.js Image component untuk optimized images

---

## Notes

Semua requirements di atas mengikuti EARS patterns dan INCOSE quality rules untuk memastikan testability dan clarity. Setiap acceptance criteria dapat diverifikasi melalui visual testing, interaction testing, atau automated testing menggunakan tools seperti Playwright atau Cypress.

Premium Tools ini dirancang untuk memberikan nilai tambah kepada pengguna WEPOSE dengan pengalaman yang guided, visual, dan profesional. Semua tools menggunakan design system yang konsisten dengan landing page WEPOSE, dengan fokus pada animasi yang subtle dan purposeful menggunakan Framer Motion.

Ketiga tools ini memiliki model bisnis freemium:
- Quiz Kelayakan Visa: 3 pertanyaan gratis, Rp 25.000 untuk akses penuh
- Visa Comparison Tool: Gratis untuk semua pengguna
- Sponsor Letter Generator: Rp 15.000 per generate

Pengguna yang memiliki order visa aktif mendapat akses gratis ke semua premium tools sebagai nilai tambah dari layanan visa mereka.
