

## 📄 WEPOSE — Section 3.3: Halaman Detail Visa (Full Brief)

---

### ⚙️ TECH STACK & SETUP

- **Framework:** Next.js (App Router) + TypeScript
- **Route:** `app/visa/[slug]/page.tsx`
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion — `motion.div`, `AnimatePresence`, `useInView`, `useScroll`, `useMotionValueEvent`
- **Icons:** Heroicons (`@heroicons/react/24/outline` + `/solid`)
- **Fonts:** Poppins (Bold, SemiBold, Medium) + DM Sans (Regular, Medium) via `next/font/google`
- **Responsif:** Mobile-first. Breakpoints `md` (768px) `lg` (1024px). Max content width 1280px centered.

---

### 🎨 DESIGN TOKENS

```
navy:        #0F1F3D
navy-mid:    #1E3A5F
orange:      #F97316
orange-dark: #EA6B0A
orange-100:  #FFEDD5
orange-50:   #FFF7ED
gray-800:    #1F2937
gray-500:    #6B7280
gray-200:    #E5E7EB
gray-50:     #F9FAFB
green:       #16A34A
amber:       #D97706
red:         #DC2626

border-radius:
  card:   16px
  button: 9999px (pill)
  badge:  9999px
  input:  10px

shadows:
  card:       0 4px 12px rgba(0,0,0,0.10)
  card-hover: 0 8px 24px rgba(0,0,0,0.12)
  cta-hover:  0 4px 16px rgba(249,115,22,0.25)
```

---

### 🏗️ STRUKTUR HALAMAN (TOP TO BOTTOM)

```
<VisaDetailPage>
  <Navbar />               ← sticky, navy-mid, sama seperti landing page
  <HeroHeader />           ← cover image full-width + info overlay
  <Breadcrumb />           ← di dalam hero area, atas kiri
  <StickyTabBar />         ← tab nav 5 tab, sticky saat scroll
  <TabContent>
    <OverviewTab />        ← tab default aktif
    <RequirementsTab />
    <PricingTab />
    <FaqTab />
    <AddonsTab />
  </TabContent>
  <StickyCTAMobile />      ← muncul di mobile saat scroll melewati header
  <Footer />
</VisaDetailPage>
```

---

### 🖼️ 1. HERO HEADER

**Layout:** Full width, tidak ada container padding di sisi. Cover image dengan gradient overlay.

**Cover Image:**
- Aspect ratio: `21/9` desktop, `16/9` mobile
- Simulasikan dengan gradient background navy ke warna khas negara (karena ini prototype, tidak pakai foto asli)
- Contoh France: `background: linear-gradient(135deg, #0F1F3D 0%, #1E3A5F 40%, #002395 100%)`
- Di atas gradient: emoji bendera besar centered 80px, opacity 20% sebagai texture — `absolute inset-0 flex items-center justify-center text-[200px] opacity-10 select-none pointer-events-none`
- **Gradient overlay bawah:** `linear-gradient(to top, rgba(15,31,61,0.95) 0%, rgba(15,31,61,0.4) 50%, transparent 100%)` — untuk readability teks di bawah

**Breadcrumb (di atas cover, pojok kiri bawah area overlay):**
```
Beranda > Visa > Schengen > France Schengen Tourist
```
- DM Sans 13px, text white/60, hover text white transition
- Separator `>` gray-400
- Item terakhir: text white, tidak ada link
- Heroicons `HomeIcon` 14px di item pertama
- Posisi: `absolute bottom-28 left-6 md:left-8 lg:left-12 z-10`

**Info Overlay (absolute bottom, di atas gradient gelap):**
Layout flex column, posisi `absolute bottom-0 left-0 right-0 px-6 md:px-8 lg:px-12 pb-6 md:pb-8`

Dari atas ke bawah:
1. **Badge row** (flex gap-2):
   - Badge tipe visa: `Tourist` — pill, bg white/15 border white/30 text white, Poppins SemiBold 11px uppercase
   - Badge proses: `⚡ 15–20 Hari Kerja` — pill, bg orange/20 border orange/40 text orange
   - Badge e-visa / sticker: `📋 Visa Sticker` — pill, bg white/10 text white/80

2. **Nama Visa:** `France Schengen Tourist` — Poppins Bold, 36px desktop / 24px mobile, text white, line-height tight

3. **Flag + Country row:**
   - Emoji bendera 24px + `Prancis` — DM Sans Medium 16px text white/80

4. **Harga:**
   - Label: `Mulai dari` DM Sans 13px gray-300
   - Harga: `Rp 1.850.000` Poppins Bold 28px text orange

**Animasi header:** Seluruh konten overlay `opacity 0→1, y: 10→0`, duration 0.6s ease-out saat mount

---

### 📌 2. STICKY TAB BAR

**Behavior:**
- Default: muncul langsung di bawah hero header, `position: sticky, top: 64px` (tinggi navbar)
- Background: white, `border-bottom: 1px solid #E5E7EB`, `shadow: 0 2px 8px rgba(0,0,0,0.06)`
- Mobile: semua 5 tab ada, horizontal scroll (`overflow-x: auto, scrollbar-none`)
- z-index: 40

**5 Tab Items:**

| Tab | Icon (Heroicons outline) | Label |
|---|---|---|
| Overview | `InformationCircleIcon` | Overview |
| Persyaratan | `DocumentCheckIcon` | Persyaratan |
| Harga | `BanknotesIcon` | Harga |
| FAQ | `QuestionMarkCircleIcon` | FAQ |
| Add-on | `PuzzlePieceIcon` | Add-on |

**Per tab item:**
- Padding: `px-4 py-3 md:px-6`
- Default: text gray-500, icon gray-400
- **Active:** text orange, icon orange, `border-bottom: 3px solid #F97316`
- Hover: text navy transition 150ms
- Font: DM Sans Medium 14px desktop, 13px mobile
- Icon: 18px, inline kiri label, gap-1.5

**Animasi active indicator:**
Underline oranye pakai `motion.div` dengan `layoutId="tab-indicator"` — sliding smooth saat tab ganti, duration 0.2s ease-out. BUKAN fade, tapi slide position.

**Scroll behavior:**
Saat klik tab → `scrollIntoView({ behavior: 'smooth', block: 'start' })` ke section yang relevan, offset 120px (kompensasi navbar + tab bar)

**State management:** `useState<'overview'|'requirements'|'pricing'|'faq'|'addons'>('overview')`

---

### 📋 3. TAB CONTENT SECTIONS

Semua section pakai `id` yang sesuai untuk smooth scroll: `id="overview"`, `id="requirements"`, dst.
Container: `max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16`
Layout utama: **2 kolom desktop** — konten kiri 65%, sidebar kanan 35% (sticky Order Summary). Mobile: 1 kolom, Order Summary disembunyikan.

---

#### TAB 1: OVERVIEW (Default Aktif)

**Kiri — Konten Utama:**

**A. Deskripsi Singkat**
- H3: `Tentang Visa Ini` — Poppins SemiBold 20px navy
- Teks: DM Sans 15px gray-600, 3–4 paragraf dummy:
  *"Schengen Tourist Visa memungkinkan kamu mengunjungi 27 negara area Schengen dalam satu visa. Visa ini berlaku selama 90 hari dalam periode 180 hari."*

**B. Stats Kunci — 4 card kecil dalam grid 2x2:**
Setiap card: bg orange-50, rounded-xl, padding 16px, flex gap
- Heroicons icon 20px orange + label gray-500 13px + nilai navy Poppins SemiBold 16px
- Data:
  1. `ClockIcon` — Estimasi Proses — `15–20 Hari Kerja`
  2. `CalendarDaysIcon` — Masa Tinggal — `90 Hari`
  3. `GlobeAltIcon` — Area Berlaku — `27 Negara Schengen`
  4. `ArrowPathIcon` — Validitas Visa — `3 Bulan`

**C. Timeline Visual Proses**
- H3: `Alur Proses` Poppins SemiBold 20px navy
- Timeline vertikal, 5 step
- Setiap step: dot oranye (12px, bg orange) + garis vertikal oranye/gray + konten kanan
- Dot aktif/current: pulse animation `scale 1→1.3→1` loop 2s via Framer Motion
- Step labels:
  1. ✅ `Pengajuan & Upload Dokumen` — *Lengkapi form dan upload dokumen ke vault*
  2. ✅ `Verifikasi Dokumen` — *Tim kami memeriksa kelengkapan dokumen (1–2 hari kerja)*
  3. 🔄 `Pengajuan ke Kedutaan` — *Dokumen dikirim ke Kedutaan Prancis* ← status aktif (pulse)
  4. ⬜ `Proses di Kedutaan` — *Kedutaan memproses permohonan (10–15 hari kerja)*
  5. ⬜ `Paspor Siap Diambil` — *Notifikasi dikirim saat paspor siap*
- Warna: selesai = hijau, aktif = oranye pulse, belum = gray-300

**D. Add-on Tersedia (preview, 3 item)**
- H3: `Layanan Tambahan` Poppins SemiBold 20px navy
- Row 3 chip card horizontal: icon + nama + harga mulai — `Translate Dokumen Rp 150k`, `Hotel Dummy Rp 75k`, `Apostille Rp 899k`
- Link `Lihat Semua Add-on →` orange di kanan

**E. CTA Block**
- Card: bg navy, rounded-2xl, padding 24px, text center
- Teks: `Siap Apply Visa France Schengen?` Poppins Bold 22px putih
- Sub: `Tim profesional Wepose siap membantu proses visamu` DM Sans 14px gray-300
- Tombol: `Mulai Apply Sekarang →` orange pill lg full-width + `Tanya Dulu via WhatsApp` ghost white pill lg
- Heroicons: `PaperAirplaneIcon` inline tombol pertama, `ChatBubbleLeftRightIcon` tombol kedua

**Kanan — Sticky Order Summary (desktop only, `position: sticky, top: 128px`):**
Card: bg white, rounded-2xl, shadow-md, padding 24px, border gray-200

Konten dari atas:
1. **Nama visa** — Poppins SemiBold 16px navy + flag emoji
2. **Harga base:** `Rp 1.850.000` Poppins Bold 24px orange + `/orang` DM Sans 13px gray-400
3. **Divider** gray-200
4. **Estimasi row:** `⏱ 15–20 hari kerja` + `📅 90 hari tinggal` — DM Sans 13px gray-500
5. **Add-on checklist** (3 item toggle):
   - Checkbox custom oranye + label + harga
   - `[ ] Translate Dokumen +Rp 150.000`
   - `[ ] Hotel Dummy +Rp 75.000`
   - `[ ] Apostille +Rp 899.000`
6. **Total:** `Total: Rp 1.850.000` — Poppins Bold 18px navy, update real-time saat add-on dicentang
7. **Tombol Apply:** `Mulai Apply →` orange pill full-width lg, Heroicons `ArrowRightIcon`
8. **Trust micro:** `🔒 Pembayaran aman · SSL Encrypted` — DM Sans 11px gray-400 centered

---

#### TAB 2: PERSYARATAN

**H3:** `Persyaratan Dokumen` Poppins SemiBold 22px navy

**Intro alert:**
- Card bg orange-50 border-l-4 border-orange, rounded-r-xl, padding 16px
- Heroicons `ExclamationTriangleIcon` 20px orange + teks DM Sans 14px gray-700
- *"Persyaratan dapat berbeda tergantung status pernikahan, pekerjaan, dan usia pemohon. Pilih profilmu di bawah untuk persyaratan yang relevan."*

**Profile Selector — Radio Cards (3 opsi):**
Row 3 card, setiap card: icon besar + label, border gray-200, selected: border-orange bg-orange-50
- `👤 Karyawan`, `💼 Wiraswasta`, `🎓 Pelajar/Mahasiswa`
- Animasi selected: `scale 1.02` + border orange, Framer Motion `whileTap: { scale: 0.98 }`

**Accordion per Kategori Dokumen:**
Berdasarkan pilihan profil, tampilkan accordion. Setiap accordion:
- Header: Heroicons `FolderIcon` + nama kategori + badge jumlah dokumen (pill gray) + `ChevronDownIcon` rotate
- Animasi buka/tutup: `AnimatePresence` + `motion.div` height transition

**Kategori & Dokumen (untuk profil Karyawan):**

*Dokumen Pribadi (4 dokumen):*
- ✅ Paspor asli (berlaku min. 6 bulan) — **Wajib**
- ✅ Foto 3x4 background putih terbaru — **Wajib**
- ✅ KTP asli — **Wajib**
- ⬜ Akta lahir (tersumpah) — **Opsional**

*Dokumen Keuangan (3 dokumen):*
- ✅ Rekening koran 3 bulan terakhir — **Wajib**
- ✅ Slip gaji 3 bulan terakhir — **Wajib**
- ⬜ Surat keterangan penghasilan — **Opsional**

*Dokumen Perjalanan (3 dokumen):*
- ✅ Tiket pesawat PP (bisa dummy) — **Wajib**
- ✅ Booking hotel / itinerary — **Wajib**
- ⬜ Asuransi perjalanan min. 30.000 EUR — **Wajib untuk Schengen**

*Dokumen Pendukung (2 dokumen):*
- ✅ Surat keterangan kerja dari perusahaan — **Wajib**
- ⬜ Cover letter perjalanan — **Disarankan**

**Setiap item dokumen dalam accordion:**
- Flex row: status icon (✅ hijau / ❌ merah / ⬜ abu) + nama dokumen DM Sans 14px navy + badge wajib/opsional pill + `?` tooltip Heroicons `InformationCircleIcon` 16px gray-400 (hover: tooltip muncul)
- Klik item: expand detail — deskripsi kenapa dibutuhkan + format yang diterima + contoh

**Bottom CTA:**
Card bg navy-light border gray-200, rounded-xl, padding 16px, flex between
- Teks: `Mau kami cek dokumenmu dulu?` Poppins Medium 15px navy
- Tombol: `Analisis Dokumen Gratis →` orange pill sm

---

#### TAB 3: HARGA

**H3:** `Breakdown Harga` Poppins SemiBold 22px navy

**Tabel Harga:**
Card bg white shadow-md rounded-2xl, overflow-hidden

Header tabel: bg navy, text white, Poppins SemiBold 14px
Rows: alternating bg white / gray-50, DM Sans 14px

| Komponen | Harga |
|---|---|
| Biaya Visa (Embassy Fee) | Rp 850.000 |
| Biaya Layanan Wepose | Rp 350.000 |
| Biaya Admin & Pengiriman | Rp 150.000 |
| Pajak (PPN 11%) | Rp 148.500 |
| **Subtotal** | **Rp 1.498.500** |

Setelah subtotal: divider + row `Total` Poppins Bold 16px orange `Rp 1.850.000`

**Kalkulator Harga:**
Card bg orange-50 rounded-2xl padding 24px
- H4: `Hitung Total untuk Rombonganmu` Poppins SemiBold 18px navy
- **Input jumlah orang:** stepper `-` / angka / `+`, default 1, min 1 max 10 — border orange saat focus, rounded-xl
- **Checklist add-on:**
  Setiap add-on: card kecil flex between, checkbox oranye custom
  - `[ ] Translate Dokumen` `Rp 150.000/orang`
  - `[ ] Hotel Dummy Booking` `Rp 75.000/orang`
  - `[ ] Apostille Dokumen` `Rp 899.000/orang`
  - `[ ] Asuransi Perjalanan` `Rp 350.000/orang`
- **Total real-time:**
  Large display — `Total: Rp X.XXX.000` Poppins Bold 32px orange, update animasi `AnimatePresence` angka berubah (number flip atau fade transition)
  Sub: `untuk X orang` DM Sans 14px gray-500
- **Tombol:** `Lanjut Apply dengan Harga Ini →` orange pill full-width

**Catatan Harga:**
- Card bg gray-50 border gray-200 rounded-xl padding 16px
- Heroicons `InformationCircleIcon` 16px gray-400 + teks DM Sans 13px gray-500:
  *"Harga dapat berubah sewaktu-waktu mengikuti kebijakan kedutaan. Harga yang tertera sudah termasuk semua biaya resmi dan tidak ada biaya tersembunyi."*

---

#### TAB 4: FAQ

**H3:** `Pertanyaan Seputar Visa Ini` Poppins SemiBold 22px navy

**Accordion FAQ (6 item spesifik visa ini):**
Sama style dengan FAQ landing page — `AnimatePresence` height transition, chevron rotate

1. `Apakah saya perlu appointment ke kedutaan?` — *Tidak perlu. Wepose akan mengurus appointment dan pengiriman dokumen ke kedutaan.*
2. `Berapa lama visa France Schengen berlaku?` — *Visa berlaku maksimal 90 hari dalam 180 hari, tergantung keputusan kedutaan.*
3. `Bisakah saya mengunjungi negara Schengen lain?` — *Ya! Dengan visa France Schengen, kamu bisa masuk ke 27 negara area Schengen.*
4. `Apa yang terjadi jika visa ditolak?` — *Kami akan membantu analisis penolakan dan mempersiapkan pengajuan ulang dengan strategi lebih kuat.*
5. `Apakah saldo rekening harus ada minimum tertentu?` — *Umumnya min. Rp 20–30 juta atau setara, namun tergantung durasi perjalanan dan profil pemohon.*
6. `Kapan sebaiknya mulai apply visa?` — *Minimal 3–4 minggu sebelum keberangkatan. Disarankan 6–8 minggu untuk ketenangan.*

**Bottom:**
Link `Masih ada pertanyaan? Chat dengan konsultan kami →` — oranye, DM Sans Medium 14px, Heroicons `ChatBubbleLeftRightIcon` inline

---

#### TAB 5: ADD-ON

**H3:** `Lengkapi Perjalananmu` Poppins SemiBold 22px navy
**Sub:** DM Sans 14px gray-500 — *"Layanan tambahan untuk memperkuat aplikasi visa kamu"*

**Grid Add-on Cards — 2 kolom desktop, 1 mobile:**

Setiap card: bg white rounded-2xl shadow-md padding 24px, border gray-200

Anatomi per card:
- **Top row:** Icon ilustrasi (colored circle 48px bg orange-100 + Heroicons 24px orange) + badge `POPULER` atau `WAJIB SCHENGEN` atau `OPSIONAL`
- **Nama:** Poppins SemiBold 16px navy
- **Deskripsi:** DM Sans 14px gray-600, 2 baris
- **Harga:** `Mulai dari Rp X.XXX` Poppins SemiBold 15px orange
- **Tombol:** `+ Tambah ke Order` — orange pill sm. Saat ditambah: berubah jadi `✓ Ditambahkan` green pill dengan `AnimatePresence` swap

**4 Add-on Cards:**

1. **Translate Dokumen Tersumpah**
   Icon: `DocumentTextIcon` — badge: `POPULER`
   *"Terjemahan dokumen oleh penerjemah tersumpah, diakui secara hukum"*
   `Mulai dari Rp 150.000/dokumen`

2. **Hotel Dummy Booking**
   Icon: `BuildingOffice2Icon` — badge: `POPULER`
   *"Booking hotel sebagai bukti akomodasi untuk visa, bisa dibatalkan"*
   `Mulai dari Rp 75.000/malam`

3. **Apostille Dokumen**
   Icon: `StarIcon` — badge: `OPSIONAL`
   *"Legalisasi dokumen resmi melalui Apostille untuk pengakuan internasional"*
   `Mulai dari Rp 899.000/dokumen`

4. **Asuransi Perjalanan Schengen**
   Icon: `ShieldCheckIcon` — badge: `WAJIB SCHENGEN` (badge merah)
   *"Asuransi min. 30.000 EUR, wajib untuk semua aplikasi Schengen"*
   `Mulai dari Rp 350.000/orang`

**Bottom Total Add-on (muncul jika ada yang ditambahkan):**
`AnimatePresence` — sticky bar muncul di bawah grid: `X add-on dipilih · Total tambahan: Rp X.XXX · [Lanjut ke Apply]`

---

### 📱 4. STICKY CTA — MOBILE ONLY

**Behavior:**
- Muncul saat user scroll melewati hero header (monitor dengan `useScroll` + `useMotionValueEvent`)
- Hilang saat user scroll balik ke atas (ke area header)
- `AnimatePresence` + `motion.div` dengan `y: 100→0` slide up, `y: 0→100` slide down

**Style:**
- `position: fixed, bottom: 0, left: 0, right: 0, z-index: 50`
- Background white, `box-shadow: 0 -4px 16px rgba(0,0,0,0.10)`
- `padding: 12px 16px, padding-bottom: max(12px, env(safe-area-inset-bottom))`
- Flex between items-center

**Konten:**
- Kiri: nama visa Poppins SemiBold 13px navy (truncate) + harga `Rp 1.850.000` Poppins Bold 16px orange
- Kanan: `Mulai Apply →` orange pill button md, Heroicons `ArrowRightIcon` 16px

---

### 🎞️ ANIMATION RULES

**Prinsip:** Framer Motion semua, subtle & purposeful. Pakai `useReducedMotion()` untuk accessibility.

| Element | Effect | Duration |
|---|---|---|
| Hero overlay konten | `opacity 0→1, y: 10→0` | 0.6s ease-out |
| Tab switch content | `opacity 0→1` | 0.2s |
| Tab indicator (underline) | slide position via `layoutId` | 0.2s ease-out |
| Accordion open | height `0→auto` + `opacity 0→1` | 0.3s ease-out |
| Chevron rotate | `rotate 0→180` | 0.3s |
| Card hover | `scale 1.02` + shadow-lg | 0.2s |
| Add-on button swap | `AnimatePresence` fade out/in | 0.2s |
| Sticky CTA mobile | `y: 100→0` slide up | 0.25s ease-out |
| Stats card enter | `opacity 0→1, y: 16→0` stagger | 0.4s |
| Timeline dot pulse | `scale 1→1.3→1` | 2s loop |
| Kalkulator total angka | fade transition saat berubah | 0.15s |

---

### 📁 FILE STRUCTURE

```
app/
  visa/
    [slug]/
      page.tsx              ← fetch visa data, render page

components/
  visa-detail/
    HeroHeader.tsx          ← cover + overlay info + breadcrumb
    StickyTabBar.tsx        ← 5 tab dengan sliding indicator
    OverviewTab.tsx         ← deskripsi + stats + timeline + CTA
    RequirementsTab.tsx     ← profile selector + accordion dokumen
    PricingTab.tsx          ← tabel harga + kalkulator
    FaqTab.tsx              ← accordion FAQ
    AddonsTab.tsx           ← grid add-on cards
    OrderSummary.tsx        ← sticky sidebar desktop
    StickyCTAMobile.tsx     ← fixed bottom bar mobile
```

---

### 🔁 DUMMY DATA (untuk prototype)

```ts
const visaData = {
  slug: "france-schengen-tourist",
  name: "France Schengen Tourist",
  country: "Prancis",
  flag: "🇫🇷",
  type: "Tourist",
  processDays: "15–20 Hari Kerja",
  stayDuration: "90 Hari",
  validity: "3 Bulan",
  area: "27 Negara Schengen",
  priceBase: 1850000,
  priceDisplay: "Rp 1.850.000",
  coverGradient: "linear-gradient(135deg, #0F1F3D 0%, #1E3A5F 50%, #002395 100%)",
  addons: [
    { id: 1, name: "Translate Dokumen", price: 150000 },
    { id: 2, name: "Hotel Dummy", price: 75000 },
    { id: 3, name: "Apostille", price: 899000 },
    { id: 4, name: "Asuransi Perjalanan", price: 350000 },
  ]
}
```