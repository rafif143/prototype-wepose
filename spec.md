Oke gue udah liat kompetitornya (SPUN). Sekarang gue update brief-nya dengan semua perubahan yang lo minta. Ini versi final yang bisa langsung lo paste:

---

## 🧳 WEPOSE — Landing Page Prototype Brief (Updated v2)

---

### ⚙️ TECH STACK & SETUP

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** **Framer Motion** — wajib di semua section. Animasi subtle & purposeful, bukan lebay/AI-feel. Gunakan `motion.div`, `useInView`, `AnimatePresence`, `staggerChildren`.
- **Icons:** **Heroicons** (`@heroicons/react`) — sudah terinstall. Import dari `@heroicons/react/24/outline` atau `/solid`
- **Map component:** Gunakan `WorldMap` component dari kode yang sudah diberikan (komponen `dotted-map` + Framer Motion). Pasang di Hero Section sebagai background visual.
- **Fonts:** Google Fonts — `Poppins` (Bold, SemiBold, Medium) + `DM Sans` (Regular, Medium). Import via `next/font/google`.
- **Responsif:** Mobile-first. Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). Max content width 1280px centered.

---

### 🎨 DESIGN TOKENS (globals.css / tailwind.config)

```
colors:
  orange:     #F97316   (primary CTA)
  orange-dark:#EA6B0A   (hover)
  orange-100: #FFEDD5   (badge bg)
  orange-50:  #FFF7ED   (section bg)
  navy:       #0F1F3D   (heading, footer)
  navy-mid:   #1E3A5F   (navbar, sidebar)
  navy-light: #E8EDF5   (subtle bg)
  gray-800:   #1F2937
  gray-500:   #6B7280
  gray-200:   #E5E7EB
  gray-50:    #F9FAFB

border-radius:
  button: 9999px (pill)
  card:   16px
  input:  10px
  modal:  20px
  badge:  9999px

shadows:
  card:        0 4px 12px rgba(0,0,0,0.10)
  card-hover:  0 8px 24px rgba(0,0,0,0.12)
  cta-hover:   0 4px 16px rgba(249,115,22,0.25)
```

---

### 🧭 NAVBAR

**File:** `components/Navbar.tsx`

**Specs:**

- Height: 64px, sticky top-0, z-50
- Background: `navy-mid (#1E3A5F)` — on scroll past 80px: tambah `shadow-md` transition smooth via Framer Motion `useScroll`
- **Left:** Logo — `WEPOSE` teks, Poppins Bold, "WEPOSE" dalam dua warna: `WE` putih + `POSE` oranye
- **Center:** Nav links — `Visa`, `Tools`, `Promo`, `Blog`, `Tentang Kami` — DM Sans Medium, white, hover: text-orange transition 150ms. Active: text-orange + underline oranye 2px
- **Right:** `🌐 ID` (ghost small), `Masuk` (ghost white pill border), `Daftar` (solid orange pill)
- **Hamburger Mobile:** Heroicons `Bars3Icon` 24px putih, slide-down drawer via `AnimatePresence` + `motion.div`

**Mega Menu — dropdown saat hover/klik "Visa":**

- Trigger: hover desktop / tap mobile
- Panel: background putih, `border-radius 0 0 12px 12px`, `shadow-lg`, lebar 720px, muncul dari bawah navbar
- Animasi: `opacity: 0→1` + `y: -8→0`, duration 150ms ease-out via Framer Motion
- Menutup saat klik di luar (useClickOutside) atau Escape
- **3 kolom:**

  | Kolom 1: Berdasarkan Region | Kolom 2: Berdasarkan Tujuan | Kolom 3: Featured  |
  | --------------------------- | --------------------------- | ------------------ |
  | 🌍 Schengen / Eropa         | ✈️ Wisata                   | 🔥 Trending Visa   |
  | 🌏 Asia Timur               | 💼 Bisnis                   | ⚡ Proses Tercepat |
  | 🌺 Asia Tenggara            | 🎓 Studi                    | 🏷 Promo Aktif     |
  | 🌎 Amerika                  | 👔 Kerja                    | 🆕 Visa Terbaru    |
  | 🕌 Timur Tengah             | 👨‍👩‍👧 Keluarga                 | 💡 Quiz Kelayakan  |
  | 🦘 Australia & Pasifik      | 🏠 Tinggal                  | 📊 Bandingkan Visa |

- Setiap item: Heroicon kecil (atau emoji) + label text. Hover item: bg-orange-50, text-orange, border-radius 8px, transition 100ms
- Kolom header: Poppins SemiBold 11px uppercase gray-400, margin-bottom 8px

**Mobile Mega Menu:** Full-screen drawer dari kiri, accordion per kategori, AnimatePresence slide-in

---

### 🦸 HERO SECTION

**File:** `components/Hero.tsx`

**Layout:** Full viewport height (`min-h-screen`), background `navy (#0F1F3D)`

**Background:** `WorldMap` component dipasang sebagai absolute background, full width, dengan `lineColor="#F97316"` (oranye), opacity 30-40%, `dots` menunjukkan rute dari Jakarta ke destinasi populer:

```tsx
dots={[
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 48.8, lng: 2.3, label: "Paris" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 35.6, lng: 139.7, label: "Tokyo" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 37.5, lng: 127.0, label: "Seoul" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 51.5, lng: -0.1, label: "London" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: 40.7, lng: -74.0, label: "New York" } },
  { start: { lat: -6.2, lng: 106.8, label: "Jakarta" }, end: { lat: -33.8, lng: 151.2, label: "Sydney" } },
]}
```

**Konten — center aligned, z-10, di atas peta:**

1. **Badge atas:**
   `✈️ Platform Visa #1 di Indonesia` — pill badge, bg orange-100/10 border orange/30, text orange, Poppins SemiBold 12px
   Animasi: `opacity 0→1, y: 10→0`, delay 0.1s

2. **Headline:**
   `Apply Visa Jadi Effortless` — Poppins Bold, 56px desktop / 36px mobile, putih
   Animasi: `opacity 0→1, y: 20→0`, delay 0.2s

3. **Sub-headline:**
   `Urus visa ke 35+ negara bersama tim profesional Wepose.`
   `Cepat, aman, transparan.`
   DM Sans Regular, 18px desktop / 15px mobile, `gray-300 (#D1D5DB)`
   Animasi: delay 0.3s

4. **Search Bar:**
   Input besar, full width max-w-2xl, bg white, border-radius 10px, shadow-md
   - Icon: Heroicons `MagnifyingGlassIcon` 20px gray-400 di dalam kiri
   - Placeholder: `Mau visa ke mana? Cth: Jepang, Prancis, Korea...`
   - Tombol kanan: `Cari Visa` pill oranye, Poppins SemiBold
   - Focus state: border orange + ring `rgba(249,115,22,0.2)`
     Animasi: delay 0.4s

5. **Quick Category Chips (8 items):**
   Row flex wrap, gap-2, justify-center
   Setiap chip: emoji + label, bg `white/10` border `white/20`, text white, rounded-full, py-2 px-4, text-sm DM Sans
   Hover: bg white/20 transition 150ms
   Items: `🇪🇺 Schengen`, `🇯🇵 Jepang`, `🇰🇷 Korea`, `🇦🇺 Australia`, `🇺🇸 Amerika`, `🌍 Eropa`, `🕌 Timur Tengah`, `➕ Lihat Semua`
   Animasi: staggerChildren 0.05s, delay mulai 0.5s

6. **Stats Bar:**
   Row 4 item, separator `|` oranye, justify-center, mt-8
   - `35+` Poppins Bold 28px orange + `Negara` DM Sans 13px gray-400
   - `100+` + `Tipe Visa`
   - `10.000+` + `Pelanggan Puas`
   - `5+` + `Tahun Pengalaman`
     Animasi: counter animasi angka dari 0 ke nilai target (1200ms ease-out) saat mount

---

### 🪜 SECTION: CARA KERJA

**Background:** `gray-50 (#F9FAFB)`
**Layout:** 4 kolom desktop, 2 kolom tablet, 1 kolom mobile

**Header:**

- Badge: `CARA KERJA` — uppercase, orange, pill, small
- H2: `Visa Approved dalam 4 Langkah Mudah` — Poppins SemiBold 28px navy centered

**4 Step cards:**
Setiap card: bg white, border-radius 16px, shadow-md, padding 24px, text-center

- Lingkaran oranye angka (48px, bg orange, text white Poppins Bold) di tengah atas
- Heroicon ilustratif 32px oranye di bawah angka:
  1. `UserPlusIcon` — **Daftar & Cari Visa** — _Temukan dari 100+ tipe visa ke 35+ negara tujuan_
  2. `DocumentArrowUpIcon` — **Isi Data & Upload Dokumen** — _Lengkapi form & simpan dokumen ke vault aman Wepose_
  3. `CreditCardIcon` — **Bayar & Konfirmasi** — _Bayar via metode favoritmu. Invoice otomatis terkirim_
  4. `SignalIcon` — **Pantau Status Real-time** — _Lacak progres visamu kapanpun lewat portal tamu_
- Connector: garis dashed oranye horizontal antara step (hanya desktop, absolute positioned)

**Animasi (Framer Motion):**

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
```

Trigger dengan `useInView({ once: true, margin: "-100px" })`

---

### 🎴 SECTION: VISA POPULER

**Background:** white
**Header:** Badge `VISA POPULER` + H2 `Destinasi Favorit Pelanggan Wepose` — navy centered

**Grid:** 3 kolom desktop, 2 tablet, 1 mobile, gap 24px

**6 Visa Cards:**
Setiap card: bg white, rounded-2xl (16px), shadow-md, overflow-hidden, cursor-pointer

- **Cover top:** height 140px, gradient unik per negara (Navy→warna khas), emoji bendera 40px centered, badge tipe di pojok kanan atas (pill orange-100 text-orange text-xs)
- **Body padding 16px:**
  - Nama visa: Poppins SemiBold 15px navy
  - `⏱ X hari kerja` · `📅 X hari tinggal` — DM Sans 12px gray-500 flex gap
  - Harga: `Mulai dari Rp X.XXX.000` — Poppins SemiBold 14px orange
  - Add-on badges row: pill chips orange-100 text-orange text-xs
  - **Footer card:** flex justify-between, tombol `Bandingkan` (ghost, Heroicons `ScaleIcon` 14px) + `Lihat Detail →` (orange pill sm)

**Hover:** `scale(1.02)` + shadow-lg, `transition: { duration: 0.2, ease: "easeOut" }` via `whileHover`

**Data 6 cards:**

1. 🇫🇷 France Schengen Tourist — 15–20 hari — 90 hari tinggal — Rp 1.850.000 — gradient `#0F1F3D→#1E3A5F`
2. 🇯🇵 Jepang Tourist — 7–10 hari — 15 hari tinggal — Rp 950.000 — gradient `#DC2626→#991B1B`
3. 🇰🇷 Korea Selatan Tourist — 5–7 hari — 30 hari tinggal — Rp 850.000 — gradient `#1D4ED8→#1E40AF`
4. 🇦🇺 Australia Tourist — 10–15 hari — 3 bulan tinggal — Rp 1.250.000 — gradient `#15803D→#166534`
5. 🇺🇸 Amerika B1/B2 — 30–60 hari — 6 bulan tinggal — Rp 3.500.000 — gradient `#7C3AED→#6D28D9`
6. 🇬🇧 United Kingdom Standard — 20–30 hari — 6 bulan tinggal — Rp 2.100.000 — gradient `#B45309→#92400E`

**Below grid:** Tombol centered `Lihat Semua 100+ Visa →` — orange pill large, Heroicons `ArrowRightIcon` inline

---

### 💬 SECTION: TESTIMONI

**Background:** `navy (#0F1F3D)`
**Header:** Badge oranye `ULASAN PELANGGAN` + H2 putih `Dipercaya 10.000+ Traveler Indonesia` + rating `★★★★★ 5.0 dari 200+ ulasan Google` (stars orange, teks gray-300)

**3 Review Cards** — bg `navy-mid (#1E3A5F)`, rounded-2xl, padding 24px

- Avatar: lingkaran 40px, bg gradient unik, inisial nama Poppins Bold putih
- Nama: Poppins SemiBold 14px putih + `✓ Google Review` badge hijau pill kecil
- Bintang: 5 `★` solid oranye 14px
- Review teks: DM Sans 14px gray-300, italic, 3 baris
- Tag destinasi: `✈️ France Schengen` — pill orange/20 border orange/30 text-orange text-xs

**Data:**

1. **Rina S.** — _"Prosesnya gampang banget, tiap langkah ada panduan. Visa Schengen approved 17 hari, nggak nyangka secepat itu!"_ — Visa Schengen
2. **Budi H.** — _"Fast response, ada update status tiap hari. Tim Wepose profesional, visa UK approved tanpa ribet!"_ — Visa UK
3. **Sari D.** — _"Harga transparan, nggak ada biaya tersembunyi. Vault dokumen sangat membantu untuk apply visa berikutnya."_ — Visa Jepang

**Animasi:** stagger cards fade-in + y: 20→0 saat inView

---

### 📊 SECTION: STATS

**Background:** `orange (#F97316)`
**4 kolom:** tiap kolom — angka besar Poppins Bold 48px putih + label DM Sans 16px orange-100

- `35+` Negara Tujuan
- `100+` Tipe Visa
- `10.000+` Pelanggan Puas
- `5+` Tahun Pengalaman

**Animasi:** counter count-up dari 0 saat inView (useEffect + requestAnimationFrame, 1200ms ease-out)

---

### ❓ SECTION: FAQ

**Background:** `gray-50`
**Header:** Badge + H2 `Pertanyaan yang Sering Ditanyakan` navy centered
**Layout:** max-w-2xl centered, single column

**Accordion (6 items)** — setiap item: border-b gray-200, py-4

- Question: Poppins Medium 16px navy, `flex justify-between items-center`
- Heroicons: `ChevronDownIcon` 20px gray-400, rotates 180° saat open — `motion.div` dengan `rotate: 0→180`
- Answer: DM Sans 15px gray-600, `AnimatePresence` + `motion.div` height 0→auto, opacity 0→1

**6 FAQ Items:**

1. `Apakah Wepose resmi dan terdaftar?` — _Ya, Wepose beroperasi sejak 2019 dan telah melayani 10.000+ pelanggan dari seluruh Indonesia._
2. `Berapa lama proses pengajuan visa?` — _Tergantung negara tujuan, rata-rata 5–30 hari kerja. Estimasi akurat ditampilkan di setiap halaman visa._
3. `Apakah dokumen saya aman di Wepose?` — _Semua dokumen dienkripsi end-to-end dan hanya bisa diakses oleh kamu sendiri._
4. `Bagaimana jika visa saya ditolak?` — _Tim konsultan kami akan membantu analisis & pengajuan ulang dengan persiapan lebih matang._
5. `Metode pembayaran apa saja yang tersedia?` — _Transfer bank, virtual account, e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit via Midtrans._
6. `Apakah ada jaminan uang kembali?` — _Ya, kami memberikan garansi refund jika gagal akibat kesalahan di pihak Wepose._

---

### 🚀 SECTION: FINAL CTA

**Background:** gradient navy `#0F1F3D → #1E3A5F` diagonal
**Konten center:**

- H2: `Siap Mulai Petualanganmu?` Poppins Bold 40px putih
- Sub: `Bergabung dengan 10.000+ traveler yang sudah percaya Wepose.` DM Sans 18px gray-300
- Buttons row: `Mulai Apply Sekarang →` (orange pill lg, Heroicons `PaperAirplaneIcon`) + `Konsultasi Gratis` (ghost white pill lg, Heroicons `ChatBubbleLeftRightIcon`)
- Trust signals: `🔒 SSL Encrypted` · `✅ Terdaftar Resmi` · `⭐ 5.0 Google` — DM Sans 13px gray-400, flex gap-4 justify-center mt-4

**Animasi:** scale 0.95→1 + opacity 0→1 saat inView

---

### 🦶 FOOTER

**Background:** `navy (#0F1F3D)`, padding top 64px, bottom 32px
**4 kolom desktop, 2 kolom tablet, 1 kolom mobile:**

- **Col 1:** Logo WEPOSE + tagline `Platform visa terpercaya untuk traveler Indonesia` gray-400 DM Sans 14px + icon row: Heroicons `ChatBubbleOvalLeftEllipsisIcon` (WA), + social icons
- **Col 2:** **Layanan** — Katalog Visa, Quiz Kelayakan, Bandingkan Visa, Generate Surat Sponsor
- **Col 3:** **Perusahaan** — Tentang Kami, Blog, Promo, Karir, Kontak
- **Col 4:** **Kontak** — WhatsApp: 0812-xxxx-xxxx, Email: halo@wepose.id, Jam: Sen–Jum 09.00–18.00 WIB
- Link style: DM Sans 14px gray-400, hover text-orange transition 150ms
- **Bottom bar:** border-t gray-800, flex justify-between, `© 2026 Wepose` + `Kebijakan Privasi · Syarat & Ketentuan`

---

### 🎞️ ANIMATION RULES (PENTING)

**Prinsip:**

- Semua animasi pakai **Framer Motion** — tidak ada CSS animation murni kecuali hover sederhana
- **BUKAN lebay** — tidak ada bounce berlebihan, tidak ada spring yg terlalu elastis, tidak ada efek 3D berlebih
- Semua scroll animation pakai `useInView({ once: true, margin: "-80px" })`
- Easing konsisten: `ease: [0.25, 0.46, 0.45, 0.94]` (ease-out smooth) untuk masuk, `ease: "easeIn"` untuk keluar

**Standar:**
| Element | Effect | Duration |
|---|---|---|
| Section masuk viewport | `opacity: 0→1, y: 24→0` | 0.5s |
| Stagger children | delay per child: 0.1s | — |
| Card hover | `scale: 1.02` + shadow | 0.2s |
| Button click | `scale: 0.97` | 0.1s |
| CTA button hover | `y: -2` + orange shadow | 0.2s |
| Mega menu open | `opacity: 0→1, y: -8→0` | 0.15s |
| FAQ accordion | height auto + opacity | 0.3s |
| Chevron rotate | `rotate: 0→180` | 0.3s |
| Page initial load | Hero content stagger | 0.1–0.5s delays |
| Counter stats | count-up 0→target | 1.2s |

**Accessibility:** Wrap semua animasi dengan `useReducedMotion()` check — kalau true, skip semua transform/transition

---

### 📁 STRUKTUR FILE YANG DISARANKAN

```
app/
  page.tsx                  ← assemble semua section
  layout.tsx                ← font import Poppins + DM Sans

components/
  Navbar.tsx                ← sticky navbar + mega menu
  Hero.tsx                  ← hero + WorldMap background
  HowItWorks.tsx
  PopularVisa.tsx
  Testimonials.tsx
  StatsSection.tsx
  FaqSection.tsx
  CtaSection.tsx
  Footer.tsx
  ui/
    WorldMap.tsx             ← komponen map yang diberikan
    VisaCard.tsx
    Button.tsx
```

---

### 🆚 DIFFERENSIASI VS KOMPETITOR (SPUN)

SPUN terasa clean tapi dingin/korporat. Wepose harus terasa:

- **Lebih warm** — navy + oranye hangat vs putih steril
- **Lebih guided** — section Cara Kerja yang jelas vs SPUN langsung lempar filter
- **Lebih local** — copy bahasa Indonesia yang conversational, bukan formal
- **Lebih visual** — WorldMap animated di hero vs globe statis SPUN
- **Lebih trust** — testimoni Google + stats + trust signals lebih prominent
